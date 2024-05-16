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
import { useUserStore } from "@/stores/user";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const loginUser = store.loginUser;

const name = ref('')
const email = ref('')

onMounted(() => {
    // console.log(store.loginUser)
})

const findLoginID = function () {
    const user = { name : name.value, email : email.value}
    store.findLoginID(user);
};

const isFound = computed(() => {
    return store.findedId !== null;
})




</script>


<style scoped>
</style>