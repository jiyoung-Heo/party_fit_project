<template>
  <div class="before-login">
    <TheNonLoginCarousel class="right"/>
    <TheBestPartyFit class="left"/>
  </div>
</template>

<script setup>
import TheNonLoginCarousel from '../components/common/TheNonLoginCarousel.vue';
import TheBestPartyFit from '../components/partyfit/TheBestPartyFit.vue';
</script>

<style scoped>
.before-login{
  align-items: start;
  justify-content: left;
  display : flex;
  flex-direction: row;
  padding-left: 100px;
  height: 55vh;
  max-width: 1300px;

}
.right{
height:100%;
}
.left{
  height:100%;
}
</style>