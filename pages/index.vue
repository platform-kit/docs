<template>
  <Layout id="layout">
    <Navbar
      ref="navbar"
      v-if="showNavbar == true"
      @updateSearch="updateSearch"
      :search="search"
      :variant="'light'"
      :type="'light'"
      :classes="'bg-white'"
      :category="'Overview'"
    ></Navbar>
    <b-spinner
      class="mx-auto mt-5 d-block"
      v-if="
        (search == null || search == '') &&
        currentPage == null &&
        content == null
      "
      type="border"
      style="color:royalblue;"
      label="Loading..."
    ></b-spinner>
    <SearchResults
      @updateSearch="updateSearch"
      v-if="(search == null || search == '') && currentPage == null"
      :searchResults="content"
      :showSavedResults="showSavedResults"
    ></SearchResults>

    <DocLayout
      v-else-if="(search == null || search == '') && currentPage != null"
      :key="currentPage.path"
      id="search-results"
      :content="currentPage"
      :navOptions="navOptions"
      :nextPage="nextPage"
    />
    <SearchResults
      id="default-content"
      :search="search"
      @updateSearch="updateSearch"
      v-else-if="search != null || search != ''"
      :searchResults="searchResults"
      :showSavedResults="showSavedResults"
    ></SearchResults>
  </Layout>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import DocLayout from "../components/DocLayout.vue";
import SearchResults from "../components/SearchResults.vue";

export default {
  name: "Index",
  data() {
    return {
      pageTitle: null || "Docs",
      pageDescription: null,
      showNavbar: true,
      search: null,
      searchResults: null,
      showSavedResults: null,
      content: null,
      currentPage: null,
      nextPage: null,
      navOptions: null,
      hash: null,
      route: null,
      isMobile: null,
    };
  },

  head() {
    return {
      title: this.pageTitle,
      titleTemplate: `%s`,

      meta: [
        {
          hid: "description",
          name: "description",
          content: this.currentPage?.Description,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.pageTitle,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.pageDescription,
        },
      ],

      link: [
        {
          rel: "icon",
          type: "image/png",
          href: process.env.LOGO || "/icon.png",
        },
      ],
    };
  },
  computed: {},
  async mounted() {
    window.addEventListener("keydown", (e) => this.keyDetector("keydown", e));
    window.addEventListener("keypress", (e) => this.keyDetector("keypress", e));
    this.content = await this.$content("")
      .where({
        extension: ".md",
      })
      .sortBy("path")
      .fetch();

    if (this.content != null) {
      var navOptions = this.content.filter(
        // get the top-level results
        (element) => element.path.split("/")[1].includes("/") != true
      );
    }
    this.navOptions = navOptions;
    this.currentPage = null;
    await this.updateCurrentPage();
  },
  watch: {
    async $route(to, from) {
      // react to route changes...
      console.log("Navigated to: ");
      console.log(to);
      if (to.hash != null) {
        var newHash = to.hash.split("#/")[1];
        this.hash = newHash;
        this.route = to;
        if (newHash == "saved") {
          this.showSaved();
        } else {
          this.showSavedResults = false;
          await this.updateCurrentPage();
        }
      }
    },
  },
  methods: {
    getHeadDynamically() {
      var title = this.currentPage?.Title;
      if (title != null && this.currentPage?.Description != null) {
        title = title + " - " + this.currentPage?.Description;
      } else {
        title = "Docs";
      }
      this.pageTitle = title;
      this.pageDescription = this.currentPage?.Description;
    },
    async getSurroundingArticles() {
      try {
        const [prev, next] = await this.$content("")
          .where({
            extension: ".md",
          })
          .sortBy("path")
          .surround(this.currentPage.path)
          .fetch();
        this.nextPage = next;
      } catch (err) {
        console.log(err);
      }
    },
    showSaved() {
      this.currentPage = null;
      console.log("Viewing 'Saved' Docs.");
      this.showSavedResults = true;
      this.search = null;
    },
    keyDetector(type, event) {
      // console.info(type, event)
      if (event.key == "Escape") {
        console.log(event);
        this.focusSearch();
      }
    },
    focusSearch() {
      // this.$refs.searchinput.focus();
      if (this.search == "" || this.search == null) {
        this.$refs.navbar.$refs.searchinput.focus();
      } else {
        this.search = null;
      }
      console.log("Escape key pressed.");
    },
    async updateSearch(search) {
      this.search = search;
      if (typeof search == "string") {
        console.log("Search: " + search);
        this.searchResults = await this.$content("")
          .where({
            extension: ".md",
          })
          .search(search)
          .fetch();
      } else {
        this.showNavbar = false;
        this.search = null;
        this.showNavbar = true;
      }
    },
    async updateCurrentPage() {
      this.hash = window.location.hash.split("#/")[1];
      if (this.hash != null) {
        if (this.hash == "saved") {
          this.showSaved();
        } else {
          console.log("Hash: " + this.hash);
          var page = await this.$content("")
            .where({ slug: this.hash, extension: ".md" })
            .fetch();
          console.log("Page: ");
          console.log(page);
          this.currentPage = null;
          if (page != null && page[0] != null && page[0].path != null) {
            this.currentPage = page[0];
            this.getSurroundingArticles();
            this.getHeadDynamically();
          }
        }
      }
    },
    isLocalStorageAvailable() {
      var test = "test";
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  components: { Navbar, DocLayout, SearchResults },
};
</script>

<style scoped>
#layout {
  min-height: 100vh;
}
</style>