<template>
<div>
    나의 참여내역 탭
    - 참여중인 파티
    - 참여예정 모임
    - 참여완료 모임
    - 내가 쓴 글 조회 - 누르면 거기로 들어가지기
</div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const loginUser = ref()

onMounted(() => {
})


</script>


<style scoped>
</style>