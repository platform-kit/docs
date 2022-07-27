<!-- Please remove this file from your project -->
<template>
  <div class="search-results">
    <b-card
      @click="
        $nuxt.$options.router.push('/#/' + result.slug);
        updateSearch(null);
      "
      style="cursor: pointer"
      class="search-result-card"
      v-for="(result, index) in searchResults"
      :key="index"
      :title="result.Title"
    >
      <b-card-text>
        {{ result.Description }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: ["searchResults"],
  methods: {
    updateSearch: function (value) {
      this.$emit("updateSearch", null);
    },
  },
};
</script>

<style scoped>
.search-result-card {
  max-width: 900px;
  margin: 15px auto 15px auto;
  transition: all 0.3s;
}

.search-result-card:hover {
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.075),
    0px 7px 7px rgba(0, 50, 100, 0.075), 0px 5px 3px rgba(0, 50, 100, 0.05);
}
</style>