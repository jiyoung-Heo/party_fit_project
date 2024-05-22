<template>

    <div class="container">
        <div class="main">
            <ul class="nav nav-pills flex-column mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">마이페이지</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false">회원정보수정</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                        aria-selected="false">참여내역</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-disabled-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled"
                        aria-selected="false">회원탈퇴</button>
                </li>
            </ul>


            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                    tabindex="0">
                    <UserDetail />
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                    tabindex="0">
                    <UserUpdate />

                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                    tabindex="0">
                    <UserMyActivity />
                </div>
                <div class="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab"
                    tabindex="0">
                    <UserDelete />
                </div>
            </div>

        </div>
    </div>

</template>


<script setup>
import UserUpdate from "./UserUpdate.vue";
import UserDetail from "./UserDetail.vue";
import UserMyActivity from "./UserMyActivity.vue";
import UserDelete from "./UserDelete.vue";


</script>


<style scoped>
.nav-pills {
    --bs-nav-pills-border-radius: --#{$prefix}border-radius;
    --bs-nav-pills-link-active-color: black;
    --bs-nav-pills-link-active-bg: ;
    
}

.nav {
    --bs-nav-link-padding-x: 1rem;
    --bs-nav-link-padding-y: 0.5rem;
    --bs-nav-link-font-weight: bold;
    --bs-nav-link-color: grey;
    --bs-nav-link-hover-color: var(--bs-link-hover-color);
    --bs-nav-link-disabled-color: var(--bs-secondary-color);
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    font-size: 1.2rem;
    padding: 10px;
    width: 250px;
    height: 80vh;
    border-right : 1px solid rgb(230, 230, 230);
}

.nav-item {
    margin: 10px;
}

.tab-content{
    padding : 20px;
    flex: 1;
}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}




</style>