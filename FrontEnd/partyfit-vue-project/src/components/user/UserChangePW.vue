<template>
  <div class="signup-container">
    <h1>비밀번호 재설정</h1>
    <fieldset>
      <div v-if=" store.accessToken != null && store.accessToken  != ''" class="input-group">
        <label for="changePW">현재 비밀번호</label>
        <input type="password" v-model="nowPW" placeholder="현재 비밀번호" />
      </div>
      <hr>
      <div class="input-group">
        <label for="changePW">변경할 비밀번호</label>
        <input
          type="password"
          id="changePW"
          v-model="changePW"
          placeholder="변경할 비밀번호"
        />
      </div>
      <hr>
      <div class="input-group" >
        <label for="changePW2">변경할 비밀번호 확인</label>
        <input
          type="password"
          id="changePW2"
          v-model="changePW2"
          placeholder="변경할 비밀번호확인"
        />
      </div>
      <hr>
      <div class ="btns"  style="display: inline">
        <p>✔️ <a class="custom-btn btn-15" @click="changePassword">저장하기</a></p>
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
  if (store.accessToken != null && store.accessToken != "") {
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
.signup-container{
  align-items: start;
  justify-content: left;
  height: 90vh;
  max-width: 1300px;
  padding: 10% 0 0 36%;
}

hr{
  margin: 0;
    color: inherit;
    border: 0;
    border-top: var(--bs-border-width) solid;
    opacity: .25;
}
.btns p a{
padding:5px;
}

.btns p{
  padding:5px;
  margin-top:20px;
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
  margin-top: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  margin-right: 10px;

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
  background-color: #dcca00b8;
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