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
      <div class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1">
        <a class="dropdown-item" @click="setCurrent">최신순</a>
        <a class="dropdown-item" @click="setOld">오래된순</a>
      </div>
    </div>
    <div class="container">
      <div class="d-flex">
        <input type="text" class="form-control" v-model="content" placeholder="댓글을 입력해주세요" />
        <button class="btn btn-light" @click="createComment(0, 1)">댓글쓰기</button>
      </div>
      <div v-for="comment in currentPageCommentList" :key="comment.commentId">
        <CommentItem
          :comment="comment"
          :articleId="props.articleId"
          :depth="1"
          :maxDepth="2"
          @loadComments="loadComments"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import CommentItem from './CommentItem.vue';

const perPage = 5;
const currentPage = ref(1);
const userStore = useUserStore();
const content = ref('');
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
  currentPage.value = 1;
  loadComments();
});

const pageCount = computed(() => {
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

const createComment = async (parentId, depth) => {
  const commentData = {
    articleId: props.articleId,
    content: content.value,
    parentId: parentId,
    username: userStore.loginUser.username,
    profile: userStore.loginUser.profile,
    userId: userStore.loginUser.userId,
    depth: depth,
  };

  try {
    await store.createComment(commentData);
    content.value = '';
    await loadComments();
  } catch (error) {
    console.error('Error creating comment:', error.message);
  }
};

const setCurrent = async () => {
  await store.getCommentList(props.articleId, 'reg_date', 'DESC');
};

const setOld = async () => {
  await store.getCommentList(props.articleId, 'reg_date', 'ASC');
};
</script>

<style scoped>
.like {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group .form-control {
  flex: 1;
}

.input-group .btn-light {
  background-color: #ff7f00;
  border: none;
  color: white;
}

.input-group .btn-light:hover {
  background-color: #e06900;
}
</style>
