<template>
    <div class="my-party-fit">
      <div class="header">나의 partyfit</div>
      <hr>
      <div class="party-list">
        <div v-for="(party, index) in store.partyList" :key="index" class="party" @click="gopartyPage(party)">
          <img :src="party.introductionImage" alt="파티 이미지" width="150px" />
          <p>{{ party.name }}</p>
          <p>{{ party.exerciseCategory }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { usePartyStore } from '@/stores/party';
  
  const store = usePartyStore();
  const userStore = useUserStore();
  const router = useRouter();
  const partyList = ref([]);
  onMounted(() => {
    console.log("partyfitview")
     userStore.getMyPartyFit();
  });
  partyList.value = store.partyList.value;
  
  const gopartyPage = function(party) {
    console.log(party.partyId)
    store.selectedParty = party;
    router.push({ name: 'partyfitmain', params: { partyId: store.selectedParty.partyId } });
  };
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
  