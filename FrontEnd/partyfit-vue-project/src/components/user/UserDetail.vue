<template>
    <div class="container">
        <p style="font-size: 1.8rem; margin-bottom:40px;">마이페이지</p>
        <p style="font-size: 1.5rem; margin-bottom:40px;">프로필정보</p>
        <div class="userInfo">


            <!-- <div class="position-relative">
                <img :src=loginUser.profile alt="프로필이미지" />
                <span class=" position-absolute bottom-0 end-0  translate-middle badge-lg   text-bg-light rounded-pill">
                    <i class="bi bi-pencil"></i></span>
            </div> -->

            <div class="position-relative" style="width: 140px;">
                <img :src="loginUser.profile" alt="프로필이미지" class="position-relative"  />
                <span class="position-absolute bottom-0 start-100 ">
                    <span class="badge rounded-pill ">

            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-pencil" style="font-size: 1.8rem; color:black"></i>
            </button>
                    </span>
                </span>
            </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">프로필 수정</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            <div>
<!-- 
                <button type="button" class="btn btn-light position-relative" style="width : 150px;">
                    <img :src="loginUser.profile" alt="프로필이미지" class="position-relative" />
                    <span
                        class="position-absolute  badge top-0 end-10 translate-middle p-2  border border-dark bg-light  rounded-circle">
                        <i class="bi bi-pencil" style="font-size: 1.5rem; color: #000;"></i>

                    </span>
                </button> -->
            </div>

        </div>


        <fieldset>
            <div>
                <label for="loginId">ID</label>
                <input type="text" id="loginId" v-model="user.loginId" readonly />
            </div>
            <div>
                <label for="password">PW</label>
                <button @click="changePW">비밀번호 변경</button>
            </div>
            <div>
                <label for="name">이름</label>
                <input type="text" id="name" v-model="user.name" readonly />
            </div>
            <div>
                <label for="username">닉네임</label>
                <input type="text" id="username" v-model="user.username" readonly />
            </div>
            <div>
                <label for="age">나이</label>
                <input type="int" id="age" v-model="user.age" readonly />
            </div>
            <div>
                <label for="email">이메일</label>
                <input type="text" id="email" v-model="user.email" readonly />
            </div>
            <div>
                <button @click="goUpdatepage">수정</button>
            </div>
        </fieldset>
    </div>

</template>


<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserFindLoginId from "./UserFindLoginId.vue";

const router = useRouter();
const store = useUserStore();

const loginUser = ref(store.loginUser)

onMounted(() => {
    store.getUser(sessionStorage.getItem("loginUser"))
        .then(() => {
            loginUser.value = store.loginUser
        })
})

watch(loginUser, (newVal, oldVal) => {
    user.value = {
        loginId: newVal.loginId,
        name: newVal.name,
        username: newVal.username,
        password: newVal.password,
        email: newVal.email,
        age: newVal.age,
    }
})


const user = ref({
    loginId: "",
    name: "",
    username: "",
    password: "",
    email: "",
    age: "",

});

const updateProfile = function () {
   
}

const changePW = function () {
    router.push({ name: "changePW" })
}

</script>


<style scoped>
img {
    width: 200px;
    border-radius: 50%;
    object-fit: cover;

}

button{
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