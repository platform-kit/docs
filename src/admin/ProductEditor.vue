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
        Product Editor
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
                <div class="badge badge-pill bg-light-blue">Name</div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="name"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">Label</div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="label"
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
                    :disabled="isDisabled()"
                    autocomplete="off"
                    placeholder="post-title"
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
              </div></div
          ></b-card>

          <b-card
            class="border-0 raised mb-3 mb-md-4"
            title="Payment Processing"
          >
            <div class="row">
              <div class="col-12">
                <div class="badge badge-pill bg-light-blue">
                  Checkout URL <span class="o-50">(optional)</span>
                </div>
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
                    :disabled="isDisabled()"
                    autocomplete="off"
                    placeholder="https://..."
                    name="slug"
                    class="my-2"
                    style="border-radius: 0px 25px 25px 0px"
                  ></b-input>
                </b-input-group>
                <div class="badge badge-pill bg-light-blue">
                  <b-icon-credit-card class="mr-2"></b-icon-credit-card>Stripe
                  ID <span class="o-50">(optional)</span>
                </div>
                <b-input
                  :disabled="isDisabled()"
                  class="mt-2 br-25 mb-2"
                  placeholder=""
                ></b-input>
                <div class="badge badge-pill bg-light-blue">Type</div>
                <b-select
                  v-model="product.type.selected"
                  :options="product.type.options"
                  :disabled="isDisabled()"
                  class="mt-2"
                >
                </b-select>
              </div>
            </div>
          </b-card>

          <b-card class="border-0 raised mb-3 mb-md-4" title="Content">
            <div class="row mb-2">
              <div class="col-6">
                <div class="badge badge-pill bg-light-blue">Media URL</div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="title"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">
                  Media Preview URL
                </div>
                <b-input
                  :disabled="isDisabled()"
                  autocomplete="off"
                  name="subtitle"
                  class="br-25 my-2"
                ></b-input>
              </div>
              <div class="col-6 text-center">
                <div class="badge badge-pill bg-light-blue mb-2">
                  Audio / Video
                </div>
                <b-aspect
                  aspect="16:9"
                  class="image-placeholder-large o-50 br-5"
                  style="height: 150px"
                >
                  <b-icon-play
                    class="m-auto"
                    scale="4"
                    style="position: relative; top: 60px; opacity: 0.3"
                  ></b-icon-play>
                </b-aspect>
              </div>
            </div>

            <b-tabs content-class="mt-3">
              <b-tab title="Preview Content" active>
                <small class="mb-3 d-block"
                  >This will be visible to search engines &amp; users who are
                  not logged in.</small
                >
                <div
                  class="br-5"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                >
                  <vue-simplemde
                    v-model="content"
                    class="mt-3"
                    ref="markdownEditor"
                  /></div
              ></b-tab>
              <b-tab title="Free Content">
                <small class="mb-3 d-block"
                  >This content will be visible to users who are logged
                  in.</small
                >
                <div
                  class="br-5"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                >
                  <vue-simplemde
                    v-model="content"
                    class="mt-3"
                    ref="markdownEditor"
                  />
                </div>
              </b-tab>
              <b-tab title="Premium Content">
                <small class="mb-3 d-block"
                  >This content will be visible to users who have purchased this
                  item.</small
                >
                <div
                  class="br-5"
                  v-bind:class="{ disabledCE: uiSettings.view == 'view' }"
                >
                  <vue-simplemde
                    v-model="content"
                    class="mt-3"
                    ref="markdownEditor"
                  /></div
              ></b-tab>
            </b-tabs>
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
                  v-model="contentItem.tags"
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
import Avatar from "../components/Avatar.vue";
import VueSimplemde from "vue-simplemde";
import Multiselect from "vue-multiselect";
import AdminEditorButtons from "../admin/AdminEditorButtons.vue";

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
      contentItem: {
        subscriptionPlansRequired: null,
        tags: null,
      },
      uiSettings: {
        view: "view",
        buttons: ["edit", "save"],
      },
      product: {
        type: {
          selected: null,
          options: [
            { value: null, text: "Please select an option", disabled:true },
            { value: "good", text: "Physical / Digital Goods" },
            { value: "service", text: "Service" },
          ],
        },
      },
      items: [
        { age: 40, name: "Dickerson", email: "Macdonald@example.com" },
        { age: 21, name: "Larsen", email: "Shaw@example.com" },
        { age: 89, name: "Geneva", email: "Wilson@example.com" },
        { age: 38, name: "Jami", email: "Carney@example.com" },
      ],
    };
  },
  async mounted() {},
  methods: {
    isDisabled() {
      if (this.uiSettings.view == "edit") {
        return false;
      } else {
        return true;
      }
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.tagOptions.push(tag);
      this.contentItem.tags.push(tag);
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
@import "~simplemde/dist/simplemde.min.css";

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

.multiselect__option--highlight {
  background: linear-gradient(90deg, #e4f0fc, #f1f8ff);
  outline: none;
  color: #000;
}

.multiselect__option .multiselect__option--highlight {
  background: #d1e4ff;
  outline: none;
  color: #000;
}
</style>
