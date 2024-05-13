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
        router.push({ name: "home" }); 
      })
      .catch((err) => {});
  };

  const loginUser = ref("");

  //로그인
  const userLogin = function (id, pw) {
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
        loginUser.value = id;
        router.push({ name: "home" });
      })
      .catch((error) => {
        // 요청이 실패한 경우에 실행되는 코드
        console.log(loginUser);
        console.error("로그인 실패 : ", error);
      });
  };

  //로그아웃
  const userLogout = function () {
    axios.get(`${REST_USER_API}/logout`).then((res) => {
      loginUser.value = "";
      // console.log(loginUser);
      router.push({ name: "home" }); //어디로보내지?
    });
  };

  return {
    createUser,
    userLogin,
    loginUser,
    userLogout,
  };
});
