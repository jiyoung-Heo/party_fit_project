<template>
      <div class="memberrequestmanage">

        <MeetRequestManage />
        <br>
<hr>
<br>
        <div class="member-request-management">
            <h2>가입 요청 관리</h2>
            <br>
            <div v-if="memberRequestList === ''">
                가입 요청이 없습니다.
            </div>
            <div v-else  class="">
                <div class="d-flex row head">

                <div>닉네임(나이) </div>
                <div>로그인 ID </div>
                <div></div>
                
                </div>
                    <div class="list" v-for="user in memberRequestList" :key="user.userId">
                        
                        <div>{{ user.username }} ({{ user.age}}세)</div>
                        <div>{{ user.loginId }}</div>
                        <div class="btn"> 

                        <button href="#"  @click="approveRequest(user)">승인</button>
                        <button href="#" @click="rejectRequest(user)">거부</button>
                        </div>
                    </div>
            </div>
        </div>
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
.btn {
    flex:1;
display:flex;
flex-direction: row;
justify-content: space-around;
align-items:center;
}
button{
    align-items:center;
    width:80px;
    height:40px;
    justify-content: center;
}
.head{
    align-items:center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
}

.head  div{
    flex:1;
    justify-content: space-around;
    align-items:center;
    text-align: center;
    
}
.list {
    display: flex;
    flex-direction: row;
    align-items:center;
    text-align: center;
}
.list div{
    flex:2;
    align-items:center;
}

.member-request-management{
    height:30vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

/* 스크롤바 설정*/
.member-request-management::-webkit-scrollbar {
  width: 5px;
}

/* 스크롤바 막대 설정*/
.member-request-management::-webkit-scrollbar-thumb {
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px;
}

.memberrequestmanage{
    position: relative;
  align-items: start;
  justify-content: left;
  padding-left: 70px;
  height: 90vh;
  max-width: 1300px;
}


</style>