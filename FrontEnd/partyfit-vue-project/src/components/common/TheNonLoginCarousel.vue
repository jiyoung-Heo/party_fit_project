<template>
    <div class="container">
      <div
        id="carouselExampleFade"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://lh3.googleusercontent.com/proxy/xIIUukewF0KBShAKcjbEGte7CWflVsIssYIGRdw3Uk1NwVYNHKkzff7xVr3AI9ruq_YIb4FJTk8cA5YboN_uWLZD8oaZoyZCIqDHOLrxxDjdGzfYOw"
              class="d-block w-100"
              alt="로고배너1"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>PARTYFIT과 함께!</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://www.the-stock.kr/news/photo/202104/14130_12854_1920.png"
              class="d-block w-100"
              alt="로고배너2"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>PARTYFIT과 함께!</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8Rkv/image/L0TN0gaV-hEf6M3JQfrfgqJ5cwo.jpg"
              class="d-block w-100"
              alt="로고배너3"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>PARTYFIT과 함께!</h5>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .carousel-inner {
    height: 60vh; /* 높이를 뷰포트 높이의 50%로 설정 */
  }
  
  .carousel-item {
    height: 100%; /* 각 캐러셀 아이템이 부모 요소의 100% 높이를 차지하도록 설정 */
  }
  
  .carousel-item img {
    height: 100%;
    object-fit: cover; /* 이미지를 요소 크기에 맞게 조정 */
  }
  </style>