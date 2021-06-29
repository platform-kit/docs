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
        Pages
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12 mb-2">
          <b-card class="border-0 raised">
            <b-table
              borderless
              striped
              responsive
              hover
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
                  :style="{ width: field.key === 'thumbnail' ? '5px' : '0px' }"
                />
              </template>
              <template #head(thumbnail)="data" style="width: 30px !important">
                &nbsp;
              </template>
              <template #head(title)="data">
                <b-icon-type class="mr-2 o-50"></b-icon-type>Title
              </template>
              <template #head(description)="data">
                <b-icon-card-text class="mr-2 o-50"></b-icon-card-text
                >Description
              </template>
              <template #head(buttons)="data"> &nbsp; </template>
              <template #cell(thumbnail)="data">
                <span
                  style="
                    display: inline-block !important;
                    float: left;
                    background-color: #eee;
                    height: 25px;
                    width: 50px;
                    background-size: cover;
                    background-position: center center;
                  "
                  v-bind:style="{
                    'background-image':
                      'url(https://source.unsplash.com/random/160x90?)',
                  }"
                  class="br-5"
                ></span>
              </template>
              <template #cell(buttons)="data">
                <g-link
                :to="'/admin/pages/editor'"
                  class="
                    raised
                    btn btn-sm
                    br-5
                    border-0
                    btn-outline-dark
                    float-right
                    d-none d-md-inline-block
                    px-3 py-0
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
            >Add New Page <b-icon-plus class="ml-2 text-primary"></b-icon-plus
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
import Avatar from "vue-avatar";

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
          "thumbnail",
          // A column that needs custom formatting
          { key: "title", label: "Title" },
          // A regular column
          "description",
          "buttons",
        ],
      },
      window: null,
      items: [
        { title: "Dickerson", description: "Macdonald@example.com" },
        { title: "Larsen", description: "Shaw@example.com" },
        { title: "Geneva", description: "Wilson@example.com" },
        { title: "Jami", description: "Carney@example.com" },
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
      this.window.location.href = "/admin/pages/editor?id=" + record.id;
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
