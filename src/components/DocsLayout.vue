<template>
  <div class="docs-page "  >
    <g-link :to="link" id="edit-doc-button" v-if="link != null && isAdmin()" class="br-5 raised border border-light-blue">
      <b-icon-pen scale="1.5" class="mx-auto d-block" style="margin-top:16px;"></b-icon-pen>
    </g-link>
    <div
     v-if="hideNav != true" 
      class="btn btn-dark d-inline d-md-none raised"
      v-b-modal.docs-modal
      style="
        height:50px;
        width:50px;
        cursor:pointer;
        z-index: 99;
        position: fixed !important;
        bottom: 15px !important;
        right: 15px;
        float: left;
        background:#111;
      "
    >
      <b-icon-book class="mx-auto" style="margin-top:8px !important;"></b-icon-book> <span class="ml-2 d-none">{{ title }}</span>
    </div>
    <div class="container-fluid" style=""  v-bind:class="{'h-md-100': flush != true, 'm-0 p-0 w-100 bg-white px-3': flush == true}" >
      <div class="row w-100 mx-auto" style="max-width: 1350px;"  v-bind:class="{'h-md-100': flush != true}">
        <div
          v-if="hideNav != true"
          class="col-lg-2 h-md-100 d-none d-md-inline-block"
          style="overflow: scroll"
        >
          <div class="px-3 pb-2 pt-4 mt-5 pt-5">
            <docsNav></docsNav>
          </div>
        </div>
        <div class="docs-content pt-5 px-2 px-md-5 pb-4" v-bind:class="{'mt-5 col-lg-8 pb-5 mb-2': flush != true, 'col-12 m-0 p-0 w-100': flush == true}">
          <div v-if="content != null" v-html="html"></div>
          <slot v-else name="content" ></slot>
        </div>
        <div
          v-if="hideSidebar != true"          
          class="col-lg-2 docs-sidebar h-md-100 pt-5 mt-5 d-none d-md-inline-block border-left"                    
        >
          <slot name="sidebar" ></slot>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DocsNav from "~/components/DocsNav.vue";

var remark = require("remark");
var recommended = require("remark-preset-lint-recommended");
var html = require("remark-html");
var autolinkHeadings = require("remark-autolink-headings");

export default {
  name: "DocsLayout",
  props: [
    "content",
    "sidebar",
    "title",
    "link",
    "hideNav",
    "hideSidebar",
    "flush",
    "parseMarkdown",
  ],
  components: {
    DocsNav,
  },
  data() {
    return {
      html: null,
      uiSettings: {},
      apiSchema: {},
      tools: {
        remark: remark,
        linter: recommended,
        remarkHtml: html,
        autolinkHeadings: autolinkHeadings,
      },
      window: null
    };
  },
  async mounted() {
    this.window = window;
    this.getApiSchema();
    await this.renderMarkdown();
  },
  watch: {
    async content(value) {
      await this.renderMarkdown();
    },
  },
  methods: {
    async renderMarkdown() {
      if (this.parseMarkdown != true) {
        this.html = this.content;
      } else {
        var content = this.content;
        var self = this;
        var html = await remark()
          .use(self.tools.autolinkHeadings)
          .use(self.tools.linter)
          .use(self.tools.remarkHtml)
          .process(content)
          .then(
            (file) => (self.html = String(file)),
            (error) => {
              // Handle your error here!
              throw error;
            }
          );        
      }
    },
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
#docs-nav .badge-light-blue {
  background: rgba(0, 50, 100, 0.05);
}

@media (max-width: 720px) {
  .docs-page ul {
    margin-left: 0px;
    padding-left: 10px;
  }
}

@media (min-width: 768px) {
  .docs-content {
    background: #fff;
  }
}
.docs-page ul p {
  margin-bottom: 0px !important;
}

.docs-page h1:first-of-type {
  margin-bottom: 20px;
}
.docs-page h1 {
  font-size: 2rem;
  text-align: center;
}
.docs-page h2,
.docs-page h3,
.docs-page h4,
.docs-page h5,
.docs-page h6 {
  opacity: 0.95;
  color: #000;
  margin: 25px 0px;
}

.language-diff {
  color: green;
  background-color: #edfff5;
  padding: 3px;
  border-radius: 3px;
}
</style>
