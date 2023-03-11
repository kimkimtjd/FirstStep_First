import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import PayStore from "../Zusatand/Pay";
import styled from "styled-components";

function ChoiceBank() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [choice, setchoice] = useState("");

    const { Bank_List, bank_function } = PayStore();
    // const [nickname, setNickname] = useState([]);
    // console.log(location.pathname.split('/')[3]

    // 컨설팅 상세보기
    useEffect(() => {
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


    }, [data]);



    // 은행정보
    useEffect(() => {
        if (choice !== "") {
            bank_function(choice);
        }
    }, [choice]);

    return (
        <MentorText>
            <Top>
                <TopInner>
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                        onClick={() => navigate(`/Consultng/pay/${data.id}`)} />
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>정산 계좌 관리</span>
                    <div style={{ width: "24px", height: "24px" }}></div>
                </TopInner>
            </Top>

            <div style={{ width: "90%", height: "auto", marginTop: "24px" }}>
                <span style={{ fontWeight: "700", fontSize: "24px", color: "rgba(17, 17, 17, 0.8)" }}>은행을 선택해주세요.</span>
            </div>
            <BankBox>
                {Bank_List.map((bankinfo, index) => (
                    <>
                        {choice === bankinfo.bank ?
                            <div key={index} style={{
                                display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "32px", border: "1px solid #00C563",
                                borderRadius: "10px", width: "125px", height: "48px"
                            }}
                            >
                                <img src={bankinfo.img} style={{ width: "24px", height: "24px", marginRight: "4px" }} />
                                {bankinfo.bank}
                            </div>
                            :
                            <div key={index} style={{
                                display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "32px", border: "1px solid #DCDCDC",
                                borderRadius: "10px", width: "125px", height: "48px"
                            }}
                                onClick={() => setchoice(bankinfo.bank)}>
                                <img src={bankinfo.img} style={{ width: "24px", height: "24px", marginRight: "4px" }} />
                                {bankinfo.bank}
                            </div>


                        }
                    </>
                ))}
            </BankBox>

            {/* 버튼 */}
            <ProfileBtn onClick={() => navigate(`/Consultng/pay/end/${data.id}`)}>
                확인
            </ProfileBtn>
        </MentorText >
    );
}

export default ChoiceBank;

/* 전체박스 */
const MentorText = styled.div`
width:540px;
height:auto;
display:flex;
justify-content: center;
align-items: flex-start;
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
width: 100%;
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


/* 계좌연결하기 */
const BankBox = styled.div`
display: grid;
grid-template-rows:1fr ;
grid-template-columns:1fr 1fr;
align-items: center;
justify-content:flex-start;
width: 72%;
height: auto;
margin-top:32px;
font-weight: 600;
font-size: 14px;
color: #333D4B;
@media screen and (max-width: 540px) {
	}
`;


