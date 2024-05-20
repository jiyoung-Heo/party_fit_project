<template>
  <div class="signup-container">
    <h1>비밀번호찾기</h1>
    <fieldset>
      <div>
        <label for="userId">아이디</label>
        <input type="text" v-model="userId" placeholder="id" />
      </div>
      <div>
        <label for="name">이름</label>
        <input type="text" v-model="name" placeholder="name" />
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="text" v-model="email" placeholder="email" />
      </div>
      <div>
        <button @click="changePassword">회원 조회</button>
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

const userId = ref("");
const name = ref("");
const email = ref("");
const reNewPassword = ref("");
const newPassword = ref("");

const changePassword = () => {
 store.findPw(email.value, userId.value, name.value);
}

</script>


<style scoped>
</style>