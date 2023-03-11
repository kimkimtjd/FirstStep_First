import styled from "styled-components";
import React, { useState, useEffect } from "react";
import List from "./First.json"
import { useLocation, useNavigate } from "react-router-dom";

function MainFirst() {

    const [choice, setChoice] = useState(true); // 관심사 선택여부 검증
    const [mentor, setmentor] = useState([]); // 관심사 선택안했을경우 전체 
    const [mentorlist, setmentorlist] = useState([]); // 관심사 선택했을경우 전체 
    const [fail, setfail] = useState(false); // 관심사 선택했는데 데이터가 없을경우
    const [book, setBook] = useState([]);
    const [list, setList] = useState([]);
    const [bookcheck, setbookcheck] = useState(true);

    const navigate = useNavigate()
    const location = useLocation()

    // 관심사 설정여부 
    useEffect(() => {
        fetch(`/api/favorite/info/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // 관심사가없을경우 
                if (data.result === "fail") {
                    setChoice(false)
                }
                else {
                    setChoice(true)
                }
            });

    }, []);

    // 관심사 설정안했을경우 전체 매물 3개 랜덤 출력
    useEffect(() => {
        if (location.pathname.includes('Search')) {

            fetch(`/api/add/class/result/${location.pathname.split('/')[2]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.result === "fail") {
                        setfail(true)
                    }
                    else {
                        setmentor(data)
                    }
                });
        }
        else{
        fetch(`/api/mentor/list/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setmentor(data)
            });
        }
    }, [location]);


    // 관심사 설정했을경우 전체 매물 3개 랜덤 출력 [1차 대학교이름 , 2차 대학교 학과 , 3차 고등학교 지역 , 4차 고등학교 유형]
    useEffect(() => {
        setfail(false)
            if (location.pathname.includes('Search')) {

                fetch(`/api/add/class/result/${location.pathname.split('/')[2]}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if (data.result === "fail") {
                            setfail(true)
                        }
                        else {
                            setmentorlist(data)
                        }
                    });
            }

            else if(location.pathname === '/'){
                fetch(`/api/mentor/filter/${choice[0]?.First.split(',')[0]}/${choice[0]?.Second.split(',')[0]}/${choice[0]?.First.split(',')[1]}/${choice[0]?.Second.split(',')[1]}/${String(localStorage.getItem('id'))}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if (data.result === "fail") {
                            setfail(true)
                        }
                        else {
                            setmentorlist(data)
                        }
                    });
            }

    }, [location]);

    // 북마크리스트
    useEffect(() => {
        // if (mentor.length !== 0) {
        fetch(`/api/add/class/bookmark/lsit/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setBook(data.filter((e) => e.category === "컨설팅"));
            });
        // }
    }, [ ]);


    useEffect(() => {
        fetch(`/api/user/list`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setList(data);
                // console.log(logo.profile_logo)
            });

    }, []);


    function BookMark(data){
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
                setbookcheck(!bookcheck)
                console.log(data)
            })
    }

    // console.log(mentor)

    // console.log(book.filter((e) => e.mentor_id === "ahnhyosang18@gmail.com,test").length)

    return (
        <>
            <Total>
                <Totalinner>
                    {choice ?
                        // 관심사 설정
                        <Titlebox>
                            {mentorlist.length !== 0 ?
                                <Titletitle>
                                    <Titletitle_first>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>입시컨설팅</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>입시컨설팅을 해보세요.</span>
                                    </Titletitle_first>
                                    <Titletitle_second
                                        onClick={() => navigate('/Total/Consulting')}
                                    >전체보기 {">"}</Titletitle_second>
                                </Titletitle>
                                :
                                <Titletitle>
                                    <Titletitle_first>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>컨설팅</span>
                                    </Titletitle_first>
                                </Titletitle>
                            }

                            {fail === false ?
                                <>
                                    {mentorlist.map((data, index) => (
                                        <ContentBox key={index}>
                                            <Contentimg src={list?.filter((e) => e.email === data.User)[0]?.profile_logo} onClick={() => navigate(`/Consultng/detail/${data.id}`)}/>
                                            <ContentContent onClick={() => navigate(`/Consultng/detail/${data.id}`)}>
                                                <span style={{ fontSize: "14px", fontWeight: "600", color: "black" }}>{data.ProgramName?.split("-")[0]}</span>
                                                <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.User}</span>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.University?.split(',')[0]}&nbsp;&nbsp;|</span>
                                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>&nbsp;&nbsp;{data.Category}</span>
                                                </div>
                                            </ContentContent>
                                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}>
                                                {book.result === "fail" ?
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                        style={{ width: "40px", height: "40px" , zIndex:"2" }} onClick = {() => BookMark(data)}/>
                                                    :
                                                    book.filter((e) => e.mentor_id === data.User + "," + data.ProgramName).length === 1 ?
                                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                                            style={{ width: "40px", height: "40px" , zIndex:"2"}} onClick = {() => BookMark(data)}/>
                                                        :
                                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                            style={{ width: "40px", height: "40px" , zIndex:"2"}} onClick = {() => BookMark(data)}/>
                                                }
                                            </div>
                                        </ContentBox>
                                    ))}
                                </> :
                                <>
                                    {location.pathname.includes('Search') ?
                                        <ContentNo>
                                            <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>입력하신 검색어와 관련된 프로그램이 아직 없어요.</span>
                                            <ContentNavigate>
                                                컨설팅 찾으러가기
                                            </ContentNavigate>
                                        </ContentNo>
                                        :
                                        <ContentNo>
                                            <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화 내역이아직 없어요.</span>
                                            <ContentNavigate>
                                                컨설팅 찾으러가기
                                            </ContentNavigate>
                                        </ContentNo>

                                    }
                                </>
                            }
                        </Titlebox>
                        :
                        // 관심사 미설정
                        <Titlebox>
                            <Titletitle>
                                <Titletitle_first>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>입시컨설팅</span>
                                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>입시 컨설팅을 해보세요.</span>
                                </Titletitle_first>
                                <Titletitle_second
                                        onClick={() => navigate('/Total/Consulting')}                                
                                >전체보기 {">"}</Titletitle_second>
                            </Titletitle>

                            {mentor.map((data, index) => (
                                <ContentBox key={index}>
                                    <Contentimg src={list?.filter((e) => e.email === data.User)[0]?.profile_logo} />
                                    <ContentContent>
                                        <span style={{ fontSize: "14px", fontWeight: "600", color: "black" }}>{data.ProgramName?.split("-")[0]}</span>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.User}</span>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.University?.split(',')[0]}&nbsp;&nbsp;|</span>
                                            <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>&nbsp;&nbsp;{data.Category}</span>
                                        </div>
                                    </ContentContent>
                                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                            style={{ width: "40px", height: "40px" }} />

                                    </div>
                                </ContentBox>
                            ))}
                        </Titlebox>
                    }
                </Totalinner>
                <Devinder />

            </Total>

        </>
    );
}

export default MainFirst;

/* 전체박스*/
const Total = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: column;
width: 100%;
height: auto;
@media screen and (max-width: 540px) {
}
`;

/* 내부  */
const Totalinner = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: column;
width: 90%;
height: auto;
@media screen and (max-width: 540px) {
}
`;

/* 제목 전체  */
const Titlebox = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: column;
width: 100%;
height: auto;
@media screen and (max-width: 540px) {
}
`;

/* 제목 부분 제목*/
const Titletitle = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
flex-direction: row;
width: 100%;
height: 54px;
@media screen and (max-width: 540px) {
    height: 10vw;
}
`;

/* 인기컨설팅 */
const Titletitlefavor = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
flex-direction: row;
margin-top:40px;
width: 100%;
height: 54px;
@media screen and (max-width: 540px) {
    height: 10vw;
}
`;



/* 입시컨설팅 제목 1번째 */
const Titletitle_first = styled.div`
display: flex;
justify-content:space-between;
flex-direction:column;
align-items: flex-start;
width: 406.08px;
height: 100%;
@media screen and (max-width: 540px) {
    width: 75.2vw;
}
`;

/* 입시컨설팅 제목 2번째 */
const Titletitle_second = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 62px;
height: 30.24px;
background: #FFFFFF;
border: 0.592593px solid #00C563;
border-radius: 4px;
font-weight: 700;
font-size: 10px;
color: #00C563;
@media screen and (max-width: 540px) {
    height: 5.6vw;
}
`;

/* 데이터 반복문 */
const ContentBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: row;
width: 100%;
height: 138.245px;
@media screen and (max-width: 540px) {
    height: 25.6vw;
}
`;

/* 데이터 반복문 이미지 */
const Contentimg = styled.img`
width: 93.6px;
height: 93.6px;;
@media screen and (max-width: 540px) {
    width: 17.3vw;
    height: 17.3vw;
}
`;

/* 데이터 반복문 */
const ContentContent = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction: column;
margin-left:12px;
width: 416px;
height: 100%;
over-flow:hidden;
@media screen and (max-width: 540px) {
    width: 40vw;
}
`;

/* 데이터가 없을경우 */
const ContentNo = styled.div`
display: flex;
justify-content:spac-between;
align-items: center;
flex-direction: column;
margin-top:40px;
width: 100%;
height: 133.92px;
over-flow:hidden;
@media screen and (max-width: 540px) {
    height: 24.8vw;
}
`;

/* 데이터가 없을경우 멘토찾으러 가기 문구 */
const ContentNavigate = styled.div`
display: flex;
justify-content:center;
align-items: center;
margin-top:24px;
width: 100%;
height: 72px;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    height: 13.3vw;
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