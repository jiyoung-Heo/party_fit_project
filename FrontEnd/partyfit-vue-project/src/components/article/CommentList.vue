<template>
  <div :style="{ marginLeft: depth * 20 + 'px' }" class="comment-item">
    <div class="d-flex flex-column">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <img :src="comment.profile" class="commenter-image" />
          <span class="commenter-username">{{ comment.username }}</span>
        </div>
        <div>
          <span>{{ comment.regDate.split('T')[0] }}</span>
        </div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
    </div>
    <div class="d-flex align-items-center">
      <a class="btn btn-light" @click="reply">답글</a>
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
  await store.getCommentList(props.articleId,2);
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
  console.log(userStore.loginUserusername)
  // try {
    // await 
    store.createComment(props.articleId,
    content.value,
    parentId,
     userStore.loginUser.username,
    userStore.loginUser.profile,
    userStore.loginUser.userId,
     depth,
    );
  //   content.value = '';
  //   await loadComments();
  // } catch (error) {
  //   console.error('Error creating comment:', error.message);
  // }
};

// const setCurrent = async () => {
//   await store.getCommentList(props.articleId, 'reg_date', 'DESC');
// };

// const setOld = async () => {
//   await store.getCommentList(props.articleId, 'reg_date', 'ASC');
// };
</script>


<style scoped>
.comment-item {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-left: 1px solid #ccc;
}

.commenter-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.commenter-username {
  font-weight: bold;
  margin-right: 5px;
}

.comment-content {
  margin-top: 5px;
  white-space: pre-wrap; /* Wrap long content */
}

.btn-light {
  background-color: #ff7f00;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-light:hover {
  background-color: #e06900;
}
</style>
