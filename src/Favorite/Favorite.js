import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function Favorite() {

    const navigate = useNavigate();
    const { HighFirst, UniversityFirst } = FavoriteStore();


    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/')} />
                    <span className={stylesSecond.HeaderText}>관심학군 등록</span>
                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* Intro */}
                <div className={stylesSecond.Intro}>
                    <div className={stylesSecond.IntroTextFindid}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ fontWeight: "900" }}>어떤선배를</div>
                            <div>찾으시나요</div>
                        </div>
                    </div>
                    <div className={stylesSecond.IntroSub}>
                        학군에 맞는 멘토를 추천해드려요.
                    </div>
                </div>


                <MainBox>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>고등학교</span>
                    {HighFirst.map((data, index) => (
                        <ChoiceHigh key={index}>
                            <High_Locate>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>시/도</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{data.split(',')[0]}</span>
                                </div>
                            </High_Locate>
                            <High_Project>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>고등학교 유형</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{data.split(',')[1]}</span>
                                </div>
                            </High_Project>
                        </ChoiceHigh>
                    ))}
                    {HighFirst.length === 3 ?
                        ""
                        :
                        <MainSecond onClick={() => navigate('/Favorite/ChoiceHigh')} >
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            추가하기
                        </MainSecond>

                    }
                </MainBox>

                <MainThird>
                    <span>대학교</span>
                        {UniversityFirst.map((data, index) => (
                            <ChoiceHigh key={index}>
                            <Universe_Project>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>{data.split(',')[1]}</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{data.split(',')[0]}</span>
                                </div>
                            </Universe_Project>
                        </ChoiceHigh>
                        ))}

                        {UniversityFirst.length === 3 ?
                        ""
                        :
                        <MainSecond onClick={() => navigate('/Favorite/ChoiceUniversity')} >
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            추가하기
                        </MainSecond>

                    }
                </MainThird>

                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => navigate('/Favorite/ChoiceSecond')}>
                        <span>다음</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Favorite;

/* 고등 대학교 전체박스 */
const MainBox = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
@media screen and (max-width: 540px) {
    }
`;


/* 고등  전체박스 */
const MainSecond = styled.div`
width:100%;
height:24.48px;
display: flex;
justify-content:flex-start;
align-items: center;
margin-top:16px;
font-weight: 400;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    height:4.5vw;
    }
`;

/* 고등 선택된부분 */
const ChoiceHigh = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:space-between;
align-items: center;
flex-direction:row;
margin-top:16px;
@media screen and (max-width: 540px) {
    height:14.9vw;
    }
`;

/* 고등 선택된부분 지역 */
const High_Locate = styled.div`
width:164.16px;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    width:30.4vw;
    height:14.9vw;
    }
`;

/* 고등 선택된부분 유형*/
const High_Project = styled.div`
width:306.7px;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    width:56.8vw;
    height:14.9vw;
    }
`;

/* 대학 선택된부분 유형*/
const Universe_Project = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    height:14.9vw;
    }
`;

/* 대학교 전체박스 */
const MainThird = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top:40px;
margin-bottom: 323px;
@media screen and (max-width: 540px) {
    }
`;