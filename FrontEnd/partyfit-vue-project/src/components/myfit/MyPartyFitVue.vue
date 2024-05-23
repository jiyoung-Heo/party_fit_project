<template>
  <div class="my-party-fit">
    <div class="header">나의 partyfit</div>
    <hr />
    <div class="party-list">
      <div v-if="partyList == undefined || partyList== '' || partyList.length == 0" class="no-party">
        <p>파티가 없습니다. 파티에 가입해보세요!</p>
        <button @click="goAllparty">파티 둘러보기 가기</button>
      </div>
      <div v-else
        v-for="party in partyList"
        :key="party.partyId"
        class="party"
        @click="gopartyPage(party)"
      >
        <img :src="party.introductionImage" alt="파티 이미지" width="150px" />
        <p>{{ party.name }}</p>
        <p>{{ party.exerciseCategory }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { usePartyStore } from "@/stores/party";

const store = usePartyStore();
const userStore = useUserStore();
const router = useRouter();
const partyList = ref();
onMounted(async () => {
  await userStore.getMyPartyFit();
  partyList.value = userStore.partyList;
});

const gopartyPage = function (party) {
  // console.log(party.partyId);
  store.selectedParty = party;
  router.push({
    name: "partyfitmain",
    params: { partyId: store.selectedParty.partyId },
  });
};
const goAllparty = function(){
  router.push({name:"allPartyFit"})
}
</script>
  
  <style scoped>
.my-party-fit {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  font-size: 18px;
  font-weight: bold;
}

.party-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.party {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.party:hover {
  transform: scale(1.05);
}
</style>
  