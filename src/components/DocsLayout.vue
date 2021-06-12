<template>
  <div class="docs-page pb-5 mb-2">
    <div
      class="btn btn-dark d-inline d-md-none raised"
      v-b-modal.docs-modal
      style="
        cursor:pointer;
        z-index: 99;
        position: fixed !important;
        bottom: 15px !important;
        left: 15px;
        float: left;
      "
    >
      <b-icon-list></b-icon-list> <span class="ml-2">Navigation</span>
    </div>
    <div class="container-fluid h-md-100">
      <div class="row h-md-100 w-100 mx-auto" style="max-width: 1350px">
        <div
          class="col-lg-2 h-md-100 d-none d-md-inline-block border-right"
          style="overflow: scroll"
        >
          <div class="px-3 pb-2 pt-4 mt-5 pt-5">
            <docsNav></docsNav>
          </div>
        </div>
        <div class="col-lg-8 pt-5 px-2 px-md-5 mt-5">
          <div v-if="content != null" v-html="content"></div>
          <slot v-else name="content" ></slot>
        </div>
        <div
          class="col-lg-2 h-md-100 pt-5 mt-5 d-none d-md-inline-block border-left"                    
        >
          <slot name="sidebar" ></slot>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DocsNav from "~/components/DocsNav.vue";

export default {
  name: "DocsPage",
  props: ["content", "sidebar"],
  components: {
    DocsNav,
  },
  data() {
    return {
      uiSettings: {},
      apiSchema: {},
    };
  },
  async mounted() {
    this.getApiSchema();
  },
  methods: {
    async getApiSchema() {
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
    showDocsNavModal(id) {
      this.$bvModal.show("modal-docsNav");
    },
  },
};
</script>

<style>
#docs-nav .btn:hover {
  background-color: #f0f6ff !important;
}
#docs-nav .badge-light-blue {
  background: rgba(0, 50, 100, 0.05);
}

.docs-page ul p {
  margin-bottom:0px !important;
}

.docs-page h1:first-of-type{
  margin-bottom:20px;
}
.docs-page h1 {
  font-size: 2rem;
  text-align: center;
}
.docs-page h2,
.docs-page h3,
.docs-page h4,
.docs-page h5,
.docs-page h6 {
  opacity: 0.95;
  color: royalblue;
  margin: 25px 0px;
}

.language-diff {
  color:green;
  background-color:#edfff5;
  padding:3px;
  border-radius:3px;
}
</style>
