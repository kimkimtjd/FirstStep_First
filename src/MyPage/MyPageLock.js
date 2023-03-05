import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageLock() {

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
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>보안</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>

                <SecondLine>
          <SecondLineinner>
        
            <FirstLineinnerborderbottom onClick={() => navigate('/Find/pw')} >
              <span>비밀번호 변경</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
           
          </SecondLineinner>
        </SecondLine>
</MainBox>

        </>
    );
}

export default MyPageLock;

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


/* 옵션이 2개 */
const SecondLine = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
height: 190.08px;
@media screen and (max-width: 540px) {
  height: 35.2vw;  
}
`;

/* 옵션이 2개 */
const SecondLineinner = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction:column;
width: 85%;
height: 167.04px;
@media screen and (max-width: 540px) {
  height: 30.9vw;  
}
`;

/* 옵션이 1개 */
const FirstLineinnerborderbottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction:row;
width: 100%;
height: 74.88px;
border-bottom: 1px solid #F1F2F3;
@media screen and (max-width: 540px) {
  height: 13.8vw;  
}
`;

/* 옵션이 1개 */
const FirstLineinnerfirst = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction:row;
width: 100%;
height: 74.88px;
@media screen and (max-width: 540px) {
  height: 13.8vw;  
}
`;