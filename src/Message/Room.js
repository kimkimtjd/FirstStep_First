import { useEffect, useState } from "react";
import styled from "styled-components";
import MessageBox from "../Mentoring/MessageBox";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function Room() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [nickemail, setNickemail] = useState("");
    const [nickname, setNickname] = useState([]);
    const [chat, setChat] = useState([]);
    const [post, setPost] = useState([]);
    const [chattrue, setChattrue] = useState(true);
    const [message, setMessage] = useState("");
    const [rgjkrs, setrgjkrs] = useState(true);
    // console.log(data)

    useEffect(() => {
        if (location.pathname.includes('Class')) {
            fetch(`/api/tutor/detail/${location.pathname.split('/')[4]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                });
        }
        else {
            fetch(`/api/mentor/detail/${location.pathname.split('/')[3]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                });
        }


    }, []);
    // console.log(data)

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
                    // console.log(data)
                    // setNickemail(data.Nickname)
                });
        }
    }, []);

    // 멘토일경우 이메일
    useEffect(() => {
        if (data.length !== 0) {
            if (location.pathname.includes('Class')) {
                fetch(`/api/user/Nickname/${decodeURI(location.pathname.split('/')[3])}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data.user)
                        setNickemail(data.user)
                    });
            }
            else {
                fetch(`/api/user/Nickname/${decodeURI(location.pathname.split('/')[2])}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data.user)
                        setNickemail(data.user)
                    });
            }
        }
    }, [data]);

    // 채팅리스트
    useEffect(() => {
        if (data.length !== 0 && String(localStorage.getItem('id')) !== data.User) {
            fetch(`/api/Chat/info/${data.User}/${String(localStorage.getItem('id'))} `, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data)
                    if (data.result === 'fail') {
                        FirstMessage()
                    }
                    else {
                        setChattrue(false)
                        setChat(data)
                    }

                });
        }
        else if (nickemail !== "") {
            // console.log(nickemail)
            fetch(`/api/Chat/info/${nickemail}/${String(localStorage.getItem('id'))} `, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setChat(data)
                    setChattrue(false)
                    // setChattrue(false)
                    //   console.log(chat)
                });
        }

    },[data , rgjkrs]);

    // 약속일정 확인을 위한 멘토링정보 출력 data.User -> 멘토 생성한 유저 이메일 , 일치하지않을경우 -> 멘티 , 이외 -> 멘토
    useEffect(() => {
        if (data.length !== 0 && String(localStorage.getItem('id')) !== data.User) {
            if (location.pathname.includes('Class')) {
                fetch(`/api/add/class/certify/ClassProgram/${String(localStorage.getItem('id'))} `, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data)
                        setPost(data)
                    });
            }
            else{
                fetch(`/api/add/class/certify/MentorProgram/${String(localStorage.getItem('id'))} `, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data)
                        setPost(data)
                    });
            }
        }

        // 맨토일경우 클래스
        else if (nickemail !== "") {
            if (location.pathname.includes('Class')) {
                fetch(`/api/add/class/certify/ClassProgram/Mentor/${String(localStorage.getItem('id'))}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        setPost(data)
                        // setChattrue(false)
                        //   console.log(chat)
                    });
            }
            else {
                fetch(`/api/add/class/certify/MentorProgram/Mentor/${String(localStorage.getItem('id'))}`, {
                    method: 'GET',
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        setPost(data)
                        // setChattrue(false)
                        //   console.log(chat)
                    });
            }
        }
    }, [data]);

    // console.log(post?.filter((e) => e.mentor_id.includes(data.User))[0].mentIr_id)


    function FirstMessage() {
        var timess = new Date();

        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: data.User,
                receiver: String(localStorage.getItem('id')),
                message: "안녕하세요-프로그램을 신청해주셔서 감사합니다.",
                timeset: timess,

            }),
        })
            .then(res => res.json())
            .then(data => {
                SecondMessage()
            })
    }

    function SecondMessage() {
        var timess = new Date();

        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: data.User,
                receiver: String(localStorage.getItem('id')),
                message: "아래내용에 답해주세요-1.멘토에게 궁금한 내용을 작성해주세요-2.희망하시는 날짜와 시간을 작성해주세요-3.현재 내신 및 모의고사 성적을 작성해주세요",
                timeset: timess,

            }),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
            })
    }


    function ParentFunction() {
        //     setPost(x);
        var timess = new Date();
        console.log(message)
        //     // if ( String(localStorage.getItem('id')) !== data.User ) {
        fetch("/api/Chat/send/Mentor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: String(localStorage.getItem('id')),
                receiver: nickemail,
                message: message,
                timeset: timess,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if(rgjkrs === true){
                    setrgjkrs(false)
                }
                else{
                    setrgjkrs(true)
                }
                // console.log(data)
            })
        
       
    }



    return (

        <>
            <MainBox>
                <Top>
                    <TopInner>
                        <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                            onClick={() => navigate('/Message')} />
                        {String(localStorage.getItem('id')) !== data.User ?
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>{nickname}</span>
                            :
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>{decodeURI(location.pathname.split('/')[2])}</span>
                        }
                        <div style={{ width: "24px", height: "24px" }}></div>
                    </TopInner>
                </Top>


                {/* 프로그램명  */}
                <div style={{ width: "100%", height: "90px", background: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Approve_Profile.png" style={{ width: "65px", height: "65px", marginRight: "10px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#515151" }}>{data.ProgramName?.split("-")[0]}</span>
                        <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2", marginTop: "2px" }} >{nickname}</span>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: "2px" }}>
                            <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.University?.split(",")[0]}</span>
                            <span style={{ fontSize: "10px", fontWeight: "400", color: "#AEAEB2" }}>{data.Category}</span>
                        </div>
                    </div>
                </div>

                {/* 일정잡기 */}
                {post?.filter((e) => e.mentor_id.includes(data.User))[0]?.schedule === undefined || post?.filter((e) => e.mentor_id.includes(data.User))[0]?.schedule === "" ?
                    <div style={{
                        width: "100%", height: "54px", background: "white", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                        borderTop: "0.5px solid #D1D1D6"
                    }}>
                        <MainBoxtssd>
                            <span style={{ color: "#00C563" }}>일정과 장소</span>
                            <span>를 조율하셨다면 약속잡기를 눌러주세요</span>
                            <div style={{
                                width: "70px", height: "28px", background: "#E2FFF1", color: "#00C563", display: "flex", justifyContent: "center", alignItems: "center"
                                , marginLeft: "23px", borderRadius: "4px"
                            }} onClick={() => data.Category2 === undefined ?
                                navigate(`/Schedule/${data.ProgramName}/${post?.filter((e) => e.mentor_id.includes(data.User))[0].mentIr_id}`)
                                :
                                navigate(`/Schedule/Class/${data.ProgramName}/${post?.filter((e) => e.mentor_id.includes(data.User))[0].mentIr_id}`)
                            }>약속잡기</div>
                        </MainBoxtssd>
                    </div>
                    : <></>
                }



                {/* 채팅내용 */}
                {chattrue ?
                    <></>
                    :
                    <div style={{ width: "100%", height: "1100px", background: "#F1F2F3" , overflow:"auto" , paddingBottom:"125px" }}>
                        {chat?.map((fgkljf, index) => (
                            <div key={index} style={{ width: "100%", height: "auto", background: "#F1F2F3" }}>
                                {fgkljf.sender === String(localStorage.getItem('id')) ?
                                    <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "flex-end", marginTop: "62px", marginRight: "20px" }}>
                                        {fgkljf.content.includes("안녕하세요") ?
                                            <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                                {fgkljf.content.split('-')[0]}<br />
                                                {fgkljf.content.split('-')[1]}
                                            </div>
                                            : fgkljf.content.includes("답해주세요") ?
                                                <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                                    {fgkljf.content.split('-')[0]}<br />
                                                    {fgkljf.content.split('-')[1]}<br />
                                                    {fgkljf.content.split('-')[2]}<br />
                                                    {fgkljf.content.split('-')[3]}<br />
                                                </div>
                                                :
                                                fgkljf.content.includes("약속시간 30분전에 알림이 울릴거에요") ?
                                                    <div style={{
                                                        padding: "10px 20px", fontSize: "12px", fontWeight: "400", color: "#515151",
                                                        width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"
                                                    }}>
                                                        {nickname}{fgkljf.content.split('-')[0]}<br />
                                                        {fgkljf.content.split('-')[1]}<br />
                                                        <span style={{ marginTop: "6px" }}>{fgkljf.content.split('-')[2]}<br /></span>
                                                        {/* {fgkljf.content.split('-')[3]}<br /> */}
                                                    </div>
                                                    :
                                                    fgkljf.content.includes("멘티의 단순 변심으로 인한 환불은 불가합니다") ?
                                                        <div style={{
                                                            padding: "10px 20px", fontSize: "12px", fontWeight: "400", color: "#515151", borderRadius: "8px",
                                                            width: "100%", display: "flex", justifyContent: "center"
                                                        }}>
                                                            <div style={{
                                                                padding: "10px 20px", background: "#E6E6E6", fontSize: "12px", fontWeight: "400",
                                                                color: "#515151", borderRadius: "8px", width: "330px",
                                                                display: "flex", justifyContent: "center", alignItems: "center"
                                                            }}>
                                                                {fgkljf.content.split('-')[0]}<br />
                                                                {fgkljf.content.split('-')[1]}<br />
                                                                {fgkljf.content.split('-')[2]}
                                                            </div>
                                                            {/* {fgkljf.content.split('-')[3]}<br /> */}
                                                        </div>
                                                        :
                                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151", }}>
                                                            {fgkljf.content}
                                                        </div>
                                        }
                                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <span style={{ fontSize: "12px", fontWeight: "400", color: "#515151" }}>{fgkljf.Enterrime?.substr(11, 5)}</span>
                                        </div>
                                    </div>
                                    :
                                    <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "flex-start", marginTop: "62px", marginLeft: "20px" }}>
                                        {fgkljf.content.includes("안녕하세요") ?
                                            <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                                {fgkljf.content.split('-')[0]}<br />
                                                {fgkljf.content.split('-')[1]}
                                            </div>
                                            : fgkljf.content.includes("답해주세요") ?
                                                <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                                    {fgkljf.content.split('-')[0]}<br />
                                                    {fgkljf.content.split('-')[1]}<br />
                                                    {fgkljf.content.split('-')[2]}<br />
                                                    {fgkljf.content.split('-')[3]}<br />
                                                </div>
                                                :
                                                fgkljf.content.includes("약속시간 30분전에 알림이 울릴거에요") ?
                                                    <div style={{
                                                        padding: "10px 20px", fontSize: "12px", fontWeight: "400", color: "#515151",
                                                        width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"
                                                    }}>
                                                        {nickname}{fgkljf.content.split('-')[0]}<br />
                                                        {fgkljf.content.split('-')[1]}<br />
                                                        <span style={{ marginTop: "6px" }}>{fgkljf.content.split('-')[2]}<br /></span>
                                                        {/* {fgkljf.content.split('-')[3]}<br /> */}
                                                    </div>
                                                    :
                                                    fgkljf.content.includes("멘티의 단순 변심으로 인한 환불은 불가합니다") ?
                                                        <div style={{
                                                            padding: "10px 20px", fontSize: "12px", fontWeight: "400", color: "#515151", borderRadius: "8px",
                                                            width: "100%", display: "flex", justifyContent: "center"
                                                        }}>
                                                            <div style={{
                                                                padding: "10px 20px", background: "#E6E6E6", fontSize: "12px", fontWeight: "400",
                                                                color: "#515151", borderRadius: "8px", width: "330px",
                                                                display: "flex", justifyContent: "center", alignItems: "center"
                                                            }}>
                                                                {fgkljf.content.split('-')[0]}<br />
                                                                {fgkljf.content.split('-')[1]}<br />
                                                                {fgkljf.content.split('-')[2]}
                                                            </div>
                                                            {/* {fgkljf.content.split('-')[3]}<br /> */}
                                                        </div>
                                                        :
                                                        <div style={{ padding: "10px 20px", background: "White", fontSize: "12px", fontWeight: "400", color: "#515151" }}>
                                                            {fgkljf.content}
                                                        </div>
                                        }

                                        {fgkljf.content.includes("약속시간 30분전에 알림이 울릴거에요") || fgkljf.content.includes("멘티의 단순 변심으로 인한 환불은 불가합니다") ?
                                            <div></div>
                                            :
                                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                                <span style={{ fontSize: "12px", fontWeight: "400", color: "#515151" }}>{fgkljf.Enterrime?.substr(11, 5)}</span>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }



            </MainBox>





            <NavgationBox>
                <Btn>
                    <TopInnersecond>
                        <Topfirst
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder="메세지보내기"
                            type="text"
                        />
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Chat.png"
                            style={{ width: "30px", height: "auto", marginLeft: "8px", marginTop: "12px" }} onClick={() => ParentFunction(message)} />

                    </TopInnersecond>
                </Btn>
            </NavgationBox>

        </>
    );
}

export default Room;

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

/* 전체박스 */
const MainBoxtssd = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 90%;
font-weight: 500;
font-size: 12px;
@media screen and (max-width: 540px) {
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

/* 전체박스*/
const NavgationBox = styled.div`
width:540px;
height:90px;
border-top: 1px solid #F1F2F3;
box-shadow: 0px -4px 40px rgba(0, 0, 0, 0.05);
display:flex;
justify-content: center;
align-items: center;
background-color: white;
flex : none;
position: fixed;
bottom:0;
z-index: 1;
  @media screen and (max-width: 540px) {
    width:100%;
    
	border-top: 1px solid #F1F2F3;
	box-shadow: 0px -4px 40px rgba(0, 0, 0, 0.05);
	display:flex;
    justify-content: center;
    align-items: center;
	background-color: white;
    flex : none;
    position: fixed;
    bottom:0;
    z-index: 1;
	}
`;


/* 상단부분 내부 */
const TopInnersecond = styled.div`
display: flex;
flex-direction:row;
justify-content:flex-start;
align-items: center;
width: 90%;
height: 43px;
@media screen and (max-width: 540px) {
    height: 43px;
	}
`;

/* 상단부분 내부 */
const Topfirst = styled.input`
display: flex;
justify-content:center;
align-items: center;
background: #F1F2F3;
border-radius: 6px;
padding-left:20px;
width: 85%;
height: 43px;
margin-top:12px;
border:none;
@media screen and (max-width: 540px) {
    height: 43px;
	}
`;




/* 하단바 전체 박스 */
const Btn = styled.ul`
    margin:0;
		padding:0;
		display:table;
		table-layout: fixed;
		width:100%;
		height:100%;
		display: flex;
		justify-content: space-around;
	
`;

