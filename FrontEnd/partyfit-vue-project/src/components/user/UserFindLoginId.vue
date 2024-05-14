<template>
    <div class="signup-container">

        <h1>아이디찾기</h1>
        <div v-if="isFound">

            <fieldset>
                <div>
                    <label for="name">이름</label>
                    <input type="text" id="name" v-model="name" placeholder = "name"/>
                </div>
                <div>
                    <label for="email">이메일</label>
                    <input type="text" id="email" v-model="email" placeholder = "email"/>
                </div>
                <div>
                    <button @click="findLoginID">아이디 찾기 </button>
                    <!-- <button @click ="getInfo">정보보기 </button> -->
                </div>
                <h2>아이디 : {{store.findedId}} </h2>
            </fieldset>
        </div>
        <div v-else>
        </div>


    </div>
</template>


<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();


onMounted(() => {
    // console.log(store.loginUser)
})

const findLoginID = function () {
    const user = { name : name.value, email : email.value}
    
    store.findLoginID(user);
    
    // router.push({ name: "findLoginId" });
    console.log("find  " + store.findedId.value)
    
};

const isFound = computed(() => {
    return store.findedId !== null;
})



const findPW = function () {
  router.push({ name: "findPW" });
};

const loginUser = store.loginUser;

const name = ref('')
const email = ref('')

</script>


<style scoped>
h1 {
    margin: 100px;
}

/* 전체 화면을 검정색으로 설정 */

.signup-container {
    background-color: #333;
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 필드셋 스타일 */

fieldset {
    border: none;
    margin: 0;
    padding: 0;
    width: 300px;
}

/* 레이블 스타일 */

label {
    display: block;
    margin-bottom: 5px;
}

/* 입력 필드 스타일 */

input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
}

/* 버튼 스타일 */

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    /* 파란색 */
    color: white;
    border: none;
    cursor: pointer;
}

/* 버튼 호버 효과 */

button:hover {
    background-color: #0056b3;
    /* 더 짙은 파란색 */
}

/* 레전드 스타일 */

legend {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>