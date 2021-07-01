<template>
  <Layout>
    <div class="admin-page admin-overview">
      <b-modal id="add-new-doc-modal" title="Add New Content" hide-footer>
        <div class="badge bg-light-blue d-inline-block mb-3">Collection</div>
        <b-form-select
          v-model="uiSettings.selectedRepo"
          :options="uiSettings.repoOptions"
        ></b-form-select>
        <div class="badge bg-light-blue d-inline-block my-3">File Name</div>
        <b-form-input
          autocomplete="off"
          v-model="uiSettings.newFileName"
          placeholder="Enter a file name."
        ></b-form-input>
        <div class="badge bg-light-blue d-inline-block my-3">Repository</div>
        <b-form-input
          autocomplete="off"
          disabled="true"
          :placeholder="getRepoPlaceholder()"
        ></b-form-input>
        <div class="badge bg-light-blue d-inline-block my-3">Directory</div>
        <b-form-input
          autocomplete="off"
          disabled="true"
          :placeholder="getDirectoryPlaceholder()"
        ></b-form-input>
        <g-link :to="getEditorLink()"
          ><b-button
            :disabled="
              uiSettings.selectedRepo == null || uiSettings.newFileName == null
            "
            class="btn btn-dark bg-dark text-light border-0 mt-3 float-right"
            >Continue <b-icon-arrow-right></b-icon-arrow-right></b-button
        ></g-link>
      </b-modal>
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
        Docs
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12 mb-2">
          <b-card class="border-0 raised">
            <b-table
              borderless
              striped
              hover
              @row-clicked="myRowClickHandler"
              responsive
              class="mb-0 pb-0"
              :current-page="uiSettings.currentPage"
              :per-page="uiSettings.perPage"
              :items="items"
              :sort-by.sync="uiSettings.sortBy"
              :sort-desc.sync="uiSettings.sortDesc"
              :fields="uiSettings.fields"
            >
              <template #table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  :style="{ width: field.key === 'thumbnail' ? '5px' : '0px' }"
                />
              </template>
              <template #head(thumbnail)="data" style="width: 30px !important">
                &nbsp;
              </template>
              <template #head(title)="data">
                <b-icon-type class="mr-2 o-50"></b-icon-type>Title
              </template>
              <template #head(description)="data">
                <span class="d-none d-md-inline-block">
                  <b-icon-card-text class="mr-2 o-50"></b-icon-card-text>File
                  Path
                </span>
              </template>
              <template #head(buttons)="data"> &nbsp; </template>
              <template #cell(description)="data">
                <span class="o-50 o-h-100 d-none d-md-inline-block">{{
                  data.item.fileInfo.path
                }}</span>
              </template>
              <template #cell(thumbnail)="data">
                <avatar
                  style="margin-left: 15px"
                  class="br-5"
                  :username="data.item.title"
                  :size="25"
                  :rounded="false"
                ></avatar>
              </template>
              <template #cell(buttons)="data">
                <g-link
                  :to="
                    '/admin/docs/editor?' +
                    getRepoAndFilePath(
                      data.item.fileInfo.path,
                      data.item.fileInfo.name,
                      data.item.fileInfo.directory,
                      data.item.path
                    )
                  "
                  class="
                    raised
                    btn btn-sm
                    br-5
                    border-0
                    btn-outline-dark
                    float-right
                    d-none d-md-inline-block
                    px-3
                    py-0
                  "
                >
                  Details
                  <b-icon-caret-right-fill
                    font-scale=".85"
                    style="margin-bottom: 3px"
                  ></b-icon-caret-right-fill>
                </g-link>
              </template>
            </b-table>
          </b-card>
          <b-pagination
            v-model="uiSettings.currentPage"
            :total-rows="rows"
            :per-page="uiSettings.perPage"
            class="mt-3 mb-0 float-left raised"
            aria-controls="my-table"
          ></b-pagination>
          <a
            v-b-modal.add-new-doc-modal
            class="float-right btn btn-light raised mt-3"
            target="_blank"
            >Add New Content
            <b-icon-plus class="ml-2 text-primary"></b-icon-plus
          ></a>
        </div>
      </div>
    </div>
  </Layout>
</template>

<static-query>
query{
 docs: allDoc(sortBy: "path") {
    edges {
      node {
        id                
        path
        title
        content
        headings {
          anchor
          value
        }
        fileInfo {
          name
          path
          directory
        }
      }
    }
  }
}
</static-query>

<script>
import axios from "axios";
import Layout from "../layouts/Admin.vue";
import DocsLayout from "../components/DocsLayout.vue";
import Trend from "vuetrend";
import Avatar from "../components/Avatar.vue";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
    Avatar,
  },
  metaInfo: {
    title: "Admin",
  },
  data() {
    return {
      uiSchema: null,
      uiSettings: {
        newFileName: null,
        selectedRepo: null,
        repoOptions: [],
        sortBy: "name",
        sortDesc: true,
        currentPage: 1,
        perPage: 15,
        fields: [
          // A virtual column that doesn't exist in items
          // 'index',
          // A custom rendered image
          "thumbnail",
          // A column that needs custom formatting
          { key: "title", label: "Title" },
          // A regular column
          "description",
          "buttons",
        ],
      },
      docs: null,
      window: null,
      items: [],
    };
  },
  async mounted() {
    this.getAllDocs();
    this.getUiSchema();
    try {
      this.window = window;
    } catch (err) {}
  },
  methods: {
    getEditorLink() {
      var params = "";
      if (this.uiSettings.selectedRepo != null) {
        params =
          "repo=" + encodeURIComponent(this.uiSettings.selectedRepo.repo);
      }
      if (this.uiSettings.newFileName != null) {
        var filename = this.uiSettings.newFileName;
        if (filename.includes(".md")) {
        } else {
          filename = filename + ".md";
        }
        params =
          params +
          "&remotePath=" +
          encodeURIComponent(
            this.uiSettings.selectedRepo.path + "/" + filename
          );
      }
      params = params + "&action=create";
      return "/admin/docs/editor?" + params;
    },
    getRepoPlaceholder() {
      if (
        this.uiSettings.selectedRepo != null &&
        this.uiSettings.selectedRepo.repo != null
      ) {
        return this.uiSettings.selectedRepo.repo;
      } else {
        return "Select a collection.";
      }
    },
    getDirectoryPlaceholder() {
      if (
        this.uiSettings.selectedRepo != null &&
        this.uiSettings.selectedRepo.repo != null
      ) {
        return this.uiSettings.selectedRepo.path;
      } else {
        return "Select a collection.";
      }
    },
    async getUiSchema() {
      try {
        const results = await axios.get("/temp/ui-schema.json");
        this.uiSchema = results.data;
        var repoOptions = results.data?.docs?.collections;

        var options = [];

        function formatOptions(element, index, array) {
          element.value = element;
          var shortRepo = element.repo.split("/")[4];
          element.text =
            element.name + " (" + shortRepo + "/" + element.path + ")";
          options[index] = element;
        }

        repoOptions.forEach((element, index) =>
          formatOptions(element, index, repoOptions)
        );

        this.uiSettings.repoOptions = options;

        console.log("Doc:");
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    },
    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      console.log(record); // This will be the item data for the row
      this.window.location.href =
        "/admin/docs/editor?" +
        this.getRepoAndFilePath(
          record.fileInfo.path,
          record.fileInfo.name,
          record.fileInfo.directory,
          record.path
        );
    },
    getRepoAndFilePath(path, data, directory, urlPath) {
      var repo = null;
      function extractRepo(element, index, array) {
        if (path.includes(array[index].name)) {
          repo = array[index]["repo"];
        }
      }

      this.uiSchema.docs.collections.forEach((element, index) =>
        extractRepo(element, index, this.uiSchema.docs.collections)
      );

      directory = "";

      function extractRepoDirectory(element, index, array) {
        if (path.includes(array[index].name)) {
          directory = array[index]["path"] + "/" + path.split("/")[1];
        }
      }

      this.uiSchema.docs.collections.forEach((element, index) =>
        extractRepoDirectory(element, index, this.uiSchema.docs.collections)
      );

      return (
        "path=" +
        path +
        "&fileName=" +
        data +
        "&remotePath=" +
        directory +
        "&repo=" +
        encodeURIComponent(repo) +
        "&urlPath=" +
        urlPath
      );
    },
    async getAllDocs() {
      var array = Object.values(this.$static.docs.edges);
      var nodes = [];
      array.forEach((element) => nodes.push(element.node));

      this.items = nodes;
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}

#docs-sidebar.dark-mode {
  background: linear-gradient(#384754, #1f2830) !important;
}
#docs-sidebar {
  border-right: 1px solid rgba(0, 50, 150, 0.1);
}

.admin-overview .card-title {
  font-size: 100% !important;
}
</style>
