import { useState, useEffect } from "react";
import styles from "./css/Admin.module.css";
import secondstyle from "./css/AdminSecond.module.css";
import Modalphone from "./Modalphone";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import CheckFirst from "./CheckFirst";
import styled from "styled-components";

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
		{ id: 1, list: '서비스 이용약관 (필수)' },
		{ id: 2, list: '만 14세 이상 ' },
		{ id: 3, list: '개인정보 수집 및 이용 동의 (선택)' },
		{ id: 4, list: '마케팅 정보 수신 동의 (선택)' },]

	const profile = [
		{ id: 1, list: 'https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/character_1.png' },
		{ id: 2, list: 'https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/character_2.png' },
		{ id: 3, list: 'https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/character_3.png' },
		{ id: 4, list: 'https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/character_4.png' },
		{ id: 5, list: 'https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/character_5.png' }]

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
			// console.log(profile[Math.floor(Math.random() * profile.length)].list)
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
					profile_logo: profile[Math.floor(Math.random() * profile.length)].list
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

	// 이용약관 이동
	function Certify(data) {
		if (data.list === "서비스 이용약관 (필수)") {
			setStage(5)
		}
		else if (data.list === "개인정보 수집 및 이용 동의 (선택)") {
			setStage(6)
		}
		else if (data.list === "마케팅 정보 수신 동의 (선택)") {
			setStage(7)
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
										<div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
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
											<span onClick={() => Certify(data)}>{data.list}</span>
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
				:stage === 5 ?
			<div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
				<Top>
					<TopInner>
						<img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
							onClick={() => setStage(3)} />
						<span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제 내용 및 확인</span>
						<div style={{ width: "24px", height: "24px" }}></div>
					</TopInner>
				</Top>
				<p><strong>첫걸음 및 제반 서비스 이용과 관련하여 필요한 사항을 규정합니다.</strong></p>
				<h3>제1조 (목적)</h3>
				<p>이 약관은 (주)첫걸음 (이하 &quot;회사&quot;)이 제공하는 멘토링 서비스 및 관련 제반 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
				<h3>제2조 (정의)</h3>
				<p>이 약관에서 사용하는 용어는 아래와 같습니다.</p>
				<ol>
					<li>&quot;회원&quot;이라 함은 회사의 &quot;서비스&quot;에 접속하여 이 약관에 따라 &quot;회사&quot;와 이용계약을 체결하고 &quot;회사&quot;가 제공하는 &quot;서비스&quot;를 이용하는 고객을 말합니다.</li>
					<li>&quot;아이디(ID)&quot;라 함은 &quot;회원&quot;의 식별과 서비스 이용을 위하여 &quot;회원&quot;이 정하고 &quot;회사&quot;가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
					<li>&quot;비밀번호&quot;라 함은 &quot;회원&quot;이 부여 받은 &quot;아이디와 일치되는 &quot;회원&quot;임을 확인하고 비밀보호를 위해 &quot;회원&quot; 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
					<li>&quot;유료서비스&quot;라 함은 &quot;서비스&quot; 중 &quot;회사&quot;가 유료로 제공하는 멘토링 서비스 및 제반 서비스를 의미합니다.</li>
					<li>&quot;게시물&quot; 혹은 &quot;콘텐츠&quot;이라 함은 회원이 멘토링 서비스를 이용함에 있어 서비스상에 게시한 부호ᆞ문자ᆞ음성ᆞ음향ᆞ화상ᆞ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
				</ol>
				<h3>제3조 (약관의 게시와 개정)</h3>
				<ol>
					<li>&quot;회사&quot;는 이 약관의 내용을 &quot;회원&quot;이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
					<li>&quot;회사&quot;는 &quot;약관의규제에관한법률&quot;, &quot;정보통신망이용촉진및정보보호에관한법률(이하 &quot;정보통신망법&quot;)&quot; 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
				</ol>
				<h3>제4조 (약관의 해석)</h3>
				<ol>
					<li>회사는 개별 서비스에 대해서는 별도의 이용약관 및 정책(&quot;기타 약관 등&quot;이라 함)을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 &quot;기타 약관 등&quot;이 우선하여 적용됩니다.</li>
					<li>이 약관에서 정하지 아니한 사항이나 해석에 대해서는 &quot;기타 약관 등&quot; 및 관계법령 또는 상관례에 따릅니다.</li>
				</ol>
				<h3>제5조 [이용계약 체결]</h3>
				<ol>
					<li>이용계약은 &quot;회원&quot;이 되고자 하는 자(이하 &quot;가입신청자&quot;)가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 &quot;회사&quot;가 이러한 신청에 대하여 승낙함으로써 체결됩니다.</li>
					<li>&quot;회사&quot;는 &quot;가입신청자&quot;의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, &quot;회사&quot;는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.<ul>
						<li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
						<li>실명이 아니거나 타인의 명의를 이용한 경우</li>
						<li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
						<li>14세 미만 아동이 정보통신망 이용촉진 및 정보보호등에 관한 법률에서 정한 &quot;개인정보&quot; 입력 시 법정대리인(부모 등)의 동의를 얻지 아니한 경우</li>
						<li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
					</ul>
					</li>
					<li>&quot;회원&quot;이 유료서비스를 이용하는 경우 이용대금을 납부한 후 서비스를 이용하는 것을 원칙으로 하며, 유료서비스 이용계약의 성립시기는 &quot;구매완료&quot;를 신청절차 상에서 표시한 시점으로 합니다.</li>
					<li>&quot;회사&quot;는 만 20세 미만의 미성년회원이 유료서비스를 이용하고자 하는 경우에 부모 등 법정대리인의 동의를 얻거나, 계약체결 후 추인을 얻지 않으면 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있다는 내용을 계약체결 전에 고지하는 조치를 취합니다.</li>
					<li>&quot;회사&quot;는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
					<li>제2항과 제3항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, &quot;회사&quot;는 원칙적으로 이를 가입신청자에게 알리도록 합니다.</li>
					<li>이용계약의 성립 시기는 &quot;회사&quot;가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot;에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.</li>
				</ol>
				<h3>제6조 (회원정보의 변경)</h3>
				<ol>
					<li>&quot;회원&quot;은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디 등은 수정이 불가능합니다.</li>
					<li>&quot;회원&quot;은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 &quot;회사&quot;에 대하여 그 변경사항을 알려야 합니다.</li>
					<li>제2항의 변경사항을 &quot;회사&quot;에 알리지 않아 발생한 불이익에 대하여 &quot;회사&quot;는 책임지지 않습니다.</li>
				</ol>
				<h3>제7조 (개인정보보호 의무)</h3>
				<p>&quot;회원이&quot; &quot;회사&quot;의 &quot;서비스&quot;에 제공하는 정보 일체는 개인정보처리방침에 따르며, &quot;회사&quot;가 귀하의 정보를 수집 및 이용하는 행위는 동 정책에 따라 규율됩니다. &quot;회원&quot;은 본 서비스를 이용함으로써 &quot;회사&quot;가 &quot;회원&quot;의 정보를 수집 및 이용(개인정보처리방침에서 규정하는 바와 같음)하는 것에 동의하는 것으로 간주된다는 사실을 인지하고 있습니다. &quot;회원&quot;에게 본 서비스를 제공하는 것의 일환으로, &quot;회사&quot;는 서비스 관련 공지사항 및 행정적 사안에 관한 메시지를 비롯한 전달사항을 제공할 필요가 있을 수 있습니다.</p>
				<h3>제8조 (&quot;회원&quot;의 &quot;아이디&quot; 및 &quot;비밀번호&quot;의 관리에 대한 의무)</h3>
				<p>&quot;회원&quot;은 본 서비스에서 사용하는 비밀번호와 관련된 모든 행동을 보호/관리해야 합니다. &quot;회사&quot;는 귀하의 계정에 비밀번호를 강력한 암호(대문자, 소문자 및 숫자, 기호의 조합)로 설정할 것을 권장합니다. &quot;회사&quot;는 위 사항을 만족하지 못했을 때 일어난 어떠한 손실이나 피해에 대해 책임지지 않습니다. &quot;회사&quot;는 &quot;서비스&quot;를 안전하게 유지하기 위해 최선을 다하고 있지만 안전을 보장할 수는 없습니다.</p>
				<h3>제9조 (&quot;회원&quot;에 대한 통지)</h3>
				<ol>
					<li>&quot;회사&quot;가 &quot;회원&quot;에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 &quot;회원&quot;이 지정한 전자우편주소, 서비스 내 전자메모 및 쪽지 등으로 할 수 있습니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot; 전체에 대한 통지의 경우 7일 이상 &quot;회사&quot;의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</li>
				</ol>
				<h3>제10조 (&quot;회사&quot;의 의무)</h3>
				<ol>
					<li>&quot;회사&quot;는 관련법과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 &quot;서비스&quot;를 제공하기 위하여 최선을 다하여 노력합니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot;이 안전하게 &quot;서비스&quot;를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고 준수합니다.</li>
					<li>&quot;회사&quot;는 서비스이용과 관련하여 &quot;회원&quot;으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 &quot;회원&quot;에게 처리과정 및 결과를 전달합니다.</li>
					<li>&quot;회사&quot;는 다음의 사항을 해당 &quot; 유료서비스&quot;의 이용초기화면이나 그 포장, FAQ 등에 &quot;회원&quot;이 알기 쉽게 표시합니다.<ul>
						<li>유료서비스의 명칭 또는 제호</li>
						<li>유료서비스의 내용, 이용방법, 이용료, 결제방법 기타 이용조건</li>
						<li>이용가능 기기 및 이용에 필요한 최소한의 기술사양</li>
					</ul>
					</li>
				</ol>
				<h3>제11조 (서비스 이용의 중지 또는 계약의 해지)</h3>
				<ol>
					<li>&quot;회원&quot;은 다음 행위를 하여서는 안 됩니다.<ul>
						<li>신청 또는 변경 시 허위내용의 등록</li>
						<li>타인의 정보도용</li>
						<li>&quot;회사&quot;에 게시된 정보의 변경</li>
						<li>&quot;회사&quot;가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
						<li>&quot;회사&quot;와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
						<li>&quot;회사&quot; 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
						<li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 &quot;회사&quot;에 공개 또는 게시하는 행위</li>
						<li>검색엔진 스팸, 도어웨어 페이지, 타 서비스와 매우 유사한 페이지 등 내용이 현저히 저급하거나 빈약하고 사용자에게 뚜렷한 부가 가치를 제공하지 않는 행위</li>
						<li>회사에서 별도 규정한 콘텐츠 원칙에 어긋나거나, 성격에 부합하지 않는 행위</li>
						<li>기타 불법적이거나 부당한 행위</li>
					</ul>
					</li>
					<li>&quot;회원&quot;은 관계법, 본 약관의 규정, 이용안내 및 &quot;서비스&quot;와 관련하여 공지한 주의사항, &quot;회사&quot;가 통지하는 사항 등을 준수하여야 하며, 기타 &quot;회사&quot;의 업무에 방해되는 행위를 하여서는 안 됩니다.</li>
				</ol>
				<h3>제12조 (서비스의 제공 등)</h3>
				<ol>
					<li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
					<li>&quot;회사&quot;는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 &quot;회사&quot;는 제9조(&quot;회원&quot;에 대한 통지)에 정한 방법으로 &quot;회원&quot;에게 통지합니다. 다만, &quot;회사&quot;가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</li>
					<li>&quot;회사&quot;는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공시한 바에 따릅니다.</li>
					<li>사업종목의 전환, 사업의 포기 등의 이유로 &quot;유료서비스&quot;를 제공할 수 없게 되는 경우에는 &quot;회사&quot;는 제9조(회원에 대한 통지)에서 정한 방법으로 &quot;회원&quot;에게 통지하고 당초 &quot;회사&quot;에서 제시한 조건에 따라 &quot;회원&quot;에게 보상합니다.</li>
				</ol>
				<h3>제13조 (서비스의 변경)</h3>
				<ol>
					<li>&quot;회사&quot;는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다. 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등은 그 변경 전 7일 이상 해당 서비스 초기화면에 게시하여야 합니다.</li>
					<li>&quot;회사&quot;는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</li>
					<li>&quot;유료서비스&quot;의 변경 내용이 중대하거나 &quot;회원&quot;에게 불리한 경우에는 &quot;회사&quot;가 해당 &quot;유료서비스&quot;를 제공받는 &quot;회원&quot;에게 제9조(회원에 대한 통지)에서 정한 방법으로 &quot;회원&quot;에게 통지합니다. 이때, &quot;회사&quot;는 동의를 거절한 &quot;회원&quot;에 대해서는 변경 전 서비스를 제공합니다. 다만, 그러한 서비스 제공이 불가능할 경우 해당 서비스의 제공을 중지하거나 계약을 중단할 수 있으며 이 경우 환불은 제19조 2항에 따라 진행됩니다.</li>
				</ol>
				<h3>제14조 (정보의 제공)</h3>
				<ol>
					<li>&quot;회사&quot;는 &quot;회원&quot;이 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로 &quot;회원&quot;에게 제공할 수 있습니다. 다만, &quot;회원&quot;은 관련법에 따른 거래관련 정보, 고객센터 답변 등을 제외하고 언제든지 전자우편 등을 통하여 수신 거절을 할 수 있습니다.</li>
					<li>제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 &quot;회원&quot;의 사전 동의를 받아서 전송합니다.</li>
				</ol>
				<h3>제15조 (게시물의 저작권)</h3>
				<ol>
					<li>&quot;회원&quot;이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
					<li>&quot;회원&quot;이 &quot;서비스&quot; 내에 게시하는 &quot;콘텐츠&quot;는 검색결과 내지 &quot;서비스&quot; 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, &quot;회원&quot;은 언제든지 고객센터 또는 &quot;서비스&quot; 내 관리기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.</li>
					<li>&quot;회사&quot;는 제2항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의 동의를 얻어야 합니다.</li>
				</ol>
				<h3>제16조 (게시물의 관리)</h3>
				<ol>
					<li>&quot;회원&quot;의 게시물이 &quot;정보통신망법&quot; 및 &quot;저작권법&quot;등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, &quot;회사&quot;와 &quot;회원&quot;은 관련법에 따라 조치를 취하여야 합니다.</li>
					<li>&quot;회사&quot;는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할 수 있습니다.</li>
				</ol>
				<h3>제17조 (권리의 귀속)</h3>
				<ol>
					<li>&quot;서비스&quot;에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 회원의 게시물 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.</li>
					<li>&quot;회사&quot;는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는 이용권만을 부여하며, &quot;회원&quot;은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.</li>
				</ol>
				<h3>제18조 (&quot;회원&quot;의 계약해제, 해지 등)</h3>
				<ol>
					<li>&quot;회원&quot;은 언제든지 자기 정보 관리 메뉴를 통하여 서비스 탈퇴 신청을 할 수 있으며, &quot;회사&quot;는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.</li>
					<li>&quot;회원&quot;이 계약을 해지할 경우, 관련법 및 개인정보보호정책에 따라 회사가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.</li>
					<li>&quot;회원&quot;이 계약을 해지하는 경우, 본인 계정에 등록된 모든 데이터 일체는 삭제됩니다 .</li>
				</ol>
				<h3>제19조 (환불)</h3>
				<ol>
					<li>&quot;회사&quot;는 약정된 &quot;유료서비스&quot;의 하자를 회사가 보완, 수정할 수 없어 서비스가 이루어지지 않거나 정상적 이용이 불가능한 경우 회원이 결제한 전액을 환불합니다.</li>
					<li>&quot;회사&quot;는 제12조 4항, 제18조 및 제20조에 따른 계약해지가 발생하거나, &quot;회원&quot;이 &quot;유료서비스&quot; 이용계약을 해지할 수 있으나,&nbsp;법적으로 요구되지 않는 한&nbsp;요금은 환불되지 않습니다.</li>
					<li>&quot;회사&quot;는 과오금이 발생한 경우 이용대금의 결제와 동일한 방법으로 과오금 전액을 환불하여야 하며 &quot;회사&quot;가 과오금에 대한 환불을 거부할 경우 &quot;회사&quot;는 정당하게 이용대금이 부과되었음을 입증할 책임을 집니다.</li>
					<li>회사는 결제와 동일한 방법으로 환불을 진행하며, 결제와 동일한 방법으로 환불이 불가능한 때는 이를 사전에 고지합니다. 다만, 수납확인이 필요한 결제수단의 경우에는 수납확인일로부터 3영업일 이내에 이를 환불하도록 합니다.</li>
					<li>환불 진행 시, 환불 금액 정산은 다음과 같은 규칙으로 진행됩니다. @David Ahn<ul>
						<li>할인율 적용은 계약 기간을 정상적인 만기 형태로 이용한다는 전제로 제공된 것이며 중도 환불 시 할인율 적용 금액이 아닌 표준 금액 요금으로 정산됩니다.</li>
						<li>할인율 적용이 아닌 표준 금액의 월 요금 기준으로 일할 계산 후 선납한 이용요금에서 사용된 기간의 금액을 제외한 잔액의 90%를 정산합니다.</li>
						<li>환불 신청일로부터 15일 이내 환불 조치 됩니다.</li>
						<li>환불되지 않는 10%는 고객 귀책 사유로 인해 서비스를 해지한 위약금으로 처리됩니다.</li>
						<li>단, 정산된 환불 잔액의 90%가 0원인 경우 환불하지 않습니다.</li>
					</ul>
					</li>
					<li>미성년자 회원 결제 미성년자 회원이 법정대리인의 동의 없이 계약을 한 경우, 미성년자 본인 또는 법정대리인이 이를 취소할 수 있습니다.</li>
				</ol>
				<h3>제20조 (이용제한 등)</h3>
				<ol>
					<li>&quot;회사&quot;는 &quot;회원&quot;이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 서비스 이용을 경고, 일시정지, 계약해지로 단계적으로 제한할 수 있습니다 .</li>
					<li>&quot;회사&quot;는 전항에도 불구하고, &quot;주민등록법&quot;을 위반한 명의도용 및 결제도용, &quot;저작권법&quot; 및 &quot;컴퓨터프로그램보호법&quot;을 위반한 불법프로그램의 제공 및 운영방해, &quot;정보통신망법&quot;을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 계약해지를 할 수 있습니다. 본 항에 따른 계약해지 시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며, 회사는 이에 대해 별도로 보상하지 않습니다.</li>
					<li>&quot;회사&quot;는 무료회원이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다 .</li>
					<li>회사는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 등에서 정한 바에 의합니다 .</li>
					<li>본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는 &quot;회사&quot;는 제9조[&quot;회원&quot;에 대한 통지]에 따라 통지합니다.</li>
					<li>&quot;회원&quot;은 본 조에 따른 이용제한 등에 대해 &quot;회사&quot;가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.</li>
				</ol>
				<h3>제21조 (책임의 한계)</h3>
				<ol>
					<li>&quot;회사&quot;는 천재지변 또는 이에 준하는 불가항력으로 인하여 &quot;서비스&quot;를 제공할 수 없는 경우에는 &quot;서비스&quot; 제공에 관한 책임이 면제됩니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot; 의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot;이 &quot;서비스&quot;와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</li>
					<li>&quot;회사&quot;는 &quot;회원&quot; 간 또는 &quot;회원&quot;과 제3자 상호간에 &quot;서비스&quot;를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.</li>
					<li>&quot;회사&quot;는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</li>
					<li>&ldquo;회사&quot;는 &quot;회원&quot;이 &quot;서비스&quot;를 이용하여 기대하는 수익을 보장하지 않습니다. 또한 이와 관련된 손해는 배상하지 않습니다.</li>
				</ol>
				<h3>제22조 (준거법 및 재판관할)</h3>
				<ol>
					<li>&quot;회사&quot;와 &quot;회원&quot; 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
					<li>&quot;회사&quot;와 &quot;회원&quot;간 발생한 분쟁에 관한 소송은</li>
				</ol>
			</div>
			:
			stage === 6 ?
			<div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
				<Top>
					<TopInner>
						<img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
							onClick={() => setStage(3)} />
						<span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제 내용 및 확인</span>
						<div style={{ width: "24px", height: "24px" }}></div>
					</TopInner>
				</Top>
				<h1>개인정보 보호 처리 방침</h1>
				<p>첫걸음(이하 &ldquo;회사&rdquo;라 한다)은 귀하의 개인 데이터 프라이버시를 보호하고 존중하며, 관계 법령에 따른 데이터 보호 원칙과 규정을 준수할 것입니다. 개인정보 보호법 제30조에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립 및 공개합니다.</p>
				<p><strong>제1조(이용자 및 법정대리인의 권리와 의무 및 행사방법)</strong></p>
				<p>회사는 이용자의 권리를 보호하고, 이용자는 안전한 이용에 대한 의무를 성실하게 이행하여야 합니다.</p>
				<p><strong>이용자 권리</strong></p>
				<ul>
					<li>이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다. 이에 따른 권리 행사는 회사에 대해 이메일, 전화를 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다. 또한 이에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있으며, 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
					<li>개인정보 열람요구</li>
					<li>오류 등이 있을 경우 정정 요구</li>
					<li>삭제요구</li>
					<li>처리정지 요구</li>
					<li>이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 개인정보를 이용하거나 제공하지 않습니다.</li>
					<li>회사는 이용자 권리에 따른 열람의 요구, 정정&middot;삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>
					<li>이용자는 개인정보 보호책임자에게 연락을 취하여 언제든지 개인정보 제공에 관한 동의철회/회원가입해지를 요청할 수 있습니다.</li>
					<li>14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다.</li>
				</ul>
				<p><strong>이용자 의무</strong></p>
				<ul>
					<li>이용자의 부정확한 정보의 입력으로 인해 발생하는 사고의 책임은 이용자에게 있으며, 타인의 정보를 도용하는 등 허위 정보를 입력할 경우 이용 자격이 상실될 수 있음을 알립니다.</li>
				</ul>
				<p><strong>제2조(개인정보 보호책임자)</strong></p>
				<p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
				<ul>
					<li>개인정보 보호책임자</li>
				</ul>
				<p>성명 : 안효상 대표</p>
				<p>소속 : 첫걸음</p>
				<p>연락처 : 010-6352-9496 (변경 예정) , <a href="mailto:firststep.helper@gmail.com">firststep.helper@gmail.com</a>&nbsp; @David Ahn</p>
				<p>이용자께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.</p>
				<p><strong>제3조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)</strong></p>
				<p><strong>쿠키(cookie)란</strong></p>
				<ul>
					<li>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 &lsquo;쿠키(cookie)&rsquo;를 사용합니다.</li>
					<li>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</li>
				</ul>
				<p><strong>쿠키의 사용목적</strong></p>
				<ul>
					<li>이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
				</ul>
				<p><strong>쿠키의 설치운영 및 거부 방법</strong></p>
				<ul>
					<li>웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다. (쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.)</li>
					<li>Internet Explorer의 경우 웹 브라우저 상단의 &ldquo;도구&rdquo;메뉴&gt; &ldquo;인터넷 옵션&rdquo; 메뉴&gt; &ldquo;개인정보&rdquo;메뉴의 옵션에서 직접 설정</li>
					<li>Chrome의 경우 웹 브라우저 우측 상단의 &ldquo;아이콘 &rdquo;선택 &gt; &ldquo;설정&rdquo; 선택 &gt; 화면 하단의 &ldquo;고급 설정 표시&rdquo; 선택 &nbsp;&gt; 개인정보 섹션의 &ldquo;콘텐츠 설정&rdquo; &gt; 쿠키 섹션에서 직접 설정</li>
				</ul>
				<p><strong>제4조(개인정보의 수집 및 이용 목적, 수집하는 개인정보의 항목 및 수집방법, 보유기간)</strong></p>
				<p>개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 주민등록번호 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.</p>
				<p><strong>개인정보 이용 목적</strong></p>
				<ul>
					<li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
					<li>서비스 가입/변경/해지 처리, 본인확인, 개인식별, 가입의사확인, 회원 계정 가입 처리 안내 등의 고지사항전달, 서비스제공관련 안내, 명의도용 방지를 위한 등록된 이동전화로 가입사실 통보, 이용요금 고지 결제 및 추심, 금융거래 본인 인증 및 금융 서비스</li>
					<li>회원 관리를 위해 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 불만처리 등 민원처리, 고지사항 전달</li>
					<li>마케팅 및 광고에 활용 동의한 회원에 한하여 광고, 이벤트, 프로모션 경품 시행 및 당첨회원에 대한 물품배송, 이벤트 당첨자 포인트(사이버 머니) 제공, 기타 신규 서비스 개발 및 특화 내용 광고성 정보 전달 시 활용</li>
					<li>기타 개인정보처리방침에 고지된 수탁자에게 서비스제공 등 계약의 이행에 필요한 업무의 위탁</li>
				</ul>
				<p>회사는 이용 목적에 맞게 최소한의 개인정보만을 수집하며, 이용자의 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하겠습니다. 또한 이용자에게 동의 받거나 법령에서 정한 보유기간 내에서만 개인정보를 처리∙보유하겠습니다.</p>
				<p>다만, 다음의 어느 하나에 해당하는 경우에는 동의 없이 소비자의 개인정보를 수집&middot;이용할 수 있습니다(「개인정보 보호법」 제39조의3제2항)</p>
				<ul>
					<li>인터넷쇼핑몰의 상품제공을 위한 계약을 이행하기 위해 필요한 개인정보로서 경제적&middot;기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한 경우</li>
					<li>인터넷쇼핑몰의 상품제공에 따른 요금정산을 위해 필요한 경우</li>
					<li>다른 법률에 특별한 규정이 있는 경우</li>
				</ul>
				<table>
					<thead>
						<tr>
							<th>수집 및 이용 목적</th>
							<th>분류</th>
							<th>수집 및 이용 항목</th>
							<th>보유 및 이용 기간</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>회원가입, 서비스 이용, 상담 및 부정거래 기록 확인</td>
							<td>필수</td>
							<td>[회원가입]</td>
							<td><br /></td>
						</tr>
						<tr>
							<td>이름, 휴대전화번호, 이메일주소, 사업자등록증</td>
							<td><br /></td>
							<td><br /></td>
							<td><br /></td>
						</tr>
						<tr>
							<td>[서비스 이용 및 부정거래 기록 확인]</td>
							<td><br /></td>
							<td><br /></td>
							<td><br /></td>
						</tr>
						<tr>
							<td>서비스 이용시간/이용기록, 접수로그, 이용컨텐츠, 접속IP정보, 기기모델명, 브라우저 정보</td>
							<td>회원 탈퇴 요청일로부터 24시간 보관(관계법령에 따라 보존할 필요가 있는 경우 관련법령에서 요구하는 기한까지)</td>
							<td><br /></td>
							<td><br /></td>
						</tr>
						<tr>
							<td>[서비스 이용]</td>
							<td><br /></td>
							<td><br /></td>
							<td><br /></td>
						</tr>
					</tbody>
				</table>
				<ul>
					<li>(본인확인 시) 이름, 생년월일, 성별, CI, DI, 휴대전화번호 | 필수 | &nbsp;| &nbsp;| | 현금영수증 발급 | 필수 | 휴대전화번호, 이메일 | &nbsp;| | 휴대전화번호, 이메일 | 필수 | [구매] 공통: 구매자 이름, 휴대전화번호, 구매정보, 이름, 주소, 이메일 [결제]</li>
					<li>신용카드 결제 시: 카드사명, 카드번호, 유효기간, 이메일(선택)</li>
					<li>현금영수증 발급 시: 휴대전화번호, 이메일 | &nbsp;| | 고객상담 | 필수 | 이름, 휴대폰번호, 이메일 주소 | &nbsp;|</li>
				</ul>
				<p><strong>개인정보 수집 및 이용 등에 관한 동의방법</strong></p>
				<p>회사가 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.</p>
				<ul>
					<li>전자적 방법(웹사이트 포함)으로 회원가입 또는 서비스 이용 시 동의내용 또는 홈페이지에 게시된 동의내용을 확인하신 후 동의버튼을 클릭하는 방법</li>
					<li>서비스 가입/이용/변경 신청서 등 청약내용에 첨부된 개인정보의 수집/이용 위탁 제공 동의의 세부 내용을 숙지하시고 서명하시는 방법</li>
					<li>고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등을 통하는 방법</li>
					<li>우편, 전자우편 또는 팩스를 통해 안내된 동의서(동의내용)에 서명, 날인 후 제출하는 방법</li>
					<li>온∙오프라인에서 진행되는 이벤트∙행사 등을 통한 방법</li>
				</ul>
				<p><strong>개인정보 수집 및 이용의 항목 및 이용기간</strong></p>
				<p>회사는 서비스를 제공하기 위하여 회원서비스 및 제휴사를 통해 이용자의 정보를 수집하고 있습니다. 회사의 회원제 서비스를 이용하시고자 할 경우 다음의 필수정보를 입력해주셔야 합니다.</p>
				<p>필수정보란: 해당 서비스의 본질적 기능을 수행하기 위한 정보</p>
				<p>선택정보란: 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보(선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은 없습니다.)</p>
				<p>수집하는 개인정보는 다음과 같습니다.</p>
				<p>이메일, 휴대폰번호, 이용자 이름(닉네임)이 수집되며, 성별, 서비스 아이디, 사진(메타정보 포함)이 선택적으로 수집됩니다.</p>
				<p>또한, 서비스 이용과정이나 사업처리 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키 정보, 서비스 이용기록, 방문기록, 불량 이용기록등이 자동으로 생성되어 수집될 수 있습니다. 그 외에도 회원이 유료 서비스를 이용하는 과정에서 결제 등을 위하여 불가피하게 필요한 때에는 신용카드 정보와 같이 결제에 필요한 정보가 수집될 수 있습니다.</p>
				<p><strong>제5조(개인정보의 제3자 제공)</strong></p>
				<p>회사는 회원의 개인정보를 제4조(개인정보수집∙이용 목적 및 수집항목 등)에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다. 다만, 아래와 같이 양질의 서비스 제공을 위해 멘토 신청, 멘토링 프로그램, 과외 프로그램 신텅에서 개인정보를 제공받는 자, 제공목적, 제공 항목, 이용 및 보유기간을 회원에게 고지하여 동의를 구한 후 제3자에게 제공합니다.</p>
				<p>회사는 다음과 같이&nbsp;개인정보를 제3자에게 제공하고 있습니다.</p>
				<table>
					<thead>
						<tr>
							<th>제공받는 자</th>
							<th>제공 목적</th>
							<th>제공 항목</th>
							<th>이용 및 보유 기간</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>도다마인드</td>
							<td>멘토 신청, 멘토링 프로그램 등록, 과외 프로그램 등록 서비스의 제공 및 계약의 이행(이용자 및 이용정보 확인), 민원처리 등 소비자 분쟁 해결</td>
							<td>멘토 회원 연락처, 아이디</td>
							<td>개인정보 이용목적 달성 시까지. 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
						</tr>
					</tbody>
				</table>
				<p><strong>제6조(개인정보처리의 위탁)</strong></p>
				<p>회사는 위탁 받은 업체가 개인정보보호 관계 법령을 위반하지 않도록 관리, 감독하고 있으며, 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
				<p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
				<p><strong>[개인정보 국내 위탁]</strong></p>
				<p><strong>위탁에 대한 안전성 확보 및 관리감독에 관한 사항</strong></p>
				<p>회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적, 관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리 및 감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
				<table>
					<thead>
						<tr>
							<th>수탁자</th>
							<th>위탁업무</th>
							<th>개인정보 보유 및 이용기간</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Solapi(솔라피)</td>
							<td>SMS 서비스</td>
							<td>개인정보 이용목적 달성 시까지. 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
						</tr>
						<tr>
							<td>Amazon Web Services Inc</td>
							<td>클라우드 인프라의 관리</td>
							<td>개인정보 이용목적 달성 시까지. 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
						</tr>
						<tr>
							<td>Cloud Type(클라우드타입)</td>
							<td>클라우드 인프라의 관리</td>
							<td>개인정보 이용목적 달성 시까지. 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
						</tr>
					</tbody>
				</table>
				<p><strong>제7조(개인정보의 처리 및 보유기간, 파기 절차 및 파기 방법)</strong></p>
				<p>회사는 법령에 따른 개인정보 보유 및 이용기간 또는 이용자로부터 개인정보를 수집시에 동의받은 개인정보 보유 및 이용기간 내에서 개인정보를 처리하고 보유합니다.</p>
				<ul>
					<li>회사는 최소한의 개인정보 수집 및 이용을 원칙으로 합니다.</li>
					<li>다만, 이용 목적이 달성된 후에도 이용 약관 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정기간동안 보관 후 파기할 수 있습니다.</li>
				</ul>
				<p><strong>개인정보의 파기 절차와 방법</strong></p>
				<ul>
					<li>회사는 이용자의 서비스 해지 등의 요청이 있는 경우 지체없이 파기하며, 관계법령 및 내부 방침에 의해 보유한 경우에도 해당 사유 종료 후 지체없이 파기합니다.</li>
					<li>회사는 파기 사유가 발생한 개인정보를 선정하고 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
					<li>전자적 파일 형태로 기록 및 저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록 및 저장된 개인정보는 분쇄하거나 소각하여 파기합니다.</li>
				</ul>
				<p><strong>이용약관 및 관련 법령에 따라 보관 후 파기하는 이용자 개인정보</strong></p>
				<p>아래 정보는 탈퇴일로부터 24시간 보관 후 파기합니다.</p>
				<ul>
					<li>탈퇴 후 24시간 내 재가입 방지를 위한 정보(본인 인증 정보)</li>
					<li>부정거래 방지를 위한 정보 (고객번호, ID, 탈퇴일시)</li>
				</ul>
				<p><strong>해당 사유 종료시까지 보관 후 파기하는 정보</strong></p>
				<ul>
					<li>회사와 이용자간 민원, 소송 등 분쟁 과정 중 법률로 정한 보유기간이 경과한 경우 분쟁 해결시까지 보관 후 파기</li>
					<li>회사가 개별적으로 이용자의 동의를 받은 경우 동의받은 기간까지 보관 후 파기</li>
					<li>정산이 남아 있는 경우 예약 정보를 정산 완료된 후 법률로 정한 보유기간 동안 보관 후 파기</li>
					<li>또한, &ldquo;개인정보 유효기간제&rdquo;에 따라 1년 간 서비스를 이용하지 않는 회원은 별도 분리 보관 후 파기합니다. 이 외에 법령에 따라 일정기간 보관해야 하는 개인정보 및 해당 법령은 아래 표와 같습니다.</li>
					<li>부정거래: 법령, 회사와 이용자 간의 서비스 이용 약관 또는 공서양속 등을 위반하거나 기타 회사, 회원 또는 타인의 권리나 이익을 침해하는 방법이나 내용의 거래</li>
				</ul>
				<p><strong>제8조(개인정보의 안전성 확보조치)</strong></p>
				<p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
				<ul>
					<li>관리적 조치 : 내부관리계획 수립, 시행, 정기적 직원 교육</li>
					<li>기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화</li>
					<li>물리적 조치 : 전산 자료의 접근 통제</li>
				</ul>
				<p><strong>제9조(권익침해 구제 방법)</strong></p>
				<p>정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.</p>
				<ul>
					<li>개인정보 침해신고센터 (한국인터넷진흥원 운영)<ul>
						<li>소관 업무 : 개인정보 침해사실 신고, 상담 신청</li>
						<li>홈페이지 : <a href="http://privacy.kisa.or.kr">privacy.kisa.or.kr</a></li>
						<li>전화 : (국번없이) 118</li>
						<li>주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터</li>
					</ul>
					</li>
					<li>개인정보 분쟁조정위원회<ul>
						<li>소관 업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</li>
						<li>홈페이지 : <a href="http://www.kopico.go.kr">www.kopico.go.kr</a></li>
						<li>전화 : (국번없이) 1833-6972</li>
						<li>주소 : (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층</li>
					</ul>
					</li>
					<li>대검찰청 사이버범죄수사단 : 02-3480-3573 (<a href="http://www.spo.go.kr">www.spo.go.kr</a>)</li>
					<li>경찰청 사이버안전국 : 182 (<a href="http://cyberbureau.police.go.kr">http://cyberbureau.police.go.kr</a>)</li>
				</ul>
				<p><strong>제10조(개인정보 처리방침 변경 고지)</strong></p>
				<ul>
					<li>이 개인정보 처리방침은 사이트 개설일부터 적용됩니다.</li>
					<li>위 내용에 대한 추가, 삭제 및 수정이 있을 경우에는 시행하는 날로부터 최소 7일 전에 공지사항 등을 통해 이용자에게 설명 드리겠습니다.</li>
				</ul>
			</div>
			:stage === 7 ?
			<div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
				<Top>
					<TopInner>
						<img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
							onClick={() => setStage(3)} />
						<span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제 내용 및 확인</span>
						<div style={{ width: "24px", height: "24px" }}></div>
					</TopInner>
				</Top>
				<h1>마케팅 정보 수신 동의</h1>
				<p><strong>1. 이용 목적</strong></p>
				<p>첫걸음이 운영하는 플랫폼(이하 &ldquo;플랫폼&rdquo;이라고 합니다.) 고객이 &lsquo;마케팅 정보 수신&rsquo;에 동의했을 경우 맞춤형 서비스 및 상품 추천, 각종 행사, 이벤트의 광고성 정보를 알림톡 및 기타 채널을 통해 이용자에게 제공합니다.</p>
				<p><strong>2. 서비스 정보 수신 동의 및 철회 방법</strong></p>
				<p>&quot;플랫폼&rdquo;에서 제공하는 마케팅 정보를 수신하는 것에 동의하지 않으신다면, 언제든지 고객의 의사에 따라 알림톡 상단의 &lsquo;알림톡 받지않기&rsquo; 버튼 또는 SMS 내에 기재된 무료수신거부 유선전화번호로 철회를 요청하실 수 있습니다. 또한, 회원 탈퇴 시에도 마케팅 정보 수신 동의는 철회됩니다.</p>
				<p>개인정보보호법 제22조 제5항에 의해 마케팅 정보 수신에 동의하지 않으시는 경우에도 &quot;플랫폼&rdquo;의 서비스는 이용 가능합니다. 다만, &ldquo;플랫폼&rdquo;의 혜택을 안내 받을 수 있는 서비스는 이용할 수 없습니다. 결제 안내 등 고객에게 의무적으로 안내해야 할 정보성 내용은 수신 동의 여부와 무관하게 제공됩니다.</p>
			</div>
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
										변경하기
									</div>
									:
									<div className={styles.NextBtn}>
										변경하기
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

/* 전체박스 */
const MentorText = styled.div`
width:540px;
height:auto;
display:flex;
justify-content: cneter;
align-items: center;
flex-direction:column;
padding-bottom:100px;
@media screen and (max-width: 540px) {
    width:100%;
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