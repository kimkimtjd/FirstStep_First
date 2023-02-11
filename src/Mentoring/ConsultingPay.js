import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PayStore from "../Zusatand/Pay";


function ConsultingPay() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [bank, setBank] = useState("");
    const { bank_info , bank_number_function } = PayStore();
    // const [nickname, setNickname] = useState([]);
    // console.log(location.pathname.split('/')[3]

    // 컨설팅 상세보기
    useEffect(() => {
        if(location.pathname.includes('end')){
            fetch(`/api/mentor/detail/${location.pathname.split('/')[4]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                    // console.log(data)
                });
        }
        else{
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
        }
       
    }, [data]);

    // 은행정보
    useEffect(() => {
        if (bank !== "") {
            bank_number_function(bank);
        }
    }, [bank]);



    return (
        <MentorText>
            <Top>
                <TopInner>
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                        onClick={() => navigate(`/Consultng/detail/${data.id}`)} />
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제</span>
                    <div style={{ width: "24px", height: "24px" }}></div>
                </TopInner>
            </Top>

           {/* 결제예정금액 */}
            <PayBox>
                <span style={{ color:"#515151" , fontSize:"16px" , fontWeight:"600"}}>결제상품</span>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>상품명</span>
                    <span>{data.ProgramName}</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"12px" , paddingBottom:"16px" , borderBottom:"1px solid #DCDCDC"}}>
                    <span>유형</span>
                    <span>클래스/{data.Time}</span>
                </PayTitle>
                <PayValue>
                    <span style={{ fontSize:"14px" , fontWeight:"700" }}>총 결제예정 금액</span>
                    <span  style={{ fontSize:"24px" , fontWeight:"700" }}>{data.Value}원</span>
                </PayValue>
            </PayBox>
            
            <Devinder />

            {/* 결제금액 */}
            <PayBox>
                <span style={{ color:"#515151" , fontSize:"16px" , fontWeight:"600"}}>결제방식</span>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>예금주</span>
                    <span>안효상</span>
                </PayTitle>
                <PayTitle style={{ marginTop:"12px" , paddingBottom:"16px" , paddinBottom:"24px"}}>
                    <span>입금계좌</span>
                    <span>기업은행/5080-4566-1010-14</span>
                </PayTitle>
            </PayBox>

            <Devinder />

             {/* 입금자 정보 확인 */}
             <PayBox style={{ paddingBottom:"32px"}}>
                <span style={{ color:"#515151" , fontSize:"16px" , fontWeight:"600"}}>입금자 정보확인</span>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>입금은행</span>
                    {location.pathname.includes('end') ?
                    <span style={{ color:"#00C563" }} onClick={()=> navigate(`/`)}>{bank_info}</span>
                    :
                    <span style={{ color:"#00C563" }} onClick={()=> navigate(`/Consultng/choice/bank/${data.id}`)}>은행을 선택해주세요</span>
                    }
                </PayTitle>
                <PayTitle style={{ marginTop:"12px" , paddingBottom:"16px" , paddinBottom:"24px" , flexDirection:"column"}}>
                    <span>예금주명</span>
                    <input style={{ width: "100%", height: "56px" , marginTop:"16px" , border:"1px solid #DCDCDC" , borderRadius:"8px"}}
                                    onChange={(e) => setBank(e.target.value)}
                                    value={bank}
                                    placeholder="예금주명을 입력해주세요"
                                    type="text"
                                />
                </PayTitle>
                <PayTitle style={{ marginTop:"16px"}}>
                    <span>입금기한</span>
                    <span style={{ color:"#00C563" }}>기준일정 기획후 수정예정</span>
                </PayTitle>
            </PayBox>

            <Devinder />

            <PayCertify>
                <div style={{ width:"24px" , height:"24px" , marginRight:"4px" , border:"1px solid #DCDCDC" }}/>
                <span style={{ fontSize:"16px" , fontWeight:"600" , color:"#515151"}}>결제내용 확인 및 동의</span>
                <span style={{ fontSize:"16px" , fontWeight:"600" , color:"#00C563"}}>(필수)</span>
            </PayCertify>


            {/* 버튼 */}
            <ProfileBtn onClick={() => navigate(`/Consultng/end/${data.id}`)}> 
                확인
            </ProfileBtn>
        </MentorText >
    );
}

export default ConsultingPay;

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

/* 결제상품 */
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

/* 결제금액 */
const PayValue = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
flex-direction:row;
width: 90%;
height: auto;
font-weight: 400;
font-size: 14px;
color: #515151;
margin-top:16px;
padding-bottom:32px;
@media screen and (max-width: 540px) {
	}
`;

/* 이용약관 */
const PayCertify = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction:row;
width: 90%;
margin-top:16px;
margin-bottom:63px;
height: auto;
@media screen and (max-width: 540px) {
	}
`;
