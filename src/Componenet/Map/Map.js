import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Map, MapMarker, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
const { kakao } = window;

const MyMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); 
  const initialLatitude = 37.277272;
  const initialLongitude = 127.134346;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(initialLatitude, initialLongitude),
      level: 3
    };

    setMap(new kakao.maps.Map(container, options));
  }, [initialLatitude, initialLongitude]);

  const updateMap = async () => {
    try {
      const nameInput = document.getElementById('nameInput');
      const restaurantName = nameInput.value.trim(); // 입력값에서 공백 제거

      const response = await axios.get('https://apis.data.go.kr/6260000/BusanTblFnrstrnStusService/getTblFnrstrnStusInfo?serviceKey=GMMb25M6CeNcyjdi0iJYWziSyQ1XhLZkO9vfxnVW391ZbRvT%2BeUSs5MoCDmD6YzF38nAucMZbMWtobyJW84gYA%3D%3D&numOfRows=10&pageNo=1&resultType=json');

      // 식당 이름으로 검색하여 인덱스 찾기
      const index = response.data.getTblFnrstrnStusInfo.body.items.item.findIndex(item => item.bsnsNm === restaurantName);

      if (index !== -1) { // 인덱스가 유효한 경우에만 처리
        const latitude = response.data.getTblFnrstrnStusInfo.body.items.item[index].lat;
        const longitude = response.data.getTblFnrstrnStusInfo.body.items.item[index].lng;
        const restaurantNum = response.data.getTblFnrstrnStusInfo.body.items.item[index].tel;
        const mapLink = 'https://map.kakao.com/link/map/' + restaurantName + ',' + latitude + ',' + longitude;

        // 새로운 중심 위치로 이동
        map.setCenter(new kakao.maps.LatLng(latitude, longitude));

        const newMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latitude, longitude),
          map: map
        });

        const iwContent = '<div style="padding:5px;">' + restaurantName + '<br>' + restaurantNum + '<br><a href="' + mapLink + '" style="color:blue" target="_blank">큰지도보기</a></div>';

        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent
        });

        infowindow.open(map, newMarker);

        if (marker) {
          marker.setMap(null);
        }

        setMarker(newMarker);
      } else {
        console.log('식당을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <label htmlFor="nameInput">식당 이름</label>
      <input type="text" id="nameInput" placeholder="식당 이름을 입력하시오." />
      <button onClick={updateMap}>검색</button>
    </div>
  );
};

export default MyMap;
