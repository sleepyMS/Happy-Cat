import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import useKakaoLoader from './useKakaoLoader';
const { kakao } = window;

export default function MyMap({ search }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [initialLatitude, setInitialLatitude] = useState(37.277272);
  const [initialLongitude, setInitialLongitude] = useState(127.134346);
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [add, setAdd] = useState('');
  const [num, setNum] = useState('');
  const [data, setData] = useState([]);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
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
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const { bsnsNm, lat, lng, addrRoad, tel, bsnsCond } = data[i];
      if (bsnsNm.includes(search)) {
        setInitialLatitude(lat);
        setInitialLongitude(lng);
        setName(bsnsNm);
        setAdd(addrRoad);
        setNum(tel);
        setCar(bsnsCond);
      }
    }
  }, [search, data]);


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
            <button onClick={() => setInfoWindowOpen(!infoWindowOpen)}>
              자세히 보기
            </button>

            <div style={{ display: infoWindowOpen ? "block" : "none", position: 'absolute', padding: "5px", color: "#000", background: "white", width: "300px", border: '1px solid black', top: '0', right: 'calc(100% + 10px)' }}>
              <p>가게 이름: {name}</p>
              <p>식사류: {car}</p>
              <p>주소: {add}</p>
              <p>전화번호: {num}</p>
            </div>

            <button
              onClick={() => window.open("https://map.kakao.com/link/to/" + name + "," + initialLatitude + "," + initialLongitude, "_blank")}

            >
              길 찾기
            </button>
            <button
              onClick={() => console.log("책갈피")}
              style={{ marginLeft: "10px" }}
            >
              책갈피(가 되고 싶은 것.)
            </button>
          </div>
        </MapMarker>
      </Map>
    </div >
  );
};
