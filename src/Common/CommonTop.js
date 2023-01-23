import styled from "styled-components";
import { Link } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import { useState , useEffect } from "react";


function CommonTop() {

    const { Login , LoginCancel , LoginCertify } = useStore();
    const [search, setSearch] = useState(''); // 로그인전용 이메일

    // 로그인 유지 검증
  useEffect(() => {
    if (localStorage.getItem('maintail')) {
        LoginCertify();
         // 유저정보
    }
  }, [Login]);


    return (
        <HeaderBox>
            {/* 추후에 이미지 수정 예정 */}
            <Logo>[로고]</Logo>
            <InputBox
                name="search"
                placeholder="검색어을 입력해주세요."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <Magnify src= "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Main/Main_Search.png" alt="search_img"/>
        </HeaderBox>
    );
}

export default CommonTop;

/* 전체박스*/
const HeaderBox = styled.div`
width:540px;
height: 42px;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction:row;
border-bottom: 1px solid #00C563;
position: fixed;
top: 0;
background: white;
@media screen and (max-width: 540px) {
    width: 100%;
	}
`;

/* 검색 */
const InputBox = styled.input`
width: 60%;
height: auto;
border:none;
font-size:14px;
`;


/* 로고*/
const Logo = styled.div`
width: 16%;
height: auto;
`;

/* 검색아이콘 */
const Magnify = styled.img`
width: 20px;
height: auto;
`;
