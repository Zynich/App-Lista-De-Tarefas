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
        <b-button size="sm" variant="outline-danger" @click="close()">
          x
        </b-button>
      </template>

      <!-- inicio container form -->
      <b-container>
        <form ref="form" @submit.stop.prevent="salvarTarefa">
          <!-- inicio formulario titulo -->
          <b-form-valid-feedback id="input-2-live-feedback"
            >This is a field.</b-form-valid-feedback
          >
          <b-form-group
            label="Título:"
            label-for="titulo-input"
            label-cols-sm="3"
            label-align-sm="left"
            :state="campoValido"
          >
            <b-form-input
              id="titulo-input"
              v-model="titulo"
              :state="campoValido"
              placeholder="Insira um título"
              trim
              required
            ></b-form-input>
          </b-form-group>
          <!-- fim formulario titulo -->

          <!-- inicio formulario descrição -->
          <b-form-group
            label="Descrição:"
            label-for="descricao-input"
            label-cols-sm="3"
            label-align-sm="left"
            :state="campoValido"
            placeholder="Descrição do título"
          >
            <b-form-input
              id="descricao-input"
              v-model="descricao"
              :state="campoValido"
              placeholder="Insira uma descrição"
              trim
              required
            ></b-form-input>
          </b-form-group>
          <!-- fim formulario descrição -->

          <!-- inicio formulario data expiração -->
          <b-form-group
            label="Data Expiração:"
            label-for="data-input"
            label-cols-sm="3"
            label-align-sm="left"
            :state="campoValido"
          >
            <b-form-input
              id="data-input"
              v-model="valueData"
              :state="campoValido"
              type="date"
              placeholder="DD/MM/YYYY"
              autocomplete="off"
              replace
              required
            ></b-form-input>
          </b-form-group>
          <!-- fim formulario data expiração -->

          <!-- inicio formulario dificuldade -->

          <b-form-group
            label="Dificuldade:"
            label-for="dificuldade-input"
            label-cols-sm="3"
            label-align-sm="right"
            :state="campoValido"
          >
            <b-form-select
              v-model="dificuldade"
              :options="options"
              :state="campoValido"
              required
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Selecione uma opção --</b-form-select-option
                >
              </template>
            </b-form-select>
            <b-form-invalid-feedback
              ><span>Preencha todos os campos!</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- fim formulario dificuldade -->
        </form>
      </b-container>
      <!-- fim container form -->

      <!-- Estilização footer modal -->
      <template v-slot:modal-footer="{ hide, ok }">
        <b-button size="sm" variant="dark" @click="hide()"> Cancelar </b-button>

        <b-button size="sm" variant="dark" @click="ok()"> Salvar </b-button>
      </template>
    </b-modal>
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
      checkBox: "Pendente",
      options: [
        { value: "Fácil", text: "Fácil" },
        { value: "Médio", text: "Médio" },
        { value: "Difícil", text: "Difícil" },
      ],
      tarefas: [],
    };
  },

  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.campoValido = valid;
      return valid;
    },
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
      if (!this.checkFormValidity()) {
        return;
      }
      // envia na lista

      const enviar = {
        titulo: this.titulo,
        descricao: this.descricao,
        valueData: this.valueData.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1"),
        dificuldade: this.dificuldade,
        checkBox: this.checkBox,
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