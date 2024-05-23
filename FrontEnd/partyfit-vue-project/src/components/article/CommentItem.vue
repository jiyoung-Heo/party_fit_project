<template>
  <div class="comment-item" :style="{ marginLeft: props.depth * 20 + 'px' }">
    <!-- 댓글 내용 표시 -->
    <div class="writer d-inline-flex mt-2">
      <img
        :src="`/src/assets/user/${props.comment.profile}`"
        class="writer-image"
      />
      <div v-if="!isUpdateForm">
        <p>{{ props.comment.username }}</p>
        <template v-if="props.comment.deleteYn == 'N'">
          {{ props.comment.content }}
          <br />
          <a style="font-size: 10px; margin-top: 5px">{{
            props.comment.regDate.split("T")[0]
          }}</a>
          <div v-show="!showReplyForm">
            <button @click="toggleReplyForm(props.comment.commentId)">
              답글쓰기
            </button>
            <template
              v-if="
                props.comment.userId == userStore.loginUser.userId ||
                store.isManager
              "
            >
              <!-- <button type="button" @click="updateCommentForm(true)">
                수정
              </button> -->
              <button
                type="button"
                @click="deleteComment(props.comment.commentId)"
              >
                삭제
              </button>
            </template>
          </div>
        </template>
        <template v-else>
          <p>삭제된 댓글입니다.</p>
        </template>
      </div>
      <div v-if="isUpdateForm">
        <p>{{ props.comment.username }}</p>
        <input type="text" v-model="changeContent" class="form-control" />
        <br />
        <a style="font-size: 10px; margin-top: 5px">{{
          props.comment.regDate.split("T")[0]
        }}</a>
        <div v-show="!showReplyForm">
          <button @click="toggleReplyForm">답글쓰기</button>
          <template
            v-if="
              props.comment.userId == userStore.loginUser.userId ||
              store.isManager
            "
          >
            <button type="button" @click="updateComment">수정</button>
            <button type="button" @click="updateCommentForm(false)">
              취소
            </button>
          </template>
        </div>
      </div>
    </div>
    <!-- 대댓글 작성 폼 -->
    <div
      v-if="showReplyForm && clickedCommentId == props.comment.commentId"
      class="d-flex"
    >
      <input
        type="text"
        class="form-control"
        v-model="replyContent"
        placeholder="대댓글을 입력해주세요"
      />
      <button class="btn btn-light" @click="createReplyComment(props.comment.depth)">
        {{props.comment.depth}}
        대댓글쓰기
      </button>
      <button class="btn btn-light" @click="cancelReplyComment">취소</button>
    </div>
    <hr />

    <!-- 대댓글 리스트 -->
    <div
      v-for="(childComment, index) in childComments"
      :key="childComment.commentId"
    >
      <template v-if="childComment.commentId != childComment.parentId">
        <span v-html="depthSpaces(childComment.depth)"></span>
        <div class="writer d-inline-flex mt-2">
          <img
            :src="`/src/assets/user/${childComment.profile}`"
            class="writer-image"
          />
          <div v-if="!isUpdateForm">
            <p>{{ childComment.username }}</p>
            <template v-if="childComment.deleteYn == 'N'">
              {{ childComment.content }}
              <br />
              <a style="font-size: 10px; margin-top: 5px">{{
                childComment.regDate.split("T")[0]
              }}</a>
              <div v-show="!showReplyForm">
                <button @click="toggleReplyForm(childComment.commentId)">
                  답글쓰기
                </button>
                <template
                  v-if="
                    childComment.userId == userStore.loginUser.userId ||
                    store.isManager
                  "
                >
                  <!-- <button type="button" @click="updateCommentForm(true)">
                    수정
                  </button> -->
                  <button
                    type="button"
                    @click="deleteComment(childComment.commentId)"
                  >
                    삭제
                  </button>
                </template>
              </div>
            </template>
            <template v-else>
              <p>삭제된 댓글입니다.</p>
            </template>
          </div>
          <div v-if="isUpdateForm">
            <p>{{ props.comment.username }}</p>
            <input type="text" v-model="changeContent" class="form-control" />
            <br />
            <a style="font-size: 10px; margin-top: 5px">{{
              props.comment.regDate.split("T")[0]
            }}</a>
            <button @click="toggleReplyForm">답글쓰기</button>
            <template
              v-if="
                props.comment.userId == userStore.loginUser.userId ||
                store.isManager
              "
            >
              <!-- <button type="button" @click="updateComment">수정</button> -->
              <button type="button" @click="updateCommentForm(false)">
                취소
              </button>
            </template>
          </div>
        </div>
        <!-- 대댓글 작성 폼 -->
        <div
          v-if="
            showReplyForm &&
            index == childComments.length - 1 
            // clickedCommentId == childComments.commentId
          "
          class="d-flex"
        >
          <input
            type="text"
            class="form-control"
            v-model="replyContent"
            placeholder="대댓글을 입력해주세요"
          />
          <button
            class="btn btn-light"
            @click="createReplyComment(childComment.depth)"
          >
            대댓글쓰기
          </button>
          <button class="btn btn-light" @click="cancelReplyComment">
            취소
          </button>
        </div>
        <hr />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import axios from "axios";
const depthSpaces = function (depth) {
  return "&nbsp;".repeat(depth * 4); // depth 값에 따라 공백 추가 (2개씩)
};
const props = defineProps({
  comment: Object,
  articleId: String,
  depth: Number,
  maxDepth: Number,
});
const isUpdateForm = ref(false);
const showReplyForm = ref(false);
const replyContent = ref("");
const store = usePartyStore();
const userStore = useUserStore();
const clickedCommentId = ref();
const toggleReplyForm = (commentId) => {
  showReplyForm.value = !showReplyForm.value;
  clickedCommentId.value = commentId;
};
const cancelReplyComment = () => {
  showReplyForm.value = !showReplyForm.value;
};

const createReplyComment = async (depth) => {
  const comment = {
    content: replyContent.value,
    parentId: props.comment.commentId,
    username: userStore.loginUser.username,
    profile: userStore.loginUser.profile,
    userId: userStore.loginUser.userId,
    depth: depth,
  };

  try {
    await store.createComment(props.articleId, comment);
    replyContent.value = ""; // 입력 폼 초기화
    showReplyForm.value = false;
    // $emit("loadComments"); // 댓글 리스트 새로고침
  } catch (error) {
    console.error("Error creating comment:", error.message);
  }
};

const childComments = computed(() => {
  return store.commentList.filter(
    (c) => c.parentId === props.comment.commentId
  );
});
const changeContent = ref(props.comment.content);
const updateComment = () => {
  store.updateComment(
    props.articleId,
    props.comment.commentId,
    changeContent.value
  );
  isUpdateForm.value = false;
};
const updateCommentForm = (check) => {
  isUpdateForm.value = check;
};
const deleteComment = (commentId) => {
  store.deleteComment(props.articleId, commentId);
};
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