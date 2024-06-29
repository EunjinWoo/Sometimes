import React, { useState, useEffect } from 'react';
import '../styles/user_profile.css';
import profilePic from '../images/boo.png';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // 여기에 실제 데이터 소스를 연결합니다.
    // 예시로 static 데이터 사용
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
        {/* <div className="steps">
          <button>Step 1</button>
          <button>Step 2</button>
          <button>Step 3</button>
        </div> */}
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
