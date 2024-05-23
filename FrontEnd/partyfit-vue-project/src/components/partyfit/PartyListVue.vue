<template>
  <div>
    
    모집중인 모임 {{filteredPartyList.length}}개
    <div class="row row-cols-1 row-cols-md-3 g-4" data-aos="fade-down">
      <div v-for="party in filteredPartyList" :key="party.partyId" @click="gopartyPage(party)">
        <div class="col"  
        data-aos-easing="ease-out-cubic"
        data-aos-anchor-placement="top-bottom"
        
        data-aos="fade-down"
        
        data-aos-duration="800"
        
        >
          <div class="card party ">
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
   AOS.init(); 
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
.aos-animate {
  transition-delay: 50ms;
  pointer-events: auto;
}

.party:hover{
  transform: scale(1.1) translateY(-15px);
  transition: all 0.3s ease;
  
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
  
}
.party{
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

}
.fit-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 200px;
}
</style>