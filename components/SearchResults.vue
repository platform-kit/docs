<!-- Please remove this file from your project -->
<template>
  <div class="search-results px-4">
    <p
      class="mx-auto mt-4 w-100 text-center"
      v-if="search != null && search != ''"
    >
      Search Results for:
      <span style="opacity: 0.5" class="d-inline-block">{{ search }}</span>
    </p>
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
        <b-icon
          :icon="result.Icon || 'book'"
          class="mr-2"
          style="opacity: 0.5; color: royalblue"
        ></b-icon>
        {{ result.Title }}
      </h4>
      <a
        class="btn w-100 text-left d-none d-md-inline-block"
        :href="result.Repository"
        v-if="result.Repository != null"
        style="pointer-events: none"
        ><b-icon-link
          style="margin-left: -10px; margin-right: 15px; opacity: 0.5"
        ></b-icon-link
        >{{ result.Repository }}</a
      >
      <b-card-text style="padding-left: 40px">
        {{ result.Description }}
      </b-card-text>
      <b-card-text
        style="padding-left: 40px"
        v-if="search != null && search != ''"
      >
        <text-highlight
          :queries="getSearchQueries()"
          style="color: #666 !important"
        >
          {{ getSearchExcerpt(result.output.textWithLineBreaks) }}
        </text-highlight>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: ["searchResults", "search"],
  components: {
    "text-highlight": () => {
      if (process.client) {
        return import("vue-text-highlight");
      }
    },
  },
  methods: {
    strip(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },
    getSearchQueries() {
      if (this.search == null) {
        return [];
      } else {
        return this.search.split(" ");
      }
    },
    toggleNav() {
      if (this.search != null && this.search != "" && this.$device.isMobile) {
        this.$root.$emit("bv::toggle::collapse", "nav-collapse");
      }
    },
    getSearchExcerpt(input) {
      var term = input.indexOf(this.search, 0); // first asppearance of the search term
      var last = input.indexOf("<br>", term); // first appearance of a new line after the search term (last character we want)

      /*
      var snippet = input.substr(0, term);
      var first = input.indexOf("<br>", snippet);

      var finalClip = input.substr(first, last);*/

      var finalClip = input.substr(term, 100).replace('<br>', "\n\n") + " ...";
      finalClip = this.strip(finalClip);

      console.log(finalClip);
      // var excerpt = input.substr(0, first);             // excerpting from the beginning of the searchable text to the last character (from previous step)
      // var previousBr = excerpt.indexOf("<br>", last);   // first appearance of a <br> tag within the excerpted text
      // var finalClip = input.substr(previousBr, last);   // clip from first appearance of <br> to last character
      return "... " + finalClip;
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