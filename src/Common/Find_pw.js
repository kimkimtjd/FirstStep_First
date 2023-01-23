import { useState, useEffect } from "react";
import styles from "./css/Login.module.css";
import stylesSecond from "./css/Admin.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import styled from "styled-components";
import Modal from "./Modal";

function Find_pw() {

    const { pw, phone } = useStore();
    const [PassWord, setPassWord] = useState(''); //  비밀번호
    const [PassWordClick, setPassWordClick] = useState(true); //  비밀번호
    const [PassWorChange, setPassWordChange] = useState(''); //  비밀번호 확인용
    const [PassWorChangeClick, setPassWordChangeClick] = useState(true); //  비밀번호 확인용
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달
    const navigate = useNavigate();

    // 비밀번호 FOCUS
    function PasswordFocus() {
        setPassWordClick(false);
        setPassWordChangeClick(true);
    }

    // 비밀번호 확인
    function PasswordChangeFocus() {
        setPassWordClick(true);
        setPassWordChangeClick(false);
    }

    function Change() {

        if (PassWord !== PassWorChange) {
            alert('비밀번호가 일치하지않습니다')
        }
        else if (PassWord.length < 8) {
            alert('비밀번호가 너무 짧습니다')
        }
        else {
            fetch("/api/user/ChangePW", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Phone: phone,
                    Pw: PassWord
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result === 'fail') {
                        alert('변경이 되지않았습니다.')
                    }
                    else {
                        console.log('변경완료')
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
                        onClick={() => navigate('/Find/id')} />

                    <span className={stylesSecond.HeaderText}>비밀번호 찾기</span>

                    <div className={stylesSecond.Back_Arrow}
                    />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={styles.IntroText}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ fontWeight: "900" }}>{pw}</div>
                            <div>님의</div>
                        </div>
                        비밀번호를 변경합니다.
                    </div>
                    <div className={styles.IntroSub}>
                        사용할 새로운 비밀번호를 입력해주세요.
                    </div>
                </div>

                {/* 입력양식 */}
                <div className={stylesSecond.StageFirst_FindPw}>

                    {/* 비밀번호 */}
                    {PassWordClick ?
                        <div className={stylesSecond.FirstInnerBox}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={stylesSecond.FirstTitle}>비밀번호</span>
                                <input
                                    className={stylesSecond.EmailInput}
                                    name="phone"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    onChange={(e) => setPassWord(e.target.value)}
                                    value={PassWord}
                                    onFocus={() => PasswordFocus()}
                                    type="password"
                                />
                            </div>
                            {PassWord === "" ?
                                <></>
                                :
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            }
                        </div>
                        :
                        <div className={stylesSecond.FirstInnerFocus}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={stylesSecond.FirstTitle}>비밀번호</span>
                                <input
                                    className={stylesSecond.EmailInput}
                                    name="phone"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    onChange={(e) => setPassWord(e.target.value)}
                                    value={PassWord}
                                    type="password"
                                />
                            </div>
                            {PassWord === '' ?
                                <></>
                                :
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            }
                        </div>
                    }

                    {PassWorChangeClick ?
                        <div className={stylesSecond.FirstInnerBox}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={stylesSecond.FirstTitle}>비밀번호 재입력</span>
                                <input
                                    className={stylesSecond.EmailInput}
                                    name="phone"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    onChange={(e) => setPassWordChange(e.target.value)}
                                    value={PassWorChange}
                                    onFocus={() => PasswordChangeFocus()}
                                    type="password"
                                />
                            </div>
                            {PassWorChange === "" ?
                                <></>
                                :
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            }
                        </div>
                        :
                        <div className={stylesSecond.FirstInnerFocus}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={stylesSecond.FirstTitle}>비밀번호 재입력</span>
                                <input
                                    className={stylesSecond.EmailInput}
                                    name="phone"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    onChange={(e) => setPassWordChange(e.target.value)}
                                    value={PassWorChange}
                                    type="password"
                                />
                            </div>
                            {PassWorChange === '' ?
                                <></>
                                :
                                <img style={{ width: "16px", height: "auto", marginRight: "18px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                            }
                        </div>
                    }






                </div>



                {/* 로그인버튼 */}
                <div className={styles.LoginBtn}>
                    <div className={styles.Btn} onClick={() => Change()}>
                        <span>확인</span>
                    </div>
                </div>


            </div>

            {modalIsOpen && (<Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
            />)}


        </>
    );
}

export default Find_pw;

/* 전체박스*/
const MainBox = styled(Modal)`
z-index:99;
width:100%;
height:1000px;
background: rgba(0,0,0,.6);
@media screen and (max-width: 540px) {
		width: 100%;
	}
`;
