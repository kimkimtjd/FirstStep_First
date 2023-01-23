import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonTop from "../Common/CommonTop";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPage() {

  const { LoginCancel, Login , LoginCertify } = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // 로그인 유지 검증
  useEffect(() => {
    if (localStorage.getItem('maintail')) {
      LoginCertify();
      // 유저정보
    }
  }, [Login]);

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

  function LogOut() {
    LoginCancel();
    localStorage.clear();
  }

  // 로그인 유지 검증

  return (

    <>
      <MainBox>

        {/* 상단부분 */}
        <UserBox>
          <UserInnerBox>

            <UserHalfBox>
              <ProfileBox>
                <Profile src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Logo.png" onClick={() => Login ? navigate('/Choice') : navigate('/Mypage/admin')} />
                {Login ?
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "bold" }}>로그인/회원가입</span>
                    <span>이필요합니다.</span>
                  </div>
                  :
                  <>
                    <span style={{ fontWeight: "bold" }}>{data}</span>
                    <span>님</span>
                  </>
                }
              </ProfileBox>

              <LoginBox onClick={()=> Login ? "" : LogOut()}>
                {Login ?
                  "로그인/회원가입" : "내 정보 관리"
                }
              </LoginBox>

            </UserHalfBox>

            <Active>
              <Activeinner>
                <Activeindividual onClick={() => navigate('/Mypage/active')}>
                  <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Active.png" style={{ height: "18px", width: "auto" }} />
                  <span style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", color: "#797979" }}>활동내역</span>
                </Activeindividual>
                <Activeindividualcenter onClick={() => navigate('/Mypage/book')}>
                  <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Book.png" style={{ height: "18px", width: "auto" }} />
                  <span style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", color: "#797979" }}>북마크</span>
                </Activeindividualcenter>
                <Activeindividual onClick={() => navigate('/Mypage/review')}>
                  <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/MyPage_Edit.png" style={{ height: "18px", width: "auto" }} />
                  <span style={{ marginTop: "8px", fontSize: "12px", fontWeight: "600", color: "#797979" }}>나의후기</span>
                </Activeindividual>
              </Activeinner>
            </Active>

          </UserInnerBox>
        </UserBox>

        <FirstSpace />

        {/* 결재수단 */}
        <SecondLine>
          <SecondLineinner>
            <span style={{ color: "#AEAEB2", fontSize: "10px", fontWeight: "500" }}>계정관리</span>
            <FirstLineinnerborderbottom>
              <span>보안</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
            <FirstLineinnerfirst>
              <span>알림</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerfirst>
          </SecondLineinner>
        </SecondLine>

        <FirstSpaceNomargin />

        {/* 고객센터 */}
        <SecondLine>
          <SecondLineinner>
            <span style={{ color: "#AEAEB2", fontSize: "10px", fontWeight: "500" }}>고객센터</span>
            <FirstLineinnerborderbottom>
              <span>공지사항</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
            <FirstLineinnerfirst>
              <span>도움말 및 문의하기</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerfirst>
          </SecondLineinner>
        </SecondLine>

        <FirstSpaceNomargin />


        <ThirdLine>
          <ThirdLineinner>
            <FirstLineinnerborderbottom>
              <span>약관 및 정책</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
            <FirstLineinnerborderbottom>
              <span>서비스 해지 및 탈퇴</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
            <FirstLineinnerborderbottom>
              <span>버전</span>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
            </FirstLineinnerborderbottom>
          </ThirdLineinner>
        </ThirdLine>

      </MainBox>



      {/* 하단 네비게이션바 */}
      <CommonNavigation />
    </>
  );
}

export default MyPage;

/* 전체박스*/
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

/* 상단 내부박스 */
const UserBox = styled.div`
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

/* 상단 내부박스 */
const UserInnerBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
height: 210.24px;
@media screen and (max-width: 540px) {
  height: 38.9vw;
}
`;

/* 상단 내부박스 */
const UserHalfBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 50%;
@media screen and (max-width: 540px) {
}
`;

/* 프로필 */
const ProfileBox = styled.div`
display: flex;
flex-direction: row;
justify-content:flex-start;
align-items: center;
width: 257.76px; 
height: 50%;
@media screen and (max-width: 540px) {
  width:47.3vw;
}
`;

/* 프로필 이미지 */
const Profile = styled.img`
width:auto;
height: 52.55px;
margin-right:12px;
@media screen and (max-width: 540px) {
  height:9.7vw;
}
`;

/* 로그인유무 */
const LoginBox = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 105.1px;
height:33.12px;
border: 0.75px solid #DCDCDC;
border-radius: 4px;
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #797979;
@media screen and (max-width: 540px) {
  width:19.4vw;
  height:6.1vw;
}
`;

/* 상단 내부박스 */
const Active = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 50%;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
  
}
`;

/* 상단 활동내역 및 내부 박ㅅ, */
const Activeinner = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
height: 83.52px;
@media screen and (max-width: 540px) {
  height: 15.4vw;  
}
`;

/* 상단 활동내역 및 기타 개별 */
const Activeindividual = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
width: 33.33%;
height: 83.52px;
cursor:pointer;
@media screen and (max-width: 540px) {
  height: 15.4vw;  
}
`;

/* 상단 활동내역 및 기타 개별 */
const Activeindividualcenter = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
width: 33.33%;
height: 83.52px;
border-right: 1px solid #F1F2F3;
border-left: 1px solid #F1F2F3;
cursor:pointer;
@media screen and (max-width: 540px) {
  height: 15.4vw;  
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

/* 상단 활동내역 하단부분   */
const FirstSpaceNomargin = styled.div`
width: 100%;
height: 10px;
background:#F1F2F3;
@media screen and (max-width: 540px) {
  height: 2.6vw;  
}
`;

/* 옵션이 1개 */
const FirstLine = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
height: 115.2px;
@media screen and (max-width: 540px) {
  height: 21.3vw;  
}
`;

/* 옵션이 1개 */
const FirstLineinner = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
width: 85%;
height: 99.2px;
@media screen and (max-width: 540px) {
  height: 18.3vw;  
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
justify-content: center;
align-items: flex-start;
flex-direction:column;
width: 85%;
height: 167.04px;
@media screen and (max-width: 540px) {
  height: 30.9vw;  
}
`;

/* 옵션만 3개 */
const ThirdLine = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
height: 224.64px;
@media screen and (max-width: 540px) {
  height: 41.6vw;  
}
`;

/* 옵션만 3개 */
const ThirdLineinner = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
flex-direction:column;
width: 90%;
height: 224.64px;
@media screen and (max-width: 540px) {
  height: 41.6vw;  
}
`;