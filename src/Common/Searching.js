import { useState, useEffect } from "react";
import styles from "./css/Admin.module.css";
import secondstyle from "./css/AdminSecond.module.css";
import Modalphone from "./Modalphone";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import styled from "styled-components";
import stylesSecond from "../Common/css/Admin.module.css";


function Searching() {

	// email password phone
	const [name, setName] = useState(""); // 이름
	const navigation = useNavigate()


	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			navigation(`/Search/${name}`)
		}
	  };
	

	return (
		<>
			<HeaderBox>
				<div style={{
					width: "10%", height: "100%", display: "flex", justifyContent: "center",
					alignItems: "center"
				}}>
					<img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png"
						style={{ width: "16px", height: "16px" }}
					onClick={()=> navigation('/')}/>
				</div>

				<input
					style={{ width: "90%", height: "90%", border: "none" }}
					placeholder="검색어를 입력해주세요."
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<div style={{
					width: "10%", height: "100%", display: "flex", justifyContent: "center",
					alignItems: "center"
				}}>

					<Magnify
						onClick={() => navigation(`/Search/${name}`)}
						onKeyPress={onKeyPress}
						src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Search.png" alt="search_img" />
				</div>

			</HeaderBox>
		</>
	)
}

export default Searching

/* 전체박스*/
const HeaderBox = styled.div`
width:540px;
height: 42px;
display: flex;
justify-content:;
align-items: center;
flex-direction:row;
border-bottom: 1px solid #00C563;
top: 0;
@media screen and (max-width: 540px) {
    width: 100%;
	}
`;

/* 검색아이콘 */
const Magnify = styled.img`
width: 20px;
height: auto;
`;