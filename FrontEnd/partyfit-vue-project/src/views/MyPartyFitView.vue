<template>
  <div class="mypartyfit-container">
    <div class="header">
      <h3>PARTY FIT</h3>
      <div class="buttons">
        <button type="button" class="btn btn-outline-primary" @click="end">모집마감</button>
        <button type="button" class="btn btn-outline-primary" @click="ing">모집중</button>
      </div>
    </div>
    <div class="search mb-3">
      <input type="text" placeholder="검색어 입력" v-model="searchWord" class="form-control" />
      <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" @click="search"
        class="search-icon" />
    </div>
    <div v-if="partyStore.partyList == null">
      <p class="count">모집중인 모임 0개</p>
    </div>
    <div v-else>
      <p class="count">모집중인 모임 {{ partyStore.partyList.length }}개</p>
    </div>
    <select v-model="selectedOrder" class="form-select mb-3">
      <option value="reg_date desc">최신순</option>
      <option value="reg_date asc">오래된순</option>
      <option value="member_count desc">회원많은순</option>
      <option value="member_count asc">회원적은순</option>
    </select>
    <hr>
    <PartyListVue :order-by="orderBy" :is-end="isEnd" :search="propsWord" />
  </div>
</template>

<script setup>

import PartyListVue from "@/components/partyfit/PartyListVue.vue";
import { usePartyStore } from "@/stores/party";
import { ref, watch } from "vue";

const partyStore = usePartyStore()
const selectedOrder = ref("reg_date desc");

const orderBy = ref(selectedOrder.value);
const isEnd = ref(false);

watch(selectedOrder, (newOrder) => {
  orderBy.value = newOrder;
});

const end = () => {
  isEnd.value = true;
};
const ing = () => {
  isEnd.value = false;
};

const propsWord = ref('')
const searchWord = ref('')

const search = () => {
  propsWord.value = searchWord.value
}

</script>

<style scoped>

.mypartyfit-container {
  justify-content: left;
  padding-left: 150px;
  height: 90vh;
  max-width: 1300px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.buttons .btn {
  margin-right: 10px;
  border-radius: 20px;
  font-size: 14px;
  padding: 8px 15px;
}

.buttons .btn:last-child {
  margin-right: 0;
}

.search {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
}

.search input[type="text"] {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 50px;
  padding: 10px 40px 10px 20px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  width: 20px;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  cursor: pointer;
}

.count {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
}

select.form-select {
  border: 1px solid #ced4da;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 14px;
}

@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .buttons .btn {
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>