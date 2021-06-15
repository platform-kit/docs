<template>
  <Layout>
    <div class="admin-page admin-overview">
      <div
        class="ml-0 ml-md-3 mt-0 mt-lg-2 mb-4 mb-lg-0 text-center text-md-left"
        style="font-weight: 400; font-size: 110%; color: royalblue"
      >
        Overview
      </div>
      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="New Users">
            <trend
              :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              :gradientDirection="top"
              :gradient="['#b8f2e6', '#6fa8dc', '#3a86ff']"
              :padding="1"
              :radius="12"
              :stroke-width="1.7"
              :stroke-linecap="butt"
              auto-draw
              smooth
            >
            </trend>
          </b-card>
        </div>
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="Revenue">
            <trend
              :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              :gradientDirection="top"
              :gradient="['#b8f2e6', '#42b983', '#6fa8dc']"
              :padding="1"
              :radius="12"
              :stroke-width="1.7"
              :stroke-linecap="butt"
              auto-draw
              smooth
            >
            </trend>
          </b-card>
        </div>
        <div class="col-md-4 mb-2">
          <b-card class="border-0 raised" title="Engagement">
            <trend
              :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              :gradientDirection="top"
              :gradient="['#ffe74c', '#ffbe88', '#ff93df']"
              :padding="1"
              :radius="12"
              :stroke-width="1.7"
              :stroke-linecap="butt"
              auto-draw
              smooth
            >
            </trend>
          </b-card>
        </div>
      </div>
      <div class="row pr-3 mt-3 ml-0 mr-lg-0">
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
import Trend from "vuetrend";

export default {
  components: {
    Layout,
    DocsLayout,
    Trend,
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
  font-size: 100% !important;
}
</style>
