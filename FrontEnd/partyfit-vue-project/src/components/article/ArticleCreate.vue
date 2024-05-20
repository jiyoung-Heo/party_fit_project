<template>
  <div>
    <input type="text" placeholder="제목 입력창" v-model="insertData.title" />
    <hr />
    <div class="file-upload">
      <p>사진</p>
      <input type="file" @change="handleInputFile" />
      <div v-if="imageUrl">
        미리보기:
        <img :src="imageUrl" alt="preview Image" class="preview-image" />
      </div>
    </div>
    <div class="map-upload">
      <p>장소설정</p>
      <input type="text" v-model="location" />
      <button type="button" @click="findLocation">장소찾기</button>
      {{ locationStore.locationList.length }}개 조회했습니다.
      <button @click="selectLocation" v-if="finLo==null || finLo==undefined || finLo == ''">선택하기</button>
      <button @click="reSelectLocation" v-else>다시선택</button>
      {{finLo}}
      <ul>
        <li
          v-for="location in locationStore.locationList"
          :key="location.mapId"
        >
          {{ location.title }}
        </li>
      </ul>
      <div v-if="locationStore.locationList.length > 0">
        <naver-map
          style="width: 100%; height: 400px"
          :mapOptions="mapOptions"
          :initLayers="initLayers"
        >
          <div
            v-for="location in locationStore.locationList"
            :key="location.mapId"
          >
            <naver-marker
              :key="location.mapId"
              :latitude="Number(location.mapy) / 10000000"
              :longitude="Number(location.mapx) / 10000000"
              @click="toggleInfoWindow(location.mapId)"
              @onLoad="onLoadMarker($event)"
            >
            </naver-marker>
            <naver-info-window
              :key="location.mapId"
              :open="location.isOpen"
              :marker="markers[location.mapId]"
            >
              <p>{{ location.title }}</p>
            </naver-info-window>
          </div>
        </naver-map>
      </div>
    </div>
    <p>
      모임 선택(내가 참여한 모임 중 종료된 모임 && 내가 해당 모임에 대한 리뷰를
      안쓴 경우 뜨게 하기)
      <ul>
        <li v-for="review in userStore.nonWriteReview" :key="review.articleId" @click="selectMeet(review)">
            {{ review }}
        </li>
      </ul>
      선택된 모임: {{ thisMeet }}
    </p>
    <p>내용</p>
    <div id="editor"></div>
    <button @click="createArticle">게시하기</button>
  </div>
</template>
  
  <script setup>
import { useLocationStore } from "@/stores/location";
import { usePartyStore } from "@/stores/party";
import { useUserStore } from "@/stores/user";
import { Editor } from "@toast-ui/editor";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";

const thisMeet = ref();
const route = useRoute()
const partyStore = usePartyStore();
const locationStore = useLocationStore();
const userStore = useUserStore();
const selectMeet = function (review) {
  thisMeet.value = review;
  insertData.value.meetId = review.meetId;
};

const markers = ref([]);
const onLoadMarker = (markerObject) => {
  markers.value.push(markerObject);
};
const insertData = ref({
  title: '',
  content: '',
  category: 3,
  mapJson: "",
  userId: userStore.loginUserId,
  meetId: '',
  partyId: route.params.partyId,
});

watch(
  () => markers.value.length,
  () => {
    if (markers.value.length > 0) {
      const firstLocation = locationStore.locationList[0];
      mapOptions.value.latitude = Number(firstLocation.mapy) / 10000000;
      mapOptions.value.longitude = Number(firstLocation.mapx) / 10000000;
    }
  }
);
const toggleInfoWindow = (mapId) => {
  locationStore.locationList.forEach((location) => {
    if (location.mapId === mapId) {
      location.isOpen = !location.isOpen;
    } else {
      location.isOpen = false;
    }
  });
};

const mapOptions = ref({
  latitude: 37.51347, // 지도 중앙 위도
  longitude: 127.041722, // 지도 중앙 경도
  zoom: 13,
  zoomControl: false,
  zoomControlOptions: { position: "TOP_RIGHT" },
});

const title = ref("");

const initLayers = ["BACKGROUND", "BACKGROUND_DETAIL", "POI_KOREAN", "TRANSIT"];

const editor = ref(null);
onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector("#editor"),
    previewStyle: "tab",
    height: "600px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    hooks: {
      async addImageBlobHook(blob, callback) {
        // 이미지 업로드 로직 커스텀
        try {
          /*
           * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
           *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
           */
          const formData = new FormData();
          formData.append("image", blob);

          // 2. FileApiController - uploadEditorImage 메서드 호출
          const fileName = ref();
          await axios({
            url: `http://localhost:8080/tui-editor/image-upload`,
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: userStore.accessToken, // 헤더에 accessToken을 포함하여 요청
            },
          }).then((response) => {
            fileName.value = response.data;
          });
          console.log(fileName.value);

          callback(
            `http://localhost:8080/tui-editor/image-print?fileName=${fileName.value}`,
            "image alt attribute"
          );
        } catch (error) {
          console.error("업로드 실패 : ", error);
        }
      },
    },
    /* end of hooks */
  });
  locationStore.locationList = [];
  userStore.getNonWriteReview();
});

const imageUrl = ref(null);
const handleInputFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    imageUrl.value = null;
  }
};

const location = ref("");

watch(location, () => {
  locationStore.locationList = [];
});

const findLocation = () => {
  markers.value = [];
  locationStore.findLocation(location.value);
};

const createArticle = () => {
  const content = editor.value.getMarkdown();
//   console.log("제목:", title.value);
//   console.log("내용:", content);
insertData.value.content = editor.value.getMarkdown();
    insertData.value.mapJson = JSON.stringify(finLo.value)
//   console.log(insertData.value)
  partyStore.makeArticle(insertData.value)
};
const finLo = ref();
const selectLocation = () => {
  locationStore.locationList.forEach((location) => {
    if (location.isOpen) {
      finLo.value = location;
      locationStore.locationList = [];
    }
  });
};
const reSelectLocation = () => {
  finLo.value = null;
};
</script>
  
<style scoped>
/* 이미지 미리보기 컨테이너 */
.file-upload {
  margin-bottom: 20px;
}

/* 이미지 미리보기 스타일 */
.preview-image {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
}

/* 장소 설정 컨테이너 */
.map-upload {
  margin-bottom: 20px;
}

/* 장소 설정 입력란 스타일 */
input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

/* 장소 설정 버튼 스타일 */
button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* 모임 선택 설명 스타일 */
p {
  margin-bottom: 10px;
}

/* 에디터 스타일 */
#editor {
  margin-bottom: 20px;
}

/* 게시 버튼 스타일 */
button[type="button"] {
  padding: 8px 16px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #005a8c;
}

/* ul 요소 스타일 */
ul {
  list-style-type: none;
  padding: 0;
}

/* li 요소 스타일 */
li {
  margin-bottom: 5px;
}
</style>