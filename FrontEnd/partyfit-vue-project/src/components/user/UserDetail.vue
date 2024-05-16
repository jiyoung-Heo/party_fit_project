<template>
    <div class="signup-container">
        <h1>마이페이지</h1>
        <fieldset>
            <div>
                <label for="loginId">ID</label>
                <input type="text" id="loginId" v-model="user.loginId" readonly />
            </div>
            <div>
                <label for="password">PW</label>
                <button @click="changePW">비밀번호 변경</button>
            </div>
            <div>
                <label for="name">이름</label>
                <input type="text" id="name" v-model="user.name" readonly />
            </div>
            <div>
                <label for="username">닉네임</label>
                <input type="text" id="username" v-model="user.username" readonly />
            </div>
            <div>
                <label for="age">나이</label>
                <input type="int" id="age" v-model="user.age" readonly />
            </div>
            <div>
                <label for="email">이메일</label>
                <input type="text" id="email" v-model="user.email" readonly />
            </div>
            <div>
                <button @click="goUpdatepage">수정</button>
               
            </div>
        </fieldset>
    </div>
    
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const loginUser = ref()

onMounted(() => {
    store.getUser(sessionStorage.getItem("loginUser"))
        .then(() => {
            loginUser.value = store.loginUser
        })
})

const loginUser = ref()

watch(loginUser,(newVal,oldVal)=>{
  user.value = {
    loginId: newVal.loginId,
    name: newVal.name,
    username: newVal.username,
    password: newVal.password,
    email: newVal.email,
    age: newVal.age,}
})


const user = ref({
    loginId: "",
    name: "",
    username: "",
    password: "",
    email:"",
    age: "",

});

const goUpdatepage = function () {
    router.push({ name: "update" })
}

const changePW = function () {
    router.push({ name: "changePW" })
}

</script>


<style scoped></style>