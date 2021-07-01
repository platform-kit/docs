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
        Products
      </div>

      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12 mb-2">
          <b-card class="border-0 raised">
            <b-table
              borderless
              striped
              responsive
              hover
              class="mb-0 pb-0"
              @row-clicked="myRowClickHandler"
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
              <template #head(title)="data" >
                <b-icon-type class="mr-2 o-50"></b-icon-type>Title
              </template>
              <template #head(description)="data">
                <span class="d-none d-md-inline-block">
                  <b-icon-card-text class="mr-2 o-50"></b-icon-card-text
                  >Description</span
                >
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
                    'background-image': 'url(' + data.item.thumbnail + ')',
                  }"
                  class="br-5"
                ></span>
              </template>
              <template #cell(description)="data">
                <span class="d-none d-md-inline-block">
                  {{ data.item.description }}</span
                >
              </template>
              <template #cell(buttons)="data">
                <g-link
                  :to="'/admin/products/editor?id=' + data.item.id"
                  class="
                    raised
                    btn btn-sm
                    br-5
                    border-0
                    btn-outline-dark
                    float-right
                    px-3
                    py-0
                    d-none d-md-inline-block
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
            >Add New Product
            <b-icon-plus class="ml-2 text-primary"></b-icon-plus
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
          "thumbnail",
          // A column that needs custom formatting
          { key: "title", label: "Title" },
          // A regular column
          "description",
          "buttons",
        ],
      },
      items: [
        {
          id: 1,
          title: "Coaching Session",
          description: "Service",
          thumbnail:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80",
        },
        {
          id: 2,
          title: "Book Club",
          description: "Service",
          thumbnail:
            "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2028&q=80",
        },
        {
          id: 3,
          title: "Course",
          description: "Content",
          thumbnail:
            "https://images.unsplash.com/photo-1559651451-4203db8d2776?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2367&q=80",
        },
        {
          id: 4,
          title: "Book",
          description: "Product",
          thumbnail:
            "https://images.unsplash.com/photo-1615419235091-59bf9cbd530b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2104&q=80",
        },
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
      this.window.location.href = "/admin/products/editor?id=" + record.id;
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
