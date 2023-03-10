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
import MyPageFaQ from './MyPage/MyPageFaQ';
import MentorDetail from './Mentoring/ConsultingDetail';
import ClassDetail from './Mentoring/ClassDetail';
import ConsultingPay from './Mentoring/ConsultingPay';
import ClassPay from './Mentoring/ClassPay';
import ChoiceBank from './Mentoring/ChoiceBank';
import ClassBank from './Mentoring/ClassBank';
import ApplyEnd from './Mentoring/ApplyEnd';
import ClassEnd from './Mentoring/ClassEnd';
import Room from './Message/Room';
import Schedule from './Message/Scheduls';
import Review from './Mentoring/Review';
import Searching from './Common/Searching';
import Total from './Mentoring/Total';
import TotalClass from './Mentoring/TotalClass';
import CheckFirst from './Common/CheckFirst';
import Footer from './Common/Footer';

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
        <Route path="/Main/First" element={<Admin />} />
        <Route path="/Main/Second" element={<Admin />} />



        {/* ???????????? ????????? */}
        <Route path="/Choice" element={<AdminChoice />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Login/Admin" element={<Admin />} />

        {/* ??????????????? ???????????? ?????? */}
        <Route path="/Find/id" element={<Admin />} />
        <Route path="/Find/id/end" element={<FindId />} />
        <Route path="/Find/pw" element={<Admin />} />
        <Route path="/Find/pw/end" element={<Find_pw />} />

        {/* ????????? */}
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/Favorite/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/Favorite/ChoiceUniversity" element={<ChoiceUniversity />} />
        <Route path="/Favorite/ChoiceSecond" element={<ChoiceSecond />} />
        <Route path="/Favorite/Change" element={<FavoriteChange />} />
        <Route path="/Favorite/Change/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/Favorite/Change/ChoiceUniversity" element={<ChoiceUniversity />} />
        <Route path="/Favorite/Change/end" element={<FavoriteChange />} />

        {/* ???????????? ???????????? - ????????? */}
        <Route path="/PostProgram" element={<PostProgram />} />
        <Route path="/PostProgram/class" element={<CreateClass />} />
        <Route path="/PostProgram/class/Second" element={<CreateClassSecond />} />
        <Route path="/PostProgram/class/Third" element={<CreateClassThird />} />
        <Route path="/PostProgram/class/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/PostProgram/class/ChoiceUniversity" element={<ChoiceUniversity />} />

        {/* ???????????? ???????????? - ????????? */}
        <Route path="/PostProgram/tutor" element={<CreateClass />} />
        <Route path="/PostProgram/tutor/Second" element={<CreateClassSecond />} />
        <Route path="/PostProgram/tutor/Third" element={<CreateClassThird />} />
        <Route path="/PostProgram/tutor/ChoiceHigh" element={<ChoiceHigh />} />
        <Route path="/PostProgram/tutor/ChoiceUniversity" element={<ChoiceUniversity />} />
 
        {/* ??????????????? */}
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Mypage/admin" element={<MyPageAdmin />} />
        <Route path="/Mypage/admin/nickname" element={<Admin/>} />
        <Route path="/Mypage/active" element={<MyPageActive />} />
        <Route path="/Mypage/book" element={<MyPageBook />} />
        <Route path="/Mypage/review" element={<MyPageReview />} />
        <Route path="/Mypage/rock" element={<MyPageLock/>} />
        <Route path="/Mypage/pay" element={<MyPagePay/>} />
        <Route path="/Mypage/pay/change" element={<MyPagePay/>} />
        <Route path="/Mypage/FaQ" element={<MyPageFaQ/>} />

        {/* ????????? */}
        <Route path="/Consultng/detail/:id" element={<MentorDetail/>} />
        <Route path="/Consultng/pay/:id" element={<ConsultingPay/>} />
        <Route path="/Consultng/choice/bank/:id" element={<ChoiceBank/>} />
        <Route path="/Consultng/pay/end/:id" element={<ConsultingPay/>} />
        <Route path="/Consultng/end/:id" element={<ApplyEnd/>} />
        
        {/* ????????? */}        
        <Route path="/Class/detail/:id" element={<ClassDetail/>} />
        <Route path="/Class/pay/:id" element={<ClassPay/>} />
        <Route path="/Class/choice/bank/:id" element={<ClassBank/>} />
        <Route path="/Class/pay/end/:id" element={<ClassPay/>} />
        <Route path="/Class/end/:id" element={<ClassEnd/>} />

        {/* ????????? */}
        <Route path="/Chat/:nickname/:id" element={<Room/>} />
        <Route path="/Chat/Class/:nickname/:id" element={<Room/>} />
        <Route path="/Schedule/:id/:name" element={<Schedule/>} />
        <Route path="/Schedule/Class/:id/:name" element={<Schedule/>} />

         {/* ?????? */}
         <Route path="/Consulting/Review/:id/:name" element= {<Review/>} />
         <Route path="/Class/Review/:id/:name" element= {<Review/>} />

         {/* ?????? */}
         <Route path="/Search" element= {<Searching/>} />
         <Route path="/Search/:id" element= {<App/>} />

        {/* ???????????? */}
        <Route path="/Total/Consulting" element= {<Total/>} />
        <Route path="/Total/Class" element= {<TotalClass/>} />
        <Route path="/Check/First" element= {<CheckFirst/>} />

      </Routes>
   
    </Router>

  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
