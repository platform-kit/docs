// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex'
import { mapGetters } from 'vuex'

// UI Components
import DefaultLayout from '~/layouts/Default.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' // Bootstrap-Vue
import 'bootstrap/dist/css/bootstrap.css'                 // Bootstrap-Vue
import 'bootstrap-vue/dist/bootstrap-vue.css'             // Bootstrap-Vue


// API Components
import axios from 'axios'              // Axios

export default function (Vue, { appOptions }) {

  // Vuex (State Management / Core Business Logic)
  Vue.use(Vuex);

  appOptions.store = new Vuex.Store({
    state: {
      user: {},
      uiSchema: null,
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      }
    },
    mutations: {
      initialiseStore(state) {
        if (process.isClient) {
          if (localStorage.getItem('user')) {
            state.user = JSON.parse(localStorage.getItem('user'));
          }
          if (localStorage.getItem('uiSchema')) {
            state.uiSchema = JSON.parse(localStorage.getItem('uiSchema'));
          }
        }
      },
      updateUser(state, payload) {
        if (process.isClient) {
          state.user = payload;
          localStorage.setItem('user', JSON.stringify(payload));
        }
      }
    },
    getters: {
      async getUISchema(state) {
        var results = null;
        try {
          results = await axios.get("/temp/ui-schema.json");
          state.uiSchema = results.data;
        } catch (error) {
          console.log(error);
        }
        return results;
      },
      getUser(state) {
        if (process.isClient) {
          if (localStorage.getItem('user')) {
            state.user = JSON.parse(localStorage.getItem('user'));
          }
          return state.user;
        }
      }
    }
  })

  const helperMethods = {
    helperMethod(input) {
      return input || '123';
    },
    async getUISchema(input) {
      var results = null;
      try {
        results = await axios.get("/temp/ui-schema.json");
        results = results.data;
      } catch (error) {
        console.log(error);
      }
      return results;
    },
    async getDocsCollection(input) {
      var results = null;

      function extractRepoDirectory(element, index, array) {
        console.log("XXXXXXXXXXXX");
        if (element.name == input) {
          results = element;
        }
      }

      var uiSchema = await this.getUISchema();
      var collections = uiSchema.docs?.collections;

      collections.forEach((element, index) =>
        extractRepoDirectory(element, index, uiSchema.docs.collections)
      );
      return results;
    },
  }

  appOptions.store.methods = helperMethods;


  // Apply Components

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Bootstrap Vue
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin)

}
