import { Link , useNavigate} from "react-router-dom";
import styled from "styled-components";

function AdminChoice() {

    const navigation = useNavigate();

    return (
        <MainBox>

            {/* Header */}
            <HeaderBox>
                <GoMain to='/' >둘러보기</GoMain>
            </HeaderBox>

            {/* 인트로 */}
            <IntroBox>
                <IntroFirst>안녕하세요.<br />첫걸음입니다</IntroFirst>
                <IntroSecond>어쩌구 저쩌구</IntroSecond>
            </IntroBox>

            {/* 로그인 회원가입 선택 */}
            <ChoiceBox>
                <LoginBox onClick={()=> navigation('/Login')}>
                    로그인
                </LoginBox>
                <AdminBox  onClick={()=> navigation('/Login/Admin')}>
                    회원가입
                </AdminBox>
            </ChoiceBox>

        </MainBox>
    );
}

export default AdminChoice;

/* 전체박스*/
const MainBox = styled.div`
width:540px;
height:auto;
z-index:3;
display:flex;
align-items: center;
justify-content:  center;
flex-direction:column;
background-color: white;
@media screen and (max-width: 540px) {
    position:absolute;
    top:0;
    left:0;	
    width:100vw;
    height:auto;
    animation-duration: 0.3s;
	}
`;

/* 헤더부분 전체박스 */
const HeaderBox = styled.div`
width:90%;
height:42px;
display:flex;
justify-content:flex-end;
align-items: center;
margin-bottom: 35px;
@media screen and (max-width: 540px) {
    height:11.5vw;
	}
`;

/* 둘러보기 */
const GoMain = styled(Link)`
color:#00C563;
font-weight: 400;
font-size: 14px;
text-decoration:none;
`;

/* 인트로부분 */
const IntroBox = styled.div`
width:90%;
height:83px;	
display:flex;
flex-direction: column;
margin-bottom: 32px;
@media screen and (max-width: 540px) {
    height:22.1vw;
	}
`;

/* 인트로 클글자 */
const IntroFirst = styled.div`
width:204px;
display:flex;
align-items: flex-start;
justify-content:  flex-start;
font-weight: 700;
font-size: 24px;
@media screen and (max-width: 540px) {
    width: 55.4vw;
}
`;

/* 인트로 작은글자 */
const IntroSecond = styled.span`
width:100%;
height:17px;	
display:flex;
align-items: flex-start;
justify-content:  flex-start;
font-weight: 400;
font-size: 14px;
color: #797979;
margin-top: 8px;
@media screen and (max-width: 540px) {
    height:4.5vw;
}
`;

/* 로그인 회원가입 선택 */
const ChoiceBox = styled.div`
width:89.3%;
height:120px;	
display:flex;
align-items: flex-start;
justify-content:  flex-start;
flex-direction:column;
margin-top: 44px;
@media screen and (max-width: 540px) {
    height:32vw;
}
`;

/* 로그인  */
const LoginBox = styled.div`
width:100%;
height:56px;	
display:flex;
align-items:center;
justify-content:  center;
margin-bottom: 8px;
background: #00C563;
border-radius: 8px;
color:white;
font-weight: 700;
font-size: 16px;
cursor:pointer;
@media screen and (max-width: 540px) {
    height:14.9vw;
}
`;

/* 회원가입 */
const AdminBox = styled.div`
width:100%;
height:56px;	
display:flex;
align-items:center;
justify-content:  center;
background: #E2FFF1;
border-radius: 8px;
color:#00C563;
font-weight: 700;
font-size: 16px;
cursor:pointer;
@media screen and (max-width: 540px) {
    height:14.9vw;
}
`;