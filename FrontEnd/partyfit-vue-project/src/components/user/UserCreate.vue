<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <fieldset>
      <div>
        <label for="loginId">ID</label>
        <input type="text" id="loginId" v-model="user.loginId" />
      </div>
      <div>
        <label for="password">PW</label>
        <input type="password" id="password" v-model="user.password" />
      </div>
      <div>
        <label for="name">이름</label>
        <input type="text" id="name" v-model="user.name" />
      </div>
      <div>
        <label for="username">닉네임</label>
        <input type="text" id="username" v-model="user.username" />
      </div>
      <div>
        <label for="age">나이</label>
        <input type="int" id="age" v-model="user.age" />
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="text" id="email" v-model="user.email" />
      </div>
      <div>
        <button @click="createUser">등록</button>
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

const user = ref({
  loginId: "",
  name: "",
  username: "",
  password: "",
  email: "",
  age : "",
  
});

const createUser = function () {
  store.createUser(user.value);
  router.push({name:"home"})
};
</script>


<style scoped>
h1 {
  margin: 100px;
}
/* 전체 화면을 검정색으로 설정 */
.signup-container {
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


