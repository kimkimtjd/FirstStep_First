import { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../Common/css/Login.module.css";
import stylesecond from "../Common/css/Admin.module.css";

import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";
import Favorite from "../Favorite/Favorite";

function MyPagePay() {

  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [bankinfo, setBankinfo] = useState([]);
  const [user, setUser] = useState("");
  const [choice, setChoice] = useState(1);
  const [bank, setBank] = useState("");
  const [bankimg, setBankimg] = useState("");
  const [banknumber, setBanknumber] = useState("");
  const [banknumberfocus, setBanknumberfocus] = useState(true);
  const [bankname, setBankname] = useState("");
  const [banknamefocus, setBanknamefocus] = useState(true);

  const { Bank_List } = useStore();


  // 계좌연결여부 검증
  useEffect(() => {
    fetch(`/api/add/user/find/pay/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.result === "fail") {
          setData(true)
        }
        else {
          setData(false)
          setBankinfo(data[0])
          console.log(bankinfo)
        }
      });

  }, []);

  // 닉네임 정보  
  useEffect(() => {
    fetch(`/api/user/Emailname/${String(localStorage.getItem('id'))}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUser(data.user);
      });

  }, []);

  // 은행선택후
  function Next(a, b) {
    setBank(a)
    setBankimg(b)
    setChoice(3)
  }

  // 계좌번호 입력시  
  function NumberFocus() {
    setBanknumberfocus(false);
    setBanknamefocus(true)
  }

  // 예금주 입력시  
  function NameFocus() {
    setBanknumberfocus(true);
    setBanknamefocus(false)
  }

  // 계좌번호 등록  
  function AdminPay() {
    console.log()
    fetch("/api/add/user/certify/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmailPost: String(localStorage.getItem('id')),
        PayPost: bank + "-" + banknumber + "-" + bankname,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "success") {
          setData(false)
          alert("등록되었습니다.")
        }
      })
  }

  return (

    <>
      <MainBox>
        <Top>
          <TopInner>
            <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
              onClick={() => navigate('/Mypage')} />
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제 수단 관리</span>
            <div style={{ width: "24px", height: "24px" }}></div>
          </TopInner>
        </Top>
        {data ?
          <div style={{ display: "flex", justiftContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "auto" }}>
            {choice === 1 ?
              <>
                <span style={{ fontSize: "16px", fontWeight: "400", color: "#8E8E93", marginTop: "195px" }}>연결된 계좌가 없어요</span>
                <PrePay onClick={() => setChoice(2)}>계좌연결하기</PrePay>
              </>
              : choice === 2 ?
                <div style={{ display: "flex", justiftContent: "center", alignItems: "flex-start", flexDirection: "column", width: "90%", height: "auto" }}>
                  <span style={{ fontSize: "24px", fontWeight: "700", color: "rgba(17, 17, 17, 0.8)" }}>은행을 선택해주세요.</span>
                  <BankBox>
                    {Bank_List.map((data, index) => (
                      <div key={index} style={{ display: "flex", justiftContent: "center", alignItems: "center", marginBottom: "32px" }}
                        onClick={() => Next(data.bank, data.img)}>
                        <img src={data.img} style={{ width: "24px", height: "24px", marginRight: "4px" }} />
                        {data.bank}
                      </div>
                    ))}
                  </BankBox>
                </div>
                :
                <>
                  <div style={{
                    display: "flex", justiftContent: "center", alignItems: "flex-start", flexDirection: "column", width: "90%", height: "auto",
                    marginBottom: "300px"
                  }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ fontSize: "24px", fontWeight: "700", color: "rgba(17, 17, 17, 0.8)" }}>{user}님</span>
                      <span style={{ fontSize: "24px", fontWeight: "400", color: "rgba(17, 17, 17, 0.8)" }}>본인명의의</span>
                    </div>
                    <span style={{ fontSize: "24px", fontWeight: "400", color: "rgba(17, 17, 17, 0.8)" }}>계좌만 등록할 수 있어요.</span>
                    <span style={{ fontSize: "14px", fontWeight: "400", color: "#797979", marginTop: "8px", marginBottom: "42px" }}>가상계좌, 적금, 펀드계좌, 평생계좌는 등록 불가해요.</span>

                    <div className={styles.Email}>
                      <span className={styles.EmailText}>은행선택</span>
                      <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px" }}>
                        <img src={bankimg} style={{ width: "19px", height: "19px", marginRight: "4px" }} />
                        <input
                          className={styles.EmailInput}
                          style={{ fontSize: "16px", color: "#797979", height: "auto" }}
                          value={bank}
                          readOnly
                        />
                      </div>
                    </div>

                    {banknumberfocus ?
                      <div className={styles.Email}>
                        <span className={styles.EmailText}>계좌번호</span>
                        <input
                          className={styles.EmailInput}
                          style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                          onChange={(e) => setBanknumber(e.target.value)}
                          onFocus={(e) => NumberFocus()}
                          value={banknumber}
                        />
                      </div>
                      :
                      <div className={styles.EmailClick}>
                        <span className={styles.EmailText}>계좌번호</span>
                        <input
                          className={styles.EmailInput}
                          style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                          onChange={(e) => setBanknumber(e.target.value)}
                          value={banknumber}
                        />
                      </div>
                    }

                    {banknamefocus ?
                      <div className={styles.Email}>
                        <span className={styles.EmailText}>예금주명</span>
                        <input
                          className={styles.EmailInput}
                          style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                          onChange={(e) => setBankname(e.target.value)}
                          onFocus={(e) => NameFocus()}
                          value={bankname}
                        />
                      </div>
                      :
                      <div className={styles.EmailClick}>
                        <span className={styles.EmailText}>예금주명</span>
                        <input
                          className={styles.EmailInput}
                          style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                          onChange={(e) => setBankname(e.target.value)}
                          value={bankname}
                        />
                      </div>
                    }

                  </div>
                  {banknumber !== "" && bankname !== "" ?
                    <div className={stylesecond.NextBtnOk} onClick={() => AdminPay()}>
                      등록하기
                    </div>
                    :
                    <div className={stylesecond.NextBtn}>
                      등록하기
                    </div>
                  }
                </>
            }
          </div>
          :
          <div style={{ display: "flex", width: "100%", height: "auto", justifyContent: "flex-start", alignItems: "center" , flexDirection:"column"}}>
            <div style={{
              display: "flex", width: "90%", height: "auto", justiftContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "600",
              color: "#333D4B" , marginBottom:"13px"
            }}>
              <img src={Bank_List.filter((e) => bankinfo.pay?.split('-')[0] === e.bank)[0]?.img} style={{ width: "56px", height: "56px" }} />
              {Bank_List.filter((e) => bankinfo.pay?.split('-')[0] === e.bank)[0]?.bank}
            </div>

            <div className={styles.Email} style={{ width:"90%"}}>
              <span className={styles.EmailText}>계좌번호</span>
              <input
                className={styles.EmailInput}
                style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                value={bankinfo.pay?.split('-')[1]}
              />
            </div>

            <div className={styles.Email} style={{ width:"90%"}}>
              <span className={styles.EmailText}>예금주</span>
              <input
                className={styles.EmailInput}
                style={{ fontSize: "16px", color: "#797979", height: "auto", marginLeft: "16px" }}
                value={bankinfo.pay?.split('-')[2]}
              />
            </div>

            <div className={stylesecond.NextBtnOk} style={{ marginTop:"16px"}} onClick={()=> alert('대기중')}>
              결제수단 변경하기
            </div>

          </div>

          
        }


      </MainBox>

    </>
  );
}

export default MyPagePay;

/* 전체박스 */
const MainBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
@media screen and (max-width: 540px) {
		width: 100%;
	}
`;


/* 상단부분 */
const Top = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 60.48px;
margin-bottom:24px;
@media screen and (max-width: 540px) {
    height:11.2vw;
	}
`;

/* 상단부분 내부 */
const TopInner = styled.div`
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
width: 90%;
height: 60.48px;
@media screen and (max-width: 540px) {
    height:11.2vw;
	}
`;

/* 계좌연결하기 */
const PrePay = styled.div`
display:flex;
justify-content:center;
align-items: center;
width: 90%;
height: 50px;
background: #FFFFFF;
margin-top:25px;
border: 1px solid #DCDCDC;
border-radius: 8px;
@media screen and (max-width: 540px) {
	}
`;

/* 계좌연결하기 */
const BankBox = styled.div`
display: grid;
grid-template-rows:1fr ;
grid-template-columns:1fr 1fr;
align-items: center;
width: 100%;
height: auto;
margin-top:32px;
font-weight: 600;
font-size: 14px;
color: #333D4B;
@media screen and (max-width: 540px) {
	}
`;
