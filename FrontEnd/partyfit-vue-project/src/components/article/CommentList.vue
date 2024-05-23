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
        <button class="button" @click="createComment(0, 1)">댓글쓰기</button>
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
.button{
  width:100px;
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px grey solid;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.249);
  border-radius: 5px;
}
.button:hover{
  transform: translateY(2px);
  background-color: #8e8e8e;

}

</style>
