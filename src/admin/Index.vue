<template>
  <Layout>
    <div>
      test
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
  async mounted() {        
  },
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
</style>
