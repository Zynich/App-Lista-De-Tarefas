<template>
  <div id="home">
     <h1>Logado: {{user.nome}}</h1>
    <Task/>
   
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
//import firebase from '../services/firebaseConnection';

export default {
  name: 'Home',
  components: {
    Task,
  },
  data(){
    return{
      user: {},
    }
  },
  created(){
    const user = localStorage.getItem('appTarefas');
    this.user = JSON.parse(user);
  },
  methods:{
   
  }
};
</script>

<style>
</style>
