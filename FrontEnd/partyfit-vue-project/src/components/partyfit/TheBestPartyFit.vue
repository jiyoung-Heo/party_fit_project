<template>
  <div class="container">
    <div class="logo">
      <h2><span class="coral-color">Best</span> PartyFit</h2>
    </div>
    <hr />
    <div>
      <div class="row row-cols-1 row-cols-md-4 g-3">
        <div v-for="(party, index) in partyStore.partyList" :key="party.partyId" @click="gopartyPage(party)">
          <template v-if="index <4">
            <div class="col">
              <div class="card">
                <img
                  :src="party.introductionImage"
                  class="card-img-top fit-image"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{{ party.name }}</h5>
                  <p class="card-text">
                    {{ party.memberCount }}명 참여 중
                  </p>
                </div>
              </div>
            </div>
          </template>
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
  partyStore.getPartyListWithCondition(condition)
});

const gopartyPage = function(party) {
    router.push({ name: 'partyfitmain', params: { partyId:  partyStore.selectedParty.partyId} });
    usePartyStore().selectedParty = party;
  };


</script>

<style scoped>
.logo {
  margin-top: 5%;
}
.fit-image {
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지가 비율을 유지하면서 카드에 맞게 조정됩니다. */
  max-height: 200px; /* 이미지의 최대 높이를 지정할 수 있습니다. */
}
/* .card {
  overflow: hidden;
} */
</style>