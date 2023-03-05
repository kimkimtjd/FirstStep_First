import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageActive() {

    const navigate = useNavigate();
    const [data, setData] = useState("멘티");
    const [time, setTime] = useState("");
    const [consulting, setConsulting] = useState([]);
    const [tutor, setTutor] = useState([]);
    const [list, setList] = useState([]);
    const [mentirList, setMentirList] = useState([]);
    const [timearray, setTimearray] = useState([]);
    // var timearray = []

    // 내 컨설팅 정보 , 내 클래스 정보 -> 추후에 수정 예정
    useEffect(() => {
        fetch(`/api/mentor/info/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setConsulting(data)
            });

    }, []);


    // 내 과외 정보 
    useEffect(() => {
        fetch(`/api/tutor/info/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTutor(data)
                // console.log(tutor)
            });

    }, []);

    // 내가 멘토링 신청한 멘토 정보
    useEffect(() => {
        fetch(`/api/add/class/certify/MentorProgram/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMentirList(data)
            });

    }, [mentirList]);


    // 내가 멘토링 신청한 멘토 정보
    useEffect(() => {
        fetch(`/api/add/class/certify/ClassProgram/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTimearray(data)
            });

    }, [mentirList]);
    // 로그인 유지 검증

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
                            onClick={() => navigate('/Mypage')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>활동내역</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>

                <ChoiceBox>
                    <ChoiceInner>
                        {data === "멘티" ?
                            <>
                                <ChoiceHalfChoice>멘티</ChoiceHalfChoice>
                                <ChoiceHalf onClick={() => setData("멘토")}>멘토</ChoiceHalf>
                                <ChoiceHalf onClick={() => setData("개설프로그램")}>개설프로그램</ChoiceHalf>
                            </>
                            :
                            data === "멘토" ?
                                <>
                                    <ChoiceHalf onClick={() => setData("멘티")}>멘티</ChoiceHalf>
                                    <ChoiceHalfChoice>멘토</ChoiceHalfChoice>
                                    <ChoiceHalf onClick={() => setData("개설프로그램")}>개설프로그램</ChoiceHalf>
                                </>
                                :
                                <>
                                    <ChoiceHalf onClick={() => setData("멘티")}>멘티</ChoiceHalf>
                                    <ChoiceHalf onClick={() => setData("멘토")}>멘토</ChoiceHalf>
                                    <ChoiceHalfChoice>개설프로그램</ChoiceHalfChoice>
                                </>

                        }
                    </ChoiceInner>
                </ChoiceBox>

                {data === "멘티" ?
                    <>
                        {/* 컨설팅 */}
                        {mentirList.length === undefined ?
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화내역이 아직없어요.</span>
                                </div>
                                <FindConsulting onClick={() => navigate('/')}>
                                    컨설팅 찾으러가기 {">"}
                                </FindConsulting>
                            </>
                            :
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                </div>
                                {mentirList.map((data, index) => (
                                    <Mentiopen key={index}>
                                        <MnetiTitle>
                                            <div style={{ width: "auto", display: "flex", flexDirection: "row" }}>
                                                {data.Entertime?.substr(0, 10)}
                                                {data.Pay_yn === "N" ?
                                                    <MnetiTitlewait>입금대기</MnetiTitlewait>
                                                    :
                                                    <MnetiTitleemd>완료</MnetiTitleemd>
                                                }
                                            </div>

                                            <div style={{
                                                fontSize: "10px", fontWeight: "400", color: "#797979"
                                            }} onClick={() => navigate(`/Consultng/detail/${data.id}`)}>
                                                상세보기
                                            </div>
                                        </MnetiTitle>
                                        <MnetiTitle>
                                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

                                            <div style={{ width: "auto", display: "flex", flexDirection: "row" }}>
                                                <img src={list?.filter((e) => e.email === data.User)[0]?.profile_logo}
                                                    style={{ width: "50px", height: "50px" }} />
                                                <div style={{ width: "auto", display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                                                    <span>{data.ProgramName?.split("-")[0]}</span>
                                                    <span style={{ color: "#AEAEB2", fontSize: "12px", fontWeight: "400" }}>{data.Nickname}</span>
                                                    <div style={{
                                                        width: "auto", display: "flex", flexDirection: "row", color: "#AEAEB2",
                                                        fontSize: "12px", fontWeight: "400"
                                                    }}>
                                                        <span>{data.University}</span>
                                                        <span>{data.Category}</span>
                                                    </div>
                                                    <Consultingcategory style={{ marginLeft: "0px", width: "40px" }}>{data.Progress?.substr(0, 3)}</Consultingcategory>
                                                </div>

                                                </div>
                                                {data.Pay_yn === "Y" && data.Review === "" ?
                                                    <div style={{
                                                        width: "100%", height: "32px", border: "1px solid #00C563", borderRadius: "4px", display: "flex", justifyContent: "center",
                                                        alignItems: "center", color: "#00C563" , marginTop:"13px"
                                                    }} onClick={() => navigate(`/Consulting/Review/${data.id}/${data.mentIr_id}`)}>후기작성하기</div >
                                                    :
                                                    <></>
                                                }
                                            </div>

                                        </MnetiTitle>
                                        {/* <div>프로그램명{data.ProgramName}</div>
                                        <div>대학교{data.University}</div>
                                        <div>전공{data.Category}</div>
                                        <div>닉네임{data.Nickname}</div> */}
                                    </Mentiopen>

                                ))}
                            </>
                        }
                        <FirstSpace />

                        {/* 클래스 */}
                        {timearray.length === undefined ?
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93" }}>선배와 대화내역이 아직없어요.</span>
                                </div>
                                <FindConsulting onClick={() => navigate('/')}>
                                    클래스 찾으러가기 {">"}
                                </FindConsulting>
                            </>
                            :
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                </div>
                                {timearray.map((data, index) => (
                                    <Mentiopen key={index}>
                                        <MnetiTitle>
                                            <div style={{ width: "auto", display: "flex", flexDirection: "row" }}>
                                                {data.Entertime?.substr(0, 10)}
                                                {data.Pay_yn === "N" ?
                                                    <MnetiTitlewait>입금대기</MnetiTitlewait>
                                                    :
                                                    <MnetiTitleemd>완료</MnetiTitleemd>
                                                }
                                            </div>

                                            <div style={{
                                                fontSize: "10px", fontWeight: "400", color: "#797979"
                                            }} onClick={() => navigate(`/Class/detail/${data.id}`)}>
                                                상세보기
                                            </div>
                                        </MnetiTitle>
                                        <MnetiTitle>
                                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

                                            <div style={{ width: "auto", display: "flex", flexDirection: "row" }}>
                                            {data.Category2 === "국어" ?
                                            <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B5%AD%EC%96%B4.png" />
                                                :data.Category2 === "영어" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%81%EC%96%B4.png"/>
                                                :data.Category2 === "수학" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%88%98%ED%95%99.png" />
                                                :data.Category2 === "생명과학" || data.Category2 === "물리" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EA%B3%BC%ED%95%99%ED%83%90%EA%B5%AC.png" />
                                                :data.Category2 === "한국사" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%ED%95%9C%EA%B5%AD%EC%82%AC.png" />
                                                :data.Category2 === "경제" || data.Category2 === "정치와 법" || data.Category2 === "한국지리"
                                                || data.Category2 === "세계지리" || data.Category2 === "생활과 윤리" || data.Category2 === "윤리와 사상"
                                                || data.Category2 === "동아시아사" || data.Category2 === "세계사" || data.Category2 === "사회 문화" ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%82%AC%ED%9A%8C%ED%83%90%EA%B5%AC.png" />
                                                :data.Category2 === "제2외국어"  ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%A0%9C2%EC%99%B8%EA%B5%AD%EC%96%B4.png"/>
                                                :data.Category2 === "자소서첨삭" || data.Category2 === "모의면접"   ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%A9%B4%EC%A0%91%2C%EC%A0%80%EC%86%8C%EC%84%9C.png" />
                                                :data.Category2 === "논술"  ?
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EB%85%BC%EC%88%A0.png" /> 
                                                :                                               
                                                <Contentimg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EB%B0%B0%EB%84%88_%EC%98%88%EC%B2%B4%EB%8A%A5.png"/> 
                                            }
                                                <div style={{ width: "auto", display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                                                <Consultingcategory style={{
                                                        marginLeft: "0px", width: "40px" ,marginTop:"5px"
                                                    }}
                                                    >{data.Progress?.substr(0, 3)}</Consultingcategory>
                                                    <span style={{ marginTop:"6px"}}>{data.ProgramName?.split("-")[0]}</span>
                                                    <span style={{ color:"#AEAEB2" , fontSize:"12px"}}>{data.ProgramName?.split("-")[1]}</span>
                                                </div>

                                                <div>

                                                </div>
                                              
                                            </div>
                                            {data.Pay_yn === "Y" && data.Review === "" ?
                                                    <div style={{
                                                        width: "100%", height: "32px", border: "1px solid #00C563", borderRadius: "4px", display: "flex", justifyContent: "center",
                                                        alignItems: "center", color: "#00C563" , marginTop:"13px"
                                                    }} onClick={() => navigate(`/Class/Review/${data.id}/${data.mentIr_id}`)}>후기작성하기</div >
                                                    :
                                                    <></>
                                                }
                                        </div>
                                        </MnetiTitle>
                                        {/* <div>프로그램명{data.ProgramName}</div>
                                <div>대학교{data.University}</div>
                                <div>전공{data.Category}</div>
                                <div>닉네임{data.Nickname}</div> */}
                                    </Mentiopen>

                                ))}
                            </>
                        }
                    </>
                    : data === "멘토" ?
                        <>
                            {consulting.length === undefined ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", textAlign: "center" }}>멘토가되어 나만의 경험 노하우를<br />멘티들에게 알려주세요.</span>
                                    </div>
                                    <FindConsulting onClick={() => navigate('/')}>
                                        컨설팅 찾으러가기 {">"}
                                    </FindConsulting>
                                </>
                                :
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                    </div>
                                    {consulting.map((data, index) => (
                                        <Consultingopen key={index}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Consultingcategory >{data.Progress?.substr(0, 3)}</Consultingcategory>
                                            </div>
                                            <Consultingtitle>
                                                {data.ProgramName?.split("-")[0]}
                                            </Consultingtitle>
                                            <span style={{ color: "#00C563", fontSize: "10px", fontWeight: "500", marginLeft: "12px", marginTop: "4px" }}>멘티가 아직 없어요.</span>
                                        </Consultingopen>

                                    ))}
                                </>
                            }


                            <FirstSpace />
                            {/* 클래스 */}
                            {tutor.length === undefined ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", textAlign: "center" }}>멘토가되어 나만의 경험 노하우를<br />멘티들에게 알려주세요.</span>
                                    </div>
                                    <FindConsulting onClick={() => navigate('/')}>
                                        클래스 찾으러가기 {">"}
                                    </FindConsulting>
                                </>
                                : <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                    </div>
                                    {tutor.map((data, index) => (
                                        <Consultingopen key={index}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Consultingcategory>{data.Progress?.substr(0, 3)}</Consultingcategory>
                                                {
                                                    data.Category2?.split('-').map((subdata, index) => (
                                                        <Consultingcategory key={index}>
                                                            {subdata}
                                                        </Consultingcategory>

                                                    ))}
                                            </div>
                                            <Consultingtitle>
                                                {data.ProgramName}
                                            </Consultingtitle>
                                            <span style={{ color: "#00C563", fontSize: "10px", fontWeight: "500", marginLeft: "12px", marginTop: "4px" }}>멘티가 아직 없어요.</span>
                                        </Consultingopen>

                                    ))}
                                </>
                            }
                        </>
                        :
                        <>
                            {/* 컨설팅 */}
                            {consulting.length === undefined ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", textAlign: "center" }}>멘토가 되어 나만의 경험 노하우를<br />멘티들에게 알려주세요.</span>
                                    </div>
                                    <FindConsulting onClick={() => navigate('/')}>
                                        컨설팅 찾으러가기 {">"}
                                    </FindConsulting>
                                </>
                                :
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>컨설팅</span>
                                    </div>
                                    {consulting.map((data, index) => (
                                        <Consultingopen key={index}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Consultingcategory >{data.Progress?.substr(0, 3)}</Consultingcategory>
                                            </div>
                                            <Consultingtitle>
                                                {data.ProgramName?.split("-")[0]}
                                            </Consultingtitle>
                                            <span style={{ color: "#00C563", fontSize: "10px", fontWeight: "500", marginLeft: "12px", marginTop: "4px" }}>멘티가 아직 없어요.</span>
                                        </Consultingopen>

                                    ))}
                                </>
                            }


                            <FirstSpace />
                            {/* 클래스 */}
                            {tutor.length === undefined ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "auto", marginTop: "40px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", textAlign: "center" }}>멘토가되어 나만의 경험 노하우를<br />멘티들에게 알려주세요.</span>
                                    </div>
                                    <FindConsulting onClick={() => navigate('/')}>
                                        클래스 찾으러가기 {">"}
                                    </FindConsulting>
                                </>
                                : <>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", marginTop: "36px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151" }}>클래스</span>
                                    </div>
                                    {tutor.map((data, index) => (
                                        <Consultingopen key={index}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Consultingcategory>{data.Progress?.substr(0, 3)}</Consultingcategory>
                                                {
                                                    data.Category2?.split('-').map((subdata, index) => (
                                                        <Consultingcategory key={index}>
                                                            {subdata}
                                                        </Consultingcategory>

                                                    ))}
                                            </div>
                                            <Consultingtitle>
                                                {data.ProgramName}
                                            </Consultingtitle>
                                            <span style={{ color: "#00C563", fontSize: "10px", fontWeight: "500", marginLeft: "12px", marginTop: "4px" }}>멘티가 아직 없어요.</span>
                                        </Consultingopen>

                                    ))}
                                </>
                            }
                        </>
                }

            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default MyPageActive;

/* 전체박스 */
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
padding-bottom:200px;
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
width: 33%;
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
width: 33%;
height: 69.12px;
border-bottom:1px solid #00C563;
color:#00C563;
font-weight: 700;
font-size: 14px;
@media screen and (max-width: 540px) {
    height:12.8vw;
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

/* 컨설팅 개설내역 */
const Consultingopen = styled.div`
display: flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;
width: 90%;
margin-top:16px;
margin-bottom:8px;
height: 98px;
background: #FFFFFF;
border: 1px solid rgba(220, 220, 220, 0.7);
border-radius: 8px;
@media screen and (max-width: 540px) {
    
	}
`;


/* 내 멘티 */
const Mentiopen = styled.div`
display: flex;
justify-content:center;
align-items:center;
flex-direction:column;
width: 90%;
margin-top:16px;
margin-bottom:8px;
height: auto;
background: #FFFFFF;
border: 1px solid rgba(220, 220, 220, 0.7);
border-radius: 8px;
@media screen and (max-width: 540px) {
    
	}
`;

/* 컨설팅 개설내역 */
const Consultingcategory = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction:row;
width: auto;
margin-top:16px;
margin-left:12px;
padding:0 5px;
height: 20px;
background: #FFFFFF;
border: 1px solid rgba(220, 220, 220, 0.7);
border-radius: 4px;
font-weight: 400;
font-size: 9px;
color: #797979;
@media screen and (max-width: 540px) {
	}
`;

/* 컨설팅 개설내역 */
const Consultingtitle = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
width: 100%;
margin-top:4px;
margin-left:12px;
height: 17px;
background: #FFFFFF;
font-weight: 600;
font-size: 14px;
color: #515151;
@media screen and (max-width: 540px) {
	}
`;

/* 마이페이지 - 내 멘티활동 */
const MnetiTitle = styled.div`
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: flex-start;
width: 90%;
height:auto;
margin-top:16px;
font-weight: 600;
font-size: 14px;
color: #515151;
border-bottom: 0.8px solid #DCDCDC;
padding-bottom:10px;
@media screen and (max-width: 540px) {
	}
`;

const Contentimg = styled.img`
width:120px;
height:78px;
@media screen and (max-width: 540px) {
	}
`;

/* 마이페이지 - 내 멘티활동 - 입금대기 */
const MnetiTitlewait = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 41.25px;
height: 16.75px;
font-weight: 600;
font-size: 8px;
color: #00C563;
margin-left:4px;
background: #E2FFF1;
border-radius: 3px;
@media screen and (max-width: 540px) {
	}
`;

/* 마이페이지 - 내 멘티활동 - 완료 */
const MnetiTitleemd = styled.div`
display: flex;
justify-content:center;
align-items: center;
margin-left:4px;
width: 25.25px;
height: 16.75px;
font-weight: 600;
font-size: 8px;
color: #797979;
background: #F1F2F3;
border-radius: 3px;
@media screen and (max-width: 540px) {
	}
`;