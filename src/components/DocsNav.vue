<template>
  <div
    class="docs-nav "
    v-if="directories != null && apiSchema != null && docs != null"
  >
    <div v-if="directories != null" class="d-none d-lg-inline-block">
      <div v-for="(directory, index) in directories" :key="index" class="mb-4">
        <div>
          <g-link :to="'/docs'"
            ><span class="badge text-dark px-3 py-2 badge-light-blue">{{
              getCollectionName(directory)
            }}</span></g-link
          >
          <div v-for="(doc, index) in docs" :key="index">
            <g-link
              :altTo="doc.node.fileInfo.directory + '/' + doc.node.fileInfo.name"
              :to="doc.node.path"
              active-class="active"
              v-if="directory == doc.node.fileInfo.directory"
              class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
            >
              <span class="nav-indicator "
                ><b-icon-caret-right
                  style="margin-top: 2px;color:#007bff;opacity:0.4;"
                ></b-icon-caret-right
              ></span>
              {{ doc.node.title }}
            </g-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="apiSchema != null && apiSchema.schemas != null && 1 == 2">
      <span class="badge text-dark px-3 py-2 badge-light-blue"
        >API Resources</span
      >

      <div v-for="(resource, index) in apiSchema.schemas" :key="index">
        <g-link
          :to="'/docs/api/' + index"
          active-class="active"
          class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
        >
          <span class="nav-indicator o-50"
            ><b-icon-caret-right-fill
              style="margin-top: 2px"
            ></b-icon-caret-right-fill
          ></span>
          {{ humanizeResourceName(index) }}
        </g-link>
      </div>
      <span
        v-if="graphQL && false"
        class="badge text-dark px-3 py-2 mt-4 badge-light-blue"
        >Tools</span
      >
      <a
        :href="'/graphql'"
        v-if="graphQL && false"
        target="_blank"
        class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
        >GraphQL Explorer</a
      >
     
    </div>

     <a class="btn btn-sm text-center text-dark mb-2 w-100 raised border border-light-blue br-25 mb-4 d-none d-lg-inline-block" style="font-size:70%;" href="https://www.platformkit.com"
      target="_blank">⚡ <small><span class="mx-1 text-dark o-70">BUILT WITH</span></small>PlatformKit</a>

    <b-modal id="docs-modal" ref="docs-modal" hide-footer title="Navigation">
      <div class="docs-nav mx-4" @click="hideModal()">
        <div v-if="directories != null">
          <div
            v-for="(directory, index) in directories"
            :key="index"
            class="mb-4"
          >
            <div>
              <g-link :to="'/docs'"
                ><span class="badge text-dark px-3 py-2 badge-light-blue">{{
                  getCollectionName(directory)
                }}</span></g-link
              >
              <div v-for="(doc, index) in docs" :key="index">
                <g-link
                  :to="doc.node.path"
                  active-class="active"
                  v-if="directory == doc.node.fileInfo.directory"
                  class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
                >
                  <span class="nav-indicator o-50"
                    ><b-icon-caret-right-fill
                      style="margin-top: 2px"
                    ></b-icon-caret-right-fill
                  ></span>
                  {{ doc.node.title }}
                </g-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="apiSchema != null && 1 == 2">
          <span class="badge text-dark px-3 py-2 badge-light-blue"
            >API Resources</span
          >

          <div v-for="(resource, index) in apiSchema.schemas" :key="index">
            <g-link
              :to="'/docs/api/' + index"
              active-class="active"
              class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
            >
              <span class="nav-indicator o-50"
                ><b-icon-caret-right-fill
                  style="margin-top: 2px"
                ></b-icon-caret-right-fill
              ></span>
              {{ humanizeResourceName(index) }}
            </g-link>
          </div>
          <span
            v-if="graphQL"
            class="badge text-dark px-3 py-2 mt-4 badge-light-blue"
            >Tools</span
          >
          <a
            :href="'/graphql'"
            v-if="graphQL"
            target="_blank"
            class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
            >GraphQL Explorer</a
          >
        </div>
      </div>
    </b-modal>


    <b-sidebar id="docs-sidebar-mobile" ref="docs-sidebar-mobile" bg-variant="light-blue-gradient" no-header backdrop shadow width="clamp(300px, calc(100% - 80px), 375px)">
      <div class="docs-nav mx-4 mt-4" @click="hideModal()">
        <g-link :to="'/admin'" class="btn btn-sm btn-block mb-4 raised text-center" style="background:#000 !important;color:#fff !important;" v-if="isAdmin()">
          <b-icon-grid class="mr-2"></b-icon-grid class="mr-2 o-50"> Admin
        </g-link>
        <div v-if="directories != null">
          <div
            v-for="(directory, index) in directories"
            :key="index"
            class="mb-4"
          >
            <div>
              <g-link :to="'/docs'"
                ><span class="badge text-dark px-3 py-2 badge-light-blue">{{
                  getCollectionName(directory)
                }}</span></g-link
              >
              <div v-for="(doc, index) in docs" :key="index">
                <g-link
                  :to="doc.node.path"
                  active-class="active"
                  v-if="directory == doc.node.fileInfo.directory"
                  class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
                >
                  <span class="nav-indicator o-50"
                    ><b-icon-caret-right-fill
                      style="margin-top: 2px"
                    ></b-icon-caret-right-fill
                  ></span>
                  {{ doc.node.title }}
                </g-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="apiSchema != null && 1 == 2">
          <span class="badge text-dark px-3 py-2 badge-light-blue"
            >API Resources</span
          >

          <div v-for="(resource, index) in apiSchema.schemas" :key="index">
            <g-link
              :to="'/docs/api/' + index"
              active-class="active"
              class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
            >
              <span class="nav-indicator o-50"
                ><b-icon-caret-right-fill
                  style="margin-top: 2px"
                ></b-icon-caret-right-fill
              ></span>
              {{ humanizeResourceName(index) }}
            </g-link>
          </div>
          <span
            v-if="graphQL"
            class="badge text-dark px-3 py-2 mt-4 badge-light-blue"
            >Tools</span
          >
          <a
            :href="'/graphql'"
            v-if="graphQL"
            target="_blank"
            class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
            >GraphQL Explorer</a
          >
        </div>
        <a class="btn btn-sm text-center text-dark mb-2 w-100 raised border-0 bg-light br-25 mb-4" style="font-size:70%;position:absolute;bottom:-5px;left:10px;max-width:calc(100% - 20px);display:block;" href="https://www.platformkit.com"
      target="_blank">⚡ <small><span class="mx-1 text-dark o-70">BUILT WITH</span></small>PlatformKit</a>
      </div>
      
    </b-sidebar>
  </div>
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
          directory
        }
      }
    }
  }
}
</static-query>

<script>
import axios from "axios";

export default {
  name: "DocsNav",
  
  data() {
    return {
      uiSettings: {  
      },
      apiSchema: null,
      uiSchema: null,
      docs: null,
      graphQL: null,
      directories: null,
      window: null
    };
  },
  async mounted() {
    this.window = window;
    this.docs = this.$static.docs.edges;
    this.getApiSchema();
    this.getUiSchema();
    this.sortDocs();
    this.getDirectories();
    // this.checkForGraphQL();
  },
  methods: {
    isAdmin() {
      var user = null;
      if(this.window != null){
        user = this.$store.getters.getUser;
      }
      if (user != null && user.data?.roles?.includes("admin")) {
        return true;
      } else {
        return false;
      }
    },
    getCollectionName(directory) {
      if (
        this.uiSchema != null &&
        this.uiSchema.docs != null &&
        this.uiSchema.docs.collections != null
      ) {
        var collections = Object.values(this.uiSchema.docs.collections);
        var name = directory;
        function getName(collection) {
          if (collection.name == directory && collection.label != null) {
            name = collection.label;
          }
        }
        collections.forEach((element) => getName(element));
        return name;
      }
    },
    getDirectories() {
      if (this.docs != null) {
        var directories = [];
        function extractDirectories(element) {
          if (directories.indexOf(element.node.fileInfo.directory) === -1) {
            directories.push(element.node.fileInfo.directory);
          }
        }
        this.docs.forEach((element) => extractDirectories(element));
        if (directories.length == []) {
          directories = ["Docs"];
        }
        console.log("Directories: \n");
        console.log(directories);
        this.directories = directories;
      }
    },
    async checkForGraphQL() {
      let res = await axios.get("/graphql");
      console.log(res.status);
      if (res.status == 200) {
        this.graphQL = true;
      } else {
        this.graphQL = false;
      }
    },
    hideModal() {
      console.log("test");
      this.$refs["docs-modal"].hide();
    },
    sortDocs() {
      var docs = this.docs;
      docs = docs.sort(function compareFn(firstEl, secondEl) {
        if (firstEl.node.fileInfo.name[0] < secondEl.node.fileInfo.name[0]) {
          return -1;
        } else if (
          firstEl.node.fileInfo.name[0] > secondEl.node.fileInfo.name[0]
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      this.docs = docs;
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

    humanizeResourceName(input) {
      return input.replace(/_/g, " ");
    },
    showDocsNavModal(id) {
      this.$bvModal.show("modal-docsNav");
    },
  },
};
</script>

<style>

.docs-nav .btn:focus,
.docs-nav .btn.active {
  background-color: #f0f6ff !important;
}
.docs-nav .btn:hover {
  background-color: rgb(255, 255, 255) !important;
  
  box-shadow:3px 10px 16px rgb(0 0 100 / 10%) !important;
}

.docs-nav .btn.active {
  color: #007bff;  
}


  .docs-nav .btn.active {
  background:rgba(255, 255, 255, 0.75) !important;  
  box-shadow:3px 10px 16px rgb(0 0 100 / 10%) !important;
}


.docs-nav .badge-light-blue {
  background: rgba(0, 50, 100, 0.05);
}

.docs-nav .nav-indicator {
  display: none;
}
.docs-nav .active .nav-indicator {
  display: inline;
  float: left;
  margin-left: -35px;
  margin-right: 15px;
}
</style>
