<template>
    <div class="my-party-fit row">
       <div class=" fs-4  fw-normal col-12 justify-content-start d-flex">나의 partyfit</div>
        <hr>
        <div class="container ">
        <div  v-for="(party,index) in store.partyList" :key="index" >
            <div class="party">
                <img :src=party.introductionImage alt="파티 이미지"/>
                <p> {{party.name}}</p>
                <p> {{party.exerciseCategory}}</p>

            </div>
        </div> 
        </div> 
       
    </div>
</template>

<script setup>
import { onMounted, ref , watch } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
const partylist = ref([]);
const insdf = ref("gfsd");
onMounted(()=>{
    store.getMyPartyFit();
    // console.log("loginUser" + store.loginUser.value);
})
// console.log(store.partyList.value);
partylist.value = store.partyList.value;

</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: solid black 1px;
}

.party{
    border: solid black 1px;
    margin : 10px;

}

</style>