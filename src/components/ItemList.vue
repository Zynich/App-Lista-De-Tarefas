<template>
  <section>

<div>
      <b-input-group size="sm" class="mt-3" prepend="Pesquisar">
          <b-form-input 
                  autofocus 
                  v-model="filter"
                  placeholder="Search"
                  type="text" 
                  size="sm"></b-form-input>
        </b-input-group>
  
      <b-table
        sticky-header
        striped
        :fields="fields"
        :items="lista"
        :key="lista.key"
        :filter="filter"
        class="p-1"
        id="colorTable"
        checkable
        :tbody-tr-class="rowClass"
        hover
      >
        <template v-slot:cell(check)="{ item }">
          <b-form-checkbox v-if="item.checkBox === 'Pendente' ? true:false" @change="completed(item.key)"></b-form-checkbox>
        </template>

        <template v-slot:cell(editar)="{ item }">
          <b-button     
            v-b-modal.EditModalTask
            variant="dark"
            size="sm"
            @click="editar(item.key)"
            v-if="item.checkBox == 'Pendente' ? true : false"
            >Editar</b-button
          >
            <b-button
            v-if="item.checkBox == 'Pendente' ? false : true"
            v-b-modal.EditModalTask
            variant="dark"
            size="sm"
            @click="editar(item.key)"
            disabled
            >Editar</b-button
          >
        </template>

        <template v-slot:cell(excluir)="{ item }">
          <b-button variant="danger" size="sm" @click="excluir(item.key)"
            >Excluir
          </b-button>
        </template>
      </b-table>

      <b-modal
        ref="modalExcluir"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        @ok="handleOk"
      >
        <p>Tem certeza que deseja excluir essa tarefa?</p>
        <template v-slot:modal-footer="{ hide, ok }">
          <b-button size="sm" variant="danger" @click="hide()"> Não </b-button>
          <b-button size="sm" variant="dark" @click="ok()"> Sim </b-button>
        </template>
      </b-modal>

      <EditModalTask
        v-if="modal === true"
        @fechaModal="modal = false"
        :lista="lista"
        :itemKey="itemKey"
        @updateTarefa="updateTarefa"
      />
    </div>
  </section>
</template>



<script>
import EditModalTask from "@/components/EditModalTask.vue";

export default {
  name: "ItemList",
  props: ["lista", "delete", "editarTarefa", "check", "editarKey"],
  components: {
    EditModalTask,
  },
  data() {
    return {
      itemKey: "",
      itemStatus: "",
      modal: false,
      tarefa: [],
      filter: "",
      fields: [
        {
          key: "check",
          label: "",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "titulo",
          label: "Titulo",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "descricao",
          label: "Descrição",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "valueData",
          label: "Data Expiração",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "dificuldade",
          label: "Dificuldade",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "checkBox",
          label: "Status",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "editar",
          label: "Editar",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },
        {
          key: "excluir",
          label: "Excluir",
          thStyle: { backgroundColor: "#000", color: "#FFF" },
        },       
      ],
    };
  },
  methods: {
    excluir(item) {
      this.$refs.modalExcluir.show();
      this.itemKey = item;
    },
    handleOk() {
      this.excluirTarefa();
    },
    excluirTarefa() {
      this.delete(this.itemKey);
    },
    updateTarefa(item) {
      this.editarTarefa(item);
    },
    editar(item) {
      this.modal = true;
      this.itemKey = item;
      this.editarKey(this.itemKey);
    },
    completed(item) {
      this.itemStatus = item;
      this.check(this.itemStatus);
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.checkBox === "Concluído") return "table-success";
    },
  },
};
</script>

<style>
</style>

