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
            <p>000님</p>
            | 
      <RouterLink :to="{name:'login'}">로그인</RouterLink> |
      <RouterLink :to="{name:'signup'}">회원가입</RouterLink>

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
import { onMounted, ref } from 'vue';

onMounted(()=>{

})
const clickStyle= ref('')

const clickMenu = () => {
  console.log('test')
  clickStyle = 'color:coral;'
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
