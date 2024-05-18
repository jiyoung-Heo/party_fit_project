<template>
    <div>
        <nav class="leftbox fixed-left bg-light">
            <div class="nav-content">
                <div class="party-info">
                    <p @click="goPartyMainPage">{{ party.name }}</p>
                    <img :src="party.introductionImage" alt="헬스장 이미지" width="150px">
                    <p>참여인원 {{ userMember.length }}명</p>
                    
                </div>
                <hr>
                <div id="profile" class="profile-info">
                    <p v-if="loginUser.profile===''">
                        <img :src="loginUser.profile" alt="프로필사진" width="20px">
                    </p>
                    <div v-else>
                        <span class="material-icons">face</span>
                    </div>
                    <a>{{ loginUser.name }} 님</a>
                </div>
                <div class="write-button" @click="goArticleCreatePage"> 게시글 쓰기 </div>
                <hr>
                <div class="nav-links">
                    <ul class="navbar-nav">
                        <p class="catagory">게시판</p>
                        <li>
                            <RouterLink :to="{ name: 'noticeboard', params: { partyId: store.selectedParty}}">공지사항</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'freeboard', params: { partyId: store.selectedParty}}">자유게시판</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'introductionboard', params: { partyId: store.selectedParty}}">가입인사</RouterLink>
                        </li>
                        <p class="catagory">일정</p>
                        <li>
                            <RouterLink :to="{ name: 'meetlist', params: { partyId: store.selectedParty}}">일정 조회</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'meetcreate', params: { partyId: store.selectedParty}}">일정 등록</RouterLink>
                        </li>
                   
                    </ul>
                </div>
            </div>
        </nav>
    </div>

</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userstore = useUserStore();
const store = usePartyStore();
const party = ref(store.selectedParty);
const partylist = ref(store.partyMemberList);

const loginUser = ref(userstore.loginUser)


onMounted(() => {
    // party.value = store.selectedParty
    store.getMemberList(store.selectedParty.partyId);

})

const userMember = computed(() => {
    return partylist.value.filter(member => member.grade === 0);
})

const goArticleCreatePage = function () {
    router.push({ name: 'createArticle', params: { partyId: store.selectedParty.partyId } })
}
const goPartyMainPage = function () {
    router.push({ name: 'partyfitmain', params: { partyId: store.selectedParty.partyId } })
}
</script>

<style scoped>
.catagory{
    text-align: left;


}
.catagory li{
    color: grey;
}
.nav-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
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

    width: 200px;
    height: 70vh;
    overflow-y: auto;
    flex: 1;
}

.rightbox {
    flex: 1;
}

* {
    border: 1px solid red;
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