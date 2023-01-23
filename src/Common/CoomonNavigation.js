import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Admin from "../Zusatand/Admin";

function CommonNavigation() {

	const location = useLocation();
	const navigate = useNavigate();
	const { Login } = Admin();


	return (
		<NavgationBox>
			<Btn>
				{/* 홈 */}
				<Btninner>
					{location.pathname === '/' ?
						<div style={{
							color: "#00C563", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => navigate('/')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Home_Active.png" alt="main" />
						</div>
						:
						// 추후에 이미지 변경예정
						<div to="/" style={{
							color: "white", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => navigate('/')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Home.png" alt="main" />
						</div>
					}
				</Btninner>

				{/* 멘토링 */}
				<Btninner>
				{location.pathname === '/Message' ?
						// 추후에 이미지 변경예정				
						<div style={{
							color: "#00C563", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => Login ? alert('로그인후 이용해주세요') : navigate('/Message')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Message_Active.png" alt="main" />
						</div>
						:
						<div style={{
							color: "#D2D2D2", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => Login ? alert('로그인후 이용해주세요') : navigate('/Message')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Message.png" alt="main" />
						</div>
				}
				</Btninner>

				{/* 알림 */}
				<Btninner>
				{location.pathname === '/Alarm' ?
						// 추후에 이미지 변경예정
						<div  style={{
							color: "#00C563", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => Login ? alert('로그인후 이용해주세요') : navigate('/Alarm')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Alarm_Active.png" alt="main" />
						</div>
						:
						<div  style={{
							color: "#D2D2D2", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => Login ? alert('로그인후 이용해주세요') : navigate('/Alarm')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Alarm.png" alt="main" />
						</div>
				}
				</Btninner>

				{/* 마이페이지 */}
				<Btninner>
				{location.pathname.includes('Mypage') ?
						// 추후에 이미지 변경예정
						<div style={{
							color: "#00C563", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => navigate('/Mypage')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Mypage_Active.png" alt="main" />
						</div>
						:
						<div style={{
							color: "#D2D2D2", fontSize: "8px", fontWeight: "600", textDecoration: "none", display: "flex", flexDirection: "column",
							justifyContent: "center", alignItems: "center"
						}} onClick={() => navigate('/Mypage')}>
							<Icon src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_MyPage.png" alt="main" />
						</div>
				}
				</Btninner>
				
			</Btn>
		</NavgationBox>
	);
}

export default CommonNavigation;

/* 전체박스*/
const NavgationBox = styled.div`
width:540px;
height:4em;
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
    height:4em;
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

/* 아이콘 크기 */
const Icon = styled.img`
	width:48px;
	height:auto;
	
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

/* 하단바 개별 */
const Btninner = styled.li`
    list-style: none;
		text-align:center;
		width:100%;
	    width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
`;