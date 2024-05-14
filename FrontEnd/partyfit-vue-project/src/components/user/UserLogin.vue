<template>
  <div class="login-container">
    <h1>로그인</h1>
    <fieldset>
      <div>
        <label for="id">ID</label>
        <input type="text" id="id" v-model="loginId" />
      </div>
      <div>
        <label for="password">PW</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <button @click="userLogin">로그인</button>
        
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const loginId = ref("");
const password = ref("");

const userLogin = function () {
  store.userLogin(loginId.value, password.value);
  
  
};
</script>


<style scoped>
/* 로그인 컨테이너 스타일 */
h1 {
  margin: 100px;
}

.login-container {
  background-color: #333;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 필드셋 스타일 */
fieldset {
  border: none;
  margin: 0;
  padding: 0;
  width: 300px;
}

/* 레이블 스타일 */
label {
  display: block;
  margin-bottom: 5px;
}

/* 입력 필드 스타일 */
input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

/* 버튼 스타일 */
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* 파란색 */
  color: white;
  border: none;
  cursor: pointer;
}

/* 버튼 호버 효과 */
button:hover {
  background-color: #0056b3; /* 더 짙은 파란색 */
}

/* 레전드 스타일 */
legend {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

