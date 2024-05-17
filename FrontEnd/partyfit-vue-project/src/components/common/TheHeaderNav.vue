<template>
  <div class="container">
    <div class="top">
      <div class="logo">
        <h1>party fit</h1>
      </div>
      <div class="logo-right">
        <p class="plus-party-fit">+party fit</p>
        <p><span class="material-symbols-outlined">
            notifications
          </span>
        </p>

        <div v-if="isLoginn">
          <RouterLink :to="{ name: 'login' }">로그인</RouterLink> |
          <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink> |

        </div>
        <div v-else>
          <a> {{ loginUser.name }} 님 </a>
          <div v-if="hasProfile">
            <img :src=loginUser.profile alt="프로필사진">
          </div>
          <div v-else>
            <span class="material-icons">face</span> 
          </div>
          <RouterLink :to="{ name: 'myPage' }">마이페이지</RouterLink> |
          <button @click="logout">로그아웃</button>
        </div>


      </div>
    </div>
    <nav class="navbar-menu">
      <!-- routerlink로 수정 -->
      <RouterLink :to="{ name: 'myFit' }">나의 운동</RouterLink>
      <RouterLink :to="{ name: 'myPartyFit' }">나의 party fit</RouterLink>
      <RouterLink :to="{ name: 'allPartyFit' }">전체 party fit</RouterLink>
    </nav>
  </div>

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useUserStore } from "@/stores/user";

const store = useUserStore()
const loginUser = ref(store.loginUser)
const isLogin = ref(true)

onMounted(() => {

  loginUser.value = store.loginUser
})

const isLoginn = computed(() => {
  return store.loginUser === ""
})
const hasProfile = computed(() => {
  return store.loginUser.profile !== null
})

const logout = () => {
  store.userLogout()
  isLogin.value = true;
}

</script>

<style scoped>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot);
  /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),
    url(https://example.com/MaterialIcons-Regular.woff) format('woff'),
    url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}

.top {
  padding: 5% 0;
  display: flex;
  justify-content: flex-start;
}

.logo {
  color: coral;
}

.logo-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.logo-right p {
  width: 100px;
  display: inline-block;
}

.plus-party-fit {
  color: coral;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-menu a {
  margin-right: 5%;
  text-decoration: none;
  color: black;
}
</style>
