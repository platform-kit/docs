<template>
  <Layout>
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
              <div v-if="doc != null">
                <vue-simplemde
                  v-if="doc.data != null && typeof doc.data.body == 'string'"
                  v-model="doc.data.body"
                  class="mt-3"
                  ref="markdownEditor"
                />
              </div>
            </div>
          </b-card>
        </div>
        <div class="col-md-6 d-none">
          <b-card
            style="color: #fff"
            class="border-0 raised mb-2 mb-md-4"
            title="Engagement"
            bg-variant="dark"
          >
            <trend
              :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              gradientDirection="top"
              :gradient="['#ffe74c', '#ffbe88', '#ff93df']"
              :padding="1"
              :radius="12"
              :stroke-width="1.7"
              stroke-linecap="round"
              auto-draw
              smooth
            >
            </trend>
          </b-card>

          <b-card
            class="border-0 raised mb-2 mb-md-4"
            bg-variant="dark text-light"
            id="page-activity"
            title="Recent Activity"
          >
            <div class="badge badge-pill border text-light"></div>
            <b-list-group class="mt-3" flush>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <span class="badge badge-secondary mr-2">Today</span>
                Updated by
                <avatar
                  style="margin-left: 5px; display: inline-block"
                  :username="'john@example.com'"
                  :size="25"
                ></avatar>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <span class="badge badge-secondary mr-2">2 days ago</span>
                Visited by
                <avatar
                  style="margin-left: 5px; display: inline-block"
                  :username="'sam@example.com'"
                  :size="25"
                ></avatar>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <span class="badge badge-secondary mr-2">2 days ago</span>
                Visited by
                <avatar
                  style="margin-left: 5px; display: inline-block"
                  :username="'daniel@example.com'"
                  :size="25"
                ></avatar>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <span class="badge badge-secondary mr-2">3 days ago</span>
                Visited by
                <avatar
                  style="margin-left: 5px; display: inline-block"
                  :username="'john@example.com'"
                  :size="25"
                ></avatar>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <span class="badge badge-secondary mr-2">4 days ago</span>
                Created by
                <avatar
                  style="margin-left: 5px; display: inline-block"
                  :username="'userdata@example.com'"
                  :size="25"
                ></avatar>
              </b-list-group-item>
            </b-list-group>
          </b-card>
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
import Avatar from "vue-avatar";
import VueSimplemde from "vue-simplemde";
import Multiselect from "vue-multiselect";
import AdminEditorButtons from "./AdminEditorButtons.vue";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
    Avatar,
    VueSimplemde,
    Multiselect,
    AdminEditorButtons,
  },
  metaInfo: {
    title: "Admin",
  },
  data() {
    return {
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
    this.doc = {data: {body: "Loading..."}};
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
    if(this.uiSettings.action == 'create'){
      this.doc.data = {
        body: "",
        docRemotePath: this.docRemotePath,
        docRepo: this.docRepo
      }
      this.uiSettings.view = 'edit';
    }
  },
  methods: {
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
</style>
