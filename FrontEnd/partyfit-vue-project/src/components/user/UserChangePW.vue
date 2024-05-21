<template>
  <div class="signup-container">
    <h1>비밀번호 재설정</h1>
    <fieldset>
      <div v-if="store.loginUserId != ''">
        <label for="changePW">현재 비밀번호</label>
        <input type="password" v-model="nowPW" placeholder="현재 비밀번호" />
      </div>
      <div>
        <label for="changePW">변경할 비밀번호</label>
        <input
          type="password"
          id="changePW"
          v-model="changePW"
          placeholder="변경할 비밀번호"
        />
      </div>
      <div>
        <label for="changePW2">변경할 비밀번호 확인</label>
        <input
          type="password"
          id="changePW2"
          v-model="changePW2"
          placeholder="변경할 비밀번호확인"
        />
      </div>

      <div>
        <button @click="changePassword">저장하기</button>
      </div>
    </fieldset>
  </div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useUserStore();

onMounted(() => {
  // console.log(store.loginUser)
});

const changePW = ref("");
const changePW2 = ref("");
const nowPW = ref("");

const changePassword = function () {
  if (store.loginUserId != "") {
    if (nowPW.value !== store.loginUser.password) {
      //로그인 된 상태인데 두개가 동일하지 않다면 얼럿띄우기
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }
  }else{
    if (changePW.value === changePW2.value) {
      const user = {
        userId: store.findPwFindUser.userId,
        username: store.findPwFindUser.username,
        email: store.findPwFindUser.email,
        age: store.findPwFindUser.age,
        password: changePW.value,
      };
      store.changePassword(user);
    } else {
      alert("새 비밀번호 일치하지 않음");
    }
  }
};
</script>


<style scoped>
</style>