<template>
  <div class="signup-container">
    <h1>회원정보수정</h1>
    <div class="position-relative" style="width: 140px">
      <img
        :src="`/src/assets/user/${store.loginUser.profile}`"
        alt="프로필이미지"
        class="position-relative"
        style="overflow: hidden"
      />
      <span class="position-absolute bottom-0 start-100 pencil-out-circle">
        <span class="badge" @click="changeImage">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#d8d8d8"
          >
            <path
              d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"
            />
          </svg>
        </span>
      </span>
    </div>
    <fieldset>
      <div>
        <label for="loginId">ID</label>
        {{ user.loginId }}
        <!-- <input type="text" id="loginId" v-model="user.loginId" readonly /> -->
      </div>
      <div>
        <label for="password">PW</label>
        <button @click="changePW">비밀번호 변경</button>
      </div>
      <div>
        <label for="name">이름</label>
        {{ user.name }}
      </div>
      <div>
        <label for="username">닉네임</label>
        <input type="text" id="username" v-model="user.username" />
        <p v-if="isValid2">{{ errorMsg2 }}</p>
      </div>
      <div>
        <label for="age">나이</label>
        <input type="int" id="age" v-model="user.age" />
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="text" id="email" v-model="user.email" />
      </div>
      <div>
        <button @click="updateUser">저장하기</button>
      </div>
    </fieldset>
  </div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const store = useUserStore();

const user = ref({
  userId: store.loginUserId,
  loginId: store.loginUser.loginId,
  name: store.loginUser.name,
  username: store.loginUser.username,
  profile: store.loginUser.profile,
  password: store.loginUser.password,
  email: store.loginUser.email,
  age: store.loginUser.age,
});

const errorMsg2 = ref("");
const error2 = ref(false);
const isValid2 = computed(() => {
  return error2.value;
});

const isUsernameOK = async function () {
  const username = user.value.username.trim();
  if (username.length < 2 || username.length > 10) {
    errorMsg2.value = "별명은 2자 이상, 10자 이하로 입력해주세요.";
    error2.value = true;
    return;
  }
  if (/\s/.test(username)) {
    error2.value = true;
    errorMsg2.value = "공백이 포함되어 있습니다. 다시 입력해주세요.";
    return;
  }

  error2.value = false;
  await isUsernameUQ();
};

const isUsernameUQ = async function () {
  await store.isValidUsername(user.value.username).then((isValid) => {
    if (isValid || store.loginUser.username == user.value.username) {
      console.log("닉네임 사용가능");
    } else {
      console.log("닉네임중복됨");
      error2.value = true;
      errorMsg2.value = "중복됨";
      return;
    }
  });
};

const updateUser = async function () {
  await isUsernameOK();
  if (!error2.value) {
    store.updateUser(user.value);
    Swal.fire("변경완료!").then(() => {
      router.push({ name: "myPage" }).then(() => {
        location.reload();
      });
    });
  } else {
    // console.log("실 패 ");
  }
  //   console.log(user.value);
};

const changePW = function () {
  router.push({ name: "changePW" });
};

const changeImage = () => {
  Swal.fire({
    title: "프로필 이미지 변경",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
       기존 <img src="src/assets/user/${store.loginUser.profile}" id="currentImage" style="margin-bottom: 10px; width: 100px; height: 100px; object-fit: cover; border-radius: 50%;" />
        <input type="file" id="fileInput" accept="image/*" />
       수정 후 <img id="previewImage" style="margin-top: 10px; width: 100px; height: 100px; object-fit: cover; border-radius: 50%;" />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "변경",
    cancelButtonText: "취소",
    preConfirm: () => {
      const file = Swal.getPopup().querySelector("#fileInput").files[0];
      if (!file) {
        Swal.showValidationMessage(`이미지를 선택해 주세요`);
      } else {
        return file;
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e.target)
        // loginUser.value.profile = e.target.result;
        store.updateUser(user.value, result.value);
      };
      reader.readAsDataURL(result.value);
    }
  });

  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  fileInput.addEventListener("change", () => {
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
.pencil-out-circle {
  border-radius: 50%;
  background-color: white;
  border: 1px solid #d8d8d8;
}

img {
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
}
</style>