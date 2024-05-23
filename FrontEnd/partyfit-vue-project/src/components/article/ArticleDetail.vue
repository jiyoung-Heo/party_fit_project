<template>
  <div>
    <template v-if="isDelete">
      <button type="button" @click="deleteArticle">삭제</button>
    </template>

    <div class="category" @click="goBoard(category)">{{ category }} ></div>
    <div class="title fs-5" v-if="article">{{ article.title }}</div>
    <div class="writer d-inline-flex" v-if="article">
      <img :src="`/src/assets/user/${article.profile}`" class="writer-image" />
      <div>
        <p>{{ article.username }}</p>
        <p style="font-size: 10px">{{ article.regDate.split("T")[0] }}</p>
      </div>
      조회수: {{ article.viewCount }}
    </div>
    <hr />
    모임정보
    <!-- {{ thisMeet }} -->
    
    <p v-if="thisMeet && thisMeet.title && thisMeet.startTime && thisMeet.endTime">
      {{ thisMeet.title }}({{ thisMeet.startTime.split("T")[0]
      }}{{ thisMeet.startTime.split("T")[1].slice(0, 5) }} ~
      {{ thisMeet.endTime.split("T")[0]
      }}{{ thisMeet.endTime.split("T")[1].slice(0, 5) }}):
      {{ thisMeet.headcount }} 명 참여
    </p>
    <!-- 모임장소: {{article.mapJson}} -->
    <hr />
    <div
      class="container content"
      v-if="article"
      v-html="compiledMarkdown"
    ></div>
    <!-- <div class="container content" v-if="article">{{ article.content }}</div> -->
    <hr />

    <CommentList :article-id="route.params.articleId" />
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
const compiledMarkdown = computed(() => {
  return marked(markdownText.value);
});
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

.category {
  color: #ff7f00;
}

.content {
  height: 50vh;
}
</style>