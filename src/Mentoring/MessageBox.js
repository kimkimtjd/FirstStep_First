import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Admin from "../Zusatand/Admin";
import { useEffect, useState } from "react";

function MessageBox({parentFunction}) {

	const location = useLocation();
	const navigate = useNavigate();
	const { Login } = Admin();
    const [message, setMessage] = useState("");

	
		parentFunction(message)
	


	

	return (
		<NavgationBox>
			<Btn>
				<TopInner>
					<Topfirst
						onChange={(e) => setMessage(e.target.value)}
						value={message}
						placeholder="메세지보내기"
						type="text"
					/>
					<img src = "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Chat.png"
					style={{ width:"30px" , height:"auto" , marginLeft:"8px" , marginTop:"12px" }} onClick={() => parentFunction(message)}/>

				</TopInner>
			</Btn>
		</NavgationBox>
	);
}

export default MessageBox;

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
const TopInner = styled.div`
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

