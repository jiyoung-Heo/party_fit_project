<template>
  <div>
    <h2>모임 상세 페이지</h2>
    <!-- <button type="button" @click="deleteMeet"> 삭제 </button> -->
    <button @click="meetapproveRequest(store.selectedMeet.meetId)">승인</button>
    <button @click="meetrejectRequest(store.selectedMeet.meetId)">거절</button>

    <div class="category" @click="goBoard()">가입요청 목록 ></div>
    <hr />

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
import Swal from "sweetalert2";

const router = useRouter();
const store = usePartyStore();
const userstore = useUserStore();

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
    name: "manageRequest",
    params: { partyId: store.selectedParty.partyId },
  });
};

const meetapproveRequest = function (meetId) {
  // console.log("수락");
  store.meetapproveRequest(meetId);
  Swal.fire({
    title: "모임 개설이 수락되었습니다.",
    text: "모임명: "+store.selectedMeet.title,
    icon: "success",
  });
  // window.location.reload();
  goBoard()
  // router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
};

const meetrejectRequest = function (meetId) {
  // console.log("거절");
  store.meetrejectRequest(meetId);
  Swal.fire({
    title: "모임 개설이 거절되었습니다.",
    text: "모임명: "+store.selectedMeet.title,
    icon: "error",
  });
  // window.location.reload();
  goBoard()
  // router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
};
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