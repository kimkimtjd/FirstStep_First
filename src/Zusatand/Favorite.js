import create from 'zustand' // create로 zustand를 불러옵니다.

const FavoriteStore = create(set => ({

  
  HighFirst: [],
  High_inner: (data) => set(({ HighFirst:data })),
 
  UniversityFirst: [],
  University_inner: (data) => set(({ UniversityFirst:data })),

  // 멘토링 신청   
  nameuser:"",
  NameFunction:(data) => set(({ nameuser:data })),

  birthuser:"",
  birthFunction:(data) => set(({ birthuser:data })),

  classHigh:"",
  classHighFunction:(data) => set(({ classHigh:data })),

  classUniverse:"",
  classUniverseFunction:(data) => set(({ classUniverse:data })),

  classkind:"",
  kindFunction:(data) => set(({ classkind:data })),

  Education_List:[ '1학년' , '2학년' , '3학년' , '4학년' , '휴학생' , '졸업(예정)자' , '기타'],
  Education:"",
  EducationFunction:(data) => set(({ Education:data })),

  Advantage:"",
  AdvantageFunction:(data) => set(({ Advantage:data })),

  TitleInput: "",
  TitleFunction: (data) => set(({ TitleInput:data })),

  Subject: "",
  SubjectFunction: (data) => set(({ Subject:data })),

  Recommend: "",
  RecommendFunction: (data) => set(({ Recommend:data })),

  proceed: "",
  proceedFunction: (data) => set(({ proceed:data })),
  
  value: "",
  valueFunction: (data) => set(({ value:data })),


  metro_city_zustand:["전체" , "서울특별시" , "부산광역시" , "대구광역시" , "인천광역시" , "광주광역시" , "대전광역시" , 
    "울산광역시" , "세종특별자치시" , "경기도" , "강원도" , "충청북도" , "충청남도" , "전라북도" , "전라남도" , "경상북도" , "경상남도" , "제주특별자치도"] ,
  High_list:["전체" ,"일반고" ,  "자사고" , "특목고" , "특성화고" , "자공고" , "예고" ,  "기타"],
  Universe_list:["전체" , "2/3년제" , "4년제" , "대학원" ],
  Universe_Choice:["KAIST(카이스트)" , "가톨릭대학교(성신교정)" , "가톨릭대학교(성의교정)" , "감리교신대학교" , "강서대학교" , "건국대학교" , "경기대학교(서울)" ,
                   "경희대학교" , "고려대학교" , "광운대학교" , "국민대학교" , "덕성여자대학교" , "덕성여자대학교(종로)" , "동국대학교" , "동덕여자대학교" , "명지대학교" , 
                "삼육대학교" , "상명대학교" , "서강대학교" , "서경대학교" , "서울과학기술대학교" , "서울교육대학교" , "서울대학교"  , "서울시립대학교" , 
                "서울디지털대학교" , "서울여자대학교" , "서울여자대학교(대학로)" , "서울한영대학교" , "성공회대학교" , "성균관대학교" , "성신여자대학교" , "성신여자대학교(미아운정그린)" , 
                "세종대학교" , "숙명여자대학교" , "숭실대학교" , "연세대학교" , "육군사관대학교" , "이화여자대학교" , "중앙대학교" , "총신대학교" , "추계예술대학교" , "한국방송통신대학교", 
                "한국예술종합학교" , "한국체육대학교" , "한성대학교" , "한성대학교" , "한양대학교" , "홍익대학교" , "가천대학교" , "강남대학교" , "경기대학교" , "단국대학교" ,"대진대학교" ,
                "수원대학교" , "아주대학교" , "용인대학교" , "한경대학교" , "강원대학교" , "경찰대학교" , "공군사관학교" , "공주교육대학교" , "고려대학교(세종)" , "단국대학교(천안)" , "백석대학교" ,
                "중부대학교" , "유원대학교" , "충북대학교" , "홍익대학교(세종)" , "호서대학교" , "군산대학교" , "목포대학교" , "호원대학교" , "제주대학교" ],

   Project : [ "전체" , "학생부 종합" , "학생부 교과" , "논술" , "정시" , "지역균형선발" , "농어촌 전형" , "특기자 전형"],               
   subject : [  "국어" , "영어" , "수학" , "생명과학" , "물리" , "한국사" , "경제" , "정치와 법" , "한국지리" , "세계지리" , "생활과 윤리" , "윤리와 사상" , "동아시아" , "세계사" , 
            "사회 문화" , "제2외국어" , "자소서 첨삭" , "모의면접" , "논술" , "예체능" ,"기타"],
   exam : ["전체" , "자사고/자공고" , "특목고"],
   ProjectChoice:[],
   ProjectChoice_function:(data) => set(({ ProjectChoice:data })),
   subjectChoice:[],
   subjectChoice_function:(data) => set(({ subjectChoice:data })),
   examChoice:[],       
   examChoice_function:(data) => set(({ examChoice:data })),

  
}))  
 
export default FavoriteStore