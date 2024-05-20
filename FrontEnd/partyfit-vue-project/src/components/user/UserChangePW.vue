<template>
    <div class="signup-container">

        <h1>비밀번호 재설정</h1>
        <fieldset>
            
            <div>
                <label for="changePW">변경할 비밀번호</label>
                <input type="password" id="changePW" v-model="changePW" placeholder= "변경할 비밀번호" />
            </div>
            <div>
                <label for="changePW2">변경할 비밀번호 확인</label>
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
import { useRoute } from "vue-router";

const route = useRoute();
const store = useUserStore();

onMounted(() => {
    // console.log(store.loginUser)
})

const changePW = ref('')
const changePW2 = ref('')


const changePassword = function () {
        if(changePW.value === changePW2.value){
            const user = {
            userId: store.findPwFindUser.userId,
            username: store.findPwFindUser.username,
            email: store.findPwFindUser.email,
            age: store.findPwFindUser.age,
            password: changePW.value,
            };
            store.changePassword(user);
        }
        else{
            alert("새 비밀번호 일치하지 않음")
        }
}
</script>


<style scoped>
</style>