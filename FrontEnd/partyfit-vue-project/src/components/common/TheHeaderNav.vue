<template>
  <div class="container">
    <div class="top">
      <div>
        <h1>
          <RouterLink :to="{ name: moveMainPage }" class="coral-color"
            >party fit</RouterLink
          >
        </h1>
      </div>
      <div class="logo-right">
        <p class="plus-party-fit">+party fit</p>
        <p>
          <span class="material-symbols-outlined"> notifications </span>
        </p>

        <template v-if="store.accessToken == ''">
          <p class="user-info">
            <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
          </p>
          <p class="user-info">
            <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
          </p>
        </template>
        <template v-else>
          <a class="user-info"> {{ store.loginUser.username }} 님 </a>
          <div v-if="hasProfile" class="user-info">
            <img :src="'/src/assets/user/' + store.loginUser.profile"
              alt="프로필사진"
              width="20px"
            />
          </div>
          <div v-else class="user-info">
            <span class="material-icons">face</span>
          </div>
          <RouterLink class="user-info" :to="{ name: 'myPage' }"
            >마이페이지</RouterLink
          >
          |
          <button class="user-info" @click="logout">로그아웃</button>
        </template>
      </div>
    </div>
    <nav class="navbar-menu">
      <!-- routerlink로 수정 -->
      <RouterLink :to="{ name: 'myFit' }">나의 운동</RouterLink>
      <RouterLink :to="{ name: 'myPartyFit' }">나의 party fit</RouterLink>
      <RouterLink :to="{ name: 'allPartyFit' }">전체 party fit</RouterLink>
    </nav>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
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
  if (store.accessToken !== "") {
    // router.push({ name: "myFit" });
  } else {
    router.push({ name: "beforeLoginMain" });
  }
});

const moveMainPage = computed(() => {
  if (store.accessToken == "") {
    return "beforeLoginMain";
  }
  return "myFit";
});

watch(accessToken, async (nv, ov) => {
  await nextTick();
  if (nv == "") {
    router.push({ name: "beforeLoginMain" });
  } else {
  }
});

const hasProfile = computed(() => {
  return store.loginUser.profile !== null;
});

const logout = () => {
  store.userLogout();
};
</script>

<style scoped>
.user-info a,
.user-info div,
.user-info button {
  display: inline-block;
  vertical-align: middle;
  color: black;
}

@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot);
  /* For IE6-8 */
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
  font-feature-settings: "liga";
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.top {
  padding: 3% 0;
  display: flex;
  justify-content: flex-start;
}

.logo-right {
  position: relative;
  display: flex;
  margin-left: auto;
  align-items: center;
}

.logo-right p {
  display: flex;
  margin-right: 10px; /* p 요소 사이의 공간을 설정 */
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
  color: black;
}

a {
  text-decoration: none;
}
</style>
