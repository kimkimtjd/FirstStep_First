import { useState, useEffect } from "react";
import styles from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";

function Login() {

    const { Login, LoginCertify } = useStore();
    const [email, setEmail] = useState(''); // 로그인전용 이메일
    const [emailClick, setEmailClick] = useState(true); // 이메일 클릭시
    const [PassWord, setPassWord] = useState(''); // 로그인전용 비밀번호
    const [PassWordClick, setPassWordClick] = useState(true); // 로그인전용 비밀번호
    const [PassWord_fail, setPassWord_fail] = useState(true); // 로그인시 비밀번호 일치 및 불일치
    const [check, setCheck] = useState(true);
    const navigate = useNavigate();

    // 로그인 진행후 로그인페이지 진입시 메인페이지로 이동
    useEffect(() => {
        if (Login === false) {
            navigate('/')
        }
    }, [Login, navigate]);

    // 로그인
    function Login_input() {

        setEmailClick(true);
        setPassWordClick(true);

        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: email,
                password: PassWord,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    alert('로그인 완료되었습니다.')
                    navigate('/')
                    LoginCertify();
                    localStorage.setItem('id', email) // 유저정보
                    localStorage.setItem('maintail', check) // 로그인 유지 여부
                }
                else if (data.result === 'fail') {
                    alert('아이디 또는 비밀번호를 확인해주세요.')
                    setPassWord_fail(false)
                }
            })

    }

    // 이메일 Focus
    function EmainFocus(){
        setEmailClick(false)
        setPassWordClick(true)
    }

    // 비밀번호 Focus
    function PasswordFocus(){
        setEmailClick(true)
        setPassWordClick(false)
    }

    // 비밀번호 틀린상태에서 Focus
    function PasswordFailFocus(){
        setEmailClick(true)
        setPassWordClick(false)
        setPassWord_fail(true)
    }

    return (
        <div className={styles.Menu}>

            {/* Header */}
            <div className={styles.Header} >
                <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={styles.Back_Arrow} alt="Total_img"
                    onClick={() => navigate('/')} />

            </div>

            {/* Intro */}
            <div className={styles.Intro}>
                <div className={styles.IntroText}>안녕하세요.<br />첫걸음입니다</div>
                <span className={styles.IntroSub}>회원 서비스 이용을 위해 로그인해주세요.</span>
            </div>

            {/* 로그인 */}
            <div className={styles.LoginBox}>


                {/* 이메일 */}
                {emailClick ?
                    <div className={styles.Email}>
                        <span className={styles.EmailText}>이메일</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            placeholder="이메일을 입력해주세요."
                            onChange={(e) => setEmail(e.target.value)}
                            // onClick={()=> EmainFocus()}
                            onFocus={() => EmainFocus(false)}
                            value={email}
                        />
                    </div>
                    :
                    <div className={styles.EmailClick}>
                        <span className={styles.EmailText}>이메일</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            placeholder="이메일을 입력해주세요."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>


                }

                {/* 비밀번호 */}

                {PassWord_fail && PassWordClick?
                    <div className={styles.Email}>
                        <span className={styles.EmailText}>비밀번호</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={(e) => setPassWord(e.target.value)}
                            value={PassWord}
                            type="password"
                            onFocus={()=> PasswordFocus()}
                        />
                    </div>
                    :PassWord_fail === false ?
                    <div className={styles.EmailFail}>
                        <span className={styles.EmailText}>비밀번호</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={(e) => setPassWord(e.target.value)}
                            onClick={()=> PasswordFailFocus()}
                            value={PassWord}
                            type="password"
                        />
                    </div>
                    :PassWordClick === false  ?
                    <div className={styles.EmailClick}>
                        <span className={styles.EmailText}>비밀번호</span>
                        <input
                            className={styles.EmailInput}
                            name="email"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={(e) => setPassWord(e.target.value)}
                            value={PassWord}
                            type="password"
                        />
                    </div>
                    :<></>
                }

                {/* 자동로그인 */}
                <div className={styles.AutoLogin}>
                    {check ?
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Check_No.png" alt="checkbox" className={styles.AutoLogincheck} onClick={() => setCheck(!check)} />
                        :
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Check.png" alt="checkbox" className={styles.AutoLogincheck} onClick={() => setCheck(!check)} />
                    }
                    자동로그인
                </div>
            </div>



            {/* 로그인버튼 */}
            <div className={styles.LoginBtn}>
                <div className={styles.Btn} onClick={() => Login_input()}>
                    <span>로그인</span>
                </div>
                <div className={styles.FindBox}>
                    <div onClick={() => navigate('/Find/id')}>아이디 찾기</div>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <div onClick={() => navigate('/Find/pw')}>  비밀번호 찾기</div>
                </div>
            </div>


        </div>

    );
}

export default Login;

