<template>
    <div>
        <hr>
        <div class="party-main">
            <div class="main">
                <div id="left" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hovered': isHovered}" >
            <div v-if="isHovered" id="leftbox" class="leftbox">
                        <PartyNav />
                    </div>
                </div>
                <div class="rightbox ms-3 mt-3" id="rightbox">
                    <RouterView />
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

import { onMounted, onUnmounted, ref,computed } from 'vue'
import { usePartyStore } from '@/stores/party';

const isHovered = ref(false);

const store = usePartyStore();
const party = ref();
const showLeftBox = ref(false);

onUnmounted(() => {
// store.selectedParty = "";
store.isjoining = false;
store.isManager = false;
store.isWaiting = false;
})

onMounted(()=>{
    // console.log("in")
    // store.getMemberList(1)
    // store.getMemberRequestList()
    // store.getMeetList(0)
    // store.getMeetList(1)
    // store.getMeetList(2)
})

</script>

<style scoped>
.party-main{
    align-items: start;
  justify-content: left;
  max-width: 1300px;
}

#leftbox{
    border:1px black solid;
    position:sticky;
    height: auto;
    z-index: 999;
}
.hovered {
    transform: translateX(10px); /* 요소를 위로 이동시켜 튀어나오는 효과 생성 */
    transition: transform 01s ease; /* transform 속성에 대한 애니메이션 효과를 0.3초 동안 ease 함수로 적용 */


}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
}


.leftbox {
    position :sticky;
    top: 100px;
    width: 210px;
    height: 100%;
    overflow-y: auto;
    flex: 1;
    animation: compare 2s infinite alternate;
    z-index:100;
}

.rightbox {
    flex: 1;
    padding: 0px 20px;
}

  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
}

.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    transform: translateX(200px);
}


#left{
    background-color:rgba(195, 195, 195, 0.233); 
    width: 100px !important;
}

#left:hover{
    background-color:rgb(255, 255, 255); 
    width: 100px !important;
}

</style>
