<template>
  <Layout id="layout">
    <Navbar
      :user="userToken?.payload?.user"
      ref="navbar"
      v-if="showNavbar == true"
      @updateSearch="updateSearch"
      :search="search"
      :variant="'light'"
      :type="'light'"
      :classes="'bg-white'"
      :category="'Overview'"
      @signOut="signOutHandler"
    ></Navbar>
    <b-spinner
      class="mx-auto mt-5 d-block"
      v-if="
        (search == null || search == '') &&
        currentPage == null &&
        content == null
      "
      type="border"
      style="color: royalblue"
      label="Loading..."
    ></b-spinner>
    <SearchResults
      @updateSearch="updateSearch"
      v-if="(search == null || search == '') && currentPage == null"
      :searchResults="navOptions"
      :showSavedResults="showSavedResults"
    ></SearchResults>

    <DocLayout
      v-else-if="(search == null || search == '') && currentPage != null"
      :key="currentPage.path"
      id="search-results"
      :content="currentPage"
      :navOptions="navOptions"
      :nextPage="nextPage"
      :user="userToken?.payload?.user"
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
      userToken: null,
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
      titleTemplate: `%s` + ' • ' + process.env.SITE_NAME || "PlatformKit",

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
    this.getToken();
    this.getUser();
    window.addEventListener("keydown", (e) => this.keyDetector("keydown", e));
    window.addEventListener("keypress", (e) => this.keyDetector("keypress", e));
    this.content = await this.$content("", { deep: true })
      .where({
        extension: ".md",
      })
      .sortBy("path")
      .fetch();
    var navOps = await this.$content("", { deep: false })
      .where({
        extension: ".md",
      })
      .sortBy("path")
      .fetch();

    if (navOps != null) {
      var navOptions = navOps.filter(
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
      this.getToken();
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
    signOutHandler() {
      this.setLocalStorage("userToken", null);
      this.userToken = null;
    },
    getUser() {
      console.log(
        "LocalStorage is available: " + this.isLocalStorageAvailable()
      );
      var storedUser = this.getLocalStorage("userToken");
      console.log("Stored userToken: " + storedUser);
      if (storedUser != null) {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("t");
        var alert = false;
        if (myParam != null) {
          alert = true;
        }
        this.userToken = this.jwtDecode(storedUser, alert);
      }

      return this.userToken?.payload?.user;
    },
    getToken() {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("t");
      console.log(myParam);
      if (myParam != null && myParam != "") {
        var token = this.jwtDecode(myParam);
        this.userToken = token;
        this.setLocalStorage("userToken", myParam);
        var currentUri = window.location.href.split("?")[0];
        // window.location.href = currentUri + "#/";
        // console.log(token);
      }
    },
    jwtDecode(t, alert) {
      if (t != null) {
        let token = {};
        token.raw = t;
        try {
          token.header = JSON.parse(window.atob(t.split(".")[0]));
          token.payload = JSON.parse(window.atob(t.split(".")[1]));
        } catch (err) {
          if (alert == true) {
            this.$toast.show("⚠️ Sign in failed.", {
              position: "top-center",
              theme: "toasted-primary",
              duration: 3000,
              closeOnSwipe: true,
              className: "toast-custom",
              containerClass: "toast-custom-container",
            });
          }
          console.log(err);
        }
        return token;
      }
    },
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
        this.searchResults = await this.$content("", { deep: true })
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
          var page = await this.$content("", { deep: true })
            .where({ path: "/" + this.hash, extension: ".md" })
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
    setLocalStorage(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        return false;
      }
    },

    getLocalStorage(key) {
      try {
        var item = localStorage.getItem(key);
        return item;
      } catch (e) {}
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