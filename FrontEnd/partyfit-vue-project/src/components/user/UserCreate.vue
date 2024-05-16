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
import { useUserStore } from "@/stores/user";
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
</style>


