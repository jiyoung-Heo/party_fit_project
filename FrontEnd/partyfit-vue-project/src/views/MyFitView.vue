<template>
  <div class="container grid text-center">
    <div class="row" style="height: 350px;">
      <div class="col-12 col-md-8">
        <TheMyFitHeaderNavVue />
        <CarenderVue />
      </div>
      <div class="col-12 col-md-4">
        <ReservationVue />
      </div>
    </div>
    <div class="row" style="height: 200px;">
      <div class="col-12 col-md-8">
        <MyPartyFitVue />
      </div>
      <div class="col-12 col-md-4">
        <TodoCheckVue />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheMyFitHeaderNavVue from "@/components/myfit/TheMyFitHeaderNav.vue";
import CarenderVue from "@/components/myfit/CarenderVue.vue";
import MyPartyFitVue from "@/components/myfit/MyPartyFitVue.vue";
import ReservationVue from "@/components/myfit/ReservationVue.vue";
import TodoCheckVue from "@/components/myfit/TodoCheckVue.vue";
import { onMounted } from "vue";

onMounted(() => {

})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f9fa;
}

.row {
  margin-bottom: 20px;
}

.col-12 {
  padding: 10px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
}
</style>
