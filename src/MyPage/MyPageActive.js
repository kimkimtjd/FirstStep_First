import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageActive() {

    const navigate = useNavigate();
    const [data, setData] = useState("멘티");

   

    // 로그인 유지 검증

    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Mypage')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>활동내역</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>

                <ChoiceBox>
                    <ChoiceInner>
                        {data === "멘티" ?
                            <>
                                <ChoiceHalfChoice>멘티</ChoiceHalfChoice>
                                <ChoiceHalf onClick={() => setData("멘토")}>멘토</ChoiceHalf>
                            </>
                            :
                            <>
                                <ChoiceHalf onClick={() => setData("멘티")}>멘티</ChoiceHalf>
                                <ChoiceHalfChoice>멘토</ChoiceHalfChoice>
                            </>
                        }
                    </ChoiceInner>
                </ChoiceBox>

                {data === "멘티" ?
                    <>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화내역이 아직없어요.</span>
                        </div>
                        <FindConsulting onClick={() => navigate('/')}>
                            컨설팅 찾으러가기 {">"}
                        </FindConsulting>

                        <FirstSpace />

                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화내역이 아직없어요.</span>
                        </div>
                        <FindConsulting onClick={() => navigate('/')}>
                            클래스 찾으러가기 {">"}
                        </FindConsulting>

                    </>
                    :
                    <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "213px" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "65%", height: "auto" ,textAlign:"center" }}>
                                <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>멘토가 되어 나만의 경험과 노하우를멘티들에게 알려주세요!</span>
                            </div>
                        </div>
                        <FindConsulting onClick={() => navigate('/PostProgram')}>
                            멘토 신청하기 {">"}
                        </FindConsulting>


                    </>
                }
            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default MyPageActive;

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