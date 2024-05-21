<template>
  <div>
    <label for="changePW">현재 비밀번호</label>
    <input type="password" v-model="nowPW" placeholder="현재 비밀번호" />
    <div v-if="!isSame">비밀번호가 달라요</div>
    <button @click="deleteUser">탈퇴하기</button>
  </div>
</template>
    
    
    <script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const store = useUserStore();
const isSame = ref(true);

onMounted(() => {});
const nowPW = ref();
const deleteUser = () => {
  if (nowPW.value == store.loginUser.password) {
    Swal.fire({
      title: "탈퇴하시겠습니까?",
      text: "되돌릴 수 없습니다",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "취소",
      confirmButtonText: "탈퇴",
    }).then((result) => {
      if (result.isConfirmed) {
        store.userLeaveRequest();
        Swal.fire({
          title: "탈퇴완료!",
          text: "탈퇴되었습니다. 메인페이지로 이동합니다.",
          icon: "success",
        }).then(()=>{
            console.log("test")
            //회원탈퇴진행
            store.$reset();
            router.push({name:'home'})
        });
      }
    });
  } else {
    isSame.value = false;
  }
};
</script>
    
    
    <style scoped>
</style>