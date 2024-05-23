<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group">
        <input
          type="text"
          class="form-control me-4"
          placeholder="검색어를 입력해주세요"
          v-model="searchQuery"
        />
        <button class="btn-warning" @click="performSearch(cateSave)">
          검색
        </button>
      </div>
    </div>
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between"
    >
      <div class="flex-auto flex-shrink-0">
        <button @click="category(0)">자유게시판</button>
        <button @click="category(1)">가입인사</button>
        <button @click="category(2)">공지사항</button>
        <button @click="category(3)">모임후기</button>
      </div>
      <div
        class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1"
      >
        <a class="dropdown-item" @click="setCurrent(cateSave)">최신순</a>
        <a class="dropdown-item" @click="setOld(cateSave)">오래된순</a>
      </div>
    </div>

    <div class="container">
      <!-- <BoardSearchInput /> -->
      <table class="table table-hover text-center">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회</th>
            <th>등록일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in currentPageArticleList"
            :key="article.article_id"
          >
            <td @click="goArticleDetail(article.articleId)">
              {{ article.title }}
            </td>
            <td @click="goArticleDetail(article.articleId)">
              {{ article.username }}
            </td>
            <td @click="goArticleDetail(article.articleId)">
              {{ article.viewCount }}
            </td>
            <td @click="goArticleDetail(article.articleId)">
              {{ article.regDate.split("T")[0] }}
            </td>
            <td>
              <span v-if="partystore.isManager">
                <button @click="deleteArticle(article.articleId)">삭제</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination d-flex justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              @click.prevent="currentPage--"
              :class="{ disabled: currentPage <= 1 }"
              href="#"
              >&lt;</a
            >
          </li>
          <li
            class="page-item"
            :class="{ active: currentPage === page }"
            v-for="page in pageCount"
            :key="page"
          >
            <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
              page
            }}</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              @click.prevent="currentPage++"
              :class="{ disabled: currentPage >= pageCount }"
              href="#"
              >&gt;</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import { computed, onMounted, ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const perPage = 12;
const currentPage = ref(1);

const partystore = usePartyStore();

const userstore = useUserStore();
const cateSave = ref();

onMounted(() => {
  category(0);
});

const pageCount = computed(() => {
    if(partystore.freeList == null) return null;
  return Math.ceil(partystore.freeList.length / perPage);
});

const clickPage = function (page) {
  currentPage.value = page;
};

const currentPageArticleList = computed(() => {
  if (partystore.freeList == null) return null;
  return partystore.freeList.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  );
});

const goArticleDetail = function (articleId) {
  //   console.log(articleId);
  router.push({ name: "articleDetail", params: { articleId: articleId } });
};

const setCurrent = function (cate) {
  partystore.getFreeList(
    partystore.selectedParty.partyId,
    "reg_date",
    "DESC",
    cate
  );
};

const setOld = function (cate) {
  partystore.getFreeList(
    partystore.selectedParty.partyId,
    "reg_date",
    "ASC",
    cate
  );
};

const deleteArticle =async function (articleId) {
    try{
        await partystore.deleteArticle(articleId);
        category(cateSave.value);
    }catch(e){

    }
};

const category = (cate) => {
  partystore.getFreeList(
    partystore.selectedParty.partyId,
    "reg_date",
    "DESC",
    cate
  );
  cateSave.value = cate;
};
const searchQuery = ref("");

const performSearch = (cate) => {
  partystore.getFreeList(
    partystore.selectedParty.partyId,
    "reg_date",
    "DESC",
    cate,
    "title",
    searchQuery.value
  );
};
</script>

<style scoped>
.input-group {
  max-width: 700px;
  display: flex;
  justify-content: space-between;
}

.input-group > .form-control,
.input-group > .form-floating,
.input-group > .form-select {
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