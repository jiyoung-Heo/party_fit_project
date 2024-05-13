<template>
    <div class="signup-container">

        <h1>비밀번호변경</h1>
        <fieldset>
            <div>
                <label for="nowPW">현재 비밀번호</label>
                <input type="password" id="nowPW" v-model="nowPW" placeholder= "Password"/>
            </div>
            <div>
                <label for="changePW">새 비밀번호</label>
                <input type="password" id="changePW" v-model="changePW" placeholder= "Password" />
            </div>
            <div>
                <label for="changePW2">새 비밀번호 확인</label>
                <input type="password" id="changePW2" v-model="changePW2" placeholder= "Password" />
            </div>


            <div>
                <button @click="changePassword">비밀번호 변경</button>
                <!-- <button @click ="getInfo">정보보기 </button> -->
            </div>
        </fieldset>



    </div>
</template>


<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

onMounted(() => {
    console.log(store.loginUser)
})

const loginUser = store.loginUser;

const nowPW = ref('')
const changePW = ref('')
const changePW2 = ref('')


const changePassword = function () {
    
    if(store.isPW(nowPW.value)){
        if(changePW.value === changePW2){
            const user = {
            loginId: loginUser.loginId,
            name: loginUser.name,
            username: loginUser.username,
            password: changePW,
            email: loginUser.email,
            age: loginUser.age,
            };
            store.updateUser(user);

        }
        else{
            alert("새 비밀번호 일치하지 않음")
        }
    }
    else{
        alert("현재 비밀번호 일치하지 않음")
    }
}
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