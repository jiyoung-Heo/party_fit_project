<template>
    <div >

        <div class="input-group mb-3 ">
            <div class ="input-group">

            <input type="text" class="form-control me-4" placeholder="검색어를 입력해주세요" v-model="searchQuery" />
            <button class="btn-warning" @click="performSearch">검색</button>
            </div>
            <p @click ="goArticleCreate">+ 글 작성하기</p>
        </div>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="flex-auto flex-shrink-0">
                <h3 class="fw-bold mb-2">자유게시판</h3>
                <p>자유롭게 말할 수 있는 게시판입니다.</p>
            </div>
            <div
                class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1">


                <a class="dropdown-item" @click="setCurrent()">최신순</a>
                <a class="dropdown-item" @click="setOld()">오래된순</a>


            </div>
        </div>

        <div class="container">
            <!-- <BoardSearchInput /> -->
            <table class="table table-hover text-center">
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
                    <tr v-for="article in currentPageArticleList" :key="article.article_id">
                        <td @click="goArticleDetail(article.articleId)">
                            {{ article.articleId }}
                        </td>
                        <td>
                            {{ article.title }}
                        </td>
                        <td>{{ article.username }}</td>
                        <td>{{ article.viewCount }}</td>
                        <td>{{ article.regDate.split('T')[0] }}</td>
                        <td><span v-if="partystore.isManager">
                            <button  @click ="deleteArticle(article.articleId)"
                            >삭제</button>
                            </span>
                        </td>
                    </tr>
                </tbody>
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


onMounted(() => {
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

const goArticleDetail = function (articleId) {
    console.log(articleId);
    router.push({ name: 'articleDetail', params: { articleId: articleId } })
}

const setCurrent = function () {
    partystore.getFreeList(partystore.selectedParty.partyId, "reg_date", "DESC");
}

const setOld = function () {
    partystore.getFreeList(partystore.selectedParty.partyId, "reg_date", "ASC");
}

const goArticleCreate = function () {
    router.push({ name: 'articleCreate', params: { category: "자유게시판" } })
}

const deleteArticle = function (articleId) {
    partystore.deleteArticle(articleId)
    window.location.reload()
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