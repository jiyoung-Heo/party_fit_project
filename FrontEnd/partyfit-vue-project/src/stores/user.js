import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usePartyStore } from "./party";

const REST_USER_API = `http://localhost:8080/user`;

export const useUserStore = defineStore(
  "user",
  () => {
    const partyStore = usePartyStore();
    const loginUserId = ref();
    const accessToken = ref("");

    //회원가입
    const createUser = function (user) {
      // console.log(user);
      axios({
        url: `${REST_USER_API}/signup`,
        method: "POST",
        data: user,
      })
        .then(() => {
          // console.log("store" + user)/
          // console.log(user);
          window.alert("회원가입 성공");
        })
        .then(() => {
          router.push({ name: "login" });
        })
        .catch((err) => {});
    };

    //로그인
    const userLogin = async function (id, pw) {
      const user = {
        loginId: id,
        password: pw,
      };
      try {
        const res = await axios({
          url: `${REST_USER_API}/login`,
          method: "POST",
          data: user,
        });

        if (res.data["access-token"] != undefined) {
          accessToken.value = "Bearer " + res.data["access-token"];
        }
        const token = res.data["access-token"].split(".");
        //토큰에서 id가져오기
        let userId = JSON.parse(atob(token[1])).userId;
        //id정보가지고 전체 회원 정보 가져오기
        await getUser(userId);
        loginUserId.value = userId;

        router.push({ name: "myFit" });
      } catch (error) {
        window.alert("로그인 실패");
        // console.error("로그인 실패 : ", error);
        router.replace("login");
      }
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
        window.alert("로그아웃");
        $reset();
        partyStore.$reset();
        router.push({ name: "home" });
      });
    };

    //회원정보수정
    const updateUser = function (user, image) {
      // console.log(user + "," + image);
      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
      if (image != null && image != undefined) {
        formData.append("profile", image);
      }
      // console.log(image)
      axios({
        url: `${REST_USER_API}/${user.userId}`,
        method: "PUT",
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        const temp = loginUser.value.profile;
        loginUser.value = res.data;
        if (image == null || image == undefined) {
          loginUser.value.profile = temp;
        }
        router.push({ name: "myPage" });
      });
    };
    const changePassword = function (user) {
      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
      axios({
        url: `${REST_USER_API}/${user.userId}`,
        method: "PUT",
        data: formData,
      }).then((res) => {
        window.alert("비밀번호 변경 완료");
        if (accessToken.value != null && accessToken.value != "") {
          router.push({ name: "myPage" });
        } else {
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
      // console.log(user.email);

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
    const findPwFindUser = ref();
    const findPw = function (email, loginId, name) {
      axios({
        url: `${REST_USER_API}/find-pw/${email}/${loginId}`,
        method: "GET",
        params: {
          name: name,
        },
      }).then((res) => {
        if (res.data.length != 0) {
          findPwFindUser.value = res.data;
          router.push({ name: "changePW" });
        } else {
          window.alert("일치하는 회원이 없습니다. ");
        }
      });
    };

    const loginUser = ref({});
    const getUser = async function (userId) {
      await axios({
        url: `${REST_USER_API}/${userId}`,
        method: "GET",
        params: {
          userId: userId,
        },
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          loginUser.value = res.data;
          if(loginUser.value.profile == null || loginUser.value.profile == undefined || loginUser.value.profile == ''){
            loginUser.value.profile = "user.jpg";
          }
        })
        .catch((err) => {
          console.error(err);
          window.alert("회원정보 가져오기 실패");
        });
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
        // console.log(err);
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
          // console.log(res.data == "1");
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
          // console.log(res.data == "1");
          if (res.data == "1") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };
    const partyList = ref([]);

    const getMyPartyFit = async function () {
      await axios({
        url: `${REST_USER_API}/myPartyfit/${loginUserId.value}`,
        method: "GET",
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
    const getMyMeet = async function () {
      const userId = loginUserId.value;
      // console.log("store"+ userId)
      await axios({
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
      // console.log("getmya"+loginUser.value.userId)
      axios({
        url: `${REST_USER_API}/myArticle`,
        method: "GET",
        headers: {
          Authorization: accessToken.value, // 헤더에 accessToken을 포함하여 요청
        },
        params: {
          userId: loginUser.value.userId,
        },
      })
        .then((res) => {
          // console.log(res.data);
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
          // console.log(res.data);
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

    const partyStatus = async function(partyId) {
      try {
        const res = await axios({
          url: `${REST_USER_API}/join/${partyId}/${loginUserId.value}`,
          method: "GET",
          headers: {
            Authorization: accessToken.value,
          },
        });
    
        if (res.data != null || res.data != undefined) {
          // console.log(res.data);
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    };
    

    const partyJoinRequest = async function (partyId) {
      try {
        await axios({
          url: `${REST_USER_API}/join/${partyId}/${loginUserId.value}`,
          method: "PUT",
          headers: {
            Authorization: accessToken.value,
          },
        });
        alert("가입 신청");
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    };

    const partyLeaveRequest = async function (partyId) {
      await axios({
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
        // console.log("dddd");
      });
    };
    function $reset() {
      loginUser.value = null;
      loginUserId.value = null;
      accessToken.value = null;
      nonWriteReview.value = null;
      articleList.value = null;
      commentList.value = null;
      meetList.value = null;
      partyList.value = null;
      findedId.value = null;
      userdetail.value = null;
      findPwFindUser.value = null;
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
      partyStatus,
    };
  },
  { persist: true }
);
