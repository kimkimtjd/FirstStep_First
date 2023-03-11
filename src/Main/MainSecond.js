import styled from "styled-components";
import React, { useState, useEffect } from "react";
import List from "./First.json"
import { useNavigate , useLocation } from "react-router-dom";

function MainSecond() {

    const [choice, setChoice] = useState(true); // 관심사 선택여부 검증
    const [mentor, setmentor] = useState([]); // 관심사 선택안했을경우 전체 
    const [mentorlist, setmentorlist] = useState([]); // 관심사 선택했을경우 전체 
    const [fail, setfail] = useState(false); // 관심사 선택했는데 데이터가 없을경우
    const [book, setBook] = useState([]);
    const [list, setList] = useState([]);

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
        fetch(`/api/tutor/list/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setmentor(data)
            });

    }, []);


    // 관심사 설정했을경우 전체 매물 3개 랜덤 출력 [1차 대학교이름 , 2차 대학교 학과 , 3차 고등학교 지역 , 4차 고등학교 유형]
    useEffect(() => {
        // if (choice.length !== 0) {
        if (location.pathname.includes('Search')) {
            fetch(`/api/add/class/result/Class/${location.pathname.split('/')[2]}`, {
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

        else {
            fetch(`/api/tutor/filter/${choice[0]?.First.split(',')[0]}/${choice[0]?.Second.split(',')[0]}/${choice[0]?.First.split(',')[1]}/${choice[0]?.Second.split(',')[1]}/${String(localStorage.getItem('id'))}`, {
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

        // }
    }, [choice , location]);


    // 북마크리스트
    useEffect(() => {
        if (mentor.length !== 0) {
            fetch(`/api/add/class/bookmark/lsit/${String(localStorage.getItem('id'))}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setBook(data);
                });
        }
    }, [mentor, choice, mentorlist]);

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
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>추천클래스</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>필요한부분만 수강해보세요.</span>
                                    </Titletitle_first>
                                    <Titletitle_second
                                    onClick={() => navigate('/Total/Class')}
                                    >전체보기 {">"}</Titletitle_second>
                                </Titletitle>
                                :
                                <Titletitle>
                                    <Titletitle_first>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>클래스</span>
                                    </Titletitle_first>
                                </Titletitle>
                            }

                            {fail === false ?
                                <ContentTotal>
                                    {mentorlist.map((data, index) => (
                                        <ContentBox key={index} onClick={() => navigate(`/Class/detail/${data.id}`)}>
                                            {data.Category2 === "국어" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B5%AD%EC%96%B4.png" />
                                                : data.Category2 === "영어" ?
                                                    <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%81%EC%96%B4.png" />
                                                    : data.Category2 === "수학" ?
                                                        <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%88%98%ED%95%99.png" />
                                                        : data.Category2 === "생명과학" || data.Category2 === "물리" ?
                                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B3%BC%ED%95%99%ED%83%90%EA%B5%AC.png" />
                                                            : data.Category2 === "한국사" ?
                                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%ED%95%9C%EA%B5%AD%EC%82%AC.png" />
                                                                : data.Category2 === "경제" || data.Category2 === "정치와 법" || data.Category2 === "한국지리"
                                                                    || data.Category2 === "세계지리" || data.Category2 === "생활과 윤리" || data.Category2 === "윤리와 사상"
                                                                    || data.Category2 === "동아시아사" || data.Category2 === "세계사" || data.Category2 === "사회 문화" ?
                                                                    <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%82%AC%ED%9A%8C%ED%83%90%EA%B5%AC.png" />
                                                                    : data.Category2 === "제2외국어" ?
                                                                        <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%A0%9C2%EC%99%B8%EA%B5%AD%EC%96%B4.png" />
                                                                        : data.Category2 === "자소서첨삭" || data.Category2 === "모의면접" ?
                                                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%A9%B4%EC%A0%91%2C%EC%A0%80%EC%86%8C%EC%84%9C.png" />
                                                                            : data.Category2 === "논술" ?
                                                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%85%BC%EC%88%A0.png" />
                                                                                :
                                                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%88%EC%B2%B4%EB%8A%A5.png" />
                                            }
                                            <ContentContent>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <span style={{
                                                        fontSize: "10px", fontWeight: "400", color: "#AEAEB2", marginTop: "12px", marginRight: "6px",
                                                        border: "0.75px solid #DCDCDC", padding: "4.5px 7.5px"
                                                    }}>{data.Progress?.substr(0.3)}</span>
                                                    <span style={{
                                                        fontSize: "10px", fontWeight: "400", color: "#AEAEB2", marginTop: "12px",
                                                        border: "0.75px solid #DCDCDC", padding: "4.5px 7.5px"
                                                    }}>{data.Category2}</span>
                                                </div>
                                                <span style={{ fontSize: "14px", fontWeight: "600", color: "black", marginTop: "6px" }}>{data.ProgramName?.split("-")[0]}</span>

                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.ProgramName?.split("-")[1]}</span>
                                                </div>
                                            </ContentContent>
                                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}>
                                                {book.result === "fail" ?
                                                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                        style={{ width: "40px", height: "40px" , marginRight:"5px" , marginTop:"-125px" }} />
                                                    :
                                                    book.filter((e) => e.mentor_id === data.User + "," + data.ProgramName).length === 1 ?
                                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                                            style={{ width: "40px", height: "40px" , marginRight:"5px" , marginTop:"-125px"}} />
                                                        :
                                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                            style={{ width: "40px", height: "40px" , marginRight:"5px" , marginTop:"-125px"}} />
                                                }
                                            </div>
                                        </ContentBox>
                                    ))}
                                </ContentTotal> :
                                <>
                                {location.pathname.includes('Search') ?
                                        <ContentNo>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>입력하신 검색어와 관련된 프로그램이 아직 없어요.</span>
                                        <ContentNavigate>
                                            클래스 찾으러가기
                                        </ContentNavigate>
                                    </ContentNo>
                                        :
                                    <ContentNo>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화 내역이아직 없어요.</span>
                                        <ContentNavigate>
                                            클래스 찾으러가기
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
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>추천클래스</span>
                                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>필요한부분만 수강해보세요.</span>
                                </Titletitle_first>
                                <Titletitle_second
                                    onClick={() => navigate('/Total/Class')}                                
                                >전체보기 {">"}</Titletitle_second>
                            </Titletitle>
                            <ContentTotal>

                                {mentor.map((data, index) => (
                                    <ContentBox key={index}>
                                        {data.Category2 === "국어" ?
                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B5%AD%EC%96%B4.png" />
                                            : data.Category2 === "영어" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%81%EC%96%B4.png" />
                                                : data.Category2 === "수학" ?
                                                    <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%88%98%ED%95%99.png" />
                                                    : data.Category2 === "생명과학" || data.Category2 === "물리" ?
                                                        <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B3%BC%ED%95%99%ED%83%90%EA%B5%AC.png" />
                                                        : data.Category2 === "한국사" ?
                                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%ED%95%9C%EA%B5%AD%EC%82%AC.png" />
                                                            : data.Category2 === "경제" || data.Category2 === "정치와 법" || data.Category2 === "한국지리"
                                                                || data.Category2 === "세계지리" || data.Category2 === "생활과 윤리" || data.Category2 === "윤리와 사상"
                                                                || data.Category2 === "동아시아사" || data.Category2 === "세계사" || data.Category2 === "사회 문화" ?
                                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%82%AC%ED%9A%8C%ED%83%90%EA%B5%AC.png" />
                                                                : data.Category2 === "제2외국어" ?
                                                                    <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%A0%9C2%EC%99%B8%EA%B5%AD%EC%96%B4.png" />
                                                                    : data.Category2 === "자소서첨삭" || data.Category2 === "모의면접" ?
                                                                        <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%A9%B4%EC%A0%91%2C%EC%A0%80%EC%86%8C%EC%84%9C.png" />
                                                                        : data.Category2 === "논술" ?
                                                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%85%BC%EC%88%A0.png" />
                                                                            :
                                                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%88%EC%B2%B4%EB%8A%A5.png" />
                                        }
                                        <ContentContent>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <span style={{
                                                    fontSize: "10px", fontWeight: "400", color: "#AEAEB2", marginTop: "12px", marginRight: "6px",
                                                    border: "0.75px solid #DCDCDC", padding: "4.5px 7.5px"
                                                }}>{data.Progress?.substr(0.3)}</span>
                                                <span style={{
                                                    fontSize: "10px", fontWeight: "400", color: "#AEAEB2", marginTop: "12px",
                                                    border: "0.75px solid #DCDCDC", padding: "4.5px 7.5px"
                                                }}>{data.Category2}</span>
                                            </div>
                                            <span style={{ fontSize: "14px", fontWeight: "600", color: "black", marginTop: "6px" }}>{data.ProgramName?.split("-")[0]}</span>

                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.ProgramName?.split("-")[1]}</span>
                                            </div>
                                        </ContentContent>
                                        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}>
                                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                style={{ width: "40px", height: "40px" , marginTop:"-125px"}} />

                                        </div>
                                    </ContentBox>
                                ))}
                            </ContentTotal>
                        </Titlebox>
                    }
                </Totalinner>

            </Total>

        </>
    );
}

export default MainSecond;

/* 전체박스*/
const Total = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: column;
width: 100%;
height: auto;
margin-top:15px;
@media screen and (max-width: 540px) {
}
`;

/* 전체박스*/
const ContentTotal = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
width:100%;
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
padding-bottom: 85px
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
margin-bottom:25px;
@media screen and (max-width: 540px) {
    height: 10vw;
}
`;

/* 인기클래스 */
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



/* 입시클래스 제목 1번째 */
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

/* 입시클래스 제목 2번째 */
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
flex-direction: column;
width: 100%;
height: auto;
@media screen and (max-width: 540px) {
    height: auto;
}
`;

/* 데이터 반복문 이미지 */
const Contentimg = styled.img`
width: 230px;
height: auto;
border-radius: 4px;
@media screen and (max-width: 540px) {
    width: 42.6vw;
}
`;

/* 데이터 반복문 */
const ContentContent = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction: column;
margin-left:12px;
width: 216px;
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

/* 입시클래스 제목 1번째  */
const Devinder = styled.div`
width: 100%;
height: 14.4px;
background: #F1F2F3;
border-top: 1px solid #DCDCDC;
@media screen and (max-width: 540px) {
    height: 2.6vw;
}
`;