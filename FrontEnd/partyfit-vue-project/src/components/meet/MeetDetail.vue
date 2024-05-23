<template>
  <div>
    <h2>모임 상세 페이지</h2>
    <!-- <button type="button" @click="deleteMeet"> 삭제 </button> -->
    <template v-if="isJoin">
      참여예정 모임
      <button @click="deleteMeet(store.selectedMeet.meetId)">참여취소</button>
    </template>
    <template v-else>
      <button @click="meetjoinRequest(store.selectedMeet.meetId)">
        참여하기
      </button>
    </template>
    <div class="category" @click="goBoard()">모임목록 ></div>
    <div class="title fs-5" v-if="store.selectedMeet">
      {{ store.selectedMeet.title }}
    </div>
    <div class="writer d-inline-flex" v-if="store.selectedMeet">
      <div>
        <p style="font-size: 10px">
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
    <p>모임 최대인원: {{ store.selectedMeet.maxHeadcount }}</p>
    <p v-if="store.meetMemberList != null">
      현재 참여자 수: {{ store.meetMemberList.length }}명
    </p>
    <div>
      명단
      <p v-for="member in store.meetMemberList" :key="member.userId">
        {{ member.username }}
      </p>
    </div>
    <hr />
    <div class="container content" v-if="store.selectedMeet">
      {{ store.selectedMeet.content }}
    </div>
    <hr />
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
  await store.canceljoinRequest(meetId);
  isJoin.value = !isJoin.value;
};

const meetjoinRequest = async function (meetId) {
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
  await store.getMeetMemberList(store.selectedMeet.partyId,store.selectedMeet.meetId);

  isJoin.value = store.meetMemberList.some(
    (member) => member.userId == userstore.loginUserId
  );
});
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