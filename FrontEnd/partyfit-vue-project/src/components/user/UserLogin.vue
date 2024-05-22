<template>
  <div class="login-container">
    <h1>로그인</h1>
    <fieldset>
      <div class="input-group">
        <label for="id">아이디 : </label><input type="text" id="id" v-model="loginId" />
      </div>
      <div class="input-group">
        <label for="password">비밀번호 : </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="btns" style="display: inline">
        <p>📌<a @click="userLogin" class="custom-btn btn-15"> 로그인</a></p>

        <p>👍 <RouterLink class="custom-btn btn-15" :to="{ name: 'findLoginId' }">아이디찾기</RouterLink></p>
        <p>✔️ <RouterLink class="custom-btn btn-15" :to="{ name: 'findPassword' }">비밀번호찾기</RouterLink></p>
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
  router.replace({ name: "home" });
  store.userLogin(loginId.value, password.value);
};
</script>

<style scoped>

.btns p a{
padding:5px;
}

.login-container {
  align-items: start;
  justify-content: left;
  padding: 150px;
  height: 90vh;
  background-color: #f7f7f7;
  max-width: 1300px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

input {
  border: none;
}

.input-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  margin-right: 10px;

}



.login-button:hover {
  background-color: #f4f761ef;
  background-position: 100% 0;
}

.link-group {
  margin-top: 10px;
  text-align: center;
}



/* 15 */
.btn-15 {
  border: none;
  z-index: 1;
}

.btn-15:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #e3fa30e8;
  border-radius: 5px;

  transition: all 0.3s ease;
}

.btn-15:hover {
  color: black;
}

.btn-15:hover:after {
  left: 0;
  width: 100%;
}

.btn-15:active {
  top: 2px;
}

.btns {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Optional: Adjust based on your design */
  gap: 10px; /* Optional: Adjust the spacing between elements */
}

.custom-btn {
  
    height: 40px;
    color: black;
    border-radius: 5px;
 
    /* font-family: 'Lato', sans-serif; */
    /* font-weight: 500; */
    /* font-size: 25px; */
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    /* display: inline-block; */
    text-decoration: none;
    outline: none;
    text-align: start;
    align-items: center;

}
</style>
