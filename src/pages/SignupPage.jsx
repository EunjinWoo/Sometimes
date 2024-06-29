import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import { createUser } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import '../styles/SignupPage.css'; // CSS 파일을 임포트합니다.

Amplify.configure(awsconfig);
const client = generateClient();

const SignupPage = () => {
  const [signupName, setSignupName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('MALE');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const userId = uuidv4();

    try {
      const res = await client.graphql({
        query: createUser,
        variables: {
          input: {
            id: userId,
            name: signupName,
            description: description,
            gender: gender,
            emojiPath: 'default1.png',
            profilePath: 'default.png'
          }
        }
      });

      console.log('GraphQL response (signup):', res);
      navigate('/login', { state: { userId, signupName } });

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Enter name(used as ID)"
        value={signupName}
        onChange={(e) => setSignupName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter short description about you!"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="MALE">남</option>
        <option value="FEMALE">녀</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupPage;
