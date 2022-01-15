<template>
  <section>
    <ValidationObserver v-slot="{ invalid }">
      <b-modal
        id="editarCadastro"
        ref="modal"
        size="lg"
        header-bg-variant="dark"
        header-text-variant="light"
        no-close-on-esc
        no-close-on-backdrop
        @hidden="fecharModal"
        @ok="handleOk"
      >
        <!-- Estilização header modal -->
        <template v-slot:modal-header="{ close }">
          <h5>Editar Tarefa</h5>
          <b-button size="sm" variant="outline-danger" @click="close()">
            x
          </b-button>
        </template>

        <!-- inicio container form -->
        <b-container>
          <form ref="form" @submit.prevent="salvarTarefa" :state="campoValido">
            <!-- inicio formulario titulo -->
            <b-form-group
              label="Título:"
              label-for="titulo-input"
              label-cols-sm="3"
              label-align-sm="left"
              :state="campoValido"
            >
              <ValidationProvider
                name="Titulo"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="titulo-input"
                  v-model="titulo"
                  trim
                ></b-form-input>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <!-- fim formulario titulo -->

            <!-- inicio formulario descrição -->
            <b-form-group
              label="Descrição:"
              label-for="descricao-input"
              label-cols-sm="3"
              label-align-sm="left"
              placeholder="Descrição do título"
            >
              <ValidationProvider
                name="Descrição"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="descricao-input"
                  v-model="descricao"
                  placeholder="Insira uma descrição"
                  trim
                ></b-form-input>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <!-- fim formulario descrição -->

            <!-- inicio formulario data expiração -->
            <b-form-group
              label="Data Expiração:"
              label-for="data-input"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <ValidationProvider
                name="Data Expiração"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="data-input"
                  v-model="valueData"
                  type="date"
                ></b-form-input>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <!-- fim formulario data expiração -->

            <!-- inicio formulario dificuldade -->

            <b-form-group
              label="Dificuldade:"
              label-for="dificuldade-input"
              invalid-feedback="Preencha todos os campos!"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <ValidationProvider
                name="Dificuldade"
                rules="required"
                v-slot="{}"
              >
                <b-form-select
                  v-model="dificuldade"
                  :options="options"
                  required
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Selecione uma opção --</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </ValidationProvider>
            </b-form-group>

            <!-- fim formulario dificuldade -->
          </form>
        </b-container>
        <!-- fim container form -->

        <!-- Estilização footer modal -->
        <template v-slot:modal-footer="{ hide, ok }">
          <b-button
            title="Cancelar edição da tarefa"
            size="sm"
            variant="dark"
            @click="hide()"
          >
            Cancelar
          </b-button>

          <b-button
            :disabled="invalid"
            title="Concluir edição da tarefa"
            size="sm"
            variant="dark"
            @click="ok()"
          >
            Salvar
          </b-button>
        </template>
      </b-modal>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: "EditModalTask",
  props: ["lista", "itemKey"],
  data() {
    return {
      titulo: null,
      descricao: null,
      valueData: null,
      dificuldade: null,
      options: [
        { value: "Fácil", text: "Fácil" },
        { value: "Médio", text: "Médio" },
        { value: "Difícil", text: "Difícil" },
      ],
      tarefas: [],
      modalAtivo: true,
    };
  },
  created() {
    //this.titulo = this.lista.titulo;

    let inputText = this.lista.find((tarefa) => tarefa.key === this.itemKey);

    this.titulo = inputText.titulo;
    this.descricao = inputText.descricao;
    this.valueData = inputText.valueData.split("/").reverse().join("-");
    this.dificuldade = inputText.dificuldade;
  },

  methods: {
    handleOk(bvModalEvt) {
      // Previne o modal de fechar
      bvModalEvt.preventDefault();
      // aciona função pra salvar tarefa
      this.salvarTarefa();
    },
    fecharModal() {
      this.$emit("fechaModal");
    },
    salvarTarefa() {
      // envia na lista

      const enviar = {
        titulo: this.titulo,
        descricao: this.descricao,
        valueData: this.valueData.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1"),
        dificuldade: this.dificuldade,
      };

      // Fecha o modal se validar
      this.$nextTick(() => {
        this.$bvModal.hide("editarCadastro");
      });
      this.$emit("updateTarefa", enviar);
    },
  },
  mounted() {
    this.$refs.modal.show();
  },
};
</script>

<style scoped>
span {
  color: red;
}
</style>