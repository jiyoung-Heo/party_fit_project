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
      모집중인 모임 {{partyStore.partyList.length}}개
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
.search {
  position: relative;
  width: 300px;
}

input {
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

img {
  position: absolute;
  width: 17px;
  top: 10px;
  right: 12px;
  margin: 0;
	cursor: pointer;
}
</style>