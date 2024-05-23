<template>
  <div class="board">
    <h2>

    회원리스트
    </h2>
    <br>
    <div class="table-responsive"> 
    <table class=" table table-hover text-center">
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>닉네임</th>
          <th>로그인</th>
          <th>파티등록일</th>
        </tr>
      </thead>
      <tbody class="list">
        <tr v-for="user in store.partyMemberList" :key="user.userId">
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.loginId }}</td>
          <td>{{ user.regDate.split("T")[0] }}</td>
          <button @click="rejectRequest(user)">강퇴</button>
        </tr>
      </tbody>
    </table>

  </div>
  </div>
</template>

<script setup>
import { usePartyStore } from "@/stores/party";
import { computed, onMounted, ref, watch } from "vue";
import ArticleDetail from "../article/ArticleDetail.vue";
import { useRouter, useRoute } from "vue-router";
import memberRequestManage from "./memberRequestManage.vue";
import meetRequestManage from "./meetRequestManage.vue";
const router = useRouter();
const route = useRoute();
const partyMemberList = computed(() => {
  return store.memberRequestList;
});
const perPage = 12;
const currentPage = ref(1);

const store = usePartyStore();

onMounted(() => {
  store.getMemberList(route.params.partyId, 1);
});

const pageCount = computed(() => {
  if (store.partyMemberList == null) return null;
  console.log(Math.ceil(store.partyMemberList.length / perPage));
  return Math.ceil(store.partyMemberList.length / perPage);
});

const clickPage = function (page) {
  currentPage.value = page;
};

const rejectRequest = async function (user) {
  try {
    await store.rejectRequest(user);
    store.getMemberList(route.params.partyId, 1);
  } catch (e) {
  }
};
</script>

<style scoped>
.board {
  align-items: start;
  justify-content: left;
  padding-left: 40px;
  height: 60vh;
}
.table-responsive {
  max-height: 55vh;
  overflow-y: auto;
}

/* 테이블 헤더와 바디의 너비를 고정하여 가로 스크롤을 방지 */
.table {
  width: 100%;
}

.list {
  max-width: 1300px;
  overflow-y: scroll;
}


/* 스크롤바 설정*/
.table-responsive::-webkit-scrollbar {
  width: 5px;
}

/* 스크롤바 막대 설정*/
.table-responsive::-webkit-scrollbar-thumb {
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px;
}

</style>