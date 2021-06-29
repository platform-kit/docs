<template>
  <div>
    <div class="ml-3 pr-2 pl-1 pt-3">
      <div class="btn btn-block text-dark" style="cursor: default !important">
        <p class="d-inline-block d-md-none o-50" style="margin-bottom: -15px">
          You're signed in as...
        </p>
        <div
          style="height: 50px; pointer-events: none"
          class="
            bg-white
            br-5
            d-flex
            mx-auto
            nav-icon-container
            btn
            d-inline-block d-md-none
            mb-4
          "
        >
          <div class="m-auto">
            <avatar
              class="d-inline-block"
              style="margin-top: 0px; margin-left: -5px !important"
              :username="getUserEmail()"
              :size="25"
            ></avatar>
            <span style="margin-left: 10px">{{ getUserEmail() }}</span>
          </div>
        </div>
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
      <div style="" class="btn btn-block text-dark" v-if="uiSettings.features.users == true">
        <g-link
          to="/admin/users"
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-person class="my-auto"></b-icon-person>
          <span class="mr-auto my-auto nav-icon-label">Users</span>
        </g-link>
      </div>
      <div style="" class="btn btn-block text-dark"  v-if="uiSettings.features.pages == true">
        <g-link
          to="/admin/pages"
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-file-earmark class="my-auto"></b-icon-file-earmark>
          <span class="mr-auto my-auto nav-icon-label">Pages</span>
        </g-link>
      </div>
      <div style="" class="btn btn-block text-dark"  v-if="uiSettings.features.content == true">
        <g-link
          to="/admin/content"
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-pen class="my-auto"></b-icon-pen>
          <span class="mr-auto my-auto nav-icon-label">Content</span>
        </g-link>
      </div>
      <div style="" class="btn btn-block text-dark"  v-if="uiSettings.features.products == true">
        <g-link
          to="/admin/products"
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-box-seam class="my-auto"></b-icon-box-seam>
          <span class="mr-auto my-auto nav-icon-label">Products</span>
        </g-link>
      </div>
      <div style="" class="btn btn-block text-dark"  v-if="uiSettings.features.payments == true">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-credit-card class="my-auto"></b-icon-credit-card>
          <span class="mr-auto my-auto nav-icon-label">Payments</span>
        </div>
      </div>
      <div style="" class="btn btn-block text-dark"  v-if="uiSettings.features.analytics == true">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-graph-up class="my-auto"></b-icon-graph-up>
          <span class="mr-auto my-auto nav-icon-label">Analytics</span>
        </div>
      </div>
      <g-link to="/admin/docs" class="btn btn-block text-dark"  v-if="uiSettings.features.docs == true">
        <div
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          <b-icon-file-earmark-code class="my-auto"></b-icon-file-earmark-code>
          <span class="mr-auto my-auto nav-icon-label">Docs</span>
        </div>
      </g-link>
      <div
        style=""
        class="btn btn-block text-dark"
        v-if="graphQl != null && graphQl == true && uiSettings.features.graphQl == true"
      >
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
      <div class="btn btn-block text-dark">
        <div
          @click="logOut()"
          style="height: 50px"
          class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
        >
          
            <b-icon-lock class="my-auto text-danger"></b-icon-lock> 
            <span class="mr-auto my-auto nav-icon-label">Sign Out</span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Avatar from "vue-avatar";

export default {
  name: "AdminNav",
  props: [],
  components: {
    Avatar,
  },
  data() {
    return {
      uiSettings: {
        features: {
          users: false,
          pages: false,
          content: false,
          products: false,
          payments: false,
          analytics: false,
          docs: true
        },
      },
      apiSchema: null,
      uiSchema: null,
      docs: null,
      graphQl: null,
    };
  },
  async mounted() {
    this.getApiSchema();
    this.getUiSchema();
    this.checkForGraphQL();
  },
  methods: {
    getUserEmail() {
      return this.$store?.getters?.getUser?.data?.sub;
    },
    getUser() {
      return this.$store?.getters?.getUser;
    },
    logOut() {
      this.$store.commit("updateUser", {});
      window.location.href = "/";
    },
    async checkForGraphQL() {
      let res = await axios.get("/api");
      console.log(res.status);
      if (res.status == 200) {
        this.graphQl = true;
      } else {
        this.graphQl = false;
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