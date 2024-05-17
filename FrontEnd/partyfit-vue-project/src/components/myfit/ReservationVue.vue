<template>
    <div class="reservation">
      
        <div class="row justify-content-between align-items-center" style="margin:0px;">

            <div style="" class="col-auto reduce-margin fs-4  fw-normal">
                예약된 일정
            </div>
            <a style="color: coral;" class="col-auto ">+ 더보기</a> 
        </div> 
        <hr style="margin:5px;">
        <div class="container">
            {{ store.meetList.value }}
            <div  v-for="(meet,index) in store.meetList" :key="index" >
                <div class="meet">
                    <p> {{meet.title}}</p>
                    
                    <p style="color:grey;"> {{meet.startTime.split('T')[0]}}</p>

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
/* .header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-top : 10px;
} */
.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.meet {
    text-align: left;
    margin : 10px;

}

</style>