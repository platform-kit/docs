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
        Users
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12 mb-2">
          <b-card class="border-0 raised">
            <b-table
              borderless
              striped
              hover
              responsive
              @row-clicked="myRowClickHandler"
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
                  :style="{ width: field.key === 'avatar' ? '74px' : '0px' }"
                />
              </template>
              <template #head(avatar)="data" style="width: 30px !important">
                &nbsp;
              </template>
              <template #head(name)="data" style="width: 30px !important">
                <span class="d-none d-md-inline-block"
                  ><b-icon-type class="mr-2 o-50"></b-icon-type>Name</span
                >
              </template>
              <template #head(email)="data" style="width: 30px !important">
                <b-icon-envelope class="mr-2 o-50"></b-icon-envelope>Email
              </template>
              <template #head(buttons)="data" style="width: 30px !important">
                &nbsp;
              </template>
              <template #cell(avatar)="data" style="width: 30px !important">
                <avatar
                  style="margin-left: 15px"
                  :username="data.item.email"
                  :size="25"
                ></avatar>
              </template>
              <template #cell(name)="data">
                <span class="d-none d-md-inline-block">{{
                  data.item.name
                }}</span>
              </template>
              <template #cell(buttons)="data">
                <g-link
                  :to="'/admin/users/editor'"
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
            href="#"
            class="float-right btn btn-light raised mt-3"
            target="_blank"
            >Add New User <b-icon-plus class="ml-2 text-primary"></b-icon-plus
          ></a>
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
      uiSettings: {
        sortBy: "name",
        sortDesc: true,
        currentPage: 1,
        perPage: 15,
        fields: [
          // A virtual column that doesn't exist in items
          // 'index',
          // A custom rendered image
          "avatar",
          // A column that needs custom formatting
          { key: "name", label: "Name" },
          // A regular column
          "email",
          // HTML
          "buttons",
        ],
      },
      window: null,
      items: [
        { age: 40, name: "Dickerson", email: "Macdonald@example.com" },
        { age: 21, name: "Larsen", email: "Shaw@example.com" },
        { age: 89, name: "Geneva", email: "Wilson@example.com" },
        { age: 38, name: "Jami", email: "Carney@example.com" },
      ],
    };
  },
  async mounted() {
    this.window = window;
  },
  methods: {
    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      console.log(record); // This will be the item data for the row
      this.window.location.href = "/admin/users/editor?id=" + record.id;
    }
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
