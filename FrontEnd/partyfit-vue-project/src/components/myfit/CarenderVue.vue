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
import { usePartyStore } from "@/stores/party";
const router = useRouter()
const store = useUserStore();
const partyStore = usePartyStore();

const handleEventClick = function (arg) {
  // console.log(arg.event.title);
  // console.log(arg.event.extendedProps);
  // alert('date click! ' + arg.dateStr)
  Swal.fire({
    icon: "success",
    title: "<" + arg.event.title + ">",
    text:
      "\n" +
      "모임내용: " +
      arg.event.extendedProps.meet.content +
      "\n" +
      "정원: " +
      arg.event.extendedProps.meet.maxHeadcount +
      "\n" +
      "현재 인원: " +
      arg.event.extendedProps.meet.headcount +
      "\n" ,
    showCancelButton: true,
    confirmButtonText: `
      모임상세보기
    `,
    cancelButtonText: "닫기",
    confirmButtonColor: "#ff7f50",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // console.log(arg.event)
      // const clickMeet = {
      //   meetId: arg.event.extendedProps.meetId,
      //   content: arg.event.extendedProps.content,
      //   maxHeadcount: arg.event.extendedProps.maxHeadcount,
      //   partyId: arg.event.extendedProps.partyId,
      //   status: arg.event.extendedProps.status,
      //   title: arg.event.title,
      //   headcount: arg.event.extendedProps.headcount,
    // private Date startTime;
    // private Date endTime;
    // private int headcount;
    // private String deleteYn;
      // }
      // console.log(arg.event.extendedProps.meet)
      // console.log(partyStore.selectedParty.value)
      // console.log(arg.event.extendedProps.meet)
      partyStore.getOneParty(arg.event.extendedProps.meet.partyId)
      partyStore.selectedMeet = await arg.event.extendedProps.meet
      router.push({ 
        name:"meetdetail", 
      params: 
      {partyId: arg.event.extendedProps.meet.partyId, 
        meetId: arg.event.extendedProps.meet.meetId}})
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

onMounted(async () => {
    if(store.meetList != null || store.meetList != undefined){
      for (let i = 0; i < store.meetList.length; i++) {
        userData.value.push({
          title: store.meetList[i].title,
          start: store.meetList[i].startTime,
          end: store.meetList[i].endTime,
          meet: store.meetList[i],
        });
      }
    }
});
</script>

<style scoped>
</style> 