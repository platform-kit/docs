<template>
  <Layout> </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Docs",
  },
  async mounted() {    
    this.window = window;
    window.location.href="/docs"
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
