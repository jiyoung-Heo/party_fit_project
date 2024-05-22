<template>
  <div class="container">
    <FullCalendar :options="calendarOptions" @dateClick="handleDateClick" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const router = useRouter()
const store = useUserStore();

const handleEventClick = function (arg) {
  // console.log(arg.event.title);
  // console.log(arg.event.extendedProps);
  // alert('date click! ' + arg.dateStr)
  Swal.fire({
    icon: "success",
    title: "<" + arg.event.title + ">",
    text:
      "<p>\n" +
      "모임내용: " +
      arg.event.extendedProps.Content +
      "</p>\n" +
      "정원: " +
      arg.event.extendedProps.maxHeadcount +
      "\n" +
      "모임상태: " +
      arg.event.extendedProps.status +
      "\n" +
      "모임내용: " +
      arg.event.extendedProps.Content +
      "\n",
    showCancelButton: true,
    confirmButtonText: `
      모임상세보기
    `,
    cancelButtonText: "닫기",
    confirmButtonColor: "#ff7f50",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('dududu: '+arg.event.extendedProps.partyId)
      // console.log('test')
      router.push({ 
        name:"meetdetail", 
      params: 
      {partyId: arg.event.extendedProps.partyId, 
        meetId: arg.event.extendedProps.meetId}})
    }
  });
};
const userData = ref([]);
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  eventClick: handleEventClick,
  events: userData.value,
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek",
  },
  themeSystem: "standard",
  eventBorderColor: "#ff7f50", // 이벤트의 테두리 색을 설정합니다.
  timeZone: "UTC", // 캘린더의 시간대를 UTC로 설정합니다.
});

onMounted(() => {
  if(store.meetList != null || store.meetList != undefined){
    for (let i = 0; i < store.meetList.length; i++) {
      userData.value.push({
        title: store.meetList[i].title,
        start: store.meetList[i].startTime,
        end: store.meetList[i].endTime,
        Content: store.meetList[i].content,
        maxHeadcount: store.meetList[i].maxHeadcount,
        startTime: store.meetList[i].startTime,
        endTime: store.meetList[i].endTime,
        status: store.meetList[i].status,
        partyId: store.meetList[i].partyId,
        meetId: store.meetList[i].meetId,
      });
    }

  }
});
</script>

<style scoped>

/* 스크롤바 설정*/
.a::-webkit-scrollbar{
  width: 5px;
}

/* 스크롤바 막대 설정*/
.a::-webkit-scrollbar-thumb{
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px; 
}

</style> 