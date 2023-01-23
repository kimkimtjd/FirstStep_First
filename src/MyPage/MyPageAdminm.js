import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageAdmin() {

  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`/api/user/Emailname/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data.user);
      });

  }, []);


  // 로그인 유지 검증

  return (

    <>
      <MainBox>
        <Top>
            <TopInner>
                <div style={{ width:"24px" , height:"24px" }}></div>
                <span style={{ fontSize:"16px" , fontWeight:"700" , color:"#3F3F3F"}}>내 정보관리</span>
                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" style={{ width:"24px" , height:"24px" }} 
                onClick={() => navigate('/Mypage')}/> 
            </TopInner>
        </Top>
    
        <LogoBox>
            <LogoInner>
                <Profile src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Logo.png" />
                <div style={{ display:"flex" , flexDirection:"row" , justifyContent:"center" , alignItems:"center"}} onClick={() => navigate('/Mypage/admin/nickname')}> 
                    <span style={{ marginRight:"4px" , color:"#515151" , fontWeight:"400" , fontSize:"16px"}}>{data}</span>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Edit.png" style={{ height: "12px", width: "auto" }} />
                </div>
            </LogoInner>
        </LogoBox>

        <FirstSpace />

       
      </MainBox>



    </>
  );
}

export default MyPageAdmin;

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

/* 이미지 부분 */
const LogoBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 159.84px;
@media screen and (max-width: 540px) {
    height:29.6vw;
	}
`;

/* 이미지 부분 내부 */
const LogoInner = styled.div`
display: flex;
flex-direction:column;
justify-content:space-between;
align-items: center;
width: 111.48px;
height: 159.84px;
@media screen and (max-width: 540px) {
    height:29.6vw;
	}
`;

/* 프로필 이미지 */
const Profile = styled.img`
width:100%;
height: auto;
@media screen and (max-width: 540px) {
}
`;

/* 상단 활동내역 하단부분   */
const FirstSpace = styled.div`
width: 100%;
height: 10px;
background:#F1F2F3;
margin-top:24px;
@media screen and (max-width: 540px) {
  height: 2.6vw;  
}
`;

/* 상단부분 */
const EditBox = styled.div`
display: flex;
flex-direction:row;
justify-content: center;
align-items: center;
width: 100%;
height: auto;
margin-top:47px;
@media screen and (max-width: 540px) {
	}
`;

/* 상단부분 내부 */
const EditInner = styled.div`
display: flex;
flex-direction:row;
justify-content: flex-start;
align-items: center;
width: 90%;
height: auto;
font-style: normal;
font-weight: 400;
font-size: 16px;
color: #000000;
@media screen and (max-width: 540px) {
	}
`;
