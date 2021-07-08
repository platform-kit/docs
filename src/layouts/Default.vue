<template>
  <div class="layout">
    <header class="header">
      <b-navbar
        v-if="hideheader != true"
        id="navbar"
        style="min-height: 77px"
        :toggleable="'lg'"
        type="light"
        variant="light"
        v-bind:class="{ static: (search != null) & (search != '') }"
      >
        <!-- Left aligned nav items -->
        <b-navbar-brand href="/" id="navLogo" class="brand-logo-desktop">
          <img
            v-if="
              uiSchema != null &&
              uiSchema.icons != null &&
              uiSchema.icons.favicon != null
            "
            :src="uiSchema.icons.favicon"
            style="width: 50px"
          />
          <img v-else src="/images/icon.png" style="width: 50px" />
          <span v-if="scrolled != true">
            <span
              v-if="uiSchema != null && uiSchema.name != null"
              class="ml-2"
              >{{ uiSchema.name }}</span
            >
            <span v-else class="ml-3">{{ $static.metadata.siteName }}</span>
          </span>
          <span v-else>
            <span v-if="title == null">
              <span
                v-if="uiSchema != null && uiSchema.name != null"
                class="ml-2"
                >{{ uiSchema.name }}</span
              >
              <span v-else class="ml-2">{{ $static.metadata.siteName }}</span>
            </span>
            <span v-else class="text-dark ml-2"> {{ title }}</span>
          </span>
        </b-navbar-brand>

        <b-navbar-toggle
          @click="search = null"
          target="nav-collapse"
          class="bg-white text-dark border-0 raised"
          style="width: 50px; height: 50px"
        >
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="search"></b-icon>
            <b-icon v-else icon="search"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav :v-model="uiSettings.navBarOpen">
          <b-navbar-nav class="d-none">
            <b-nav-item href="/">Home</b-nav-item>
          </b-navbar-nav>

          <!-- Center Search -->
          <b-navbar-nav id="nav-middle" class="mx-auto w-100">
            <b-nav-form class="mx-auto mb-3 mb-lg-0" id="nav-search">
              <div class="input-group mx-auto">
                <div class="input-group-prepend">
                  <div
                    class="btn bg-none border-0 border-left-0 o-50"
                    id="searchInputButton"
                  >
                    <b-icon-search
                      style="margin-bottom: 2px"
                      font-scale=".85"
                    ></b-icon-search>
                  </div>
                </div>
                <b-form-input
                  autocomplete="off"
                  v-model="search"
                  tabindex="1"
                  id="nav-input"
                  @input="getSearchResults()"
                  ref="navSearch"
                  class="mr-sm-2 mr-0 br-5 px-3 border-0"
                  style="text-align: center; z-index: 1 !important;"
                  placeholder="Search"
                ></b-form-input>
                <div class="input-group-append">
                  <div
                    class="btn bg-none border-0 border-left-0 o-50"
                    id="searchInputLabel"
                  >
                    <span
                      class="badge border hint"
                      v-if="search == null || search == ''"
                      style="background: #fff"
                    >
                      Esc
                    </span>
                    <span
                      class="badge border clear"
                      v-else
                      @click="search = null"
                      style="background: #fff; z-index: 999999999999 !important"
                    >
                      <b-icon-x></b-icon-x>
                    </span>
                  </div>
                </div>
              </div>
            </b-nav-form>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav
            class="ml-auto text-right mb-2 mb-md-0 d-block"
            id="nav-right"
            style="margin-right: -6px"
          >
            <g-link
              v-if="
                apiSchema != null &&
                apiSchema.links != null &&
                apiSchema.links.github != null
              "
              class="
                btn btn-block btn-lg-inline
                o-80 o-h-100
                text-dark text-md-right
              "
              style="position: relative; right: 0px; top: 0px"
              :to="apiSchema.links.github"
              exact=""
              :active-class="'o-100 text-primary'"
            >
              <b-icon-github class="mx-1"></b-icon-github
              ><span class="d-inline-block d-md-none mx-2">Github</span>
            </g-link>

            <div class="btn-group w-100 mt-3 mt-md-0 d-none d-lg-inline-block" >
              <g-link
                v-if="getUserEmail() == null"
                :to="'/auth/login'"
                class="
                  btn
                  d-block
                  ml-auto
                  mr-auto
                  ml-md-0
                  mr-md-0
                  text-center text-md-right
                "
              >
                <b-icon-person-circle
                  class="mr-2 text-dark"
                ></b-icon-person-circle>
                Sign In
              </g-link>
              <b-dropdown
                v-if="getUserEmail() != null"
                block
                class="w-100"
                menu-class="w-100 border-light-blue raised "
                variant="text-dark"
              >
                <template #button-content>
                  <b-avatar
                    :text="getUserEmail()[0]"
                    class="d-inline-block mr-1"
                    style="
                      margin-top: 0px;
                      margin-left: -5px !important;
                      margin-right: -5px;
                      max-height: 25px;
                      max-width: 25px;
                    "
                  ></b-avatar>

                  {{ getUserEmail() }}
                </template>
                <b-dropdown-item
                  v-if="
                    getUser() != null &&
                    getUser().roles != null &&
                    getUser().roles.includes('admin')
                  "
                  href="/admin"
                  ><b-icon-grid1x2 class="mr-2 text-dark"></b-icon-grid1x2>
                  Admin</b-dropdown-item
                >
                <b-dropdown-item @click="logOut()" href="#"
                  ><b-icon-lock class="mr-2 text-danger"></b-icon-lock> Sign
                  Out</b-dropdown-item
                >
              </b-dropdown>

              <g-link
                class="btn o-70 o-h-100 d-none"
                :to="'/'"
                exact=""
                :active-class="'o-100 text-primary'"
              >
                <b-icon-house-door class="mx-1"></b-icon-house-door
                ><span class="d-inline-block d-md-none mx-2">Discover</span>
              </g-link>
              <g-link
                class="btn o-70 o-h-100 d-none"
                :to="'/new'"
                :active-class="'o-100 text-primary'"
              >
                <b-icon-plus-square class="mx-1"></b-icon-plus-square
                ><span class="d-inline-block d-md-none mx-2">New</span>
              </g-link>
              <g-link
                class="btn o-70 o-h-100 d-none"
                :to="'/saved'"
                :active-class="'o-100 text-primary'"
              >
                <b-icon-bookmarks class="mx-1"></b-icon-bookmarks
                ><span class="d-inline-block d-md-none mx-2">Bookmarks</span>
              </g-link>
              <g-link
                class="btn o-70 o-h-100 d-none"
                :to="'/settings'"
                :active-class="'o-100 text-primary'"
              >
                <b-icon-gear class="mx-1"></b-icon-gear
                ><span class="d-inline-block d-md-none mx-2">Settings</span>
              </g-link>
              <g-link
                class="btn o-70 o-h-100 d-none"
                :to="'/profile'"
                :active-class="'o-100 text-primary'"
              >
                <b-icon-person-circle class="mx-1"></b-icon-person-circle
                ><span class="d-inline-block d-md-none mx-2">Account</span>
              </g-link>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div
        v-if="search != null"
        v-bind:class="{ visible: search != null && search != '' }"
        id="modal-search"
        class="w-100"
        title="Search Results"
      >
        <div
          class="card border-light-blue raised mx-auto p-3"
          style="z-index: 999; border-radius: 0px 0px 10px 10px"
        >
          <div
            v-if="Object.values(searchResults).length == 0"
            class="text-center"
          >
            No Results.
          </div>
          <div
            @click="
              hideNavCollapse();
              $router.push(getPath(item.node));
            "
            style="cursor: pointer"
            v-for="(item, index) in Object.values(searchResults)"
            :key="index"
          >
            <div v-if="item.node.content != null">
              <div v-on:click="search = null" class="search-result p-3 my-2">
                <g-link :to="'#'" style="text-decoration: none !important">
                  <b class="text-dark"
                    ><span class="text-primary bg-light br-5 mr-2 p-1 px-2"
                      >Doc</span
                    >{{ item.node.title }}</b
                  >
                  <br />
                  <span class="text-dark o-50">
                    {{ item.node.excerpt }}<span> ...</span>
                  </span>
                </g-link>
              </div>
            </div>

            <div v-if="item.node.key != null">
              <div v-on:click="search = null" class="search-result p-3 my-2">
                <g-link :to="'#'" style="text-decoration: none !important">
                  <b class="text-dark">
                    <span class="text-light bg-dark br-5 mr-2 p-1 px-2"
                      >API Resource</span
                    >
                    <span class="text-capitalize">
                      {{ humanizeResourceName(item.node.key) }}
                    </span></b
                  >
                  <br />
                  <span class="text-dark o-50">
                    {{ item.node.data }}<span> ...</span>
                  </span>
                </g-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div id="mainContainer" class="h-100">
      <div
        id="main"
        class="mainContent h-100"
        v-bind:class="{ blurred: search != null && search != '' }"
      >
        <div id="topOfContent" v-b-visible.50="visibleHandler"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
  docs: allDoc(sortBy: "path") {
    edges {
      node {
        id                
        path
        title
        content
        excerpt
        headings {
          anchor
          value
        }
        fileInfo {
          name
        }
      }
    }
  }
  
}
</static-query>

<script>
import axios from "axios";

export default {
  props: ["title", "hideheader"],
  components: {},
  data() {
    return {
      uiSettings: {
        navBarOpen: true,
      },
      apiSchema: null,
      uiSchema: null,
      search: null,
      searchResults: {},
      scrolled: null,
      window: null,
    };
  },
  async mounted() {
    console.log(this.$page);
    this.getApiSchema();
    this.getUiSchema();
    this.window = window;
    window.addEventListener("keydown", this.escapeListener);
  },
  methods: {
    logOut() {
      this.$store.commit("updateUser", {});
    },
    getUserEmail() {
      if (this.window != null) {
        return this.$store?.getters?.getUser?.data?.sub;
      }
    },
    getUser() {
      if (this.window != null) {
        return this.$store?.getters?.getUser?.data;
      }
    },
    getPath(node) {
      if (node.key != null) {
        return "/docs/api/" + node.key;
      }
      if (node.path != null) {
        return node.path;
      }
    },
    hideNavCollapse() {
      this.$root.$emit("bv::toggle::collapse", "nav-collapse");
    },
    visibleHandler(isVisible) {
      if (isVisible) {
        // Do something
        console.log("visible");
        this.scrolled = false;
      } else {
        // Do something else
        console.log("not visible");
        this.scrolled = true;
      }
    },
    humanizeResourceName(input) {
      return input.replace(/_/g, " ");
    },
    getSearchResults() {
      this.searchResults = {};
      var docs = Object.entries(this.$static.docs.edges);
      // var apiSchemas = Object.entries(this.$static.apiSchemas.edges);
      for (const [key, value] of docs) {
        if (
          value.node.content
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          value.node.title.toLowerCase().includes(this.search.toLowerCase())
        ) {
          this.searchResults[value.node.id] = value;
        }
      }
      /*
      for (const [key, value] of apiSchemas) {
        if (
          value.node.data.toLowerCase().includes(this.search.toLowerCase()) ||
          value.node.key.toLowerCase().includes(this.search.toLowerCase())
        ) {
          this.searchResults[value.node.id] = value;
        }
      }
      */
    },
    async getApiSchema() {
      try {
        const results = await axios.get("/temp/api-schema.json");
        this.apiSchema = results.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUiSchema() {
      try {
        const results = await axios.get("/temp/ui-schema.json");
        this.uiSchema = results.data;
      } catch (error) {
        console.log(error);
      }
    },
    async escapeListener(event) {
      if (event.key === "Escape") {
        this.search = null;                
        this.$refs.navSearch.$el.focus();
      }
    },
  },
};
</script>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif !important;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.mainContent {
  background-color: #fff !important;
  background-image: linear-gradient(
      -90deg,
      rgb(255, 255, 255),
      rgb(237, 243, 253)
    ),
    linear-gradient(0deg, rgb(255, 255, 255) 0px, rgb(247 249 255) 500px);
  transition: all 0s, opacity 0.5s !important;
}

@media (max-width: 991px) {
  .mainContent {
    background: #fff;
  }
}

.mainContent.blurred {
  pointer-events: none;
  filter: blur(5px);
  opacity: 0.35;
}

#mainContainer {
  background-image: linear-gradient(rgb(112, 113, 128), #191a29) !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.25px;
}

#modal-search {
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  margin-top: 77px;
}

#modal-search .card {
  max-width: 1100px;
}

#modal-search.visible {
  display: inline-block;
}

@media (max-width: 991px) {
  #modal-search {
    margin-top: 159px;
  }
}

.h-100 {
  min-height: 100vh;
}

@media (min-width: 960px) {
  .h-md-100 {
    min-height: 100vh;
  }
}

.layout {
  max-width: 100%;
  margin: 0 auto;
}

#navLogo {
  width: 300px;
  transition: all 0.5s;
}

@media (max-width: 720px) {
  #navLogo {
    width: 100px;
    transition: all 0.5s;
  }
}

#navLogo:hover {
  opacity: 0.7;
}

#nav-search {
  width: 100% !important;
  max-width: 350px;
}
#nav-input {
  width: 340px !important;
  transition: all 0.3s !important;
  background:rgb(189 199 234 / 29%) !important;
}

#nav-input:focus {
    background:#fff !important;
}

@media (max-width: 768px) {
  #nav-middle {
    margin-top: 20px !important;
  }
}

@media (min-width: 768px) {
  #nav-middle {
    margin-left: -50px !important;
  }
}

@media (min-width: 991px) {
  #nav-right {
    width: 400px;
  }
  #nav-search {
    width: 100% !important;
    max-width: 500px !important;
  }
  #nav-input {
    width: 500px !important;
  }
}

#nav-right,
#nav-right .btn {
  border-radius: 0px !important;
}

#navbar {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: linear-gradient(90deg, #fff 50%, #d9e4f5) !important;
  background-repeat: no-repeat;
  background-size: 200% !important;
  border-bottom: 1px solid rgba(0, 50, 150, 0.1);
  transition: all 0.5s;
  box-shadow: 0px 15px 30px rgba(0, 100, 200, 0.1);
  background-position-x: 50% !important;
}

#navbar.static {
  position: absolute;
  top: 0px;
  left: 0px;
}


#navbar:focus-within {
  background-position-x: 90% !important;
}

#navbar #searchInputLabel {
  color: rgb(0, 50, 200, 0.8) !important;
  width: 60px;
  margin-left: -60px;
  padding-right: 15px;
  border-radius: 0px 25px 25px 0px;
}

#navbar #searchInputLabel .hint {
  pointer-events: none;
}

#navbar #searchInputButton {
  color: rgb(0, 50, 200, 0.8) !important;
  pointer-events: none;
  width: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 99999 !important;
  padding-right: 15px;
  border-radius: 0px 25px 25px 0px;
}

.navlist .list-group-item {
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border 0s;
}

.navlist .list-group-item:first-of-type {
  border-radius: 4px 4px 0px 0px !important;
}

.navlist .list-group-item:last-of-type {
  border-radius: 0px 0px 4px 4px !important;
}

.navlist .list-group-item.active {
  background: #f1f8ff !important;
  color: #007bff;
}

.navlist .list-group-item:hover {
  background: #fff !important;
}

.search-result {
  transition: all 0.3s;
}

.search-result:hover {
  background: #f1f8ff !important;
}
.bg-light-blue {
  background: #f1f8ff !important;
}

.bg-light-blue-gradient {
  background: linear-gradient(180deg, #f4f8ff, rgb(220 228 255)) !important;
}

.navgroup .btn {
  background: #fff !important;
  border-color: #a8b2bd;
}

.navgroup .btn:hover {
  background: #eef3f8 !important;
}

.navgroup .btn.active {
  background: #f1f8ff !important;
  color: #007bff;
  border-color: #007bff;
}

.badge-button {
  cursor: pointer;
  transition: all 0.3s;
}

.badge-button:hover {
  background: #eef3f8 !important;
}

.badge-button.active {
  background: #f1f8ff !important;
  color: #007bff;
}

.border-light-blue {
  border-color: rgba(0, 100, 200, 0.1) !important;
}

.o-50,
.o-60,
.o-70,
.o-80,
.o-90,
.o-100 {
  transition: opacity 0.2s;
}

.o-50 {
  opacity: 0.5 !important;
}

.o-60 {
  opacity: 0.6 !important;
}

.o-70 {
  opacity: 0.7 !important;
}

.o-80 {
  opacity: 0.8 !important;
}

.o-90 {
  opacity: 0.9 !important;
}

.o-100 {
  opacity: 100 !important;
}

.o-h-50:hover {
  opacity: 0.5 !important;
}
.o-h-60:hover {
  opacity: 0.6 !important;
}
.o-h-70:hover {
  opacity: 0.7 !important;
}
.o-h-80:hover {
  opacity: 0.8 !important;
}
.o-h-90:hover {
  opacity: 0.9 !important;
}
.o-h-100:hover {
  opacity: 1 !important;
}

#nav-search input {
  margin: auto !important;
}

.raised {
  box-shadow: 0px 8px 20px rgba(0, 33, 100, 0.1) !important;
}
.raisedTop {
  box-shadow: 0px -20px 20px rgba(0, 50, 70, 0.2) !important;
}

.br-5 {
  border-radius: 5px !important;
}
.br-10 {
  border-radius: 10px !important;
}
.br-15 {
  border-radius: 15px !important;
}
.br-20 {
  border-radius: 20px !important;
}
.br-25 {
  border-radius: 25px !important;
}

.feedItemGridSquare {
  background-size: cover !important;
  background-position: center !important;
  transition: all 0.5s;
}

.feedItemGridSquare:hover {
  opacity: 0.8;
  background-color: #cce0f5 !important;
}

.card-img-overlay::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.66)
  ) !important;
  pointer-events: none;
}

:root {
  --plyr-color-main: #007bff;
}

.plyr iframe {
  transition: 0.5s filter linear;
}

.plyr.plyr--paused iframe {
  filter: invert(100%) blur(50px);
  opacity: 0.4;
}

.feedItem .card-body {
  padding: 0px !important;
  height: 500px;
}
.feedItem .card-header {
  border-radius: 4px 4px 0px 0px !important;
  border-bottom: none !important;
}

.feedItem .card-footer {
  border-radius: 0px 0px 4px 4px !important;
}

.feedItem .card-header,
.feedItem .card-footer {
  background: #fff !important;
}

.feedItemImage {
  cursor: pointer;
  background-size: cover !important;
  background-position: center !important;
  display: block !important;
  width: 100%;
  height: 500px;
}

.feedItemMeta {
  cursor: pointer;
  float: right;
}

.feedItemMeta:hover {
  background: #000 !important;
  color: #fff !important;
}

.collectionCard {
  transition: all 0.5s;
}

.collectionCard:hover {
  opacity: 0.8;
}

.collectionCard img {
  opacity: 0.7;
  z-index: -1 !important;
}

.collectionCard,
.collectionCard .card-img-overlay,
.collectionCard .position-relative {
  border-radius: 4px !important;
  overflow: hidden;
}

.docs-content p {
  line-height: 200% !important;
}

.docs-page .docs-content,
.docs-page .docs-sidebar {
  transition: 0.3s all;
}

.docs-page.loading .docs-content,
.docs-page.loading .docs-sidebar {
  opacity: 0 !important;
}

.docs-page.loaded .docs-content,
.docs-page.loaded .docs-sidebar {
  opacity: 1;
}

#edit-doc-button {
  position: fixed !important;
  bottom: 15px;
  left: 15px;
  height: 50px;
  width: 50px;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s;
}
#edit-doc-button:hover {
  background: #fff;
  color: royalblue;
}

.docs-nav .btn:focus,
.docs-nav .btn:active {
  outline: none !important;
  box-shadow: none !important;
}

.list-group-item-details-badge {
  opacity: 0;
}

.list-group-item:hover .list-group-item-details-badge {
  opacity: 1;
}

a:hover {
  text-decoration: none !important;
}

.editor-preview pre,
.editor-preview-side pre {
  background: none !important;
}

.dropdown-menu {
  padding: 0.5rem !important;
}

@media (min-width: 991px) {
  .brand-logo-desktop {
    margin-left: 56px;
  }
}

@media (min-width: 1020px) {
  .brand-logo-desktop {
    margin-left: 47px;
  }
}

@media (min-width: 991px) {
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    /* Retina-specific stuff here */
    .brand-logo-desktop {
      margin-left: 56px !important;
    }
  }
}
.navbar-brand img {
  height: 50px !important;
  width: 50px !important;
  display: inline-block !important;
}
</style>