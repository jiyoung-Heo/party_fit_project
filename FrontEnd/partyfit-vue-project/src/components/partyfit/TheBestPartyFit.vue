<template>
  <div class="container">
    <div class="logo">
      <h2><span style="color: coral">Best</span> PartyFit</h2>
    </div>
    <hr />
    <div class="row row-cols-1 row-cols-md-2 g-3 meet-list">
      <div
        v-for="party in partyStore.partyList"
        :key="party.partyId"
        @click="gopartyPage(party)"
      >
        <div class="col">
          <div class="party">
            <img
              :src="party.introductionImage"
              class="card-img-top fit-image"
              alt="..."
            />
            <div
              class="card-body d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 class="party-name">{{ party.name }}</h5>
              </div>
              <div>
                <p class="card-text">{{ party.memberCount }}명 참여 중</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePartyStore } from "@/stores/party";
import Swal from "sweetalert2";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const partyStore = usePartyStore();

onMounted(() => {
  const condition = {
    orderBy: "member_count",
    orderByDir: "DESC",
  };
  partyStore.getPartyListWithCondition(condition);
});

const gopartyPage = function (party) {

  Swal.fire({
    title: "로그인 후 조회 가능합니다\n 로그인 하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff7f50",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "로그인",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "login" });
    }
  });
};

</script>

<style scoped>
.party {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
  transform: translateY(5px);
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 99;
}

.party:hover {
  transform: scale(1.05);
}

.logo {
  margin-top: 5%;
}
.party-name {
  margin-top: 10px;
  margin-bottom: 0.5rem; /* 그룹명과 멤버 수 사이의 간격을 줍니다. */
  font-size: 1.2rem; /* 그룹명의 글자 크기를 조정합니다. */
  color: #333; /* 그룹명 글자 색상을 지정합니다. */
}
.fit-image {
  width: 100%;
  height: auto;
  object-fit: contain; /* 이미지가 비율을 유지하면서 카드에 맞게 조정됩니다. */
  max-height: 150px; /* 이미지의 최대 높이를 지정할 수 있습니다. */
}

.party-name {
  margin-bottom: 0.5rem; /* 그룹명과 멤버 수 사이의 간격을 줍니다. */
  font-size: 1.2rem; /* 그룹명의 글자 크기를 조정합니다. */
  color: #333; /* 그룹명 글자 색상을 지정합니다. */
}
.meet-list {
  margin-top: 10px;
  /* width: 250px; */
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
</style>
