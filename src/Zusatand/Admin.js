import create from 'zustand' // create로 zustand를 불러옵니다.

const useStore = create(set => ({

  
  /**************************************** 회원가입 ****************************************/               

  /* 이용약관 클릭시 */               
  Login: true,
  LoginCertify: () => set(({ Login:false })),
  LoginCancel: () => set(({ Login:true })),
  email_total: "",
  email_function: (data) => set(({ email_total:data })),
  password_total: "",
  password_function: (data) => set(({ password_total:data })),


   /* 아이디 비밀번호 변경시 */               
   id: "",
   id_function: (data) => set(({ id:data })),
   pw: "",
   pw_function: (data) => set(({ pw:data })),
   phone: "",
   phone_function: (data) => set(({ phone:data })),
  
 
})) 

export default useStore