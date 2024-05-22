<template>
    <div>
        <hr>
        <div class="container">
            <div class="main">
                {{ isHovered}}
                <div id="left" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hovered': isHovered}" style="background-color:pink; width: 100px !important;">
   여기 isHover로 바꿔야함              <div v-if="isHovered" id="leftbox" class="leftbox">
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
const isunhovered = computed(() =>!isHovered.value);

const store = usePartyStore();
const party = ref();
const showLeftBox = ref(false);

onUnmounted(() => {
    store.selectedParty = "";
    store.isjoining = false;
    store.isManager = false;
    store.isWaiting = false;
})

onMounted(()=>{
    // console.log("in")
    // store.getMemberList(1)
    store.getMemberRequestList()
    // store.getMeetList(0)
    // store.getMeetList(1)
    // store.getMeetList(2)
})

</script>

<style scoped>

#leftbox{
    position:sticky;
    height:auto;
}
.hovered {
    transform: translateX(10px); /* 요소를 위로 이동시켜 튀어나오는 효과 생성 */
    transition: transform 0.3s ease; /* transform 속성에 대한 애니메이션 효과를 0.3초 동안 ease 함수로 적용 */
}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
}

#leftArea {
    height: 70vh;
    width: 20px;
}

.leftbox {
    position :sticky;
    top: 100px;
    width: 210px;
    height: 100%;
    overflow-y: auto;
    flex: 1;
    animation: compare 2s infinite alternate;
    z-index:1;
}

.rightbox {
    flex: 1;
}

  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
}

.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    transform: translateX(200px);
}


* {
    border: 1px solid red;
}

.row {
    padding: 10px;
}
</style>
