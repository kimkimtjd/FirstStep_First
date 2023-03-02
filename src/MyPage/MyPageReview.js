import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageReview() {

    const navigate = useNavigate();
    const [data, setData] = useState("멘티");
    const [consulting, setConsulting] = useState([]);
    const [tutor, setTutor] = useState([]);
    const [mentoclass, setMentoclass] = useState([]);
    const [mentotutor, setmentotutor] = useState([]);
    // console.log(consulting)

    // 내가 신청한 컨설팅 정보
    useEffect(() => {
        fetch(`/api/add/class/certify/MentorProgram/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setConsulting(data)
            });

    }, []);

    // 내 신청한 클래스 정보
    useEffect(() => {
        fetch(`/api/add/class/certify/ClassProgram/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTutor(data)
            });


    }, []);

    // 내가 생성한 컨설팅 정보
    useEffect(() => {
        fetch(`/api/add/class/review_mentor/consulting/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMentoclass(data)
            });

    }, []);

    // console.log(mentoclass)


    // 내가 생성한 클래스 정보
    useEffect(() => {
        fetch(`/api/add/class/review_mentor/class/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setmentotutor(data)
            });

    }, []);


    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Mypage')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>나의후기</span>
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
                        {consulting?.concat(tutor).length === 0 ?
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "213px" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "65%", height: "auto", textAlign: "center" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>작성하실 수 있는 후기가 없어요.</span>
                                </div>
                            </div>
                            :
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                </div>
                                {consulting.map((data, index) => (
                                    <>
                                        {data.Review === "" ?
                                            <></>
                                            :
                                            <div key={index} style={{
                                                width: "90%", height: "auto", borderRadius: "8px", border: "1px solid #DCDCDC", marginTop: "16px",
                                                display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"
                                            }}>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                                                    <div style={{
                                                        borderRadius: "8px", border: "1px solid #DCDCDC", padding: "4.5px 7.5px 4.5px 7.5px", fontSize: "9px",
                                                        color: "#797979", marginTop: "12px",
                                                    }}>
                                                        {data.Progress?.substr(0, 3)}
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: "14px", marginLeft: "16px", fontWeight: "600", marginTop: "4px" }}>{data.ProgramName?.split('-')[0]}</span>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px", justifyContent: "flex-start", alignItems: "center", marginTop: "6px" }}>
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "8px", height: "8px" }} />
                                                    <span style={{ color: "#797979", fontSize: "10px", marginLeft: "2px" }}>{data.Review?.split('-')[1]}.0</span>
                                                </div>
                                                <div style={{
                                                    width: "90%", height: "auto", borderRadius: "8px", background: "#DCDCDC", marginTop: "8px", marginLeft: "16px",
                                                    padding: "12px", fontSize: "12px", color: "#AEAEB2", display: "flex", justifyContent: "flex-start", margin: "10px"
                                                }}>
                                                    {data.Review}
                                                </div>
                                            </div>
                                        }
                                    </>
                                ))}
                                {/* Consulting.map -> Review === ""인거 필터링후 진행  */}

                                <FirstSpace />

                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                </div>
                                {tutor.map((data, index) => (
                                    <>
                                        {data.Review === "" ?
                                            <></>
                                            :
                                            <div key={index} style={{
                                                width: "90%", height: "auto", borderRadius: "8px", border: "1px solid #DCDCDC", marginTop: "16px",
                                                display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"
                                            }}>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                                                    <div style={{
                                                        borderRadius: "8px", border: "1px solid #DCDCDC", padding: "4.5px 7.5px 4.5px 7.5px", fontSize: "9px",
                                                        color: "#797979", marginTop: "12px",
                                                    }}>
                                                        {data.Progress?.substr(0, 3)}
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: "14px", marginLeft: "16px", fontWeight: "600", marginTop: "4px" }}>{data.ProgramName?.split('-')[0]}</span>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px", justifyContent: "flex-start", alignItems: "center", marginTop: "6px" }}>
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "8px", height: "8px" }} />
                                                    <span style={{ color: "#797979", fontSize: "10px", marginLeft: "2px" }}>{data.Review?.split('-')[1]}.0</span>
                                                </div>
                                                <div style={{
                                                    width: "90%", height: "auto", borderRadius: "8px", background: "#DCDCDC", marginTop: "8px", marginLeft: "16px",
                                                    padding: "12px", fontSize: "12px", color: "#AEAEB2", display: "flex", justifyContent: "flex-start", margin: "10px"
                                                }}>
                                                    {data.Review}
                                                </div>
                                            </div>
                                        }
                                    </>
                                ))}
                                {/* tutor.map -> Review === ""인거 필터링후 진행  */}

                            </>
                        }
                    </>
                    :
                    <>
                        {mentoclass?.concat(mentotutor).length === 0 ?
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "213px" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "65%", height: "auto", textAlign: "center" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>작성하실 수 있는 후기가 없어요.</span>
                                </div>
                            </div>
                            :
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                </div>

                                {mentoclass.map((data, index) => (
                                    <>
                                       
                                            <div key={index} style={{
                                                width: "90%", height: "auto", borderRadius: "8px", border: "1px solid #DCDCDC", marginTop: "16px",
                                                display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"
                                            }}>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                                                    <div style={{
                                                        borderRadius: "8px", border: "1px solid #DCDCDC", padding: "4.5px 7.5px 4.5px 7.5px", fontSize: "9px",
                                                        color: "#797979", marginTop: "12px",
                                                    }}>
                                                        {data.Progress?.substr(0, 3)}
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: "14px", marginLeft: "16px", fontWeight: "600", marginTop: "4px" }}>{data.ProgramName?.split('-')[0]}</span>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px", justifyContent: "flex-start", alignItems: "center", marginTop: "6px" }}>
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "8px", height: "8px" }} />
                                                    <span style={{ color: "#797979", fontSize: "10px", marginLeft: "2px" }}>{data.Review?.split('-')[1]}.0</span>
                                                </div>
                                                <div style={{
                                                    width: "90%", height: "auto", borderRadius: "8px", background: "#DCDCDC", marginTop: "8px", marginLeft: "16px",
                                                    padding: "12px", fontSize: "12px", color: "#AEAEB2", display: "flex", justifyContent: "flex-start", margin: "10px"
                                                }}>
                                                     {data.Review === "" ? 
                                                    "후기가없습니다"
                                                        : data.Review
                                                        }
                                                </div>
                                            </div>
                                        
                                    </>
                                ))}


                                <FirstSpace />

                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                </div>
                                {mentotutor.map((data, index) => (
                                    <>
                                       
                                            <div key={index} style={{
                                                width: "90%", height: "auto", borderRadius: "8px", border: "1px solid #DCDCDC", marginTop: "16px",
                                                display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"
                                            }}>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                                                    <div style={{
                                                        borderRadius: "8px", border: "1px solid #DCDCDC", padding: "4.5px 7.5px 4.5px 7.5px", fontSize: "9px",
                                                        color: "#797979", marginTop: "12px",
                                                    }}>
                                                        {data.Progress?.substr(0, 3)}
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: "14px", marginLeft: "16px", fontWeight: "600", marginTop: "4px" }}>{data.ProgramName?.split('-')[0]}</span>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px", justifyContent: "flex-start", alignItems: "center", marginTop: "6px" }}>
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "8px", height: "8px" }} />
                                                    <span style={{ color: "#797979", fontSize: "10px", marginLeft: "2px" }}>{data.Review?.split('-')[1]}.0</span>
                                                </div>
                                                <div style={{
                                                    width: "90%", height: "auto", borderRadius: "8px", background: "#DCDCDC", marginTop: "8px", marginLeft: "16px",
                                                    padding: "12px", fontSize: "12px", color: "#AEAEB2", display: "flex", justifyContent: "flex-start", margin: "10px"
                                                }}>
                                                    {data.Review === "" ? 
                                                    "후기가없습니다"
                                                        : data.Review
                                                        }
                                                </div>
                                            </div>
                                        
                                    </>
                                ))}
                                {/* mentotutor.map -> Review === ""인거 필터링후 진행  */}


                            </>
                        }
                    </>
                }

            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default MyPageReview;

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
