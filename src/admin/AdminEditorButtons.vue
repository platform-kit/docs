<template>
  <div class="col-md-6 ml-0 mr-0 pl-0 pr-0 pl-md-0 pr-md-3">
    <g-link
      :to="uiSettings.viewButtonUrl"
      v-if="
        uiSettings.buttons != null &&
        uiSettings.buttons.includes('view') &&
        uiSettings.viewButtonUrl != null
         && uiSettings.view == 'view'
         && uiSettings.action != 'create'
      "
      class="btn btn-light text-dark secondary raised mb-2 float-right"      
      >View <b-icon-eye class="ml-2"></b-icon-eye
    ></g-link>
    <a
      class="btn btn-light text-dark raised mb-2"
      v-if="uiSettings.view == 'view'"
      @click="uiSettings.view = 'edit'"
      >Edit <b-icon-pen class="ml-2"></b-icon-pen
    ></a>
    <a
      class="btn btn-light text-danger raised mr-2 mb-2"
      v-if="uiSettings.view == 'edit'"
      @click="uiSettings.view = 'view'"
      >Cancel <b-icon-x-circle class="ml-2"></b-icon-x-circle
    ></a>

    <a
      class="float-right btn btn-light raised mb-2 text-success"
      v-if="uiSettings.view == 'edit'"
      @click="
        uiSchema.view = 'view';
        save();
      "
      >Save
      <b-icon-check2-circle class="ml-2 text-success"></b-icon-check2-circle
    ></a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminEditorButtons",
  props: ["uiSettings"],
  data() {
    return {
      apiSchema: null,
      uiSchema: null,
    };
  },
  async mounted() {
    this.getApiSchema();
    this.getUiSchema();
  },
  methods: {
    save() {
      this.$emit("saved");
    },
    async getApiSchema() {
      try {
        const results = await axios.get("/temp/api-schema.json");
        this.apiSchema = results.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUiSchema() {
      try {
        const results = await axios.get("/temp/ui-schema.json");
        this.uiSchema = results.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>