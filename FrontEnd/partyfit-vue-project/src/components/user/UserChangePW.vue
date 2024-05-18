<template>
    <div class="signup-container">

        <h1>비밀번호</h1>
        <fieldset>
            <div>
                <label for="nowPW">현재 비밀번호</label>
                <input type="password" id="nowPW" v-model="nowPW" placeholder= "현재 비밀번호"/>
            </div>
            <div>
                <label for="changePW">변경할 비밀번호</label>
                <input type="password" id="changePW" v-model="changePW" placeholder= "변경할 비밀번호" />
            </div>
            <div>
                <input type="password" id="changePW2" v-model="changePW2" placeholder= "변경할 비밀번호확인" />
            </div>


            <div>
                <button @click="changePassword">저장하기</button>
            </div>
        </fieldset>



    </div>
</template>


<script setup>
import { useUserStore } from "@/stores/user";
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
</style>