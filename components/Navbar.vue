<!-- Please remove this file from your project -->
<template>
  <b-navbar
    id="navbar-main"
    toggleable="lg"
    :type="type"
    :variant="variant"
    :class="classes"
  >
    <div class="navbar-left-container" style="float: left">
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
                ref="searchinput"
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
              <div id="navbar-search-input-label">Esc</div>
            </b-input-group>
          </div>
        </b-navbar-nav>
      </div>            
        <b-nav-item
          href="/"
          class="d-block d-md-none w-100 mobile-nav-links icon-nav-link"
        >
          <b-icon-book class="mr-2 text-dark" scale="0.5"></b-icon-book>Content
        </b-nav-item>  
        <b-navbar-nav
          class="navbar-nav-right mobile-nav-links-container"
          style="
            padding-left: 19px;
            text-align: left;
            border-left: 1px solid #eee !important;
          "
        >
         
          <b-nav-item
            href="/#/saved"
            class="
              icon-button-alt
              px-3 px-md-1
              text-dark text-center
              d-none d-md-inline-block
              mr-2
            "
            style="width: 50px"
            ><b-icon-bookmark></b-icon-bookmark
          ></b-nav-item>
         
          
             <b-nav-item
            href="/"
            class="
              icon-button-alt
              px-3 px-md-1
              text-dark text-center
              d-none d-md-inline-block
              mr-2
            "
            style="margin-left: -3px; width: 50px"
            ><b-icon-house></b-icon-house
          ></b-nav-item>
          
          <div v-if="navOptions != null">
            <b-nav-item
              v-for="(navLink, index) in navOptions"
              :key="index"
              :href="'/#/' + navLink.slug"
              class="d-block d-md-none w-100 mobile-nav-links"
            >
              {{ navLink.Title }}
            </b-nav-item>
             <b-nav-item
            :href="links.github"
            v-if="links.github != null"
            class="
              icon-button-alt
              px-3 px-md-1
              text-dark text-center
              d-none d-md-inline-block
            "
            style="width: 50px"
            ><b-icon-github></b-icon-github
          ></b-nav-item>
           <b-nav-item
              v-if="authUrl != null && user == null"              
              @click="signIn()"
            class="
              icon-button-alt
              px-3 px-md-1
              text-dark text-center
              d-none d-md-inline-block
            "
            style="width: 105px"
            >
            <div><b-icon-person class="mr-2"></b-icon-person>Sign In</div>            
          </b-nav-item>
          
          <b-nav-item-dropdown
            v-if="authUrl != null && user != null"
              class="icon-button-alt
              px-3 px-md-1
              text-dark text-center
              d-none d-md-inline-block"
              id="my-nav-dropdown"
              text="Account"              
              toggle-class="nav-link-custom"
              style="width:105px;"
              right
            >
              <b-dropdown-item disabled><b-avatar :text="user.email[0]" style="margin-left:-5px; margin-right:5px;height:20px;width:20px;"></b-avatar> {{ user.email }}</b-dropdown-item>              
              <b-dropdown-item class="text-center">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          
        </b-navbar-nav>
        <b-nav-item
          href="/#/saved"
          class="d-block d-md-none w-100 mobile-nav-links icon-nav-link"
        >
          <b-icon-bookmark class="mr-2 text-dark" scale="0.5"></b-icon-bookmark
          >My Bookmarks
        </b-nav-item>
        
      </div>
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
  props: ["variant", "type", "classes", "category", "page", "search", "user"],
  data() {
    return {
      logo: "/icon.png",
      siteName: process.env.SITE_NAME || "PlatformKit",
      navOptions: null,
      authUrl: process.env.AUTH_URL,
      links: {
        github: null,
      },
    };
  },
  async mounted() {
    this.links.github = process.env.GITHUB_URL;
    var content = await this.$content("")
      .where({
        extension: ".md",
      })
      .sortBy("path")
      .fetch();
    var navOptions = content.filter(
      (element) => element.path.split("/")[1].includes("/") != true
    );
    this.navOptions = navOptions;
  },
  methods: {
    signIn() {
      var operand = "?";
      if (this.authUrl.includes("?")) {
        operand = "&";
      }
      var url =
        this.authUrl +
        operand +
        "redirect=" +
        encodeURIComponent(window.location.origin);
      console.log("Redirecting to: " + url);
      window.location.href = url;
    },
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
  max-height: 25px;
  width: 25px;
  height: 25px;
  margin-left: 8px;
  margin-right: 1px;
  margin-top: -5px;
  border-radius: 4px;
}

.navbar-search-input {
  border-radius: 15px !important;
  padding-left: 15px;
  border: none !important;
  background: rgb(239, 243, 249) !important;
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

#navbar-search-input-label {
  border-radius: 4px;
  border: 1px solid rgba(0, 50, 100, 0.2);
  position: absolute;
  z-index: 1000;
  right: 30px;
  font-size: 12px;
  padding: 0px 4px;
  top: 5px;
  margin-right: 2px;
  float: right;
}

@media (max-width: 991px) {
  #navbar-search-input-label {
    margin-right: 5px;
  }
}

.navbar-search-button {
  box-shadow: none !important;
  border-radius: 0px 15px 15px 0px;
  padding-right: 10px;
  padding-left: 7px;
  width: 40px;
  border: none !important;
  background: rgb(239, 243, 249) !important;
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
  /* background: rgb(210, 219, 231) !important; */
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
  z-index: 10;
  border-bottom: 0px solid rgb(221, 223, 239);
  box-shadow: 0px 4px 10px rgb(0 120 200 / 15%),
    0px 8px 80px rgb(0 120 200 / 15%) !important;
}

@media (min-width: 991px) {
  #navbar-main {
    padding: 15px;
  }
  .brand-container {
    float: right;
    width: 231px;
    text-align: left;
  }
}

.icon-button {
  background: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  border-left: rgb(0, 50, 100, 0.1) 2px solid;
  border-bottom: rgb(0, 50, 100, 0.1) 2px solid;
}
.icon-button:hover {
  background: #ecf1f5;
  border-radius: 5px;
}

.icon-button-alt {
  background: rgb(239 243 248);
  border-radius: 5px;
  transition: all 0.3s;
  border: none;
}
.icon-button-alt:hover {
  box-shadow: 0px 3px 20px rgba(0, 50, 100, 0.1),
    0px 7px 10px rgba(0, 50, 100, 0.2) !important;
}

.icon-button-alt svg {
  color: #000;
}

.navbar-nav-right {
  width: calc(33% - 4px);
}

@media (max-width: 991px) {
  .navbar-nav-right {
    width: 100% !important;
    text-align: center;
    margin-left: 13px;
  }
}

code {
  background: rgb(239, 243, 249) !important;
}

.navbar-left-container {
  width: 25%;
}
@media (min-width: 991px) {
  .navbar-left-container {
    width: calc(25% - 6px);
  }
  .navbar-brand {
    border-right: 2px solid #eee !important;
    width: 100%;
  }
}

.icon-nav-link a {
  padding-left: 0px !important;
  margin-left: 11px;
  color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 991px) {
  .mobile-nav-links-container {
    margin-left: 20px !important;
  }
}
</style>