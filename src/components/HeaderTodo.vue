<template>
  <section class="section">
    <b-container fluid class="p-4 bg-dark text-light">
       <b-col md="4">
      <h2 class="title" title="App Lista de Tarefas" >{{ title }}</h2>  <!-- Título cabeçalho -->   
        <b-row class="" cols="8" lg="6">
       
        </b-row>
        </b-col>
    </b-container>  
 </section>
</template>

<script>

export default ({
    name: "HeaderTodo",
    props: {
        title:{
            type: String,
            default: "APP Lista de Tarefas"
        }
    }
})
</script>

<style scoped>


</style>
