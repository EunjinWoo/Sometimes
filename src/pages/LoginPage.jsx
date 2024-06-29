import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';

import { createLocation } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';

Amplify.configure(awsconfig);
const client = generateClient();

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // 위치 정보 저장 함수
  const saveUserLocation = async (userId, x, y) => {
    try {
      const res = await client.graphql({
        query: createLocation,
        variables: {
          input: {
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
      console.log(users);
      const user = users.find(u => u.name === username);

      if (!user) {
        console.log("로그인 정보를 찾을 수 없습니다. 다시 시도하세요.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const locRes = await saveUserLocation(user.id, latitude, longitude); // 현재 위치 정보를 사용합니다.

        console.log('GraphQL response (location):', locRes);

        navigate('/', { state: { userId: user.id, username: user.name } });

      }, (error) => {
        console.error('Error getting location:', error);
      });

    } catch (error) {
      console.error('Error logging in:', error);
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
