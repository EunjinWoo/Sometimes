import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-text">{message.text}</div>
      <div className="message-timestamp">{message.timestamp}</div>
    </div>
  );
};

export default ChatMessage;
