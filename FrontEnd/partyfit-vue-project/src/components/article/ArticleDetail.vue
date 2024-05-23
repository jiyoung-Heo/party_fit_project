<template>
  <div class="widget-container">
    <div class="widget">
      <template v-if="isDelete">
        <button type="button" class="delete-button" @click="deleteArticle">
          삭제
        </button>
      </template>
      <div class="category" @click="goBoard(category)">{{ category }} &gt;</div>
      <div class="title fs-5" v-if="article">{{ article.title }}</div>

      <div class="writer" v-if="article">
        <img
          :src="`/src/assets/user/${article.profile}`"
          class="writer-image"
        />
        <div class="writer-info">
          <p>{{ article.username }}</p>
          <p class="reg-date">{{ article.regDate.split("T")[0] }}</p>
          <p>조회수: {{ article.viewCount }}</p>
        </div>
      </div>
      <hr />
      모임정보
      <p
        v-if="
          thisMeet && thisMeet.title && thisMeet.startTime && thisMeet.endTime
        "
      >
        {{ thisMeet.title }}({{ thisMeet.startTime.split("T")[0]
        }}{{ thisMeet.startTime.split("T")[1].slice(0, 5) }} ~
        {{ thisMeet.endTime.split("T")[0]
        }}{{ thisMeet.endTime.split("T")[1].slice(0, 5) }}):
        {{ thisMeet.headcount }} 명 참여
      </p>
      <hr />

      <div
        class="container content"
        v-if="article"
        v-html="compiledMarkdown"
      ></div>

      <hr />
      <!-- <NaverMap -->
  <!-- :locationData="locationData" -->
  <!-- v-if="article && article.mapJson && article.category === 3" -->
<!-- /> -->
<div id="map" style="width: 100%; height: 400px;"></div>

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

const locationData = ref();
const mapContainer = document.getElementById('map');

onMounted(async () => {
  articleId.value = route.params.articleId;
  await store.getArticleDetail(articleId.value, false).then(() => {
    article.value = store.articleDetail;
    if (!article.value.profile) {
      article.value.profile = "user.jpg";
    }
    store.getCommentList(articleId.value);
    isDelete.value =
      store.articleDetail.userId == userstore.loginUser.userId ||
      store.isManager;
    markdownText.value = store.articleDetail.content;

    if (article.value.meetId) {
      store.getOneMeet(article.value.meetId).then((meet) => {
        thisMeet.value = meet;
      });
    }

    locationData.value = article.value.mapJson;
    initializeMap();
  });
});

const initializeMap = () => {
  locationData.value = JSON.parse(locationData.value);
  // console.log(locationData.value.mapx);
  if (
    locationData.value &&
    locationData.value.mapx &&
    locationData.value.mapy
  ) {
    const mapOptions = {
      center: new naver.maps.LatLng(
        locationData.value.mapy / 1e7,
        locationData.value.mapx / 1e7
      ),
      zoom: 15,
    };
    const map = new naver.maps.Map("map", mapOptions);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(
        locationData.value.mapy / 1e7,
        locationData.value.mapx / 1e7
      ),
      map: map,
      title: locationData.value.title,
    });
    const infoWindow = new naver.maps.InfoWindow({
      content: `<div style="padding:10px;">${locationData.value.title}</div>`,
    });
    infoWindow.open(map, marker);

    naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
  } else {
    // console.error("Container map not found or location data is missing");
  }
};

const category = ref();
watch(article, (newVal) => {
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
        break;
      case "모임후기":
        router.push({
          name: "reviewboard",
          params: { partyId: store.selectedParty.partyId },
        });
        break;
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