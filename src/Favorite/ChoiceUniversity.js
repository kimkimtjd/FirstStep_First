import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate , useLocation} from "react-router-dom";
import styled from "styled-components";
import FavoriteStore from "../Zusatand/Favorite";

function ChoiceUniversity() {

    const navigate = useNavigate();
    const location = useLocation();
    const { Universe_list, Universe_Choice, UniversityFirst , classUniverseFunction } = FavoriteStore();
    const [second, setSecond] = useState("전체"); // 선택된값 - 유형
    const [search, setSearch] = useState(""); // 검색

    // 저장
    function Save(){
        if(location.pathname.includes('class')){
            classUniverseFunction(search + "," + second)
            navigate('/PostProgram/class')
        }
        else if(location.pathname.includes('tutor')){
            classUniverseFunction(search + "," + second)
            navigate('/PostProgram/tutor')
        }
        else if(location.pathname.includes('Change')){
            UniversityFirst.push(search + "," + second);
            navigate('/Favorite/Change/end')
        }

        else{
            navigate('/Favorite')
            UniversityFirst.push(search + "," + second);
        }
    }

    // 저장    
    function Reset(){
        setSecond('전체')
        setSearch('')
    }

    return (
        <>
            <div className={stylesSecond.User}>

                {/* Header */}
                <div className={stylesSecond.Header} >
                    <div className={stylesSecond.Back_Arrow}
                    />
                    <span className={stylesSecond.HeaderText}>대학교 찾기</span>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" className={stylesSecond.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/Favorite')} />
                </div>

                {/* Intro */}
                <TitleBox>
                    <MainBox>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <span style={{ fontWeight: "900" }}>어떤 대학교 선배</span>
                            <span>를 찾으시나요</span>
                        </div>
                    </MainBox>
                    <div className={stylesSecond.IntroSub}>
                        학군에 맞는 멘토를 추천해드려요.
                    </div>
                </TitleBox>


                {/* 유형 */}
                <Sub>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151", marginBottom: "12px" }}>구분</span>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
                        {Universe_list.map((data, index) => (
                            <div key={index}>
                                {second == data ?
                                    <MainCityChocie>
                                        {data}
                                    </MainCityChocie>
                                    :
                                    <MainCityIndividual onClick={() => setSecond(data)}>
                                        {data}
                                    </MainCityIndividual>
                                }
                            </div>
                        ))}
                    </div>
                </Sub>

                <SearchInput>
                    <SearchInner
                        name="대학교"
                        placeholder="대학교를 입력해주세요."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Search.png" style={{ width: "auto", height: "40%", marginLeft: "6px" }}
                        alt="img" />
                </SearchInput>

                <div style={{ display:"flex" , flexDirection:"column" , marginBottom: 270 , width:"90%"}}>
                    {Universe_Choice.filter((e) => e.includes(search)).map((data, index) => (
                    <div style={{ display:"flex" , flexDirection:"column"}}>
                        {search === "" ?
                                ""
                                :
                                <>
                                    {data.includes(search) ?
                                    <SearchResult onClick = { () => setSearch(data)}>
                                        <ResultInner>
                                            <div>
                                                {data.substr(0,data.indexOf(search))}                                    
                                            </div>
                                            <div style={{ color:"#00C563" , fontWeight:"bold"}}>
                                                {data.substr(data.indexOf(search),search.length)}                                    
                                            </div>
                                            <div>
                                            {data.substr(data.substr(data.indexOf(search),search.length).length + data.substr(0,data.indexOf(search)).length , 
                                            data.length - data.substr(0,data.indexOf(search)).length - data.substr(data.indexOf(search),search.length).length)}                                    
                                            </div>
                                        </ResultInner>
                                    </SearchResult>
                                    :
                                    {data}
                                    }
                                </>
                            }
                        </div>
                    ))}
                </div>

                {/* 초기화  */}
                <div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start"  }}>
                    <MainCityReset  onClick={() => Reset()}>
                        초기화
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Favorite/reset.png" style={{ width: "12px", height: "12px", marginLeft: "6px" }} alt="img" />
                    </MainCityReset>
                </div>

                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => Save()}> 
                        <span>저장</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChoiceUniversity;

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


// 타이을
const TitleBox = styled.div`
    width: 90%;
    height: 83px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 400px) {
        height: 22.1vw;
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
margin-top: 32px;
@media screen and (max-width: 540px) {
    height: 16.2vw;
    margin-top:8vw;
}
@media screen and (max-width: 370px) {
    margin-top:35vw;
}
`;


/* 검색부분  */
const SearchInput = styled.div`
width: 90%;
height: 80.64px;
display: flex;
align-items: center;
justify-content: center;
flex-direction:row;
background: #FFFFFF;
border: 1px solid #00C563;
border-radius: 8px;
margin-top:40px;
@media screen and (max-width: 540px) {
    height: 14.9vw;
}
`;

const SearchInner = styled.input`
width: 85%;
height: 70%;
display: flex;
align-items: flex-start;
justify-content: flex-start;
background: #FFFFFF;
border:none;
@media screen and (max-width: 540px) {
    height: 11.9vw;
}
`;

// 검색후
const SearchResult = styled.div`
width: 488.3px;
height: 82px;
display: flex;
align-items: center;
justify-content: center;
border:1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
    height: 11.9vw;
    width: 100%;

}
`;


// 검색후 내부
const ResultInner = styled.div`
width: 90%;
height: 70%;
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction:row;
@media screen and (max-width: 540px) {
    height: 11.9vw;
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