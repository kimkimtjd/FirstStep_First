import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate , useLocation } from "react-router-dom";
import styled from "styled-components";

function MentorDetail() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    // console.log(location.pathname.split('/')[3]
    
     // 컨설팅 상세보기
     useEffect(() => {
            fetch(`/api/mentor/detail/${location.pathname.split('/')[3]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                  console.log(data)
                });


    }, [data]);

    return (
        <MentorText>
            컨설팅 상세



        </MentorText>
    );
}

export default MentorDetail;

/* 전체박스 */
const MentorText = styled.div`
width:10%;
height:auto;
margin-top:32px;
display:flex;
justify-content: cneter;
align-items: center;
flex-direction:column;
@media screen and (max-width: 540px) {
    
}
`;

