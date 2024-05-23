<template>
  <div class="reservation">
    <div class="header">
      <div class="title">예약된 일정</div>
      <a class="more-link">+ 더보기</a>
    </div>
    <hr />
    <div class="meet-list">
      <div v-for="meet in meetList" :key="meet.meetId" class="meet" @click="clickMeet(meet)">
        <p class="title">{{ meet.title }}</p>
        <p class="date">{{ meet.startTime.split("T")[0] }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { usePartyStore } from "@/stores/party";
import { useRouter } from "vue-router";
const router = useRouter()
const partyStore = usePartyStore()
const clickMeet = (meet)=>{
  partyStore.getOneParty(meet.partyId)
  partyStore.selectedMeet = meet
  router.push({ 
        name:"meetdetail", 
      params: 
      {partyId: meet.partyId, 
        meetId: meet.meetId}})
}
const store = useUserStore();
onMounted(async () =>  {
  await store.getMyMeet();
  // console.log(store.meetList);
});

const meetList = computed(() => store.meetList);
</script>
  
  <style scoped>

  hr{
      border: 0;
      border-top: 3px double #8c8c8c;
  }
.reservation {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.more-link {
  color: coral;
  text-decoration: none;
  font-size: 14px;
}

.meet-list {
  margin-top: 10px;
  width: 250px;
  height : 50vh;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  text-overflow: ellipsis; /* 넘치는 부분을 ... 으로 표시 */
  overflow-y: auto;
}

/* 스크롤바 설정*/
.meet-list::-webkit-scrollbar{
  width: 5px;
}

/* 스크롤바 막대 설정*/
.meet-list::-webkit-scrollbar-thumb{
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px; 
}


.meet {
  text-align: left;
  margin: 10px 0;
}

.meet .title {
  font-weight: bold;
}

.meet .date {
  color: grey;
}
</style>
  