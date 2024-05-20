<template>
    <div>
        <div class="banner">
            <div v-if="party.bannerImage !== null">
                <img :src=party.bannerImage width="100%" height="160px">
            </div>
            <div v-else>
                <div style="width:100%; height:160px; text-align: center; font-size: 24px; font-weight: bold; ">
                    {{ party.name }}
                </div>
            </div>
        </div>
     
        <div v-if="store.isjoining">

            <button @click="leaveParty">탈퇴하기</button>
        </div>
        <div v-else-if="!store.isManager">
            <button @click="joinParty">가입하기</button>
        </div>
            
        <div class="board">
            <div class="left">
                <div class="notice">
                    <p>공지사항</p>
                    <hr>
                    <ul>
                        <div v-for="(article, index) in store.noticeList.slice(0, 5)" :key="index">
                            <li>
                                <a>{{ article.title }}</a>
                                <a>{{ article.regDate.split('T')[0] }}</a>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="hotView">
                    <p>인기글</p>
                    <hr>
                    <ul>
                        <div v-for="(article, index) in store.hotViewList.slice(0, 5)" :key="index">
                            <li>
                                <a>{{ article.title }}</a>
                                <a>{{ article.viewCount }}</a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div>
            <div class="calender">
                <h1>캘린더</h1>

            </div>
            파티 참여자
            <hr>
            <div v-for="(member, index) in store.partyMemberList" :key="index">
            {{ member.username }}

            </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userstore = useUserStore();
const store = usePartyStore();

const party = ref(store.selectedParty);
const partymemberlist = ref(store.partyMemberList);


const inParty = computed(() => {
    if (!userstore || !userstore.loginUser || !partymemberlist || !Array.isArray(partymemberlist.value)) {
        return false;
    }

    return partymemberlist.value.some(member => member.userId === userstore.loginUser.userId);
});

const loginUser = ref(userstore.loginUser)


onMounted(() => {
    // party.value = store.selectedParty
    // store.getMemberList(store.selectedParty.partyId);
    store.getNoticeList(store.selectedParty.partyId)
    store.getHotViewList(store.selectedParty.partyId)
    // store.getMemberList(store.selectedParty.partyId)
    // store.inParty(userstore.loginUser.userId)
})

const joinParty = () => {
    userstore.partyJoinRequest(store.selectedParty.partyId)

}

const leaveParty = () => {
    userstore.partyLeaveRequest(store.selectedParty.partyId)
    store.isjoining = false;
}
</script>

<style scoped>
li {
    display: flex;
    justify-content: space-arou;
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