<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
      <div class="flex-auto flex-shrink-0">
        <p>댓글</p>
      </div>
    </div>
    <div class="container">
      <div v-if = "store.commentList == null">작성된 댓글이 없습니다.</div>
      <div v-for="comment in store.commentList" :key="comment.commentId">
        <template v-if='comment.depth == 1'>
          <CommentItem
            :comment="comment"
            :articleId="props.articleId"
            :depth="1"
            @loadComments="loadComments"
          />
        </template>
      </div>
      <div class="d-flex">
        <input type="text" class="form-control" v-model="content" placeholder="댓글을 입력해주세요" />
        <button class="btn btn-light" @click="createComment(0, 1)">댓글쓰기</button>
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
// const currentPage = ref(1);
const userStore = useUserStore();
const content = ref('');
const store = usePartyStore();
const props = defineProps({
  articleId: String
});

const loadComments = async () => {
  await store.getCommentList(props.articleId);
};

// onMounted(() => {
//   loadComments();
// });

// watch(() => props.articleId, () => {
//   currentPage.value = 1;
//   loadComments();
// });

const pageCount = computed(() => {
  return Math.ceil(store.commentList.length / perPage);
});

const clickPage = function (page) {
  currentPage.value = page;
};

// const currentPageCommentList = computed(() => {
//   if(store.commentList == null || store.commentList =='') return null
//   return store.commentList.slice(
//     (currentPage.value - 1) * perPage,
//     currentPage.value * perPage
//   );
// });

const createComment = async (parentId, depth) => {
  const commentData = {
    content: content.value,
    parentId: parentId,
    username: userStore.loginUser.username,
    profile: userStore.loginUser.profile,
    userId: userStore.loginUser.userId,
    depth: depth,
  };
  // console.log(commentData)
  // try {
    // await 
    store.createComment(props.articleId,commentData); 
    content.value = ''
  //   content.value = '';
  //   await loadComments();
  // } catch (error) {
  //   console.error('Error creating comment:', error.message);
  // }
};


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
