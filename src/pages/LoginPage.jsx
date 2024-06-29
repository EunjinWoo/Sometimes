import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';

import { createLocation } from '../graphql/mutations';

Amplify.configure(awsconfig);
const client = generateClient();

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, signupName } = location.state || {};

  console.log("LP -> ", signupName);

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

  const handleLogin = async () => {
    try {
      console.log('Attempting to create user...');
  
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("LoginPage-> username: ", username, signupName);
        const { latitude, longitude } = position.coords;

        if (username === signupName) {
            const locRes = await saveUserLocation(userId, latitude, longitude); // 현재 위치 정보를 사용합니다.

            console.log(username)
        
            console.log('GraphQL response (location):', locRes);
    
            navigate('/', { state: { userId, username } });
        }
        else {
            console.log("로그인 정보를 찾을 수 없습니다. 다시 시도하세요.");
        }
    
      }, (error) => {
        console.error('Error getting location:', error);
      });
  
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
