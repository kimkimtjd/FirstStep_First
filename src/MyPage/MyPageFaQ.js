import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonNavigation from "../Common/CoomonNavigation";
import { useNavigate } from "react-router-dom";
import useStore from "../Zusatand/Admin";
import axios from "axios";

function MyPageFaQ() {

  const navigate = useNavigate();
  const [data, setData] = useState(0);


  // 로그인 유지 검증

  return (

    <>
      <MainBox>
        <Top>
          <TopInner>
            <img src="https://kr.object.ncloudstorage.com/firststep/Main/Main/arrow-left.png" style={{ width: "24px", height: "24px" }}
              onClick={() => data === 0 ? navigate('/Mypage') : setData(0)} />
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3F3F3F" }}>도움말</span>
            <div style={{ width: "24px", height: "24px" }}></div>
          </TopInner>
        </Top>
        {data === 0 ?

          <SecondLine>
            <SecondLineinner>

              <FirstLineinnerborderbottom onClick={() => setData(1)}>
                <span>멘티도움말</span>
                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
              </FirstLineinnerborderbottom>
              <FirstLineinnerborderbottom onClick={() => setData(2)}>
                <span>멘토도움말</span>
                <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/arrow_left+(Stroke).png" style={{ width: "7px", height: "auto" }} />
              </FirstLineinnerborderbottom>

            </SecondLineinner>
          </SecondLine>
          : data === 1 ?
            <>
              <ol>
                <li><strong>컨설팅 및 클래스 신청 후 절차가 어떻게 되나요?</strong></li>
              </ol>
              <p>답: 컨설팅 및 클래스 신청은 &lsquo;신청하기 &rarr; 결제완료 &rarr; 멘토님의 승인 &rarr; 1대1 채팅 &rarr; 매칭&rsquo; 으로 절차가 진행됩니다. 멘토님과 매칭되시면 일정을 조율하여 컨설팅 날짜 및 클래스 첫 수업 날짜를 잡아보세요.</p>
              <ol>
                <li><strong>수업료는 어떻게 결제하나요?</strong></li>
              </ol>
              <p>답: 컨설팅 및 원데이 클래스: 전체수업료를 한 번에 무통장입금으로 결제합니다.</p>
              <p>2회차 이상의 클래스: 전체수업료를 한 번에 결제하지만, 해당 수업료는 첫걸음이 보관하고 있습니다. 첫 수업이 마치고 멘티님의 만족도를 보고 수수료를 제외한 나머지 금액을 익월에 멘토님께 정산합니다.</p>
              <ol>
                <li><strong>결제 방식은 어떻게 되나요?</strong></li>
              </ol>
              <p>답: 현재는 무통장 입금만 지원됩니다. 곧 있으면 간편페이와 카드 결제를 지원하도록 노력하겠습니다🙂</p>
              <ol>
                <li><strong>멘토링 진행 장소와 시간은 어떻게 되나요?</strong></li>
              </ol>
              <p>답: 프로그램 소개에 장소와 시간이 명시되어 있습니다. 자세히 명시 되어있지 않은 경우 멘토와 조율하여 유동적으로 결정할 수 있습니다.</p>
              <p>멘토에게 채팅으로 문의하여 시간을 조율해보세요. 개개인의 스케줄에 딱 맞는 시간을 조율할 수 있다는 것, 1대1로 맞춤형 프로그램을 진행한다는 것이 첫걸음의 가장 큰 장점이니까요.</p>
              <ol>
                <li><strong>멘토들의 프로그램 퀄리티를 신뢰할 수 있을까요?</strong></li>
              </ol>
              <p>답: 저희 첫걸음에서는 멘토에 대한 철저한 사전검증을 하게 되며, 프로필 상의 경력과 자격증에 대한 검수확인 과정을 거치게 됩니다.</p>
              <p>또한 실제 프로그램을 진행한 멘티들의 리뷰와 피드백을 통해 멘토의 평판을 지속적으로 관리합니다. 첫걸음은 계속해서 멘토와 프로그램의 신뢰도를 높일 수 있는 검증 시스템을 만들어 갈 것임을 약속드립니다.</p>
              <ol>
                <li><strong>프로그램 취소는 어떻게 할 수 있나요?</strong></li>
              </ol>
              <p>답: 입시 컨설팅 프로그램은 단순 변심으로 인해 취소가 불가합니다.</p>
              <p>과외 클래스 프로그램은 취소가 가능하나, 첫 프로그램 시작 24시간 전에, 고객센터로 연락주시면 확인하고 도와드리겠습니다. 24시간이 지나면 프로그램 첫 수강일은 취소가 불가능하고, 진행한 것으로 간주합니다.</p>
              <ol>
                <li><strong>클래스</strong> <strong>프로그램 시작 전에 급한 일이 생겼습니다. 환불이 가능할까요?</strong></li>
              </ol>
              <p>답: 첫 수업 24시간 전에 고객센터와 멘토님께 수업 취소 의사를 전달해주신 경우에는 결제된 수업료가 100% 환불됩니다. 자세한 사안은 환불규정을 참고해주세요.</p>
              <p><strong>기타 환불 규정 (클래스)</strong></p>
              <p>수강 기간 또는 수강 진도 1/3 경과 전 - 결제대금의 2/3 환불</p>
              <p>수강 기간 또는 수강 진도 2/3 경과 전 - 결제대금의 1/3 환불</p>
              <p>수강 기간 또는 수강 진도 2/3 경과 후 - 환불 없음</p>
              <ol>
                <li><strong>환불 절차는 어떻게 되나요?</strong></li>
              </ol>
              <p>&ldquo;멘토에게 환불 의사 전달 &gt; 환불 신청 &gt; 담당자 확인 후 환불 접수(환불 신청 후 운영 시간 기준 24시간 이내 완료) &gt; 환불 진행 (무통장 재입금 영업일 기준 5~7일 소요 &gt; 환불 완료&rdquo; 의 절차로 진행됩니다.</p>
              <p><strong>예약 - 환불 정책</strong></p>
              <ul>
                <li>
                  <p>멘티가 지원하고 3시간 내로 결제하지 않으면 자동 지원 취소</p>
                </li>
                <li>
                  <p>멘티가 지원하고 결제하고, 메시지를 보냈는데 멘토가 12시간내 메시지 읽지 않으면 자동 지원 취소</p>
                </li>
                <li>
                  <p>멘토가 시간, 장소를 확정하고 메시지 내에 확정 내용이 뜨면 환불 불가</p>
                </li>
                <li>
                  <p>시간 변경은 멘토/멘티 각 1회 가능, 단 상대방이 추후 메시지를 확인하지 못하고 멘토링 시간이 24시간 내로 남았을 때는 원래 시간 대로 진행, 만약 멘토가 참여하지 못한다면 전액 환불, 멘티가 참여하지 못한다면 환불 불가</p>
                </li>
                <li>
                  <p>멘티가 노쇼했을 때, 멘토는 우선 관리자에게 연락, 10분간 대기하고, 그래도 노쇼를 하면 멘토링 종료, 환불 불가</p>
                </li>
                <li>
                  <p>멘토가 노쇼했을 때, 멘티는 우선 관리자에게 연락, 10분간 대기하고, 그래도 노쇼를 하면 멘토링 종료, 전액 환불(멘토링)</p>
                </li>
                <li>
                  <p>멘토가 노쇼했을 때, 멘토가 해당 회차의 수업에 노쇼 하였을 경우 해당 회차의 수업료를 환불 (총 5회에 결쳐 진행되는 과외 상품의 금액이 25만원일 경우, 멘토의 1회 노쇼 시 5만원 환불) -&gt; 여기서 멘토의 노쇼란 특별한 연락 없이 15분 이상 약속 장소에 나타나지 않는 것을 의미한다</p>
                </li>
              </ul>
              <p>클래스(과외) 프로그램에 관한 결제 - 환불 정책</p>
              <ul>
                <li>
                  <p>클래스 프로그램 선택하고 바로 결제, 3시간 내로 결제하지 않으면 자동 지원 취소</p>
                </li>
                <li>
                  <p>멘티가 지원하고 결제하고, 메시지를 보냈는데 멘토가 12시간내 메시지 읽지 않으면 자동 지원 취소</p>
                </li>
                <li>
                  <p>수강기간 당일날 멘티가 노쇼했을 때, 멘토는 우선 관리자에게 연락, 10분간 대기하고, 그래도 노쇼를 하면 해당 회차 수업은 진행한 것으로 인정, 해당 회차에 관한 비용은 환불 불가</p>
                </li>
                <li>
                  <p>수강기간 당일날 멘토가 노쇼했을 때, 멘티는 우선 관리자에게 연락, 10분간 대기하고, 그래도 노쇼를 하면 해당 회차 수업은 환불, 그리고 남은 회차에 관해서 진행 여부 선택 가능 (수수료를 제외한 전액 환불 가능)</p>
                </li>
              </ul>
            </>
            :
            <>
              <ol>
                <ol>
                  <li><strong>멘토는 누구나 할 수 있나요?</strong></li>
                </ol>
                <li>
                  <p>답: 누구나 멘토로 활동할 수 있습니다.</p>
                  <p>단, 신분증 / 대학교 / 대학원인증 중 1개의 인증으로 신분인증을 해주셔야 합니다.</p>
                  <p>프로그램 등록 후 관리자의 최종 승인이 있어야 홈페이지에 게시되고 신청을 받을 수 있습니다. 관리자는 등록된 프로그램 내용, 이미지, 멘토 프로필 등의 적절성, 사실확인을 검증한 이후 최종 승인을 해드립니다.</p>
                  <ol>
                    <li><strong>수업 등록은 어떻게 하나요?</strong></li>
                  </ol>
                </li>
                <li>
                  <p>답: 수업 등록은 모바일과 PC에서 모두 가능합니다.</p>
                  <p>다만, 모바일에 최적화 되어 있어 최초 등록 시에는 &nbsp;모바일 사용을 권장 드립니다.</p>
                  <p>모바일 : 메인 페이지 &gt; 상단의 &ldquo;멘토 신청하기&ldquo; 버튼 &gt; &ldquo;컨설팅&rdquo; 혹은 &ldquo;클래스&rdquo; 선택 버튼</p>
                  <p>PC : 메인 페이지 &gt; 상단의 &ldquo;멘토 신청하기&ldquo; 버튼 &gt; &ldquo;컨설팅&rdquo; 혹은 &ldquo;클래스&rdquo; 선택 버튼</p>
                  <p><strong>3. 프로그램은 어디서 진행하면 되나요?</strong></p>
                  <p>답: 기본적으로 멘토님께서 멘토링 프로그램 신청폼에 작성해주신 온라인 진행 방식 혹은 오프라인 장소에서 프로그램을 진행해주시면 됩니다.</p>
                  <p>온라인: ZOOM, Google Meet, 1대1 채팅</p>
                  <p>오프라인: (EX. 카페, 스터디룸, 멘토님 개인 장소 등)</p>
                  <p>자유롭게 진행 방식과 장소를 정하여 프로그램을 진행하는 것이 바로 첫걸음의 장점입니다.</p>
                  <ol>
                    <li><strong>수업 등록후 승인까지 얼마나 걸리나요?</strong></li>
                  </ol>
                </li>
                <li>
                  <p>답: 멘토님께서 작성해주신 프로그램 커리큘럼은 첫걸음의 검토단분들이 꼼꼼히 검토하고 있습니다. 프로그램 승인은 먼저 등록해주신 순서대로 진행되고 있으며 영업일 기준 평균 2-3일 정도 소요됩니다.</p>
                  <p>승인 반려 후 재승인 요청 해주시는 경우에도 처음부터 다시 심사가 진행되니 모든 내용을 완벽하게 작성하신 후에 제출해주시는 것이 좋습니다.</p>
                  <ol>
                    <li><strong>멘티가 프로그램을 신청하면 어디서 확인 할 수 있나요?</strong></li>
                  </ol>
                </li>
                <li>
                  <p>답:</p>
                  <p>모바일 : 로그인 &gt; 채팅&gt;추후에 &nbsp;마이 페이지</p>
                  <p>PC : 로그인 &gt; 채팅 &gt; 추후에 마이 페이지</p>
                  <ol>
                    <li><strong>멘티가</strong> <strong>신청한 프로그램을 반려할 때는 어떻게 하나요?</strong></li>
                  </ol>
                </li>
                <li>
                  <p>답: 멘티의 &nbsp;수강신청서를 클릭하여 &ldquo;반려＂버튼을 누르고 멘티가 확인할 반려메시지를 정중하게 작성하고 &ldquo;확인＂버튼을 눌러주시면 반려가 완료됩니다.</p>
                  <p><strong>7. &nbsp; 활동비는 어떻게 받나요?</strong></p>
                  <p>답: 컨설팅과 클래스 모두 프로그램을 진행완료한 후, 익월 15일에 일괄 정산이 됩니다. &nbsp;그러니 꼭 정산 받으실 계좌를 추가해주시고, 정산 내역을 확인해주세요.</p>
                  <p>&lsquo;첫걸음 페이지 -&gt; 마이페이지 -&gt; &nbsp;정산 내역 관리&rsquo;를 통해 확인할 수 있습니다.</p>
                  <p>만약 잘못된 내용이 있거나 이의를 제기하시고 싶다면, 고객센터로 연락주시길 바랍니다.</p>
                  <ol>
                    <li><strong>매칭</strong> <strong>수수료가 있나요? @David Ahn</strong></li>
                  </ol>
                </li>
                <li>
                  <p>온&middot;오프라인 입시 컨설팅은 20%, 온&middot;오프라인 다회차 클래스는 20%입니다.</p>
                  <p>단, 베타 버전때 3개월은 수수료가 무료입니다.</p>
                  <p>※ 첫걸음 매칭 수수료는 부가세를 제외한 활동비에서 계산합니다.</p>
                </li>
              </ol>
            </>
        }
      </MainBox>


    </>
  );
}

export default MyPageFaQ;

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


/* 옵션이 2개 */
const SecondLine = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
height: 190.08px;
@media screen and (max-width: 540px) {
  height: 35.2vw;  
}
`;

/* 옵션이 2개 */
const SecondLineinner = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction:column;
width: 85%;
height: 167.04px;
@media screen and (max-width: 540px) {
  height: 30.9vw;  
}
`;

/* 옵션이 1개 */
const FirstLineinnerborderbottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction:row;
width: 100%;
height: 74.88px;
border-bottom: 1px solid #F1F2F3;
@media screen and (max-width: 540px) {
  height: 13.8vw;  
}
`;

/* 옵션이 1개 */
const FirstLineinnerfirst = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction:row;
width: 100%;
height: 74.88px;
@media screen and (max-width: 540px) {
  height: 13.8vw;  
}
`;