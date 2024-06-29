import React, { useState, useEffect } from 'react';
import '../styles/user_profile.css';
import profilePic from '../images/boo.png';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const location = useLocation();
  const { anyUserId } = location.state || {};
  console.log("anyUserId --> ", anyUserId);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = {
        profilePic: profilePic, // 실제 이미지 URL로 대체
        age: 27,
        mbti: 'ENFP',
        idealType: '원더걸스',
        animal: '고양이',
      };
      setProfileData(data);
    };

    fetchProfileData();
  }, []);

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
        </div>
      </div>
      <div className="profile-content">
        <div className="emoji">😘</div>
        <div className="greeting">안녕하세요. ^^</div>
        <div className="profile-details">
          <div className="profile-pic">
            <img src={profileData.profilePic} alt="Profile" />
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
