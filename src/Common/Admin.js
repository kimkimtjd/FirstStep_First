import { useState, useEffect } from "react";
import styles from "./css/Admin.module.css";
import secondstyle from "./css/AdminSecond.module.css";
import Modalphone from "./Modalphone";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";

function Admin() {

	// email password phone
	const { Login, email_function, password_function, id_function, pw_function, phone_function } = useStore();
	const [stage, setStage] = useState(1); // 회원가입 순서
	const [email, setEmail] = useState(""); //  이메일
	const [emailCheck, setEmailCheck] = useState(1); // 이메일 Focus
	const [password, setPassword] = useState(""); // 비밀번호
	const [passwordCheck, setpasswordCheck] = useState(1); // 비밀번호 Focus
	const [passwordCertify, setPassowrdCertify] = useState(""); // 비밀번호 확인
	const [phone, setPhone] = useState(""); // 연락처
	const [phoneCertify, setPhoneCertify] = useState(1); // 연락처 활성화
	const [totalCheck, setTotalCheck] = useState(true); // 이용약관
	const [checkarray, setCheckarray] = useState([]); // 이용약관 하위메뉴
	const [checkarraytrue, setCheckarraytrue] = useState(true); // 이용약관 하위메뉴
	const [passwordCertifyCheck, setpasswordCertifyCheck] = useState(1); // 비밀번호 확인 Focus
	const [nickname, setNickname] = useState(""); // 닉네임
	const [nicknamefocus, setNicknamefocus] = useState(1); // 닉네임 focus
	const [certify, setCertify] = useState(true); // 본인인증
	const [certifynumber, setCertifyNumber] = useState(""); // 본인인증
	const [modalIsOpen, setModalIsOpen] = useState(false); // 모달

	const [random, setRandom] = useState("000000")


	const navigate = useNavigate();
	const location = useLocation()

	const checkList = [
		{ id: 1, list: '만 14세 이상 이용, 서비스 이용약관 (필수)' },
		{ id: 2, list: '개인정보 수집 및 이용 동의 (선택)' },
		{ id: 3, list: '프로모션 정보 수신 동의 (선택)' },
		{ id: 4, list: '장기 미접속시 시에도 계정 유지 (선택)' }]

	// 로그인 진행후 로그인페이지 진입시 메인페이지로 이동

	// 이용약관 4개
	useEffect(() => {
		if (checkarray.length === 4) {
			setTotalCheck(false)
		}
		else {
			setTotalCheck(true)
		}
	}, [checkarraytrue]);

	// 아이디 비밀번호 찾기
	useEffect(() => {
		if (location.pathname.includes('Find')) {
			setStage(2);
		}
	}, []);

	// 마이페이지 - 닉네임 변경
	useEffect(() => {
		if (location.pathname.includes('Mypage')) {
			setStage(4);
		}
	}, []);


	// 이메일 포커스
	function EmailFocus() {
		setEmailCheck(2)
		setpasswordCheck(1)
		setpasswordCertifyCheck(1)
	}

	// 비밀번호 포커스
	function PasswordFocus() {
		setEmailCheck(1)
		setpasswordCheck(2)
		setpasswordCertifyCheck(1)
	}

	// 비밀번호 확인 포커스	
	function PasswordCertiFocus() {
		setEmailCheck(1)
		setpasswordCheck(1)
		setpasswordCertifyCheck(2)
	}

	//  이메일 중복확인 및 1차 기입 완료
	function Admin() {
		console.log(password.length)

		if (email.includes('@') && password === passwordCertify && password.length > 8) {
			fetch("/api/user/emailcheck", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					EmailPost: email,
				}),
			})
				.then(res => res.json())
				.then(data => {
					if (data.result === 'success') {
						setStage(stage + 1);
						email_function(email);
						password_function(password);

					}
					else if (data.result === 'fail') {
						alert('이미 계정이 존재합니다.')
					}
				})
		}
		else if (password !== passwordCertify) {
			alert('비밀번호가 일치하지 않습니다');
			setpasswordCheck(3);
			setpasswordCertifyCheck(3)
		}
		else if (password.length < 8) {
			alert('비밀번호가 너무 짧습니다');
			setpasswordCheck(3);
		}
		else {
			alert('이메일 형식이 아닙니다')
			setEmailCheck(3)
		}

	}

	//  휴대폰 중복확인 및 2차 기입 완료
	function Phonecheck() {

		let str = ''
		for (let i = 0; i < 4; i++) {
			str += Math.floor(Math.random() * 10)
		}
		setRandom(str)
		setCertify(false)
		setPhoneCertify(3)

		fetch("/api/user/phone/certify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nickname: phone,
				number: str,
			}),
		})
			.then(res => res.json())
			.then(data => {

			})


	}

	function Next() {
		if (random === certifynumber) {
			if (location.pathname.includes('id')) {
				console.log(phone)
				fetch("/api/user/FindId", {
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
							navigate('/Find/id/end');
							id_function(data.user);
							phone_function(phone);
						}
						console.log(phone)
					})
			}
			else if (location.pathname.includes('pw')) {
				fetch("/api/user/Findnickname", {
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
							phone_function(phone);
						}
					})
			}
			else {
				fetch("/api/user/Phonecheck", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						PhonePost: phone,
					}),
				})
					.then(res => res.json())
					.then(data => {
						if (data.result === 'success') {
							setStage(stage + 1);
						}
						else if (data.result === 'fail') {
							alert('이미 계정이 존재합니다.')
						}
					})
			}
		}
		else {
			setModalIsOpen(true)
		}
	}

	// 전체 이용약관 선택
	function TotalCheckFunction() {
		setTotalCheck(!totalCheck);
		setCheckarraytrue(!checkarraytrue);
		checkarray.push(1);
		checkarray.push(2);
		checkarray.push(3);
		checkarray.push(4);
	}

	// 전체 이용약관 해제
	function TotalCheckDelete() {
		setTotalCheck(!totalCheck);
		setCheckarraytrue(!checkarraytrue);
		var array = checkarray.filter((element) => element !== 1).filter((element) => element !== 2).filter((element) => element !== 3).filter((element) => element !== 4);
		setCheckarray(array);
	}

	// 이용약관 하위리스트
	function PushList(number) {
		checkarray.push(number);
		setCheckarraytrue(!checkarraytrue);
	}

	// 이용약관 해제
	function PushDelete(number) {
		var array = checkarray.filter((element) => element !== number);
		setCheckarray(array);
		setCheckarraytrue(!checkarraytrue);
	}

	// 회원가입
	function AdminUser() {
		if (location.pathname.includes('Mypage')) {
			fetch(`/api/user/ChangeNickname/${String(localStorage.getItem('id'))}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nickname: nickname,
				}),
			})
				.then(res => res.json())
				.then(data => {
					if (data.result === "fail") {
						alert('닉네임이 존재합니다')
						setNicknamefocus(3)
					}
					else {
						alert('변경이 완료되었습니다.')
						navigate('/Mypage/admin')
					}
				})
		}
		else {
			fetch("/api/user/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					EmailPost: email,
					NamePost: password,
					PhonePost: phone,
					NicknamePost: nickname,
				}),
			})
				.then(res => res.json())
				.then(data => {
					if (data.result === "fail") {
						alert('계정이 존재합니다')
					}
					else {
						alert('회원가입이 완료되었습니다.')
						navigate('/')
					}
				})
		}


	}


	return (
		<>
			{/* 이용약관 */}
			{stage === 3 ?
				<>
					<div className={styles.Terms}>
					</div>
					<div className={styles.TermInner}>
						{/* 제목 */}
						<div className={styles.TermFirst}>
							<div className={styles.Back_Terms}></div>
							약관동의
							<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" className={styles.Back_Terms} alt="Total_img"
								onClick={() => setStage(stage - 1)} />
						</div>

						<div className={secondstyle.TermTotal}>
							<div className={secondstyle.TermTotalInner}>
								<div className={secondstyle.First}>
									{totalCheck ?
										<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Check_No.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => TotalCheckFunction()} />
										:
										<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Check.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => TotalCheckDelete()} />
									}
									전체동의 (선택포함)
								</div>

								<div className={secondstyle.TermTotalSecond}>
									{checkList.map((data, index) => (
										<div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
											<>
												{checkarraytrue ?
													<>
														{checkarray.filter((e) => e === data.id).length === 1 ?
															<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Term_Toggle.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => PushDelete(data.id)} />
															:
															<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Term_sucess.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => PushList(data.id)} />
														}
													</>
													:
													checkarray.filter((e) => e === data.id).length === 1 ?
														<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Term_Toggle.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => PushDelete(data.id)} />
														:
														<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Term_sucess.png" alt="checkbox" className={secondstyle.Firstcheck} onClick={() => PushList(data.id)} />
												}
											</>
											{data.list}
										</div>
									))}
								</div>
							</div>
						</div>

						<div className={secondstyle.Btn}>
							{totalCheck === false || checkarray.filter((e) => e === 1).length === 1 ?
								<div className={secondstyle.BtnInner} onClick={() => setStage(stage + 1)}>
									확인
								</div>
								:
								<div className={secondstyle.BtnNo}>
									확인
								</div>
							}
						</div>

					</div>
				</>
				:
				<div className={styles.User}>
					{/* Header */}
					<div className={styles.Header} >
						<img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" className={styles.Back_Arrow} alt="Total_img"
							onClick={() => stage === 1 ? navigate('/') : location.pathname.includes('Find') ? navigate('/Login') : setStage(stage - 1)} />

						{stage === 1 ?
							<span className={styles.HeaderText}>회원가입</span>
							: stage === 2 ?
								<span className={styles.HeaderText}>본인인증</span>
								: stage === 4 ?
									<span className={styles.HeaderText}>닉네임 설정</span>
									: <></>
						}

						<img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Login_Cancel.png" className={styles.Back_Arrow} alt="Total_img"
							onClick={() => navigate('/')} />
					</div>

					{/* Intro */}
					{stage === 1 ?
						<div className={styles.Intro}>
							<div className={styles.IntroText}>
								<div style={{ display: "flex", flexDirection: "row" }}>
									<div style={{ fontWeight: "900" }}>회원가입</div>
									<div>을 위해</div>
								</div>
								이메일을 입력해주세요.
							</div>
							<div className={styles.IntroSub}>
								멘토와 새로운 인연을 만들어보세요.
							</div>
						</div>
						: stage === 2 ?
							<div className={styles.Intro}>
								<div className={styles.IntroText}>
									첫걸음 이용을 위해
									<div style={{ display: "flex", flexDirection: "row" }}>
										<div style={{ fontWeight: "900" }}>휴대폰 본인인증</div>
										<div>을 해주세요.</div>
									</div>
								</div>
								<div className={styles.IntroSub}>
									회원여부 확인 및 가입을 진행합니다.
								</div>
							</div>
							: stage === 4 ?
								<div className={styles.Intro}>
									<div className={styles.IntroText}>
										첫걸음에서 사용할
										<div style={{ display: "flex", flexDirection: "row" }}>
											<div style={{ fontWeight: "900" }}>닉네임</div>
											<div>을 설정해주세요.</div>
										</div>
									</div>
									<div className={styles.IntroSub}>
										개인정보가 보이지 않도록 주의해주세요.
									</div>
								</div>
								: <></>
					}


					{/* 입력부분 */}
					{stage === 1 ?
						<>
							<div className={styles.StageFirst}>
								{emailCheck === 1 ?
									<div className={styles.FirstInnerBox}>
										<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
											<span className={styles.FirstTitle}>이메일</span>
											<input
												className={styles.EmailInput}
												name="email"
												placeholder="이메일을 입력해주세요."
												onChange={(e) => setEmail(e.target.value)}
												onFocus={() => EmailFocus()}
												value={email}
											/>
										</div>
										{email === "" ?
											<></>
											:
											<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
												src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
										}
									</div>
									:
									emailCheck === 2 ?
										<div className={styles.FirstInnerFocus}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>이메일</span>
												<input
													className={styles.EmailInput}
													name="email"
													placeholder="이메일을 입력해주세요."
													onChange={(e) => setEmail(e.target.value)}
													value={email}
												/>
											</div>
											{email === "" ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
											}
										</div>
										:
										<div className={styles.FirstInnerCancel}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>이메일</span>
												<input
													className={styles.EmailInput}
													name="email"
													placeholder="이메일을 입력해주세요."
													onChange={(e) => setEmail(e.target.value)}
													value={email}
												/>
											</div>
											{email === "" ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Id_Cancel.png" alt="emailimg" />
											}
										</div>
								}

								{passwordCheck === 1 ?
									<div className={styles.FirstInnerBox}>
										<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
											<span className={styles.FirstTitle}>비밀번호</span>
											<input
												className={styles.EmailInput}
												name="password"
												type="password"
												placeholder="영문, 숫자, 특수문자 포함 8자 이상"
												onChange={(e) => setPassword(e.target.value)}
												onFocus={() => PasswordFocus()}
												value={password}
											/>
										</div>
										{password === '' ?
											<></>
											:
											<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
												src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
										}
									</div>
									: passwordCheck === 2 ?
										<div className={styles.FirstInnerFocus}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>비밀번호</span>
												<input
													className={styles.EmailInput}
													name="password"
													type="password"
													placeholder="영문, 숫자, 특수문자 포함 8자 이상"
													onChange={(e) => setPassword(e.target.value)}
													value={password}
												/>
											</div>
											{password === '' ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
											}
										</div>
										:
										<div className={styles.FirstInnerCancel}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>비밀번호</span>
												<input
													className={styles.EmailInput}
													name="password"
													type="password"
													placeholder="영문, 숫자, 특수문자 포함 8자 이상"
													onChange={(e) => setPassword(e.target.value)}
													value={password}
												/>
											</div>
											{password === '' ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
											}
										</div>
								}

								{
									passwordCertifyCheck === 1 ?
										<div className={styles.FirstInnerBox}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>비밀번호 재입력</span>
												<input
													className={styles.EmailInput}
													name="password"
													type="password"
													placeholder="영문, 숫자, 특수문자 포함 8자 이상"
													onChange={(e) => setPassowrdCertify(e.target.value)}
													onFocus={() => PasswordCertiFocus()}
													value={passwordCertify}
												/>
											</div>
											{passwordCertify === '' ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
											}
										</div>
										: passwordCertifyCheck === 2 ?
											<div className={styles.FirstInnerFocus}>
												<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
													<span className={styles.FirstTitle}>비밀번호 재입력</span>
													<input
														className={styles.EmailInput}
														name="password"
														type="password"
														placeholder="영문, 숫자, 특수문자 포함 8자 이상"
														onChange={(e) => setPassowrdCertify(e.target.value)}
														value={passwordCertify}
													/>
												</div>
												{passwordCertify === '' ?
													<></>
													:
													<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
														src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
												}
											</div>
											:
											<div className={styles.FirstInnerCancel}>
												<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
													<span className={styles.FirstTitle}>비밀번호 재입력</span>
													<input
														className={styles.EmailInput}
														name="password"
														type="password"
														placeholder="영문, 숫자, 특수문자 포함 8자 이상"
														onChange={(e) => setPassowrdCertify(e.target.value)}
														value={passwordCertify}
													/></div>
												{passwordCertify === '' ?
													<></>
													:
													<img style={{ width: "16px", height: "auto", marginRight: "18px" }}
														src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
												}
											</div>
								}
							</div>

							{email !== "" && password !== "" && passwordCertify !== "" ?
								<div className={styles.NextBtnOk} onClick={() => Admin()}>
									다음
								</div>
								:
								<div className={styles.NextBtn}>
									다음
								</div>
							}
						</>
						:
						stage === 2 ?
							<>
								{phoneCertify === 1 ?
									<div className={styles.SecondStageBox}>
										<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
											<span className={styles.FirstTitle}>휴대폰번호</span>
											<input
												className={styles.EmailInput}
												name="phone"
												placeholder="휴대폰번호 입력."
												onChange={(e) => setPhone(e.target.value)}
												value={phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/, "$1-$2-$3")}
												onFocus={() => setPhoneCertify(2)}
											/>
										</div>
										{phone === "" ?
											<></>
											:
											<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
												src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
										}
									</div>
									: phoneCertify === 2 ?
										<div className={styles.SecondActiveBox}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>휴대폰번호</span>
												<input
													className={styles.EmailInput}
													name="phone"
													placeholder="휴대폰번호 입력."
													onChange={(e) => setPhone(e.target.value)}
													value={phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/, "$1-$2-$3")}

												/>
											</div>
											{phone === "" ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
											}
										</div>
										:
										<div className={styles.SecondActivePhoneBox}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>휴대폰번호</span>
												<input
													className={styles.EmailInput}
													name="phone"
													placeholder="휴대폰번호 입력."
													onChange={(e) => setPhone(e.target.value)}
													value={phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/, "$1-$2-$3")}
													onFocus={() => setPhoneCertify(!phoneCertify)}
												/>
											</div>
											{phone === "" ?
												<></>
												:
												<img style={{ width: "16px", height: "auto", marginRight: "18px" }} onClick={() => setEmail('')}
													src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
											}
										</div>
								}
								{certify ?
									<></>
									:
									<div className={styles.SecondActiveBox}>
										<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
											<span className={styles.FirstTitle}>인증번호</span>
											<input
												className={styles.EmailInput}
												name="phone"
												placeholder="인증번호 4자리 입력."
												onChange={(e) => setCertifyNumber(e.target.value)}
												value={certifynumber}

											/>
										</div>

									</div>
								}

								{modalIsOpen && (<Modalphone
									open={modalIsOpen}
									onClose={() => {
										setModalIsOpen(false);
									}}
								/>)}

								{certify === true && phone !== "" ?
									<div className={styles.NextBtnOk} onClick={() => Phonecheck()}>
										인증문자받기
									</div>
									:
									certify === false && phone !== "" ?
										<div className={styles.NextBtnOk} onClick={() => Next()}>
											다음
										</div>
										:
										<div className={styles.NextBtn}>
											인증문자받기
										</div>
								}


							</>
							:
							stage === 4 ?
								<>
									{nicknamefocus === 1 ?
										<div className={styles.SecondStageBox}>
											<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<span className={styles.FirstTitle}>닉네임</span>
												<input
													className={styles.EmailInput}
													name="nickname"
													placeholder="16자 이내 / 특수문자 입력 불가"
													onChange={(e) => setNickname(e.target.value)}
													value={nickname}
													onFocus={() => setNicknamefocus(2)}
												/>
											</div>
										</div>
										:
										nicknamefocus === 2 ?
											<div className={styles.SecondActiveBox}>
												<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
													<span className={styles.FirstTitle}>닉네임</span>
													<input
														className={styles.EmailInput}
														name="nickname"
														placeholder="16자 이내 / 특수문자 입력 불가"
														onChange={(e) => setNickname(e.target.value)}
														value={nickname}
													/>
												</div>
											</div>
											:
											<div className={styles.SecondNoBox}>
												<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
													<span className={styles.FirstTitle}>닉네임</span>
													<input
														className={styles.EmailInput}
														name="nickname"
														placeholder="16자 이내 / 특수문자 입력 불가"
														onChange={(e) => setNickname(e.target.value)}
														value={nickname}
													/>
												</div>
											</div>
									}

									{nickname !== "" ?
										<div className={styles.NextBtnOk} onClick={() => AdminUser()}>
											회원가입 완료
										</div>
										:
										<div className={styles.NextBtn}>
											회원가입 완료
										</div>
									}

								</>
								:
								<></>


					}

				</div>
			}


		</>
	)
}

export default Admin