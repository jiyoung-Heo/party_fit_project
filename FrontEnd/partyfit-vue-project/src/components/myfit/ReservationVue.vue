<template>
    <div class="reservation">
        여기는 예약페이지

        <h2>
            예약된 일정
        </h2>
        <hr>
        <div class="container">
            {{ store.meetList.value }}
            <div  v-for="(meet,index) in store.meetList" :key="index" >
                <div class="meet">
                    <p> {{meet.title}}</p>
                    
                    <p> {{meet.startTime.split('T')[0]}}</p>
<hr>    
                </div>
            </div> 
         
           
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref , watch } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
const meetList = ref([]);
const insdf = ref("gfsd");
onMounted(()=>{
    store.getMyMeet();
    // console.log("loginUser" + store.loginUser.value);
})
// console.log(store.partyList.value);
meetList.value = store.meetList.value;



</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: solid black 1px;
}

.meet {
    text-align: left;
    margin : 10px;

}

</style>