<template>
    <div>
        <TheHeaderNav/>
        <RouterView class="content"/>
    </div>
</template>

<script setup>
    import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
</script>

<style scoped>
* {
  background-color: rgba(255, 208, 251, 0.21); 
}
.content {
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: #f8f9fa;
  margin-bottom : 5%;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 5%;
  background-image: url('/src/assets/user/back.png');
  background-size: contain; /* 배경 이미지를 커버로 채움 */
  background-position: top; /* 배경 이미지를 가운데 정렬 */
  background-repeat: no-repeat; /* 배경 이미지 반복 없음 */
  background-origin: border-box;
}

@media (max-width: 1500px) {
  .container {
    padding: 0px 40px; 
    width:95%;
  }
}
</style>