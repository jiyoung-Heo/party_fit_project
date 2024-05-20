<template>
    <div class="header">
      <div class="header-content">
        <span>캘린더</span>
        <span>운동기록</span>
        <span>일정목록</span>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .header {
    background-color: #343a40;
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .header-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
  }
  
  .header-content span {
    margin: 0 10px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .header-content span:hover {
    color: #ffc107;
  }
  </style>
  