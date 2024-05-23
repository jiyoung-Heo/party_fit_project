<template>
   <div class="board" >
   
    <div class="input-group mb-3 " style="margin-left:50px">
            <div class ="input-group">

            <input type="text" class="form-control me-4" placeholder="검색어를 입력해주세요" v-model="searchQuery" />
            <button class="btn-warning" @click="performSearch()">검색</button>
            </div>
            <p @click ="goArticleCreate">+ 글 작성하기</p>
        </div>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="flex-auto flex-shrink-0">
                <h3>meet</h3>
                <p>관심 있는 meet에 참여해보세요!</p>
            </div>
            <div
                class="gh-header-actions mt-0 mb-3 mb-md-2 ml-1 flex-md-order-1 flex-shrink-0 d-flex flex-items-center gap-1">


                <a class="dropdown-item" @click="setCurrent()">최신순</a>
                <a class="dropdown-item" @click="setOld()">오래된순</a>


            </div>
        </div>

        <div class="container">
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <!-- <th></th> -->
                        <th>meet</th>
                        <th>현재인원</th>
                        <th>정원</th>
                        <th>시작시간</th>
                        <th>끝나는시간</th>
                    </tr>

                </thead>
                <tbody>
                  <tr v-for="meet in meets" :key="meet.meetId" @click="goMeetDetail(meet)">
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
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul class="pagination d-flex justify-content-center">
                    <li class="page-item">
                        <a class="page-link" @click.prevent="currentPage--" :class="{ disabled: currentPage <= 1 }"
                            href="#">&lt;</a>
                    </li>
                    <li class="page-item" :class="{ active: currentPage === page }" v-for="page in pageCount"
                        :key="page">
                        <a class="page-link" href="#" @click.prevent="clickPage(page)">{{
                            page
                            }}</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" @click.prevent="currentPage++"
                            :class="{ disabled: currentPage >= pageCount }" href="#">&gt;</a>
                    </li>
                </ul>
            </nav>
        </div>


    </div>
</template>
  
  <script setup>
import { usePartyStore } from "@/stores/party";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const perPage = 12;
const currentPage = ref(1);
const meets = ref();

const store = usePartyStore();

onMounted(async () =>  {
  store.getMeetList(0); // 승인대기 meetRequestList
  await store.getMeetList(1); // 모집중 meetList
  store.getMeetList(2); // 정원마감 meetFullList
  meets.value = store.meetList
});

const pageCount = computed(() => {
  if (meets.value == null) return null;
  return Math.ceil(meets.value.length / perPage);
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
const category = (cate) => {
  if (cate === 1) meets.value = store.meetList;
  else if (cate === 2) meets.value = store.meetFullList;
};

const goMeetDetail = function (meet) {
  store.selectedMeet = meet;
  router.push({ name: "meetdetail", params: { meetId: meet.meetId } });
};
</script>
 
<style scoped>
.board{
    align-items: start;
  justify-content: left;
  padding-left: 40px;
  height: 90vh;
  max-width: 1300px;

}
.input-group {
    max-width: 700px;
    display: flex;
    justify-content: space-between;

}
.input-group .btn-warning{
    border-radius: 5px;
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
    color :#ff7f00;
 
}
</style>