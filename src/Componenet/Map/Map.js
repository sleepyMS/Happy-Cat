import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from './useKakaoLoader';
const { kakao } = window;

export default function MyMap({search}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [initialLatitude, setInitialLatitude] = useState(37.277272);
  const [initialLongitude, setInitialLongitude] = useState(127.134346);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  useKakaoLoader()

  useEffect(() => {
    axios
      .get('https://apis.data.go.kr/6260000/BusanTblFnrstrnStusService/getTblFnrstrnStusInfo?serviceKey=GMMb25M6CeNcyjdi0iJYWziSyQ1XhLZkO9vfxnVW391ZbRvT%2BeUSs5MoCDmD6YzF38nAucMZbMWtobyJW84gYA%3D%3D&numOfRows=100&pageNo=1&resultType=json')

      .then((response) => {
        setData(response.data.getTblFnrstrnStusInfo.body.items.item);
        console.log(response.data);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(()=>{
    for (let i = 0; i < data.length; i++) {
      const { bsnsNm, lat, lng } = data[i];
      if (bsnsNm.includes(search)) {
        setInitialLatitude(lat);
        setInitialLongitude(lng);
        setName(bsnsNm);
      }
  }
  }, [search])

  return (
    <div>
      <Map
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
        level={3}
      >
        <MapMarker position={{
          lat: initialLatitude,
          lng: initialLongitude,
        }}
        >
          <div style={{ padding: "5px", color: "#000" }}>
            {name} <br />
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