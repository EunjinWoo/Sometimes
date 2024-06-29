import React, { useState, useEffect } from 'react';
import "../styles/NearbyUserList.css";
import { useLocation, useNavigate } from 'react-router-dom';

import { generateClient } from 'aws-amplify/api';
import { listLocations, listUsers } from '../graphql/queries';

import charCloud from "../images/character_cloud.svg";
import emoji1 from "../images/emojis/1.svg";
import emoji2 from "../images/emojis/2.svg";
import emoji3 from "../images/emojis/3.svg";
import emoji4 from "../images/emojis/4.svg";
import emoji5 from "../images/emojis/5.svg";
import emoji6 from "../images/emojis/6.svg";
import emoji7 from "../images/emojis/7.svg";
import emoji8 from "../images/emojis/8.svg";

const client = generateClient();

// 아이콘을 매핑하는 함수
const getIconUrl = (iconNum) => {
  const icons = {
    1: emoji1,
    2: emoji2,
    3: emoji3,
    4: emoji4,
    5: emoji5,
    6: emoji6,
    7: emoji7,
    8: emoji8,
    // 추가적인 아이콘이 있다면 여기에 추가
  };

  return icons[iconNum] || charCloud; // 기본값으로 charCloud 설정
};

const NearbyUserList = ({ userId, username }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [nearbyUsers, setNearbyUsers] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const userData = await client.graphql({
        query: listUsers,
      });
      setUserDetails(userData.data.listUsers.items);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchUserLocations = async () => {
    try {
      const userLocation = await client.graphql({
        query: listLocations,
      });
      setUserLocations(userLocation.data.listLocations.items);
    } catch (error) {
      console.error('Error fetching user locations:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserLocations();
  }, []);

  useEffect(() => {
    if (userDetails.length > 0 && userLocations.length > 0) {
      const nearby = userLocations.map((location) => {
        const user = userDetails.find(user => location.userId === user.id);
        return user;
      }).filter(user => user !== undefined && user.id !== userId);

      setNearbyUsers(nearby);

      console.log(nearbyUsers);
    }
  }, [userDetails, userLocations, userId]);

  return (
    <div className="user-list-container">
      <header>
        <h1>USER LIST</h1>
      </header>
      <ul>
        {nearbyUsers.map((user, index) => {
            console.log("nearbyUsers : ",nearbyUsers);
            return (
            <li key={index} className="user-item" onClick={() => navigate(`/userprofile/${user.id}`, {state: {otherUserId: user.id, userId: userId}})}>
                <img className="user-emoji" src={getIconUrl(user.emojiPath)}></img>
                <div className="user-info">
                    <span className="user-gender">{user.gender}</span>
                    <span className="user-name">{user.name}</span>
                    <span className="user-message">{user.message}</span>
                </div>
            </li>
        )})}
      </ul>
    </div>
  );
};

export default NearbyUserList;
