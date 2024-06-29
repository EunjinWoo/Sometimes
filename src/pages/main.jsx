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

import { generateClient } from 'aws-amplify/api';
import { updateLocation } from '../graphql/mutations';
import { listLocations, listUsers } from '../graphql/queries';
import { onCreateLocation, onUpdateLocation } from '../graphql/subscriptions';

const client = generateClient();

const MainPage = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { userId, username } = location.state || {};
  
  const [userDetails, setUserDetails] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  
  console.log('userId: ', userId);
  console.log('username: ', username);

  const updateUserLocation = async (userId, x, y) => {
    try {
      console.log("updateUserLocation -> ", userId, x, y);
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

  const clickEvent = async () => {
    try {
      /*
      // 현재 위치로 내 위치 업데이트
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("locRes ----> : ", userId, latitude, longitude);
      
        const locRes = await updateUserLocation(userId, latitude, longitude);

        console.log('GraphQL response - updateUserLocation:', locRes);
      }, (error) => {
        console.error('Error getting location:', error);
      });
      */

      const userDetails = await fetchUserDetails();
      setUserDetails(userDetails);
      console.log('User Details:', userDetails);

      const userLocations = await fetchUserLocations();
      setUserLocations(userLocations);
      console.log('User Locations:', userLocations);

      const subscribeCreate = subscribeToLocationCreates(userId);
      const subscribeUpdate = subscribeToLocationUpdates(userId);

      subscribeCreate.next = (locationData) => {
        console.log('New location:', locationData);
        console.log('User Details:', userDetails);
      };
      subscribeUpdate.next = (locationData) => {
        console.log('New location:', locationData);
        console.log('User Details:', userDetails);
      };

    } catch (error) {
      console.error('Error in clickEvent:', error);
    }
  };

  const initMap = useCallback((position) => {
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

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "현재 위치",
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

    userLocations.forEach((location) => {
      // console.log(location);
      const user = userDetails.find(user => user.id === location.userId);
      if (user) {
        console.log("user:", location.x, location.y);
        new window.google.maps.Marker({
          position: { lat: location.x, lng: location.y },
          map: map,
          title: user.username,
          icon: {
            // url: user.emojipath,
            url: charCloud,
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });
      }
    });
  }, [mapRef, userDetails, userLocations]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMap, (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다.", error);
        initMap({
          coords: { latitude: -34.397, longitude: 150.644 }
        });
      });
    } else {
      console.error("이 브라우저는 지오로케이션을 지원하지 않습니다.");
      initMap({
        coords: { latitude: -34.397, longitude: 150.644 }
      });
    }
  }, [initMap]);

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
              <HeartedUserListPage />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <div className="bottom-bar">
        <div className="icon">
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="icon" onClick={() => navigate(`/hearted`)}>
          <img src={heartIcon} alt="Heart" />
        </div>
        <div className="icon" onClick={() => navigate(`/chat/1`)}>
          <img src={messageIcon} alt="Message" />
        </div>
        <div className="icon" onClick={() => navigate(`/ARpage`)}>
          <img src={cameraIcon} alt="Camera" />
        </div>
        <div className="icon" onClick={() => navigate(`/userprofile/0`)}>
          <img src={userIcon} alt="User" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
