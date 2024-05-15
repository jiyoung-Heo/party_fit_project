import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore("user", () => {
  //회원가입
  const createUser = function (user) {
    console.log(user);
    axios({
      url: `${REST_USER_API}/signup`,
      method: "POST",
      data: user,
    })
      .then(() => {
        // console.log("store" + user)/
        console.log(user)
        window.alert('회원가입 성공')
        router.push({ name: "home" }); 
      })
      .catch((err) => {});
  };



  //로그인
  const userLogin = function (id,pw) {
    const user = {
      loginId: id,
      password: pw,
    };
    console.log("login" + user);

    axios({
      url: `${REST_USER_API}/login`,
      method: "POST",
      data: user,
    })
      .then((res) => {

        sessionStorage.setItem('access-token', res.data["access-token"]);
        const token = res.data["access-token"].split('.')
        let userId = JSON.parse(atob(token[1])).userId;
        loginUser.value = userId;
        console.log(loginUser.value);
        sessionStorage.setItem('loginUser', userId)
        window.alert('로그인 성공')
        
        // router.push({name:"home"})
      })
      .catch((error) => {
        // 요청이 실패한 경우에 실행되는 코드
        console.log(loginUser);
        window.alert('로그인 실패')
        console.error("로그인 실패 : ", error);
        router.replace("login");
      });
  };

  //로그아웃
  const userLogout = function () {
    axios.post(`${REST_USER_API}/logout`).then((res) => {
      // console.log(time);
      loginUser.value = "";
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('loginUser');
      router.push({ name: "home" })
      window.alert('로그아웃')

    }
    );
  };

  //회원정보수정
  const updateUser = function(user){
    console.log(user.userId);
    axios({
      url: `${REST_USER_API}/${user.userId}`,
      method: "PUT",
      data: user,
    })
    .then((res)=>{
      window.alert('누가 로그인 돼있는지 ')
      console.log(res.data)
      router.push({name : "mypage"})
    })
  }

  //비밀번호 확인
  const isPW = function(pw){
    //비밀번호 맞는지 확인하고 true false 반환
  }

  const findedId = ref("")
  const findLoginID = function(user){
    console.log(user.email);
    
    axios({
      url: `${REST_USER_API}/find-id`,
      method: "GET",
      params: {
        email: user.email,
        name: user.name,
      }
    })
   .then((res)=>{
      // console.log(res.data);
      findedId.value = res.data.loginId;
    })
    .catch((err)=>{
      // console.log(err);
      findedId.value = "";
      window.alert("아이디찾기 실패")
    })
  }

  const loginUser = ref({});
  const getUser = async function(userId) {
    try {
      const res = await axios({
        url: `${REST_USER_API}/${userId}`,
        method: "GET",
        params: {
          userId: userId,
        }
      });
      loginUser.value = res.data;
    }catch (err) {
      console.log(err);
      window.alert("회원정보 가져오기 실패");
    }
  };

//아이디 중복 검사 
  const Msg = ref()
  const isValidId = function(loginId){
    return new Promise((resolve, reject) => {

 

    axios({
      url: `${REST_USER_API}/confirmId`,
      method: "POST",
      data: {loginId: loginId} ,
    }) 
    .then((res)=>{ 
      // console.log(res.data)
      console.log(res.data == "1")
      if(res.data == "1"){
        resolve(true)
      }else{
        resolve(false)
      }
      // console.log(res+"사용가능")
      // Msg.value = "사용가능한 아이디입니다"
      // return "사용가능한 아이디입니다."
    })
    .catch((err)=>{
      // if()
      console.log(err +"사용안가능")
      Msg.value = "중복된 아이디입니다"

    } )

  })
    
  }


/*

{"userId":5,"name":"13","loginId":"13",
"password":"13","username":"13","email":"13",
"profile":null,"deleteYn":"N","age":13}
*/

  return {
    createUser,
    userLogin,
    loginUser,
    userLogout,
    updateUser,
    isPW,
    findLoginID,
    findedId,
    getUser,
    isValidId,
    Msg,

  };
});
