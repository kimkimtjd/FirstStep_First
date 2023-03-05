import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function PostProgram() {

    const navigate = useNavigate();
    const [data, setData] = useState("컨설팅");

    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >

                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/')} />

                    <span className={stylesSecond.HeaderText}>멘토정보 작성</span>

                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={stylesSecond.IntroText}>
                        <div style={{ display: "flex", flexDirection: "row", fontWeight: "400" }}>
                            <div style={{ fontWeight: "900" }}>경험과 노하우</div>
                            <div>를 공유하여</div>
                        </div>
                        다양한 혜택을 받아보세요!
                    </div>
                    <div className={styles.IntroSub}>
                        원하시는 프로그램 유형을 선택해주세요!
                    </div>
                </div>

                <MentorText>
                    {data === "컨설팅" ?
                        <>
                            <ChoiceBox>
                                <div style={{ display: "flex", flexDirection: "row", width: "auto", height: "100%" }}>
                                    <ProgramChoice>
                                        컨설팅
                                    </ProgramChoice>
                                    <ProgramText>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#797979" }}>가벼운피드백</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#797979" }}>1회진행 , 온/오프형식</span>
                                    </ProgramText>
                                </div>
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            </ChoiceBox>

                            <ExplainBox>
                                <ExplainInner>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>멘토님께서 재학중이신 대학을 목표로 하는 예비 후배들과 진행하는 컨설팅입니다.
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" , marginTop:"20px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        평소 궁금해하던 합격컷, 학과 수업 커리큘럼, 졸업 후 진로까지 다양한 멘티의 고민을 해결해줍니다.
                                        </span>
                                    </div>
                                </ExplainInner>
                            </ExplainBox>

                            <ChoiceBox onClick={() => setData('클래스')}>
                                <div style={{ display: "flex", flexDirection: "row", width: "auto", height: "100%" }}>
                                    <Program>
                                        클래스
                                    </Program>
                                    <ProgramText>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#797979" }}>주제에 대한 집중 과외 및 강의</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#797979" }}>2회이상 진행, 온/오프,라인형식</span>
                                    </ProgramText>
                                </div>
                                <div style={{ width: "16px", height: "auto", marginRight: "18px" }} />
                            </ChoiceBox>

                            {/* <ChoiceBox> */}
                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/%EC%BB%A8%EC%84%A4%ED%8C%85+%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png"
                                    style={{ width: "200px", height: "auto" }} />
                            {/* </ChoiceBox> */}


                        </>
                        :
                        <>
                            <ChoiceBox onClick={() => setData('컨설팅')}>
                                <div style={{ display: "flex", flexDirection: "row", width: "auto", height: "100%" }}>
                                    <Program>
                                        컨설팅
                                    </Program>
                                    <ProgramText>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#797979" }}>가벼운피드백</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#797979" }}>1회진행 , 온/오프형식</span>
                                    </ProgramText>
                                </div>
                                <div style={{ width: "16px", height: "auto", marginRight: "18px" }} />
                            </ChoiceBox>

                            <ChoiceBox>
                                <div style={{ display: "flex", flexDirection: "row", width: "auto", height: "100%" }}>
                                    <ProgramChoice>
                                        클래스
                                    </ProgramChoice>
                                    <ProgramText>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#797979" }}>주제에 대한 집중 과외 및 강의</span>
                                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#797979" }}>2회이상 진행, 온/오프,라인형식</span>
                                    </ProgramText>
                                </div>
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            </ChoiceBox>

                            <ExplainBox>
                                <ExplainInner>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        멘토님이 자신있는 수능, 고등학교 내신 과목을 파트 별로 나눠 클래스 프로그램으로 개설합니다.
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" , marginTop:"20px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                        과목 파트를 세세하게 나눌 수록, 재밌는 강의명을 적을 수록 매칭률이 올라갑니다.
                                        </span>
                                    </div>
                                </ExplainInner>
                            </ExplainBox>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/%ED%81%B4%EB%9E%98%EC%8A%A4+%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png"
                                    style={{ width: "200px", height: "auto" }} />


                        </>
                    }
                </MentorText>


                {/* 로그인버튼 */}
                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => data === "컨설팅" ? navigate('/PostProgram/class') : navigate('/PostProgram/tutor')} >
                        <span>다음</span>
                    </div>
                </div>


            </div>




        </>
    );
}

export default PostProgram;

/* 전체박스 */
const MentorText = styled.div`
width:90%;
height:580px;
margin-top:32px;
display:flex;
justify-content: space-between;
align-items: center;
flex-direction:column;
margin-bottom:50px;
@media screen and (max-width: 540px) {
    height:107vw;
}
`;

/* 선택부분 박스 */
const ChoiceBox = styled.div`
width:100%;
height:60.48px;
display:flex;
flex-direction:row;
justify-content: space-between;
align-items: center;
@media screen and (max-width: 540px) {
    height:11.2vw;
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


/* 프로그램 이름 */
const ProgramChoice = styled.div`
width:89.28px;
height:100%;
display:flex;
justify-content: center;
align-items: center;
flex-direction:row;
background: #FFFFFF;
border: 1px solid #00C563;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    width:16.5vw;
}
`;

/* 프로그램 이름 선택 X */
const Program = styled.div`
width:89.28px;
height:100%;
display:flex;
justify-content: center;
align-items: center;
flex-direction:row;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    width:16.5vw;
}
`;

/* 프로그램 간단설명 */
const ProgramText = styled.div`
width:180px;
height:100%;
display:flex;
justify-content: space-around;
align-items: flex-start;
flex-direction:column;
margin-left:20.16px;
@media screen and (max-width: 540px) {
    width:45.3vw;
    margin-left:3.7vw;
}
`;