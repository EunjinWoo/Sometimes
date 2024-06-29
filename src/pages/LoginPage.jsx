import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';

import { createLocation } from '../graphql/mutations';
import { listUsers, listLocations } from '../graphql/queries';
import { updateLocation } from '../graphql/mutations';

Amplify.configure(awsconfig);
const client = generateClient();

// 위치 정보 업데이트 함수
const updateUserLocation = async (userId, x, y) => {
  try {
    const res = await client.graphql({
      query: updateLocation,
      variables: {
        input: {
          id: userId,
          x: x,
          y: y
        }
      }
    });
    return res;
  } catch (error) {
    console.error('Error updating location:', error);
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

      const userLocations = await fetchUserLocations(); // 현재 존재하는 위치 정보를 가져옵니다.

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const existingLocation = userLocations.find(loc => loc.userId === user.id);

        let locRes;
        if (existingLocation) {
          // 기존 위치 정보가 있으면 업데이트합니다.
          locRes = await updateUserLocation(user.id, latitude, longitude);
        } else {
          // 기존 위치 정보가 없으면 새로 저장합니다.
          locRes = await saveUserLocation(user.id, latitude, longitude);
        }

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
