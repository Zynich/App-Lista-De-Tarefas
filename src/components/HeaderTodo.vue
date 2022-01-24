<template>
  <section class="section">
    <b-container fluid class="p-4 bg-dark text-light">
        
         <b-row align-h="between">
            <b-col cols="12" md="8">
                <h2 class="title" title="App Lista de Tarefas" >
                    <router-link to="/">{{ title }}</router-link>
                </h2>  <!-- Título cabeçalho -->  
            </b-col>

            <b-col cols="6" md="4">
                <h2 class="dashboard" dashboard="App Lista de Tarefas" >
                <router-link tag="button" to="/dashboard" justify-content="right">{{ dashboard }}</router-link>
            </h2>  <!-- Dashboard -->  
            </b-col>
        </b-row>
       
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
        },
        dashboard:{
            type: String,
            default: "Dashboard"
        },

    }
})
</script>

<style scoped>

a{
    text-decoration: none!important;
}
button{
    outline: none!important;
    background: transparent!important;
    color: #0d6efd;
    border: 0;
}

</style>
