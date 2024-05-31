import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import "../styles/chat_interface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요 ㅎㅎ', timestamp: '02:26', sender: 'user' },
    { id: 2, text: '안녕하세요 ~', timestamp: '02:26', sender: 'other' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        sender: 'user'
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        요아정과의 대화
      </div>
      <div className="chat-body">
        <div className="pagination-info">Pagination : 50개씩</div>
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <div className="chat-footer">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
