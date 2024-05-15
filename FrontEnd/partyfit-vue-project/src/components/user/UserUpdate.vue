<template>
    <div class="signup-container">
    
        <h1>회원정보수정</h1>
    
        <fieldset>
    
            <div>
    
                <label for="loginId">ID</label>
    
                <input type="text" id="loginId" v-model="user.loginId"  readonly/>
    
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
    
            </div>
    
            <div>
    
                <label for="age">나이</label>
    
                <input type="int" id="age" v-model="user.age" readonly/>
    
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
import { ref,onMounted,watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const loginUser = ref();

onMounted(() => {
    store.getUser(sessionStorage.getItem("loginUser")).then(()=>
    loginUser.value = store.loginUser
)
})

watch(loginUser,(newVal,oldVal)=>{
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


const user = ref({
    userId:"",
    loginId: loginUser.loginId,
    name: loginUser.name,
    username: "",
    password: "",
    email: "",
    age: "",

});

const updateUser = function() {
    store.updateUser(user.value);
    
    console.log(user.value)
    console.log(loginUser.value.userId)
    // router.push({ name: "home" })
};
</script>
  
  
<style scoped>
</style>
  
  
  