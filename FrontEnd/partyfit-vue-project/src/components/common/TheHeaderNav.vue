<template>
  <div class="container1 d-flex">
    <div class="top ">

      <nav class="navbar-menu">
        <!-- routerlink로 수정 -->
        <RouterLink class="navbar-link index1" :to="{ name: 'myFit' }">나의 운동</RouterLink>
        <RouterLink class="navbar-link index2" :to="{ name: 'myPartyFit' }">나의 party fit</RouterLink>
        <RouterLink class="navbar-link index3" :to="{ name: 'allPartyFit' }">전체 party fit</RouterLink>
      </nav>
    </div>
    <div>

    </div>
    <div class="box">


      <div class="user-info">
        <template v-if="store.loginUser == null || store.loginUser == undefined || store.loginUser == ''">
            <div class="login-logout">

              <p class="login" @click="click">
                로그인
              </p>
              <p class="sign" @click="signup">
                회원가입
              </p>
            </div>
        </template>
        <template v-else>
          <div class="user-card">
            <div v-if="hasProfile" class="user-info profile ">
              <img :src="'/src/assets/user/' + store.loginUser.profile" alt="프로필사진" width="20px" />
            </div>

            <div v-else class="profile">
              <span class="material-icons">face</span>
            </div>
            <span class="d-flex row ms-3">
              <a class="username"> {{ store.loginUser.username }} 님 </a>

              <div class="user-actions">
                <RouterLink class="my-page-link" :to="{ name: 'myPage' }">마이페이지</RouterLink>
                <a class="logout-button" @click="logout">로그아웃</a>
              </div>
            </span>
          </div>
        </template>
      </div>
    </div>
    
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();
const accessToken = computed(() => store.accessToken);

const moveMainPage = computed(() => {
  return store.accessToken ? { name: "myFit" } : { name: "beforeLoginMain" };
});

const click = () => {
  router.push({ name: "login" });
};
const signup = () => {
  router.push({ name: "signup" });
};

onMounted(() => {
  if (!store.accessToken) {
    router.push({ name: "beforeLoginMain" });
  }
  AOS.init();
});

watch(accessToken, async (newVal) => {
  await nextTick();
  if (!newVal) {
    router.push({ name: "beforeLoginMain" });
  } else {
    router.push({ name: "myFit" }); // 로그인 후 myFit으로 이동
  }
});

const hasProfile = computed(() => {
  return !!store.loginUser.profile;
});

const logout = () => {
  store.userLogout();
  router.push({ name: "beforeLoginMain" });
};

const isAnimating = ref(false);

// Animate notifications and party fit text every 2 seconds
setInterval(() => {
  isAnimating.value = !isAnimating.value;
}, 2000);
</script>

<style scoped>
.container1 {
  /* display : inline; */
  position: relative;
  padding: 0px 40px;

  margin: 0 auto;
  height: auto;

  max-width: 1400px;
  min-width: 1300px;
  background-image: url("/src/assets/user/back-top2.png");
  background-size: contain;
  /* 배경 이미지를 커버로 채움 */
  background-position: bottom;
  /* 배경 이미지를 가운데 정렬 */
  background-repeat: no-repeat;
  /* 배경 이미지 반복 없음 */
  background-origin: border-box;
}

.user-info {
  display: flex;
  align-items: start;
  gap: 10px;
}

.box {
  position: absolute;
  bottom: 0;
  right: 120px;
}

.user-card {
  position: static;
  right: 100px;
  bottom: 0;
  display: flex;

  align-items: center;
  gap: 10px;
  height: 120px;
  /* 최대값으로 설정 */
  width: 370px;
  background-color: rgba(253, 253, 227, 0.568);
  padding: 20px;
  /* user-card에서 가져온 속성 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transition: transformX(30px);
}

.my-page-link:hover {
  color: lightcoral;
}

.box1:hover {
  transform: translateY(100px) translateX(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.username {
  font-size: 1.4em;
  margin-bottom: 10px;
  color: black;
  position: absolute;
  top: 20px;
  left: 110px;
}

.profile img {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  object-fit: cover;
}

.profile .material-icons {
  font-size: 40px;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.sign {
  position: absolute;
  left: 200px;
  z-index: 1;
  font-size: 20px;
  width: 130px;
  transition: color 0.1s, transform 0.1s;
  text-align: center;
  padding: 15px;
  background-color: pink;
  color: black;
  transform: scale(1.05) translateY(-3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(117, 117, 117);
  border-left: 1px solid rgb(116, 116, 116);
  border-right: 1px solid rgb(116, 116, 116);
  border-bottom: 1px solid #f8f9fa;
}

.login {
  background-color: rgb(192, 233, 255);
  text-align: center;
  padding: 15px;
  position: absolute;
  left: 100px;
  z-index: 1;
  font-size: 20px;
  width: 130px;
  transition: color 0.1s, transform 0.1s;
  color: black;
  transform: scale(1.05) translateY(-3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(159, 159, 159);
  border-left: 1px solid rgb(116, 116, 116);
  border-right: 1px solid rgb(116, 116, 116);
  border-bottom: 1px solid #f8f9fa;
}

.sign a,
.login a {
  color: black;
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  /* padding-right: calc(var(--bs-gutter-x)* .5); */
  /* padding-left: calc(var(--bs-gutter-x)* .5); */
  margin-top: var(--bs-gutter-y);
}

.my-page-link {
  text-align: center;
  position: absolute;
  left: 120px;
  top: 70px;
  width: 100px;
  z-index: 1;
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
  height: 30px;
}

.logout-button {
  position: absolute;
  top: 65px;
  pointer-events: auto;
  left: 230px;
  padding: 5px 10px;
  background-color: #ececec;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.logout-button:hover {
  background-color: #ffc379;
}

.plus-party-fit,
.material-symbols-outlined {
  font-size: 18px;
  margin: 0;
  padding: 5px;
  transition: transform 1s ease, opacity 0.3s ease;
}

.top {
  padding-top: 55px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-around;
  height: 14vh;
  width: 600px;
}

.top h1 {
}

.nav .navbar-menu {
}

.navbar-menu * {
}

.navbar-menu {
  position: sticky;
  top: 0px;
  display: flex;
  margin-bottom: 0px;
  margin-left: 70px;
  text-align: center;

  /* width: 1200px; */
  /* margin:auto; */
}

.nav-bar {
  position: sticky;
  top: 0px;
  height: 200px;
  background-color: #e8e8e8;
}

.navbar-menu a {
  text-align: center;
  color: black;
  width: 180px;
  transition: color 0.1s, transform 0.1s;
  font-size: 20px;
}

.navbar-menu a:hover {
  color: black;
}

.navbar-menu .navbar-link {
  color: black;
  padding: 20px 0px;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: all 0.3s;
  width:300px;

  background-color:white;
margin:0 10px;
}

.navbar-menu .index1:hover,
.navbar-menu .index1.router-link-active {
  color: black;
  transform: scale(1.06) translateY(-3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(116, 116, 116);
  /* 상단 테두리 */
  border-left: 1px solid rgb(116, 116, 116);

  border-right: 1px solid rgb(116, 116, 116);
  /* 우측 테두리 */
  border-bottom: 1px solid #f8f9fa;
  /* 하단 테두리 */
  /* transform 속성 합치기 */
  background-color: #ffeb91;
  z-index: 1;
}

.navbar-menu .index2:hover,
.navbar-menu .index2.router-link-active {
  color: black;
  transform: scale(1.06) translateY(-3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(116, 116, 116);
  border-left: 1px solid rgb(116, 116, 116);
  border-right: 1px solid rgb(116, 116, 116);
  border-bottom: 1px solid #f8f9fa;
  background-color: #bbffbb;
  z-index: 1;
}

.navbar-menu .index3:hover,
.navbar-menu .index3.router-link-active {
  color: black;
  transform: scale(1.06) translateY(-3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(116, 116, 116);
  border-left: 1px solid rgb(116, 116, 116);

  border-right: 1px solid rgb(116, 116, 116);
  /* 우측 테두리 */
  border-bottom: 1px solid #ffffff;
  /* 하단 테두리 */
  /* transform 속성 합치기 */
  background-color: #ebcfff;
  z-index: 1;
}

a {
  text-decoration: none;
}

@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot);
  src: local("Material Icons"), local("MaterialIcons-Regular"),
    url(https://example.com/MaterialIcons-Regular.woff2) format("woff2"),
    url(https://example.com/MaterialIcons-Regular.woff) format("woff"),
    url(https://example.com/MaterialIcons-Regular.ttf) format("truetype");
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga";
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

/* @media (max-width: 1411px) {
  .container1 {
  position: relative;
  padding: 0px 40px;
  max-width: 1400px;
  height : 15vh;
  width:1411px;
  min-width: 1300px;
  background-image: url('/src/assets/user/back-top.png');
  background-size: contain;
  background-position: bottom; 
  background-repeat: no-repeat; 
  background-origin: border-box;

}
} */

@media (min-width: 1350px) {
  .user-card {
    position: absolute;
    right: 50px;
    top: -200px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 120px;
    width: 370px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: rgba(255, 246, 203, 0.299);
    border-radius: 5px;
  }

  .login-logout {
    position: absolute;
    right: 50px;
    top: -160px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 120px;
    width: 370px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    border-radius: 5px;
  }
}

@media (max-width: 3000px) {
  .user-card {
    position: absolute;
    right: 50px;
    top: 0px;
    align-items: center;
    gap: 10px;
    height: 120px;
    width: 370px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    background-color: none;
    border-radius: 5px;
  }

  .login-logout {
    position: absolute;
    right: 0px;
    top: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 120px;
    width: 370px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    border-radius: 5px;
  }
  .container1 {
    padding: 0px 40px;
  }

  .info-card {
    height: 120px;
    /* 최대값으로 설정 */
    width: 370px;

    padding: 20px;
    /* 로고의 테두리 */
    border-radius: 5px;
    /* user-card에서 가져온 속성 */
    background-color: #baa439a1;
  }

  .box {
    position: fixed;
    right: -300px;
    top: 80px;
    margin-right: 200px;
  }

  .user-info {
    position: relative;
  }

  .logout-button {
    background-color: rgb(255, 227, 232);
    position: absolute;
    left: 120px;
    width: 100px;
    z-index: 1;
    font-size: 15px;
    top: 80px;
    height: 30px;
    text-align: center;
  }

  .my-page-link {
    text-align: center;
    font-size: 15px;
    position: absolute;
    left: 120px;
    top: 50px;
    width: 100px;
    z-index: 1;
    height: 15px;
    color: black;
    text-decoration: none;
    bottom: 20px;
    transition: color 0.3s ease;
    margin: 5px;
    margin-top: 5px;
  }

  .login {
    font-size: 15px;
    position: absolute;
    left: 0;
    width: 300px;
    z-index: 1;
    font-size: 20px;
    top: -60px;
    background-color: pink;
    border-radius: 5px;
    margin: 0px;
    padding: 8px;
    text-align: left;
  }

  .sign {
    text-align: left;
    padding: 8px;
    background-color: rgb(192, 233, 255);
    margin: 0px;
    font-size: 15px;
    position: absolute;
    left: 0;
    top: 0px;
    width: 300px;
    z-index: 1;
    font-size: 20px;
    border-radius: 5px;
  }
}
</style>
