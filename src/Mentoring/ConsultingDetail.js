import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function MentorDetail() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState([]);
    const [book, setBook] = useState([]);
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

    // 닉네임
    useEffect(() => {
        if (data.length !== 0) {
            fetch(`/api/user/Emailname/${data.User}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setNickname(data.user);
                });
        }
    }, [data]);

    // 북마크리스트
    useEffect(() => {
        if (data.length !== 0) {
            fetch(`/api/add/class/bookmark/lsit/${String(localStorage.getItem('id'))}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setBook(data);
                    // console.log(book.result)
                });
        }
    }, [data]);


    // 북마크 
    function BookMark() {
        fetch("/api/add/class/bookmark/MentorProcess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mentor: data.User + "," + data.ProgramName,
                mentir: localStorage.getItem('id'),
                category: "컨설팅",
            }),
        })
            .then(res => res.json())
            .then(data => {

            })
    }

    return (
        <MentorText>
            <Top>
                <TopInner>
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                        onClick={() => navigate('/')} />
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}></span>
                    <div style={{ width: "24px", height: "24px" }}></div>
                </TopInner>
            </Top>

            {/* 이미지 및 기타부분 */}
            <Profile>
                <div style={{ display: "flex", flexDirecion: "row", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", flexDirecion: "row", justifyContent: "flex-start", width: "100%" }}>
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Approve_Profile.png" style={{ width: "65px", height: "65px" }} />
                        <ProfileContent>
                            <ProfileList>{data.Progress?.substr(0, 3)}</ProfileList>
                            <ProfileTitle>{data.ProgramName?.split("-")[0]}</ProfileTitle>
                            <span style={{ fontSize: "12px", fontWeight: "400", fontSize: "12px", color: "#AEAEB2" }}>{nickname}</span>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <span style={{ fontSize: "12px", fontWeight: "400", fontSize: "12px", color: "#AEAEB2" }}>{data.University?.split(",")[0]},</span>
                                <span style={{ fontSize: "12px", fontWeight: "400", fontSize: "12px", color: "#AEAEB2" }}>{data.Category}</span>
                            </div>
                        </ProfileContent>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", width: "100%" }}>
                        {book.result === "fail" ?
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />
                            :
                            book.filter((e) => e.mentor_id === data.User + "," + data.ProgramName).length === 1 ?
                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                    style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />
                                :
                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                    style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />

                        }
                    </div>
                </div>
            </Profile>

            {/* 중간부분 */}
            <Profileexplain>
                <ExplainTitle>
                    <span style={{ fontSize: "20px", fontWeight: "700", color: "#515151" }}>{data.ProgramName?.split("-")[0]}</span>
                </ExplainTitle>
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "row" }}>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#00C563", marginRight: "6px" }}>진행형식</span>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#797979" }}>컨설팅,{data.Progress?.substr(0, 3)}</span>
                </div>
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "row", marginTop: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#00C563", marginRight: "6px" }}>가능일정</span>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#797979" }}>{data.Avalable}</span>
                </div>
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "row", marginTop: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#00C563", marginRight: "6px" }}>진행시간</span>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#797979" }}>{data.Time}</span>
                </div>
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "row", marginTop: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#00C563", marginRight: "6px" }}>가격</span>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#797979" }}>{data.Value}</span>
                </div>
            </Profileexplain>

            {/* 자기소개 */}
            <Profileexplain style={{ marginTop: "24px", marginBottom: "24px" }}>
                <ProfileList>{nickname}님은 이런 사람이에요!</ProfileList>
                <div style={{ marginTop: "9px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>{data.Advantage}</span>
                </div>
                <ProfileList>컨설팅설명</ProfileList>
                <div style={{ marginTop: "9px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>{data.ProgramName?.split("-")[1]}</span>
                </div>
            </Profileexplain>

            <Devinder />

            {/* 컨설팅주제 */}
            <Profileexplain style={{ marginTop: "24px", marginBottom: "40px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅주제</span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginTop: "4px", marginBottom: "10px" }}>멘티들에게 전달하고 싶은 주제에 대해 컨설팅해드려요.</span>
                {data?.Subjects?.split("-").map((fgkljf, index) => (
                    <FooterBox key={index}>{fgkljf}</FooterBox>
                ))}
            </Profileexplain>

            {/* 추천 */}
            <Profileexplain style={{ marginTop: "24px", marginBottom: "40px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>누구에게 추천하고 싶으신가요?</span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginTop: "4px", marginBottom: "10px" }}>닉네임님의 컨설팅은 이런 멘티들에게 좋아요.</span>
                {data?.Recommend?.split("-").map((fgkljf, index) => (
                    <FooterBox key={index}>{fgkljf}</FooterBox>
                ))}
            </Profileexplain>

            <Devinder />

            {/* 후기 */}
            <Profileexplain style={{ marginTop: "24px", marginBottom: "40px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>후기</span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginTop: "4px", marginBottom: "10px" }}>이용한 멘티들의 후기.</span>
                <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", marginTop: "55px", marginBottom: "85px" }}>멘티들의 후기가 아직 없어요.</span>
                </div>
            </Profileexplain>

            {/* 버튼 */}
            <ProfileBtn>
                <FirstBtn onClick={() => BookMark()}>
                    {book.result === "fail" ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                            style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />
                        :
                        book.filter((e) => e.mentor_id === data.User + "," + data.ProgramName?.split("-")[0]).length === 1 ?
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />
                            :
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                style={{ width: "40px", height: "auto" }} onClick={() => BookMark()} />

                    }
                </FirstBtn>
                <SecondBtn onClick={() => navigate(`/Consultng/pay/${data.id}`)}>신청하기</SecondBtn>
            </ProfileBtn>
        </MentorText >
    );
}

export default MentorDetail;

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

/* 이미지 및 프로그램명 */
const Profile = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
width: 90%;
height: 96px;
margin-top:12px;
@media screen and (max-width: 540px) {
	}
`;

/* 이미지 및 프로그램명 */
const ProfileContent = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
margin-left:12px;
width: 150px;
height: 96px;
@media screen and (max-width: 540px) {
	}
`;

/* 내용부문 온라인 */
const ProfileList = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding:4.5px 7.5px;
font-weight: 400;
font-size: 10px;
color: #797979;
border: 0.75px solid #DCDCDC;
border-radius: 4px;
@media screen and (max-width: 540px) {
	}
`;

/* 내용부문 온라인 제목 */
const ProfileTitle = styled.div`
width:150px;
height:auto;
align-items: center;
font-weight: 600;
font-size: 14px;
color: #515151;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
@media screen and (max-width: 540px) {
	}
`;

/* 프로그램명 및 설명 */
const Profileexplain = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction:column;
width: 90%;
height: auto;
margin-top:7px;
@media screen and (max-width: 540px) {
	}
`;

/* 가운데부분 제목 */
const ExplainTitle = styled.div`
width:300px;
height:auto;
align-items: flex-start;
font-weight: 600;
font-size: 14px;
color: #515151;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
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

/* 컨설팅 주제 박스  */
const FooterBox = styled.div`
width: 90%;
height: 56px;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
display: flex;
justify-content: flex-start;
align-items: center;
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #797979;
margin-top:6px;
padding-left:16px;
@media screen and (max-width: 540px) {
    
}
`;

/* 프로그램명 및 설명 */
const ProfileBtn = styled.div`
display: flex;
justify-content:space-between;
align-items: flex-start;
flex-direction:row;
width: 90%;
height: auto;
@media screen and (max-width: 540px) {
	}
`;

/* 프로그램명 및 설명 */
const FirstBtn = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 50px;
height: 50px;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
	}
`;

/* 프로그램명 및 설명 */
const SecondBtn = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 270px;
height: 50px;
background: #00C563;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: #FFFFFF;
@media screen and (max-width: 540px) {
	}
`;