<template>
  <div class="layout">
    <header class="header"></header>
    <div id="mainContainer" class="admin-page h-100">
      <div
        id="main"
        class="mainContent h-100"
        v-bind:class="{ blurred: search != null && search != '' }"
      >
        <div class="w-100 h-100 bg-white admin-logo">
          <div class="row">
            <div class="col-md-2 h-100 admin-sidebar px-0 d-none d-md-inline">
              <div
                class="w-100 row m-0 border-bottom border-light-blue pl-3 pl-lg-0"
                style="height: 77px; background: #fff"
              >
                <b-navbar-brand
                  href="/"
                  id="navLogo"
                  class="mx-auto text-center w-100 py-2 my-auto mx-auto mx-lg-0"
                  style="width: auto"
                >
                  <g-image
                    v-if="
                      uiSchema != null &&
                      uiSchema.icons != null &&
                      uiSchema.icons.favicon != null
                    "
                    :src="uiSchema.icons.favicon"
                    style="max-width: 50px"
                    class="d-inline"
                  />
                  <g-image
                    v-else
                    src="~/images/icon.png"
                    style="max-width: 50px"
                    class="d-inline"
                  />
                  <span class="text-dark d-none d-lg-inline">
                    <span v-if="title == null">
                      <span
                        v-if="uiSchema != null && uiSchema.name != null"
                        class="ml-2"
                        >{{ uiSchema.name }}</span
                      >
                      <span v-else class="ml-3">{{
                        $static.metadata.siteName
                      }}</span>
                    </span>
                    <span v-else class="text-dark ml-2 d-none d-lg-inline"
                      ><span>{{ title }}</span></span
                    >
                  </span>
                </b-navbar-brand>
              </div>
              <div class="ml-3 pr-2 pl-1 pt-3">
                <div style="" class="btn btn-block text-dark">
                  <g-link
                    to="/admin"
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-grid1x2 class="my-auto"></b-icon-grid1x2>
                    <span class="mr-auto my-auto nav-icon-label"
                      >Dashboard</span
                    >
                  </g-link>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-person class="my-auto"></b-icon-person>
                    <span class="mr-auto my-auto nav-icon-label">Users</span>
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-file-earmark class="my-auto"></b-icon-file-earmark>
                    <span class="mr-auto my-auto nav-icon-label">Pages</span>
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-pen class="my-auto"></b-icon-pen>
                    <span class="mr-auto my-auto nav-icon-label">Content</span>
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-credit-card class="my-auto"></b-icon-credit-card>
                    <span class="mr-auto my-auto nav-icon-label"
                      >Subscriptions</span
                    >
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-graph-up class="my-auto"></b-icon-graph-up>
                    <span class="mr-auto my-auto nav-icon-label"
                      >Analytics</span
                    >
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-file-earmark class="my-auto"></b-icon-file-earmark>
                    <span class="mr-auto my-auto nav-icon-label">Docs</span>
                  </div>
                </div>
                <div style="" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="bg-white br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-code-square class="my-auto"></b-icon-code-square>
                    <span class="mr-auto my-auto nav-icon-label">API</span>
                  </div>
                </div>
                <div id="settings-button" class="btn btn-block text-dark">
                  <div
                    style="height: 50px"
                    class="br-5 d-flex mx-auto nav-icon-container btn"
                  >
                    <b-icon-gear class="my-auto"></b-icon-gear>
                    <span class="mr-auto my-auto nav-icon-label">Settings</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10 admin-main p-0 m-0" style="">
              <b-navbar
                variant="light"
                type="light"
                class="border-bottom border-light-blue"
                style="height: 77px; background: none !important"
              >
                <b-nabar-nav class="mr-auto">
                  <b-navbar-brand
                    href="/"
                    id="navLogo"
                    class="
                      ml-3
                      mr-auto
                      text-center
                      w-100
                      py-2
                      my-auto
                      d-inline d-md-none
                    "
                    style="width: auto"
                  >
                    <g-image
                      v-if="
                        uiSchema != null &&
                        uiSchema.icons != null &&
                        uiSchema.icons.favicon != null
                      "
                      :src="uiSchema.icons.favicon"
                      style="max-width: 50px"
                    />
                    <g-image
                      v-else
                      src="~/images/icon.png"
                      style="max-width: 50px"
                    />
                    <span class="text-dark">
                      <span v-if="title == null">
                        <span
                          v-if="uiSchema != null && uiSchema.name != null"
                          class="ml-3"
                          >{{ uiSchema.name }}</span
                        >
                        <span v-else class="ml-3">{{
                          $static.metadata.siteName
                        }}</span>
                      </span>
                      <span v-else class="text-dark ml-2"
                        ><span>{{ title }}</span></span
                      >
                    </span>
                  </b-navbar-brand>
                </b-nabar-nav>
                <b-navbar-nav class="ml-auto">
                  <b-nav-form>
                    <b-form-input
                      class="mr-2 border-light-blue br-25 px-4"
                      autocomplete="off"
                      placeholder="Search"
                    ></b-form-input>
                  </b-nav-form>
                  <div
                    class="
                      bg-white
                      br-25
                      mr-4
                      px-3
                      d-flex
                      border border-light-blue
                    "
                  >
                    <b-icon-person class="m-auto"></b-icon-person>
                  </div>
                </b-navbar-nav>
              </b-navbar>
              <div
                class="px-4 pt-4 admin-content"
                style="min-height: calc(100vh - 77px)"
              >
                <slot />
              </div>
            </div>
          </div>
        </div>
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
  apiSchemas: allApiSchema {
    edges {
      node {
        id
        key        
        data
        path
      }
    }
  }
}
</static-query>

<script>
import axios from "axios";

export default {
  props: ["title"],
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
      var apiSchemas = Object.entries(this.$static.apiSchemas.edges);
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
      for (const [key, value] of apiSchemas) {
        if (
          value.node.data.toLowerCase().includes(this.search.toLowerCase()) ||
          value.node.key.toLowerCase().includes(this.search.toLowerCase())
        ) {
          this.searchResults[value.node.id] = value;
        }
      }
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

.admin-main {
  background: linear-gradient(180deg, #f4f8ff, rgb(242 245 255)) !important;
}

.admin-content {
}

.mainContent {
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

.admin-sidebar {
}

.admin-sidebar .btn.bg-white:hover,
.admin-sidebar .btn.bg-white.active {
  color: royalblue;
  background: #f4f8ff !important;
}

.admin-sidebar .btn.bg-white:hover {
  border-color: rgba(65, 105, 225, 0.089);
}

#settings-button {
  background: rgba(255, 255, 255, 0.2) !important;
  position: absolute;
  bottom: 0px;
  left: 8px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Jost", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif !important;
  letter-spacing: 0.75px;
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
  width: 350px !important;
}
@media (max-width: 768px) {
  #nav-middle {
    margin-top: 20px !important;
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
  background: linear-gradient(90deg, #d9e4f5, #fff 50%) !important;
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

#navbar:hover,
#navbar:focus-within {
  background-position-x: 0% !important;
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
  background: #f1f8ff !important;
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
  box-shadow: 0px 8px 20px rgba(0, 100, 150, 0.2);
}
.raisedTop {
  box-shadow: 0px -20px 20px rgba(0, 50, 70, 0.2);
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

.nav-icon-container svg {
  opacity: 0.5;
  color: rgb(5, 22, 75);
  margin-right: 35px !important;
}

.nav-icon-container:hover {
  color: royalblue;
  background: #f4f8ff !important;
}

.nav-icon-container:hover svg {
  color: royalblue;
  opacity: 1;
}

.admin-page h1,
.admin-page h2,
.admin-page h3,
.admin-page h4,
.admin-page h5,
.admin-page h6 {
  font-family: "Open Sans" !important;
  font-weight: 400;
}

@media (max-width: 1300px) {
  .admin-sidebar .nav-icon-container svg {
    margin-left: calc(50% - 10px);
  }
  .nav-icon-label {
    display: none;
  }
}

.admin-page .card.raised {
  box-shadow:0px 10px 20px rgba(0,0,75,0.075);
}
</style>