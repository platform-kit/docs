<template>
  <Layout>
    <div class="admin-page admin-overview">
      <div
        class="ml-0 ml-md-3 mt-0 mt-lg-2 mb-4 mb-lg-0 text-center text-md-left"
        style="font-weight: 400; font-size: 110%; color: rgba(0, 0, 100, 0.65)"
      >
        API Explorer
      </div>
      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-12">
          <b-card class="border-0 raised">
            <iframe
              class="w-100 border-0"
              src="http://localhost:3000/graphql"
              style="min-height: calc(100vh - 300px); border-radius: 5px"
            ></iframe>
          </b-card>
          <a href="http://localhost:3000/graphql" class="float-right btn btn-light raised mt-3" target="_blank">Open in New Window<b-icon-arrow-up-right-square-fill class="ml-2 text-primary"></b-icon-arrow-up-right-square-fill></a>
        </div>
      </div>
    </div>
  </Layout>
</template>


<script>
import Layout from "../layouts/Admin.vue";
import DocsLayout from "../components/DocsLayout.vue";
import Trend from "vuetrend";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
  },
  metaInfo: {
    title: "API Explorer",
  },
  data() {
    return {
      uiSettings: {},
    };
  },
  async mounted() {},
  methods: {},
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
