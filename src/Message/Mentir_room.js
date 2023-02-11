import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function Mentir_room() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState([]);
    const [chat, setChat] = useState([]);
    const [chattrue, setChattrue] = useState(true);
    // console.log(data)

    useEffect(() => {
        fetch(`/api/mentor/detail/${location.pathname.split('/')[2]}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data[0])
                // console.log(data)
            });
    }, [data]);

    // 닉네임
    useEffect(() => {
        if (data.length !== 0) {
            fetch(`/api/user/Emailname/${data.User}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setNickname(data.user);
                });
        }
    }, [data]);

    // 채팅리스트
    useEffect(() => {
        if (data.length !== 0) {
            fetch(`/api/Chat/info/${data.User}/${String(localStorage.getItem('id'))} `, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setChat(data)
                    // console.log(data.length)
                    if(data.result === 'fail'){
                        FirstMessage()
                    }

                    else{
                        setChattrue(false)
                    }
                });
        }
    },);



    // console.log(chat)

    function FirstMessage(){
        var timess = new Date();

        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender:data.User,
                receiver:String(localStorage.getItem('id')),
                message:"안녕하세요-프로그램을 신청해주셔서 감사합니다.",
                timeset:timess,

            }),
        })
            .then(res => res.json())
            .then(data => {
                SecondMessage()
            })
    }

    function SecondMessage(){
        var timess = new Date();

        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender:data.User,
                receiver:String(localStorage.getItem('id')),
                message:"아래내용에 답해주세요-1.멘토에게 궁금한 내용을 작성해주세요-2.희망하시는 날짜와 시간을 작성해주세요-3.현재 내신 및 모의고사 성적을 작성해주세요",
                timeset:timess,

            }),
        })
            .then(res => res.json())
            .then(data => {
               console.log(data)
            })
    }


    // 로그인 유지 검증

    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Message')} />
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>{nickname}</span>
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>
                <div style={{ width: "100%", height: "90px", background: "white", display: "flex", flexDirection: "row" , justifyContent:"flex-start" , alignItems:"center" }}>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Approve_Profile.png" style={{ width: "65px", height: "65px" , marginRight:"10px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize:"14px" , fontWeight:"600" , color:"#515151"}}>{data.ProgramName?.split("-")[0]}</span>
                        <span style={{ fontSize:"10px" , fontWeight:"400" , color:"#AEAEB2" , marginTop:"2px"}} >{nickname}</span>
                        <div  style={{ display: "flex", flexDirection: "row" , marginTop:"2px"}}>
                            <span style={{ fontSize:"10px" , fontWeight:"400" , color:"#AEAEB2"}}>{data.University?.split(",")[0]}</span>
                            <span style={{ fontSize:"10px" , fontWeight:"400" , color:"#AEAEB2"}}>{data.Category}</span>
                        </div>
                    </div>
                </div>
                {chattrue ?
                    <></>
                    :
                    <div style={{ width:"100%" , height:"1100px" , background:"#F1F2F3" }}>
                    {chat?.map((fgkljf, index) => (
                        <div key={index} style={{ width:"100%" , height:"auto" , background:"#F1F2F3" }}>
                            {fgkljf.sender === String(localStorage.getItem('id')) ? 
                                <div style={{ width:"100%" , height:"auto" , display:"flex" , justifyContent:"flex-end" , marginTop:"62px" , marginRight:"20px"}}>
                                     {fgkljf.content.includes("안녕하세요") ?
                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                            {fgkljf.content.split('-')[0]}<br/>
                                            {fgkljf.content.split('-')[1]}
                                        </div>
                                        :
                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151", }}>
                                            {fgkljf.content}
                                        </div>
                                    }
                                    <div style={{  display:"flex" , justifyContent:"flex-end"  , alignItems:"flex-end" }}>
                                        <span  style={{  fontSize:"12px" , fontWeight:"400" , color:"#515151"}}>{fgkljf.Enterrime?.substr(11,5)}</span>
                                    </div>
                                </div>
                                :
                                <div style={{ width:"100%" , height:"auto" , display:"flex" , justifyContent:"flex-start" , marginTop:"62px" , marginLeft:"20px"}}>
                                    {fgkljf.content.includes("안녕하세요") ?
                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                            {fgkljf.content.split('-')[0]}<br/>
                                            {fgkljf.content.split('-')[1]}
                                        </div>
                                        :fgkljf.content.includes("답해주세요") ?
                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                            {fgkljf.content.split('-')[0]}<br/>
                                            {fgkljf.content.split('-')[1]}<br/>
                                            {fgkljf.content.split('-')[2]}<br/>
                                            {fgkljf.content.split('-')[3]}<br/>
                                        </div>
                                        :
                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                            {fgkljf.content}
                                        </div>
                                    }
                                    <div style={{  display:"flex" , justifyContent:"flex-end"  , alignItems:"flex-end" }}>
                                        <span style={{  fontSize:"12px" , fontWeight:"400" , color:"#515151"}}>{fgkljf.Enterrime?.substr(11,5)}</span>
                                    </div>
                                </div>
                           }
                        </div>
                    ))}
                    </div>
                }

            </MainBox>

            <CommonNavigation />

        </>
    );
}

export default Mentir_room;

/* 전체박스 */
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
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

