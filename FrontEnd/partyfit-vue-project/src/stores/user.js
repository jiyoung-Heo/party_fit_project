import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore(
  "user",
  () => {
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
          console.log(user);
          window.alert("회원가입 성공");
          router.push({ name: "home" });
        })
        .catch((err) => {});
    };

    const loginUserId = ref();
    const accessToken = ref("");

    //로그인
    const userLogin = function (id, pw) {
      const user = {
        loginId: id,
        password: pw,
      };

      axios({
        url: `${REST_USER_API}/login`,
        method: "POST",
        data: user,
      })
        .then((res) => {
          if(res.data["access-token"] != undefined){
            accessToken.value = "Bearer " + res.data["access-token"];
          }
          sessionStorage.setItem("access-token", res.data["access-token"]);
          const token = res.data["access-token"].split(".");
          let userId = JSON.parse(atob(token[1])).userId;
          getUser(userId);
          loginUserId.value = userId;
          sessionStorage.setItem("loginUser", userId);
          router.push({ name: "myFit" });
        })
        .catch((error) => {
          window.alert("로그인 실패");
          // console.error("로그인 실패 : ", error);
          router.replace("login");
        });
    };

    //로그아웃
    const userLogout = function () {
      axios({
        url: `${REST_USER_API}/logout`,
        method: "POST",
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        // console.log(time);
        loginUser.value = "";
        loginUserId.value = "";
        accessToken.value = "";
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("loginUser");
        router.push({ name: "home" });
        window.alert("로그아웃");
        // window.location.reload();
      });
    };

    //회원정보수정
    const updateUser = function (user,image) {
      const formData = new FormData();
      formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
      formData.append('profile', image);
      // console.log("호출!")
      // console.log(user.profile)
      axios({
        url: `${REST_USER_API}/${user.userId}`,
        method: "PUT",
        data: formData,
        headers: {
          'Accept': 'application/json',
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        // console.log(res.data);
        loginUser.value = res.data
        router.push({ name: "myPage" });
      });
    };
    const changePassword = function (user) {
      const formData = new FormData();
      formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
      axios({
        url: `${REST_USER_API}/${user.userId}`,
        method: "PUT",
        data: formData,
      }).then((res) => {
        window.alert("비밀번호 변경 완료");
        if(loginUserId.value != ''){
          router.push({name: "myPage"});
        }else{
          router.push({ name: "login" });
        }
      });
    };

    //비밀번호 확인
    const isPW = function (pw) {
      //비밀번호 맞는지 확인하고 true false 반환
    };

    const findedId = ref("");
    const findLoginID = function (user) {
      console.log(user.email);

      axios({
        url: `${REST_USER_API}/find-id`,
        method: "GET",
        params: {
          email: user.email,
          name: user.name,
        },
      })
        .then((res) => {
          // console.log(res.data);
          findedId.value = res.data.loginId;
        })
        .catch((err) => {
          // console.log(err);
          findedId.value = "";
          window.alert("아이디찾기 실패");
        });
    };
    const findPwFindUser = ref()
    const findPw = function (email, loginId, name) {
      axios({
        url: `${REST_USER_API}/find-pw/${email}/${loginId}`,
        method: "GET",
        params: {
          name: name,
        },
      }).then((res) => {
        if(res.data.length != 0){
          findPwFindUser.value = res.data
          router.push({name:"changePW"})
        }
      });
    };

    const loginUser = ref({});
    const getUser = async function (userId) {
      try {
        const res = await axios({
          url: `${REST_USER_API}/${userId}`,
          method: "GET",
          params: {
            userId: userId,
          },
          headers: {
            Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
          },
        });
        loginUser.value = res.data;
        // console.log(loginUser.value)
      } catch (err) {
        console.log(err);
        window.alert("회원정보 가져오기 실패");
      }
    };

    const userdetail = ref({});
    const getUserdetail = async function (userId) {
      try {
        const res = await axios({
          url: `${REST_USER_API}/${userId}`,
          method: "GET",
          params: {
            userId: userId,
          },
          headers: {
            Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
          },
        });

        userdetail.value = res.data;
      } catch (err) {
        console.log(err);
        window.alert("회원정보 가져오기 실패");
      }
    };

    //아이디 중복 검사
    const isValidId = function (loginId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${REST_USER_API}/confirmId`,
          method: "POST",
          data: { loginId: loginId },
        }).then((res) => {
          // console.log(res.data)
          console.log(res.data == "1");
          if (res.data == "1") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };

    const isValidUsername = function (username) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${REST_USER_API}/confirmUserName`,
          method: "POST",
          data: { username: username },
        }).then((res) => {
          // console.log(res.data)
          // console.log(res.data == "1");
          if (res.data == "1") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };
    const isValidEmail = function (email) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${REST_USER_API}/confirmEmail`,
          method: "POST",
          data: { email: email },
        }).then((res) => {
          // console.log(res.data)
          console.log(res.data == "1");
          if (res.data == "1") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };
    const partyList = ref([]);
    const getMyPartyFit = function () {
      console.log("getmyp"+loginUser.value.userId)
      axios({
        url: `${REST_USER_API}/myPartyfit/${loginUser.value.userId}`,
        method: "GET",
        params: {
          userId: loginUser.value.userId,
        },
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      })
      .then((res) => {
          partyList.value = res.data;
          // console.log(res.data)
        })
        .catch((err) => {});
      };
      
      const meetList = ref([]);
    const getMyMeet = function () {
      const userId = loginUser.value.userId;
      // console.log("store"+ userId)
      axios({
        url: `${REST_USER_API}/myMeet`,
        method: "GET",
        params: {
          userId: userId,
        },
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      })
      .then((res) => {
        //  console.log(res.data)
        meetList.value = res.data;
      })
      .catch((err) => {});
    };

    const articleList = ref([]);
    const getMyArticle = function () {
      // console.log("store"+ userId)
      console.log("getmya"+loginUser.value.userId)
      axios({
        url: `${REST_USER_API}/myArticle`,
        method: "GET",
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
        params:{
          userId : loginUser.value.userId

        }
        
      })
        .then((res) => {
          console.log(res.data);
          articleList.value = res.data;
        })
        .catch((err) => {});
    };


    const commentList = ref([]);
    const getMyComment = function () {
      const userId = sessionStorage.getItem("loginUser");
      // console.log("store"+ userId)
      axios({
        url: `${REST_USER_API}/myComment`,
        method: "GET",
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          commentList.value = res.data;
          console.log(res.data);
        })
        .catch((err) => {});
    };
    const nonWriteReview = ref();
    const getNonWriteReview = function () {
      const userId = loginUserId.value;
      // console.log("store"+ userId)
      axios({
        url: `${REST_USER_API}/review/${userId}`,
        method: "GET",
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          nonWriteReview.value = res.data;
        })
        .catch((err) => {});
    };

    const partyJoinRequest = function (partyId) {
      axios({
        url: `${REST_USER_API}/join/${partyId}/${loginUser.value.userId}`,
        method: "PUT",
        headers: {
          Authorization: accessToken.value,
        },
      }).then((res) => {
        alert("가입 신청");
      });
    };

    const partyLeaveRequest = function (partyId) {
      axios({
        url: `${REST_USER_API}/join/${partyId}/${loginUser.value.userId}`,
        method: "DELETE",
        headers: {
          Authorization: accessToken.value,
        },
      }).then((res) => {
        alert("탈퇴");
      });
    };

    const userLeaveRequest = function () {
      axios({
        url: `${REST_USER_API}/${loginUser.value.userId}`,
        method: "DELETE",
        headers: {
          Authorization: accessToken.value,
        },
      }).then((res) => {
        console.log("dddd")
      });
    };
    function $reset() {
      loginUser.value = {}
      loginUserId.value = ''
      accessToken.value = ''
      nonWriteReview.value = ''
      articleList.value = [];
      commentList.value = [];
      meetList.value = [];
      partyList.value = [];
      findedId.value=''
      userdetail.value={}
      findPwFindUser.value=null
    }

    return {
      nonWriteReview,
      getNonWriteReview,
      createUser,
      userLogin,
      loginUser,
      loginUserId,
      userLogout,
      updateUser,
      isPW,
      findLoginID,
      findedId,
      getUser,
      isValidId,
      isValidUsername,
      isValidEmail,
      getMyPartyFit,
      partyList,
      meetList,
      getMyMeet,
      articleList,
      getMyArticle,
      commentList,
      getMyComment,
      accessToken,
      userdetail,
      getUserdetail,
      partyJoinRequest,
      partyLeaveRequest,
      findPw,
      findPwFindUser,
      changePassword,
      userLeaveRequest,
      $reset,
    };
  },
  { persist: true }
);
