<template>
    <div>
        <div class="like">
            <a>❤️</a> 좋아요 댓글 <a>{{ store.commentList.length }}</a>

        </div>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="flex-auto flex-shrink-0">
                {{ props.articleId }}
                <p>댓글</p>
            </div>
            <div
                class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1">
                <a class="dropdown-item" @click="setCurrent()">최신순</a>
                <a class="dropdown-item" @click="setOld()">오래된순</a>

            </div>
        </div>

        <div class="container">
            <!-- 댓글 작성 폼 -->
            <div class="d-flex">
                <input type="text" class="form-control" v-model="content" placeholder="댓글을 입력해주세요" />
                <button class="btn btn-light" @click="createComment(0, 1)">댓글쓰기</button>
            </div>

            <!-- 댓글 리스트 -->
            <div v-for="comment in currentPageCommentList" :key="comment.commentId">
                <!-- 댓글 내용 표시 -->
                <div class="writer d-inline-flex mt-2">
                    <img :src="comment.profile" class="writer-image" />
                    <div>
                        <p>{{ comment.username }}</p>
                        {{ comment.content }}
                        <br>
                        <a style="font-size: 10px; margin-top:5px;">{{ comment.regDate.split('T')[0] }}</a>
                        <a style="font-size: 10px; margin-left:15px;"
                            @click="writeComment(comment.commentId, comment.depth)">
                            답글쓰기
                        </a>
                    </div>
                </div>
                <hr>

                <!-- 대댓글 작성 폼 -->
                <div v-if="comment.showWriteCommentForm" class="d-flex">
                    <input type="text" class="form-control" v-model="content" placeholder="대댓글을 입력해주세요" />
                    <button class="btn btn-light" @click="createComment(comment.commentId, comment.depth + 1)">
                        대댓글쓰기
                    </button>
                </div>
            </div>

        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination d-flex justify-content-center">
                <li class="page-item">
                    <a class="page-link" @click.prevent="currentPage--" :class="{ disabled: currentPage <= 1 }"
                        href="#">&lt;</a>
                </li>
                <li class="page-item" :class="{ active: currentPage === page }" v-for="page in pageCount" :key="page">
                    <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
                        page
                    }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click.prevent="currentPage++" :class="{ disabled: currentPage >= pageCount }"
                        href="#">&gt;</a>
                </li>
            </ul>
        </nav>
    </div>



</template>

<script setup>
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import ArticleDetail from '../article/ArticleDetail.vue';
import { useRouter } from "vue-router";
const router = useRouter();

const perPage = 5;
const currentPage = ref(1);
const userStore = useUserStore();
const content = ref();
const store = usePartyStore();
const props = defineProps({
    articleId: String
});

const loadComments = async () => {
    await store.getCommentList(props.articleId);
};

onMounted(() => {
    loadComments();
});

watch(() => props.articleId, () => {
    currentPage.value = 1; // 첫 페이지로 리셋
    loadComments();
});

const pageCount = computed(() => {
    // console.log(store.commentList);
    return Math.ceil(store.commentList.length / perPage);

});

const clickPage = function (page) {
    currentPage.value = page;
};

const currentPageCommentList = computed(() => {
    return store.commentList.slice(
        (currentPage.value - 1) * perPage,
        currentPage.value * perPage
    );
});

const showWriteCommentForm = ref(false);
const writeComment = function (parentId, depth) {
    currentPageCommentList.value.forEach(comment => {
        if (comment.commentId === parentId) {
            comment.showWriteCommentForm = true;
            createComment(parentId, depth)
        } else {
            comment.showWriteCommentForm = false;
        }
    });
};

const createComment = function (parentId, depth) {
    const comment = {
        articleId: props.articleId,
        content: content.value,
        parentId: parentId,
        username: userStore.loginUser.username,
        profile: userStore.loginUser.profile,
        userId: userStore.loginUser.userId,
        depth: depth,
    }
    // console.log(userStore.loginUser.userId)
    // console.log(comment);
    store.createComment(comment, props.articleId, content.value, parentId, userStore.loginUser.username, userStore.loginUser.profile, userStore.loginUser.userId, depth);
    content.value = '';

}


const setCurrent = function () {
    // store.getCommentList(store.selectedParty.partyId, "reg_date", "DESC");
}

const setOld = function () {
    // store.getCommentList(store.selectedParty.partyId, "reg_date", "ASC");
}

const goArticleCreate = function () {
    router.push({ name: 'articleCreate', params: { category: "자유게시판" } })
}
</script>

<style scoped>
.writer-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin: 5px;
}

p {
    margin: 0;
}

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
    color: #ff7f00;

}
</style>