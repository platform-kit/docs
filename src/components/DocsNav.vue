<template>
  <div id="docs-nav">
    <g-link :to="'/docs'"
      ><span class="badge text-dark px-3 py-2 badge-light-blue"
        >Docs</span
      ></g-link
    >
    <g-link
      :to="doc.node.path"
      active-class="active"
      v-for="(doc, index) in docs"
      :key="index"
      class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
    >
      <span class="nav-indicator o-50"
        ><b-icon-caret-right-fill
          style="margin-top: 2px"
        ></b-icon-caret-right-fill
      ></span>
      {{ doc.node.title }}
    </g-link>
    <div v-if="apiSchema != null">
      <span class="badge text-dark px-3 py-2 mt-4 badge-light-blue"
        >API Resources</span
      >
       <g-link
          :to="'/graphql'"    
          
          class="btn btn-block text-left px-2 py-1 my-2 text-capitalize"
        >GraphQL Explorer</g-link>
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
    </div>
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
  props: [],
  data() {
    return {
      uiSettings: {},
      apiSchema: null,
      docs: null,
      graphQL: null
    };
  },
  async mounted() {
    this.docs = this.$static.docs.edges;
    this.getApiSchema();
    this.sortDocs();
    this.checkForGraphQL();
  },
  methods: {
    async checkForGraphQL(){
      try {
      const results = await axios.get("http://localhost:3000/graphql");
      console.log(results)
      this.graphQL = true
      }
      catch(err){
        console.log(err)
        this.graphQL = false
      }
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
#docs-nav .btn:hover {
  background-color: #f0f6ff !important;
}
#docs-nav .btn.active {
  color: #007bff;
}
#docs-nav .badge-light-blue {
  background: rgba(0, 50, 100, 0.05);
}

#docs-nav .nav-indicator {
  display: none;
}
#docs-nav .active .nav-indicator {
  display: inline;
  float: left;
  margin-left: -35px;
  margin-right: 15px;
}
</style>
