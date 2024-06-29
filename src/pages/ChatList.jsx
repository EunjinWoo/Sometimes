// ChatList.jsx
import React, { useState, useEffect } from "react";
import "../styles/ChatList.css";
import { generateClient } from "aws-amplify/api";
import { listChatRooms, getUser } from "../graphql/queries"; // 필요 시 GraphQL 쿼리 파일에서 가져오기
import { useLocation, useNavigate } from "react-router-dom";

const client = generateClient();

const ChatList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const { userId = "2222", username } = location.state || {};
  console.log("userId: ", userId);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const chatRoomData = await client.graphql({
          query: listChatRooms,
          variables: {
            filter: {
              or: [
                { participant1Id: { eq: userId } },
                { participant2Id: { eq: userId } },
              ],
            },
          },
        });

        const chatRoomsWithUsernames = await Promise.all(
          chatRoomData.data.listChatRooms.items.map(async (chatRoom) => {
            const otherUserId =
              chatRoom.participant1Id === userId
                ? chatRoom.participant2Id
                : chatRoom.participant1Id;

            const otherUserData = await client.graphql({
              query: getUser,
              variables: { id: otherUserId },
            });

            const otherUser = otherUserData.data.getUser;
            if (!otherUser) {
              console.error(`User with ID ${otherUserId} not found.`);
              return {
                ...chatRoom,
                otherUsername: "Unknown User",
              };
            }

            const otherUsername = otherUser.username || otherUser.name || "Unknown User";
            console.log("otherUsername: ", otherUsername);

            return {
              ...chatRoom,
              otherUsername,
            };
          })
        );
        console.log("chatRoomsWithUsernames: ", chatRoomsWithUsernames);
        setChatRooms(chatRoomsWithUsernames);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const handleChatRoomClick = (chatRoom) => {
    navigate(`/chat/${chatRoom.id}`, {
      state: {
        userId: userId,
        username: username,
        chatroomId: chatRoom.id,
      },
    });
  };

  return (
    <div className="user-list-container">
      <header>
        <h1>채팅방 목록</h1>
      </header>
      <ul>
        {chatRooms.map((chatRoom, index) => {
          console.log("Rendering chatRoom: ", chatRoom);
          return (
            <li key={index} className="user-item" onClick={() => handleChatRoomClick(chatRoom)}>
              <span className="user-emoji">{chatRoom.emoji || "💬"}</span>
              <div className="user-info">
                <span className="user-name">{chatRoom.otherUsername}</span>
                <span className="user-message">{chatRoom.latestMessage}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
