<template>
  <div class="container">
    <div class="top">
      <div>
        <h1>
          <RouterLink :to="moveMainPage" class="coral-color"
            >party fit</RouterLink
          >
        </h1>
      </div>
      <div class="logo-right">
        <p class="plus-party-fit">+party fit</p>
        <p>
          <span class="material-symbols-outlined">notifications</span>
        </p>

        <template
          v-if="
            store.loginUser == null ||
            store.loginUser == undefined ||
            store.loginUser == ''
          "
        >
          <p class="user-info">
            <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
          </p>
          <p class="user-info">
            <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
          </p>
        </template>
        <template v-else>
          <a class="user-info">{{ store.loginUser.username }} 님</a>
          <div v-if="hasProfile" class="user-info">
            <img
              :src="'/src/assets/user/' + store.loginUser.profile"
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

const moveMainPage = computed(() => {
  return store.accessToken ? { name: "myFit" } : { name: "beforeLoginMain" };
});

onMounted(() => {
  if (!store.accessToken) {
    router.push({ name: "beforeLoginMain" });
  }
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
</script>

<style scoped>
.user-info a,
.user-info div,
.user-info button {
  display: inline-block;
  vertical-align: middle;
  color: black;
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
  margin-right: 10px;
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
