<!-- Please remove this file from your project -->
<template>
  <div class="doc-layout container-fluid" v-if="content != null">
    <div class="row bg-white">
      <div
        class="col-3 main-left-nav d-none d-md-inline-flex"
        style="margin: 0px; min-height: calc(100vh - 58px)"
      >
        <b-nav
          v-if="navOptions != null"
          vertical
          class="w-100 ml-auto"
          style="max-width: 220px; float: right"
        >
          <b-nav-item
            :href="'#/' + link.slug"
            v-for="(link, index) in navOptions"
            :key="index"
            class="mb-2 mt-2 main-left-nav-item"
            :class="{ active: link.slug == content.slug }"
            @click="content = link"
          >
            <b-icon-caret-right-fill
              scale="0.6"
              v-if="link.slug == content.slug"
              style="
                float: left;
                margin-top: 2px;
                margin-left: -50px;
                margin-right: 30px;
              "
            ></b-icon-caret-right-fill>
            <b-icon
              scale="0.75"
              class="mr-2"
              style="opacity: 0.5"
              :icon="link.Icon || 'book'"
            ></b-icon
            >{{ link.Title || link.slug }}
          </b-nav-item>
        </b-nav>
      </div>
      <div
        class="col-12 col-md-6 main-content px-3 px-md-5 py-2"
        style="margin: 0px; min-height: calc(100vh - 58px)"
      >
        <nuxt-content :document="content"></nuxt-content>
      </div>
      <div
        class="col-3 main-right-nav d-none d-md-inline-flex"
        style="margin: 0px; min-height: calc(100vh - 58px)"
      >
        <b-nav
          v-if="content.toc != null"
          vertical
          class="w-100 mr-auto"
          style="max-width: 222px; float: left"
        >
          <b-nav-item
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            @click="copyURL()"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-link style="opacity: 0.5" class="mr-2"></b-icon-link>Copy
              Link</span
            ></b-nav-item
          >

          <b-nav-item
            v-if="content.Repository != null"
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            :href="content.Repository"
            target="_blank"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-code-slash
                style="opacity: 0.5"
                class="mr-2"
              ></b-icon-code-slash
              >Get The Source Code</span
            ></b-nav-item
          >

          <b-nav-item
            style="height: 42px; pointer-events: none"
            class="mb-2 mt-2 main-right-nav-item"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-card-list
                style="opacity: 0.5"
                class="mr-2"
              ></b-icon-card-list
              >On This Page</span
            ></b-nav-item
          >
          <b-nav-item
            v-for="link in content.toc"
            :key="link.id"
            style=""
            class="mb-2 mt-2 main-right-nav-item"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
          >
            <NuxtLink class="text-dark" :to="`#${link.id}`">
              <b-icon-arrow90deg-right
                flip-v
                scale="0.66"
                style="margin-top;3px;opacity:0.5;"
                class="caret"
                v-if="link.depth === 3"
              ></b-icon-arrow90deg-right
              >{{ link.text }}</NuxtLink
            >
          </b-nav-item>
        </b-nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocLayout",

  props: ["content", "navOptions"],
  methods: {
    copyURL: function () {
      this.$copyText(window.location.href).then(
        function (e) {
          alert("Copied");
          console.log(e);
        },
        function (e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
  },
};
</script>

<style scoped>
.doc-layout {
  min-width: 100%;
}

.main-content {
  border-left: 1px solid rgba(221, 223, 239, 0.75);
  border-right: 1px solid rgba(221, 223, 239, 0.75);
  background: #fff !important;
}


.main-left-nav {
  background: rgb(245, 247, 249);
}
.main-right-nav {
  background: #fff;
}

.main-left-nav,
.main-right-nav {
  padding-top: 7px !important;
}

.main-left-nav-item:hover {
  background: rgb(0, 50, 100, 0.1) !important;
}

.main-left-nav-item,
.main-right-nav-item {
  transition: all 0.3s;
}

.main-right-nav-item {
  text-decoration: none;
  border-left: rgb(0, 50, 100, 0.1) 2px solid;
  border-bottom: rgb(0, 50, 100, 0.1) 2px solid;
  border-radius: 5px;
}

.main-left-nav-item {
  border-radius: 5px;
  border-left: 2px solid transparent;
}
.main-left-nav-item a {
  color: #000;
  text-decoration: none;
}

.main-left-nav-item.active {
  background: rgb(0, 50, 100, 0.05);
}

.main-left-nav-item.active a {
  color: royalblue !important;
}

.main-right-nav-item a {
  color: #444;
  text-decoration: none;
}

.main-right-nav-item:hover {
  transform: scale(1.05);
  border-left: 2px solid transparent;
  border-bottom: 2px solid transparent;
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.075),
    0px 7px 7px rgba(0, 50, 100, 0.075), 0px 5px 3px rgba(0, 50, 100, 0.05);
}

.toc2 {
  margin-left: 0px;
}
.toc3 .caret {
  margin-right: 10px;
}

.nuxt-content img {
  margin-bottom: 5px;
}
.has-icon {
  background: rgba(211, 218, 240, 0.25);
}
.has-icon svg {
  color: royalblue !important;
  opacity: 1 !important;
}

.nuxt-content img {
  max-width: 90%;
}
</style>