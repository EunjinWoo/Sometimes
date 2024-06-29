import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/main.css";
import homeIcon from "../images/icon_home.svg";
import heartIcon from "../images/icon_heart.svg";
import messageIcon from "../images/icon_chat.png";
import userIcon from "../images/icon_profile.svg";
import cameraIcon from "../images/icon_camera.svg";
import { useNavigate } from "react-router-dom";
import { Sheet } from "react-modal-sheet";
import HeartedUserListPage from "./hearted_users";
import { useLocation } from 'react-router-dom';

import charCloud from "../images/character_cloud.svg";
import emoji1 from "../images/emojis/1.svg";
import emoji2 from "../images/emojis/2.svg";
import emoji3 from "../images/emojis/3.svg";
import emoji4 from "../images/emojis/4.svg";
import emoji5 from "../images/emojis/5.svg";
import emoji6 from "../images/emojis/6.svg";
import emoji7 from "../images/emojis/7.svg";
import emoji8 from "../images/emojis/8.svg";
import redMarker from "../images/red_marker.png";  // Ensure you have this red marker icon in your images folder

import { generateClient } from 'aws-amplify/api';
import { updateLocation } from '../graphql/mutations';
import { listLocations, listUsers } from '../graphql/queries';
import { onCreateLocation, onUpdateLocation } from '../graphql/subscriptions';
import NearbyUserList from "./NearbyUserList";

const client = generateClient();

const MainPage = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { userId, username } = location.state || {};
  
  const [userDetails, setUserDetails] = useState([]);
  const [userLocations, setUserLocations] = useState([]);

  console.log('MainPage userId: ', userId);
  console.log('MainPage username: ', username);

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
      console.error('Error saving location:', error);
    }
  };

  const subscribeToLocationCreates = (userId) => {
    const subscription = client.graphql({
      query: onCreateLocation,
      variables: { userId }
    }).subscribe({
      next: (locationData) => {
        console.log('New location:', locationData);
      }
    });

    return subscription;
  };

  const subscribeToLocationUpdates = (userId) => {
    const subscription = client.graphql({
      query: onUpdateLocation,
      variables: { userId }
    }).subscribe({
      next: (locationData) => {
        console.log('Updated location:', locationData);
      }
    });

    return subscription;
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

  const initializeData = async () => {
    try {
      const userDetails = await fetchUserDetails();
      setUserDetails(userDetails);
      console.log('User Details:', userDetails);

      const userLocations = await fetchUserLocations();
      setUserLocations(userLocations);
      console.log('User Locations:', userLocations);

      return { userDetails, userLocations };
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const clickEvent = async () => {
    try {
      const { userDetails, userLocations } = await initializeData();
      
      const subscribeCreate = subscribeToLocationCreates(userId);
      const subscribeUpdate = subscribeToLocationUpdates(userId);

      subscribeCreate.next = (locationData) => {
        console.log('New location:', locationData);
      };
      subscribeUpdate.next = (locationData) => {
        console.log('Updated location:', locationData);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => initMap(position, userDetails, userLocations),
          (error) => {
            console.error("위치 정보를 가져오는데 실패했습니다.", error);
            initMap(
              { coords: { latitude: -34.397, longitude: 150.644 } },
              userDetails,
              userLocations
            );
          }
        );
      } else {
        console.error("이 브라우저는 지오로케이션을 지원하지 않습니다.");
        initMap(
          { coords: { latitude: -34.397, longitude: 150.644 } },
          userDetails,
          userLocations
        );
      }

    } catch (error) {
      console.error('Error in clickEvent:', error);
    }
  };

  const initMap = (position, userDetails, userLocations) => {
    const { latitude, longitude } = position.coords;

    const mapStyle = [
      {
        featureType: "all",
        stylers: [
          { saturation: -100 },
          { lightness: 50 }
        ]
      }
    ];

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 16,
      styles: mapStyle
    });

    new window.google.maps.Circle({
      map: map,
      center: { lat: latitude, lng: longitude },
      radius: 500,
      fillColor: '#FF00A8',
      fillOpacity: 0.09,
      strokeColor: '#FF00A8',
      strokeOpacity: 0.8,
      strokeWeight: 5,
    });

    // 아이콘을 매핑하는 함수
    const getIconUrl = (iconNum) => {
      const icons = {
        1 : emoji1,
        2 : emoji2,
        3 : emoji3,
        4 : emoji4,
        5 : emoji5,
        6 : emoji6,
        7 : emoji7,
        8 : emoji8,
        // 추가적인 아이콘이 있다면 여기에 추가
      };

      return icons[iconNum] || charCloud; // 기본값으로 charCloud 설정
    };

    userLocations.forEach((location) => {
      const otherUser = userDetails.find(user => user.id === location.userId);
      if (otherUser && otherUser.id !== userId) {
        const marker = new window.google.maps.Marker({
          position: { lat: location.x, lng: location.y },
          map: map,
          title: otherUser.username,
          icon: {
            url: getIconUrl(otherUser.emojiPath),
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });
      
        marker.addListener('click', () => {
          navigate(`/userprofile/${otherUser.id}`, { state: { otherUserId: otherUser.id,userId:userId } });
        });
      }
    });

    // 현재 위치 표시
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "현재 위치",
      icon: {
        url: redMarker,
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });
  };

  useEffect(() => {
    const fetchDataAndInitMap = async () => {
      const { userDetails, userLocations } = await initializeData();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => initMap(position, userDetails, userLocations),
          (error) => {
            console.error("위치 정보를 가져오는데 실패했습니다.", error);
            initMap(
              { coords: { latitude: -34.397, longitude: 150.644 } },
              userDetails,
              userLocations
            );
          }
        );
      } else {
        console.error("이 브라우저는 지오로케이션을 지원하지 않습니다.");
        initMap(
          { coords: { latitude: -34.397, longitude: 150.644 } },
          userDetails,
          userLocations
        );
      }
    };

    fetchDataAndInitMap();
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div className="map" ref={mapRef} style={{ height: '100%', width: '100%' }}></div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="open-bottom-sheet" onClick={() => setOpen(true)}>
          Open List
        </button>
        <button className="close-bottom-sheet" onClick={() => clickEvent()}>
          Close List
        </button>
      </div>

      <Sheet isOpen={open} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="bottom-sheet-content">
              <NearbyUserList userId={userId} username={username} />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <div className="bottom-bar">
        <div className="icon">
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="icon" onClick={() => navigate(`/hearted`, { state: { userId, username } })}>
          <img src={heartIcon} alt="Heart" />
        </div>
        <div className="icon" onClick={() => navigate(`/chat`, { state: { userId, username } })}>
          <img src={messageIcon} alt="Message" />
        </div>
        <div className="icon" onClick={() => navigate(`/ARpage`)}>
          <img src={cameraIcon} alt="Camera" />
        </div>
        <div className="icon" onClick={() => navigate(`/userprofile/${userId}`, { state: { otherUserId: 0 , userId: userId } })}>
          <img src={userIcon} alt="User" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
