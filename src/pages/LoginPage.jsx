import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import '../styles/LoginPage.css'; // Import the CSS file

import { createLocation } from '../graphql/mutations';
import { listUsers, listLocations } from '../graphql/queries';
import { updateLocation } from '../graphql/mutations';

Amplify.configure(awsconfig);
const client = generateClient();

// 위치 정보 업데이트 함수
const updateUserLocation = async (userId, x, y) => {
  try {
    console.log('Updating location for userId:', userId, 'with coordinates:', x, y);
    const res = await client.graphql({
      query: updateLocation,
      variables: {
        input: {
          id: userId,
          userId: userId,
          x: x,
          y: y
        }
      }
    });
    console.log('Update location response:', res);
    return res;
  } catch (error) {
    console.error('Error updating location:', error);
    if (error.errors) {
      error.errors.forEach(err => {
        console.error('Error detail:', err);
      });
    }
  }
};

// 위치 정보 가져오는 함수
const fetchUserLocations = async () => {
  try {
    const userLocation = await client.graphql({
      query: listLocations,
    });
    return userLocation.data.listLocations.items;
  } catch (error) {
    console.error('Error fetching user locations:', error);
  }
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 위치 정보 저장 함수
  const saveUserLocation = async (userId, x, y) => {
    try {
      const res = await client.graphql({
        query: createLocation,
        variables: {
          input: {
            id: userId,
            userId: userId,
            x: x,
            y: y
          }
        }
      });

      return res;
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userData = await client.graphql({
        query: listUsers,
      });
      return userData.data.listUsers.items;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in...');
  
      const users = await fetchUserDetails();
      console.log('Fetched users:', users);
      const user = users.find(u => u.name === username);
  
      if (!user) {
        console.log("로그인 정보를 찾을 수 없습니다. 다시 시도하세요.");
        return;
      }
  
      console.log('User found:', user);
  
      const userLocations = await fetchUserLocations(); // 현재 존재하는 위치 정보를 가져옵니다.
      console.log('Fetched user locations:', userLocations);
  
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current position:', latitude, longitude);
  
        const existingLocation = userLocations.find(loc => loc.userId === user.id);
        console.log('Existing location:', existingLocation);
  
        let locRes;
        if (existingLocation) {
          // 기존 위치 정보가 있으면 업데이트합니다.
          locRes = await updateUserLocation(user.id, latitude, longitude);
        } else {
          // 기존 위치 정보가 없으면 새로 저장합니다.
          locRes = await saveUserLocation(user.id, latitude, longitude);
        }
  
        console.log('GraphQL response (location):', locRes);
  
        navigate('/main', { state: { userId: user.id, username: user.name } });
  
      }, (error) => {
        console.error('Error getting location:', error);
      });
  
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p></p>
        <button onClick={handleNavigateToSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
