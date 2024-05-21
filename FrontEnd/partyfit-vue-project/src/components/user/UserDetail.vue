<template>
  <div class="container">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <p style="font-size: 1.8rem; margin-bottom: 40px">마이페이지</p>
      <p style="font-size: 1.5rem; margin-bottom: 40px">프로필정보</p>
    <div class="userInfo">
      <div class="position-relative" style="width: 140px">
        <img
          :src="`/src/assets/user/${store.loginUser.profile}`"
          alt="프로필이미지"
          class="position-relative" style="overflow: hidden"
        />
      </div>
      </div>
    <fieldset>
      <div>
        <label for="loginId">ID</label>
        {{ user.loginId }}
      </div>
      <div>
        <label for="name">이름</label>
        {{ user.name }}
      </div>
      <div>
        <label for="username">닉네임</label>
        {{ user.username }}
      </div>
      <div>
        <label for="age">나이</label>
        {{ user.age }}
      </div>
      <div>
        <label for="email">이메일</label>
        {{ user.email }}
      </div>
    </fieldset>
  </div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserFindLoginId from "./UserFindLoginId.vue";
import Swal from "sweetalert2";

const router = useRouter();
const store = useUserStore();

const loginUser = ref(store.loginUser);
const user = ref({
  loginId: "",
  name: "",
  username: "",
  password: "",
  email: "",
  age: "",
});

onMounted(() => {
  store.getUser(sessionStorage.getItem("loginUser")).then(() => {
    loginUser.value = store.loginUser;
  });
});

watch(loginUser, (newVal, oldVal) => {
  user.value = {
    loginId: newVal.loginId,
    name: newVal.name,
    username: newVal.username,
    password: newVal.password,
    email: newVal.email,
    age: newVal.age,
  };
});

const changePW = function () {
  router.push({ name: "changePW" });
};

</script>


<style scoped>

img {
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
}

button {
  border: none;
}

.nav-pills {
  --bs-nav-pills-border-radius: var(--bs-border-radius);
  --bs-nav-pills-link-active-color: black;
  --bs-nav-pills-link-active-bg: ;
}

.nav {
  --bs-nav-link-padding-x: 1rem;
  --bs-nav-link-padding-y: 0.5rem;
  --bs-nav-link-font-weight: ;
  --bs-nav-link-color: grey;
  --bs-nav-link-hover-color: var(--bs-link-hover-color);
  --bs-nav-link-disabled-color: var(--bs-secondary-color);
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.leftbox {
  width: 200px;
  height: 70vh;
  overflow-y: auto;
  flex: 1;
}

.rightbox {
  flex: 1;
}
</style>