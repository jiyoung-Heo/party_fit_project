<template>
<div>
    나의 참여내역 탭

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