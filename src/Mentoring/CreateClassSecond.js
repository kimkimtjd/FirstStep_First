import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate , useLocation} from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function CreateClassSecond() {

    const { TitleFunction ,  SubjectFunction , RecommendFunction , subjectChoice_function , subject , subjectChoice ,
        classHigh, classUniverse, nameuser, birthuser , classkind , Education , Advantage
    } = FavoriteStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [TitleTrue, setTitleTrue] = useState(true); // 제목Focus
    const [Title, setTitle] = useState(""); // 제목
    const [TitleDetailTrue, setTitleDetailTrue] = useState(1); // 제목 상세기록 Focus
    const [TitleDetail, setTitleDetail] = useState(""); // 제목 상세기록 Focus
    const [FirstSubject, setFirstSubject] = useState(""); // 1번째 주제
    const [SecondSubject, setSecondSubject] = useState(""); // 2번째 주제
    const [ThirdSubject, setThirdSubject] = useState(""); // 3번째 주제
    const [ThirdSubjectTrue, setThirdSubjectTrue] = useState(true); // 3번째 활성화
    const [FourSubject, setFourSubject] = useState(""); // 4번째 주제
    const [FourSubjectTrue, setFourSubjectTrue] = useState(true); // 4번째 활성화
    const [FiveSubject, setFiveSubject] = useState(""); // 5번째 주제
    const [FiveSubjectTrue, setFiveSubjectTrue] = useState(true); // 5번째 활성화
    const [FirstRecommend, setFirstRecommend] = useState(""); // 1번째 추천학생
    const [SecondRecommend, setSecondRecommend] = useState(""); // 2번째 추천학생
    const [ThirdRecommend, setThirdRecommend] = useState(""); // 3번째 추천학생
    const [FourRecommend, setFourRecommend] = useState(""); // 4번째 추천학생
    const [FourRecommendTrue, setFourRecommendTrue] = useState(true); // 4번째 활성화
    const [FiveRecommend, setFiveRecommend] = useState(""); // 5번째 추천학생
    const [FiveRecommendTrue, setFiveRecommendTrue] = useState(true); // 5번째 활성화
    const [SubjectsTrue, setSubjectsTrue] = useState(true); // 선택된값 - 과목명
    const [choiceSubjects, setChoiceSubjects] = useState([]); // 선택된값 - 과목명
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달


    // 프로그램 제목 Focus
    function TitleFocus() {
        setTitleTrue(false);
        setTitleDetailTrue(2);
    }

    // 프로그램 상세내용 Focus
    function TitleDetailFocus() {
        setTitleTrue(true);
        setTitleDetailTrue(3);
    }

    // 다음
    function Next(){
        TitleFunction(Title + "-"  + TitleDetail.replace(/(?:\r\n|\r|\n)/g, "<br/>"))
        SubjectFunction(FirstSubject + "-"  + SecondSubject + "-"  + ThirdSubject + "-"  + FourSubject + "-"  + FiveSubject)
        RecommendFunction(FirstRecommend + "-"  + SecondRecommend + "-"  + ThirdRecommend + "-"  + FourRecommend + "-"  + FiveRecommend)
        if(location.pathname.includes('tutor')){
            navigate('/PostProgram/tutor/Third')
        }
        else{
            navigate('/PostProgram/class/Third')
        }
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

 
    
    return (
        <>
                  
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >

                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => location.pathname.includes('tutor') ?  navigate('/PostProgram/tutor') : navigate('/PostProgram/class')} />

                    <span className={stylesSecond.HeaderText}>컨설팅 멘토 신청</span>

                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* 순서 이미지 */}
                <div style={{ width: "90%", display: "flex", justifyContent: "flex-start" }}>
                    <StageImg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/Second.png" alt="img" />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={stylesSecond.IntroText}>
                        <div style={{ fontWeight: "900" }}>컨설팅에대한</div>
                        <div style={{ display: "flex", flexDirection: "row", fontWeight: "400" }}>
                            <div style={{ fontWeight: "900" }}>정보</div>
                            <div>를 작성해주세요</div>
                        </div>
                    </div>
                    <div className={styles.IntroSub}>
                        구체적으로 작성할 수록 멘티 매칭 확률이 높아져요!
                    </div>
                </div>

                {/* 프로그램 이름 */}

                <MainThird>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "4px" }}>프로그램 명</span>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93" }}>컨설팅 프로그램명을 한 줄로 설명해주세요.</span>
                    <ChoiceHigh>
                        {TitleTrue ?
                            <Universe_Project>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onFocus={() => TitleFocus()}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={Title}
                                    placeholder="예) 내신 5등급에서 서울대 입학까지의 모든 것"
                                />
                            </Universe_Project>
                            :
                            <Universe_Project_Choice>
                                <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={Title}
                                    placeholder="예) 내신 5등급에서 서울대 입학까지의 모든 것"
                                />
                            </Universe_Project_Choice>
                        }
                    </ChoiceHigh>
                    {TitleDetailTrue === 1 ?
                        <MainSecond onClick={() => setTitleDetailTrue(2)}>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            멘티들에게 임팩트있게 프로그램 설명하기
                        </MainSecond>
                        : TitleDetailTrue === 2 ?
                            <AdvantageTextarea>
                                <DetaolTextarea
                                    style={{ resize: "none", }}
                                    placeholder="임팩트있게 프로그램에 대한 설명을 자유롭게 작성해주세요. 글자 수 제한은 받아야 합니다."
                                    value={TitleDetail}
                                    onChange={(e) => setTitleDetail(e.target.value)}
                                    onFocus={() => TitleDetailFocus()}
                                    name="TitleDetail"
                                    rows="5"
                                    cols="50"
                                    maxLength={2000}
                                />
                            </AdvantageTextarea>
                            :
                            <DetaolTextareaFpcus>
                                <DetaolTextarea
                                    style={{ resize: "none", }}
                                    placeholder="임팩트있게 프로그램에 대한 설명을 자유롭게 작성해주세요. 글자 수 제한은 받아야 합니다."
                                    value={TitleDetail}
                                    onChange={(e) => setTitleDetail(e.target.value)}
                                    name="TitleDetail"
                                    rows="5"
                                    cols="50"
                                />
                            </DetaolTextareaFpcus>

                    }
                </MainThird>

                {/* 과외에서 과목선택 [클래스는 노출 안됨] */}
                {location.pathname.includes('tutor') ?
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
                    :
                    <></>
                    
                }

                {/* 컨설팅 주제 */}
                {location.pathname.includes('tutor') ?
                <SubjectBox>
                <div>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>클래스주제</span>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: "#00C563" }}>(필수2개)</span>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginBottom: "16px", marginTop: "4px" }}>어떤 경험과 노하우를 멘티들에게 전달하고 싶으신가요?</span>
                <SubjectTotalBox>
                    <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                        onChange={(e) => setFirstSubject(e.target.value)}
                        value={FirstSubject}
                        placeholder="예) 성공적인 학생부 디자인"
                    />
                </SubjectTotalBox>
                <SubjectTotalBox>
                    <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                        onChange={(e) => setSecondSubject(e.target.value)}
                        value={SecondSubject}
                        placeholder="예) 꾸준한 공부를 위한 목표 설정/멘탈관리"
                    />
                </SubjectTotalBox>
                {ThirdSubjectTrue ? "" :                
                <SubjectTotalBox>
                    <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                        onChange={(e) => setThirdSubject(e.target.value)}
                        value={ThirdSubject}
                        placeholder="예) 진로를 고려한 선택법"
                    />
                </SubjectTotalBox>
                }
                {FourSubjectTrue ? "" :
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setFourSubject(e.target.value)}
                            value={FourSubject}
                            placeholder="예) xxxxxxxxxxxxxxxxx"
                        />
                    </SubjectTotalBox>
                }
                {FiveSubjectTrue ? "" :
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setFiveSubject(e.target.value)}
                            value={FiveSubject}
                            placeholder="예) xxxxxxxxxxxxxxxxx"
                        />
                    </SubjectTotalBox>
                }
                {FiveSubjectTrue === false ? "" :
                    <MainSecond onClick={() => ThirdSubjectTrue === true ? setThirdSubjectTrue(false) :  FourSubjectTrue === true ? setFourSubjectTrue(false):setFiveSubjectTrue(false)}>
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                            style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                        더 있어요!
                    </MainSecond>

                }
            </SubjectBox>                :
                <SubjectBox>
                    <div>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>컨설팅주제</span>
                        <span style={{ fontSize: "13px", fontWeight: "500", color: "#00C563" }}>(필수3개)</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginBottom: "16px", marginTop: "4px" }}>어떤 경험과 노하우를 멘티들에게 전달하고 싶으신가요?</span>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setFirstSubject(e.target.value)}
                            value={FirstSubject}
                            placeholder="예) 성공적인 학생부 디자인"
                        />
                    </SubjectTotalBox>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setSecondSubject(e.target.value)}
                            value={SecondSubject}
                            placeholder="예) 꾸준한 공부를 위한 목표 설정/멘탈관리"
                        />
                    </SubjectTotalBox>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setThirdSubject(e.target.value)}
                            value={ThirdSubject}
                            placeholder="예) 진로를 고려한 선택법"
                        />
                    </SubjectTotalBox>
                    {FourSubjectTrue ? "" :
                        <SubjectTotalBox>
                            <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                onChange={(e) => setFourSubject(e.target.value)}
                                value={FourSubject}
                                placeholder="예) xxxxxxxxxxxxxxxxx"
                            />
                        </SubjectTotalBox>
                    }
                    {FiveSubjectTrue ? "" :
                        <SubjectTotalBox>
                            <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                onChange={(e) => setFiveSubject(e.target.value)}
                                value={FiveSubject}
                                placeholder="예) xxxxxxxxxxxxxxxxx"
                            />
                        </SubjectTotalBox>
                    }
                    {FiveSubjectTrue === false ? "" :
                        <MainSecond onClick={() => FourSubjectTrue === true ? setFourSubjectTrue(false) : setFiveSubjectTrue(false)}>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            더 있어요!
                        </MainSecond>

                    }
                </SubjectBox>   
    }

                {/* 추천학생 */}
                <SubjectBox>
                    <div>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>누구에게 추천하고 싶으신가요?</span>
                        <span style={{ fontSize: "13px", fontWeight: "500", color: "#00C563" }}>(필수3개)</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginBottom: "16px", marginTop: "4px" }}>어떤 경험과 노하우를 멘티들에게 전달하고 싶으신가요?</span>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setFirstRecommend(e.target.value)}
                            value={FirstRecommend}
                            placeholder="예) 성공적인 학생부 디자인"
                        />
                    </SubjectTotalBox>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setSecondRecommend(e.target.value)}
                            value={SecondRecommend}
                            placeholder="예) 꾸준한 공부를 위한 목표 설정/멘탈관리"
                        />
                    </SubjectTotalBox>
                    <SubjectTotalBox>
                        <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                            onChange={(e) => setThirdRecommend(e.target.value)}
                            value={ThirdRecommend}
                            placeholder="예) 진로를 고려한 선택법"
                        />
                    </SubjectTotalBox>
                    {FourRecommendTrue ? "" :
                        <SubjectTotalBox>
                            <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                onChange={(e) => setFourRecommend(e.target.value)}
                                value={FourRecommend}
                                placeholder="예) xxxxxxxxxxxxxxxxx"
                            />
                        </SubjectTotalBox>
                    }
                    {FiveRecommendTrue ? "" :
                        <SubjectTotalBox>
                            <input style={{ width: "90%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "none" }}
                                onChange={(e) => setFiveRecommend(e.target.value)}
                                value={FiveRecommend}
                                placeholder="예) xxxxxxxxxxxxxxxxx"
                            />
                        </SubjectTotalBox>
                    }
                    {FiveRecommendTrue === false ? "" :
                        <MainSecond onClick={() => FourRecommendTrue === true ? setFourRecommendTrue(false) : setFiveRecommendTrue(false)}>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            더 있어요!
                        </MainSecond>
                    }
                </SubjectBox>

                {/* 로그인버튼 */}
                <div className={styles.LoginBtnSecond}>
                    
                    <div className={styles.Btn}  onClick={() => Next()}>
                        <span style={{ fontSize: 14, fontWeight: "700", color: "white" }}>다음</span>
                    </div>
                </div>


            </div>




        </>
    );
}

export default CreateClassSecond;


/* 순서 이미지 */
const StageImg = styled.img`
width:auto;
height:25px;
margin-top:24px;
margin-bottom:16px;
@media screen and (max-width: 540px) {
}
`;

/* 대학교 전체박스 */
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

/* 제목 내부 */
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

/* 제목 전체박스 */
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

/* 제목 전체박스 선택되었을떄 */
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

/* 프로그램 상세설명 */
const AdvantageTextarea = styled.div`
width:100%;
height:95.04px;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-top:8px;
font-weight: 400;
font-size: 14px;
color: #797979;
line-height: 17px;
@media screen and (max-width: 540px) {
    height:17.6vw;
}
`;

/* 프로그램 상세설명 Focus*/
const DetaolTextareaFpcus = styled.div`
width:100%;
height:95.04px;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #00C563;
border-radius: 8px;
margin-top:8px;
font-weight: 400;
font-size: 14px;
color: #797979;
line-height: 17px;
@media screen and (max-width: 540px) {
    height:17.6vw;
}
`;

/* 상세설명 입력부분 */
const DetaolTextarea = styled.textarea`
width:90%;
height:70%;
display: flex;
justify-content:center;
align-items: center;
border: none;
font-weight: 400;
font-size: 14px;
color: #797979;
line-height: 17px;
@media screen and (max-width: 540px) {
}
`;

/* 주제 입력부분 */
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

/* 주제입력부분 전체박스 */
const SubjectTotalBox = styled.div`
width:100%;
height:56px;
display: flex;
justify-content:center;
align-items: center;
flex-direction:column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-bottom:4px;
@media screen and (max-width: 540px) {
    height:14.9vw;
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