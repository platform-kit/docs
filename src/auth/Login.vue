<template>
  <Layout :hideheader="true">
    <div
      class="bg-light-blue-gradient w-100 h-100 row m-0 pr-0 mr-0 text-center"
    >
      <div class="m-auto" id="login-container">
        <div class="pb-5">
          <h4 class="mx-auto mb-5 text-center o-50" style="color: royalblue">
            Sign In
          </h4>
          <b-card
            class="raised border-0 mx-auto mb-5 br-10"
            style="max-width: 400px; min-height: 350px; min-width: 350px"
          >
            <b-navbar-brand
              href="/"
              id="navLogo"
              class="mx-auto text-center w-100 pt-2 pb-3 my-auto"
              style="width: auto"
            >
              <g-image
                v-if="
                  uiSchema != null &&
                  uiSchema.icons != null &&
                  uiSchema.icons.favicon != null
                "
                :src="uiSchema.icons.favicon"
                style="max-width: 75px"
                class="d-inline"
              />
              <g-image
                v-else
                src="~/images/icon.png"
                style="max-width: 75px"
                class="d-inline"
              />
            </b-navbar-brand>
            <div v-if="validatingToken == true">
              <div v-if="user != {} && user.data != null">
                <p class="card-text mb-4">Login successful.</p>
                <b-icon-check-circle
                  class="text-success mt-3"
                  scale="2"
                ></b-icon-check-circle>
                <br />
                <a
                  :href="redirectAfterLogin()"
                  class="btn btn-outline-dark btn-block mt-5"
                >
                  Continue
                </a>
              </div>
              <div
                v-else-if="user != {} && user.data == null && hasError == false"
              >
                <p class="card-text mb-4">Signing in...</p>
                <b-icon
                  class="mt-2"
                  icon="arrow-clockwise"
                  animation="spin"
                  font-scale="2"
                ></b-icon>
                <br />
                <a href="/" class="btn btn-outline-dark btn-block mt-5">
                  Continue
                </a>
              </div>

              <div v-else>
                <p class="card-text mb-4">Something went wrong.</p>
                <b-icon-x-circle
                  class="text-danger mt-3"
                  scale="2"
                ></b-icon-x-circle>
                <br />
                <a
                  @click="
                    results = null;
                    email = null;
                    validatingToken = null;
                    user = null;
                  "
                  class="btn btn-outline-dark btn-block mt-5"
                >
                  Try Again
                </a>
              </div>
            </div>
            <div v-else-if="results == null && processing != true">
              <p class="card-text mb-4">Enter your e-mail to continue.</p>
              <b-input-group>
                <template #prepend>
                  <b-input-group-text
                    style="
                      background: #fff;
                      max-height: 38px !important;
                      margin-top: 8px;
                      border-radius: 5px 0px 0px 5px;
                    "
                    class="raised"
                    ><strong class="text-dark m-0" style="font-size: 75%"
                      ><b-icon-envelope
                        class="o-50"
                        style="color: royalblue"
                      ></b-icon-envelope></strong
                  ></b-input-group-text>
                </template>
                <b-input
                  autocomplete="off"
                  :placeholder="exampleEmail()"
                  name="email"
                  v-model="email"
                  class="my-2 raised"
                  style="border-radius: 0px 5px 5px 0px"
                ></b-input>
              </b-input-group>
              <div class="mt-4 btn-group btn-block">
                <g-link :to="'/'" exact class="btn btn-outline-danger mt-2">
                  Back <b-icon-x-circle class="ml-2"></b-icon-x-circle>
                </g-link>
                <div class="btn btn-outline-primary mt-2" @click="submit()">
                  Next <b-icon-arrow-right class="ml-2"></b-icon-arrow-right>
                </div>
              </div>
            </div>
            <div v-else-if="processing == true">
              <p class="card-text mb-4">Loading, please wait...</p>

              <b-icon
                class="mt-2"
                icon="arrow-clockwise"
                animation="spin"
                font-scale="2"
              ></b-icon>
            </div>
            <div v-else>
              <p class="card-text mb-4">{{ results.data.message }}</p>
              <b-icon-check-circle
                class="text-success mt-3"
                scale="2"
              ></b-icon-check-circle>
              <br />
              <a
                @click="
                  results = null;
                  email = null;
                "
                class="btn btn-outline-dark btn-block mt-5"
              >
                Go Back
              </a>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </Layout>
</template>


<script>
import Layout from "../layouts/Default.vue";
import axios from "axios";

export default {
  components: {
    Layout,
  },
  metaInfo: {
    title: "Sign In",
  },
  data() {
    return {
      validatingToken: null,
      hasError: false,
      email: null,
      processing: null,
      results: null,
      uiSettings: {},
      uiSchema: null,
      window: null,
      redirect: null,
      user: {},
    };
  },
  async mounted() {
    this.getUiSchema();
    this.window = window;
    var token = this.getUrlVars()["token"];
    var redirect = this.getUrlVars()["redirect"];
    this.redirect = redirect;
    if (typeof token != "undefined") {
      this.validatingToken = true;
      await this.callApi({
        function: "platformkit-auth-validate-token-v1",
        token: token,
      });
    }
  },
  methods: {
    exampleEmail(){
      var emails = [
        "tony.stark@example.com", 
        "john.snow@example.com",
        "thomas.anderson@example.com",                            
      ];
      const random = Math.floor(Math.random() * emails.length);
      return emails[random];

    },
    redirectAfterLogin() {
      var redirect = decodeURIComponent(this.redirect);
      if (redirect != null) {
        if (redirect == "auth/login") {
          return "/";
        } else {
          return "/" + decodeURIComponent(redirect);
        }
      } else {
        return "/";
      }
    },
    getUrlVars() {
      var vars = {};
      var parts = this.window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    saveUser(data) {
      this.user.data = data.data;
      this.user.token = data.token;
      var user = this.user;
      this.$store.commit("updateUser", this.user);
      this.user = {};
      this.user = user;
    },
    async callApi(input) {
      var self = this;
      try {
        var url = "/api/" + input.function + "?token=" + input.token;
        await axios
          .get(url)
          .then((response) => self.saveUser(response.data))
          .catch(function (error) {
            self.hasError = true;
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async submit() {
      this.processing = true;
      try {
        var url = "/api/platformkit-auth-request-token-v1?email=" + this.email;
        if (this.redirect != null) {
          url = url + "&redirect=" + this.redirect;
        }
        const results = await axios.get(url);

        console.log(results);
        if (results.status == 200) {
          this.results = results;
          this.processing = false;
        }
      } catch (error) {
        console.log(error);
        this.processing = false;
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
  },
};
</script>

<style>
@media (min-width: 991px) {
  #login-container {
    width: 550px;
  }
  #login-container .card {
    padding: 10px 25px 25px 25px !important;
  }
}
</style>
