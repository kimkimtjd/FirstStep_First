import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonTop from "./Common/CommonTop";
import MainFirst from "./Main/MainFirst";
import MainSecond from "./Main/MainSecond";
import CommonNavigation from "./Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "./Zusatand/Admin";
import Footer from "./Common/Footer";

function App() {

  const { LoginCertify, Login } = useStore();
  const [choice, setChoice] = useState(true); // 관심사 선택여부 검증
  const [ChoiceData, setChoiceData] = useState([]); // 관심사 선택여부 검증

  const navigate = useNavigate();


  // 로그인 유지 검증
  useEffect(() => {
    if (localStorage.getItem('maintail')) {
      LoginCertify();
    }
  }, [LoginCertify]);

  // 관심사 선택여부 검증
  useEffect(() => {
    fetch(`/api/favorite/certify/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.result === "fail") {
          setChoice(false)
        }
      });
  }, [choice]);

  // 관심사 선택여부 검증
  useEffect(() => {
    fetch(`/api/favorite/info/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setChoiceData(data);
      });
  }, []);



  // 관심사 입력여부 검증
  function Test() {
    fetch(`/api/favorite/certify/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.result === "fail") {
          navigate('/Favorite/Change')
        }
        else if (data.result === "success") {
          navigate('/Favorite')
        }
      });
  }



  return (

    <>
      <MainBox>
        <CommonTop />

        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%A9%98%ED%86%A0+%EB%93%B1%EB%A1%9D+%EB%9D%A0%EB%B0%B0%EB%84%88.png"
          style={{ width: "100%", height: "auto", cursor: "pointer" , marginTop:"18px" }} onClick={() => Login ? navigate('/Login') : navigate('/PostProgram')} />

        <Favorite>
          {choice ?
            <Favoriteinner onClick={() => Login ? navigate('/Login') : Test()}>
            <div style={{ width:"85%" , height:"100%" , display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#515151", width:"15%"}}>필터</span>
              <MentorText>맞춤멘토 찾기</MentorText>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow.png" style={{ width:"5px" , height:"auto"}}/>
              </div>
            </Favoriteinner>
            :
            <Favoriteinner onClick={() => navigate('/Favorite/Change')}>
            <div style={{ width:"90%" , height:"100%" , display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#515151", marginLeft: "16px" , width:"40%" }}>관심태그</span>
              <MentorTextAfter>{ChoiceData[0]?.First}{ChoiceData[0]?.Second}{ChoiceData[0]?.Third}{ChoiceData[0]?.Four}{ChoiceData[0]?.Five}</MentorTextAfter>
              <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow.png" style={{ width:"5px" , height:"auto"}}/>
              </div>
            </Favoriteinner>
           
          }
        </Favorite>

        <MainFirst />

        <MainSecond />


        <Footer/>

      </MainBox>


      {/* 하단 네비게이션바 */}
      <CommonNavigation />
    </>
  );
}

export default App;

/* 전체박스*/
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height:auto;
margin-top: 43px;
padding-bottom:10px;
@media screen and (max-width: 540px) {
		width: 100%;
	}
`;

/* 관심사 */
const Favorite = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height:103.68px;
@media screen and (max-width: 540px) {
		height: 19.2vw;
	}
`;

/* 관심사 내부 */
const Favoriteinner = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 90%;
height:69.12px;
background: #E2FFF1;
border-radius: 8px;
cursor:pointer;
@media screen and (max-width: 540px) {
		height: 12.8vw;
	}
`;

/* 멘토링 등록 문구 */
const MentorText = styled.span`
font-size:14px;
font-weight:400;
color:#8E8E93;
margin-left:8.64px;
margin-right:97.92px;
@media screen and (max-width: 540px) {
  margin-left:1.6vw;
  margin-right:18.1vw;
}
}
`;

/* 관심사 등록완료후 */
const MentorTextAfter = styled.span`
font-size:14px;
font-weight:400;
color:#8E8E93;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
@media screen and (max-width: 540px) {
}
}
`;
