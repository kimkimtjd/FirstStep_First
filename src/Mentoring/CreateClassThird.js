import { useState, useEffect, useRef } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";
import TemporSaveModal from "./TemporSaveModal";
import FavoriteStore from "../Zusatand/Favorite";
import Admin from "../Common/Admin";
import NumberFormat from 'react-number-format';

function CreateClassThird() {

    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState(0); // 진행형식
    const [project, setProject] = useState(""); //  진행가능 일자 및 시간
    const [projecttrue, setProjecttrue] = useState(true); // 진행가능 일자 및 시간
    const [time, setTime] = useState(""); //  시간
    const [timetrue, setTimetrue] = useState(true); // 시간활성화
    const [value, setValue] = useState(""); //  가격
    const [valuetrue, setValuetrue] = useState(true); // 가격활성화
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달
    const [modalIsOpentempor, setModalIsOpentempor] = useState(false); // 임시저장 모달
    const { proceedFunction, valueFunction, nameuser, birthuser, classHigh, classUniverse,
        classkind, Education, Advantage, TitleInput, Subject, Recommend, proceed, subjectChoice } = FavoriteStore();

    // 금액 콜마
    const inputPriceFormat = (str) => {
        console.log("s", str);
        const comma = (str) => {
            str = String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
        };
        const uncomma = (str) => {
            str = String(str);
            return str.replace(/[^\d]+/g, "");
        };
        return comma(uncomma(str));
    };



    // 컨설팅  종류 온라인 오프라인 1:1
    useEffect(() => {
        if (choice === 1) {
            proceedFunction("온라인 화상통화")
        }
        else if (choice === 2) {
            proceedFunction("1:1 메세지")
        }
        else if (choice === 3) {
            proceedFunction("오프라인")
        }
    }, [choice]);



    // 시간 초점
    function TimeFocus() {
        setTimetrue(false)
        setValuetrue(true)
        setProjecttrue(true)
    }

    // 가격 초점
    function ValueFocus() {
        setTimetrue(true)
        setValuetrue(false)
        setProjecttrue(true)
    }

     // 진행가능일정 및 시간 초점
     function ProjectFocus() {
        setTimetrue(true)
        setValuetrue(true)
        setProjecttrue(false)
    }

    // 완료
    function Admin() {
        var timess = new Date();

        if (location.pathname.includes('tutor')) {
            fetch("/api/tutor/save/Tutor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Userreq: localStorage.getItem('id'),
                    Namereq: nameuser,
                    Birthreq: birthuser,
                    Highschoolreq: classHigh,
                    Universityreq: classUniverse,
                    Categoryreq: classkind,
                    Gradereq: Education,
                    Advantagereq: Advantage,
                    ProgramNamereq: TitleInput,
                    CategorySecond2req: subjectChoice.join("-"),
                    Subjectsreq: Subject,
                    Recommendreq: Recommend,
                    Progressreq: proceed,
                    Avalablereq:project,
                    Valuereq: value,
                    Timereq: time,
                    Approvereq: "N",
                    Datetimereq: timess
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result === "success") {
                        setModalIsOpen(true)
                    }
                })
        }
        else {
            fetch("/api/mentor/save/Mentor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Userreq: localStorage.getItem('id'),
                    Namereq: nameuser,
                    Birthreq: birthuser,
                    Highschoolreq: classHigh,
                    Universityreq: classUniverse,
                    Categoryreq: classkind,
                    Gradereq: Education,
                    Advantagereq: Advantage,
                    ProgramNamereq: TitleInput,
                    Subjectsreq: Subject,
                    Recommendreq: Recommend,
                    Progressreq: proceed,
                    Avalablereq:project,
                    Valuereq: value,
                    Timereq: time,
                    Approvereq: "N",
                    Datetimereq: timess
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result === "success") {
                        setModalIsOpen(true)
                    }
                })

        }

    }



    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >

                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => location.pathname.includes('tutor') ? navigate('/PostProgram/tutor/Second') : navigate('/PostProgram/class/Second')} />

                    <span className={stylesSecond.HeaderText}>컨설팅 멘토 신청</span>

                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* 순서 이미지 */}
                <div style={{ width: "90%", display: "flex", justifyContent: "flex-start" }}>
                    <StageImg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/Third.png" alt="img" />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={stylesSecond.IntroText}>
                        <div style={{ fontWeight: "900" }}>컨설팅에대한</div>
                        <div style={{ display: "flex", flexDirection: "row", fontWeight: "400" }}>
                            <div style={{ fontWeight: "900" }}>운영방식</div>
                            <div>을 작성해주세요</div>
                        </div>
                    </div>
                    <div className={styles.IntroSub}>
                        진행형식과 가격을 알려주세요!
                    </div>
                </div>

                {/* 진행형식 */}
                <SubjectBox>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>진행형식</span>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginBottom: "16px", marginTop: "4px" }}>원하는 진행방법을 골라주세요!</span>


                    {/* 온라인 화상통화 */}
                    <SubjectInner onClick={() => setChoice(1)}>
                        {choice === 1 ?
                            <SubjectInnerFirstClick>
                                온라인 화상 통화
                            </SubjectInnerFirstClick>
                            :
                            <SubjectInnerFirst>
                                온라인 화상 통화
                            </SubjectInnerFirst>
                        }
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>줌, 구글 밋 등 온라인 대면</span>
                            <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>자유로운 소통을 원할 때</span>
                        </div>
                        {choice === 1 ?
                            <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            : ""
                        }
                    </SubjectInner>

                    {choice === 1 ?
                        <ExplainBox>
                            <ExplainInner>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>화상통화 진행형식에 대한 특징을 간략하게 설명합니다. 유저가 진행형식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                    </span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        화상통화 진행에 대한 특징을 간략하게 설명합니다.
                                    </span>
                                </div>
                            </ExplainInner>
                        </ExplainBox>
                        : ""
                    }

                    {/* 1:1 */}
                    <SubjectInner onClick={() => setChoice(2)}>
                        {choice === 2 ?
                            <SubjectInnerSecondActive>
                                1:1 메세지
                            </SubjectInnerSecondActive>
                            :
                            <SubjectInnerSecond>
                                1:1 메세지
                            </SubjectInnerSecond>
                        }
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>온라인 비대면</span>
                            <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>시간적 여유가 없고, 대면이 어려울때</span>
                        </div>
                        {choice === 2 ?
                            <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            :
                            ""
                        }
                    </SubjectInner>

                    {choice === 2 ?
                        <ExplainBox>
                            <ExplainInner>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>1:1 메시지 운영방식에 대한 특징을 간략하게 설명합니다. 유저가 운영방식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                    </span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        1:1 프로그램에 대한 특징을 간략하게 설명합니다.
                                    </span>
                                </div>
                            </ExplainInner>
                        </ExplainBox>
                        : ""
                    }

                    {/* 오프라인 */}
                    <SubjectInner onClick={() => setChoice(3)}>
                        {choice === 3 ?
                            <SubjectInnerSecondActive>
                                오프라인
                            </SubjectInnerSecondActive>
                            :
                            <SubjectInnerSecond>
                                오프라인
                            </SubjectInnerSecond>
                        }
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>선배와 깊은 컨설팅</span>
                            <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>질문의 양이 많고 내용이 많을 때</span>
                        </div>
                        {choice === 3 ?
                            <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            :
                            ""
                        }

                    </SubjectInner>

                    {choice === 3 ?
                        <ExplainBox>
                            <ExplainInner>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>1:1 메시지 운영방식에 대한 특징을 간략하게 설명합니다. 유저가 운영방식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                    </span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                    <span>ㆍ</span>
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        1:1 프로그램에 대한 특징을 간략하게 설명합니다.
                                    </span>
                                </div>
                            </ExplainInner>
                        </ExplainBox>
                        : ""
                    }
                </SubjectBox>

                <div style={{ width: "100%", height: "10px", background: "#DCDCDC", marginTop: "32px" }}></div>

                {/* 가능요일 및 시간 */}
                <MainThird>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "4px" }}>가능요일 및 시간</span>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>컨설팅 진행가능 일정을 작성해주세요.</span>
                    <ChoiceHigh>
                        {projecttrue ?
                            <Universe_Project>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onFocus={() => ProjectFocus()}
                                    onChange={(e) => setProject(e.target.value)}
                                    value={project}
                                    placeholder="예)월,수,금 20시 이후"
                                    type="text"
                                />
                            </Universe_Project>
                            :
                            <Universe_Project_Choice>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onChange={(e) => setProject(e.target.value)}
                                    value={project}
                                    placeholder="예)월,수,금 20시 이후"
                                    type="text"
                                />
                            </Universe_Project_Choice>
                        }
                    </ChoiceHigh>


                </MainThird>

                {/* 시간 */}
                <MainThird>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "4px" }}>진행시간</span>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>컨설팅 진행시간 을 작성해주세요.</span>
                    <ChoiceHigh>
                        {timetrue ?
                            <Universe_Project>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onFocus={() => TimeFocus()}
                                    onChange={(e) => setTime(e.target.value)}
                                    value={time}
                                    placeholder="예)30분"
                                    type="text"
                                />
                            </Universe_Project>
                            :
                            <Universe_Project_Choice>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onChange={(e) => setTime(e.target.value)}
                                    value={time}
                                    placeholder="예)30분"
                                    type="text"
                                />
                            </Universe_Project_Choice>
                        }
                    </ChoiceHigh>


                </MainThird>

                {/* 가격 */}
                <MainThird>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "4px" }}>가격</span>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>컨설팅 비용을 작성해주세요.</span>
                    <ChoiceHigh>
                        {valuetrue ?
                            <Universe_Project>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onFocus={() => ValueFocus()}
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    placeholder="예)30,000원"
                                    type="text"
                                />
                            </Universe_Project>
                            :
                            <Universe_Project_Choice>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onChange={(e) => setValue(inputPriceFormat(e.target.value))}
                                    value={value}
                                    placeholder="예)30,000원"
                                    type="text"
                                />
                            </Universe_Project_Choice>
                        }
                    </ChoiceHigh>
                    <ExplainValueBox>
                        <ExplainInner>
                            <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                <span>ㆍ</span>
                                <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>프로그램을 만들고 나면 마지막 단계로 관리자가 승인 여부를 심사합니다.
                                </span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                <span>ㆍ</span>
                                <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                    승인이 되면 관리자와 최종 세팅을 점검한 후프로그램이 서비스에 노출됩니다.
                                </span>
                            </div>
                        </ExplainInner>
                    </ExplainValueBox>

                </MainThird>

                {/* 로그인버튼 */}
                <div className={styles.LoginBtnSecond}>
                    <div className={styles.Btn}>
                        <span style={{ fontSize: 14, fontWeight: "700", color: "white" }} onClick={() => Admin()}>신청하기</span>
                    </div>
                </div>


            </div>

            {modalIsOpen && (<Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
            />)}

            {modalIsOpentempor && (<TemporSaveModal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpentempor(false);
                }}
            />)}

        </>
    );
}

export default CreateClassThird;


/* 순서 이미지 */
const StageImg = styled.img`
width:auto;
height:25px;
margin-top:24px;
margin-bottom:16px;
@media screen and (max-width: 540px) {
}
`;

/* 선택부분 전체 박스 */
const SubjectBox = styled.div`
width:90%;
height:auto;
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction:column;
margin-top:40px;
@media screen and (max-width: 540px) {
}
`;

/* 선택부분 내부 */
const SubjectInner = styled.div`
width:100%;
height:60.48px;
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction:row;
margin-top:16px;
@media screen and (max-width: 540px) {
    height:11.2vw;
    }
`;

/* 온라인 화상통화 */
const SubjectInnerFirst = styled.div`
width:178.56px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    width:33vw;
    }
`;

/* 온라인 화상통화 클릭시 */
const SubjectInnerFirstClick = styled.div`
width:178.56px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #00C563;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    width:33vw;
    }
`;


/* 오프라인 및 1대1 메세지 */
const SubjectInnerSecond = styled.div`
width:128.16px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    width:23.7vw;
    }
`;

/* 오프라인 및 1대1 메세지 활성화 */
const SubjectInnerSecondActive = styled.div`
width:128.16px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #00C563;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    width:23.7vw;
    }
`;

/* 선택부분 설명 */
const ExplainBox = styled.div`
width:100%;
height:167.04px;
background: #E2FFF1;
border-radius: 8px;
display:flex;
justify-content: center;
align-items: center;
margin-top:12px;
@media screen and (max-width: 540px) {
    height:30.9vw;
}
`;

/* 기격부분 설명 */
const ExplainValueBox = styled.div`
width:100%;
height:167.04px;
background: #F1F2F3;
border-radius: 8px;
display:flex;
justify-content: center;
align-items: center;
margin-top:113px;
@media screen and (max-width: 540px) {
    height:30.9vw;
}
`;

/* 선택부분 설명 내부 박스 */
const ExplainInner = styled.div`
width:93%;
height:auto;
display:flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
@media screen and (max-width: 540px) {
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

/* 가격 전체박스 */
const MainThird = styled.div`
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


/* 가격 내부 */
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

/* 가격 전체박스 */
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

/* 가격 전체박스 선택되었을떄 */
const Universe_Project_Choice = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #00C563;
border-radius: 8px;
@media screen and (max-width: 540px) {
    height:14.9vw;
    }
`;