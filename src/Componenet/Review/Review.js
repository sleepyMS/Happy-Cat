import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

export default function Review() {
    const [searchRe, setSearchRe] = useState(""); // 서치 리뷰
    const [inputRe, setInputRe] = useState("");
    const [initialResults, setInitialResults] = useState([]); // 초기상태 관리
    const [visible, setVisible] = useState(false); // 출력상태 관리
    const reviews = [
        { 덴포라: "여행중 맛집으로 찾아서 갔습니다. 역시 신선한 재료로 푸짐하게 잘 먹었어요. 특히 랍스터 회 일품이었습니다. 랍스터 코스요리는 이곳이 짱!" },
        { 동백삼계탕: "몸보신하러가기딱좋습니다 직원분들친절하시고,음식도맛있어요 자주이용할것같아요" },
        { 수비가든: "정말 맛있습니다. 오리고기 잘 못 먹는데 여기는 잡내 하나도 없이 고소합니다. 최고입니다. 여름, 겨울 몸 보신에 짱입니다." },
        { 신토불이보쌈: "현지인맛집이라고 해서 방문했는데 정말감동적으로 맛있었습니다 육즙이 가득하고 풍미도좋구요 양도많아서 배터지는줄알았어요 다음에 또 부산에 방문한다면 꼭 다시가보고싶은 집입니다!!" },
        { 얌차이나: "매우 큰 새우와 게가 짬뽕에 들어가 있었고 짬뽕에 콩나물이 들어가 있어 국물이 속풀이하기에 얼큰하면서 시원하여 너무 좋았습니다." },
        { 양산국밥: "부산갔다오는길에 꼭 들리는 곳! 양산국밥! 따로국밥이랑 수육백반 시켰어요. 너무 뜨겁지 않고 깔끔한 국물맛이 자꾸 손이가요. 밑반찬도 하나하나 맛있고 만족스러웠어요." },
        { 해운마루: "부산 처음 놀러왔는데, 제 소원이 바닷가에서 회에 소주 한잔 마시는 거라 엄청 찾아봤는데요.여기가 그냥 원탑이였고, 실제로도 너무 멋진 풍경과 파도소리와 함께 맛있는 식사 할 수 있었습니다. 사진도 찍어주시고 매우 친절한 직원분들 덕에 추억안고 돌아갑니다!!" },
        { 거북선횟집: "문텐로드 산책 후 맛있게 먹었어요. 광어가 탱글탱글 푸짐해서 좋았어요. 낙지, 해삼, 멍게, 문어, 가리비도 곁들여줘서 접시 깨끗이 비웠어요. 매운탕까지 먹고나니 튀김과 생선구이는 테이크아웃 할 정도예요." },
        { 수백한상: "10년 단골인 돼지국밥, 순대국밥집이네요~ 해운대에 올때마다 방문해서 이제는 루틴이 되어 버렸네요. 국밥 특유의 돼지 냄새 같은 것은 전혀 없고, 테이블 등이 깨끗하게 되어 있어서 매번 만족스러웠던 식사가 가능합니다!" },
        { 원조지구촌한우생고기: "고기가 신선하고 맛있어요. 비계가 없는 안심 3인분으로 주문했는데. 완전 만족했어요.우거지된장도 맛있고. 수수부꾸미와 후식으로 얼음동동 식혜까지 완벽합니다.~~ 질 좋은 고기 원하시면. 여기 강추입니다" }
    ];
    const [resultRe, setResultRe] = useState('');
    const keys = reviews.map(review => Object.keys(review)[0]);
    const reviewRef = useRef(null);

    useEffect(() => { // 초기 상태 데이터 로딩
        axios
            .get(
                `https://apis.data.go.kr/6260000/BusanTblFnrstrnStusService/getTblFnrstrnStusInfo?serviceKey=J8BHaKwwrnDn5Qiv34%2Bl7WmnDAoE6%2FuBa4PzCPc%2BWPPzVZHxqHztek54o2C7NcDYIVQuRaRNVuec58%2FTSvzu4w%3D%3D&numOfRows=10&pageNo=1&resultType=json`
            )
            .then((response) => {
                const items = response.data.getTblFnrstrnStusInfo.body.items.item;
                setInitialResults(items);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        for (let i = 0; i < reviews.length; i++) {
            if (searchRe === Object.keys(reviews[i])[0]) {
                setResultRe(reviews[i][searchRe]);
                break;
            }
        }
    }, [searchRe]);

    return (
        <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
            <div style={{ position: 'relative' }}>
                <button onClick={() => setVisible(!visible)} style={{ position: 'absolute', right: '80px', bottom: '50px', scale: '1.5' }}>
                    dfjadklj
                </button>
                <div style={{ display: visible ? 'block' : 'none', position: 'absolute', backgroundColor: '#aaaaaa', width: '300px', height: '500px', right: '80px', bottom: '100px' }}>
                    <div style={{ position: 'absolute', width: '200px', height: '400px', right: '50px', top: '40px' }}>
                        {searchRe} : {resultRe}
                    </div>
                    <div style={{ position: 'absolute', bottom: '30px', left: '50px' }}>
                        <input className="review-input"
                            placeholder="식당명"
                            type="text"
                            ref={reviewRef}
                            value={inputRe}
                            onKeyDown={(evt) => {
                                if (evt.key === 'Enter') {
                                    setSearchRe(inputRe);
                                    reviewRef.current.focus();
                                }
                            }}
                            onChange={(e) => setInputRe(e.target.value)}
                            style={{ marginTop: '50px' }} />
                        <button onClick={() => {
                            setSearchRe(inputRe);
                            reviewRef.current.focus();
                        }}>검색</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
