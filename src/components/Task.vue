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

export default {
  name: "Task",
  components: {
    AddModalTask,
    ItemList,
  },
  data() {
    return {
      tarefas: [],
      listaInicial: [
        {
          key: 1,
          titulo: "Texto salvo",
          descricao: "Texto salvo",
          valueData: "20/12/2020",
          dificuldade: "Médio",
          status: "Pendente",
        },
        {
          key: 2,
          titulo: "Texto salvo 2",
          descricao: "Texto salvo 2",
          valueData: "20/12/2020",
          dificuldade: "Médio",
          status: "Concluído",
        },
        {
          key: 3,
          titulo: "Texto salvo 2",
          descricao: "Texto salvo 2",
          valueData: "20/12/2020",
          dificuldade: "Médio",
          status: "Pendente",
        },
        {
          key: 4,
          titulo: "Texto salvo 2",
          descricao: "Texto salvo 2",
          valueData: "20/12/2020",
          dificuldade: "Médio",
          status: "Concluído",
        },
      ],
      op: "",
      keyTemp: null,
    };
  },
  methods: {
    // Adiciona os itens na tabela recebendo o item do AddModaltask como parâmetro
    enviarItem(item) {
      this.tarefas.push({
        key: Date.now(),
        status: item.status,
        titulo: item.titulo,
        descricao: item.descricao,
        valueData: item.valueData,
        dificuldade: item.dificuldade,
      });
      console.log(this.tarefas);
    },
    // remove o item selecionado da tabela
    deleteTask(key) {
      let filtro = this.tarefas.filter((item) => {
        return item.key !== key;
      });

      return (this.tarefas = filtro);
    },
    // verifica se existe na tabela, se existir o status da tarefa é alterado.
    checkTask(key) {
      let lista = this.tarefas.find((tarefa) => tarefa.key === key);

      let filtro = this.tarefas.find((item) => {
        return item.key === key;
      });

      if (filtro.key === lista.key && filtro.status === "Concluído") {
        lista.status = "Pendente";
      } else {
        lista.status = "Concluído";
      }
    },

    // Recebe a key e busca no array para editar
    takeKey(key) {
      this.keyTemp = key;
    },
    editTask(item) {
      let lista = this.tarefas.find((tarefa) => tarefa.key === this.keyTemp);

      if (lista.key) {
        lista.titulo = item.titulo;
        lista.descricao = item.descricao;
        lista.valueData = item.valueData;
        lista.dificuldade = item.dificuldade;
      }
    },
    // Exclui todas as tarefas
    handleOk() {
      this.tarefas = [];
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
  created() {
    // Chama automaticamente após a instância do vue ser chamada e salva no loca storage
    const lista = localStorage.getItem("tarefas");
    this.tarefas = JSON.parse(lista) || [];

    if (localStorage.getItem("tarefas")) {
      this.tarefas = JSON.parse(localStorage.getItem("tarefas"));
    } else {
      this.tarefas = this.listaInicial;
    }
  },
};
</script>

<style scoped>
</style>
