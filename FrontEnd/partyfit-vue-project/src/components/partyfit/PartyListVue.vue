<template>
  <div>
    모집중인 모임 {{filteredPartyList.length}}개
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="party in filteredPartyList" :key="party.partyId" @click="gopartyPage(party)">
        <div class="col">
          <div class="card">
            <img
              :src="party.introductionImage"
              class="card-img-top fit-image"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ party.name }}</h5>
              <p class="card-text">{{ party.memberCount }}명 참여 중</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePartyStore } from "@/stores/party";
import { storeToRefs } from "pinia";
import { onMounted, watch, computed } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const partyStore = usePartyStore();
onMounted(() => {
  partyStore.getPartyListWithCondition();
});

const props = defineProps({
  orderBy: String,
  isEnd: Boolean,
  search: String,
});

watch(
  () => [props.orderBy, props.search],
  () => {
    const condition = {
      key: "name",
      word: props.search || '',
      orderBy: props.orderBy.split(" ")[0],
      orderByDir: props.orderBy.split(" ")[1],
    };
    partyStore.getPartyListWithCondition(condition);
  }
);

const filteredPartyList = computed(() => {
  if (!Array.isArray(partyStore.partyList)) {
    return [];
  }
  return partyStore.partyList.filter((party) => {
    if (props.isEnd) {
      return party.memberCount >= party.maxHeadcount;
    } else {
      return party.memberCount < party.maxHeadcount;
    }
  })
})

const gopartyPage = function(party) {
    // console.log(party.partyId)
    //나중에 필요하면 쓰기
    partyStore.selectedParty = party;
    console.log(party)
    //이제 페이지 이동하니까 초기화 시켜버리기 나중에 안헷갈리게
    partyStore.partyList = null;
    router.push({ name: 'partyfitmain', params: { partyId: party.partyId } });
    
  };

</script>

<style scoped>
.fit-image {
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지가 비율을 유지하면서 카드에 맞게 조정됩니다. */
  max-height: 200px; /* 이미지의 최대 높이를 지정할 수 있습니다. */
}
</style>