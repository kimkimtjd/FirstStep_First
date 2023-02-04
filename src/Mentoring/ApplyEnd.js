import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PayStore from "../Zusatand/Pay";


function ApplyEnd() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [bank, setBank] = useState("");
    const { bank_info , bank_number } = PayStore();
    // const [nickname, setNickname] = useState([]);
    // console.log(location.pathname.split('/')[3]

    // 컨설팅 상세보기
    useEffect(() => {
        
            fetch(`/api/mentor/detail/${location.pathname.split('/')[3]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                    // console.log(data)
                });
        
       
    }, [data]);

    // 신청완료
    function Admin(){
       

        console.log( bank_info + bank_number + data.Value + "원", localStorage.getItem('id') , data.User , "컨설팅")
        fetch("/api/add/class/save/MentorProcess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mentor: data.User,
                mentir: localStorage.getItem('id') ,
                pay: bank_info + bank_number + data.Value + "원",
                category: "컨설팅",
            
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result === "success") {
                    alert("신청완료되었습니다.")
                    navigate('/')
                }
                else{
                    alert("오류가 발생하였습니다.")
                }
            })

    }


    return (
        <MentorText>
            <Top>
                <TopInner>
                <div style={{ width: "24px", height: "24px" }}></div>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결재상품내역</span>
                    <div style={{ width: "24px", height: "24px" }}></div>
                </TopInner>
            </Top>

            <PayBox style={{ marginTop:"24px" , paddingBottom:"30px"}}>
                <span style={{ fontSize:"24px" , fontWeight:"400" , color:"#515151"}}>결재상품내역입니다.</span>
                <div style={{ display:"flex" , flexDirection:"row"}}>
                    <span style={{ fontSize:"24px" , fontWeight:"600" , color:"#515151"}}>아래 계좌로 입금</span>
                    <span style={{ fontSize:"24px" , fontWeight:"400" , color:"#515151"}}>해주세요.</span>
                </div>
                <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#797979" , marginTop:"8px"}}>입금이 완료되면 관리자 승인이 진행돼요.</span>
            </PayBox>

            <Devinder />

           {/* 결재예정금액 */}
            <PayBox>
                <span style={{ color:"#515151" , fontSize:"16px" , fontWeight:"600"}}>결재상품</span>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>상품명</span>
                    <span>{data.ProgramName}</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"12px" , paddingBottom:"16px" }}>
                    <span>유형</span>
                    <span>클래스/{data.Time}</span>
                </PayTitle>
              
            </PayBox>
            
   

            {/* 결재금액 */}
            <PayBox>
                <span style={{ color:"#515151" , fontSize:"16px" , fontWeight:"600"}}>결재방식</span>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>예금주</span>
                    <span>안효상</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"12px" , }}>
                    <span>입금계좌</span>
                    <span>기업은행/5080-4566-1010-14</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"16px" , borderBottom:"1px solid #DCDCDC" , paddingBottom:"16px"}}>
                    <span>입금기한</span>
                    <span>기준일정 기획후 수정예정</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span style={{ fontSize:"14px" , fontWeight:"700" , color:"#515151"}}>총 결재 예정금액</span>
                    <span  style={{ fontSize:"24px" , fontWeight:"700" , color:"#515151"}}>{data.Value}원</span>
                </PayTitle>
            </PayBox>

  

           
    


            {/* 버튼 */}
            <ProfileBtn onClick={() => Admin()}>
                확인
            </ProfileBtn>
        </MentorText >
    );
}

export default ApplyEnd;

/* 전체박스 */
const MentorText = styled.div`
width:540px;
height:auto;
display:flex;
justify-content: cneter;
align-items: center;
flex-direction:column;
padding-bottom:100px;
@media screen and (max-width: 540px) {
    width:100%;
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

/* 프로그램명 및 설명 */
const ProfileBtn = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 90%;
height: 50px;
margin-top:170px;
background: #00C563;
border-radius: 8px;
color:white;
@media screen and (max-width: 540px) {
	}
`;

/* 입시컨설팅 제목 1번째  */
const Devinder = styled.div`
width: 100%;
height: 14.4px;
background: #F1F2F3;
border-top: 1px solid #DCDCDC;
@media screen and (max-width: 540px) {
    height: 2.6vw;
}
`;

/* 결재상품 */
const PayBox = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction:column;
margin-top:42px;
width: 90%;
height: auto;
@media screen and (max-width: 540px) {
	}
`;

/* 상품명 , 유형 */
const PayTitle = styled.div`
display: flex;
justify-content:space-between;
align-items: flex-start;
flex-direction:row;
width: 90%;
height: auto;
font-weight: 400;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
	}
`;


