import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate , useLocation} from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function FavoriteChange() {

    const navigate = useNavigate();
    const location = useLocation();
    const { Project , subject , exam , HighFirst , UniversityFirst} = FavoriteStore();
    const [information, setInformation] = useState([]); // 선택된값 - DB에서 불러올값
    const [higharray, setHighArray] = useState([]); // 고등학교 선택된값
    const [highchoice, setHighChoice] = useState(true); // 고등학교 선택된값
    const [universityarray, setUniversityArray] = useState([]); // 대학교 선택된값
    const [universitychoice, setUniversitychoice] = useState(true); // 대학교 선택된값
    const [projectarray, setProjectArray] = useState([]); // 전형명 선택된값
    const [projectchoice, setProjectchoice] = useState(true); // 전형명 선택된값
    const [SubjectsTrue, setSubjectsTrue] = useState(true); // 선택된값 - 과목명
    const [Subjectsarray, setSubjectsarray] = useState([]); // 선택된값 - 과목명
    const [examTrue, setexamTrue] = useState(true); // 선택된값 - 입시유형
    const [Examarray, setExamarray] = useState([]); // 선택된값 - 입시유형


    useEffect(() => {
        fetch(`/api/favorite/info/${String(localStorage.getItem('id'))}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setInformation(data[0]);
            });
    }, [information]);

    useEffect(() => {
        if (location.pathname.includes('end')) {
            setHighChoice(false)
            setUniversitychoice(false)
            setHighArray(HighFirst)
            setUniversityArray(UniversityFirst)
        }
    }, []);


    // 초기화
    function Reset() {
        // setChoice([]);
        // setChoiceSubjects([]);
        // setChoiceProjects([]);
    }

    // 변경하기
    function Save() {
        
            fetch(`/api/favorite/change/${String(localStorage.getItem('id'))}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
                    firstpost:higharray.join("-"),
                    secondpost : universityarray.join("-"),
                    thirdpost:projectarray.join("-"),
                    fourpost : Subjectsarray.join("-"),
                    fivepost: Examarray.join("-"),
				}),
			})
				.then(res => res.json())
				.then(data => {
                    console.log(data)
					if (data.result === 'success') {
                        navigate('/')
						alert('변경되었습니다.')
					}
				})        
           
            
        
    }

    // 고등학교 삭제
    function Delete(info) {
        if (highchoice) {
            var array = information.First.split('-').filter((element) => element !== info);
            setHighArray(array);
            setHighChoice(false)
        }
        else {
            var array = higharray.filter((element) => element !== info);
            setHighArray(array);
        }
    }

    // 대학교
    function UniversityDelete(info) {
        if (universitychoice) {
            var array = information.Second.split('-').filter((element) => element !== info);
            setUniversityArray(array);
            setUniversitychoice(false)
        }
        else {
            var array = universityarray.filter((element) => element !== info);
            setUniversityArray(array);
        }

    }

    // 전형명 해제
    function ProjectChioce(info){
        if(projectchoice){
            var array = information.Third.split('-').filter((element) => element !== info);
            setProjectArray(array);
            setProjectchoice(false)    
        }
        else{
            var array = projectarray.filter((element) => element !== info);
            setProjectArray(array);
        }
    }

    // 전형명 선택
    function ProjectPick(info){
        setProjectchoice(false)    
        projectarray.push(info)
    
    }

    // 전형명 해제
    function Subjectpush(info){
        if(SubjectsTrue){
            var array = information.Four.split('-').filter((element) => element !== info);
            setSubjectsarray(array);
            setSubjectsTrue(false)    
        }
        else{
            var array = Subjectsarray.filter((element) => element !== info);
            setSubjectsarray(array);
        }
    }

    // 전형멸 선택
    function SubjectDelete(info){
        setSubjectsTrue(false)    
        Subjectsarray.push(info)
    }

    function ProjectsChoiceDelete(info){
        if(examTrue){
            var array = information.Five.split('-').filter((element) => element !== info);
            setExamarray(array);
            setexamTrue(false)    
        }
        else{
            var array = Examarray.filter((element) => element !== info);
            setExamarray(array);
        }
    }

    function Projectspush(info){
        setexamTrue(false)    
        Examarray.push(info)
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
                        onClick={() => navigate('/')} />
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

                {/* 고등학교 */}
                <HighTotal>
                    {/* 고등학교 */}
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "16px" }}>고등학교</span>
                    {highchoice ?
                        <>
                            {information.First?.split('-').map((data, index) => (
                                <High key={index}>
                                    <HighBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }}>시/도</span>
                                        <span style={{ marginLeft: "16px" }}>{data?.split(',')[0]}</span>
                                    </HighBox>
                                    <HighBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }} >고등학교 유형</span>
                                        <span style={{ marginLeft: "16px" }} >{data?.split(',')[1]}</span>
                                    </HighBox>
                                    <HighText onClick={() => Delete(data?.split(',')[0] + "," + data?.split(',')[1])}>삭제</HighText>
                                </High>
                            ))}
                        </>
                        :
                        <>
                            {higharray?.map((data, index) => (
                                <High key={index}>
                                    <HighBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }}>시/도</span>
                                        <span style={{ marginLeft: "16px" }}>{data?.split(',')[0]}</span>
                                    </HighBox>
                                    <HighBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }} >고등학교 유형</span>
                                        <span style={{ marginLeft: "16px" }} >{data?.split(',')[1]}</span>
                                    </HighBox>
                                    <HighText onClick={() => Delete(data?.split(',')[0] + "," + data?.split(',')[1])}>삭제</HighText>
                                </High>
                            ))}
                        </>
                    }

                    {higharray?.length === 3 ?
                        ""
                        :
                        information.First?.split('-').length === 3 && highchoice === true ?
                            ""
                            :
                            <MainSecond onClick={() => navigate('/Favorite/Change/ChoiceHigh')} >
                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                    style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                                추가하기
                            </MainSecond>
                    }
                </HighTotal>

                {/* 대학교 */}
                <UniverTotal>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "16px" }}>대학교</span>
                    {universitychoice ?
                        <>
                            {information.Second?.split('-').map((data, index) => (
                                <High key={index}>
                                    <UniversityBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }}>{data?.split(',')[1]}</span>
                                        <span style={{ marginLeft: "16px" }}>{data?.split(',')[0]}</span>
                                    </UniversityBox>
                                    <HighText onClick={() => UniversityDelete(data?.split(',')[0] + "," + data?.split(',')[1])}>삭제</HighText>
                                </High>
                            ))}
                        </>
                        :
                        <>
                            {universityarray?.map((data, index) => (
                                <High key={index}>
                                    <UniversityBox>
                                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#797979", marginLeft: "16px", marginBottom: "4px" }}>{data?.split(',')[1]}</span>
                                        <span style={{ marginLeft: "16px" }}>{data?.split(',')[0]}</span>
                                    </UniversityBox>
                                    <HighText onClick={() => UniversityDelete(data?.split(',')[0] + "," + data?.split(',')[1])}>삭제</HighText>
                                </High>
                            ))}
                        </>
                    }

                    {universityarray?.length === 3 ?
                        ""
                        :
                        information.Second?.split('-').length === 3 && universitychoice === true ?
                            ""
                            :
                            <MainSecond onClick={() => navigate('/Favorite/Change/ChoiceUniversity')} >
                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/plus.png"
                                    style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                                추가하기
                            </MainSecond>
                    }
                </UniverTotal>

                <FirstSpace />


                {/* 전형명 */}
                <MainCity>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>전형명</span>

                  {projectchoice ?
                  <>
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {Project.slice(0, 5).map((product, index) => (
                            <div key={index}>
                                {information.Third?.split('-').filter((e) => e === product).length === 1 ?
                                <MainCityChocie  onClick={() => ProjectChioce(product)}>
                                    {product}
                                </MainCityChocie>
                                :
                                <MainCityIndividual onClick={() => ProjectPick(product)}>
                                    {product}
                                </MainCityIndividual>
                            }
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {Project.slice(5, 8).map((product, index) => (
                            <div key={index}>
                                {information.Third?.split('-').filter((e) => e === product).length === 1 ?
                                <MainCityChocie  onClick={() => ProjectChioce(product)}>
                                    {product}
                                </MainCityChocie>
                                :
                                <MainCityIndividual onClick={() => ProjectPick(product)}>
                                    {product}
                                </MainCityIndividual>
                            }
                            </div>
                        ))}
                    </div>
                  </>
                  :
                  <>
                  <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                      {Project.slice(0, 5).map((product, index) => (
                          <div key={index}>
                              {projectarray.filter((e) => e === product).length === 1 ?
                              <MainCityChocie  onClick={() => ProjectChioce(product)}>
                                  {product}
                              </MainCityChocie>
                              :
                              <MainCityIndividual onClick={() => ProjectPick(product)}>
                                  {product}
                              </MainCityIndividual>
                          }
                          </div>
                      ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                      {Project.slice(5, 8).map((product, index) => (
                          <div key={index}>
                              {projectarray.filter((e) => e === product).length === 1 ?
                              <MainCityChocie  onClick={() => ProjectChioce(product)}>
                                  {product}
                              </MainCityChocie>
                              :
                              <MainCityIndividual onClick={() => ProjectPick(product)}>
                                  {product}
                              </MainCityIndividual>
                          }
                          </div>
                      ))}
                  </div>

                </>


                  }

                </MainCity>


                {/* 과목 */}
                <MainCitymargin>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>전형명</span>

                    {/* 전체 ~ 생명  */}
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(0, 5).map((product, index) => (
                            <div key={index}>
                                {SubjectsTrue ?
                                    <>
                                        {information.Four?.split('-').filter((e) => e === product).length === 1 ?
                                            <MainCityChocie onClick={() => Subjectpush(product)}>
                                                {product}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                                {product}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {Subjectsarray.filter((e) => e === product).length === 1 ?
                                            <MainCityChocie onClick={() => Subjectpush(product)}>
                                                {product}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                                {product}
                                            </MainCityIndividual>
                                        }
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                {/* 물리 ~ 한국지리  */}
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(5, 10).map((product, index) => (
                             <div key={index}>
                             {SubjectsTrue ?
                                 <>
                                     {information.Four?.split('-').filter((e) => e === product).length === 1 ?
                                         <MainCityChocie onClick={() => Subjectpush(product)}>
                                             {product}
                                         </MainCityChocie>
                                         :
                                         <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                             {product}
                                         </MainCityIndividual>
                                     }
                                 </>
                                 :
                                 <>
                                     {Subjectsarray.filter((e) => e === product).length === 1 ?
                                         <MainCityChocie onClick={() => Subjectpush(product)}>
                                             {product}
                                         </MainCityChocie>
                                         :
                                         <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                             {product}
                                         </MainCityIndividual>
                                     }
                                 </>
                             }
                         </div>
                        ))}
                    </div>

                {/* 세계지리 ~ 동아시아사 */}
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(10, 14).map((product, index) => (
                           <div key={index}>
                           {SubjectsTrue ?
                               <>
                                   {information.Four?.split('-').filter((e) => e === product).length === 1 ?
                                       <MainCityChocie onClick={() => Subjectpush(product)}>
                                           {product}
                                       </MainCityChocie>
                                       :
                                       <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                           {product}
                                       </MainCityIndividual>
                                   }
                               </>
                               :
                               <>
                                   {Subjectsarray.filter((e) => e === product).length === 1 ?
                                       <MainCityChocie onClick={() => Subjectpush(product)}>
                                           {product}
                                       </MainCityChocie>
                                       :
                                       <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                           {product}
                                       </MainCityIndividual>
                                   }
                               </>
                           }
                       </div>
                        ))}
                    </div>

                {/* 사회문화 ,  수리논술 */}
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(15, 19).map((product, index) => (
                            <div key={index}>
                            {SubjectsTrue ?
                                <>
                                    {information.Four?.split('-').filter((e) => e === product).length === 1 ?
                                        <MainCityChocie onClick={() => Subjectpush(product)}>
                                            {product}
                                        </MainCityChocie>
                                        :
                                        <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                            {product}
                                        </MainCityIndividual>
                                    }
                                </>
                                :
                                <>
                                    {Subjectsarray.filter((e) => e === product).length === 1 ?
                                        <MainCityChocie onClick={() => Subjectpush(product)}>
                                            {product}
                                        </MainCityChocie>
                                        :
                                        <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                            {product}
                                        </MainCityIndividual>
                                    }
                                </>
                            }
                        </div>
                        ))}
                    </div>

                {/* 경시대회 기타 */}
                <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {subject.slice(19, 21).map((product, index) => (
                            <div key={index}>
                                <div key={index}>
                             {SubjectsTrue ?
                                 <>
                                     {information.Four?.split('-').filter((e) => e === product).length === 1 ?
                                         <MainCityChocie onClick={() => Subjectpush(product)}>
                                             {product}
                                         </MainCityChocie>
                                         :
                                         <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                             {product}
                                         </MainCityIndividual>
                                     }
                                 </>
                                 :
                                 <>
                                     {Subjectsarray.filter((e) => e === product).length === 1 ?
                                         <MainCityChocie onClick={() => Subjectpush(product)}>
                                             {product}
                                         </MainCityChocie>
                                         :
                                         <MainCityIndividual onClick={() => SubjectDelete(product)}>
                                             {product}
                                         </MainCityIndividual>
                                     }
                                 </>
                             }
                         </div>
                            </div>
                        ))}
                    </div>
                </MainCitymargin> 

                {/* 입시 */}
                <MainCitymargin>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>고교입시</span>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "6px" }}>
                        {exam.map((product, index) => (
                            <div key={index}>
                                {examTrue ?
                                    <>
                                        {information.Five?.split('-').filter((e) => e === product).length === 1  ?
                                            <MainCityChocie onClick={() => ProjectsChoiceDelete(product)}>
                                                {product}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Projectspush(product)}>
                                                {product}
                                            </MainCityIndividual>
                                        }
                                    </>
                                    :
                                    <>
                                        {Examarray.filter((e) => e === product).length === 1 ?
                                            <MainCityChocie onClick={() => ProjectsChoiceDelete(product)}>
                                                {product}
                                            </MainCityChocie>
                                            :
                                            <MainCityIndividual onClick={() => Projectspush(product)}>
                                                {product}
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

export default FavoriteChange;

/* 인트로 전체박스 */
const MainBox = styled.div`
width: 90%;
height: auto;
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

/* 고등 학교 전체박스 */
const HighTotal = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top: -14px;
@media screen and (max-width: 540px) {
    }
`;

/* 대학교 전체박스 */
const UniverTotal = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top: 40px;
@media screen and (max-width: 540px) {
    }
`;

/*  고등학교 전체 박스  */
const High = styled.div`
width: 100%;
height: 80.64px;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
margin-bottom:10px;
@media screen and (max-width: 540px) {
    height:14.9vw;
}
`;


/*  고등학교 전체 박스  */
const HighBox = styled.div`
width: 35%;
height: 80.64px;
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
color: #797979;
@media screen and (max-width: 540px) {
    height:14.9vw;
}
`;

/*  대학교 전체 박스  */
const UniversityBox = styled.div`
width: 70%;
height: 80.64px;
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: column;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
color: #797979;
@media screen and (max-width: 540px) {
    height:14.9vw;
}
`;

/*  고등학교 삭제 문구  */
const HighText = styled.div`
width: 79.2px;
height: 54px;
display:flex;
align-items: center;
justify-content: center;
font-weight: 600;
font-size: 14px;
color: #797979;
background: #F1F2F3;
border-radius: 8px;
@media screen and (max-width: 540px) {
    width: 14.6vw;
    height:10vw;
}
`;

/* 상단 활동내역 하단부분   */
const FirstSpace = styled.div`
width: 100%;
height: 10px;
background:#F1F2F3;
margin-top:24px;
@media screen and (max-width: 540px) {
  height: 2.6vw;  
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
margin-top:40px;
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

/* 대학교 전체박스 */
const MainThird = styled.div`
width:90%;
height:auto;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
margin-top:40px;
margin-bottom: 323px;
@media screen and (max-width: 540px) {
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