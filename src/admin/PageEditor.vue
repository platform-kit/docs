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
        Page Editor
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12">
          <admin-editor-buttons
            v-bind:uiSettings="uiSettings"
          ></admin-editor-buttons>
        </div>
        <div class="col-md-6 mb-2">
          <b-card class="border-0 raised mb-3 mb-md-4">
            <div class="row">
              <div class="col-6">
                <div class="badge badge-pill bg-light-blue">Title</div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="title"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">Sub-Title</div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="subtitle"
                  class="br-25 my-2"
                ></b-input>
              </div>
              <div class="col-6 text-center">
                <div class="badge badge-pill bg-light-blue mb-2">Thumbnail</div>
                <b-aspect
                  aspect="16:9"
                  class="image-placeholder-large o-50 br-5"
                  style="height: 150px"
                >
                  <b-icon-image
                    class="m-auto"
                    scale="4"
                    style="position: relative; top: 60px; opacity: 0.3"
                  ></b-icon-image>
                </b-aspect>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="badge badge-pill bg-light-blue">URL Slug</div>
                <b-input-group class="">
                  <template #prepend>
                    <b-input-group-text
                      style="
                        max-height: 38px !important;
                        margin-top: 8px;
                        border-radius: 25px 0px 0px 25px;
                      "
                      class="bg-light-blue border-0"
                      ><strong class="m-0" style="font-size: 75%"
                        ><b-icon-link></b-icon-link></strong
                    ></b-input-group-text>
                  </template>
                  <b-input
                    autocomplete="off"
                    placeholder="post-title"
                    :disabled="isDisabled()"
                    name="slug"
                    class="my-2"
                    style="border-radius: 0px 25px 25px 0px"
                  ></b-input>
                </b-input-group>
                <div class="badge badge-pill bg-light-blue">
                  <b-icon-card-text class="mr-2"></b-icon-card-text>Description
                </div>
                <b-textarea
                  :disabled="isDisabled()"
                  name="description"
                  class="br-5 my-2"
                ></b-textarea>
              </div>
            </div>
          </b-card>
          <b-card title="Code" class="border-0 raised mb-3 mb-md-4">
            <b-tabs content-class="mt-3">
              <b-tab title="Styles">
                <prism-editor
                  class="code-editor my-2"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                  v-model="page.css"
                  :highlight="highlighter"
                  line-numbers
                  :readonly="isDisabled()"
                ></prism-editor>
              </b-tab>
              <b-tab title="Scripts">
                <prism-editor
                  class="code-editor my-2"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                  v-model="page.scripts"
                  :highlight="highlighter"
                  line-numbers
                  :readonly="isDisabled()"
                ></prism-editor>
              </b-tab>
              <b-tab title="Layout">
                <prism-editor
                  class="code-editor my-2"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                  v-model="page.layout"
                  :highlight="highlighter"
                  line-numbers
                  :readonly="isDisabled()"
                ></prism-editor>
              </b-tab>
            </b-tabs>
          </b-card>
          <b-card
            id="editorjs-container"
            class="border-0 raised d-none"
            title="Content"
          >
            <editor
              :config="{
                tools: {
                  textVariant: require('@editorjs/text-variant-tune'),
                  header: require('@editorjs/header'),
                  list: require('@editorjs/list'),
                  quote: require('@editorjs/quote'),
                  image: require('@editorjs/image'),
                  paragraph: require('@editorjs/paragraph'),
                  embed: require('@editorjs/embed'),
                  linkTool: {
                    class: require('@editorjs/link'),
                    config: {
                      endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
                    },
                  },
                  raw: require('@editorjs/raw'),
                },
                tunes: ['textVariant'],
              }"
            />
          </b-card>
        </div>
        <div class="col-md-6">
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
            title="Metadata"
          >
            <b-list-group class="mt-3" flush>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-tag class="mr-2"></b-icon-tag> Tags<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="page.tags"
                  :options="['Article', 'Audio', 'Video']"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag()"
                ></multiselect>
              </b-list-group-item>
            </b-list-group>
          </b-card>

          <b-card
            class="border-0 raised mb-2 mb-md-4"
            bg-variant="dark text-light"
            id="page-activity"
            title="Recent Activity"
          >
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
import Layout from "../layouts/Admin.vue";
import DocsLayout from "../components/DocsLayout.vue";
import Trend from "vuetrend";
import Avatar from "vue-avatar";
import AdminEditorButtons from "../admin/AdminEditorButtons.vue";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles
import Multiselect from "vue-multiselect";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
    Avatar,
    AdminEditorButtons,
    PrismEditor,
    Multiselect,
  },
  metaInfo: {
    title: "Admin",
  },
  data() {
    return {
      uiSettings: {
        view: "view",
        buttons: ["view", "edit", "save"],
      },
      page: {
        jsonString: null,
        css: ".btn { border: none !important; }",
        scripts: null,
        layout: null,
        json: {
          headline: "This is a headline",
        },
      },
    };
  },
  async mounted() {
    this.getJsonString();
  },
  methods: {
    isDisabled() {
      if (this.uiSettings.view == "edit") {
        return false;
      } else {
        return true;
      }
    },
    getJsonString() {
      this.page.jsonString = JSON.stringify(this.page.json, null, 5);
    },
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
  computed: {},
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

#page-activity .badge {
  min-width: 100px;
}
/* required class */
.code-editor {
  border-radius: 5px;
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #e8eefd;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

#vue-editor-js {
  border-radius: 3px;
  background: none; /* #e8eefd; */
  padding: 15px;
  border: 1px solid rgba(0, 50, 150, 0.125);
}
</style>
