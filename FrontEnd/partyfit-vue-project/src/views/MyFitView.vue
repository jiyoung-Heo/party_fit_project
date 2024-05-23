<template>
  <div class="container grid text-center">
    <div class="row" style="min-height: auto;">
      <div class="col-12 col-md-8">
        <!-- <TheMyFitHeaderNavVue /> -->
        <CarenderVue  class="hovered"/>
      </div>
      <div class="col-12 col-md-4">
        <ReservationVue  class="hovered"/>
      </div>
    </div>
    <div class="row" style="min-height: auto;">
      <div class="col-12 col-md-8">
        <MyPartyFitVue  />
      </div>
      <div class="col-12 col-md-4 ">
        <TodoCheckVue  />
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


.hovered{
  transition: 0.3s transform ;
}
.hovered:hover{
  transform: scale(1.05);
  z-index:99;

}
.row {
  display: flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.col-12 {
  padding: 10px;
  box-sizing: border-box;
}


</style>
