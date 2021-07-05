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
      <div v-if="searchResults != null && searchResults.total_count > 0">
        <b-list-group class="mt-3 d-block border-0 raised mx-3">
          <b-list-group-item
            @click="$parent.search = null"            
            :href="'/admin/docs/editor?repo=' + item.repository + '&remotePath=' + item.path"
            class="border-0"
            v-for="(item, index) in searchResults.items"            
            :key="index"
          >
            {{ item.name }}<br />
            <span class="o-50"> in {{ item.repository }}</span>
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-list-group
        v-else-if="searchResults != null && searchResults.total_count == 0"
        class="mt-3 d-block border-0 raised mx-3 bg-white p-3 text-center"
      >        
        No Results.
      </b-list-group>
      <b-list-group
        v-else
        class="mt-3 d-block border-0 raised mx-3 bg-white p-3 text-center"
      >
        <b-icon-arrow-clockwise animation="spin"></b-icon-arrow-clockwise>
        Loading...
      </b-list-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminSearchResults",
  props: ["search"],
  data() {
    return {
      uiSettings: {},
      apiSchema: null,
      uiSchema: null,
      docs: null,
      graphQL: null,
      searchResults: null,
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
        this.getAllSearchResults();
      } catch (error) {
        console.log(error);
      }
    },
    getAllSearchResults() {
      this.uiSchema.docs.collections.forEach((collection, index) =>
        this.getSearchResults(collection.repo, collection.path)
      );
    },
    async getSearchResults(repo, directory) {
      console.log(repo);
      console.log(directory);
      try {
        const results = await axios.get(
          "/api/platformkit-search-files-v1?repo=" +
            repo +
            "&directory=" +
            directory +
            "&search=" +
            this.search
        );
        if (this.searchResults == null) {
          this.searchResults = results.data;
        }
        else if (this.searchResults.items != null) {
          this.searchResults.items = this.searchResults.items.concat(results.data.items);
          
        }
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