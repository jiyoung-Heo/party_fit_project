<template>
    <div>
        <h2>모임 상세 페이지 </h2>
      <button type="button" @click="deleteMeet"> 삭제 </button>
      <button @click="meetjoinRequest(store.selectedMeet.meetId)">가입신청</button>
      <div class="category" @click="goBoard()"> 모임목록 > </div>
       <div class="title fs-5" v-if="store.selectedMeet">{{ store.selectedMeet.title }}</div>
      <div class="writer d-inline-flex" v-if="store.selectedMeet">
        <div>
         
          <p style="font-size: 10px;">{{ store.selectedMeet.startTime.split('T')[0] }}</p>
        </div>
      </div>
      <hr>
      <div class="container content" v-if="store.selectedMeet">{{ store.selectedMeet.content }}</div>
      <hr>
  
  
      <CommentList :article-id="articleId" />
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from 'vue-router';
  import { usePartyStore } from "@/stores/party";
  import { useUserStore } from "@/stores/user";
  
  const router = useRouter();
  const store = usePartyStore();
  const route = useRoute();
  const userstore = useUserStore();
  
  const articleId = ref();
  const article = ref()
  
  const writer = ref();
  
  const deleteMeet = () => {
    store.meetrejectRequest(store.selectedMeet.meetId)
    goBoard()
  };
  
  onMounted(() => {
    })
    
  const meetjoinRequest = function (meetId) {
    store.meetjoinRequest(meetId);
    // router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
  }
  
  const goBoard = function () { 
          router.push({name: 'meetlist', params: {partyId: store.selectedParty.partyId}})
      }
  </script>
  
  <style scoped>
  .writer-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin: 5px;
  }
  
  p {
    margin: 0;
  }
  
  .category {
    color: #ff7f00;
  }
  
  .content {
    height: 50vh;
  }
  </style>