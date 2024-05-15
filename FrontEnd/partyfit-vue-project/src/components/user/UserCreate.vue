<template>
 <div class="signup-container">
  <h1>회원가입</h1>
  <fieldset>
    <div>
      <label for="loginId">ID</label>
      <input type="text" id="loginId" v-model="user.loginId" />
      <p v-if="isValid">{{ errorMsg }}</p>
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
      <button @click="isOKfn">등록</button>
    </div>
  </fieldset>
</div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const errorMsg = ref("");
const user = ref({
  loginId: "",
  name: "",
  username: "",
  password: "",
  email: "",
  age: "",

});
const error = ref(false);
const isValid = computed(() => {
  return error.value
})


const isOK = ref(true)

const createUser = function () {

}
const isOKfn = async function () {
  user.value.loginId = user.value.loginId.trim()
  const id = user.value.loginId
  console.log(id)
  if (id.length < 4 || id.length > 20) {
    // alert("아이디를 입력해주세요.")
    errorMsg.value = '아이디는 4자 이상, 20자 이하로 입력해주세요.'
    error.value = true
    return
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    error.value = true
    errorMsg.value = '올바른 형식의 아이디를 입력해주세요.(대소문자 알파벳, 숫자, 밑줄(_), 대시(-)만 가능)';
    return;
  }


  console.log("유효성검사")
  await store.isValidId(user.value.loginId)
    .then((isValid) => {
      console.log(typeof (isValid))
      if (isValid) {
        console.log("사용가능")
      }
      else {
        console.log("중복됨")
        isOK.value = false
        return
      }

    })

  console.log("가능하다면 계속 됨 ")


  // user.loginId = user.loginId.trim()
  // store.createUser(user.value);
  // router.push({name:"home"})
};
</script>


<style scoped></style>
