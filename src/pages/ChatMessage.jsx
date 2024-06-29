// ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message, userId }) => {
  const isUser = message.senderId === userId;
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-text">{message.message}</div>
      <div className="message-timestamp">{new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}</div>
    </div>
  );
};

export default ChatMessage;
