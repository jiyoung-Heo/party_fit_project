<template>
    <div>
      <div class="banner">
        <div v-if="party.bannerImage !== null ||party.bannerImage !== ''">
          <img :src="party.bannerImage" width="100%" height="160px" style="z-index:2;" />
        </div>
        <div v-else>
          <div
            style="
              width: 100%;
              height: 160px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            ">
          {{ party.name }}
        </div>
      </div>
      <div class="status">
        <div v-if="currentStatus == 100" class="status-container ">
          <button @click="joinParty" class="join-button btn btn-jelly">가입하기</button>
        </div>
        <div v-else-if="currentStatus == 0" class="status-container">
          <p class="pending-message">가입 심사중...</p>
        </div>
        <div v-else-if="currentStatus == 1" class="status-container">
          <button @click="leaveParty" class="leave-button">탈퇴하기</button>
        </div>
      </div>
    </div>

    <div class="board">
      <div class="left">
        <div class="notice">
          <p> 💡공지사항</p>
          <ul>
          <div v-if="store.noticeList == null || store.noticeList == undefined || store.noticeList == ''">
                    등록된 글이 하나도 없습니다.
                </div>
            <div v-for="(article, index) in store.noticeList" :key="article.articleId">
              <template v-if="index < 5">
                <li  @click="goArticleDetail(article.articleId)">
                  <div class="note">
                    <div class="note-title">{{ article.title }}</div>
                    <div class="note-date">{{ article.regDate.split('T')[0] }}</div>
                  </div>
                </li>
              </template>
            </div>
          </ul>
        </div>
        <div class="hotView">
          <p>🔥인기글</p>
          <ul>
            <div v-if="store.hotViewList == null || store.hotViewList == undefined || store.hotViewList == ''">
                    등록된 글이 하나도 없습니다.
            </div>
            <div v-for="(article, index) in store.hotViewList" :key="article.articleId">
              <template v-if="index < 5">
                <li @click="goArticleDetail(article.articleId)">
                  <div class="note">

                  <div class="note-title">{{ article.title }}</div>
                  <div class="note-date">{{ article.viewCount }}</div>
                    </div>
                </li>
              </template>
            </div>
          </ul>
        </div>
      </div>
      <div class="right parent"> 
        <PartyCarenderVue/>
        <div class="sticky-header is-sticky party-members">

          <!-- <div class="party-members"> -->
            파티 참여자
            <ul>
              <li v-for="member in store.partyMemberList" :key="member.partyMemberId">
                ▪<a>{{ member.username }}</a> <span v-if="member.grade == 1"> 매니저</span> <span v-if="member.grade != 1"> 회원</span>
              </li>
            </ul>
          </div>
        <!-- </div> -->
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PartyCarenderVue from "@/components/partyfit/PartyCarenderVue.vue";

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
    store.getHotViewList(route.params.partyId,0);
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

  const goArticleDetail = function (articleId) {
    // console.log(articleId);
    // getArticleDetail(articleId,false)
    if(currentStatus.value != 1){
      alert('카페가입자만 조회가능합니다.')
    }else{
      router.push({ name: 'articleDetail', params: { articleId: articleId, partyId: store.selectedParty.partyId } })
    }
}
  </script>
<style scoped>

.status {
  position: absolute;
  right : 9px; 
  top:80px; 
  z-index:1;
}


.status-container {
}


.join-button,
.leave-button {

  
}

.join-button {
}


.banner{
position: relative;
}

.btn-jelly:hover {
  animation: jelly 0.5s;

  background-color: coral;
}


.btn {
  margin: 0;
  text-align: right;
  border : none;
  color: white;
  background-color: coral;
  &-jelly {
    &:hover {
      animation: jelly 0.5s;
    } 
  }
}

@keyframes jelly {
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
}


.pending-message {
  font-style: italic;
  color: #6c757d;
}
.notice ,.hotView{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  margin-bottom : 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.note {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  overflow: hidden; /* 넘치는 부분을 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ... 으로 표시 */

}

.note-title {
  font-weight: bold;
}

.note-date {
  font-size: 12px;
  color: #999;
}

li{
  display: flex;
}
.party-members li a{
  flex:3;
  border: none;
}
li span{
  flex:1;
}

.left {
  flex: 1;
}

.calender, .party-members{
  flex: 1;
}

.right {
  flex: 1;
 
}

.right div{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;

}
.calender {
  margin: 20px;
  flex:1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  /* 캘린더 배경색 및 투명도 조절 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 추가 */
}

.party-members {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  /* 파티 참여자 목록 배경색 및 투명도 조절 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 추가 */
}

.board {
  display: flex;
  flex-direction: row;
}

</style>