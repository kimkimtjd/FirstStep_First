import styled from "styled-components";
import React, { useState } from "react";
import List from "./First.json"

function MainFirst() {

    const KeywordList = ['개발자', '디자이너', 'ProductManager'];
    const [choice, setChoice] = useState('개발자');


    return (
        <>
            <Total>

                {/* 키원드 */}
                <KeywordBox>
                    {KeywordList.map((data, index) => (
                        <>
                            {data === choice ?
                                <KeywordChoice>{data}</KeywordChoice>
                                :
                                <KeywordNo onClick={() => setChoice(data)}>{data}</KeywordNo>
                            }
                        </>
                    ))}
                </KeywordBox>

                {/* 멘토링 리스트 */}
                <Mentor>
                    <MentorTitld>과외가 망설여진다면!</MentorTitld>
                    <MentorTitSub>멘토링으로 간편하게 상담해보세요.</MentorTitSub>
                    {
                        choice === "개발자" ?
                            <>
                                {
                                    List.program.map((data, index) => (
                                        <MentorContent key={index}>
                                            <>
                                                <MentorImg />
                                                <MentorInfo>
                                                    <MentorContentTitle>{data.Title}</MentorContentTitle>
                                                    <MentorContentJob>{data.Job}</MentorContentJob>
                                                    <MentorContentJob>{data.name}&nbsp;&nbsp;{data.Profil}</MentorContentJob>
                                                </MentorInfo>
                                                <MentorRight>
                                                    <MentorRightInner>
                                                        멘토링&nbsp;{data.Mentor}
                                                    </MentorRightInner>
                                                    <MentorRightInner>
                                                        응답률&nbsp;{data.Response}
                                                    </MentorRightInner>
                                                </MentorRight>
                                            </>
                                        </MentorContent>
                                    ))}
                            </>
                            :
                            choice === "디자이너" ?
                                <>
                                    {
                                        List.Design.map((data, index) => (
                                            <MentorContent key={index}>
                                                <>
                                                    <MentorImg />
                                                    <MentorInfo>
                                                        <MentorContentTitle>{data.Title}</MentorContentTitle>
                                                        <MentorContentJob>{data.Job}</MentorContentJob>
                                                        <MentorContentJob>{data.name}&nbsp;&nbsp;{data.Profil}</MentorContentJob>
                                                    </MentorInfo>
                                                    <MentorRight>
                                                        <MentorRightInner>
                                                            멘토링&nbsp;{data.Mentor}
                                                        </MentorRightInner>
                                                        <MentorRightInner>
                                                            응답률&nbsp;{data.Response}
                                                        </MentorRightInner>
                                                    </MentorRight>
                                                </>
                                            </MentorContent>
                                        ))}
                                </>
                                :
                                choice === "ProductManager" ?
                                    <>
                                        {
                                            List.ProductManager.map((data, index) => (
                                                <MentorContent key={index}>
                                                    <>
                                                        <MentorImg />
                                                        <MentorInfo>
                                                            <MentorContentTitle>{data.Title}</MentorContentTitle>
                                                            <MentorContentJob>{data.Job}</MentorContentJob>
                                                            <MentorContentJob>{data.name}&nbsp;&nbsp;{data.Profil}</MentorContentJob>
                                                        </MentorInfo>
                                                        <MentorRight>
                                                            <MentorRightInner>
                                                                멘토링&nbsp;{data.Mentor}
                                                            </MentorRightInner>
                                                            <MentorRightInner>
                                                                응답률&nbsp;{data.Response}
                                                            </MentorRightInner>
                                                        </MentorRight>
                                                    </>
                                                </MentorContent>
                                            ))}
                                    </> : <></>

                    }
                </Mentor>

                {/* 더많은 멘토 보러가기 */}
                <Locate>
                    <LocateInner>
                        나에게 맞는 멘토링 찾기 {">"}
                    </LocateInner>
                </Locate>

                <Devinder />
            </Total>
        
        </>
        );
}

export default MainFirst;

/* 전체박스*/
const Total = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction: column;
width: 100%;
height: auto;
@media screen and (max-width: 540px) {
}
`;

/* 키원드부분 */
const KeywordBox = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: row;
width: 90%;
height: 46px;
margin-bottom:12px;
font-weight: 400;
font-size: 12px;
@media screen and (max-width: 540px) {
    height: 12.2vw;
}
`;

/* 키원드부분 */
const KeywordChoice = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding:6px 10px;
background:#00C563;
color:white;
border-radius: 100px;
margin-right:4px;
@media screen and (max-width: 540px) {
}
`;

/* 키원드부분 */
const KeywordNo = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding:6px 10px;
background:white;
border: 1px solid #DCDCDC;
border-radius: 100px;
margin-right:4px;
cursor:pointer;
@media screen and (max-width: 540px) {
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
    height: 54.97vw;
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
margin-bottom:8px;
@media screen and (max-width: 540px) {
    height: 3.7vw;
}
`;

/* 메토링 내용 */
const MentorContent = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 86px;
border-bottom: 1px solid #F1F2F3;
@media screen and (max-width: 540px) {
    height: 14.4vw;
}
`;

/* 멘토링 이미지 */
const MentorImg = styled.div`
width: 63px;
height: 63px;
background: #D9D9D9;
border-radius: 4px;
margin-right:11.52px;
@media screen and (max-width: 540px) {
    width: 10.6vw;
    height: 10.6vw;
    margin-right:8px;
}
`;

/* 멘토링 정보 */
const MentorInfo = styled.div`
width: 152.64px;
height: 64.8px;
display: flex;
flex-direction: column;
align-items: flex-start;
margin-right:86.5px;
justify-content: center;
@media screen and (max-width: 540px) {
    width:28.2vw;
    height: 11.2vw;
    margin-right:60px;
}
`;

/* 멘토링 제목 */
const MentorContentTitle = styled.span`
font-weight: 600;
font-size: 14px;
color: #797979;
margin-bottom:2px;
@media screen and (max-width: 540px) {

}
`;

/* 멘토링 전공 */
const MentorContentJob = styled.span`
font-weight: 400;
font-size: 10px;
color: #AEAEB2;
margin-bottom:2px;
@media screen and (max-width: 540px) {
}
`;

/* 멘토링 오른쪽 */
const MentorRight = styled.div`
width: 175.68px;
height: 28.8px;
display:flex;
flex-direction:row;
justify-content: space-between;
@media screen and (max-width: 540px) {
    height: 5.3vw;
    width:32.5vw;
}
`;

/* 멘토링 오른쪽 내부*/
const MentorRightInner = styled.div`
width: 83.52px;
height: 28.6px;
display:flex;
justify-content: center;
align-items: center;
border: 0.75px solid #DCDCDC;
border-radius: 4px;
font-weight: 400;
font-size: 9px;
color: #797979;
@media screen and (max-width: 540px) {
    height: 5.3vw;
    width:15.4vw;
}
`;

/* Locate */
const Locate = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction:column;
width: 100%;
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
width: 90%;
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