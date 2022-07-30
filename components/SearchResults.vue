<!-- Please remove this file from your project -->
<template>
  <div
    class="search-results px-4"
    :class="{ visible: searchResults != null, hidden: searchResults == null }"
  >
    <p
      class="mx-auto mt-4 w-100 text-center"
      v-if="search != null && search != ''"
    >
      Search Results for:
      <span style="opacity: 0.5" class="d-inline-block">{{ search }}</span>
    </p>

    <p
      class="mx-auto mt-4 w-100 text-center"
      v-if="showSavedResults == true && (search == null || search == '')"
    >
      Your Bookmarks
    </p>
    <b-card
      @click="
        $nuxt.$options.router.push('/#/' + result.slug);
        updateSearch(null);
        toggleNav();
      "
      style="cursor: pointer"
      class="search-result-card mx-auto mt-4"
      :class="{ 'd-none': showPost(result.path) == false }"
      v-for="(result, index) in searchResults"
      :key="index"
    >
      <h4>
        <b-icon
          :icon="result.Icon || 'book'"
          class="mr-2 search-result-icon"
          style="opacity: 0.25"
        ></b-icon>
        {{ result.Title }}
        <b-icon-heart-fill
          v-if="isFavorite(result.path)"
          scale="0.66"
          style="
            position: absolute;
            right: 10px;
            top: 10px;
            color: #d6d6d6 !important;
          "
        ></b-icon-heart-fill>
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
    <div align="center" class="pb-4 mb-2" v-if="byLine != null">
      <a
        :href="byLineLink"
        class="
          mx-auto
          d-inline-block
          badge
          mt-3
          text-small
          border
          br-10
          footer-badge
        "
        ><b-icon-book class="mr-2"></b-icon-book>{{ byLine }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: ["searchResults", "search", "showSavedResults"],
  components: {
    "text-highlight": () => {
      if (process.client) {
        return import("vue-text-highlight");
      }
    },
  },
  data() {
    return {
      byLine: null,
      byLineLink: null,
    };
  },
  async mounted() {
    var byLine = (this.byLine = process.env.BYLINE);
    if (byLine == "" || byLine == null) {
      byLine = "Docs by PlatformKit";
    }
    this.byLine = byLine;
    var byLineLink = process.env.BYLINE;
    if (byLineLink == "" || byLineLink == null) {
      byLineLink = "https://github.com/platform-kit/docs";
    }
    this.byLineLink = byLineLink;
  },
  methods: {
    showPost(path) {
      if (this.showSavedResults !== true || this.search != null) {
        return true;
      }
      if (this.showSavedResults == true && this.isFavorite(path) == true) {
        return true;
      } else if (
        this.showSavedResults == true &&
        this.isFavorite(path) == false
      ) {
        return false;
      } else {
        return false;
      }
    },
    isFavorite(path) {
      if (
        localStorage.getItem("favorite:" + path) != null &&
        (localStorage.getItem("favorite:" + path) == "true" ||
          localStorage.getItem("favorite:" + path) == true)
      ) {
        return true;
      } else {
        return false;
      }
    },
    strip(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },
    getSearchQueries() {
      if (this.search == null) {
        return [];
      } else {
        var array = this.search.split(" ");
        array.push(this.search);
        return array;
      }
    },
    toggleNav() {
      if (this.search != null && this.search != "" && this.$device.isMobile) {
        this.$root.$emit("bv::toggle::collapse", "nav-collapse");
      }
    },
    getSearchExcerpt(input) {
      var lowercaseString = input.toLowerCase();
      var search = this.search.toLowerCase();
      var term = lowercaseString.indexOf(search, 0); // first asppearance of the search term
      var last = lowercaseString.indexOf("<br>", term); // first appearance of a new line after the search term (last character we want)
      var finalClip = input.substr(term, 130); // clip the full text from the point of the first appearance of hte term to 130 characters later,
      finalClip = this.strip(finalClip); // strip all html tags
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
  margin: 15px auto 15px auto !important;
  transition: all 0.5s !important;
  border-left: 4px solid #ccd4de !important;
}

.search-result-card {
  transition: all 1s !important;
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.0375),
    0px 7px 7px rgba(0, 50, 100, 0.0375), 0px 5px 3px rgba(0, 50, 100, 0.025);
}

.search-result-card:hover {
  background: rgb(239, 243, 249) !important;
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.075),
    0px 7px 7px rgba(0, 50, 100, 0.075), 0px 5px 3px rgba(0, 50, 100, 0.05);
}

.search-result-card svg {
  color: navy;
}

.footer-badge {
  background: #ebf3fb;
  border: 1px solid rgba(0, 75, 75, 0.1) !important;
  opacity: 1;
  padding: 5px 10px !important;
  color: #3c6384;
  border-radius: 25px;
}

.text-small {
  font-size: 60%;
}

.search-results {
  opacity: 0;
  transition: 0s;
  transition-delay: 0s;
}

.search-results.hidden {
  opacity: 0;
}

.search-results.visible {
  opacity: 1;
  transition: all 1s;
}
</style>