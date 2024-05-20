<template>
    <div :key="key">

      <div class="member-request-management">
          <h1>회원 관리 </h1>
          <div v-if="store.memberRequestList.length === 0">
              가입 요청이 없습니다.
          </div>
          <div v-else>
            가입요청
              <ul>
                  <li v-for="user in store.memberRequestList" :key="user.userId">
                  
                      <p>{{ user.username }} ({{ user.age}}세)</p>
                      <p>로그인 ID: {{ user.loginId }}</p>
                      <button href="#"  @click="approveRequest(user)">승인</button>
                      <button href="#" @click="rejectRequest(user)">거부</button>
                  </li>
              </ul>
          </div>
      </div>
      <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>나이</th>
                        <th>닉네임</th>
                        <th>로그인</th>
                        <th>파티등록일 </th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="user in store.partyMemberList" :key="user.userId">
                        <td>{{ user.name }} </td>
                        <td>{{ user.age }} </td>
                        <td>{{ user.username }} </td>
                        <td>{{ user.loginId }} </td>
                        <td>{{ user.regDate.split('T')[0] }} </td>
                        <button @click="rejectRequest(user)">강퇴</button>
                    </tr>
                </tbody>
            </table>

      <nav aria-label="Page navigation">
          <ul class="pagination d-flex justify-content-center">
              <li class="page-item">
                  <a class="page-link" @click.prevent="currentPage--" :class="{ disabled: currentPage <= 1 }"
                      href="#">&lt;</a>
              </li>
              <li class="page-item" :class="{ active: currentPage === page }" v-for="page in pageCount" :key="page">
                  <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
                      page
                  }}</a>
              </li>
              <li class="page-item">
                  <a class="page-link" @click.prevent="currentPage++" :class="{ disabled: currentPage >= pageCount }"
                      href="#">&gt;</a>
              </li>
          </ul>
      </nav>
  </div>



</template>

<script setup>
import { usePartyStore } from '@/stores/party';
import { computed, onMounted, ref,watch } from 'vue';
import ArticleDetail from '../article/ArticleDetail.vue';
import { useRouter } from "vue-router";
const router = useRouter();
const partyMemberList = computed(() => {return store.memberRequestList});
const perPage = 12;
const currentPage = ref(1);

const store = usePartyStore();

onMounted(() => {
  store.getMemberRequestList()
  store.getMemberList(1)
})

const key = ref(0);

const forceRerender = () => {
key.value++;
};

const pageCount = computed(() => {
  return Math.ceil(store.freeList.length / perPage);
});

const clickPage = function (page) {
  currentPage.value = page;
};

const currentPageArticleList = computed(() => {
  return store.freeList.slice(
      (currentPage.value - 1) * perPage,
      currentPage.value * perPage
  );
});
watch(() => store.partyMemberList, () => {
forceRerender();
});


const approveRequest = function (user) {
  store.approveRequest(user);

  window.location.reload();
// router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
}

const rejectRequest = function (user) {
  store.rejectRequest(user);

  window.location.reload();
  // router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
}



</script>

<style scoped>
.input-group {
  max-width: 700px;
  display: flex;
  justify-content: space-between;

}

.input-group>.form-control,
.input-group>.form-floating,
.input-group>.form-select {
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