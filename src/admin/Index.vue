<template>
  <Layout>
    <div class="admin-page admin-overview">
      <h5 class="mb-4 mt-2">Overview</h5>
      <div class="row pr-3 mt-3">
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="New Users"> </b-card>
        </div>
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="Revenue"> </b-card>
        </div>
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="Engagement"> </b-card>
        </div>
      </div>
      <div class="row pr-3 mt-3">
        <div class="col-md-6 mb-2">
          <b-card class="border-0 raised" title="Top Pages"> </b-card>
        </div>
        <div class="col-md-6 mb-2">
          <b-card class="border-0 raised" title="Top Content"> </b-card>
        </div>
      </div>
    </div>
  </Layout>
</template>


<script>
import Layout from "../layouts/Admin.vue";
import DocsLayout from "../components/DocsLayout.vue";

export default {
  components: {
    Layout,
    DocsLayout,
  },
  metaInfo: {
    title: "Admin",
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
    font-size:100% !important;
}

.admin-page .card.raised {
  box-shadow:0px 15px 30px rgba(0,0,75,0.1);
}
</style>
