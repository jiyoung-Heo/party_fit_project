<template>
    <div>
        <nav class="leftbox fixed-left bg-light">
            <div class="nav-content">
                <div class="party-info">
                    <p class="fs-4 mt-2" @click="goPartyMainPage">{{ store.selectedParty.name }}</p>
                    <img :src="store.selectedParty.introductionImage" alt="헬스장 이미지" width="150px">
                    <p>참여인원 {{ store.selectedParty.memberCount }}명</p>
                </div>
                <hr>
                <div id="profile" class="profile-info">
                    <p v-if="loginUser.profile === ''">
                        <span class="material-icons">face</span>
                    </p>
                    <div v-else>
                        <img :src="`/src/assets/user/${loginUser.profile}`" alt="프로필사진" width="20px">
                    </div>
                    <a>{{ loginUser.name }} 님</a>
                </div>
                <div class="write-button" @click="goArticleCreatePage"> 게시글 쓰기 </div>
                <hr>
                <div class="nav-links">
                    <ul class="navbar-nav">
                        <p class="catagory"><a>게시판</a></p>
                        <li>
                            <RouterLink :to="{ name: 'noticeboard', params: { partyId: store.selectedParty.partyId } }">
                                공지사항</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'freeboard', params: { partyId: store.selectedParty.partyId } }">
                                자유게시판</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'introductionboard', params: { partyId: store.selectedParty.partyId}}">가입인사</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'reviewboard', params: { partyId: store.selectedParty.partyId}}">모임후기</RouterLink>
                        </li>

                        <p class="catagory"><a>일정</a></p>
                        <li>
                            <RouterLink :to="{ name: 'meetlist', params: { partyId: store.selectedParty.partyId}}">모임 조회</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'meetcreate', params: { partyId: store.selectedParty.partyId}}">모임 등록</RouterLink>
                        </li>
                        <!-- {{ store.isManager }} -->
                        <div v-if="store.isManager">
                            <p class="catagory"><a>운영</a></p>
                            <li>
                                <RouterLink :to="{ name: 'manageRequest', params: { partyId: store.selectedParty.partyId } }">
                                    가입요청 관리
                                    <!-- {{ store.memberRequestList.length }} -->
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'manageMember', params: { partyId: store.selectedParty.partyId } }">
                                   회원 리스트 </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'manageArticle', params: { partyId: store.selectedParty.partyId } }">
                                   글 관리</RouterLink>
                            </li>
                        </div>


                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userstore = useUserStore();
const store = usePartyStore();
const party = ref();

const loginUser = ref(userstore.loginUser)
const partylist = ref()
const currentStatus= ref()
onMounted(async () => {
    store.getOneParty(route.params.partyId);
    // party.value = store.selectedParty
    // store.getMemberList(store.selectedParty.partyId).then(() => {
    //     console.log('party member list:', partylist.value);
    // })
    partylist.value = store.partyMemberList;
    party.value = await store.selectedParty;

    currentStatus.value = userstore.partyStatus(route.params.partyId);

})


const goArticleCreatePage = function () {
    router.push({ name: 'createArticle', params: { partyId: store.selectedParty.partyId } })
}
const goPartyMainPage = function () {
    router.push({ name: 'partyfitmain', params: { partyId: store.selectedParty.partyId } })
}
</script>

<style scoped>
.catagory a {
    background-color : rgba(255, 235, 192, 0.842);
    padding:3px 10px;
    display: inline-block;
    z-index:99;
    
}
.catagory{

    text-align: left;
}

.navbar-nav , .navbar-nav p{
    margin-left: 10px;
}



.navbar-nav a {
    text-align: left;
    text-decoration: none;
    color: black;

}

.navbar-nav li{
    text-align: left;
    text-decoration: none;
    margin-left : 30px;
    margin:3px 20px;
}


.nav-content {
    height:100%;
    top:0px;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
}

.party-info,
.profile-info,
.nav-links {
    width: 100%;
}


.write-button {
    height: 50px;
    width: 95%;
    margin: 5px;
    align-content: center;
    color: white;
    background-color: grey;
}

.party-info p {
    color: orange;
    /* 주황색으로 설정 */
}

.profile-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.leftbox {
    height: 90vh; /* 예시로 90vh로 높이 설정 */
}
/* 스크롤바 설정*/
.leftbox::-webkit-scrollbar{
    width: 5px;
  }
  
  /* 스크롤바 막대 설정*/
  .leftbox::-webkit-scrollbar-thumb{
    background-color: rgba(255, 145, 0, 0.452);
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px; 
  }
  


.rightbox {
    flex: 1;
}

.row {
    padding: 10px;
}
</style>
<!-- @media (max-width: 900px) {
    .leftbox {
        display: none; /* 화면 크기가 작아지면 leftbox를 숨김 */
    }
}  -->