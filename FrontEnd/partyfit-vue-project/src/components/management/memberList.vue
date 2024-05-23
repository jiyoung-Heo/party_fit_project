<template>
  <div :key="key">
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>닉네임</th>
          <th>로그인</th>
          <th>파티등록일</th>
        </tr>
      </thead>
      <tbody>
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

    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            @click.prevent="currentPage--"
            :class="{ disabled: currentPage <= 1 }"
            href="#"
            >&lt;</a
          >
        </li>
        <li
          class="page-item"
          :class="{ active: currentPage === page }"
          v-for="page in pageCount"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            @click.prevent="currentPage++"
            :class="{ disabled: currentPage >= pageCount }"
            href="#"
            >&gt;</a
          >
        </li>
      </ul>
    </nav>
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
.input-group {
  max-width: 700px;
  display: flex;
  justify-content: space-between;
}

.input-group > .form-control,
.input-group > .form-floating,
.input-group > .form-select {
  position: relative;
  flex: 6 auto;
  width: 1%;
  min-width: 0;
}

.form-control {
  flex: 6;
}

.btn-warning {
  flex: 1;
}

.input-group button {
  background-color: #ff7f00;
  border: none;
  color: white;
  margin-left: 10px;
}

.input-group p {
  color: #ff7f00;
}
</style>