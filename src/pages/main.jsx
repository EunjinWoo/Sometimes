import React, { useCallback, useEffect, useRef } from "react";
import "../styles/main.css";
import charCloud from "../images/character_cloud.svg";
import homeIcon from "../images/icon_home.svg"; // 아이콘 이미지를 적절히 변경하세요
import heartIcon from "../images/icon_heart.svg"; // 아이콘 이미지를 적절히 변경하세요
import messageIcon from "../images/icon_chat.png"; // 아이콘 이미지를 적절히 변경하세요
import userIcon from "../images/icon_profile.svg";

const MainPage = () => {
  const mapRef = useRef(null);

  const initMap = useCallback((position) => {
    const { latitude, longitude } = position.coords;

    // 지도를 흑백으로 만들기 위한 사용자 정의 지도 스타일
    const mapStyle = [
      {
        "featureType": "all",
        "stylers": [
          { "saturation": -100 },
          { "lightness": 50 }
        ]
      }
    ];

    // 사용자 위치로 지도를 초기화하고 스타일 적용
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 16, // 500m 반경을 보기 위한 적절한 줌 레벨
      styles: mapStyle
    });

    // 사용자의 현재 위치에 마커 추가
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "현재 위치",
    });

    // 500m 반경의 원 추가
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

    // 랜덤 위치 생성 및 이미지 마커 추가
    const randomLocations = Array.from({ length: 5 }, () => ({
      lat: latitude + (Math.random() - 0.5) / 100,
      lng: longitude + (Math.random() - 0.5) / 100,
    }));

    randomLocations.forEach((location, index) => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: `Marker ${index + 1}`,
        icon: {
          url: charCloud, // 이미지 URL을 적절히 변경하세요
          scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조정
        },
      });
    });
  }, [mapRef]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMap, (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다.", error);
        // 위치 정보를 가져오지 못할 경우 기본 위치 설정
        initMap({
          coords: { latitude: -34.397, longitude: 150.644 }
        });
      });
    } else {
      console.error("이 브라우저는 지오로케이션을 지원하지 않습니다.");
      // 지오로케이션을 지원하지 않을 경우 기본 위치 설정
      initMap({
        coords: { latitude: -34.397, longitude: 150.644 }
      });
    }
  }, [initMap]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div
        className="map"
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
      ></div>
      <div className="bottom-bar">
        <div className="icon">
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="icon">
          <img src={heartIcon} alt="Heart" />
        </div>
        <div className="icon">
          <img src={messageIcon} alt="Message" />
        </div>
        <div className="icon">
          <img src={userIcon} alt="User" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
