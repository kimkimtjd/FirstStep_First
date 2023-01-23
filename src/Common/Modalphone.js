import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Modalphone({ onClose }) {

    const navigate = useNavigate();
  const handleClose = () => {
    onClose?.();
  };
 
  return (
      <Overlay>
        <ModalWrap>
          <Contents>
            <Text>인증번호가 올바르지 않습니다</Text>
            <Button onClick={handleClose}>다시 입력하기</Button>
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
  height: fit-content;
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
margin-bottom:17px;
`;


const Contents = styled.div`
width: 312px;
height: 132px;
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
  &:hover {
    background-color: #898989;
  }
`;
export default Modalphone;