<!-- Please remove this file from your project -->
<template>
  <div class="search-results px-4">
    <p class="mx-auto mt-4 w-100 text-center" v-if="search  != null && search != ''">Search Results for: <span style="opacity:0.5" class="d-inline-block">{{ search }}</span></p>
    <b-card
      @click="
        $nuxt.$options.router.push('/#/' + result.slug);
        updateSearch(null);
        toggleNav();
      "
      style="cursor: pointer"
      class="search-result-card mx-auto mt-4"
      v-for="(result, index) in searchResults"
      :key="index"
    >
      <h4>
        <b-icon :icon="result.Icon || 'book'" class="mr-2" style="opacity: 0.5; color:royalblue;"></b-icon>
        {{ result.Title }}
      </h4>
      <a
        class="btn w-100 text-left d-none d-md-inline-block"
        :href="result.Repository"
        v-if="result.Repository != null"
        style="pointer-events: none"
        ><b-icon-link style="margin-left:-10px;margin-right:15px;opacity:0.5;" ></b-icon-link>{{ result.Repository }}</a
      >
      <b-card-text style="padding-left: 40px">
        {{ result.Description }}
      </b-card-text>
      <b-card-text style="padding-left: 40px" v-if="search != null && search != ''">
          <span class="badge bg-dark text-light br-10">Excerpt</span><br></br>
          <code v-html="getSearchExcerpt(result.output.textWithLineBreaks)"></code>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: ["searchResults", "search"],
  methods: {
    toggleNav() {
      if (this.search != null && this.search != '' && this.$device.isMobile) {
        this.$root.$emit("bv::toggle::collapse", "nav-collapse");
      }
    },
    getSearchExcerpt(input) {
      var first = input.indexOf(this.search, 0);
      var last = input.indexOf("<br>", first);
      return "... " + input.substring(first, last);
    },
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

.search-result-card:nth-of-type(even) {
  border-left: 4px solid rgb(177, 190, 228) !important;
}

.search-result-card:nth-of-type(odd) {
  border-left: 4px solid royalblue !important;
}

.search-result-card {
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.0375),
    0px 7px 7px rgba(0, 50, 100, 0.0375), 0px 5px 3px rgba(0, 50, 100, 0.025);
}

.search-result-card:hover {
  background: rgb(239, 243, 249) !important;
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.075),
    0px 7px 7px rgba(0, 50, 100, 0.075), 0px 5px 3px rgba(0, 50, 100, 0.05);
}
</style>