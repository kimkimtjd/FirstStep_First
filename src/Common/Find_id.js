import { useState, useEffect } from "react";
import styles from "./css/Admin.module.css";
import secondstyle from "./css/AdminSecond.module.css";

import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";

function FindId() {

    const { id , pw_function } = useStore();

    // email password phone
    const [phone, setPhone] = useState(id); // 이메일
    const navigate = useNavigate();

    function LocatePw(){
        fetch("/api/user/Emailname", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Phone: phone,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'fail') {
                    alert('계정이 존재하지않습니다.')
                }
                else {
                    navigate('/Find/pw/end');
                    pw_function(data.user);
                }
            })	
    }


    return (
        <>
            <div className={styles.User}>

                {/* Header */}
                <div className={styles.Header} >
                    <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={styles.Back_Arrow} alt="Total_img"
                        onClick={() => navigate('/Find/id')} />

                    <span className={styles.HeaderText}>아이디 찾기</span>

                    <div className={styles.Back_Arrow} 
                        />
                </div>

                {/* Intro */}
                <div className={styles.Intro}>
                    <div className={styles.IntroTextFindid}>
                        본인의 계정이 맞으신가요?
                    </div>
                    <div className={styles.IntroSub}>
                        로그인 또는 비밀번호 찾기를 눌러주세요.
                    </div>
                </div>


                <div className={styles.SecondActiveBox}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <span className={styles.FirstTitle}>이메일</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            value={"***" + phone.substr(3,phone.length)}
                            readOnly
                        />
                    </div>
                </div>

                <div style={{ color:"#AEAEB2" , fontSize:"12px" , fontWeight:"400" , marginBottom:"16px" }} onClick={() => navigate('/Login/Admin')} >
                    찾으시는 계정이 없으신가요 ?
                </div>


                <div className={styles.NextBtnOk} onClick={() => navigate('/Login')}>
                    로그인
                </div>

                <div className={styles.FindPw} onClick={() => LocatePw()}>
                    비밀번호 찾기
                </div>


            </div>



        </>
    )
}

export default FindId;