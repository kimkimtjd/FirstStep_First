import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TemporSaveModal({ onClose }) {

    const navigate = useNavigate();
  const handleClose = () => {
    onClose?.();
    navigate('/');
  };
 
  return (
      <Overlay>
        <ModalWrap>
          <Contents>
            <img src = "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Class+%2C+Tutor/End.png"
            style={{ width:"38px" , height:"38px"}}/>
            <Title>임시저장이 완료되었습니다.</Title>
            <Text>마이페이지에서 확인 가능합니다.</Text>
            <Button onClick={handleClose}>확인</Button>
          </Contents>
        </ModalWrap>
      </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const ModalWrap = styled.div`
width: 312px;
  height: 256px;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
border-radius: 12px;
    display:flex;
	align-items: center;
	justify-content:  center;
`;

const Text = styled.span`
font-weight: 500;
font-size: 16px;
color: #797979;
margin-top:12px;
line-height: 22px;
text-align: center;
`;


const Title = styled.span`
font-weight: 700;
font-size: 20px;
color: #515151;
margin-top:10px;
`;

const Contents = styled.div`
width: 312px;
height: auto;
display:flex;
align-items: center;
justify-content:  center;
flex-direction:column;
`;

const Button = styled.button`
  font-size: 14px;
  width: 272px;
  height: 56px;
  background: #00C563;
  border-radius: 8px;
  border:none;
  display:flex;
    align-items: center;
    justify-content:  center;
    font-weight: 700;
    font-size: 16px;
    color:white;
  cursor: pointer;
  margin-top:24px;
  &:hover {
    background-color: #898989;
  }
`;
export default TemporSaveModal;