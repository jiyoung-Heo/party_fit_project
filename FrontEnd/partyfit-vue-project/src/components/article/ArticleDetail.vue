<template>
  <div>
    <button type="button" @click="deleteArticle"> 삭제 </button>
  
    <div class="category" @click="goBoard(category)"> {{ category }} > </div>
     <div class="title fs-5" v-if="article">{{ article.title }}</div>
    <div class="writer d-inline-flex" v-if="article">
      <img :src="article.profile" class="writer-image" />
      <div>
        <p>{{ article.username }}</p>
        <p style="font-size: 10px;">{{ article.regDate.split('T')[0] }}</p>
      </div>
    </div>
    <hr>
    <div class="container content" v-if="article">{{ article.content }}</div>
    <hr>


    <CommentList :article-id="articleId" />
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from "vue";
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
const article = ref(store.articleDetail)

const writer = ref();

const deleteArticle = () => {
    console.log(store.articleDetail.userId+" "+userstore.loginUser.userId)
    if(store.articleDetail.userId !== userstore.loginUser.userId && !store.isManager){
        alert("본인이 작성한 글만 삭제할 수 있습니다.")
        return;
    }
    store.deleteArticle(articleId.value)
    goBoard(category.value)
};

onMounted(() => {
    article.value = store.articleDetail
    articleId.value = route.params.articleId;
    // store.getArticleDetail(articleId.value, false).then(() => {
    //   console.log(articleId.value)
    //   store.getCommentList(articleId.value,1);
    // userstore.getUserdetail(store.articleDetail.userId).then(() => {
    //   if (userstore.userDetail) {

    //     console.log(store.articleDetail.userId)
    //   }
    //   writer.value = userstore.userdetail
    // })

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
    if (!store.selectedParty || !store.selectedParty.partyId) {
        alert("파티가 선택되지 않았습니다.");
        return;
    }
    if (category) {
        switch (category) {
            case "자유게시판":
                router.push({ name: 'freeboard', params: { partyId: store.selectedParty.partyId } })
                break;
            case "가입인사":
                router.push({ name: 'introductionboard', params: { partyId: store.selectedParty.partyId } })
                break;
            case "공지사항":
                router.push({ name: 'noticeboard', params: { partyId: store.selectedParty.partyId } })
                break;
            default:
                break;
        }
    }
}
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