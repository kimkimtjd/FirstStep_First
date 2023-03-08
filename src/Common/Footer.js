import { useState, useEffect } from "react";
import styles from "./css/Admin.module.css";
import secondstyle from "./css/AdminSecond.module.css";
import Modalphone from "./Modalphone";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import CheckFirst from "./CheckFirst";
import styled from "styled-components";

function Footer() {

	const navigation = useNavigate()


	return (
		<MentorText>
			<Top>
				<span style={{ marginRight:"13px"}} onClick={()=> navigation('/Main/First')}>개인정보 처리방침</span>
				<span onClick={()=> navigation('/Main/Second')}>이용약관</span>
			</Top>
			<Top style={{ marginTop:"13px"}}>
				<span style={{ fontSize:"12px" , fontWeight:"700" , color:"#797979"  , display:"flex" , justifyContent:"flex-start" , alignItems:"center"}}>첫걸음</span>
			</Top>
			<Top  style={{ marginTop:"6px"}}>
				<span style={{ marginRight:"20px"}}>대표자</span>
				<span>안효상</span>
			</Top>
			<Top  style={{ marginTop:"3px"}}>
				<span style={{ marginRight:"20px"}}>주소</span>
				<span>서울특별시 마포구 합정동 81-2, 102호</span>
			</Top>
			<Top  style={{ marginTop:"3px"}}>
				<span style={{ marginRight:"20px"}}>이메일</span>
				<span>firststep.helper@gmail.com</span>
			</Top>
			<Top  style={{ marginTop:"3px"}}>
				<span style={{ marginRight:"20px"}}>전화번호</span>
				<span>010 - 6352-9496</span>
			</Top>
			<Top style={{ marginTop:"13px"}}>
				<span style={{ fontSize:"12px" , fontWeight:"700" , color:"#797979"  , display:"flex" , justifyContent:"flex-start" , alignItems:"center"}}>Customer Service</span>
			</Top>
			<Top  style={{ marginTop:"6px"}}>
				<span style={{ marginRight:"20px"}}>MON-FRI</span>
				<span>10:00 - 18:00</span>
			</Top>
			<Top  style={{ marginTop:"3px"}}>
				<span style={{ marginRight:"20px"}}>LUNCH BREAK</span>
				<span>12:00 - 13:00</span>
			</Top>
			<Top  style={{ marginTop:"10px"}}>
				<img src ="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EC%B9%B4%EC%B9%B4%EC%98%A4.png" style={{ width:"24px" , height:"auto" , filter:"grayscale(100%)" , marginRight:"7px"}} />
				<img src ="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8.png" style={{ width:"24px" , height:"auto" , filter:"grayscale(100%)"}} />
			</Top>
		</MentorText>
	)
}

export default Footer

/* 전체박스 */
const MentorText = styled.div`
width:540px;
height:auto;
display:flex;
justify-content: center;
align-items: center;
flex-direction:column;
background:#EFEFEF;
padding-bottom:83px;
margin-top:42px;
@media screen and (max-width: 540px) {
    width:100%;
}
`;

/* 개인정보 처리방침 및 이용약관 */
const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
width: 90%;
height: auto;
font-style: normal;
font-weight: 400;
font-size: 10px;
color: #797979;
margin-top:24px;
@media screen and (max-width: 540px) {
	}
`;
