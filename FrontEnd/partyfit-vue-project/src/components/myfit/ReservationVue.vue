<template>
  <div class="reservation">
    <div class="header">
      <div class="title">예약된 일정</div>
      <a class="more-link">+ 더보기</a>
    </div>
    <hr />
    <div class="meet-list">
      <div v-for="meet in meetList" :key="meet.meetId" class="meet">
        <p class="title">{{ meet.title }}</p>
        <p class="date">{{ meet.startTime.split("T")[0] }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";

const store = useUserStore();
onMounted(() => {
  store.getMyMeet();
  // console.log(store.meetList);
});

const meetList = computed(() => store.meetList);
</script>
  
  <style scoped>
.reservation {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.more-link {
  color: coral;
  text-decoration: none;
  font-size: 14px;
}

.meet-list {
  margin-top: 10px;
}

.meet {
  text-align: left;
  margin: 10px 0;
}

.meet .title {
  font-weight: bold;
}

.meet .date {
  color: grey;
}
</style>
  