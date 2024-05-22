<template>
  <div class="container">
    <div>
      <h3>PARTY FIT</h3>
      <button type="button" @click="end">모집마감</button>
      <button type="button" @click="ing">모집중</button>
      <div class="search">
        <input type="text" placeholder="검색어 입력" v-model="searchWord" />
        <img
          src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" @click="search"
        />
      </div>
      <select v-model="selectedOrder">
        <option value="reg_date desc">최신순</option>
        <option value="reg_date asc">오래된순</option>
        <option value="member_count desc">회원많은순</option>
        <option value="member_count asc">회원적은순</option>
      </select>
    </div>
    <hr />
    <PartyListVue :order-by="orderBy" :is-end="isEnd" :search="propsWord"/>
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

const search = () =>{
	propsWord.value = searchWord.value
}

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.buttons button {
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #0056b3;
}

.search {
  position: relative;
  width: 100%;
  max-width: 300px; /* 변경 */
}

input[type="text"] {
  width: calc(100% - 40px);
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

img {
  position: absolute;
  width: 17px;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  cursor: pointer;
}

.count {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

select {
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
}

/* 미디어 쿼리 */
@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .buttons button {
    margin-bottom: 10px;
  }
}
</style>