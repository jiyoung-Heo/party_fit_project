<template>
  <div class="findPW-container">
    <h1>비밀번호찾기</h1>
    <fieldset>
      <div class="input-group">
        <label for="userId">아이디 : </label>
        <input type="text" v-model="userId" placeholder="id" />
      </div>
      <hr>
      <div class="input-group">
        <label for="name">이름 : </label>
        <input type="text" v-model="name" placeholder="name" />
      </div>
      <hr>
      <div class="input-group">
        <label for="email">이메일 : </label>
        <input type="text" v-model="email" placeholder="email" />
      </div>
      
      <div class="btns" style="display: inline">
       <p>✔️ <a @click="changePassword"  class="custom-btn btn-15" >회원 조회</a></p>
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

.findPW-container{
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