import create from 'zustand' // create로 zustand를 불러옵니다.

const PayStore = create(set => ({

  
   bank_info: "",
   bank_function: (data) => set(({ bank_info:data })),

    /* 은행선택시 */               

   Bank_List:[
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_1.png" , bank:"농협은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_2.png" , bank:"국민은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_3.png" , bank:"카카오뱅크"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_4.png" , bank:"신한은행"},

    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_5.png" , bank:"기업은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_6.png" , bank:"우리은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_7.png" , bank:"대구은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_8.png" , bank:"하나은행"},

    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_9.png" , bank:"새마을은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_10.png" , bank:"부산은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_11.png" , bank:"경남은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_12.png" , bank:"우체국"},

    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_13.png" , bank:"광주은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_14.png" , bank:"SC제일"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_15.png" , bank:"신협은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_16.png" , bank:"케이뱅크"},

    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_17.png" , bank:"씨티은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_18.png" , bank:"수협은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_19.png" , bank:"전북은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_20.png" , bank:"제주은행"},

    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_21.png" , bank:"산업은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_22.png" , bank:"SBI저죽은행"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_23.png" , bank:"NH투자"},
    {img: "https://firststepimage.s3.ap-northeast-2.amazonaws.com/Pay/bank_24.png" , bank:"토스뱅크"},

    
  ],
  //  Bank:"",
  //  BankChoice:(data) => set(({ Bank:data })),
})) 

export default PayStore