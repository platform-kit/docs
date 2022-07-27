<!-- Please remove this file from your project -->
<template>
  <b-navbar
    id="navbar-main"
    toggleable="lg"
    :type="type"
    :variant="variant"
    :class="classes"
  >
    <div style="width: 25%; float: left">
      <div class="brand-container">
        <b-navbar-brand href="/">
          <img :src="logo" alt="Logo" class="navbar-icon" />
          {{ siteName }}</b-navbar-brand
        >
      </div>
    </div>

    <b-collapse id="nav-collapse" is-nav>
      <div style="width: 50%; display: contents" class="mx-auto">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto mb-2 mb-md-0 mt-2 mt-md-0">
          <div id="navbar-search-form">
            <b-input-group id="navbar-search-input-group">
              <b-form-input
                @input="updateSearch"
                @change="updateSearch"
                v-model="search"
                autocomplete="off"
                size="sm"
                class="navbar-search-input"
                placeholder="Search"
              ></b-form-input>
              <b-button
                v-if="search != null && search != ''"
                @click="
                  search = null;
                  updateSearch();
                "
                size="sm"
                class="my-0 navbar-search-button"
                type="submit"
                ><b-icon-x scale="1"></b-icon-x
              ></b-button>
              <b-button
                v-if="search == null || search == ''"
                scale="0.75"
                size="sm"
                class="my-0 navbar-search-button"
                type="submit"
                ><b-icon-search scale="0.75"></b-icon-search
              ></b-button>
            </b-input-group>
          </div>
        </b-navbar-nav>
      </div>
      <b-navbar-nav
        class="d-none d-md-block navbar-nav-right"
        style="float: right; padding-left: 23px; text-align: right; width:33%"
      >
        <b-nav-item :href="links.github"
          class="icon-button px-3 px-md-1 text-dark d-block"
          style="float: right"
          ><b-icon-github></b-icon-github
        ></b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-toggle
      target="nav-collapse"
      style="position: absolute; top: 10px; right: 10px; border: none"
    ></b-navbar-toggle>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: ["variant", "type", "classes", "category", "page"],
  data() {
    return {
      logo: "/icon.png",
      siteName: "PlatformKit Docs",
      search: null,
      links: {
        github: null
      }
    };
  },
  async mounted(){    
    this.links.github = process.env.GITHUB_URL;
  },
  methods: {
    updateSearch: function (value) {
      this.$emit("updateSearch", value);
    },
  },
};
</script>

<style scoped>
.layout {
  min-width: 100%;
  background: linear-gradient(rgb(218 234 255), #fff);
}

.br-10 {
  border-radius: 10px;
}

.navbar-icon {
  max-height: 30px;
  margin-right: 5px;
  border-radius: 4px;
}

.navbar-search-input {
  border-radius: 15px !important;
  padding-left: 15px;
  border: none !important;
  background: #ecf1f5 !important;
  min-width: 300px;
}

@media (max-width: 991px) {
  #navbar-search-form {
    min-width: 100%;
  }

  .navbar-search-input {
    width: calc(100% - 10px);
    height: 31px;
  }
}

.navbar-search-button {
  border-radius: 0px 15px 15px 0px;
  padding-right: 10px;
  padding-left: 7px;
  width: 40px;
  border: none !important;
  background: #ecf1f5 !important;
  color: #000 !important;
  position: absolute;
  right: 0px;
  top: 0px;
  height: 31px;
  z-index: 999;
}

@media (min-width: 991px) {
  .navbar-search-button {
    margin-right: -5px;
  }
}

.navbar-search-button:hover {
  background: rgb(210, 219, 231) !important;
}

#navbar-search-input-group {
  border-radius: 15px;
  margin-left: 5px;
  width: calc(100% - 10px);
  height: 31px;
  transition: all 0.3s;
}

#navbar-search-input-group:hover {
  box-shadow: 0px 3px 20px rgba(0, 50, 100, 0.1),
    0px 7px 10px rgba(0, 50, 100, 0.2) !important;
}

#navbar-main {
  border-bottom: 1px solid rgb(221, 223, 239);
}

@media (min-width: 991px) {
  .brand-container {
    float: right;
    width: 268px;
    text-align: left;
  }
}

.icon-button {
  background: #fff;
  border-radius: 5px;
  transition:all 0.3s;
}
.icon-button:hover {
  background: #ecf1f5;
  border-radius: 5px;
}

.navbar-nav-right {
  width: 25%;
}

@media (max-width: 991px) {
  .navbar-nav-right {
    width: 100%;
    text-align: center;
  }
}
</style>