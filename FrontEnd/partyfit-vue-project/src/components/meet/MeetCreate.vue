<template>
  <div>
    <h1>모임 등록</h1>
      <div>
        <label for="title">제목:</label>
        <input type="text" required v-model="data.title"/>
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea rows="4" required v-model="data.content"></textarea>
      </div>
      <div>
        <label for="max_headcount">가입 정원:</label>
        <input type="number" required v-model="data.maxHeadcount"/>
      </div>
      <div>
        <label for="start_time">시작 시간:</label>
        <input
          type="datetime-local" v-model="data.startTime"
          required
        />
      </div>
      <div>
        <label for="end_time">종료 시간:</label>
        <input type="datetime-local" required v-model="data.endTime"/>
      </div>
      <button type="submit" @click="submitButton">등록</button>
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

<style lang="scss" scoped>
</style>