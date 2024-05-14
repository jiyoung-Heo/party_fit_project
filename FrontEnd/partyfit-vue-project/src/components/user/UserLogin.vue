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
      <div>
        <RouterLink :to="{name:'findLoginId'}">아이디찾기</RouterLink> |
        <RouterLink :to="{name:'findPassword'}">비밀번호찾기</RouterLink> |

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
</style>

