<template>
    <div >

        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="flex-auto flex-shrink-0">
                <h3 class="fw-bold mb-2">내가 쓴 글</h3>
            </div>
            <div
                class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1">


                <a class="dropdown-item" @click="setCurrent()">최신순</a>
                <a class="dropdown-item" @click="setOld()">오래된순</a>


            </div>
        </div>
        <!-- {{userstore.articleList}} -->
        <div class="container">
            <!-- <BoardSearchInput /> -->
            <table class="table table-hover text-center">
                    <div v-if="articleList  === null">
                가입 요청이 없습니다.
            </div>
            <div v-else>
                <thead>
                    <tr>
                        <th></th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회</th>
                        <th>등록일</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {{ articleList }}
                    <tr v-for="article in articleList" :key="article.article_id">
                      
                      
                        <td @click="goArticleDetail(article.articleId)">
                            {{ article.articleId }}
                        </td>
                        <td>
                            {{ article.title }}
                        </td>
                        <td>{{ article.username }}</td>
                        <td>{{ article.viewCount }}</td>
                      
                        <td>
                            <button  @click ="deleteArticle(article.articleId)"
                            >삭제</button>
                       
                        </td>
                    </tr>
                </tbody>
                </div>
            </table>
            <nav aria-label="Page navigation">
                <ul class="pagination d-flex justify-content-center">
                    <li class="page-item">
                        <a class="page-link" @click.prevent="currentPage--" :class="{ disabled: currentPage <= 1 }"
                            href="#">&lt;</a>
                    </li>
                    <li class="page-item" :class="{ active: currentPage === page }" v-for="page in pageCount"
                        :key="page">
                        <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
                            page
                            }}</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" @click.prevent="currentPage++"
                            :class="{ disabled: currentPage >= pageCount }" href="#">&gt;</a>
                    </li>
                </ul>
            </nav>
        </div>


    </div>

</template>

<script setup>
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';

import { useRouter } from "vue-router";
const router = useRouter();

const perPage = 12;
const currentPage = ref(1);

const partystore = usePartyStore();

const userstore = useUserStore();

const articleList = computed(() => {
    return userstore.articleList
})

onMounted(() => {
    userstore.getMyArticle()
    // partystore.getFreeList(partystore.selectedParty.partyId, "reg_date", "DESC");
    // partystore.getMeetList(0)
    // partystore.getMeetList(1)
    // partystore.getMeetList(2)
})


const pageCount = computed(() => {
    return Math.ceil(partystore.freeList.length / perPage);
});

const clickPage = function (page) {
    currentPage.value = page;
};

const currentPageArticleList = computed(() => {
    return partystore.freeList.slice(
        (currentPage.value - 1) * perPage,
        currentPage.value * perPage
    );
});


const setCurrent = function () {
    partystore.getFreeList(partystore.selectedParty.partyId, "reg_date", "DESC");
}

const setOld = function () {
    partystore.getFreeList(partystore.selectedParty.partyId, "reg_date", "ASC");
}

const goArticleDetail = function (articleId) {
    console.log(articleId);
    // partystore.getArticleDetail(articleId,0)
    router.push({ name: 'articleDetail', params: { articleId: articleId} })
}

const deleteArticle = function (articleId) {
    console.log("삭제" + articleId);
    partystore.deleteArticle(articleId)
    // window.location.reload()
}
const isAuth = ref(false)
const hasAuth = function(userId) {
    console.log(userstore.loginUser.userId);
    console.log(userId)
    if(partystore.isManager) {
        isAuth = true;
        return true;
    }
    else if(userId === userstore.loginUser.userId){
        isAuth = true;
        return true;
    }
     isAuth = false;
     console.log(false);
     return false;
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
    color :#ff7f00;
 
}
</style>