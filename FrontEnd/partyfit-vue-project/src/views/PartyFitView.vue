<template>
    <div>

        <hr>
        <div class="container">
            <div class="main">
                <div  id="leftbox">
                    <PartyNav />
                </div>
                <div class="rightbox" id="rightbox">
                    <RouterView/>

                </div>

            </div>
        </div>
    </div>

</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';

import TheMyFitHeaderNavVue from "@/components/myfit/TheMyFitHeaderNav.vue";
import CarenderVue from "@/components/myfit/CarenderVue.vue";
import MyPartyFitVue from "@/components/myfit/MyPartyFitVue.vue";
import ReservationVue from "@/components/myfit/ReservationVue.vue";
import TodoCheckVue from "@/components/myfit/TodoCheckVue.vue";
import PartyNav from "@/components/partyfit/PartyNav.vue";

import { onMounted, onUnmounted, ref } from 'vue'
import { usePartyStore } from '@/stores/party';

const store = usePartyStore();
const party = ref();

onMounted(() => {

})

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.leftbox {
    width: 200px;
    height: 70vh;
    overflow-y: auto;
    flex: 1;
}

.rightbox {
    flex: 1;
}

* {
    border: 1px solid red;
}

.row {
    padding: 10px;
}
</style>
<!-- @media (max-width: 900px) {
    .leftbox {
        display: none; /* 화면 크기가 작아지면 leftbox를 숨김 */
    }
}  -->