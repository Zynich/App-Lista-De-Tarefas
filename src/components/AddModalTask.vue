<template>
  <section>
    <b-button
      :pressed="false"
      aria-pressed="false"
      v-b-modal.abrirCadastro
      variant="dark"
      size="sm"
      replace
      >Adicionar Tarefa</b-button
    >
    <ValidationObserver v-slot="{ invalid }">
      <b-modal
        id="abrirCadastro"
        ref="modal"
        size="lg"
        header-bg-variant="dark"
        header-text-variant="light"
        no-close-on-esc
        no-close-on-backdrop
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <!-- Estilização header modal -->
        <template v-slot:modal-header="{ close }">
          <h5>Adicionar Tarefa</h5>
          <b-button
            title="Fechar tela cadastro"
            size="sm"
            variant="outline-danger"
            @click="close()"
          >
            x
          </b-button>
        </template>
        <!-- inicio container form -->
        <b-container>
          <form ref="form" @submit.prevent="handleSubmit(handleOk)">
            <!-- inicio formulario titulo -->

            <b-form-group
              label="Título:"
              label-for="titulo-input"
              label-cols-sm="3"
              label-align-sm="left"
            >
              <ValidationProvider
                name="Titulo"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="titulo-input"
                  v-model="titulo"
                  type="text"
                  placeholder="Insira um título"
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
                required
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
                placeholder="DD/MM/YYYY"
                autocomplete="off"
                replace
                required
              ></b-form-input>
              <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <!-- fim formulario data expiração -->

            <!-- inicio formulario dificuldade -->

            <b-form-group
              label="Dificuldade:"
              label-for="dificuldade-input"
              label-cols-sm="3"
              label-align-sm="right"
            >
            <ValidationProvider
                name="Dificuldade"
                rules="required"
                v-slot="{}"
              >
              <b-form-select v-model="dificuldade" :options="options" required>
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
            title="Cancelar cadastro"
            size="sm"
            variant="dark"
            @click="hide()"
          >
            Cancelar
          </b-button>

          <b-button
            :disabled="invalid"
            title="Confirmar cadastro"
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
  name: "AddModalTask",
  data() {
    return {
      titulo: "",
      descricao: "",
      valueData: "",
      dificuldade: null,
      campoValido: null,
      status: "Pendente",
      options: [
        { value: "Fácil", text: "Fácil" },
        { value: "Médio", text: "Médio" },
        { value: "Difícil", text: "Difícil" },
      ],
      tarefas: [],
    };
  },

  methods: {
    validateState() {},

    handleOk(bvModalEvt) {
      // Previne o modal de fechar
      bvModalEvt.preventDefault();
      // aciona função pra salvar tarefa
      this.salvarTarefa();
    },
    resetModal() {
      this.titulo = "";
      this.descricao = "";
      this.valueData = "";
      this.dificuldade = null;
      this.campoValido = null;
    },
    salvarTarefa() {
      // retorna quando formulário inválido
      //this.$validator
      // envia na lista

      const enviar = {
        titulo: this.titulo,
        descricao: this.descricao,
        valueData: this.valueData.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1"),
        dificuldade: this.dificuldade,
        status: this.status,
      };

      // Fecha o modal se validar
      this.$nextTick(() => {
        this.$bvModal.hide("abrirCadastro");
      });
      this.$emit("addTarefa", enviar);
    },
  },
};
</script>

<style scoped>

span{
  color: red;
}

 

</style>