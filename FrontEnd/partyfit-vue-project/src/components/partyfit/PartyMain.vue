<template>
    <div>
        mainpage

        <div id>

            <div v-if="party.bannerImage !== null">

                <img :src=party.bannerImage width="100%" height="160px">
            </div>
            <div v-else>
                <div style="width:100%; height:160px; text-align: center; font-size: 24px; font-weight: bold; ">
                    {{ party.name }}</div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
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

const goArticleCreatePage = function () {
    router.push({ name: 'createArticle', params: { partyId: store.selectedParty.partyId } })
}

</script>

<style scoped></style>