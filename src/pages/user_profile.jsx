import React, { useState, useEffect } from 'react';
import '../styles/user_profile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
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
import chatIcon from "../images/chatIcon.svg";
import heartIcon from "../images/heartIcon.svg";
import redHeartIcon from "../images/redHeartIcon.svg";

import { createChatRoom } from '../graphql/mutations';
import { createLike, deleteLike } from '../graphql/mutations';
import { listChatRooms, listLikes } from '../graphql/queries';

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
  const [isLiked, setIsLiked] = useState(false);

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

  const fetchUserDetails = async (otherUserId) => {
    try {
      const userDetail = await client.graphql({
        query: getUser,
        variables: { id: otherUserId },
      });
      setUserDetail(userDetail);

      console.log("userdata: ", userDetail.data.getUser);

      return userDetail.data.getUser;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const likeData = await client.graphql({
        query: listLikes,
        variables: {
          filter: {
            likeUserId: { eq: userId },
            likedUserId: { eq: otherUserId }
          }
        }
      });

      if (likeData.data.listLikes.items.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const handleHeartClick = async () => {
    try {
      if (isLiked) {
        // 좋아요 삭제
        const likeData = await client.graphql({
          query: listLikes,
          variables: {
            filter: {
              likeUserId: { eq: userId },
              likedUserId: { eq: otherUserId }
            }
          }
        });

        const likeId = likeData.data.listLikes.items[0].id;

        await client.graphql({
          query: deleteLike,
          variables: { input: { id: likeId } }
        });

        setIsLiked(false);
      } else {
        // 좋아요 생성
        await client.graphql({
          query: createLike,
          variables: {
            input: {
              likeUserId: userId,
              likedUserId: otherUserId
            }
          }
        });

        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling heart click:', error);
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
              { or: [{ participant1Id: { eq: userId } }, { participant2Id: { eq: userId } }] },
              { or: [{ participant1Id: { eq: profileData.id } }, { participant2Id: { eq: profileData.id } }] },
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
          // username: username,
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
      await fetchLikeStatus();
    };

    fetchProfileData();
  }, [otherUserId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="header">
        <span className="time"></span>
        <div className="icons">
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" onClick={handleChatClick} />
          {otherUserId !== userId && (
            <img
              src={isLiked ? redHeartIcon : heartIcon}
              alt="heart Icon"
              className="chat-icon"
              onClick={handleHeartClick}
            />
          )}
        </div>
      </div>
      <div className="profile-content">
        <div className="name">{profileData.name}</div>
        <div className="emoji">
          <img src={getIconUrl(profileData.emojiPath)} alt="Profile" />
        </div>
        <div className="greeting">{profileData.description}</div>
        <div className="profile-details">
          <p> PROFILE PIC : </p>
        </div>
        <div className="profile-details">
          <div className="profile-pic">
            <img src={require(`../images/${profileData.profilePath}`)} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
