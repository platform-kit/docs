<template>
  <div>
    <div class="admin-page admin-overview">
      <div
        class="
          ml-0 ml-md-3
          mt-0 mt-lg-2
          mb-4 mb-lg-0
          text-center text-md-left
          mr-4
        "
        style="font-weight: 400; font-size: 110%; color: rgba(0, 0, 100, 0.65)"
      >
        Search Results
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminSearchResults",
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