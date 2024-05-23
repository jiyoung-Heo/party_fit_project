<template>
      <div :key="key">

        <MeetRequestManage/>

        <div class="member-request-management">
            <h1>가입 요청 관리</h1>
            <div v-if="memberRequestList === ''">
                가입 요청이 없습니다.
            </div>
            <div v-else>
                <ul>
                    <li v-for="user in memberRequestList" :key="user.userId">
                        
                        <p>{{ user.username }} ({{ user.age}}세)</p>
                        <p>로그인 Id: {{ user.loginId }}</p>
                        <button href="#"  @click="approveRequest(user)">승인</button>
                        <button href="#" @click="rejectRequest(user)">거부</button>
                    </li>
                </ul>
            </div>
        </div>
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
import { useRouter } from "vue-router";
import MeetRequestManage from './meetRequestManage.vue';
import Swal from "sweetalert2";

const router = useRouter();
const memberRequestList = computed(() => {return store.memberRequestList});
const perPage = 12;
const currentPage = ref(1);

const store = usePartyStore();

onMounted(() => {
    store.getMemberRequestList(store.selectedParty.partyId)
})

const key = ref(0);

const forceRerender = () => {
  key.value++;
};

const pageCount = computed(() => {
    if(store.memberRequestList == null) return null
    return Math.ceil(store.memberRequestList.length / perPage);
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

const goBoard = function () {
  router.push({
    name: "manageRequest",
    params: { partyId: store.selectedParty.partyId },
  });
  store.getMemberRequestList(store.selectedParty.partyId)

};

const approveRequest = function (user) {
    store.approveRequest(user);
    store.getMemberRequestList(store.selectedParty.partyId)
    Swal.fire({
    title: "가입 요청을 승인하였습니다.",
    text: "사용자 id: "+user.loginId,
    icon: "success",
  });
  goBoard()

// router.push({ name: 'manageRequest', params: { partyId: store.selectedParty.partyId}})
}

const rejectRequest = function (user) {
    store.rejectRequest(user);
    store.getMemberRequestList(store.selectedParty.partyId)
    Swal.fire({
    title: "가입 요청을 거부하였습니다",
    text: "사용자 id: "+user.loginId,
    icon: "error",
  });
  goBoard()

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