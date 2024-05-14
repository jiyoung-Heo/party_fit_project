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
        console.log("store" + user)
        console.log(user)
        window.alert('회원가입 성공')
        router.push({ name: "home" }); 
      })
      .catch((err) => {});
  };

  const loginUser = ref({});

  //로그인
  const userLogin = function (id,pw) {
    const user = {
      loginId: id,
      password: pw,
    };
    console.log(user);

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
    axios({
      url: `${REST_USER_API}/userUpdate`,
      method: "POST",
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



  return {
    createUser,
    userLogin,
    loginUser,
    userLogout,
    updateUser,
    isPW,
  };
});
