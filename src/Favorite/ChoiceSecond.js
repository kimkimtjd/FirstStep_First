import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function ChoiceSecond() {

    const navigate = useNavigate();
    const { Project, subject, exam, ProjectChoice_function, subjectChoice_function, examChoice_function ,
        HighFirst , UniversityFirst , ProjectChoice , subjectChoice , examChoice} = FavoriteStore();
    const [choice, setChoice] = useState([]); // 선택된값 - 전형명
    const [choiceTrue, setChoiceTrue] = useState(true); // 선택된값 - 전형명
    const [choiceSubjects, setChoiceSubjects] = useState([]); // 선택된값 - 과목명
    const [SubjectsTrue, setSubjectsTrue] = useState(true); // 선택된값 - 과목명
    const [choiceProjects, setChoiceProjects] = useState([]); // 선택된값 - 입시
    const [ProjectsTrue, setProjectsTrue] = useState(true); // 선택된값 - 입시

    // 전형 선택한경우
    function Choicepush(data) {
        choice.push(data);
        setChoiceTrue(!choiceTrue);
        ProjectChoice_function(choice);
    }

    // 전형 선택해제
    function ChoiceDelete(data) {
        setChoiceTrue(!choiceTrue);
        var array = choice.filter((element) => element !== data);
        setChoice(array)
        ProjectChoice_function(choice);
    }

    // 과목명 선택한경우
    function Subjectpush(data) {
        choiceSubjects.push(data);
        setSubjectsTrue(!SubjectsTrue);
        subjectChoice_function(choiceSubjects);
    }

    // 과목명 선택해제
    function SubjectDelete(data) {
        setSubjectsTrue(!SubjectsTrue);
        var array = choiceSubjects.filter((element) => element !== data);
        setChoiceSubjects(array)
        subjectChoice_function(choiceSubjects);
    }

    // 고교입시 선택한경우
    function Projectspush(data) {
        choiceProjects.push(data);
        setProjectsTrue(!ProjectsTrue);
        examChoice_function(choiceProjects);
    }

    // 고교입시 해제
    function ProjectsChoiceDelete(data) {
        setProjectsTrue(!ProjectsTrue);
        var array = choiceProjects.filter((element) => element !== data);
        setChoiceProjects(array)
        examChoice_function(choiceProjects);
    }

    // 초기화
    function Reset() {
        setChoice([]);
        setChoiceSubjects([]);
        setChoiceProjects([]);
    }

    function Save() {
        if (choice.length === 0 || choiceSubjects === 0 || choiceProjects.length === 0) {
            alert('옵션을 선택해주세요')
        }
        else {
            fetch("/api/favorite/save/Favorite", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					UserReq: localStorage.getItem('id'),
                    FirstReq:HighFirst.join("-"),
                    SecondReq : UniversityFirst.join("-"),
                    ThirdReq:ProjectChoice.join("-"),
                    FourReq : subjectChoice.join("-"),
                    FiveReq : examChoice.join("-"),
				}),
			})
				.then(res => res.json())
				.then(data => {
                    console.log(data)
					if (data.result === 'success') {
                        navigate('/')
						alert('저장되었습니다.')
					}
				})
        }
    }


    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >
                    <div className={stylesSecond.Back_Arrow}
                    />
                    <span className={stylesSecond.HeaderText}>관심태그 등록</span>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/Favorite')} />
                </div>

                {/* Intro */}
                <div className={stylesSecond.Intro}>
                    <MainBox>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <span style={{ fontWeight: "900" }}>어떤 내용이 고민</span>
                            <span>이가요?</span>
                        </div>
                    </MainBox>
                    <div className={stylesSecond.IntroSub}>
                        분야에 경험과 노하우가 있는 멘토를 찾아드릴게요!
                    </div>
                </div>

                {/* 전형명 */}
                <MainCity>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>전형명</span>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {Project.slice(0, 5).map((data, index) => (
                            <div key={index}>
                                {choiceTrue ?
                                    <>
                                        {choice.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Choicepush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choice.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Choicepush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {Project.slice(5, 8).map((data, index) => (
                            <div key={index}>
                                {choiceTrue ?
                                    <>
                                        {choice.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Choicepush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choice.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Choicepush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>))}
                    </div>


                </MainCity>


                {/* 과목 */}
                <MainCitymargin>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>전형명</span>

                    {/* 전체 ~ 생명  */}
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(0, 5).map((data, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 물리 ~ 한국지리  */}
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(5, 10).map((data, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 세계지리 ~ 동아시아사 */}
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(10, 14).map((data, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 사회문화 ,  수리논술 */}
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(15, 19).map((data, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 경시대회 기타 */}
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(19, 21).map((data, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceSubjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => SubjectDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Subjectpush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                </MainCitymargin>

                {/* 입시 */}
                <MainCitymargin>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>고교입시</span>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {exam.map((data, index) => (
                            <div key={index}>
                                {ProjectsTrue ?
                                    <>
                                        {choiceProjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ProjectsChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Projectspush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {choiceProjects.filter((e) => e === data).length === 1 ?
                                            <MainCityChocie onClick={() => ProjectsChoiceDelete(data)}>
                                                {data}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Projectspush(data)}>
                                                {data}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                </MainCitymargin>

                <div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", marginTop: "195px" }}>
                    <MainCityReset onClick={() => Reset()}>
                        초기화
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/reset.png" style={{ width: "12px", height: "12px", marginLeft: "6px" }} alt="img" />
                    </MainCityReset>
                </div>

                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => Save()}>
                        <span>멘토찾으러가기</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChoiceSecond;

/* 인트로 전체박스 */
const MainBox = styled.div`
width: 100%;
height: 29px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
font-weight: 400;
font-size: 24px;
margin-bottom: 8px;
@media screen and (max-width: 400px) {
    font-size: 21px;
}
`;


/*  전형명  */
const MainCity = styled.div`
width: 90%;
height: auto;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
@media screen and (max-width: 540px) {
    height:auto;
}
`;

/*  과목명 및 고교입시  */
const MainCitymargin = styled.div`
width: 90%;
height: auto;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
margin-top:40px;
@media screen and (max-width: 540px) {
    height:auto;
}
`;


/* 광역시 개인 */
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

/* 광역시 개인 */
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

/* 유형  */
const Sub = styled.div`
width: 90%;
height: 87.84px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
margin-top: 43.2px;
margin-bottom:192px;
@media screen and (max-width: 540px) {
    height: 16.2vw;
    margin-top:8vw;
}
@media screen and (max-width: 370px) {
    margin-top:35vw;
}
`;

/* 광역시 개인 */
const MainCityReset = styled.div`
padding:8px 12px;
border: 1px solid #DCDCDC;
border-radius: 100px;
font-weight: 400;
font-size: 12px;
color: #797979;
margin-bottom:16px;
@media screen and (max-width: 540px) {
    padding:2.1vw 3.2vw;
}
`;