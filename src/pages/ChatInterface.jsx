// ChatInterface.jsx
import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import "../styles/chat_interface.css";
import { useLocation } from "react-router-dom";
import { createChatItem } from "../graphql/mutations";
import { listChatItems } from "../graphql/queries";
import { onCreateChatItem } from "../graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const ChatInterface = () => {
  const location = useLocation();
  const {
    userId,
    username,
    chatroomId = "042a9e32-652e-4f72-a5ca-4259447c2a74",
  } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    const subscription = client
      .graphql({
        query: onCreateChatItem,
        variables: { chatroomId: chatroomId },
      })
      .subscribe({
        next: (eventData) => {
          console.log("onCreateChatItem", eventData);

          const newMessage = eventData.data.onCreateChatItem;
          console.log("chatroomId: ", chatroomId);
          if (newMessage.chatroomId === chatroomId) {
            console.log("newMessage.chatroomId: ", newMessage.chatroomId);
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, newMessage].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );
              return updatedMessages;
            });
          }
        },
        error: (error) => console.warn(error),
      });
    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, [chatroomId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const messageData = await client.graphql({
        query: listChatItems,
        variables: { filter: { chatroomId: { eq: chatroomId } } },
      });
      // console.log("Message data", messageData);
      const sortedMessages = messageData.data.listChatItems.items.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        message: newMessage,
        senderId: userId,
        chatroomId: chatroomId,
        action: "MESSAGE",
      };
      console.log("newMessageObj", newMessageObj);

      try {
        await client.graphql({
          query: createChatItem,
          variables: {
            input: newMessageObj,
          },
        });
        setNewMessage("");
      } catch (error) {
        console.log("Error sending message", error);
      }
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">채팅방</div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} userId={userId} />
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage}>보내기</button>
      </div>
    </div>
  );
};

export default ChatInterface;
