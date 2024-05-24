<template>
  <div class="before-login">
    <TheNonLoginCarousel class="right" />
    <TheBestPartyFit class="left" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheNonLoginCarousel from "../components/common/TheNonLoginCarousel.vue";
import TheBestPartyFit from "../components/partyfit/TheBestPartyFit.vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  if (
    userStore.accessToken !== null &&
    userStore.accessToken !== "" &&
    userStore.accessToken !== "Bearer undefined"
  ) {
    router.push({name: 'myFit'})
  }
});
</script>

<style scoped>
.before-login {
  align-items: start;
  justify-content: left;
  display: flex;
  flex-direction: row;
  padding-left: 100px;
  height: 55vh;
  max-width: 1300px;
  margin: auto;
}
.right {
  height: 100%;
}
.left {
  height: 100%;
}
</style>