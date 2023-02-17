import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function Alarm() {

    const navigate = useNavigate();
    const [data, setData] = useState("활동알림");
    const [alarm, setAlarm] = useState([]);

    useEffect(() => {
        fetch(`/api/add/class/certify/alarm/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAlarm(data)
                
            });
    }, []);

    console.log(alarm)

    // 로그인 유지 검증

    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>알림</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>

                <ChoiceBox>
                    <ChoiceInner>
                        {data === "활동알림" ?
                            <>
                                <ChoiceHalfChoice>활동알림</ChoiceHalfChoice>
                                <ChoiceHalf onClick={() => setData("공지사항")}>공지사항</ChoiceHalf>
                            </>
                            :
                            <>
                                <ChoiceHalf onClick={() => setData("활동알림")}>활동알림</ChoiceHalf>
                                <ChoiceHalfChoice>공지사항</ChoiceHalfChoice>
                            </>
                        }
                    </ChoiceInner>
                </ChoiceBox>

                {data === "활동알림" ?
                    <>
                        {alarm.length === 0 ?
                            <>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "150px" }}>
                                   <img src = "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Noalarm.png" style={{ width:"140px" , height:"auto"}}/>
                                </div>
                            </>
                            :
                            <>
                                {alarm.map((data, index) => (
                                    <div key={index} style={{ width: "90%", height: "70px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ width: "80%", height: "100%", display: "flex", flexDirection: "column" ,marginTop:"12px" }}>
                                            <span style={{ fontSize:"12px" ,fontWeight:"600" , color:"#515151" }}>
                                                {data.Pay_yn === "Y" ?
                                                    "승인완료" : "승인대기"
                                                }
                                            </span>
                                            <span  style={{ fontSize:"12px" ,fontWeight:"400" , color:"#AEAEB2"}}> 
                                                {data.Pay_yn === "Y" ?
                                                    "입금하신" + data.ProgramName?.split("-")[0] + "이 현재 승인대기중입니다" :
                                                    "신청하신" + data.ProgramName?.split("-")[0] + "의 채팅방이 개설되었습니다."
                                                }
                                            </span>
                                        </div>
                                        <div style={{ width: "80%", height: "100%", display: "flex" , justifyContent:"flex-end" , alignItems:"flex-start"}}>
                                        <span  style={{ fontSize:"12px" ,fontWeight:"400" , color:"#AEAEB2"}}>{data.Entertime?.substr(0, 10)}-{data.Entertime?.substr(12, 4)}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </>
                    :
                    <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "150px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>공지사항이 없어요.</span>
                        </div>
                    </>
                }
            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default Alarm;

/* 전체박스 */
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
@media screen and (max-width: 540px) {
		width: 100%;
	}
`;


/* 상단부분 */
const Top = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 60.48px;
margin-bottom:24px;
@media screen and (max-width: 540px) {
    height:11.2vw;
	}
`;

/* 상단부분 내부 */
const TopInner = styled.div`
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
width: 90%;
height: 60.48px;
@media screen and (max-width: 540px) {
    height:11.2vw;
	}
`;

/* 상단부분 내부 */
const ChoiceBox = styled.div`
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
width: 100%;
height: 69.12px;
@media screen and (max-width: 540px) {
    height:12.8vw;
	}
`;

/* 상단부분 내부 */
const ChoiceInner = styled.div`
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
width: 90%;
height: 69.12px;
@media screen and (max-width: 540px) {
    height:12.8vw;
	}
`;

/* 상단부분 내부 */
const ChoiceHalf = styled.div`
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
width: 50%;
height: 69.12px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    height:12.8vw;
	}
`;

/* 상단부분 내부 */
const ChoiceHalfChoice = styled.div`
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
width: 50%;
height: 69.12px;
border-bottom:1px solid #00C563;
color:#00C563;
font-weight: 700;
font-size: 14px;
@media screen and (max-width: 540px) {
    height:12.8vw;
	}
`;

/* 상단 활동내역 하단부분   */
const FirstSpace = styled.div`
width: 100%;
height: 10px;
background:#F1F2F3;
margin-top:40px;
@media screen and (max-width: 540px) {
  height: 2.6vw;  
}
`;

/* 컨설팅 찾으러가기 */
const FindConsulting = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 90%;
margin-top:24px;
height: 72px;
border: 1px solid #DCDCDC;
border-radius: 8px;
color:#797979;
font-weight: 700;
font-size: 14px;
@media screen and (max-width: 540px) {
    height:13.3vw;
	}
`;