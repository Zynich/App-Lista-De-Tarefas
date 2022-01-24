<template>
  <section>
    <!-- Inicio container -->
    <b-container fluid="lg" class="mt-2" size="lg" Max container width="lg">
      <b-row>
        <b-col class="mt-3">
          <AddModalTask title="Adicionar tarefa" class="p-1" @addTarefa="enviarItem"></AddModalTask>
        </b-col>

        <b-col cols="12" md="8"> </b-col>
        <b-col class="mt-3 pt-1">
          <b-button
            :pressed="false"
            aria-pressed="false"
            variant="danger"
            size="sm"
            title="Excluir todas as tarefas" 
            replace
            @click="deleteAll"
          >
            Excluir tarefas
          </b-button>

          <!-- Inicio modal Excluir todas as Tarefas -->
          <b-modal
            ref="excluirAll"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
            @ok="handleOk"
          >
            <p>Tem certeza que deseja excluir todas as tarefas?</p>
            <template v-slot:modal-footer="{ hide, ok }">
              <b-button size="sm" variant="danger" @click="hide()">
                Não
              </b-button>
              <b-button size="sm" variant="dark" @click="ok()"> Sim </b-button>
            </template>
          </b-modal>
          <!-- Fim modal Excluir todas as Tarefas -->
        </b-col>
      </b-row>

      <b-row>
        <ItemList
          :lista="tarefas"
          :delete="deleteTask"
          :editarTarefa="editTask"
          :editarKey="takeKey"
          :check="checkTask"
        />
      </b-row>
    </b-container>
    <!-- Fim container -->
  </section>
</template>


<script>
import AddModalTask from "@/components/AddModalTask.vue";
import ItemList from "@/components/ItemList.vue";
import firebase from '../services/firebaseConnection';
export default {
  name: "Task",
  components: {
    AddModalTask,
    ItemList,
  },
  data() {
    return {
      tarefas: [],
      op: "",
      keyTemp: null,
      user: {},
    };
  },
  methods: {
    // Adiciona os itens na tabela recebendo o item do AddModaltask como parâmetro
  async  enviarItem(item) {
      
      await firebase.firestore().collection('tasks')
      .add({
        userId: this.user.uid,
        status: item.status,
        titulo: item.titulo,
        descricao: item.descricao,
        data: item.valueData,
        dificuldade: item.dificuldade,
      })
      .then(()=>{
        console.log('TAREFA ADICIONADA COM SUCESSO');
      })
      .catch((error)=>{
        console.log('ERRO AO ADICIONAR TAREFA' + error);
      })


    
    },
   

    // verifica se existe na tabela, se existir o status da tarefa é alterado.
  async  checkTask(key) {

      await firebase.firestore().collection('tasks')
      .doc(key).update({
        status: 'Concluído'
      })


    },

    // Recebe a key e busca no array para editar
    takeKey(key) {
      this.keyTemp = key;
    },
   async editTask(item) {
      //console.log(this.keyTemp) id da tarefa
      console.log(item, 'testetetete')// array dos dados editados

    // Editar tarefa
    await firebase.firestore().collection('tasks')
      .doc(this.keyTemp).update({
        titulo: item.titulo,
        descricao: item.descricao,
        data: item.valueData,
        dificuldade: item.dificuldade,
      })

    },
    // Exclui todas as tarefas
  async  handleOk() {
      
      const doc = await firebase.firestore().collection('tasks')
      .where('userId', '==', this.user.uid).get();

      doc.forEach(element => {
      element.ref.delete();
      console.log(`deleted: ${element.id}`);
      });

    },
     // remove o item selecionado da tabela
   async deleteTask(key) {
      const doc = await firebase.firestore().collection('tasks')
      .doc(key)

      console.log(doc)


      doc.delete();



    },
    deleteAll() {
      this.$refs.excluirAll.show();
    },
  },

  watch: {
    // monitora e envia os itens no localStorage
    tarefas: {
      deep: true,
      handler() {
        localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
        //console.log('SALVOU............')
      },
    },
  },
  async created() {
    
    const user = localStorage.getItem('appTarefas');
    this.user = JSON.parse(user);

    await firebase.firestore().collection('tasks')
    .where('userId', '==', this.user.uid)
    .onSnapshot((snapshot)=>{
       this.tarefas = []; 

       snapshot.forEach((doc)=>{
          this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
          descricao: doc.data().descricao,
          valueData: doc.data().data,
          dificuldade: doc.data().dificuldade,
          status: doc.data().status,
          });
       })
    })
    
      


  },
};
</script>

<style scoped>
</style>
