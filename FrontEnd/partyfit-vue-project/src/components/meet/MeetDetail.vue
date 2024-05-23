<template>
  <div class="widget-container"><div class="widget">
    
    <!-- <button type="button" @click="deleteMeet"> 삭제 </button> -->
    <template v-if="isJoin">
      참여예정 모임
      <button class="delete-button"   @click="deleteMeet(store.selectedMeet.meetId)">참여취소</button>
    </template>
    <template v-else>
      <button @click="meetjoinRequest(store.selectedMeet.meetId)" class="join">
        참여하기
      </button>
    </template>
    <div class="category" @click="goBoard()">모임목록 ></div>
    <div class="title " v-if="store.selectedMeet">
      {{ store.selectedMeet.title }}
    </div>
    <div class="writer" v-if="store.selectedMeet">
      <div>
        <p style="" >
          {{ store.selectedMeet.startTime.split("T")[0] }}
        </p>
      </div>
    </div>
    <p>
      모임일자: {{ store.selectedMeet.startTime.split("T")[0] }}
      {{ store.selectedMeet.startTime.split("T")[1].slice(0, 5) }} ~
      {{ store.selectedMeet.endTime.split("T")[0] }}
      {{ store.selectedMeet.endTime.split("T")[1].slice(0, 5) }}
    </p>
    <a>모임 최대인원: {{ store.selectedMeet.maxHeadcount }}</a>
    <a v-if="store.meetMemberList != null" style="margin-left:20px;">
      현재 참여자 수: {{ store.meetMemberList.length }}명
    </a>
    <div class="list">
      명단
      <a v-for="member in store.meetMemberList" :key="member.userId">
        {{ member.username }} 
      </a>
    </div>
    <hr>
    <div class="container content" v-if="store.selectedMeet">
      {{ store.selectedMeet.content }}
    </div>
  </div>
  </div>
</template>
  
  
  <script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const store = usePartyStore();
const route = useRoute();
const userstore = useUserStore();

const articleId = ref();

const deleteMeet = async (meetId) => {
  console.log(meetId)
  await store.canceljoinRequest(meetId);
  isJoin.value = !isJoin.value;
};

const meetjoinRequest = async function (meetId) {
  console.log(meetId)

  await store.meetjoinRequest(meetId);
  isJoin.value = !isJoin.value;
};

const goBoard = function () {
  router.push({
    name: "meetlist",
    params: { partyId: store.selectedMeet.partyId },
  });
};

const isJoin = ref(false);

onMounted(async () => {
  await store.getMeetMemberList(store.selectedMeet.partyId, store.selectedMeet.meetId);
  if (Array.isArray(store.meetMemberList)) {
    isJoin.value = store.meetMemberList.some(
      (member) => member.userId == userstore.loginUserId
    );
  } else {
    console.error('meetMemberList가 배열이 아닙니다:', store.meetMemberList);
    isJoin.value = false; // 기본값 설정
  }
});
</script>
  
<style scoped>
.list{
  position:absolute;
  right:50px;
  top:100px;
display:flex;
flex-direction: column;
border:black 1px solid;
padding: 5px 10px;
background-color: #ffc280a0;
max-height:300px;
overflow-y: auto;
}
.list a{
  border:black 1px solid;
  padding: 10px 20px;
  margin:5px;
  background-color: #ffffffa0;
}


/* 스크롤바 설정*/
.list::-webkit-scrollbar {
  width: 5px;
}

/* 스크롤바 막대 설정*/
.list::-webkit-scrollbar-thumb {
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px;
}

.join{
position:absolute;
right:30px;
margin: 1rem;
  border : none;
  background-color: rgba(254, 176, 51, 0.744);
  padding:10px 20px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
}
.join:hover{
  background-color: rgba(243, 150, 0, 0.744);
  transition: transform 0.3s;
  transform: translateY(2px) translateX(2px);
  box-shadow: none;

}
.widget-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.widget {
  position:relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  padding: 20px;
  width: 80%; /* 수정: 너비를 조정하여 가로로 넓게 배치 */
  max-width: 1000px; /* 수정: 최대 너비를 지정 */
  overflow: hidden;
  margin: 20px;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  float: right;
}

.delete-button:hover {
  background-color: #ff7875;
}

.category {
  color: #ff7f00;
  cursor: pointer;
  margin-bottom: 10px;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.writer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.writer-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.writer-info p {
  margin: 0;
}

.reg-date {
  font-size: 10px;
  color: #888;
}

.content {
  margin: 20px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}

hr {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 20px 0;
}
</style>