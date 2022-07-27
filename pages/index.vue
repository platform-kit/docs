<template>
  <Layout id="layout">
    <Navbar
      v-if="showNavbar == true"
      @updateSearch="updateSearch"
      :search="search"
      :variant="'light'"
      :type="'light'"
      :classes="'bg-white'"
      :category="'Overview'"
    ></Navbar>

    <DocLayout
      v-if="search == null || search == ''"
      :content="currentPage"
      :navOptions="navOptions"
    />
    <SearchResults
      @updateSearch="updateSearch"
      v-if="search != null && search != ''"
      :searchResults="searchResults"
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
      title: "Index",
      showNavbar: true,
      search: null,
      searchResults: null,
      content: null,
      currentPage: null,
      navOptions: null,
      hash: null,
      route: null,
    };
  },
  head: {
    title: "Docs",
    titleTemplate: `%s`,

    /*
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            hid: 'description',
            name: 'description',
            content: 'my website description'
          }
        ],
        */
    link: [
      { rel: "icon", type: "image/png", href: process.env.LOGO || "/icon.png" },
    ],
  },
  computed: {
    getTitle() {
      return this.title;
    },
  },
  async mounted() {
    this.content = await this.$content("docs").sortBy("path").fetch();

    if (this.content != null) {
      this.currentPage = this.content[0];
    }

    var navOptions = this.content.filter(
      (element) => element.path.split("docs/")[1].includes("/") != true
    );
    this.navOptions = navOptions;

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
        await this.updateCurrentPage();
      }
    },
  },
  methods: {
    async updateSearch(search) {
      this.search = search;
      if (typeof search == "string") {
        console.log("Search: " + search);
        this.searchResults = await this.$content("docs").search(search).fetch();
      } else {
        this.showNavbar = false;
        this.search = null;
        this.showNavbar = true;
      }
    },
    async updateCurrentPage() {
      this.hash = window.location.hash.split("#/")[1];

      if (this.hash != null) {
        console.log("Hash: " + this.hash);
        var page = await this.$content("docs")
          .where({ slug: this.hash })
          .fetch();
        console.log("Page: ");
        console.log(page);
        if (page != null && page[0] != null && page[0].path != null) {
          this.currentPage = page[0];
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