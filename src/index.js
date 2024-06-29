import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import App from './App';

import reportWebVitals from './reportWebVitals';
Amplify.configure(awsconfig);

// 환경변수에서 API 키 가져오기
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Google Maps API 스크립트 동적으로 추가
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAt3flv6KDTEl-0SVme6lpT8D_gW_AhsX0&callback=initMap`;
script.async = true;
document.head.appendChild(script);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
