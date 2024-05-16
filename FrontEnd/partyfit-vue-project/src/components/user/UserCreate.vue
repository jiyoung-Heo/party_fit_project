<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <fieldset>
      <div>
        <label for="loginId">ID</label>
        <input type="text" id="loginId" v-model="user.loginId" placeholder="아이디"/>
        <p v-if="isValid">{{ errorMsg }}</p>
      </div>
      <div>
        <label for="password">PW</label>
        <input type="password" id="password" v-model="user.password" placeholder="비밀번호"/>
      </div>
      <div>
        <label for="name">이름</label>
        <input type="text" id="name" v-model="user.name" placeholder="이름"/>
      </div>
      <div>
        <label for="username">닉네임</label>
        <input type="text" id="username" v-model="user.username" placeholder="닉네임" />
        <p v-if="isValid2">{{ errorMsg2 }}</p>
      </div>
      <div>
        <label for="age">나이</label>
        <input type="number" id="age" v-model="user.age" placeholder="나이"/>
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="user.email" placeholder="example@email.com" />
        <p v-if="isValid3">{{ errorMsg3 }}</p>
      </div>

      <div>
        <button @click="createUser">등록</button>
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
const errorMsg2 = ref("");
const errorMsg3 = ref("");
const error = ref(false);
const error2 = ref(false);
const error3 = ref(false);
const isValid = computed(() => {
  return error.value
})
const isValid2 = computed(() => {
  return error2.value
})
const isValid3 = computed(() => {
  return error3.value
})
const isUQ = ref(false)

const user = ref({
  loginId: "",
  name: "",
  username: "",
  password: "",
  email: "",
  age: "",

});


const createUser = async function () {
  await isIdOK();
  await isUsernameOK();
  await isEmailOK();
  console.log(`isUQ.value: ${isUQ.value}`);
  console.log(`error.value: ${error.value}`);
  console.log(`error2.value: ${error2.value}`);
  console.log(`error3.value: ${error3.value}`);

  if(isUQ.value===true &&!error.value &&!error2.value&&!error3.value){
    console.log(user)
    // console.log("사 용 가 능")
    store.createUser(user.value)
  }
    else
    console.log("사용불가능")
}

const isIdOK = async function () {
  const id = user.value.loginId.trim()
  const idRegex = /^[a-zA-Z0-9_-]+$/

  console.log(id)
  if (id.length < 4 || id.length > 20) {
    errorMsg.value = '아이디는 4자 이상, 20자 이하로 입력해주세요.'
    error.value = true
    return
  }
  if (/\s/.test(id)) {
    error.value = true
    errorMsg.value = '공백이 포함되어 있습니다. 다시 입력해주세요.';
    return;
  }
  if (!idRegex.test(id)) {
    error.value = true
    errorMsg.value = '올바른 형식의 아이디를 입력해주세요.(대소문자 알파벳, 숫자, 밑줄(_), 대시(-)만 가능)';
    return;
  }
  error.value = false 
  await isIdUQ()
}


const isUsernameOK = async function () {
  const username = user.value.username.trim()
  
  console.log(username)
  if (username.length < 2 || username.length > 10) {
    errorMsg2.value = '별명은 2자 이상, 10자 이하로 입력해주세요.'
    error2.value = true
    return
  }
  if (/\s/.test(username)) {
    error2.value = true
    errorMsg2.value = '공백이 포함되어 있습니다. 다시 입력해주세요.';
    return;
  }

  error2.value = false 
  await isUsernameUQ()
}

const isEmailOK = async function () {
  const email = user.value.email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  console.log(email)
  if (/\s/.test(email)) {
    error3.value = true
    errorMsg3.value = '공백이 포함되어 있습니다. 다시 입력해주세요.';
    return;
  }
  if (!emailRegex.test(email)) {
    error3.value = true
    errorMsg3.value = '올바른 형식의 이메일을 입력해주세요.';
    return;
  }
  
  error3.value = false 
  await isEmailUQ()
}

const isIdUQ = async function () {
  isUQ.value = true
  await store.isValidId(user.value.loginId)
    .then((isValid) => {
      if (isValid) {
        console.log("아이디 사용가능")
      }
      else {
        console.log("중복됨")
        error.value = true
        errorMsg.value = '중복됨';
        isUQ.value = false
        return
      }
  })
};
const isUsernameUQ = async function () {
  console.log("user"+isUQ)
  if(isUQ.value==true){
  await store.isValidUsername(user.value.username)
    .then((isValid) => {
      if (isValid) {
        console.log("닉네임 사용가능")
      }
      else {
        console.log("닉네임중복됨")
        error2.value = true
        errorMsg2.value = '중복됨';
        isUQ.value = false
        return
      }

  })
}
};
const isEmailUQ = async function () {
  console.log("email"+isUQ)
  if(isUQ.value==true){
  await store.isValidEmail(user.value.email)
    .then((isValid) => {
      if (isValid) {
        console.log("이메일 사용가능")
      }
      else {
        console.log("중복됨")
        error3.value = true
        errorMsg3.value = '중복됨';
        isUQ.value = false
        return
      }

  })
}
};

</script>


<style scoped></style>
