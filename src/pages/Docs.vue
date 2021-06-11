<template>
  <Layout>
    <docs-layout v-if="docs != null" :content="docs[0].node.content">
      <template v-slot:sidebar v-if="docs[0].node.headings.length > 1">
        <div>On This Page</div>
        <span
          class="mt-3 mb-2"
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
          v-for="(heading, index) in docs[0].node.headings"
          :key="index"
          style="letter-spacing: 1px"
        >
          <a
            :href="heading.anchor"
            v-if="index != 0"
            class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left"
          >
            {{ heading.value }}
          </a>
        </div>
      </template>
    </docs-layout>
  </Layout>
</template>

<static-query>
query{
 docs: allDoc(sortBy: "path") {
    edges {
      node {
        id                
        path
        title
        content
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
import DocsLayout from "../components/DocsLayout.vue";

export default {
  components: {
    DocsLayout,
  },
  metaInfo: {
    title: "Docs",
  },
  data() {
    return {
      uiSettings: {},
      docs: null,
    };
  },
  async mounted() {
    this.docs = this.$static.docs.edges;
    this.sortDocs();
  },
  methods: {
    sortDocs() {
      var docs = this.docs;
      docs = docs.sort(function compareFn(firstEl, secondEl) {
        if (firstEl.node.fileInfo.name[0] < secondEl.node.fileInfo.name[0]) {
          return -1;
        } else if (
          firstEl.node.fileInfo.name[0] > secondEl.node.fileInfo.name[0]
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      this.docs = docs;
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
</style>
