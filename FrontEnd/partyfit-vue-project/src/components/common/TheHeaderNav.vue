<template>
  <div class="container1 d-flex">
    <div class="top ">


      <h1>
        <RouterLink :to="{ name: moveMainPage }" class="coral-color">party fit</RouterLink>
      </h1>

      <nav class="navbar-menu">
        <!-- routerlink로 수정 -->
        <RouterLink class="navbar-link" :to="{ name: 'myFit' }">나의 운동</RouterLink>
        <RouterLink class="navbar-link" :to="{ name: 'myPartyFit' }">나의 party fit</RouterLink>
        <RouterLink class="navbar-link" :to="{ name: 'allPartyFit' }">전체 party fit</RouterLink>
      </nav>
    </div>
    <div>

      <div class="animated-text">
        <p class="plus-party-fit" :class="{ animated: isAnimating }">+party fit</p>
        <p class="material-symbols-outlined" :class="{ animated: isAnimating }">notifications</p>

      </div>
    </div>
    <div class="box">

      <div class="user-card"  >

        <div class="user-info">
          <template v-if="store.accessToken == null || store.accessToken == ''">
            <p class="login">
              <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
            </p>
            <p class="sign">
              <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
            </p>
          </template>
          <template v-else>
            <div v-if="hasProfile" class="user-info profile ">
              <img  :src="'/src/assets/user/' + store.loginUser.profile" alt="프로필사진" width="20px" />
            </div>
            
            <div v-else class="profile">
              <span class="material-icons">face</span>
            </div>
            <span class="d-flex row ms-3">
              <a class="username"> {{ store.loginUser.username }} 님 </a>

              <div class="user-actions">
                <RouterLink class="my-page-link" :to="{ name: 'myPage' }">마이페이지</RouterLink>
                <button class="logout-button" @click="logout">로그아웃</button>
              </div>
            </span>
          </template>
        </div>
      </div>
    </div>

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

onMounted(() => {
  if (store.accessToken == null || store.accessToken == "") {
    router.push({ name: "beforeLoginMain" });
  } else {
    // router.push({ name: "myFit" });
  }
  AOS.init();
});

const moveMainPage = computed(() => {
  if (store.accessToken == null || store.accessToken == "") {
    return "beforeLoginMain";
  }
  return "myFit";
});

watch(accessToken, async (nv, ov) => {
  await nextTick();
  if (nv == null || nv == "") {
    router.push({ name: "beforeLoginMain" });
  } else {
  }
});

const hasProfile = computed(() => {
  return store.loginUser.profile !== null;
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
  width: 1300px;
  margin: 0 auto;
  height : 30vh;
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
  border: 1px solid rgb(169, 169, 169);
  /* 로고의 테두리 */
  border-radius: 5px;
  /* user-card에서 가져온 속성 */
  background-color: #fff;
  padding: 20px;
  /* user-card에서 가져온 속성 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile img {
  width: 5em;
  height: 5em;
  border-radius: 50%;
}

.profile .material-icons {
  font-size: 40px;
}

.user-actions {

  display: flex;
  gap: 10px;
}

.my-page-link {

  z-index: 1;
  bottom: 20px;
  position: absolute;
  color: black;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.3s ease;
  margin: 5px;
  margin-top: 5px;
}

.sign {
  position: absolute;
  left: 200px;
  z-index: 1;
  font-size: 20px;
  width: 100px;
  transition: color 0.1s, transform 0.1s;
}

.login {
  position: absolute;
  left: 100px;
  z-index: 1;
  font-size: 20px;
  width: 100px;
  transition: color 0.1s, transform 0.1s;
}

.sign a,
.login a {
  color: black;

}


.row>* {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  /* padding-right: calc(var(--bs-gutter-x)* .5); */
  /* padding-left: calc(var(--bs-gutter-x)* .5); */
  margin-top: var(--bs-gutter-y);
}

.logout-button {
  position: absolute;
  bottom: 20px;
  pointer-events: auto;
  right: 20px;
  padding: 5px 10px;
  background-color: #ececec;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.logout-button:hover {
  background-color: #ffc379;
}


.animated-text {
  display: flex;
  align-items: center;
}

.plus-party-fit,
.material-symbols-outlined {
  font-size: 18px;
  margin: 0;
  padding: 5px;
  transition: transform 1s ease, opacity 0.3s ease;
}

.animated-text .plus-party-fit.animated,
.animated-text .material-symbols-outlined.animated {
  transform: scale(1.05);
  opacity: 0.8;
}

.plus-party-fit {
  color: coral;
}

.top {
  padding-top: 30px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-around;
  flex: 3;
  height:28vh;
}

.top h1 {
  margin-bottom: 50px;
  /* 여기에 간격을 추가합니다 */
}
.nav .navbar-menu {

  z-index: 1000;
}
.navbar-menu {
  position: sticky;
  top:0px;
  display: flex;
  margin-bottom: 0px;

  text-align: center;
  z-index: 1;
  /* width: 1200px; */
  /* margin:auto; */
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
}

.navbar-menu .navbar-link:hover,
.navbar-menu .navbar-link.router-link-active {
  color: black;
  transform: scale(1.05) translateY(3px);
  border-color: #f8f9fa;
  border-top: 1px solid rgb(116, 116, 116);
  /* 상단 테두리 */
  border-left: 1px solid rgb(116, 116, 116);
  /* 좌측 테두리 */
  border-right: 1px solid rgb(116, 116, 116);
  /* 우측 테두리 */
  border-bottom: 1px solid #f8f9fa;
  /* 하단 테두리 */
  /* transform 속성 합치기 */
  background-color: #f8f9fa;
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



@media (max-width: 1350px) {
  .container1 {
    padding: 0px 40px;
    width: 95%;
  }

}


@media (max-width: 1200px) {

  
  .box{
    position: fixed;
    right:-400px;
    top:80px;
    margin-right: 200px;
  }


  .profile img{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top : -45px;
    right: -35px;
  }
  
  .user-info {
    position: relative;
  }
  
  .user-actions .logout-button{
    position: absolute;
    left : 0;
    
    width : 100px;
    z-index: 1;
    font-size: 15px;
    top:25px;
    height:30px;
  }
  .username{
    position : fixed;
    top : 100px;
   color: black;
  }
  .user-actions .my-page-link{
    font-size: 15px;
    position: absolute;
    left :0;
    top: -5px;
    width : 200px;
    z-index: 1;
    height: 15px;
    
  }

  .login{
    font-size: 15px;
    position: absolute;
    left :0;
    width : 200px;
    z-index: 1;
    height: 15px;
    font-size: 20px;
    top: -40px;
    
  }
  
  .sign{
    font-size: 15px;
    position: absolute;
    left :0;
    top: 0px;
    width : 200px;
    z-index: 1;
    height: 15px;
    font-size: 20px;
    
  }
}

</style>
