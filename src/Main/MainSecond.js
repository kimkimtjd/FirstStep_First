import styled from "styled-components";
import React, { useState } from "react";
import List from "./Second.json"


function MainSecond() {

    const [choice, setChoice] = useState('전체');

    return (
    <>
        <MainBox>

            <Mentor>
                <MentorTitld>경험이 풍부한 멘토 과외</MentorTitld>
                <MentorTitSub>과외로 막막함을 해소하고 시간을 절약하세요.</MentorTitSub>

                <Product>
                    {List.First.map((data, index) => (
                        <ProductBox key = {index}>
                            <Productimg src={data.Job_img} />
                            <Response>
                                <ResponseInnerBox>
                                    <ResponseInner>{data.Mentor}</ResponseInner>
                                    <ResponseInner>{data.Response}</ResponseInner>
                                </ResponseInnerBox>
                            </Response>
                            <Title>{data.Title}</Title>
                            <Content>{data.Contents}</Content>
                        </ProductBox>
                    ))}
                </Product>

            </Mentor>

            {/* 더많은 멘토 보러가기 */}
            <Locate>
                <LocateInner>
                나에게 맞는 과외 찾기 {">"}
                </LocateInner>
            </Locate>

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

/* 메토링리스트 */
const Mentor = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction:column;
width: 90%;
height: auto;
margin-bottom:16px;
@media screen and (max-width: 540px) {
}
`;

/* 메토링제목 */
const MentorTitld = styled.span`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 27.36px;
font-weight: 600;
font-size: 16px;
line-height: 19px;
color: #515151;
margin-bottom:4px;
@media screen and (max-width: 540px) {
    height: 5vw;
}
`;

/* 메토링제목 서브 */
const MentorTitSub = styled.span`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 20.16px;
font-weight: 400;
font-size: 12px;
color: #515151;
margin-bottom:20px;
@media screen and (max-width: 540px) {
    height: 3.7vw;
}
`;

/* 상품리스트 */
const Product = styled.div`
    display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 535.68px;
    @media screen and (max-width: 540px) {
        height: 99.2vw;
    }
`;

/* 개별 상품리스트 전체박스 */
const ProductBox = styled.div`
    width: 90%;
    height: 259.2px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    @media screen and (max-width: 540px) {
        height: 48vw;
    }
`;

/* 개별 상품리스트 이미지 */
const Productimg = styled.img`
    width: 100%;
    height: 129.76px;
    border-radius: 4px;
    margin-bottom:12px;
    @media screen and (max-width: 540px) {
        height: 27.7vw;
    }
`;

/* 멘토링 및 응답 */
const Response = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom:6px;
    @media screen and (max-width: 540px) {
    }
`;

/* 응답 내부 - 77 */
const ResponseInnerBox = styled.div`
    width: 122px;
    height: 20px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    @media screen and (max-width: 540px) {
    }
`;

// 응답 개별
const ResponseInner = styled.div`
    width: 58px;
    height: 20px;
    border: 0.75px solid #DCDCDC;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 9px;
    color: #797979;
    @media screen and (max-width: 540px) {
    }
`;

// 제목
const Title = styled.div`
font-weight: 600;
font-size: 12px;
color: #797979;
margin-bottom:4px;
    @media screen and (max-width: 540px) {
    }
`;

// 내용
const Content = styled.div`
font-weight: 400;
font-size: 8px;
color: #AEAEB2;
height:28px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
    @media screen and (max-width: 540px) {
    }
`;

/* Locate */
const Locate = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction:column;
width: 90%;
height: 105.12px;
@media screen and (max-width: 540px) {
    height: 19.4vw;
}
`;

/* Locate */
const LocateInner = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
width: 100%;
height: 79.56px;
border: 1px solid #00C563;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    height: 13vw;
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
