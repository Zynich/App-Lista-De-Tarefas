<template>
  <div id="dashboard">
         <div class="loginArea">
        <b-container>
          <b-row class="justify-content-md-center" cols="10">
            <b-col style="margin-top: 20vh" cols="4">
             <!--Inicio atualizar perfil -->
              <h2>Minha Conta</h2>
              <h6>Atualize seu perfil</h6>
              <b-form @submit.prevent="updateProfile">
                <b-form-group
                  id="input-nome"
                  label="Nome:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="nome"
                    type="text"
                    required
                    :placeholder="user.nome"
                  ></b-form-input>
                </b-form-group>
            
                <b-button

                  
                  block
                  type="submit"
                  class="ms-5 mt-2"
                  variant="primary"
                  >Atualizar Perfil</b-button
                >
              </b-form>
              <b-button
          @click="logOut"
                  block
                  type="submit"
                  class="ms-5 mt-2"
                  variant="primary"
                  >Sair</b-button
                >
             
            </b-col>
          </b-row>
        </b-container>
      </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: 'Dashboard',
  data(){
    return{
      nome: '',
      user: {}
    }
  },
  created(){
    const user = localStorage.getItem('appTarefas');
    this.user = JSON.parse(user);
  },
  methods:{
   async logOut(){
      const confirm = window.confirm('Você deseja sair do sistema?');

      if(confirm){
        await firebase.auth().signOut()
        .then(async()=> {
          await localStorage.removeItem('appTarefas');
          this.$router.push('/login');
        })
      }
      else{
        return;
      }
    },
  async updateProfile(){

      await firebase.firestore().collection('users')
      .doc(this.user.uid).update({
        nome: this.nome
      })

      localStorage.setItem('appTarefas', JSON.stringify({uid: this.user.uid, nome: this.nome}))

    }
  }
};
</script>

<style>
</style>