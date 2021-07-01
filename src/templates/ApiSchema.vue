<template>
  <Layout :title="'API Schema'">
    <docs-layout
      v-bind:class="{
        loading: uiSettings.loading == true,
        loaded: uiSettings.loading != true,
      }"
      :time="uiSettings.componentKey"
      :title="apiSchema.key"
    >
      <template v-slot:sidebar>
        <div v-for="(s, index) in $page.allApiSchema.edges" :key="index">
          <div v-if="slug == s.node.key">
            <div>On This Page</div>
            <span
              class="my-3"
              style="
                width: 100px;
                background: #007bff;
                opacity: 0.25;
                height: 4px;
                border-radius: 4px;
                display: inline-block;
              "
            ></span>
            <div
              v-for="(endpoint, index) in Object.entries(
                JSON.parse(s.node.data, null, 3)
              )"
              :key="index"
            >
              <span
                v-if="endpoint[0] == 'browse'"
                style="letter-spacing: 1px"
                class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
              >
                Browse</span
              >
              <span
                v-if="endpoint[0] == 'read'"
                style="letter-spacing: 1px"
                class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
                >Read</span
              >
              <span
                v-if="endpoint[0] == 'add'"
                style="letter-spacing: 1px"
                class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
                >Add</span
              >
              <span
                v-if="endpoint[0] == 'edit'"
                style="letter-spacing: 1px"
                class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
                >Edit</span
              >
              <span
                v-if="endpoint[0] == 'delete'"
                style="letter-spacing: 1px"
                class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
                >Delete</span
              >
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div v-for="(s, index) in $page.allApiSchema.edges" :key="index">
          <div v-if="slug == s.node.key">
            <h1 class="text-capitalize">
              {{ humanizeResourceName(s.node.key) }}
            </h1>
            <div
              v-for="(endpoint, index) in Object.entries(
                JSON.parse(s.node.data, null, 3)
              )"
              :key="index"
            >
              <span class="badge badge-dark mb-2 px-3 py-2 text-uppercase">{{
                endpoint[0]
              }}</span>
              <span
                v-if="endpoint[0] == 'browse'"
                style="letter-spacing: 1px"
                class="badge badge-light mb-2 ml-2 px-3 py-2 text-uppercase"
                >GET &nbsp;
                <span class="o-50"
                  >/ api / {{ s.node.key }} / browse</span
                ></span
              >
              <span
                v-if="endpoint[0] == 'read'"
                style="letter-spacing: 1px"
                class="badge badge-light mb-2 ml-2 px-3 py-2 text-uppercase"
                >GET &nbsp;
                <span class="o-50">/ api / {{ s.node.key }} / {id}</span></span
              >
              <span
                v-if="endpoint[0] == 'add'"
                style="letter-spacing: 1px"
                class="badge badge-light mb-2 ml-2 px-3 py-2 text-uppercase"
                >POST &nbsp;
                <span class="o-50">/ api / {{ s.node.key }}</span></span
              >
              <span
                v-if="endpoint[0] == 'edit'"
                style="letter-spacing: 1px"
                class="badge badge-light mb-2 ml-2 px-3 py-2 text-uppercase"
                >POST &nbsp;
                <span class="o-50">/ api / {{ s.node.key }} / {id}</span></span
              >
              <span
                v-if="endpoint[0] == 'delete'"
                style="letter-spacing: 1px"
                class="badge badge-light mb-2 ml-2 px-3 py-2 text-uppercase"
                >DELETE &nbsp;
                <span class="o-50">/ api / {{ s.node.key }} / {id}</span></span
              >

              <br />
              <b-card
                bg-variant="dark"
                text-variant="white"
                class="api-schema-card mb-2"
              >
                <template #header>
                  <span class="o-60">Input Validation Rules</span>
                </template>
                <code>
                  <pre
                    class="text-light mb-0"
                    v-if="endpoint[1]['input_validation_rules'] != null"
                    >{{ endpoint[1]["input_validation_rules"] }}</pre
                  >
                </code>
              </b-card>
            </div>
            <div class="mt-2">
              For more info on the validation rules, see the documentation for
              <a
                href="https://www.npmjs.com/package/validatorjs"
                target="_blank"
                >ValidatorJS</a
              >.
            </div>
          </div>
        </div>
      </template>
    </docs-layout>
  </Layout>
</template>

<page-query>
query($id: ID)  {  
  allApiSchema {
    edges {
      node {
        id
        key
        data
      }
    }
  }
  apiSchema(id: $id) {      
    id
    key
    data    
  }
}
</page-query>

<script>
import axios from "axios";
import DocsLayout from "../components/DocsLayout.vue";

export default {
  components: {
    DocsLayout,
  },
  metaInfo() {
    return {
      title: this.capitalize(this.getSchemaKey()) + " API Schema ",
      /* meta: [{ name: "description", content: '...' }], */
    };
  },
  data() {
    return {
      uiSettings: {
        loading: true,
        componentKey: 0,
      },
      apiSchema: {},
      slug: null,
      window: null,
      schema: {},
    };
  },
  watch: {
    async $route(to, from) {
      this.uiSettings.loading = true;
      this.forceRerender();
      this.getApiSchema();
      try {
        this.window = window;
        this.slug = this.window.location.href.substring(
          this.window.location.href.lastIndexOf("/") + 1
        );
      } catch (err) {}

      this.getSchema();
      this.uiSettings.loading = false;
      console.log(this.$page);
    },
  },
  async mounted() {
    try {
    this.uiSettings.loading = true;
    this.getApiSchema();
    this.window = window;
    this.slug = this.window.location.href.substring(
      this.window.location.href.lastIndexOf("/") + 1
    );
    this.getSchema();
    this.uiSettings.loading = false;
    console.log(this.$page);
    } catch (err){}
  },
  methods: {
    forceRerender() {
      this.uiSettings.componentKey += 1;
    },
    getSchemaKey() {
      if (this.slug != null) {
        return this.slug;
      } else {
        return "";
      }
    },
    capitalize(s) {
      s = s.replace(/_/g, " ");
      return s
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    },
    async getSchema() {
      await this.getApiSchema();
      this.schema = this.apiSchema.schemas[this.slug];
    },
    async getApiSchema() {
      var self = this;
      try {
        const results = await axios.get("/temp/api-schema.json");
        this.apiSchema = results.data;
      } catch (error) {
        console.log(error);
      }
    },
    humanizeResourceName(input) {
      return input.replace(/_/g, " ");
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}

#docs-sidebar.dark-mode {
  background: linear-gradient(#384754, #1f2830) !important;
}
#docs-sidebar {
  border-right: 1px solid rgba(0, 50, 150, 0.1);
}

.api-schema-card .card-header {
  background: rgb(41 43 51) !important;
}
</style>
