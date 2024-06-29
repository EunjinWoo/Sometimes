import React, { useState, useEffect } from 'react';
import '../styles/user_profile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import profilePic from '../images/boo.png';
import { getUser } from '../graphql/queries';

import charCloud from "../images/character_cloud.svg";
import emoji1 from "../images/emojis/1.svg";
import emoji2 from "../images/emojis/2.svg";
import emoji3 from "../images/emojis/3.svg";
import emoji4 from "../images/emojis/4.svg";
import emoji5 from "../images/emojis/5.svg";
import emoji6 from "../images/emojis/6.svg";
import emoji7 from "../images/emojis/7.svg";
import emoji8 from "../images/emojis/8.svg";
import chatIcon from "../images/chatIcon.svg"; // chatIcon 불러오기

import { createChatRoom } from '../graphql/mutations';
import { listChatRooms } from '../graphql/queries';

const client = generateClient();

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { otherUserId: rawOtherUserId, userId } = location.state || {};
  const otherUserId = rawOtherUserId === 0 ? userId : rawOtherUserId; // otherUserId가 0이면 userId로 대체
  console.log('otherUserId:', otherUserId);
  console.log('userId:', userId);
  const [userDetail, setUserDetail] = useState([]);

  // 아이콘을 매핑하는 함수
  const getIconUrl = (iconNum) => {
    const icons = {
      1 : emoji1,
      2 : emoji2,
      3 : emoji3,
      4 : emoji4,
      5 : emoji5,
      6 : emoji6,
      7 : emoji7,
      8 : emoji8,
      // 추가적인 아이콘이 있다면 여기에 추가
    };

    return icons[iconNum] || charCloud; // 기본값으로 charCloud 설정
  };

  const fetchUserDetails = async (otherUserId) => {
    try {
      const userDetail = await client.graphql({
        query: getUser,
        variables: { id: otherUserId },
      });
      setUserDetail(userDetail);
      
      console.log("userdata: ",userDetail.data.getUser);

      return userDetail.data.getUser;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleChatClick = async () => {
    try {
      console.log('profileData:', profileData);
      console.log('userId:', userId);
      // Check if a chat room already exists
      const chatRoomData = await client.graphql({
        query: listChatRooms,
        variables: {
          filter: {
            and: [
              { or: [{ participant1Id: { eq: userId } }, { participant2Id: { eq: profileData.id  } }] },
              { or: [{ participant1Id: { eq: profileData.id } }, { participant2Id: { eq: userId} }] },
            ],
          },
        },
      });

      let chatRoom;
      if (chatRoomData.data.listChatRooms.items.length > 0) {
        // Use the existing chat room
        console.log('Chat room already exists:', chatRoomData.data.listChatRooms.items[0]);
        chatRoom = chatRoomData.data.listChatRooms.items[0];
      } else {
        // Create a new chat room
        console.log('Creating a new chat room');
        const newChatRoom = await client.graphql({
          query: createChatRoom,
          variables: {
            input: {
              participant1Id: userId,
              participant2Id: profileData.id,
            },
          },
        });
        chatRoom = newChatRoom.data.createChatRoom;
      }

      navigate(`/chat/${chatRoom.id}`, {
        state: {
          userId: userId,
          chatroomId: chatRoom.id,
        },
      });
    } catch (error) {
      console.error('Error handling chat click:', error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await fetchUserDetails(otherUserId);
      setProfileData(data);
    };

    fetchProfileData();
  }, [otherUserId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="header">
        <span className="time">09:47</span>
        <div className="icons">
          <i className="fas fa-pen"></i>
          <i className="fas fa-heart"></i>
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" onClick={handleChatClick} />
        </div>
      </div>
      <div className="profile-content">
        <div className="greeting">{profileData.name}</div>
        <div className="emoji">
          <img src={getIconUrl(profileData.emojiPath)} alt="Profile" />
        </div>
        <div className="greeting">{profileData.description}</div>
        <div className="profile-details">
          <div className="profile-pic">
            <img src={`../images/default.png` || profilePic} alt="Profile" />
          </div>
          <div className="details">
            <p>AGE: {profileData.age}</p>
            <p>MBTI: {profileData.mbti}</p>
            <p>이상형: {profileData.idealType}</p>
            <p>나를 닮은 동물: {profileData.animal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
