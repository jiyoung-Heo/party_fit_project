<template>
  <div class="article-create">
    <h2>meet 등록 요청</h2>
    <input type="text" placeholder="제목 입력창" v-model="data.title" />
    <hr />
    <template v-if="selectCategory == '3'">
      <div>
        모임 선택
        <div v-if="userStore.nonWriteReview == null || userStore.nonWriteReview.length == 0">
          참여한 모임이 없습니다.
        </div>
        <div v-for="review in userStore.nonWriteReview" :key="review.articleId">
          <p>
            <input type="checkbox" :value="review.reviewId" @click="selectMeet(review)" /> 
            {{ review.title }}({{ review.startTime.split("T")[0] }} {{ review.startTime.split("T")[1].slice(0, 5) }} ~ {{ review.endTime.split("T")[0] }} {{ review.endTime.split("T")[1].slice(0, 5) }}): {{ review.headcount }} 명 참여
          </p>
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
    <div class="input-field">

    <div>
      <label for="max_headcount">가입 정원:</label>
      <input type="number" style="width:50px;" required v-model="data.maxHeadcount" />
    </div>
    <div>
      <label for="start_time">시작 시간:</label>
      <input type="datetime-local" v-model="data.startTime" required />
    </div>
    <div>
      <label for="end_time">종료 시간:</label>
      <input type="datetime-local" required v-model="data.endTime" />
    </div>
    </div>
    <div >
      <p></p>
      <label for="content"></label>
      <textarea rows="4" required v-model="data.content" class="text"></textarea>
    <button class="btn" type="submit" @click="submitButton">등록</button>
    </div>
  </div>
</template>


<script setup>
import { usePartyStore } from '@/stores/party';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

const data = ref({
    title: '',
    content: '',
    maxHeadcount: 0,
    startTime: '',
    endTime: '',
})
    const partyStore = usePartyStore()
const submitButton = ()=>{
    console.log(route.params.partyId)
    partyStore.makeMeetRequest(data.value, route.params.partyId)
}
    
</script>

<style scoped>
.input-field div{
  padding:10px;
  display:inline;
}
.text{
  width:100%;
  height:50vh;
}
.article-create {
  position: relative;
  align-items: start;
  justify-content: left;
  padding-left: 130px;
  height: 90vh;
  max-width: 1300px;
  padding-right:20px;
}

select {
  height: 30px;
  margin-bottom: 10px;
  position: relative;
}

select option {
  margin: 9px;
}

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
.btn {
  position: absolute;
  right: 0px;
  margin-top: 10px;
  bottom:0;
}
</style>
