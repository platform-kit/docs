<template>
  <div>
    <div class="ml-3 pr-2 pl-1 pt-3">
      <div style="" class="btn btn-block text-dark">
        <g-link
          to="/admin"
          exact
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-grid1x2 class="my-auto"></b-icon-grid1x2>
          <span class="mr-auto my-auto nav-icon-label">Dashboard</span>
        </g-link>
      </div>
      <div style="" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-person class="my-auto"></b-icon-person>
          <span class="mr-auto my-auto nav-icon-label">Users</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-file-earmark class="my-auto"></b-icon-file-earmark>
          <span class="mr-auto my-auto nav-icon-label">Pages</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-pen class="my-auto"></b-icon-pen>
          <span class="mr-auto my-auto nav-icon-label">Content</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-box-seam class="my-auto"></b-icon-box-seam>
          <span class="mr-auto my-auto nav-icon-label">Products</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark d-none">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-credit-card class="my-auto"></b-icon-credit-card>
          <span class="mr-auto my-auto nav-icon-label">Payments</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-graph-up class="my-auto"></b-icon-graph-up>
          <span class="mr-auto my-auto nav-icon-label">Analytics</span>
        </div>
      </div>
      <a href="/docs" target="_blank" class="btn btn-block text-dark">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-file-earmark class="my-auto"></b-icon-file-earmark>
          <span class="mr-auto my-auto nav-icon-label">Docs</span>
        </div>
      </a>
      <div style="" class="btn btn-block text-dark">
        <g-link
          to="/admin/api"
          exact
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-code-square class="my-auto"></b-icon-code-square>
          <span class="mr-auto my-auto nav-icon-label">API</span>
        </g-link>
      </div>
      <div id="settings-button" class="btn btn-block text-dark d-none">
        <div
          style="height: 50px"
          class="br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-gear class="my-auto"></b-icon-gear>
          <span class="mr-auto my-auto nav-icon-label">Settings</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminNav",
  props: [],
  data() {
    return {
      uiSettings: {},
      apiSchema: null,
      uiSchema: null,
      docs: null,
      graphQL: null,
    };
  },
  async mounted() {
    this.getApiSchema();
    this.getUiSchema();
    this.checkForGraphQL();
  },
  methods: {
    async checkForGraphQL() {
      let res = await axios.get("/api");
      console.log(res.status);
      if (res.status == 200) {
        this.graphQL = true;
      } else {
        this.graphQL = false;
      }
    },
    hideModal() {
      console.log("test");
      this.$refs["admin-modal"].hide();
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
    showAdminNavModal(id) {
      this.$bvModal.show("admin-modal");
    },
  },
};
</script>