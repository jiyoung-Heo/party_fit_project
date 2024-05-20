<template>
  <div>
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
                    <!-- 카테고리: {{ party.exerciseCategory }} -->
                    {{ party.memberCount }}명 참여 중
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    밑에는 테스트즁,,
    <div id="partyCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(party, index) in partyStore.partyList"
          :key="party.partyId"
          :class="{ 'carousel-item': true, active: index / 4 === 0 }"
          :data-bs-interval="false"
          
        >
          <div class="row row-cols-1 row-cols-md-3 g-4">
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
                    <!-- 카테고리: {{ party.exerciseCategory }} -->
                    {{ party.memberCount }}명 참여 중
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#partyCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#partyCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
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
  partyStore.getPartyListWithMemberCount();
});

const gopartyPage = function(party) {
    router.push({ name: 'partyfitmain', params: { partyId: party.partyId } });
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