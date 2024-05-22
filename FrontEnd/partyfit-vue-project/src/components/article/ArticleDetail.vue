<template>
  <div class="widget-container">
    <div class="widget">
      <button type="button" class="delete-button" @click="deleteArticle">삭제</button>
    
      <div class="category" @click="goBoard(category)">{{ category }} &gt;</div>
      <div class="title fs-5" v-if="article">{{ article.title }}</div>
      
      <div class="writer" v-if="article">
        <img :src="article.profile" class="writer-image" />
        <div class="writer-info">
          <p>{{ article.username }}</p>
          <p class="reg-date">{{ article.regDate.split('T')[0] }}</p>
        </div>
      </div>
      
      <hr>
      
      <div class="container content" v-if="article">{{ article.content }}</div>
      
      <hr>
      
      <CommentList :article-id="articleId" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import CommentList from "./CommentList.vue";

const router = useRouter();
const store = usePartyStore();
const route = useRoute();
const userstore = useUserStore();

const articleId = ref();
const article = ref()

const writer = ref();

const deleteArticle = () => {
  console.log(store.articleDetail.userId+" "+userstore.loginUser.userId)
  if(store.articleDetail.userId !== userstore.loginUser.userId&&!store.isManager){
    alert("본인이 작성한 글만 삭제할 수 있습니다.")
    return;
  }
  store.deleteArticle(articleId.value)
  goBoard(category.value)
};
onMounted(() => {
  articleId.value = route.params.articleId;
  store.getArticleDetail(articleId.value, false).then(() => {
    article.value = store.articleDetail
    console.log(articleId.value)
    store.getCommentList(articleId.value,1);
    // userstore.getUserdetail(store.articleDetail.userId).then(() => {
    //   if (userstore.userDetail) {

    //     console.log(store.articleDetail.userId)
    //   }
    //   writer.value = userstore.userdetail
    // })
  }
  )
  // store.getIsLike(1)
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
      default:
        category.value = "";
        break;
    }
  } else {
    newVal.value = "";
  }
});

const goBoard = function (category) { 
  console.log(category)
  if (category) {
    switch (category) {
      case "자유게시판":
        router.push({name: 'freeboard', params: {partyId: store.selectedParty.partyId}})
        break;
        case "가입인사":
          router.push({name: 'introductionboard', params: {partyId: store.selectedParty.partyId}})
          break;
          case "공지사항":
            router.push( {name: 'noticeboard', params: { partyId: store.selectedParty.partyId}})
        break;
      default:
        break;
    }
  }}
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