<template>
  <div class="container">
    <div class="top">
        <div class="logo">
            <h1>party fit</h1>
        </div>
        <div class="logo-right">
            <p class="plus-party-fit">+party fit</p>
            <p><img src="" alt="종모양이미지"></p>
            <p><img src="" alt="프로필사진"></p>
             | 
           
      <div v-if="isLoginn" >
      <RouterLink :to="{name:'login'}">로그인</RouterLink> |
      <RouterLink :to="{name:'signup'}">회원가입</RouterLink> |
      
      </div>
      <div v-else>
      <a> {{ loginUser.name }} 님 </a>
      <RouterLink :to="{name:'myPage'}">마이페이지</RouterLink> |
      <button @click="logout">로그아웃</button>
      </div>


        </div>
    </div>
    <nav class="navbar-menu">
      <!-- routerlink로 수정 -->
      <RouterLink :to="{name:'myFit'}">나의 운동</RouterLink>
      <RouterLink :to="{name:'myPartyFit'}">나의 party fit</RouterLink>
      <RouterLink :to="{name:'allPartyFit'}">전체 party fit</RouterLink> 
    </nav>
  </div>
</template>

<script setup>
import { computed, onMounted, ref ,watch} from 'vue';
import { useUserStore } from "@/stores/user";

import { useRouter } from "vue-router";

const router = useRouter()
const store = useUserStore()
const loginUser = ref(store.loginUser)
const isLogin= ref(true)
const loginUserName = ref()

onMounted(()=>{
  // const storedUser = sessionStorage.getItem("loginUser")
  // loginUser.value = JSON.parse(storedUser)
  // console.log(store.loginUser)
  // console.log("headNav" + store.loginUser)
  loginUser.value = store.loginUser
})

const isLoginn = computed(()=>{
  return store.loginUser ===""
})

// watch(store.loginUser,(newVal,oldVal)=>{
//   if (newVal) {
//     // store.loginUser이 비어있지 않은 경우
//     isLogin.value = false;
//   } else {
//     // store.loginUser이 비어있는 경우
//     isLogin.value = true;
//   }
  
// })
// watch(isLogin, (newVal, oldVal) => {
//       // isLogin 값이 변경될 때 실행되는 로직
//       console.log('isLogin changed:', newVal);
//     });


const logout = () => {
  store.userLogout()
  isLogin.value = true;
}
</script>

<style scoped>
.top{
    padding:5% 0;
    display: flex;
    justify-content: flex-start;
}

.logo{
  color:coral;
}

.logo-right{
    display: flex;
    align-items:center;
    margin-left: auto;
}
.logo-right p{
  width: 100px;
  display: inline-block;
}
.plus-party-fit{
  color:coral;
}
.navbar-menu{
  display: flex;
  align-items: center;
}
.navbar-menu a{
    margin-right: 5%;
    text-decoration: none;
    color:black;
}
</style>
