import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function Review() {

    const navigate = useNavigate();
    const location = useLocation();
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(true);
    const [third, setThird] = useState(true);
    const [four, setFour] = useState(true);
    const [five, setFive] = useState(true);
    const [info, setInfo] = useState([]);
    const [classinfo, setClassinfo] = useState([]);
    const [value, setvalue] = useState("");
    const [review, setReview] = useState("");

    useEffect(() => {
        if(first){
            setvalue(1)
        }
        else if(second){
            setvalue(2)
        }
        else if(third){
            setvalue(3)
        }
        else if(four){
            setvalue(4)
        }
        else if(five){
            setvalue(5)
        }
    }, [first , second , third , four , five]);

    useEffect(() => {
        fetch(`/api/mentor/detail/${location.pathname.split('/')[3]}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setInfo(data[0])
            });

    }, []);

    useEffect(() => {
        fetch(`/api/tutor/detail/${location.pathname.split('/')[3]}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setClassinfo(data[0])
            });

    }, []);

    // console.log(info.User + "," + info.ProgramName)


    function SecondActive() {
        setFirst(false)
        setSecond(false)
    }

    function SecondDelete() {
        setSecond(true)
        setThird(true)
        setFour(true)
        setFive(true)
    }

    function ThirdActive() {
        setFirst(false)
        setSecond(false)
        setThird(false)
    }

    function ThirdDelete() {
        setThird(true)
        setFour(true)
        setFive(true)
    }

    function FourActive() {
        setFirst(false)
        setSecond(false)
        setThird(false)
        setFour(false)
    }

    function FourDelete() {
        setFour(true)
        setFive(true)
    }

    function FiveActive() {
        setFirst(false)
        setSecond(false)
        setThird(false)
        setFour(false)
        setFive(false)
    }

    function FiveDelete() {
        setFive(true)
    }

    function Enter(){
        if( location.pathname.includes('Consulting')){
        fetch("/api/add/class/save/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mentor: info.User + "," + info.ProgramName,
                mentir: location.pathname.split('/')[4],
                review: review + "-" + value,

            }),
        })
            .then(res => res.json())
            .then(data => {

            })
            navigate('/')
        }
        else{
            fetch("/api/add/class/save/review/Class", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mentor: classinfo.User + "," + classinfo.ProgramName,
                    mentir: location.pathname.split('/')[4],
                    review: review + "-" + value,
    
                }),
            })
                .then(res => res.json())
                .then(data => {                    
                })
                navigate('/')

        }
        // console.log(info.User + "," + info.ProgramName , location.pathname.split('/')[4])
    }

    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Mypage')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>별점/후기 작성</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>

                {/* 리뷰 알림 */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "90%", height: "auto", flexDirection: "column" }}>
                    <span style={{ fontSize: "24px", fontWeight: "bold", color: "#222222" }}>멘토링은 만족스러우셨나요?</span>
                    <span style={{ fontSize: "16px", fontWeight: "400", color: "#B0B8C1", marginTop: "8px" }}>별점과 이용후기를 남겨주세요.</span>
                </div>

                {/* 별점 */}
                <div style={{
                    display: "flex", justifyContent: "flex-start", alignItems: "center", width: "90%", height: "auto", flexDirection: "row", marginTop: "24px",
                    paddingBottom: "36px"
                }}>
                    {first ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_non.png" style={{ width: "44px", height: "auto" }} onClick={() => setFirst(false)} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "44px", height: "auto" }} onClick={() => setFirst(true)} />
                    }
                    {second ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_non.png" style={{ width: "44px", height: "auto" }} onClick={() => SecondActive()} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "44px", height: "auto" }} onClick={() => SecondDelete()} />
                    }
                    {third ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_non.png" style={{ width: "44px", height: "auto" }} onClick={() => ThirdActive()} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "44px", height: "auto" }} onClick={() => ThirdDelete} />
                    }
                    {four ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_non.png" style={{ width: "44px", height: "auto" }} onClick={() => FourActive()} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "44px", height: "auto" }} onClick={() => FourDelete} />
                    }
                    {five ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_non.png" style={{ width: "44px", height: "auto" }} onClick={() => FiveActive()} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Review_active.png" style={{ width: "44px", height: "auto" }} onClick={() => FiveDelete} />
                    }
                </div>

                <FirstSpace />

                {/* 리뷰 알림 */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "90%", height: "auto", flexDirection: "column" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "#222222", marginTop: "24px" }}>소중한 이용 후기를 남겨주세요.</span>
                    <textarea
                        style={{
                            resize: "none", marginTop: "16px", padding: "16px 16px 32px 16px", border: "1px solid #DCDCDC",
                            width: "90%", borderRadius: "8px"
                        }}
                        placeholder="어떤 점이 마음에 드셨나요? 10자 이상 입력해주세요."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        name="TitleDetail"
                        rows="5"
                        cols="50"
                        maxLength={2000}
                    />
                </div>

                {first === false && review !== "" ?
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "50px", marginTop: "313px",
                        background: "#00C563", color: "white", borderRadius: "8px"
                    }} onClick={() => Enter()}>
                        후기 남기기
                    </div>
                    :
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "50px", marginTop: "313px",
                        background: "#DCDCDC", color: "white", borderRadius: "8px"
                    }}>
                        후기 남기기
                    </div>

                }

            </MainBox>
            <CommonNavigation />



        </>
    );
}

export default Review;

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

/* 상단 활동내역 하단부분   */
const FirstSpace = styled.div`
width: 100%;
height: 10px;
background:#F1F2F3;
@media screen and (max-width: 540px) {
  height: 2.6vw;  
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