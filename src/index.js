import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Mentor from './Mentoring/Mentor';
import Alarm from './Alarm/Alarm';
import MyPage from './MyPage/MyPage';
import Login from './Common/Login';
import Admin from './Common/Admin';
import AdminChoice from './Common/AdminChoice';
import FindId from './Common/Find_id';
import Find_pw from './Common/Find_pw';
import Favorite from './Favorite/Favorite';
import ChoiceHigh from './Favorite/ChoiceHigh';
import ChoiceUniversity from './Favorite/ChoiceUniversity';
import FavoriteChange from './Favorite/FavoriteChange';
import ChoiceSecond from './Favorite/ChoiceSecond';
import PostProgram from './Mentoring/PostMentor';
import CreateClass from './Mentoring/CreateClass';
import CreateClassSecond from './Mentoring/CreateClassSecond';
import CreateClassThird from './Mentoring/CreateClassThird';
import MyPageAdmin from './MyPage/MyPageAdminm';
import MyPageActive from './MyPage/MyPageActive';
import MyPageBook from './MyPage/MyPageBook';
import MyPageReview from './MyPage/MyPageReview';
import MyPageLock from './MyPage/MyPageLock';
import MyPagePay from './MyPage/MyPagePay';
import MentorDetail from './Mentoring/ConsultingDetail';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Message" element={<Mentor />} />
        <Route path="/Alarm" element={<Alarm />} />

        {/* 회원가입 로그인 */}
        <Route path="/Choice" element={<AdminChoice />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Login/Admin" element={<Admin />} />

        {/* 아이디찾기 비밀번호 찾기 */}
        <Route path="/Find/id" element={<Admin />} />
        <Route path="/Find/id/end" element={<FindId />} />
        <Route path="/Find/pw" element={<Admin />} />
        <Route path="/Find/pw/end" element={<Find_pw />} />

        {/* 관심사 */}
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/Favorite/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/Favorite/ChoiceUniversity" element={<ChoiceUniversity />} />
        <Route path="/Favorite/ChoiceSecond" element={<ChoiceSecond />} />
        <Route path="/Favorite/Change" element={<FavoriteChange />} />
        <Route path="/Favorite/Change/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/Favorite/Change/ChoiceUniversity" element={<ChoiceUniversity />} />
        <Route path="/Favorite/Change/end" element={<FavoriteChange />} />

        {/* 프로그램 등록하기 - 컨설팅 */}
        <Route path="/PostProgram" element={<PostProgram />} />
        <Route path="/PostProgram/class" element={<CreateClass />} />
        <Route path="/PostProgram/class/Second" element={<CreateClassSecond />} />
        <Route path="/PostProgram/class/Third" element={<CreateClassThird />} />
        <Route path="/PostProgram/class/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/PostProgram/class/ChoiceUniversity" element={<ChoiceUniversity />} />

        {/* 프로그램 등록하기 - 클래스 */}
        <Route path="/PostProgram/tutor" element={<CreateClass />} />
        <Route path="/PostProgram/tutor/Second" element={<CreateClassSecond />} />
        <Route path="/PostProgram/tutor/Third" element={<CreateClassThird />} />
        <Route path="/PostProgram/tutor/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/PostProgram/tutor/ChoiceUniversity" element={<ChoiceUniversity />} />
 
        {/* 마이페이지 */}
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Mypage/admin" element={<MyPageAdmin />} />
        <Route path="/Mypage/admin/nickname" element={<Admin/>} />
        <Route path="/Mypage/active" element={<MyPageActive />} />
        <Route path="/Mypage/book" element={<MyPageBook />} />
        <Route path="/Mypage/review" element={<MyPageReview />} />
        <Route path="/Mypage/rock" element={<MyPageLock/>} />
        <Route path="/Mypage/pay" element={<MyPagePay/>} />

        {/* 컨설팅 상세 */}
        <Route path="/Consultng/detail/:id" element={<MentorDetail/>} />


      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
