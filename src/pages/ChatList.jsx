import React from 'react';
import "../styles/hearted_users.css";

const users = [
  { emoji: '😃', gender: '♂️', name: '요정', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😎', gender: '♀️', name: '천사', message: '안녕하세용가리 . ^^', favorite: true },
  { emoji: '😘', gender: '♂️', name: '요아정', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😳', gender: '♀️', name: '그래놀라', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😵', gender: '♀️', name: '자몽', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😘', gender: '♂️', name: '꿀', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😴', gender: '♂️', name: '허니', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😔', gender: '♂️', name: '하니', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😃', gender: '♂️', name: '요정', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😎', gender: '♀️', name: '천사', message: '안녕하세용가리 . ^^', favorite: true },
  { emoji: '😘', gender: '♂️', name: '요아정', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😳', gender: '♀️', name: '그래놀라', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😵', gender: '♀️', name: '자몽', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😘', gender: '♂️', name: '꿀', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😴', gender: '♂️', name: '허니', message: '안녕하세용가리 . ^^', favorite: false },
  { emoji: '😔', gender: '♂️', name: '하니', message: '안녕하세용가리 . ^^', favorite: false },
];

const ChatList = () => {
  return (
    <div className="user-list-container">
      <header>
        <h1>찜한 유저</h1>
        {/* <button>This week</button> */}
      </header>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <span className="user-emoji">{user.emoji}</span>
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

export default ChatList;
