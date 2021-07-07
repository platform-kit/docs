<template>
  <Layout>
    <div class="admin-page admin-overview">
      <div
        class="
          ml-0 ml-md-3
          mt-0 mt-lg-2
          mb-4 mb-lg-0
          text-center text-md-left          
        "
        style="font-weight: 400; font-size: 110%; color: rgba(0, 0, 100, 0.65)"
      >
        Doc Editor
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12">
          <admin-editor-buttons
            v-bind:uiSettings="uiSettings"
            @saved="saveFile"
          ></admin-editor-buttons>
        </div>
        <div class="col-md-6 mb-2">
          <b-card class="border-0 raised mb-3 mb-md-4">
            <div class="row">
              <div class="col-12">
                <div class="badge badge-pill bg-light-blue">Repository</div>
                <b-input
                  autocomplete="off"
                  disabled
                  :placeholder="docRepo"
                  name="source"
                  class="br-25 my-2 border-0"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">File Path</div>
                <b-input
                  autocomplete="off"
                  disabled
                  :placeholder="docRemotePath"
                  name="source"
                  class="br-25 my-2 border-0"
                ></b-input>
              </div>
            </div>

            <div class="badge badge-pill bg-light-blue">Content</div>
            <div
              class="br-5"
              v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
            >
              <div
                v-if="
                  doc != null &&
                  doc.data != null &&
                  doc.data.body != null &&
                  typeof doc.data.body == 'string' &&
                  this.window != null
                "
              >
                <b-form-textarea
                  style="min-height:calc(100vh - 470px);"
                  v-if="doc.data.body != null"
                  v-model="doc.data.body"
                  class="border border-light-blue p-3 mt-3"
                  ref="markdownEditor"
                />
              </div>
            </div>
          </b-card>
        </div>
        <div class="col-md-6 pb-4">
          <docs-layout
            class="br-5 m-0 p-0 raised"
            style="overflow: hidden !important"
            :parseMarkdown="true"
            :content="renderContent()"
            :hideNav="true"
            :hideSidebar="true"
            :flush="true"
            :iteration="iteration"
          >
            <template v-slot:content v-if="doc.data.body != null"> </template>
          </docs-layout>
        </div>
      </div>
    </div>
  </Layout>
</template>


<script>
import axios from "axios";
import Layout from "../layouts/Admin.vue";
import DocsLayout from "../components/DocsLayout.vue";
import Trend from "vuetrend";
import Multiselect from "vue-multiselect";
import AdminEditorButtons from "./AdminEditorButtons.vue";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,    
    Multiselect,
    AdminEditorButtons,
  },
  metaInfo: {
    title: "Admin",
  },
  data() {
    return {      
      iteration: 0,
      uiSchema: null,
      uiSettings: {
        action: null,
        view: "view",
        buttons: ["view", "edit", "save"],
        viewButtonUrl: null,
      },
      window: null,
      doc: { data: { body: null } },
      docFile: null,
      docPath: null,
      docUrlPath: null,
      docRemotePath: null,
      docRepo: null,
    };
  },

  async mounted() {
    this.window = window;
    // this.doc = { data: { body: "Loading..." } };
    this.uiSettings.action = decodeURIComponent(this.getUrlVars()["action"]);
    this.docFile = decodeURIComponent(this.getUrlVars()["fileName"]);
    this.docPath = decodeURIComponent(this.getUrlVars()["path"]);
    this.docUrlPath = decodeURIComponent(this.getUrlVars()["urlPath"]);
    this.docRepo = decodeURIComponent(this.getUrlVars()["repo"]);
    this.docRemotePath = decodeURIComponent(this.getUrlVars()["remotePath"]);
    this.uiSettings.viewButtonUrl = this.docUrlPath;
    this.getUiSchema();
    //this.getFile();
    this.updateFile();

    if (this.uiSettings.action == "create") {
      this.doc.data = {
        body: "",
        docRemotePath: this.docRemotePath,
        docRepo: this.docRepo,
      };
      this.uiSettings.view = "edit";
    }
  },
  watch: {
    doc: {
      handler(newDoc) {
        this.iterate();
        console.log("UPDATED ------- \n");
        console.log(this.iteration);
      },
      deep: true,
    },
  },
  methods: {
    renderContent() {
      return this.doc.data.body;
    },
    iterate() {
      this.iteration++;
    },
    getDoc() {},
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.tagOptions.push(tag);
      this.contentItem.tags.push(tag);
    },
    getUrlVars() {
      var vars = {};
      var parts = this.window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    async getFile() {
      this.updateFile();
      /*      
      try {
        var url = "/api/platformkit-content-read-v1?file=" + this.docPath;
        const results = await axios.get(url);
        this.doc = results.data;
        console.log("Doc:");
        console.log(results);
      } catch (error) {
        console.log(error);
      }
      */
    },
    async updateFile() {
      var self = this;
      try {
        var token = this.$store?.getters?.getUser?.token;
        var fileName = this.docRemotePath;
        var repo = this.docRepo;
        var url =
          "/api/platformkit-content-read-remote-v1?file=" +
          fileName +
          "&repo=" +
          repo;
        var data = null;
        axios
          .post(url, data, {
            // Config
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .catch(function (error) {
            //console.log("Show error notification!");
            //return Promise.reject(error);
            //window.alert("Something went wrong. Try again.");
          })
          .then(function (response) {
            // Handle success
            console.log("Updated File: \n");
            console.log(response);
            self.doc = { data: response.data };
            //window.alert("Updated.");
          });
      } catch (error) {
        console.log(error);
      }
    },
    async saveFile() {
      var self = this;
      try {
        var token = this.$store?.getters?.getUser?.token;
        var fileName = this.docRemotePath;
        var repo = "https://github.com/platform-kit/platformkit-ui";
        var url =
          "/api/platformkit-content-write-v1?file=" +
          fileName +
          "&repo=" +
          repo;
        var data = this.doc.data.body;
        axios
          .post(url, data, {
            // Config
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .catch(function (error) {
            //console.log("Show error notification!");
            //return Promise.reject(error);
            window.alert("Something went wrong. Try again.");
          })
          .then(function (response) {
            // Handle success
            console.log(response);
            window.alert("Saved.");
            self.uiSettings.view = "view";
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getUiSchema() {
      try {
        const results = await axios.get("/temp/ui-schema.json");
        this.uiSchema = results.data;
        console.log("UI Schema:");
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
};
</script>

<style>
.ProseMirror {
  padding: 15px;
}
</style>
