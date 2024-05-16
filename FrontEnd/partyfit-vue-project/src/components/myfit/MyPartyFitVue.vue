<template>
    <div class="my-party-fit">
        나의 partyfit
        <hr>
        <!-- <div v-for="(party,index) in partylist"></div> -->
        쭉 리스트업
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    getMyPartyFit(1);

})
</script>

<style lang="scss" scoped>

</style>