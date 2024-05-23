<template>
  <div>
    <div class="main">
      <span class="coral-color">
        <RouterLink :to="{ path : '/my-fit' }">party fit</RouterLink>
      </span>
      <TheHeaderNav class="nav-bar" />
      <div class="con">
        <RouterView class="content" />
      </div>
    </div>
    <footer>
      
    </footer>
  </div>
</template>

<script setup>
import TheHeaderNav from "@/components/common/TheHeaderNav.vue";
</script>

<style scoped>
.main {
  /* background-color: #e8e8e8; */
  position: relative;
}

.nav-bar {
  position: sticky;
  top: 0px;
  height: auto;
  z-index: 10;
}

.coral-color a {
  padding: 20px;
  color: rgb(0, 145, 255);
  text-decoration: none;
  margin-top: 40px;
  height: 40vh;
  position: relative;
  padding: 0px 40px;
  font-size: 45px;
  width: 1300px;
  /* background-color: #e8e8e8; */
}

.content {
  display: flex;
  flex-direction: column;
  padding-left: 10%;
  padding-right: 8%;
  max-width: 1400px;
  min-width: 1300px;
}

.con {
  min-width: 1300px;
  max-width: 1400px;
  /* background-color: #e8e8e8; */
  /* background-image: url('/src/assets/user/back-mid.png'); */
  background-size: contain;
  background-position: center;
  background-repeat: repeat;
  background-origin: border-box;
  margin: 0 auto;
}

footer {
  margin: auto;
  height: 140px;
  bottom: 0px;
  max-width: 1400px;
  min-width: 1300px;
  /* background: url('/src/assets/user/back-bottom135.png') top center no-repeat, #e8e8e8; */
  background-size: contain;
  background-origin: border-box;
}
</style>
