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
        User Editor
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
                  :disabled="true"
                  placeholder="Tony Stark"
                  name="name"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">Username</div>
                <b-input
                  :disabled="true"
                  name="username"
                  placeholder="ironman"
                  class="br-25 my-2"
                ></b-input>
              </div>
              <div class="col-6 text-center">
                <div class="badge badge-pill bg-light-blue">Avatar</div>
                <avatar
                  class="mt-3 mx-auto"
                  style="margin-left: 15px"
                  :username="'UserTest@example.com'"
                  :size="100"
                ></avatar>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="badge badge-pill bg-light-blue">Email</div>
                <b-input
                  :disabled="true"
                  placeholder="tony.stark@example.com"
                  name="email"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">Website</div>
                <b-input
                  :disabled="true"
                  name="website"
                  placeholder="https://www.example.com"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">
                  <b-icon-card-text class="mr-2"></b-icon-card-text>Bio
                </div>
                <b-textarea
                  :disabled="true"
                  name="name"
                  placeholder="Billionaire. Playboy. Philanthropist."
                  class="br-5 my-2"
                ></b-textarea>
              </div>
              <div class="col-12 d-none">
                <div class="badge badge-pill bg-light-blue">Stripe ID</div>
                <b-input
                  :disabled="isDisabled()"
                  name="name"
                  class="br-25 my-2"
                ></b-input>
                <div class="badge badge-pill bg-light-blue">
                  <b-icon-credit-card-fill
                    class="mr-2"
                  ></b-icon-credit-card-fill
                  >Last 4 Digits of Credit Card
                </div>
                <b-input
                  :disabled="isDisabled()"
                  name="name"
                  class="br-25 my-2"
                ></b-input>
              </div>
            </div>
          </b-card>
          <b-card class="border-0 raised mb-3 mb-md-4" title="Stripe Accounts">
            <b-list-group class="mt-3">
              <b-list-group-item
                variant="light"
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  border-light-blue
                "
              >
                <div>
                  <span
                    class="mr-auto d-inline-block br-25 bg-light-blue raised"
                    style="width: 30px; height: 30px"
                    ><b-icon-person-badge
                      style="
                        margin-left: 7px;
                        margin-top: 7px;
                        color: rgba(0, 50, 150, 1) !important;
                      "
                    ></b-icon-person-badge
                  ></span>
                  <span class="ml-2">cus_49d39g305ljsdd</span>
                </div>
                <b-badge
                  variant="light"
                  class="list-group-item-details-badge"
                  pill
                  ><b-icon-arrow-right></b-icon-arrow-right
                ></b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card
            class="border-0 raised mb-3 mb-md-4"
            title="Active Subscriptions"
          >
            <b-list-group class="mt-3">
              <b-list-group-item
                variant="light"
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  border-light-blue
                "
              >
                <span class="badge badge-pill bg-light-blue d-inline-block mr-2"
                  >Monthly</span
                >
                <span class="mr-auto d-inline-block">Basic - $14.99</span>
                <b-badge
                  variant="light"
                  class="list-group-item-details-badge"
                  pill
                  ><b-icon-arrow-right></b-icon-arrow-right
                ></b-badge>
              </b-list-group-item>
              <b-list-group-item
                variant="light"
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  border-light-blue
                "
              >
                <span
                  class="
                    badge badge-pill
                    bg-light-blue
                    text-light
                    d-inline-block
                    mr-2
                  "
                  >Monthly</span
                >
                <span class="mr-auto d-inline-block">Basic - $14.99</span>
                <b-badge
                  variant="light"
                  class="list-group-item-details-badge"
                  pill
                  ><b-icon-arrow-right></b-icon-arrow-right
                ></b-badge>
              </b-list-group-item>
            </b-list-group>
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
            <p class="card-text o-50">
              For internal use only. The user can not see these fields.
            </p>
            <b-list-group class="mt-3" flush>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-check-circle class="mr-2"></b-icon-check-circle> Status<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="user.status"
                  :options="['Enabled', 'Disabled']"
                  :multiple="false"
                  :taggable="false"
                  @tag="addTag()"
                ></multiselect>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-tag class="mr-2"></b-icon-tag> Tags<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="user.tags"
                  :options="[]"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag()"
                ></multiselect>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-bookmark-star class="mr-2"></b-icon-bookmark-star>
                Interests<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="user.topics"
                  :options="[
                    'Content Subscriptions',
                    'Content Marketing',
                    'Software Development',
                  ]"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag()"
                ></multiselect>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-lock class="mr-2"></b-icon-lock> Roles<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="user.roles"
                  :options="['Admin', 'Editor', 'Developer']"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag()"
                ></multiselect>
              </b-list-group-item>
              <b-list-group-item variant="dark" class="bg-dark text-light">
                <b-icon-key class="mr-2"></b-icon-key> Permissions<br />
                <multiselect
                  class="mt-2"
                  :disabled="isDisabled()"
                  v-model="user.permissions"
                  :options="['Edit:Docs']"
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
import Multiselect from "vue-multiselect";
import AdminEditorButtons from "../admin/AdminEditorButtons.vue";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
    Avatar,
    Multiselect,
    AdminEditorButtons,
  },
  metaInfo: {
    title: "Admin",
  },
  data() {
    return {
      user: {
        status: null,
        tags: null,
        topics: null,
        roles: null,
        permissions: null,
      },
      docs: null,
      uiSettings: {
        view: "view",
        buttons: ["edit", "save"],
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
