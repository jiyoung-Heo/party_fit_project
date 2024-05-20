<template>
  <div>
    <div class="category"> {{ category }} > </div>
    <div class="title fs-5" v-if="article">{{ article.title }}</div>
    <div class="writer d-inline-flex" v-if="writer">
      <img :src="writer.profile" class="writer-image" />
      <div> 
        <p>{{ writer.name }}</p>
        <p style="font-size: 10px;">{{article.regDate.split('T')[0]}}</p>
      </div>
    </div>
    <hr>
    <div class="container content" v-if="article">{{ article.content }}</div>
    <hr>

    
<CommentList :article-id="articleId" />
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import CommentList from "./CommentList.vue";


const store = usePartyStore();
const route = useRoute();
const userstore = useUserStore();

const articleId = ref();
const article = ref()

const writer = ref();
onMounted(() => {
  articleId.value = route.params.articleId;
  store.getArticleDetail(articleId.value, false).then(() => {
    article.value = store.articleDetail
    userstore.getUserdetail(store.articleDetail.userId).then(() => {
      if (userstore.userDetail) {
  
        console.log(store.articleDetail.userId)
      }
      writer.value = userstore.userdetail
    })
  }
  )
  // store.getIsLike(1)
});



const category = ref();
watch(article, (newVal) => {
  console.log(newVal)
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
</script>

<style scoped>
.writer-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin : 5px;
}
p {
  margin: 0;
}

.category {
  color: #ff7f00;
}

.content{
  height: 50vh;
}
</style>