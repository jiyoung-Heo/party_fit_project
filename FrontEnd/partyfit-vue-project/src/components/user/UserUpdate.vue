<template>
    <div class="signup-container">
        <h1>회원정보수정</h1>
        <fieldset>
            <div>
                <label for="loginId">ID</label>
                <input type="text" id="loginId" v-model="user.loginId" readonly />
            </div>
            <div>
                <label for="password">PW</label>
                <input type="password" id="password" v-model="user.password" />
            </div>
            <div>
                <label for="name">이름</label>
                <input type="text" id="name" v-model="user.name" readonly />
            </div>
            <div>
                <label for="username">닉네임</label>
                <input type="text" id="username" v-model="user.username" />
                <p v-if="isValid2">{{ errorMsg2 }}</p>
            </div>
            <div>
                <label for="age">나이</label>
                <input type="int" id="age" v-model="user.age" readonly />
            </div>
            <div>
                <label for="email">이메일</label>
                <input type="text" id="email" v-model="user.email" />
            </div>
            <div>
                <button @click="updateUser">저장하기</button>
            </div>
        </fieldset>
    </div>

</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch, computed } from "vue";

const store = useUserStore();
const loginUser = ref();

onMounted(() => {
    store.getUser(sessionStorage.getItem("loginUser")).then(() =>
        loginUser.value = store.loginUser
    )
})

const user = ref({
    userId:"",
    loginId: loginUser.loginId,
    name: loginUser.name,
    username: "",
    password: "",
    email: loginUser.email,
    age: loginUser.age,

});

watch(loginUser, (newVal, oldVal) => {
    user.value = {
        userId: newVal.userId,
        loginId: newVal.loginId,
        name: newVal.name,
        username: "",
        password: "",
        email: "",
        age: "",
    }
})

const errorMsg2 = ref("");
const error2 = ref(false);
const isValid2 = computed(() => {
  return error2.value
})

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

const isUsernameUQ = async function () {
  await store.isValidUsername(user.value.username)
    .then((isValid) => {
      if (isValid) {
        console.log("닉네임 사용가능")
      }
      else {
        console.log("닉네임중복됨")
        error2.value = true
        errorMsg2.value = '중복됨';
        return
      }

  })

};

const updateUser = async function() {
    await isUsernameOK();
    if(!error2.value){
        store.updateUser(user.value);
    }
    else{
        console.log("실 패 ")
    }
    console.log(user.value)
};
</script>


<style scoped></style>