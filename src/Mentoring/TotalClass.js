import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function TotalClass() {

    const navigate = useNavigate();
    const [data, setData] = useState("클래스");

    const [first, setFirst] = useState([]);
    const [book, setBook] = useState([]);
    const [list, setList] = useState([]);
    const [i, setI] = useState(1);


    // 컨설팅 멘티건
    useEffect(() => {
        fetch(`/api/tutor/total`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setFirst(data)
            });
    }, []);

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
                setBook(data.filter((e) => e.category === "클래스"));
            });
        // }
    }, [book]);

    // console.log(book)


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

    }, [list]);


    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}></span>
                        <div style={{ width: "24px", height: "24px" }}></div>

                    </TopInner>
                </Top>

                <ChoiceBox>
                    <ChoiceInner>
                        {data === "컨설팅" ?
                            <>
                                <ChoiceHalfChoice>컨설팅</ChoiceHalfChoice>
                                <ChoiceHalf onClick={() => setData("클래스")}>클래스</ChoiceHalf>
                            </>
                            :
                            <>
                                <ChoiceHalf onClick={() => navigate('/Total/Consulting')}>컨설팅</ChoiceHalf>
                                <ChoiceHalfChoice>클래스</ChoiceHalfChoice>
                            </>
                        }
                    </ChoiceInner>
                </ChoiceBox>

                {data === "클래스" ?
                    <>

                        {first?.slice(0, 5 * i).map((data, index) => (
                            <ContentBox key={index} onClick={() => navigate(`/Consultng/detail/${data.id}`)}>
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
                                    {book.result === "fail" ?
                                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                            style={{ width: "40px", height: "40px" }} />
                                        :
                                        book.filter((e) => e.mentor_id === data.User + "," + data.ProgramName).length === 1 ?
                                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bookmark_ok.png"
                                                style={{ width: "40px", height: "40px" }} />
                                            :
                                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/BookMark.png"
                                                style={{ width: "40px", height: "40px" }} />
                                    }
                                </div>
                            </ContentBox>
                        ))}

                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px",
                            width: "100%", border: "1px solid #DCDCDC", height: "50px", color: "#797979" , fontWeight:"bold"
                        }}
                            onClick={() => setI(i + 1)}>
                            더보기
                        </div>
                    </>
                    :
                    <>


                    </>
                }
            </MainBox>



        </>
    );
}

export default TotalClass;

/* 전체박스 */
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
padding-bottom:50px;
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
margin-bottom:16px;
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
width: 216px;
height: 100%;
over-flow:hidden;
@media screen and (max-width: 540px) {
    width: 40vw;
}
`;