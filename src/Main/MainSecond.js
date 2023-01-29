import styled from "styled-components";
import React, { useState } from "react";
import List from "./Second.json"


function MainSecond() {

    const [choice, setChoice] = useState(true); // 관심사 선택여부 검증

    
    // 관심사 설정여부 
    return (
    <>
        <MainBox>

           

           

            <Devinder/>
        </MainBox>
    
    </>
        );
}

export default MainSecond;

/* 전체박스*/
const MainBox = styled.div`
display: flex;
justify-content:  center;
align-items: center;
flex-direction: column;
width: 100%;
height: auto;
margin-top: 20px;
margin-bottom: 65px;
media screen and (max-width: 540px) {
    width: 90%;
	}
`;


/* 나누는부분 */
const Devinder = styled.div`
width: 100%;
height: 14.4px;
background: #F1F2F3;
border-top: 1px solid #DCDCDC;
@media screen and (max-width: 540px) {
    height: 2.6vw;
}
`;
