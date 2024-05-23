<template>
  <div class="widget-container">
    <div class="widget">
      <button type="button" class="delete-button" @click="deleteArticle">삭제</button>
    
      <div class="category" @click="goBoard(category)">{{ category }} &gt;</div>
      <div class="title fs-5" v-if="article">{{ article.title }}</div>
      
      <div class="writer" v-if="article">
        <img :src="`/src/assets/user/${article.profile}`" class="writer-image" />
        <div class="writer-info">
          <p>{{ article.username }}</p>
          <p class="reg-date">{{ article.regDate.split('T')[0] }}</p>
          <p>조회수: {{ article.viewCount }}</p>
        </div>
      </div>
      <hr/>
      모임정보    
      <p v-if="thisMeet && thisMeet.title && thisMeet.startTime && thisMeet.endTime">
        {{ thisMeet.title }}({{ thisMeet.startTime.split("T")[0]
        }}{{ thisMeet.startTime.split("T")[1].slice(0, 5) }} ~
        {{ thisMeet.endTime.split("T")[0]
        }}{{ thisMeet.endTime.split("T")[1].slice(0, 5) }}):
        {{ thisMeet.headcount }} 명 참여
      </p>
      <hr>

      <div class="container content" v-if="article" v-html="compiledMarkdown"></div>
      
      <hr>
      
      <CommentList :article-id="articleId" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import CommentList from "./CommentList.vue";
import { marked } from "marked";

const router = useRouter();
const store = usePartyStore();
const route = useRoute();
const userstore = useUserStore();

const articleId = ref();
const article = ref();
const thisMeet = ref();

const writer = ref();
const isDelete = ref(false);

const deleteArticle = () => {
  // console.log(store.articleDetail.userId + " " + userstore.loginUser.userId);
  if (
    store.articleDetail.userId !== userstore.loginUser.userId &&
    !store.isManager
  ) {
    alert("본인이 작성한 글만 삭제할 수 있습니다.");
    return;
  }
  store.deleteArticle(articleId.value);
  if (store.isManager) {
    router.go(-1);
  }
  goBoard(category.value);
};

onMounted(async () => {
  articleId.value = route.params.articleId;
  await store.getArticleDetail(articleId.value, false).then(() => {
    article.value = store.articleDetail;
    if (article.value.profile == null || article.value.profile == "") {
      article.value.profile = "user.jpg";
    }
    store.getCommentList(articleId.value, 1);
    isDelete.value =
      store.articleDetail.userId == userstore.loginUser.userId ||
      store.isManager;
    markdownText.value = store.articleDetail.content;
  });
  // console.log("test"+article.value.meetId)
  if (article.value.meetId != null && article.value.meetId != 0) {
    //해당 meet 정보 가져오기
    thisMeet.value = await store.getOneMeet(article.value.meetId);
  }
});

const category = ref();
watch(article, (newVal) => {
  // console.log(newVal)
  if (newVal) {
    switch (newVal.category) {
      case 0:
        category.value = "자유게시판";
        break;
      case 1:
        category.value = "가입인사";
        break;
      case 2:
        category.value = "공지사항";
        break;
      case 3:
        category.value = "모임후기";
        break;
      default:
        category.value = "";
        break;
    }
  } else {
    newVal.value = "";
  }
});

const goBoard = function (category) {
  // console.log(category);
  if (category) {
    switch (category) {
      case "자유게시판":
        router.push({
          name: "freeboard",
          params: { partyId: store.selectedParty.partyId },
        });
        break;
      case "가입인사":
        router.push({
          name: "introductionboard",
          params: { partyId: store.selectedParty.partyId },
        });
        break;
      case "공지사항":
        router.push({
          name: "noticeboard",
          params: { partyId: store.selectedParty.partyId },
        });
      case "모임후기":
        router.push({
          name: "reviewboard",
          params: { partyId: store.selectedParty.partyId },
        });
      default:
        break;
    }
  }
};

// 마크다운 텍스트
const markdownText = ref();

// `marked`를 사용하여 마크다운을 HTML로 변환
const 
= computed(() => {
  return marked(markdownText.value);
});
</script>


<style scoped>
.widget-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.widget {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%; /* 수정: 너비를 조정하여 가로로 넓게 배치 */
  max-width: 1000px; /* 수정: 최대 너비를 지정 */
  overflow: hidden;
  margin: 20px;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  float: right;
}

.delete-button:hover {
  background-color: #ff7875;
}

.category {
  color: #ff7f00;
  cursor: pointer;
  margin-bottom: 10px;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.writer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.writer-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.writer-info p {
  margin: 0;
}

.reg-date {
  font-size: 10px;
  color: #888;
}

.content {
  margin: 20px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}

hr {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 20px 0;
}
</style>