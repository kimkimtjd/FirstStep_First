import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageBook() {

    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [choice, setChoice] = useState("컨설팅");


    // 북마크리스트
    useEffect(() => {
        fetch(`/api/add/class/certify/bookmark/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setBook(data);
            });

        console.log(book)
    }, []);

    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Mypage')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>북마크</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>



                {book.length === 0 ?
                    <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "213px" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "65%", height: "auto", textAlign: "center" }}>
                                <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>북마크 내역이 아직 없어요.</span>
                            </div>
                        </div>
                        <FindConsulting onClick={() => navigate('/')}>
                            찾으러가기 {">"}
                        </FindConsulting>
                    </>
                    :
                    <>
                        <Top>
                            <ChoiceInner>
                                {choice === "컨설팅" ?
                                    <>
                                        <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "row" }}>
                                            <div style={{
                                                width: "50%", height: "100%", borderBottom: "2px solid #00C563", color: "#00C563", display: "flex",
                                                justifyContent: "center", alignItems: "center", fontSize: "14px", fontWeight: "700"
                                            }} onClick={() => setChoice("컨설팅")}>컨설팅</div>
                                            <div style={{
                                                width: "50%", height: "100%", color: "#797979", display: "flex",
                                                justifyContent: "center", alignItems: "center", fontSize: "14px", fontWeight: "700"
                                            }} onClick={() => setChoice("클래스")}>클래스</div>
                                        </div>

                                        <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                                            {book.map((data, index) => (
                                                <div style={{
                                                    width: "100%", height: "96px", display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    flexDirection: "row"
                                                }} key={index}>
                                                    <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Approve_Profile.png" style={{ width: "60px", height: "60px" }} />
                                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "12px" }}>
                                                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#515151" }}>{data.ProgramName?.split("-")[0]}</span>
                                                            <span style={{ fontSize: "12px", fontWeight: "400", color: "#AEAEB2" }}>{data.Nickname}</span>
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "400", color: "#AEAEB2" }}>{data.University?.split(",")[0]}</span>
                                                                <span style={{ fontSize: "12px", fontWeight: "400", color: "#AEAEB2" }}>{data.Category}</span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                                        style={{ width: "24px", height: "24px" }} />
                                                </div>

                                            ))}
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "row" }}>
                                            <div style={{
                                                width: "50%", height: "100%", color: "#797979", display: "flex",
                                                justifyContent: "center", alignItems: "center", fontSize: "14px", fontWeight: "700"
                                            }} onClick={() => setChoice("컨설팅")}>컨설팅</div>
                                            <div style={{
                                                width: "50%", height: "100%", borderBottom: "2px solid #00C563", color: "#00C563", display: "flex",
                                                justifyContent: "center", alignItems: "center", fontSize: "14px", fontWeight: "700"
                                            }} onClick={() => setChoice("클래스")}>클래스</div>
                                        </div>
                                    </>

                                }
                            </ChoiceInner>
                        </Top>


                    </>
                }



            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default MyPageBook;

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

/* 선택부분 내부 */
const ChoiceInner = styled.div`
display: flex;
flex-direction:column;
justify-content:space-between;
align-items: center;
width: 90%;
height: 60.48px;
@media screen and (max-width: 540px) {
    height:11.2vw;
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