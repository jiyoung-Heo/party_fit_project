<template>
  <FullCalendar :options="calendarOptions" @dateClick="handleDateClick" />
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
const router = useRouter();
const store = useUserStore();
const partyStore = usePartyStore();

const handleEventClick = function (arg) {
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
      "\n",
    showCancelButton: true,
    confirmButtonText: `
      모임상세보기
    `,
    cancelButtonText: "닫기",
    confirmButtonColor: "#ff7f50",
  }).then(async (result) => {
    if (result.isConfirmed) {
      partyStore.getOneParty(arg.event.extendedProps.meet.partyId);
      partyStore.selectedMeet = await arg.event.extendedProps.meet;
      router.push({
        name: "meetdetail",
        params: {
          partyId: arg.event.extendedProps.meet.partyId,
          meetId: arg.event.extendedProps.meet.meetId,
        },
      });
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
    // left: "prev,next today",
    // center: "title",
    // right: "dayGridMonth,dayGridWeek",
  },
  themeSystem: "standard",
  eventBorderColor: "#ff7f50", // 이벤트의 테두리 색을 설정합니다.
  timeZone: "UTC", // 캘린더의 시간대를 UTC로 설정합니다.
});

onMounted(async () => {
  if (store.meetList != null || store.meetList != undefined) {
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
/* 스크롤바 설정*/
.a::-webkit-scrollbar {
  width: 5px;
}

/* 스크롤바 막대 설정*/
.a::-webkit-scrollbar-thumb {
  background-color: rgba(255, 145, 0, 0.452);
  /* 스크롤바 둥글게 설정    */
  border-radius: 10px;
}
</style> 