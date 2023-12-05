import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader"
const { kakao } = window;

export default function MyMap() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [initialLatitude, setInitialLatitude] = useState(37.277272);
  const [initialLongitude, setInitialLongitude] = useState(127.134346);

  useKakaoLoader();

  useEffect(() => {
    axios
      .get('https://apis.data.go.kr/6260000/BusanTblFnrstrnStusService/getTblFnrstrnStusInfo?serviceKey=GMMb25M6CeNcyjdi0iJYWziSyQ1XhLZkO9vfxnVW391ZbRvT%2BeUSs5MoCDmD6YzF38nAucMZbMWtobyJW84gYA%3D%3D&numOfRows=100&pageNo=1&resultType=json')

      .then((response) => {
        const container = document.getElementById('map');
        const data = response.data.getTblFnrstrnStusInfo.body.items.item;
        console.log(response.data);

        const nameInput = document.getElementById('nameInput');
        const restaurantName = nameInput.value();

        const index = data.findIndex(item => item.bsnsNm === restaurantName);

        if (index !== -1) {
          const latitude = response.data.getTblFnrstrnStusInfo.body.items.item[index].lat;
          const longitude = response.data.getTblFnrstrnStusInfo.body.items.item[index].lng;
          const restaurantNum = response.data.getTblFnrstrnStusInfo.body.items.item[index].tel;
          const mapLink = 'https://map.kakao.com/link/map/' + restaurantName + ',' + latitude + ',' + longitude;

          const newMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
            map: map
          });

          const newInfowindow = new kakao.maps.InfoWindow({
            content: MapMarker
          });
  
          newInfowindow.open(map, newMarker);

          setMarker(newMarker);
          setInfowindow(newInfowindow);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          lat: initialLatitude,
          lng: initialLongitude,
        }}
        style={{
          position: 'fixed',
          width: "calc(100% - 300px)",
          left: '300px',
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker position={{
          lat: initialLatitude,
          lng: initialLongitude,
        }}
        >
          <div style={{ padding: "5px", color: "#000" }}>
            Hello World! <br />
            <a
              href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"
              style={{ color: "blue" }}
              target="_blank"
              rel="noreferrer"
            >
            자세히보기
            </a>
            <a
              href="https://map.kakao.com/link/to/Hello World!,43.450701,126.570667"
              style={{ color: "blue" }}
              target="_blank"
              rel="noreferrer"
            >
            길 찾기
            </a>
          </div>
        </MapMarker>
      </Map>
    </div>
  );
};
