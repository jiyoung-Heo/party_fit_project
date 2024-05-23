<template>
  <div class="comment-item" :style="{ marginLeft: props.depth * 20 + 'px' }">
    <!-- 댓글 내용 표시 -->
    <div class="writer d-inline-flex mt-2">
      <img :src="`/src/assets/user/${props.comment.profile}`" class="writer-image" />
      <div v-if="!isUpdateForm">
        <a>{{ props.comment.username }}</a>
        <a style=" margin-left: 20px;">{{
          props.comment.regDate.split("T")[0]
        }}</a>
        <template v-if="props.comment.deleteYn == 'N'">
          <p style="margin-top:10px"> {{ props.comment.content }}</p>
          <br />
          <div class="btns">
            <div v-show="!showReplyForm">
              <button class="btn-action reply-button" @click="toggleReplyForm(props.comment.commentId)">
                답글쓰기
              </button>
              <template v-if="
                props.comment.userId == userStore.loginUser.userId ||
                store.isManager
              ">
                <button class="btn-action delete-button" type="button" @click="deleteComment(props.comment.commentId)">
                  삭제
                </button>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <p>삭제된 댓글입니다.</p>
        </template>
      </div>
      <div v-if="isUpdateForm">
        <a>{{ props.comment.username }}</a>   <a style="margin-left:20px">{{
          props.comment.regDate.split("T")[0]
        }}</a>
        <input type="text" v-model="changeContent" class="form-control" />
        <br />
     
        <div class="btns">

          <div v-show="!showReplyForm">
            <button class="btn-action reply-button" @click="toggleReplyForm">답글쓰기</button>
            <template v-if="
              props.comment.userId == userStore.loginUser.userId ||
              store.isManager
            ">
              <button class="btn-action update-button" type="button" @click="updateComment">수정</button>
              <button class="btn-action cancel-button" type="button" @click="updateCommentForm(false)">
                취소
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 대댓글 작성 폼 -->
    <div v-if="showReplyForm && clickedCommentId == props.comment.commentId" class="d-flex">
      <input type="text" class="form-control" v-model="replyContent" placeholder="대댓글을 입력해주세요" />
      <div class="btns">

        <button class="btn btn-light rrbtn" @click="createReplyComment(props.comment.depth)">
          <!-- {{props.comment.depth}} -->
          대댓글쓰기
        </button>
        <button class="btn btn-light cancel-button" @click="cancelReplyComment">취소</button>
      </div>
    </div>
    <hr />

    <!-- 대댓글 리스트 -->
    <div v-for="(childComment, index) in childComments" :key="childComment.commentId">
      <template v-if="childComment.commentId != childComment.parentId">
        <span v-html="depthSpaces(childComment.depth)"></span>
        <div class="writer d-inline-flex mt-2">
          <img :src="`/src/assets/user/${childComment.profile}`" class="writer-image" />
          <div v-if="!isUpdateForm">
            <a>{{ childComment.username }}</a><a style="margin-left:20px">{{
                childComment.regDate.split("T")[0]
              }}</a>
            <template v-if="childComment.deleteYn == 'N'">
              <p style="margin-top:10px">{{ childComment.content }}</p>
              <br />
              
              <div class="btns">

                <div v-show="!showReplyForm">
                  <button class="btn-action reply-button" @click="toggleReplyForm(childComment.commentId)">
                    답글쓰기
                  </button>
                  <template v-if="
                    childComment.userId == userStore.loginUser.userId ||
                    store.isManager
                  ">
                    <button class="btn-action delete-button" type="button"
                      @click="deleteComment(childComment.commentId)">
                      삭제
                    </button>
                  </template>
                </div>
              </div>
            </template>
            <template v-else>
              <p>삭제된 댓글입니다.</p>
            </template>
          </div>
          <div v-if="isUpdateForm">
            <a>{{ props.comment.username }}</a><a style=" margin-left: 15px">{{
              props.comment.regDate.split("T")[0]
            }}</a>
            <input type="text" v-model="changeContent" class="form-control" />
            <br />
            
            <div class="btns">
              <button class="btn-action reply-button" @click="toggleReplyForm">답글쓰기</button>
              <template v-if="
                props.comment.userId == userStore.loginUser.userId ||
                store.isManager
              ">
                <button type="button" @click="updateCommentForm(false)">
                  취소
                </button>
              </template>
            </div>
          </div>
        </div>
        <!-- 대댓글 작성 폼 -->
        <div v-if="
          showReplyForm &&
          index == childComments.length - 1
          // clickedCommentId == childComments.commentId
        " class="d-flex">
          <input type="text" class="form-control" v-model="replyContent" placeholder="대댓글을 입력해주세요" />
          <div class="btns">

            <button class="btn btn-light rrbtn" @click="createReplyComment(childComment.depth)">
              대댓글쓰기
            </button>
            <button class="btn btn-light cancel-button" @click="cancelReplyComment">
              취소
            </button>
          </div>
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
input {
  width: 100%;

}

.comment-item {
  margin: 20px;
  border: 0.5px solid rgb(127, 127, 127);
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.writer-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
  margin-right: 15px;
}

.btns {
  width: 200px;

}

.reply-button,
.delete-button,
.update-button,
.cancel-button,
.rrbtn {
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px grey solid;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.249);
  border-radius: 5px;
}

.reply-button:hover,
.delete-button:hover,
.update-button:hover,
.cancel-button:hover,
.rrbtn:hover {
  transform: translateY(2px);
  background-color: #8e8e8e;

}



.form-control {
  flex: 1;
}

.child-comments {
  margin-top: 10px;
  padding-left: 20px;
  /* 들여쓰기 설정 */
}

.divider {
  border-top: 1px solid #ccc;
  margin-top: 10px;
}
</style>
