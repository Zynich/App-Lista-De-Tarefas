<template>
  <div id="app">
    <HeaderTodo />
    <router-view/>
  </div>
</template>

<script>
import HeaderTodo from "@/components/HeaderTodo.vue";

//import firebase from './services/firebaseConnection';
export default {
  name: "App",
  components: {
    HeaderTodo,

  }
  
};
</script>

<style>
</style>
