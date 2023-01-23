import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";
import TemporSaveModal from "./TemporSaveModal";

function CreateClass() {

    const navigate = useNavigate();
    const location = useLocation();
    const { classHigh, classUniverse, nameuser, NameFunction, birthuser, birthFunction, kindFunction, classkind, Education,
        EducationFunction, Education_List, AdvantageFunction, Advantage } = FavoriteStore();
    const [data, setData] = useState([]); // 유저정보
    const [name, setName] = useState(""); // 이름
    const [nameCheck, setNameCheck] = useState(true); // 이름 Focus
    const [birth, setBirth] = useState(""); // 생년월일
    const [birthCheck, setBirthCheck] = useState(true); // 생년월일 Focus
    const [kinds, setKinds] = useState(""); // 학과
    const [choice, setChoice] = useState(""); // 학년cd..
    const [advantage, setAdvantage] = useState(true); // 나의 필살기 클릭시 활성화
    const [advantagetextarea, setAdvantagetextarea] = useState(""); // 나의 필살기 입력부분
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모


    // 닉네임
    useEffect(() => {
        fetch(`/api/user/Emailname/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data.user);
            });

    }, []);

    // 이름 입력완료
    useEffect(() => {
        if (nameuser !== "") {
            setName(nameuser);
        }
    }, [name]);

    // 생년월일 입력완료
    useEffect(() => {
        if (birthuser !== "") {
            setBirth(birthuser);
        }
    }, [birth]);

    // 학과
    useEffect(() => {
        if (kinds !== "") {
            kindFunction(kinds);
        }
    }, [kinds]);

    // 학년
    useEffect(() => {
        if (choice !== "") {
            EducationFunction(choice);
        }
    }, [choice]);

    // 나만의 필살기
    useEffect(() => {
        if (advantagetextarea !== "") {
            AdvantageFunction(advantagetextarea.replace(/(?:\r\n|\r|\n)/g, "<br/>"));
        }
    }, [advantagetextarea]);


    // 이름 Focus
    function NameFocus() {
        setNameCheck(false)
        setBirthCheck(true)
    }

    // 생년월일 Focus
    function BirthFocus() {
        setNameCheck(true)
        setBirthCheck(false)
    }

    // 고등학교 입력페이지 이동시 , 이름 생년월일 저장
    function LocateHigh() {
        if (location.pathname.includes('tutor')) {
            navigate('/PostProgram/tutor/ChoiceHigh');
            NameFunction(name);
            birthFunction(birth);
        }
        else {
            navigate('/PostProgram/class/ChoiceHigh');
            NameFunction(name);
            birthFunction(birth);
        }
    }

    // 대학교 입력페이지 이동시 , 이름 생년월일 저장
    function LocateUniversity() {
        if (location.pathname.includes('tutor')) {
            navigate('/PostProgram/tutor/ChoiceUniversity')
            NameFunction(name);
            birthFunction(birth);
        }
        else {
            navigate('/PostProgram/class/ChoiceUniversity')
            NameFunction(name);
            birthFunction(birth);
        }
    }


    return (
        <>

            {modalIsOpen && (<TemporSaveModal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
            />)}

            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >

                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/PostProgram')} />

                    <span className={stylesSecond.HeaderText}>멘토정보작성</span>

                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* 순서 이미지 */}
                <div style={{ width: "90%", display: "flex", justifyContent: "flex-start" }}>
                    <StageImg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/First.png" alt="img" />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={stylesSecond.IntroText}>
                        <div style={{ display: "flex", flexDirection: "row", fontWeight: "400" }}>
                            <div style={{ fontWeight: "900" }}>{data}</div>
                            <div>님에 대한</div>
                        </div>
                        정보를 확인할게요!
                    </div>
                    <div className={styles.IntroSub}>
                        컨설팅 프로그램을 맞춤 추천할때 활용됩니다.
                    </div>
                </div>

                {/* 이름 */}
                {nameCheck ?
                    <div className={stylesSecond.FirstInnerSecond}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <span className={stylesSecond.FirstTitle}>이름</span>
                            <input
                                className={stylesSecond.EmailInput}
                                name="email"
                                placeholder="이름을 입력해주세요."
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => NameFocus()}
                                value={name}
                            />
                        </div>
                        {name === "" ?
                            <></>
                            :
                            <img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setName('')}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
                        }
                    </div>
                    :
                    <div className={stylesSecond.FocusSecond}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <span className={stylesSecond.FirstTitle}>이름</span>
                            <input
                                className={stylesSecond.EmailInput}
                                name="email"
                                placeholder="이름을 입력해주세요."
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => NameFocus()}
                                value={name}
                            />
                        </div>
                        {name === "" ?
                            <></>
                            :
                            <img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setName('')}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
                        }
                    </div>
                }

                {birthCheck ?
                    <div className={stylesSecond.FirstInnerSecond}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <span className={stylesSecond.FirstTitle}>생년월일</span>
                            <input
                                className={stylesSecond.EmailInput}
                                name="birth"
                                placeholder="생년월일 6자리 입력"
                                onChange={(e) => setBirth(e.target.value)}
                                onFocus={() => BirthFocus()}
                                value={birth}
                                type="number"
                            />
                        </div>
                        {birth === "" ?
                            <></>
                            :
                            <img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setBirth('')}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
                        }
                    </div>
                    :
                    <div className={stylesSecond.FocusSecond}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <span className={stylesSecond.FirstTitle}>생년월일</span>
                            <input
                                className={stylesSecond.EmailInput}
                                name="email"
                                placeholder="생년월일 6자리 입력"
                                onChange={(e) => setBirth(e.target.value)}
                                value={birth}
                                type="number"
                            />
                        </div>
                        {birth === "" ?
                            <></>
                            :
                            <img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setBirth('')}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
                        }
                    </div>
                }

                {/* 고등학교  */}
                {classHigh === "" ?
                    <MainBox>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>고등학교</span>
                        <MainSecond onClick={() => LocateHigh()} >
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            추가하기
                        </MainSecond>
                    </MainBox>
                    :
                    <MainBox>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>고등학교</span>
                        <ChoiceHigh>
                            <High_Locate>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>시/도</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{classHigh.split(',')[0]}</span>
                                </div>
                            </High_Locate>
                            <High_Project>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>고등학교 유형</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{classHigh.split(',')[1]}</span>
                                </div>
                            </High_Project>
                        </ChoiceHigh>
                    </MainBox>
                }

                {/* 대학교 */}
                {classUniverse === "" ?
                    <MainBox>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>대학교</span>
                        <MainSecond onClick={() => LocateUniversity()} >
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            추가하기
                        </MainSecond>
                    </MainBox>
                    :
                    <MainBox>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>대학교</span>
                        <ChoiceHigh>
                            <Universe_Project>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>{classUniverse.split(',')[1]}</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#797979" }}>{classUniverse.split(',')[0]}</span>
                                </div>
                            </Universe_Project>
                        </ChoiceHigh>
                    </MainBox>
                }

                {/* 학과 */}
                {classUniverse === "" ?
                    ""
                    :
                    <MainBoxSecond>
                        <ChoiceHigh>
                            <Universe_Project>
                                <div style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979" }}>학과</span>
                                    <input
                                        className={styles.EmailInputSecond}
                                        name="email"
                                        placeholder="학과를 입력해주세요."
                                        onChange={(e) => setKinds(e.target.value)}
                                        value={kinds}
                                    />
                                </div>
                            </Universe_Project>
                        </ChoiceHigh>
                    </MainBoxSecond>
                }

                {/* 학년 */}
                <MainBox>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>학년</span>

                    {/* 1~휴학생 */}
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
                        {Education_List.slice(0, 5).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 졸업예정자 ~ 기타 */}
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
                        {Education_List.slice(5, 7).map((data, index) => (
                            <div key={index}>
                                {choice === data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setChoice(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>
                </MainBox>

                {/* 필살기 */}
                <MainBox>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>나만의 필살기</span>
                    {advantage ?
                        <MainSecond onClick={() => setAdvantage(false)}>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            스펙과 경력 등 어필하고 싶은 나만의 필살기 추가하기
                        </MainSecond>
                        :
                        <AdvantageTextarea
                            style={{ resize: "none" }}
                            placeholder="상세내용을 입력해주세요"
                            value={advantagetextarea}
                            onChange={(e) => setAdvantagetextarea(e.target.value)}
                            name="MainBusiness"
                            rows="5"
                            cols="50"
                        />
                    }
                </MainBox>

                {/* 로그인버튼 */}
                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => location.pathname.includes('tutor') ? navigate('/PostProgram/tutor/Second') : navigate('/PostProgram/class/Second')}>
                        <span style={{ fontSize: 14, fontWeight: "700", color: "white" }}>다음</span>
                    </div>
                </div>


            </div>




        </>
    );
}

export default CreateClass;


/* 순서 이미지 */
const StageImg = styled.img`
width:auto;
height:25px;
margin-top:24px;
margin-bottom:16px;
@media screen and (max-width: 540px) {
}
`;

/* 고등 대학교 전체박스 */
const MainBox = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top:40px;
@media screen and (max-width: 540px) {
    }
`;

/* 학과 전체박스 */
const MainBoxSecond = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top:8px;
@media screen and (max-width: 540px) {
    }
`;

/* 고등  전체박스 */
const MainSecond = styled.div`
width:100%;
height:24.48px;
display: flex;
justify-content:flex-start;
align-items: center;
margin-top:16px;
font-weight: 400;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    height:4.5vw;
    }
`;

/* 고등 선택된부분 */
const ChoiceHigh = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:space-between;
align-items: center;
flex-direction:row;
margin-top:16px;
@media screen and (max-width: 540px) {
    height:14.9vw;
    }
`;

/* 고등 선택된부분 지역 */
const High_Locate = styled.div`
width:164.16px;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    width:30.4vw;
    height:14.9vw;
    }
`;

/* 고등 선택된부분 유형*/
const High_Project = styled.div`
width:306.7px;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    width:56.8vw;
    height:14.9vw;
    }
`;

/* 대학 선택된부분 유형*/
const Universe_Project = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    height:14.9vw;
    }
`;

/* 학년 선택X */
const MainCityIndividual = styled.div`
padding:8px 12px;
margin-right:6px;
border: 1px solid #DCDCDC;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #797979;
@media screen and (max-width: 540px) {
    margin-right:4px;
    padding:2.1vw 3.2vw;
}
`;

/* 학년 선택O */
const MainCityChocie = styled.div`
padding:8px 12px;
margin-right:6px;
background: #00C563;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #FFFFFF;
@media screen and (max-width: 540px) {
    margin-right:4px;
    padding:2.1vw 3.2vw;
}
`;

/* 대학 선택된부분 유형*/
const AdvantageTextarea = styled.textarea`
width:100%;
height:119.52px;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-top:16px;
font-weight: 400;
font-size: 14px;
padding:0;
color: #797979;
line-height: 17px;
@media screen and (max-width: 540px) {
    height:22.1vw;
    }
`;

const FirstBtn = styled.div`
width: 48%;
height: 56px;
display:flex;
justify-content: center;
align-items: center;
border-radius: 8px;
background-color: #00C563;
cursor: pointer;
@media screen and (max-width: 540px) {
    height:13.3vw;
    }
`;

const SecondBtn = styled.div`
width: 48%;
height: 56px;
display:flex;
justify-content: center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
background: #FFFFFF;
cursor: pointer;
@media screen and (max-width: 540px) {
    height:13.3vw;
    }
`;