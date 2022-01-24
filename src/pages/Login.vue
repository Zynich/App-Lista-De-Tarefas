<template>
  <section>
    <div id="login">
      <div class="loginArea" v-if="login">
        <b-container>
          <b-row class="justify-content-md-center" cols="10">
            <b-col style="margin-top: 20vh" cols="4">
             <!--Inicio login -->
              <h2>LOGIN</h2>
              <b-form @submit.prevent="handleLogin">
                <b-form-group
                  id="input-email"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="email"
                    type="text"
                    required
                    placeholder="Digite seu email"
                  ></b-form-input>
                </b-form-group>
            

              
                <b-form-group
                  id="input-senha"
                  label="Senha:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="password"
                    type="password"
                    required
                    placeholder="Digite sua senha"
                  ></b-form-input>
                </b-form-group>

                <b-button

                  
                  block
                  type="submit"
                  class="ms-5 mt-2"
                  variant="primary"
                  >Acessar</b-button
                >
              </b-form>
              <b-button @click="toggleBtn" class="text-decoration-none" href="#" variant="link"
                >Criar uma conta</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </div>
      
      <!--Inicio cadastro -->
      <div class="cadastroArea" v-else>
        <b-container>
          <b-row class="justify-content-md-center" cols="10">
            <b-col style="margin-top: 20vh" cols="4">
              <h2>CADASTRAR</h2>

              <b-form @submit.prevent="handleRegister">
                <b-form-group
                  id="input-user"
                  label="Nome:"
                  label-for="input-0"
                >
                  <b-form-input
                    id="input-0"
                    v-model="nome"
                    type="text"
                    required
                    placeholder="Digite seu nome"
                  ></b-form-input>
                </b-form-group>

              
                <b-form-group
                  id="input-email"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="email"
                    type="text"
                    required
                    placeholder="Digite seu email"
                  ></b-form-input>
                </b-form-group>
             

                <b-form-group
                  id="input-senha"
                  label="Senha:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="password"
                    type="password"
                    required
                    placeholder="Digite sua senha"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  block
                  type="submit"
                  class="ms-5 mt-2"
                  variant="primary"
                  >Cadastrar</b-button
                >
              </b-form>
              <b-button @click="toggleBtn" class="text-decoration-none" href="#" variant="link"
                >Já possuo uma conta</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </div>

    </div>
  </section>
</template>

<script>
import firebase from '../services/firebaseConnection';


export default {
  name: "Login",
  data() {
    return {
      nome: "",
      email: "",
      password: "",
      login: true,
    };
  },
  methods:{
    toggleBtn(){
      this.login = !this.login;
      this.nome = '';
      this.email = '';
      this.password = '';
    },
    async handleLogin(){
     const{ user } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

     const userProfile = await firebase.firestore().collection('users')
     .doc(user.uid).get();

     const usuarioLogado = {
       uid: user.uid,
       nome:userProfile.data().nome
     };

     await localStorage.setItem('appTarefas', JSON.stringify(usuarioLogado));

     this.$router.push('/');


    },
    async handleRegister(){
     const {user} = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

      await firebase.firestore().collection('users')
      .doc(user.uid).set({
        nome: this.nome
      })
      .then(async ()=>{
        const usuarioLogado = {
          uid: user.uid,
          nome:this.nome
        };

        await localStorage.setItem('appTarefas', JSON.stringify(usuarioLogado))

      })
      .catch(()=>{
        console.log('ERRO AO CADASTRAR USUÁRIO')
      });

      this.$router.push('/');


    }
  }
};
</script>

<style scoped>
</style>
