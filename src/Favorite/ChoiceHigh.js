import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate , useLocation} from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function ChoiceHigh() {

    const navigate = useNavigate();
    const location = useLocation();
    const { HighFirst, metro_city_zustand, High_list, classHighFunction } = FavoriteStore();
    const [choice, setChoice] = useState("전체"); // 선택된값 - 지역
    const [second, setSecond] = useState("전체"); // 선택된값 - 유형

    // 정보저장 최대 3개
    function Save() {
        if(location.pathname.includes('class')){
            classHighFunction(choice + "," + second)
            navigate('/PostProgram/class')
        }
        else if(location.pathname.includes('tutor')){
            classHighFunction(choice + "," + second)
            navigate('/PostProgram/tutor')
        }
        else if(location.pathname.includes('Change')){
            HighFirst.push(choice + "," + second)
            navigate('/Favorite/Change/end')
        }
        else{
            navigate('/Favorite')
            HighFirst.push(choice + "," + second)
        }
    }

    // 초기화
    function Reset(){
        setChoice('전체')
        setSecond('전체')
    }


    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >
                    <div className={stylesSecond.Back_Arrow}
                    />
                    <span className={stylesSecond.HeaderText}>고등학교 찾기</span>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/Favorite')} />
                </div>

                {/* Intro */}
                <div className={stylesSecond.Intro}>
                    <MainBox>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <span style={{ fontWeight: "900" }}>어떤 고등학교 선배</span>
                            <span>를 찾으시나요</span>
                        </div>
                    </MainBox>
                    <div className={stylesSecond.IntroSub}>
                        학군에 맞는 멘토를 추천해드려요.
                    </div>
                </div>

                {/* 지역 */}
                <MainCity>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>시/도</span>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {metro_city_zustand.slice(0, 4).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {metro_city_zustand.slice(4, 7).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {metro_city_zustand.slice(7, 11).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {metro_city_zustand.slice(11, 15).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {metro_city_zustand.slice(15, 19).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                </MainCity>

                {/* 유형 */}
                <Sub>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>고교입시</span>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
                        {High_list.slice(0, 5).map((data, index) => (
                            <div key={index}>
                                {second == data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setSecond(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
                        {High_list.slice(5, 8).map((data, index) => (
                            <div key={index}>
                                {second == data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setSecond(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>
                </Sub>

                <div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <MainCityReset onClick={() => Reset()}>
                        초기화
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/reset.png" style={{ width: "12px", height: "12px", marginLeft: "6px" }} alt="img" />
                    </MainCityReset>
                </div>

                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => Save()}>
                        <span>저장</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChoiceHigh;

/* 인트로 전체박스 */
const MainBox = styled.div`
width: 100%;
height: 29px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
font-weight: 400;
font-size: 24px;
margin-bottom: 8px;
@media screen and (max-width: 400px) {
    font-size: 21px;
}
`;


/* 광역시  */
const MainCity = styled.div`
width: 90%;
height: auto;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
@media screen and (max-width: 540px) {
    height:auto;
}
`;

/* 광역시 개인 */
const MainCityIndividual = styled.div`
padding:8px 12px;
margin-right:6px;
border: 1px solid #DCDCDC;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #797979;
@media screen and (max-width: 540px) {
    margin-right:4px;
    padding:2.1vw 3.2vw;
}
`;

/* 광역시 개인 */
const MainCityChocie = styled.div`
padding:8px 12px;
margin-right:6px;
background: #00C563;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #FFFFFF;
@media screen and (max-width: 540px) {
    margin-right:4px;
    padding:2.1vw 3.2vw;
}
`;

/* 유형  */
const Sub = styled.div`
width: 90%;
height: 87.84px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
margin-top: 43.2px;
margin-bottom:192px;
@media screen and (max-width: 540px) {
    height: 16.2vw;
    margin-top:8vw;
}
@media screen and (max-width: 370px) {
    margin-top:35vw;
}
`;

/* 광역시 개인 */
const MainCityReset = styled.div`
padding:8px 12px;
border: 1px solid #DCDCDC;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #797979;
margin-bottom:16px;
@media screen and (max-width: 540px) {
    padding:2.1vw 3.2vw;
}
`;