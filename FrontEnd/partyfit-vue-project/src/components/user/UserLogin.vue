<template>
  <div class="login-container">
    <h1>로그인</h1>
    <fieldset>
      <div class="input-group">
        <label for="id">ID</label>
        <input type="text" id="id" v-model="loginId" />
      </div>
      <div class="input-group">
        <label for="password">PW</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <button @click="userLogin" class="login-button">로그인</button>
      </div>
      <div class="link-group">
        <RouterLink :to="{ name: 'findLoginId' }">아이디찾기</RouterLink> |
        <RouterLink :to="{ name: 'findPassword' }">비밀번호찾기</RouterLink>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const loginId = ref("");
const password = ref("");

const userLogin = function () {
  store.userLogin(loginId.value, password.value);
  router.replace({ name: "home" });
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Arial', sans-serif;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

fieldset {
  border: none;
  padding: 20px;
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.login-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.link-group {
  margin-top: 10px;
  text-align: center;
}

RouterLink {
  color: #007bff;
  text-decoration: none;
}

RouterLink:hover {
  text-decoration: underline;
}
</style>
