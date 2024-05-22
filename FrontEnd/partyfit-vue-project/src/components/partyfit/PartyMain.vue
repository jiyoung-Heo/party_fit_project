<template>
    <div>
      <div class="banner">
        <div v-if="party.bannerImage !== null">
          <img :src="party.bannerImage" width="100%" height="160px" />
        </div>
        <div v-else>
          <div
            style="
              width: 100%;
              height: 160px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            "
          >
            {{ party.name }}
          </div>
        </div>
      </div>
  
      <div v-if="currentStatus == 100">
        <button @click="joinParty">가입하기</button>
      </div>
      <div v-else-if="currentStatus == 0">
        <p>가입심사중...</p>
      </div>
      <div v-else-if="currentStatus == 1">
        <button @click="leaveParty">탈퇴하기</button>
      </div>
  
      <div class="board">
        <div class="left">
          <div class="notice">
            <hr />
            <p>공지사항</p>
            <ul>
              <div
                v-for="(article, index) in store.noticeList"
                :key="article.articleId"
              >
                <template v-if="index < 5">
                  <li>
                    <a>{{ article.title }}</a>
                    <a>{{ article.regDate.split('T')[0] }}</a>
                  </li>
                </template>
              </div>
            </ul>
          </div>
          <div class="hotView">
            <hr />
            <p>인기글</p>
            <ul>
              <div
                v-for="(article, index) in store.hotViewList"
                :key="article.articleId"
              >
                <template v-if="index < 5">
                  <li>
                    <a>{{ article.title }}</a>
                    <a>{{ article.viewCount }}</a>
                  </li>
                </template>
              </div>
            </ul>
          </div>
        </div>
        <div>
          <div class="calender">
            <h1>캘린더 들어갈곳</h1>
          </div>
          파티 참여자
          <hr />
          <div v-for="member in store.partyMemberList" :key="member.partyMemberId">
            {{ member.username }} <button v-if="member.grade == 1">매니저</button> <button v-if="member.grade != 1">회원</button> 
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import { usePartyStore } from '@/stores/party';
  import { useUserStore } from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const userstore = useUserStore();
  const store = usePartyStore();
  
  const party = ref(store.selectedParty);
  const partymemberlist = ref(store.partyMemberList);
  
  
  const loginUser = ref(userstore.loginUser);
  const currentStatus = ref(null);
  
  onMounted(async () => {
    store.getNoticeList(route.params.partyId);
    store.getHotViewList(route.params.partyId);
    //가입중인원전체조회
    store.getMemberList(route.params.partyId, 1)
    currentStatus.value = await userstore.partyStatus(route.params.partyId);
  });
  
  const joinParty = async () => {
    await userstore.partyJoinRequest(route.params.partyId);
    currentStatus.value = await userstore.partyStatus(route.params.partyId);
  };
  
  const leaveParty = async () => {
    await userstore.partyLeaveRequest(store.selectedParty.partyId);
    currentStatus.value = await userstore.partyStatus(route.params.partyId);
  };
  
  const isWaiting = computed(() => {
    return store.memberRequestList.includes(userstore.loginUser);
  });
  </script>
  
  <style scoped>
  li {
    display: flex;
    justify-content: space-around;
  }
  
  li a:nth-of-type(2) {
    border: black solid 1px;
    flex: 1;
    text-align: right;
  }
  
  li a:nth-of-type(1) {
    border: black solid 1px;
    flex: 2;
  }
  
  ul {
    margin: 10px;
  }
  
  .board {
    display: flex;
    flex-direction: row;
  }
  
  .left {
    flex: 1;
  }
  
  .calender {
    flex: 1;
    border: black solid 1px;
    background-color: aquamarine;
  }
  </style>
  