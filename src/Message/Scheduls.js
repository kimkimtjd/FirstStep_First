import { useEffect, useState } from "react";
import styled from "styled-components";
import MessageBox from "../Mentoring/MessageBox";
import { useNavigate, useLocation   } from "react-router-dom";
import Calendar from 'react-calendar';
import './Schedule.css';
import moment from "moment";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function Schedule() {

    const navigate = useNavigate();
    const location = useLocation();
    // let history = useHistory();

    const [post, setPost] = useState("");
    const [stagetrue, setStagetrue] = useState(true);
    const [datatrue, setDatatrue] = useState(true);
    const [timeselect, setTimeselect] = useState(true);
    const [hour, setHour] = useState(20);
    const [minute, setMinute] = useState(0);
    const [pm, setPm] = useState("PM");
    const [timetrue, settimetrue] = useState(true);
    const [value, setValue] = useState(new Date());
    const [alarm, setAlarm] = useState([]);
    // console.log(location.pathname.split('/')[2])
    // 로그인 유지 검증


    // // 날짜 입력시
    function ChangeDate() {
        setStagetrue(true)
        setDatatrue(false)
    }

    // 시간 입력시
    function TimeChoice() {
        setTimeselect(true)
        settimetrue(false)
    }

    useEffect(() => {
        fetch(`/api/mentor/find/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAlarm(data[0])
                // console.log(alarm.mentor_id?.split(',')[0])
            });
    }, [alarm]);


    function Choice(){

            fetch("/api/Chat/schedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: location.pathname.split('/')[3],
                        mento:  location.pathname.split('/')[2],
                        schedule: moment(value).format("YYYY년 MM월 DD일") + "-" + hour + ":" + minute + ":" + pm ,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.result === 'success'){
                            navigate(-1);
                            MainFirst();
                        }
                    })
                

        }

        // console.log(location.pathname.split('/')[3])

    function MainFirst(){
        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: alarm.mentor_id?.split(",")[0],
                receiver: location.pathname.split('/')[3],
                timeset: "",
                message: "님과" + moment(value).format("YYYY년 MM월 DD일") + hour + ":" + minute + ":" + pm + "에 컨설팅" + "-" + "일정을"  + "잡았어요. 약속은 꼭지켜주세요" + "-" + "약속시간 30분전에 알림이 울릴거에요.",
            }),
        })
            .then(res => res.json())
            .then(data => {
                SecondFirst()
            })

    }

    function SecondFirst(){
        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: alarm.mentor_id?.split(",")[0],
                receiver: location.pathname.split('/')[3],
                timeset: "",
                message: "일정에 임하는 것이 불가능하다면 최소 24시간 전에는관리자와 멘티에게 알려주세요!" + "-" + "멘티의 단순 변심으로 인한 환불은 불가합니다",
            }),
        })
            .then(res => res.json())
            .then(data => {
                // SecondFirst()
            })

    }

        // 

        // console.log(moment(value).format("YYYY년 MM월 DD일") , hour + ":" + minute + ":" + pm )
    

    return (
        <MainBox>

            <Top>
                <TopInner>
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                        onClick={() => navigate('/Message')} />
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>약속잡기</span>
                    <div style={{ width: "24px", height: "24px" }}></div>
                </TopInner>
            </Top>


            {/* 일정 */}
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "flex-start", width: "90%", height: "auto", flexDirection: "column",
                marginTop: "20px"
            }}>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>일정선택</span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginTop: "4px" }}>날짜는 한국시간 기준입니다.</span>


                {stagetrue ?
                    <Input onClick={() => setStagetrue(false)}>
                        {datatrue ?
                            <span style={{ fontSize: "16px", fontWeight: "600", color: "#8E8E93", marginLeft: "16px" }}>날짜선택</span>
                            :
                            <span style={{ fontSize: "16px", fontWeight: "600", color: "#8E8E93", marginLeft: "16px" }}>{moment(value).format("YYYY년 MM월 DD일")}</span>}
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/schedule_logo.png"
                            style={{ width: "16px", height: "auto", marginRight: "16px" }} />
                    </Input>
                    :
                    <div style={{
                        marginTop: "24px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "auto"
                    }}>
                        <div style={{
                            border: "1px solid #00C563", borderRadius: "8px", display: "flex", justifyContent: "center",
                            alignItems: "center", flexDirection: "column", width: "90%", height: "auto"
                        }} >
                            <div className="text-gray-500 mt-4" style={{ fontSize: "16px", fontWeight: "600", color: "#797979", marginTop: "18.5px" }}>
                                {moment(value).format("YYYY년 MM월 DD일")}
                            </div>
                            <Calendar onChange={setValue} />
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "50px", marginTop: "20px",
                            background: "#00C563", color: "white", fontSize: "16px", fontWeight: "600", borderRadius: "8px"
                        }} onClick={() => ChangeDate()}>날짜 선택</div>
                    </div>

                }
            </div>

            {stagetrue ?
                <>
                    {/* 시간 */}
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "flex-start", width: "90%", height: "auto", flexDirection: "column",
                        marginTop: "20px"
                    }}>

                        <span style={{ fontSize: "16px", fontWeight: "600" }}>시간선택</span>
                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginTop: "4px" }}>원하시는 시간을 선택해주세요.</span>
                        {timeselect ?
                            <Input onClick={() => setTimeselect(false)}>
                                {timetrue ?
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#8E8E93", marginLeft: "16px" }}>시간선택</span>
                                    :
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#8E8E93", marginLeft: "16px" }}>{hour} : {minute} : {pm}</span>
                                }

                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/schedule_logo.png"
                                    style={{ width: "16px", height: "auto", marginRight: "16px" }} />
                            </Input>
                            :
                            <>
                                <Timeselect>
                                    <div style={{ width: "90%", height: "auto", fontSize: "16px", fontWeight: "600", color: "#797979", marginTop: "18.5px" }}>
                                        {hour} : {minute} : {pm}
                                    </div>

                                    <div style={{
                                        width: "90%", height: "auto", fontSize: "18px", fontWeight: "400", color: "#797979", display: "flex",
                                        flexDirection: "row", marginTop: "45px", justifyContent: "space-between"
                                    }}>
                                        <div style={{ display: "flex", flexDirection: "row", }}>
                                            <div style={{
                                                display: "flex", flexDirection: "column", justifyContent: "space-around", width: "36px", height: "114px",
                                                alignItems: "center"
                                            }}>
                                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Top_arrow.png"
                                                    style={{ height: "12px", width: "auto" }} onClick={() => hour === 24 ? setHour(0) : setHour(hour + 1)} />
                                                {hour}
                                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bottom_arrow.png"
                                                    style={{ height: "12px", width: "auto" }} onClick={() => hour === 0 ? setHour(24) : setHour(hour - 1)} />
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "column", justifyContent: "space-around", width: "36px", height: "114px",
                                                alignItems: "center", marginLeft: "53px"
                                            }}>
                                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Top_arrow.png"
                                                    style={{ height: "12px", width: "auto" }} onClick={() => minute === 59 ? setMinute(0) : setMinute(minute + 1)} />
                                                {minute}
                                                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bottom_arrow.png"
                                                    style={{ height: "12px", width: "auto" }} onClick={() => minute === 0 ? setMinute(59) : setMinute(minute - 1)} />
                                            </div>
                                        </div>

                                        <div style={{
                                            display: "flex", flexDirection: "column", justifyContent: "space-around", width: "36px", height: "114px",
                                            alignItems: "center", marginLeft: "53px"
                                        }}>
                                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Top_arrow.png"
                                                style={{ height: "12px", width: "auto" }} onClick={() => pm === "PM" ? setPm("AM") : setPm("PM")} />
                                            {pm}
                                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Bottom_arrow.png"
                                                style={{ height: "12px", width: "auto" }} onClick={() => pm === "PM" ? setPm("AM") : setPm("PM")} />
                                        </div>
                                    </div>
                                </Timeselect>

                                <div style={{
                                    display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "auto"
                                }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "50px", marginTop: "20px",
                                        background: "#00C563", color: "white", fontSize: "16px", fontWeight: "600", borderRadius: "8px"
                                    }} onClick={() => TimeChoice()}>시간 선택</div>
                                </div>
                            </>
                        }
                    </div>

                    {value !== "" && hour !== "" && minute !== "" && pm !== "" ?
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "50px", marginTop: "350px",
                            background: "#00C563", color: "white", fontSize: "16px", fontWeight: "600", borderRadius: "8px"
                        }} onClick={()=> Choice()}>약속잡기</div>
                        :
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "50px", marginTop: "350px",
                            background: "#DCDCDC", color: "white", fontSize: "16px", fontWeight: "600", borderRadius: "8px"
                        }}>약속잡기</div>
                    }
                </>
                : <></>
            }


        </MainBox >
    );
}

export default Schedule;

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

/* 상단부분 내부 */
const Input = styled.div`
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
width: 100%;
height: 56px;
background: #FFFFFF;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-top:24px;
@media screen and (max-width: 540px) {
    
	}
`;

/* 상단부분 내부 */
const Timeselect = styled.div`
display: flex;
flex-direction:column;
justify-content:center;
align-items: center;
width: 100%;
height: 212px;
background: #FFFFFF;
border: 1px solid #00C563;
border-radius: 8px;
margin-top:24px;
@media screen and (max-width: 540px) {
    
	}
`;



