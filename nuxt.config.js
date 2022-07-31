import { strict as assert } from "assert";
import { stripHtml } from "string-strip-html";

function getContentDirectory() {
  var contentDirectory = "content/docs";
  if (process.env.REPO != null) {
    contentDirectory = "workspace";
    if (
      process.env.CONTENT_DIRECTORY != null &&
      process.env.CONTENT_DIRECTORY
    ) {
      contentDirectory = contentDirectory + "/" + process.env.CONTENT_DIRECTORY;
    }
  }
  console.log(contentDirectory);
  return contentDirectory;
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Docs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    REPO: process.env.REPO,
    AUTH_URL: process.env.AUTH_URL,
    GITHUB_URL: process.env.GITHUB_URL,
    FEEDBACK_ANALYTICS_URL: process.env.FEEDBACK_ANALYTICS_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-clipboard2.js",
    "~/plugins/vue-text-highlight.js",
    { src: "~/plugins/vue-html2pdf.js", mode: "client" },
    { src: "~/plugins/vue-feedback-reaction.js", mode: "client" },
    { src: "~/plugins/vue-simplemde.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa", "@nuxtjs/device"],

  bootstrapVue: {
    icons: true,
  },

  manifest: {
    name: process.env.PWA_NAME || "Docs",
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://content.nuxtjs.org/v1/
    "@nuxt/content",
    // https://www.npmjs.com/package/@nuxtjs/toast
    "@nuxtjs/toast",

    // https://vue-scrollto.netlify.app/docs
    ["vue-scrollto/nuxt", { duration: 300 }],
  ],

  content: {
    dir: getContentDirectory(),
    editor: '~/components/Editor.vue',
  },

  styleResources: {},

  hooks: {
    "content:file:beforeInsert": (document) => {
      if (document.extension === ".md") {
        if (document.Title == null) {
          var string = document.path;
          if (typeof string == "string") {
            string = string.replace("/", "");
          }
          document.Title = string;
        }
        document.output = {};
        document.output.html = document.text;
        document.output.strippedText = stripHtml(document.text).result.replace(
          /\n/g,
          " "
        );
        document.output.textWithLineBreaks = stripHtml(
          document.text
        ).result.replace(/\n/g, "<br>");
        const { time } = require("reading-time")(document.output.strippedText);
        document.readingTime = time / 60000;
      }
    },
  },

  server: {
    port: 8000,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
