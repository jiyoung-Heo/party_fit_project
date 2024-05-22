<template>
  <div class="comment-item">
    <!-- 댓글 내용 표시 -->
    <div class="writer d-inline-flex mt-2">
      <img :src="comment.profile" class="writer-image" />
      <div>
        <p>{{ comment.username }}</p>
        {{ comment.content }}
        <br>
        <a style="font-size: 10px; margin-top: 5px;">{{ comment.regDate.split('T')[0] }}</a>
        <a v-if="depth === 1" class="reply-button" @click="toggleReplyForm">
          답글쓰기
        </a>
      </div>
    </div>
    <hr v-if="depth === 1" class="divider">
    
    <!-- 대댓글 작성 폼 -->
    <div v-if="showReplyForm" class="d-flex align-items-center">
      <input type="text" class="form-control" v-model="replyContent" placeholder="대댓글을 입력해주세요" />
      <button class="btn btn-light" @click="createReplyComment">
        대댓글쓰기
      </button>
    </div>

    <!-- 대댓글 리스트 -->
    <div v-if="depth < maxDepth" class="child-comments">
      <div v-for="childComment in childComments" :key="childComment.commentId">
        <CommentItem
          :comment="childComment"
          :articleId="articleId"
          :depth="depth + 1"
          :maxDepth="maxDepth"
          @loadComments="$emit('loadComments')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePartyStore } from '@/stores/party';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const props = defineProps({
  comment: Object,
  articleId: String,
  depth: Number,
  maxDepth: Number,
});

const showReplyForm = ref(false);
const replyContent = ref('');
const store = usePartyStore();
const userStore = useUserStore();

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value;
};

const createReplyComment = async () => {
  const commentData = {
    articleId: props.articleId,
    content: replyContent.value,
    parentId: props.comment.commentId,
    username: userStore.loginUser.username,
    profile: userStore.loginUser.profile,
    userId: userStore.loginUser.userId,
    depth: props.depth + 1,
  };

  try {
    await store.createComment( props.articleId,content.value,parentId,
    userStore.loginUser.username,userStore.loginUser.profile,userStore.loginUser.userId,depth);

    replyContent.value = ''; // 입력 폼 초기화
    showReplyForm.value = false;
    $emit('loadComments'); // 댓글 리스트 새로고침
  } catch (error) {
    console.error('Error creating comment:', error.message);
  }
};

const childComments = computed(() => {
  return store.commentList.filter(c => c.parentId === props.comment.commentId);
});
</script>



<style scoped>
.comment-item {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
}

.writer-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
}

.reply-button {
  font-size: 10px;
  margin-left: 15px;
  cursor: pointer;
  color: #007bff;
}

.reply-button:hover {
  text-decoration: underline;
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

.form-control {
  flex: 1;
}

.child-comments {
  margin-top: 10px;
  padding-left: 20px; /* 들여쓰기 설정 */
}

.divider {
  border-top: 1px solid #ccc;
  margin-top: 10px;
}
</style>