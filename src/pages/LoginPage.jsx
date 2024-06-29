import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import { createUser } from '../graphql/mutations';
import MainPage from './main';
import { v4 as uuidv4 } from 'uuid';

Amplify.configure(awsconfig);
const client = generateClient();

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  var userId = uuidv4();

  const handleLogin = async () => {
    try {
      console.log('Attempting to create user...');

    //   console.log('userId: ', userId);
  
      const res = await client.graphql({
        query: createUser,
        variables: {
          input: {
            id: userId,
            name: username,
            description: 'Anonymous User',
            emojiPath: 'default.png',
            profilePath: 'default.png',
            gender: 'MALE'
          }
        }
      });
  
      console.log('GraphQL response:', res);

      navigate('/', { state: { userId } });
      
      // 사용자 ID 설정 등의 추가 로직...
  
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
