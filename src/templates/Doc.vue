<template>
  <Layout v-if="doc != null" :title="doc.title">
    <docs-layout
      v-bind:class="{
        loading: uiSettings.loading == true,
        loaded: uiSettings.loading != true,
      }"
      :time="uiSettings.componentKey"
      :content="renderContent()"
      :title="doc.title"
      :link="uiSettings.editorLink"
    >
      <template v-slot:content v-if="doc.content != null"> </template>
      <template v-slot:sidebar v-if="doc.headings.length > 1">
        <div>On This Page</div>
        <span
          class="mt-3 mb-2"
          style="
            width: 100px;
            background: #007bff;
            opacity: 0.25;
            height: 4px;
            border-radius: 4px;
            display: inline-block;
          "
        ></span>
        <div
          v-for="(heading, index) in doc.headings"
          :key="index"
          :time="uiSettings.componentKey"
          style="letter-spacing: 1px"
        >
          <a
            :href="heading.anchor"
            v-if="index != 0"
            class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
          >
            {{ heading.value }}
          </a>
        </div>
      </template>
    </docs-layout>
  </Layout>
</template>

<page-query>
query doc ($id: ID) {
  doc(id: $id) {  
        id
        path        
        content
        title  
        headings {
          anchor
          value
        }    
        fileInfo{
          name
          directory
        }  
  }  
}
</page-query>

<script>
import DocsLayout from "../components/DocsLayout.vue";
import axios from "axios";

var remark = require("remark");
var recommended = require("remark-preset-lint-recommended");
var html = require("remark-html");
var autolinkHeadings = require("remark-autolink-headings");

export default {
  components: {
    DocsLayout,
  },
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [{ name: "description", content: this.$page.doc.excerpt }],
    };
  },
  data() {
    return {
      uiSettings: {
        loading: true,
        componentKey: 0,
        editorLink: "/admin/docs",
      },
      apiSchema: {},
      slug: null,
      window: null,
      schema: {},
      doc: null,
      latestDoc: null,
      tools: {
        remark: remark,
        linter: recommended,
        remarkHtml: html,
        autolinkHeadings: autolinkHeadings,
      },
    };
  },
  async mounted() {
    console.log("--------------");
    this.doc = this.$page.doc;
    this.window = window;
    this.uiSettings.loading = true;
    this.latestDoc = null;
    await this.getLatestVersion();
  },
  watch: {
    async $route(to, from) {
      console.log("to: ");
      console.log(to);
      console.log("from: " + from);
      if (to.path.includes(from.path) == false) {
        this.uiSettings.loading = true;
        this.latestDoc = null;
        var self = this;

        try {
          await self.getLatestVersion();
          await self.renderContent();
        } catch (err) {
          console.log(err);
        }
        this.doc.headings = this.$page.doc.headings;
        this.forceRerender();
      }
    },
  },
  methods: {
    forceRerender() {
      this.uiSettings.componentKey += 1;
    },
    renderContent() {
      if (this.uiSettings.loading == true) {
        return "";
      } else {
        if (this.$page.latestDoc?.html != null) {
          return this.$page.latestDoc.html;
        } else {
          return this.doc.content;
        }
      }
    },
    async getSchema() {
      return await this.$store.getters.getUISchema;
    },
    async getLatestVersion() {
      var self = this;
      var col = this.$page.doc.path.split("/")[2];
      var collection = await this.$store.methods.getDocsCollection(col);
      var file = this.$page.doc.fileInfo.name + ".md";
      var githubRepo = collection.repo;
      var docsDir = collection.path;

      this.uiSettings.editorLink =
        "/admin/docs/editor?repo=" +
        encodeURIComponent(githubRepo) +
        "&remotePath=" +
        encodeURIComponent(collection.path + "/" + file) +
        "&fileName=" +
        encodeURIComponent(this.$page.doc.fileInfo.name) +
        "&directory" +
        "&urlPath=" +
        encodeURIComponent(this.$page.doc.path);

      console.log("PATH: " + this.$page.doc.path);
      console.log("COLLECTION: " + col);
      console.log("REPO: " + collection.repo);
      console.log("FILE: " + docsDir + "/" + file);

      try {
        var token = this.$store?.getters?.getUser?.token;
        var fileName = docsDir + "/" + file;
        var repo = githubRepo;
        var url =
          "/api/platformkit-content-read-remote-v1?file=" +
          fileName +
          "&repo=" +
          repo;
          console.log("URL:" + url);
        var data = null;
        await axios
          .post(url, data, {
            // Config
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .catch(function (error) {
            console.log("Show error notification!");
            window.alert("Something went wrong. Try again.");
            self.uiSettings.loading = false;
            return Promise.reject(error);
          })
          .then(function (response) {
            // Handle success
            console.log("Updated File: \n");
            console.log(response);
            self.latestDoc = response.data;
            var html = remark()
              .use(self.tools.autolinkHeadings)
              .use(self.tools.linter)
              .use(self.tools.remarkHtml)
              .process(self.latestDoc.body, function (err, file) {
                // console.error(err);
                var result = String(file);
                self.latestDoc.html = result;
                if (result != "") {
                  self.doc.content = result;
                }
              });
            
            self.uiSettings.loading = false;
            console.log(html);
            //window.alert("Updated.");
          });
      } catch (error) {
        console.log(error);
      }
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
</style>
