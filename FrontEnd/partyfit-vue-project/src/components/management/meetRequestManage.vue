<template>
  <div :key="key">

    <h2>meet 승인 요청 목록</h2>
    <table>

      <thead>
        <tr>
          <th>모임명</th>
          <!-- <th>내용</th> -->
          <th>현재 인원</th>
          <th>정원</th>
          <th>시작시간</th>
          <th>끝나는시간</th>
          <!-- <th>모집중</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="meet in store.meetRequestList" :key="meet.meetId" @click="goMeetManageDetail(meet)">
          <td>{{ meet.title }}</td>
          <!-- <td>{{ meet.content }} </td> -->
          <td>{{ meet.headcount }}</td>
          <td>{{ meet.maxHeadcount }}</td>
          <td>
            {{ meet.startTime.split("T")[0] }}
            {{ meet.startTime.split("T")[1].slice(0, 5) }}
          </td>
          <td>
            {{ meet.endTime.split("T")[0] }}
            {{ meet.endTime.split("T")[1].slice(0, 5) }}
          </td>
          <!-- <td> <p v-if="meet.status === 1">모집중</p>
          <p v-if="meet.status === 2">정원마감</p> </td> -->
                  </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <a class="page-link" @click.prevent="currentPage--" :class="{ disabled: currentPage <= 1 }" href="#">&lt;</a>
        </li>
        <li class="page-item" :class="{ active: currentPage === page }" v-for="page in pageCount" :key="page">
          <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click.prevent="currentPage++" :class="{ disabled: currentPage >= pageCount }"
            href="#">&gt;</a>
        </li>
      </ul>
    </nav>
  </div>



</template>

<script setup>
import { usePartyStore } from '@/stores/party';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from "vue-router";
import meetRequestManage from './meetRequestManage.vue';

const router = useRouter();
const meetRequestList = computed(() => { return store.meetRequestList });
const perPage = 12;
const currentPage = ref(1);

const store = usePartyStore();

const key = ref(0);

const forceRerender = () => {
  key.value++;
};
onMounted(()=>{
  store.getMeetList(0)
})

const pageCount = computed(() => {
  if(store.meetRequestList == null) return null
  return Math.ceil(store.meetRequestList.length / perPage);
});

const clickPage = function (page) {
  currentPage.value = page;
};

const currentPageArticleList = computed(() => {
  return store.freeList.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  );
});
watch(() => store.meetRequestList, () => {
  forceRerender();
});

const goMeetManageDetail = (meet)=>{
  store.selectedMeet = meet;
  router.push({ name: "meetManageDetail", params: { meetId: meet.meetId } });
}


</script>

<style scoped>
.input-group {
  max-width: 700px;
  display: flex;
  justify-content: space-between;

}

.input-group>.form-control,
.input-group>.form-floating,
.input-group>.form-select {
  position: relative;
  flex: 6 auto;
  width: 1%;
  min-width: 0;

}

.form-control {
  flex: 6;
}

.btn-warning {
  flex: 1;
}

.input-group button {
  background-color: #ff7f00;
  border: none;
  color: white;
  margin-left: 10px;
}

.input-group p {
  color: #ff7f00;

}
</style>