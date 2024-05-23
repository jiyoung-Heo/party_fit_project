<template>
  <div>
    <select v-model="selectCategory" name="board">
      <option value="1">자유게시판</option>
      <option value="2">가입인사</option>
      <option value="3">모임후기</option>
    </select>
    <input type="text" placeholder="제목 입력창" v-model="insertData.title" />
    <hr />
    <template v-if="selectCategory == '3'">
      <div>
        모임 선택
        <div v-if="userStore.nonWriteReview == null || userStore.nonWriteReview.length == 0">
          참여한 모임이 없습니다.
        </div>
        <div v-for="review in userStore.nonWriteReview" :key="review.articleId">
          <p><input
            type="checkbox"
            :value="review.reviewId"
            @click="selectMeet(review)"
          /> {{ review.title }}({{ review.startTime.split("T")[0]
            }}{{ review.startTime.split("T")[1].slice(0, 5) }} ~
            {{ review.endTime.split("T")[0]
            }}{{ review.endTime.split("T")[1].slice(0, 5) }}): {{ review.headcount }} 명 참여</p>
        </div>
      </div>
      <div class="map-upload">
        <p>
          장소:
          <template v-if="finLo != null">
            <div v-html="finLo.title"></div>
          </template>
          <button type="button" @click="clickFindLoc">장소찾기</button>
        </p>
      </div>
    </template>
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
import Swal from "sweetalert2";
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";

const selectCategory = ref(1);
const thisMeet = ref();
const route = useRoute();
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
  title: "",
  content: "",
  category: 3,
  mapJson: "",
  userId: userStore.loginUserId,
  meetId: "",
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
        try {
          const formData = new FormData();
          formData.append("image", blob);

          const fileName = ref();
          await axios({
            url: `http://localhost:8080/tui-editor/image-upload`,
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: userStore.accessToken,
            },
          }).then((response) => {
            fileName.value = response.data;
          });

          callback(
            `http://localhost:8080/tui-editor/image-print?fileName=${fileName.value}`,
            "image alt attribute"
          );
        } catch (error) {
          console.error("업로드 실패 : ", error);
        }
      },
    },
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

const findLocation = async () => {
  markers.value = [];
  await locationStore.findLocation(location.value); // 이 부분이 Promise를 반환하도록 수정
};

const clickFindLoc = () => {
  Swal.fire({
    title: "장소 찾기",
    html: `
      <input type="text" id="locationInput" placeholder="장소를 입력하세요" style="width: 100%; padding: 8px; margin-bottom: 10px;" />
      <button type="button" id="searchLocation" style="padding: 8px 16px; background-color: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">장소찾기</button>
      <div id="locationResult" style="margin-top: 20px;"></div>
    `,
    showCancelButton: true,
    confirmButtonText: "장소 결정",
    cancelButtonText: "취소",
    preConfirm: () => {
      return document.getElementById("locationResult").dataset.selectedLocation;
    },
    didOpen: () => {
      document
        .getElementById("searchLocation")
        .addEventListener("click", () => {
          const locationInput = document.getElementById("locationInput").value;
          findLocationInSwal(locationInput);
        });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      finLo.value = JSON.parse(result.value);
    }
  });
};

const findLocationInSwal = async (location) => {
  try {
    await locationStore.findLocation(location); // 비동기 함수 호출 및 완료 대기
    const locationResult = document.getElementById("locationResult");
    locationResult.innerHTML = "";
    if (locationStore.locationList.length > 0) {
      console.log("test");
      // 지도와 장소 목록 추가
      const mapContainer = document.createElement("div");
      mapContainer.style.width = "100%";
      mapContainer.style.height = "400px";
      locationResult.appendChild(mapContainer);

      const { naver } = window;
      const map = new naver.maps.Map(mapContainer, {
        center: new naver.maps.LatLng(
          mapOptions.value.latitude,
          mapOptions.value.longitude
        ),
        zoom: mapOptions.value.zoom,
      });

      locationStore.locationList.forEach((location) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            Number(location.mapy) / 10000000,
            Number(location.mapx) / 10000000
          ),
          map: map,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px;">${location.title}</div>`,
        });

        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
          document.querySelectorAll("#locationResult div").forEach((div) => {
            div.style.backgroundColor = "";
          });
          locationResult.dataset.selectedLocation = JSON.stringify(location);
        });
      });
    } else {
      locationResult.innerText = "검색된 장소가 없습니다.";
    }
  } catch (error) {
    console.error("장소 검색 중 오류 발생:", error);
    // 오류 처리 로직 추가
  }
};

const createArticle = () => {
  const alertMsg = ref("");
  if (insertData.value.title == "") {
    alertMsg.value += "제목을 입력하세요\n";
  }
  if (editor.value.getMarkdown() == null || editor.value.getMarkdown() == "") {
    alertMsg.value += "내용을 입력하세요\n";
  } else {
    insertData.value.content = editor.value.getMarkdown();
    if (finLo != null) {
      insertData.value.mapJson = JSON.stringify(finLo.value);
    }
    if (thisMeet.value != null) {
      insertData.value.meetId = thisMeet.value.meetId;
    }
    Swal.fire({
    title: "게시글 작성 완료",
    // text: "모임명: "+store.selectedMeet.title,
    icon: "success",
    preConfirm: () => {
      partyStore.makeArticle(insertData.value, selectCategory.value);
    },
  });
  }
  if (alertMsg.value != "") {
    alert(alertMsg.value);
  }
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
</style>