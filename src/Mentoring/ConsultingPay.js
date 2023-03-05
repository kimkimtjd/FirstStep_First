import { useState, useEffect } from "react";
import styles from "../Common/css/Login.module.css";
import stylesSecond from "../Common/css/Admin.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PayStore from "../Zusatand/Pay";


function ConsultingPay() {

    const navigate = useNavigate();
    const location = useLocation()
    const [data, setData] = useState([]);
    const [certify, setCertify] = useState(true);
    const [certifylook, setCertifylook] = useState(true);
    const [bank, setBank] = useState("");
    const { bank_info, bank_number_function } = PayStore();
    // const [nickname, setNickname] = useState([]);
    // console.log(location.pathname.split('/')[3]

    // 컨설팅 상세보기
    useEffect(() => {
        if (location.pathname.includes('end')) {
            fetch(`/api/mentor/detail/${location.pathname.split('/')[4]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                    // console.log(data)
                });
        }
        else {
            fetch(`/api/mentor/detail/${location.pathname.split('/')[3]}`, {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data[0])
                    // console.log(data)
                });
        }

    }, [data]);

    // 은행정보
    useEffect(() => {
        if (bank !== "") {
            bank_number_function(bank);
        }
    }, [bank]);



    return (
        <MentorText>
            {certifylook ?
                <>
                    <Top>
                        <TopInner>
                            <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                                onClick={() => navigate(`/Consultng/detail/${data.id}`)} />
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제</span>
                            <div style={{ width: "24px", height: "24px" }}></div>
                        </TopInner>
                    </Top>

                    {/* 결제예정금액 */}
                    <PayBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>결제상품</span>
                        <PayTitle style={{ marginTop: "16px" }}>
                            <span>상품명</span>
                            <span>{data.ProgramName}</span>
                        </PayTitle>
                        <PayTitle style={{ marginTop: "12px", paddingBottom: "16px", borderBottom: "1px solid #DCDCDC" }}>
                            <span>유형</span>
                            <span>클래스/{data.Time}</span>
                        </PayTitle>
                        <PayValue>
                            <span style={{ fontSize: "14px", fontWeight: "700" }}>총 결제예정 금액</span>
                            <span style={{ fontSize: "24px", fontWeight: "700" }}>{data.Value}원</span>
                        </PayValue>
                    </PayBox>

                    <Devinder />

                    {/* 결제금액 */}
                    <PayBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>결제방식</span>
                        <PayTitle style={{ marginTop: "16px" }}>
                            <span>예금주</span>
                            <span>안효상</span>
                        </PayTitle>
                        <PayTitle style={{ marginTop: "12px", paddingBottom: "16px", paddinBottom: "24px" }}>
                            <span>입금계좌</span>
                            <span>기업은행/5080-4566-1010-14</span>
                        </PayTitle>
                    </PayBox>

                    <Devinder />

                    {/* 입금자 정보 확인 */}
                    <PayBox style={{ paddingBottom: "32px" }}>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>입금자 정보확인</span>
                        <PayTitle style={{ marginTop: "16px" }}>
                            <span>입금은행</span>
                            {location.pathname.includes('end') ?
                                <span style={{ color: "#00C563" }} onClick={() => navigate(`/`)}>{bank_info}</span>
                                :
                                <span style={{ color: "#00C563" }} onClick={() => navigate(`/Consultng/choice/bank/${data.id}`)}>은행을 선택해주세요</span>
                            }
                        </PayTitle>
                        <PayTitle style={{ marginTop: "12px", paddingBottom: "16px", paddinBottom: "24px", flexDirection: "column" }}>
                            <span>예금주명</span>
                            <input style={{ width: "100%", height: "56px", marginTop: "16px", border: "1px solid #DCDCDC", borderRadius: "8px" }}
                                onChange={(e) => setBank(e.target.value)}
                                value={bank}
                                placeholder="예금주명을 입력해주세요"
                                type="text"
                            />
                        </PayTitle>
                        <PayTitle style={{ marginTop: "16px" }}>
                            <span>입금기한</span>
                            <span style={{ color: "#00C563" }}>신청후 24시간이내</span>
                        </PayTitle>
                    </PayBox>

                    <Devinder />

                    <PayCertify>
                        {certify ?
                            <div style={{ width: "24px", height: "24px", marginRight: "4px", border: "1px solid #DCDCDC" }} onClick={() => setCertify(!certify)} />
                            :
                            <img style={{ width: "16px", height: "auto", marginRight: "4px", }}
                                src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg"
                                onClick={() => setCertify(!certify)} />
                        }
                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#515151", cursor: "pointer" ,textDecoration:"underline" }} onClick={() => setCertifylook(false)}>결제내용 확인 및 동의</span>
                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#00C563" }}>(필수)</span>
                    </PayCertify>


                    {/* 버튼 */}
                    <ProfileBtn onClick={() => navigate(`/Consultng/end/${data.id}`)}>
                        확인
                    </ProfileBtn>
                </>
                :
                <>
                    <Top>
                        <TopInner>
                            <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
                                onClick={() => setCertifylook(true)}/>
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>결제 내용 및 확인</span>
                            <div style={{ width: "24px", height: "24px" }}></div>
                        </TopInner>
                    </Top>
                    <div style={{ width: "90%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
                        <span style={{ color: "rgba(17, 17, 17, 0.8)", fontSize: "24px", fontWeight: "700", marginTop: "24px" }}>결제 내용 확인 및 동의</span>
                        <p><strong>첫걸음 및 제반 서비스 이용과 관련하여 필요한 사항을 규정합니다.</strong></p>
                        <h3>제1조 (목적)</h3>
                        <p>이 약관은 (주)첫걸음 (이하 &quot;회사&quot;)이 제공하는 멘토링 서비스 및 관련 제반 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                        <h3>제2조 (정의)</h3>
                        <p>이 약관에서 사용하는 용어는 아래와 같습니다.</p>
                        <ol>
                            <li>&quot;회원&quot;이라 함은 회사의 &quot;서비스&quot;에 접속하여 이 약관에 따라 &quot;회사&quot;와 이용계약을 체결하고 &quot;회사&quot;가 제공하는 &quot;서비스&quot;를 이용하는 고객을 말합니다.</li>
                            <li>&quot;아이디(ID)&quot;라 함은 &quot;회원&quot;의 식별과 서비스 이용을 위하여 &quot;회원&quot;이 정하고 &quot;회사&quot;가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
                            <li>&quot;비밀번호&quot;라 함은 &quot;회원&quot;이 부여 받은 &quot;아이디와 일치되는 &quot;회원&quot;임을 확인하고 비밀보호를 위해 &quot;회원&quot; 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
                            <li>&quot;유료서비스&quot;라 함은 &quot;서비스&quot; 중 &quot;회사&quot;가 유료로 제공하는 멘토링 서비스 및 제반 서비스를 의미합니다.</li>
                            <li>&quot;게시물&quot; 혹은 &quot;콘텐츠&quot;이라 함은 회원이 멘토링 서비스를 이용함에 있어 서비스상에 게시한 부호ᆞ문자ᆞ음성ᆞ음향ᆞ화상ᆞ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
                        </ol>
                        <h3>제3조 (약관의 게시와 개정)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 이 약관의 내용을 &quot;회원&quot;이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
                            <li>&quot;회사&quot;는 &quot;약관의규제에관한법률&quot;, &quot;정보통신망이용촉진및정보보호에관한법률(이하 &quot;정보통신망법&quot;)&quot; 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                        </ol>
                        <h3>제4조 (약관의 해석)</h3>
                        <ol>
                            <li>회사는 개별 서비스에 대해서는 별도의 이용약관 및 정책(&quot;기타 약관 등&quot;이라 함)을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 &quot;기타 약관 등&quot;이 우선하여 적용됩니다.</li>
                            <li>이 약관에서 정하지 아니한 사항이나 해석에 대해서는 &quot;기타 약관 등&quot; 및 관계법령 또는 상관례에 따릅니다.</li>
                        </ol>
                        <h3>제5조 [이용계약 체결]</h3>
                        <ol>
                            <li>이용계약은 &quot;회원&quot;이 되고자 하는 자(이하 &quot;가입신청자&quot;)가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 &quot;회사&quot;가 이러한 신청에 대하여 승낙함으로써 체결됩니다.</li>
                            <li>&quot;회사&quot;는 &quot;가입신청자&quot;의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, &quot;회사&quot;는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.<ul>
                                <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                                <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                                <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                                <li>14세 미만 아동이 정보통신망 이용촉진 및 정보보호등에 관한 법률에서 정한 &quot;개인정보&quot; 입력 시 법정대리인(부모 등)의 동의를 얻지 아니한 경우</li>
                                <li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                            </ul>
                            </li>
                            <li>&quot;회원&quot;이 유료서비스를 이용하는 경우 이용대금을 납부한 후 서비스를 이용하는 것을 원칙으로 하며, 유료서비스 이용계약의 성립시기는 &quot;구매완료&quot;를 신청절차 상에서 표시한 시점으로 합니다.</li>
                            <li>&quot;회사&quot;는 만 20세 미만의 미성년회원이 유료서비스를 이용하고자 하는 경우에 부모 등 법정대리인의 동의를 얻거나, 계약체결 후 추인을 얻지 않으면 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있다는 내용을 계약체결 전에 고지하는 조치를 취합니다.</li>
                            <li>&quot;회사&quot;는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
                            <li>제2항과 제3항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, &quot;회사&quot;는 원칙적으로 이를 가입신청자에게 알리도록 합니다.</li>
                            <li>이용계약의 성립 시기는 &quot;회사&quot;가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot;에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.</li>
                        </ol>
                        <h3>제6조 (회원정보의 변경)</h3>
                        <ol>
                            <li>&quot;회원&quot;은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디 등은 수정이 불가능합니다.</li>
                            <li>&quot;회원&quot;은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 &quot;회사&quot;에 대하여 그 변경사항을 알려야 합니다.</li>
                            <li>제2항의 변경사항을 &quot;회사&quot;에 알리지 않아 발생한 불이익에 대하여 &quot;회사&quot;는 책임지지 않습니다.</li>
                        </ol>
                        <h3>제7조 (개인정보보호 의무)</h3>
                        <p>&quot;회원이&quot; &quot;회사&quot;의 &quot;서비스&quot;에 제공하는 정보 일체는 개인정보처리방침에 따르며, &quot;회사&quot;가 귀하의 정보를 수집 및 이용하는 행위는 동 정책에 따라 규율됩니다. &quot;회원&quot;은 본 서비스를 이용함으로써 &quot;회사&quot;가 &quot;회원&quot;의 정보를 수집 및 이용(개인정보처리방침에서 규정하는 바와 같음)하는 것에 동의하는 것으로 간주된다는 사실을 인지하고 있습니다. &quot;회원&quot;에게 본 서비스를 제공하는 것의 일환으로, &quot;회사&quot;는 서비스 관련 공지사항 및 행정적 사안에 관한 메시지를 비롯한 전달사항을 제공할 필요가 있을 수 있습니다.</p>
                        <h3>제8조 (&quot;회원&quot;의 &quot;아이디&quot; 및 &quot;비밀번호&quot;의 관리에 대한 의무)</h3>
                        <p>&quot;회원&quot;은 본 서비스에서 사용하는 비밀번호와 관련된 모든 행동을 보호/관리해야 합니다. &quot;회사&quot;는 귀하의 계정에 비밀번호를 강력한 암호(대문자, 소문자 및 숫자, 기호의 조합)로 설정할 것을 권장합니다. &quot;회사&quot;는 위 사항을 만족하지 못했을 때 일어난 어떠한 손실이나 피해에 대해 책임지지 않습니다. &quot;회사&quot;는 &quot;서비스&quot;를 안전하게 유지하기 위해 최선을 다하고 있지만 안전을 보장할 수는 없습니다.</p>
                        <h3>제9조 (&quot;회원&quot;에 대한 통지)</h3>
                        <ol>
                            <li>&quot;회사&quot;가 &quot;회원&quot;에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 &quot;회원&quot;이 지정한 전자우편주소, 서비스 내 전자메모 및 쪽지 등으로 할 수 있습니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot; 전체에 대한 통지의 경우 7일 이상 &quot;회사&quot;의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</li>
                        </ol>
                        <h3>제10조 (&quot;회사&quot;의 의무)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 관련법과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 &quot;서비스&quot;를 제공하기 위하여 최선을 다하여 노력합니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot;이 안전하게 &quot;서비스&quot;를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고 준수합니다.</li>
                            <li>&quot;회사&quot;는 서비스이용과 관련하여 &quot;회원&quot;으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 &quot;회원&quot;에게 처리과정 및 결과를 전달합니다.</li>
                            <li>&quot;회사&quot;는 다음의 사항을 해당 &quot; 유료서비스&quot;의 이용초기화면이나 그 포장, FAQ 등에 &quot;회원&quot;이 알기 쉽게 표시합니다.<ul>
                                <li>유료서비스의 명칭 또는 제호</li>
                                <li>유료서비스의 내용, 이용방법, 이용료, 결제방법 기타 이용조건</li>
                                <li>이용가능 기기 및 이용에 필요한 최소한의 기술사양</li>
                            </ul>
                            </li>
                        </ol>
                        <h3>제11조 (서비스 이용의 중지 또는 계약의 해지)</h3>
                        <ol>
                            <li>&quot;회원&quot;은 다음 행위를 하여서는 안 됩니다.<ul>
                                <li>신청 또는 변경 시 허위내용의 등록</li>
                                <li>타인의 정보도용</li>
                                <li>&quot;회사&quot;에 게시된 정보의 변경</li>
                                <li>&quot;회사&quot;가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                                <li>&quot;회사&quot;와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                                <li>&quot;회사&quot; 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 &quot;회사&quot;에 공개 또는 게시하는 행위</li>
                                <li>검색엔진 스팸, 도어웨어 페이지, 타 서비스와 매우 유사한 페이지 등 내용이 현저히 저급하거나 빈약하고 사용자에게 뚜렷한 부가 가치를 제공하지 않는 행위</li>
                                <li>회사에서 별도 규정한 콘텐츠 원칙에 어긋나거나, 성격에 부합하지 않는 행위</li>
                                <li>기타 불법적이거나 부당한 행위</li>
                            </ul>
                            </li>
                            <li>&quot;회원&quot;은 관계법, 본 약관의 규정, 이용안내 및 &quot;서비스&quot;와 관련하여 공지한 주의사항, &quot;회사&quot;가 통지하는 사항 등을 준수하여야 하며, 기타 &quot;회사&quot;의 업무에 방해되는 행위를 하여서는 안 됩니다.</li>
                        </ol>
                        <h3>제12조 (서비스의 제공 등)</h3>
                        <ol>
                            <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
                            <li>&quot;회사&quot;는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 &quot;회사&quot;는 제9조(&quot;회원&quot;에 대한 통지)에 정한 방법으로 &quot;회원&quot;에게 통지합니다. 다만, &quot;회사&quot;가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</li>
                            <li>&quot;회사&quot;는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공시한 바에 따릅니다.</li>
                            <li>사업종목의 전환, 사업의 포기 등의 이유로 &quot;유료서비스&quot;를 제공할 수 없게 되는 경우에는 &quot;회사&quot;는 제9조(회원에 대한 통지)에서 정한 방법으로 &quot;회원&quot;에게 통지하고 당초 &quot;회사&quot;에서 제시한 조건에 따라 &quot;회원&quot;에게 보상합니다.</li>
                        </ol>
                        <h3>제13조 (서비스의 변경)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다. 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등은 그 변경 전 7일 이상 해당 서비스 초기화면에 게시하여야 합니다.</li>
                            <li>&quot;회사&quot;는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</li>
                            <li>&quot;유료서비스&quot;의 변경 내용이 중대하거나 &quot;회원&quot;에게 불리한 경우에는 &quot;회사&quot;가 해당 &quot;유료서비스&quot;를 제공받는 &quot;회원&quot;에게 제9조(회원에 대한 통지)에서 정한 방법으로 &quot;회원&quot;에게 통지합니다. 이때, &quot;회사&quot;는 동의를 거절한 &quot;회원&quot;에 대해서는 변경 전 서비스를 제공합니다. 다만, 그러한 서비스 제공이 불가능할 경우 해당 서비스의 제공을 중지하거나 계약을 중단할 수 있으며 이 경우 환불은 제19조 2항에 따라 진행됩니다.</li>
                        </ol>
                        <h3>제14조 (정보의 제공)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 &quot;회원&quot;이 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로 &quot;회원&quot;에게 제공할 수 있습니다. 다만, &quot;회원&quot;은 관련법에 따른 거래관련 정보, 고객센터 답변 등을 제외하고 언제든지 전자우편 등을 통하여 수신 거절을 할 수 있습니다.</li>
                            <li>제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 &quot;회원&quot;의 사전 동의를 받아서 전송합니다.</li>
                        </ol>
                        <h3>제15조 (게시물의 저작권)</h3>
                        <ol>
                            <li>&quot;회원&quot;이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
                            <li>&quot;회원&quot;이 &quot;서비스&quot; 내에 게시하는 &quot;콘텐츠&quot;는 검색결과 내지 &quot;서비스&quot; 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, &quot;회원&quot;은 언제든지 고객센터 또는 &quot;서비스&quot; 내 관리기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.</li>
                            <li>&quot;회사&quot;는 제2항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의 동의를 얻어야 합니다.</li>
                        </ol>
                        <h3>제16조 (게시물의 관리)</h3>
                        <ol>
                            <li>&quot;회원&quot;의 게시물이 &quot;정보통신망법&quot; 및 &quot;저작권법&quot;등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, &quot;회사&quot;와 &quot;회원&quot;은 관련법에 따라 조치를 취하여야 합니다.</li>
                            <li>&quot;회사&quot;는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할 수 있습니다.</li>
                        </ol>
                        <h3>제17조 (권리의 귀속)</h3>
                        <ol>
                            <li>&quot;서비스&quot;에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 회원의 게시물 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.</li>
                            <li>&quot;회사&quot;는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는 이용권만을 부여하며, &quot;회원&quot;은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.</li>
                        </ol>
                        <h3>제18조 (&quot;회원&quot;의 계약해제, 해지 등)</h3>
                        <ol>
                            <li>&quot;회원&quot;은 언제든지 자기 정보 관리 메뉴를 통하여 서비스 탈퇴 신청을 할 수 있으며, &quot;회사&quot;는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.</li>
                            <li>&quot;회원&quot;이 계약을 해지할 경우, 관련법 및 개인정보보호정책에 따라 회사가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.</li>
                            <li>&quot;회원&quot;이 계약을 해지하는 경우, 본인 계정에 등록된 모든 데이터 일체는 삭제됩니다 .</li>
                        </ol>
                        <h3>제19조 (환불)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 약정된 &quot;유료서비스&quot;의 하자를 회사가 보완, 수정할 수 없어 서비스가 이루어지지 않거나 정상적 이용이 불가능한 경우 회원이 결제한 전액을 환불합니다.</li>
                            <li>&quot;회사&quot;는 제12조 4항, 제18조 및 제20조에 따른 계약해지가 발생하거나, &quot;회원&quot;이 &quot;유료서비스&quot; 이용계약을 해지할 수 있으나,&nbsp;법적으로 요구되지 않는 한&nbsp;요금은 환불되지 않습니다.</li>
                            <li>&quot;회사&quot;는 과오금이 발생한 경우 이용대금의 결제와 동일한 방법으로 과오금 전액을 환불하여야 하며 &quot;회사&quot;가 과오금에 대한 환불을 거부할 경우 &quot;회사&quot;는 정당하게 이용대금이 부과되었음을 입증할 책임을 집니다.</li>
                            <li>회사는 결제와 동일한 방법으로 환불을 진행하며, 결제와 동일한 방법으로 환불이 불가능한 때는 이를 사전에 고지합니다. 다만, 수납확인이 필요한 결제수단의 경우에는 수납확인일로부터 3영업일 이내에 이를 환불하도록 합니다.</li>
                            <li>환불 진행 시, 환불 금액 정산은 다음과 같은 규칙으로 진행됩니다.<ul>
                                <li>할인율 적용은 계약 기간을 정상적인 만기 형태로 이용한다는 전제로 제공된 것이며 중도 환불 시 할인율 적용 금액이 아닌 표준 금액 요금으로 정산됩니다.</li>
                                <li>할인율 적용이 아닌 표준 금액의 월 요금 기준으로 일할 계산 후 선납한 이용요금에서 사용된 기간의 금액을 제외한 잔액의 90%를 정산합니다.</li>
                                <li>환불 신청일로부터 15일 이내 환불 조치 됩니다.</li>
                                <li>환불되지 않는 10%는 고객 귀책 사유로 인해 서비스를 해지한 위약금으로 처리됩니다.</li>
                                <li>단, 정산된 환불 잔액의 90%가 0원인 경우 환불하지 않습니다.</li>
                            </ul>
                            </li>
                            <li>미성년자 회원 결제 미성년자 회원이 법정대리인의 동의 없이 계약을 한 경우, 미성년자 본인 또는 법정대리인이 이를 취소할 수 있습니다.</li>
                        </ol>
                        <h3>제20조 (이용제한 등)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 &quot;회원&quot;이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 서비스 이용을 경고, 일시정지, 계약해지로 단계적으로 제한할 수 있습니다 .</li>
                            <li>&quot;회사&quot;는 전항에도 불구하고, &quot;주민등록법&quot;을 위반한 명의도용 및 결제도용, &quot;저작권법&quot; 및 &quot;컴퓨터프로그램보호법&quot;을 위반한 불법프로그램의 제공 및 운영방해, &quot;정보통신망법&quot;을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 계약해지를 할 수 있습니다. 본 항에 따른 계약해지 시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며, 회사는 이에 대해 별도로 보상하지 않습니다.</li>
                            <li>&quot;회사&quot;는 무료회원이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다 .</li>
                            <li>회사는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 등에서 정한 바에 의합니다 .</li>
                            <li>본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는 &quot;회사&quot;는 제9조[&quot;회원&quot;에 대한 통지]에 따라 통지합니다.</li>
                            <li>&quot;회원&quot;은 본 조에 따른 이용제한 등에 대해 &quot;회사&quot;가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.</li>
                        </ol>
                        <h3>제21조 (책임의 한계)</h3>
                        <ol>
                            <li>&quot;회사&quot;는 천재지변 또는 이에 준하는 불가항력으로 인하여 &quot;서비스&quot;를 제공할 수 없는 경우에는 &quot;서비스&quot; 제공에 관한 책임이 면제됩니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot; 의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot;이 &quot;서비스&quot;와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</li>
                            <li>&quot;회사&quot;는 &quot;회원&quot; 간 또는 &quot;회원&quot;과 제3자 상호간에 &quot;서비스&quot;를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.</li>
                            <li>&quot;회사&quot;는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</li>
                            <li>&ldquo;회사&quot;는 &quot;회원&quot;이 &quot;서비스&quot;를 이용하여 기대하는 수익을 보장하지 않습니다. 또한 이와 관련된 손해는 배상하지 않습니다.</li>
                        </ol>
                        <h3>제22조 (준거법 및 재판관할)</h3>
                        <ol>
                            <li>&quot;회사&quot;와 &quot;회원&quot; 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
                            <li>&quot;회사&quot;와 &quot;회원&quot;간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다</li>
                        </ol>
                    </div>
                </>
            }
        </MentorText >
    );
}

export default ConsultingPay;

/* 전체박스 */
const MentorText = styled.div`
width:540px;
height:auto;
display:flex;
justify-content: cneter;
align-items: center;
flex-direction:column;
padding-bottom:100px;
@media screen and (max-width: 540px) {
    width:100%;
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

/* 프로그램명 및 설명 */
const ProfileBtn = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 90%;
height: 50px;
background: #00C563;
border-radius: 8px;
color:white;
@media screen and (max-width: 540px) {
	}
`;

/* 입시컨설팅 제목 1번째  */
const Devinder = styled.div`
width: 100%;
height: 14.4px;
background: #F1F2F3;
border-top: 1px solid #DCDCDC;
@media screen and (max-width: 540px) {
    height: 2.6vw;
}
`;

/* 결제상품 */
const PayBox = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction:column;
margin-top:42px;
width: 90%;
height: auto;
@media screen and (max-width: 540px) {
	}
`;

/* 상품명 , 유형 */
const PayTitle = styled.div`
display: flex;
justify-content:space-between;
align-items: flex-start;
flex-direction:row;
width: 90%;
height: auto;
font-weight: 400;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
	}
`;

/* 결제금액 */
const PayValue = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
flex-direction:row;
width: 90%;
height: auto;
font-weight: 400;
font-size: 14px;
color: #515151;
margin-top:16px;
padding-bottom:32px;
@media screen and (max-width: 540px) {
	}
`;

/* 이용약관 */
const PayCertify = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction:row;
width: 90%;
margin-top:16px;
margin-bottom:63px;
height: auto;
@media screen and (max-width: 540px) {
	}
`;
