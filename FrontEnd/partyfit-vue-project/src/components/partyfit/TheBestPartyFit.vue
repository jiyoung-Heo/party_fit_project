<template>
  <div class="container">
    <div class="logo">
      <h2><span style="color:coral;">Best</span> PartyFit</h2>
    </div>
    <hr />
    <div class="row row-cols-1 row-cols-md-2 g-3">
      <div v-for="(party, index) in partyStore.partyList" :key="party.partyId" @click="gopartyPage(party)">
        <div class="col">
          <div class="party">
            <img :src="party.introductionImage" class="card-img-top fit-image" alt="..." />
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 class=" party-name">{{ party.name }}</h5>
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
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const partyStore = usePartyStore();

onMounted(() => {
  const condition = {
    orderBy: "member_count",
    orderByDir: "DESC",
  }
  partyStore.getPartyListWithCondition(condition);
});

const gopartyPage = function(party) {
  router.push({ name: 'partyfitmain', params: { partyId: party.partyId } });
  usePartyStore().selectedParty = party;
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
  z-index:99;
}

.party:hover {
  transform: scale(1.05);
}

.logo {
  margin-top: 5%;
}
.party-name{
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
</style>
