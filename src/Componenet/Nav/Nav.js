import React, { useState, useEffect, useRef } from 'react';
import MyMap from '../Map/Map'
import axios from 'axios';

export default function Nav() {
    const [search, setSearch] = useState('');
    const [find, setFind] = useState('');
    const [dataBases, setDataBases] = useState([]);
    const [bookMark, setBookMark] = useState([]);
    const navRef = useRef(null);

    const searchReset = () => {
        setSearch(find);
        setFind('');
        navRef.current.focus();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://apis.data.go.kr/6260000/BusanTblFnrstrnStusService/getTblFnrstrnStusInfo?serviceKey=wRLho0kCMjLKJpoZen9ZjkdIKqy%2F9lIBdPWyQs3IaxRX4bbCYMpSMrkTeSClT84fLZIHAMS6PmRAik0JjHYv8A%3D%3D&numOfRows=50&pageNo=1&resultType=json'
                );
                setDataBases(response.data.getTblFnrstrnStusInfo.body.items.item);
            } catch (error) {
                console.log('error:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <div id='nav' style={{ position: 'absolute', height: '100vh', width: '300px', backgroundColor: '#cccccc', textAlign: 'center' }}>
                <input className="nav-input"
                    placeholder="식당명"
                    type="text"
                    ref={navRef}
                    value={find}
                    onKeyDown={(evt) => {
                        if (evt.key === 'Enter') {
                            setSearch(find);
                            setFind('');
                            navRef.current.focus();
                        }
                    }}
                    onChange={(e) => setFind(e.target.value)}
                    style={{ marginTop: '50px' }} />
                <button onClick={searchReset}>검색</button>
                <NavDraw dataBases={dataBases} bookMark={bookMark} setBookMark={setBookMark} />

            </div>
            <MyMap search={search} bookMark={bookMark} setBookMark={setBookMark} />
        </div>
    );
}

const NavDraw = ({ dataBases, bookMark, setBookMark }) => {
    const [drawNav, setDrawNav] = useState(0);
    const [resultData, setResultData] = useState(dataBases);

    useEffect(() => {
        let filterData = [];
        if (drawNav === 0) {
            for (let i = 0; i < dataBases.length; i++) {
                const { bsnsNm } = dataBases[i];
                filterData = [...filterData, { bsnsNm: '가게명: ' + bsnsNm }];
            }
        } else if (drawNav === 1) {
            for (let i = 0; i < dataBases.length; i++) {
                const { bsnsNm, tel, bsnsCond } = dataBases[i];
                filterData = [...filterData, { bsnsNm: '가게명: ' + bsnsNm, tel: '가게 번호: ' + tel, bsnsCond: '가게 유형: ' + bsnsCond }];
            }
        } else if (drawNav === 2) {
            for (let i = 0; i < dataBases.length; i++) {
                const { bsnsNm, tel, bsnsCond } = dataBases[i];
                if (bsnsCond === '한식') {
                    filterData = [...filterData, { bsnsNm: '가게명: ' + bsnsNm, tel: '가게 번호: ' + tel, bsnsCond: '가게 유형: ' + bsnsCond }];
                }
            }
        } else if (drawNav === 3) {
            for (let i = 0; i < bookMark.length; i++) {
                filterData = [...filterData, { bsnsNm: bookMark[i] }]
            }
        }
        setResultData(filterData);
    }, [drawNav, dataBases]);

    return (
        <div id='nav-draw'>
            <div className='nav-btn-box' style={{ marginTop: '50px' }}>
                <button type='button' onClick={() => setDrawNav(0)}>가게명</button>
                <button type='button' onClick={() => setDrawNav(1)}>가게명+가게정보</button>
                <button type='button' onClick={() => setDrawNav(2)}>한식집 정보</button>
                <button type='button' onClick={() => setDrawNav(3)}>책갈피 보기</button>
            </div>
            <NavList resultData={resultData} />
        </div>
    );
}

const NavList = ({ resultData }) => {
    return (
        <div style={{ textAlign: 'left', marginTop: '50px', overflowY: 'scroll', height: 'calc(100vh - 190px)', backgroundColor: '#dddddd' }}>
            {resultData.map((e) => (<ul>
                <li>{e.bsnsNm}</li>
                <li>{e.tel}</li>
                <li>{e.bsnsCond}</li>
                <hr />
            </ul>))}
        </div>
    );
}