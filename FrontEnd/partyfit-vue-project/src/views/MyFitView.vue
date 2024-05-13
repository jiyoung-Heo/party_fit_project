<template>
  <div class="container grid text-center">
    <div class="row">
      <div class="col-sm-8">
        <TheMyFitHeaderNavVue />
        <CarenderVue />
      </div>
      <div class="col-sm-4">
        <ReservationVue />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <MyPartyFitVue />
      </div>
      <div class="col-sm-4">
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
</script>

<style scoped>
 .row .col-sm-8, .col-sm-4{
  border:1px solid red;
 }
</style>
