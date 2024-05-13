<template>
    <div>
        Homeview
        <div class="container">
            <div class="calendar">
                <!-- 달력 컴포넌트 -->
                <p>달력</p>
            </div>
            <div class="right">
                <div class="schedule-list">
                    <ScheduleList />
                </div>
                <div class="todo-list">
                    <TodoList />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ScheduleList from '@/components/schedule/ScheduleList.vue'; // ScheduleList 컴포넌트 import
import TodoList from '@/components/todo/TodoList.vue'; // TodoList 컴포넌트 import
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width : 1000px;
    margin: 0 auto;

}

.calendar {
    /* 왼쪽에 위치할 달력 스타일 */
    flex: 3;
    height: 100%;
    background-color: aquamarine;

}

.right {
    /* 오른쪽에 위치할 컴포넌트들을 감싸는 div 스타일 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    flex: 1;
    height: 600px;
    padding : 20px;
    box-sizing: border-box;
}

.schedule-list {
    padding : 20px;
    width: 100%;
    flex-grow: 4;
    margin: 20px;
    
    border: black 1px solid;
}

.todo-list {
    margin: 20px;
  
    padding : 20px;
    width: 100%;
    flex-grow: 1;
    border: black 1px solid;
}
</style>