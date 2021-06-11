<template>
  <Layout>
    <docs-layout :content="$page.doc.content">
      <template v-slot:sidebar v-if="$page.doc.headings.length > 1">
        <div >On This Page</div>
        <span class="mt-3 mb-2" style="width:100px;background:#007bff;opacity:0.25;height:4px;border-radius:4px;display:inline-block;"></span>
        <div
          v-for="(heading, index) in $page.doc.headings"
          :key="index"
          style="letter-spacing: 1px"
        >
          <a :href="heading.anchor" v-if="index != 0" class="btn p-0 mb-2 mt-1 o-70 o-h-100 text-dark text-left">
            {{ heading.value }}
          </a>
        </div>
      </template>
    </docs-layout>
  </Layout>
</template>

<page-query>
query doc ($id: ID) {
  doc(id: $id) {  
        id        
        content
        title  
        headings {
          anchor
          value
        }      
  }  
}
</page-query>

<script>
import DocsLayout from "../components/DocsLayout.vue";

export default {
  components: {
    DocsLayout,
  },
  metaInfo: {
    title: "Docs",
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
