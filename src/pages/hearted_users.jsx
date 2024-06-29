import React, { useState, useEffect } from 'react';
import "../styles/hearted_users.css";
import { useLocation, useNavigate } from 'react-router-dom';

import { generateClient } from 'aws-amplify/api';
import { listLikes, listUsers } from '../graphql/queries';

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

const HeartedUserListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, username } = location.state || {};

  const [userDetails, setUserDetails] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);

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

  const fetchLikedUsers = async () => {
    try {
      const likeData = await client.graphql({
        query: listLikes,
        variables: {
          filter: {
            likeUserId: { eq: userId }
          }
        }
      });

      const likedUserIds = likeData.data.listLikes.items.map(like => like.likedUserId);
      setLikedUsers(likedUserIds);
    } catch (error) {
      console.error('Error fetching liked users:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchLikedUsers();
  }, []);

  const likedUserDetails = userDetails.filter(user => likedUsers.includes(user.id));

  return (
    <div className="user-list-container">
      <header>
        <h1>찜한 유저</h1>
      </header>
      <ul>
        {likedUserDetails.map((user, index) => (
          <li key={index} className="user-item" onClick={() => navigate(`/userprofile/${user.id}`, { state: { otherUserId: user.id, userId: userId } })}>
            <img className="user-emoji" src={getIconUrl(user.emojiPath)} alt="User Emoji" />
            <div className="user-info">
              <span className="user-gender">{user.gender}</span>
              <span className="user-name">{user.name}</span>
              <span className="user-message">{user.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeartedUserListPage;
