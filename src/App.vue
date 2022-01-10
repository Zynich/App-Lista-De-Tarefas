<template>
  <div id="app">
    <HeaderTodo />
    <Task />
  </div>
</template>

<script>
import HeaderTodo from "@/components/HeaderTodo.vue";
import Task from "@/components/Task.vue";

export default {
  name: "App",
  components: {
    HeaderTodo,
    Task,
  },
};
</script>

<style>
</style>
