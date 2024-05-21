<template>
  <div class="container">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <p style="font-size: 1.8rem; margin-bottom: 40px">마이페이지</p>
      <p style="font-size: 1.5rem; margin-bottom: 40px">프로필정보</p>
    <div class="userInfo">
      <div class="position-relative" style="width: 140px">
        <img
          :src="`/src/assets/user/${store.loginUser.profile}`"
          alt="프로필이미지"
          class="position-relative" style="overflow: hidden"
        />
        <span class="position-absolute bottom-0 start-100 pencil-out-circle">
          <span class="badge" @click="changeImage">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="35px" fill="#d8d8d8"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>
          </span>
        </span>
      </div>
      </div>
    <fieldset>
      <div>
        <label for="loginId">ID</label>
        {{ user.loginId }}
      </div>
      <!-- <div> -->
        <!-- <label for="password">PW</label> -->
        <!-- <button @click="changePW">비밀번호 변경</button> -->
      <!-- </div> -->
      <div>
        <label for="name">이름</label>
        {{ user.name }}
      </div>
      <div>
        <label for="username">닉네임</label>
        {{ user.username }}
      </div>
      <div>
        <label for="age">나이</label>
        {{ user.age }}
      </div>
      <div>
        <label for="email">이메일</label>
        {{ user.email }}
      </div>
    </fieldset>
  </div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserFindLoginId from "./UserFindLoginId.vue";
import Swal from "sweetalert2";

const router = useRouter();
const store = useUserStore();

const loginUser = ref(store.loginUser);
const user = ref({
  loginId: "",
  name: "",
  username: "",
  password: "",
  email: "",
  age: "",
});

onMounted(() => {
  store.getUser(sessionStorage.getItem("loginUser")).then(() => {
    loginUser.value = store.loginUser;
  });
});

watch(loginUser, (newVal, oldVal) => {
  user.value = {
    loginId: newVal.loginId,
    name: newVal.name,
    username: newVal.username,
    password: newVal.password,
    email: newVal.email,
    age: newVal.age,
  };
});

const changePW = function () {
  router.push({ name: "changePW" });
};
const changeImage = () => {
  Swal.fire({
    title: '프로필 이미지 변경',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
       기존 <img src="src/assets/user/${store.loginUser.profile}" id="currentImage" style="margin-bottom: 10px; width: 100px; height: 100px; object-fit: cover; border-radius: 50%;" />
        <input type="file" id="fileInput" accept="image/*" />
       수정 후 <img id="previewImage" style="margin-top: 10px; width: 100px; height: 100px; object-fit: cover; border-radius: 50%;" />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '변경',
    cancelButtonText: '취소',
    preConfirm: () => {
      const file = Swal.getPopup().querySelector('#fileInput').files[0];
      if (!file) {
        Swal.showValidationMessage(`이미지를 선택해 주세요`);
      } else {
        return file;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target)
        // loginUser.value.profile = e.target.result;
        store.updateUser(loginUser.value, result.value)

};
      reader.readAsDataURL(result.value);
    }
  });

  const fileInput = document.getElementById('fileInput');
  const previewImage = document.getElementById('previewImage');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
};
</script>


<style scoped>
.pencil-out-circle{
    border-radius: 50%;
    background-color: white;
    border: 1px solid #d8d8d8;
}

img {
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
}

button {
  border: none;
}

.nav-pills {
  --bs-nav-pills-border-radius: var(--bs-border-radius);
  --bs-nav-pills-link-active-color: black;
  --bs-nav-pills-link-active-bg: ;
}

.nav {
  --bs-nav-link-padding-x: 1rem;
  --bs-nav-link-padding-y: 0.5rem;
  --bs-nav-link-font-weight: ;
  --bs-nav-link-color: grey;
  --bs-nav-link-hover-color: var(--bs-link-hover-color);
  --bs-nav-link-disabled-color: var(--bs-secondary-color);
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.leftbox {
  width: 200px;
  height: 70vh;
  overflow-y: auto;
  flex: 1;
}

.rightbox {
  flex: 1;
}
</style>