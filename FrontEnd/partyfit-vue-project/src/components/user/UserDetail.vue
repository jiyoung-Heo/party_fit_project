<template>
    <div class="signup-container">
    
        <h1>마이페이지</h1>
        <fieldset>
            <div>
    
                <label for="loginId">ID</label>
    
                <input type="text" id="loginId" v-model= "user.loginId" readonly />
               
            </div>
    
            <div>
    
                <label for="password">PW</label>
    
                <button @click = "changePW" >비밀번호 변경</button>
    
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
                <!-- <button @click ="getInfo">정보보기 </button> -->
            </div>
    
        </fieldset>
    
    </div>
</template>
  
  
<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref ,onMounted} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

onMounted(() => {
    console.log(store.loginUser)
})

const loginUser = store.loginUser;

const getInfo = function(){
    store.updateUser(user);

}

// const user = ref({
//     loginId: loginUser.loginId,
//     name: loginUser.name,
//     username: loginUser.username,
//     password: loginUser.password,
//     email: loginUser.email,
//     age: loginUser.age,

// });

const user = ref({
    loginId: "inId",
    name: "e",
    username: "rname",
    password: "word",
    email:" il",
    age: 3,

});




const goUpdatepage = function(){
    router.push({ name: "update" })
}

const changePW = function(){
    router.push({name: "changePW"})
}

</script>
  
  
<style scoped>
</style>
  
  
  