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
          style="max-width: 221px; float: right"
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
        <nuxt-content class="pt-2" :document="content"></nuxt-content>
        <div class="w-100 pt-5 pb-4 border-top mt-5 text-center" id="footer">
          <h5 class="w-100 text-center">Was this page helpful?</h5>
          <vue-feedback-reaction
            style="margin-left: -15px"
            :labels="['Terrible', 'Bad', 'Okay', 'Good', 'Great']"
            class="mx-auto mb-3 feedback-component"
            :v-model="feedback"
            @input="sendAnalyticEvent('feedback')"
          />
        </div>
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
            v-if="content.readingTime != null"
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-clock style="opacity: 0.5" class="mr-2"></b-icon-clock
              >{{ Math.ceil(content.readingTime) }} Minute Read</span
            ></b-nav-item
          >

          <b-nav-item
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            @click="copyURL()"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-link style="opacity: 0.5" class="mr-2"></b-icon-link>Copy
              Current URL</span
            ></b-nav-item
          >

          <b-nav-item
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            @click="download()"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-link style="opacity: 0.5" class="mr-2"></b-icon-link
              >Download PDF</span
            ></b-nav-item
          >

          <b-nav-item
            v-if="content.Website != null"
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            :href="content.Website"
            target="_blank"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon-window style="opacity: 0.5" class="mr-2"></b-icon-window
              >Website</span
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

    <client-only>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="false"
        :filename="generateFilename()"
        :paginate-elements-by-height="1100"
        :pdf-quality="2"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        :manual-pagination="false"
        @progress="onProgress($event)"
        @beforeDownload="beforeDownload($event)"
        @hasDownloaded="hasDownloaded($event)"
        ref="html2Pdf"
      >
        <template slot="pdf-content">
          <nuxt-content class="p-5" :document="content"></nuxt-content>
        </template>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DocLayout",
  props: ["content", "navOptions"],
  data() {
    return {
      feedback: null,
    };
  },
  components: {
    VueHtml2pdf: () => {
      if (process.client) {
        return import("vue-html2pdf");
      }
    },
  },
  watch: {},
  async mounted() {
    var reactionData = localStorage.getItem("feedback:" + this.content.path);
    console.log("Previous feedback: " + reactionData);
    // this.feedback = reactionData;
  },
  methods: {
    async sendAnalyticEvent(eventType) {
      this.$toast.show("Thanks for the feedback!", {
            position: "top-center",
            theme: "bubble",
            duration: 3000,
          });
      var data = {
        path: this.content.path,
        title: this.content.Title,
        extension: this.content.extension,
        url: window.location.href,
        feedback: this.feedback,
        eventType: eventType,
      };
      console.log("Analytics event: ");
      console.log(data);
      try {
        await axios
          .post(process.env.REACTION_ANALYTICS_URL, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .catch(function (error) {
            console.log("Analytics event failed.");
          })
          .then(function (response) {
            console.log(response);
            console.log(response.status);
            if (response != null && response.status == 200) {
              console.log("Analytics event succeeded.");
            } else {
              console.log("Analytics event failed.");
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    generateFilename() {
      if (this.content != null) {
        if (this.content.Title != null) {
          return this.content.Title;
        } else {
          return this.content.slug;
        }
      }
    },
    download() {
      this.$refs.html2Pdf.generatePdf();
    },
    copyURL: function () {
      var self = this;
      this.$copyText(window.location.href).then(
        function (e) {
          // alert("Copied");

          self.$toast.success("URL copied to clipboard.", {
            position: "top-center",
            theme: "bubble",
            duration: 3000,
          });
          console.log(e);
        },
        function (e) {
          // alert("Can not copy");
          console.log(e);
        }
      );
    },
    async onProgress() {
      /*
      this.$toast.info("Loading...", {
        position: "top-center",
        theme: "bubble",
        duration: 3000,
      });
      */
    },
    async hasDownload() {
      /*
      this.$toast.info("Download successful.", {
        position: "top-center",
        theme: "bubble",
        duration: 3000,
      });
      */
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      var self = this;
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          self.$toast.info("Downloading.", {
            position: "top-center",
            theme: "bubble",
            duration: 3000,
          });
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(
              "Page " + i + " of " + totalPages,
              pdf.internal.pageSize.getWidth() * 0.88,
              pdf.internal.pageSize.getHeight() - 0.3
            );
          }
        })
        .save();
    },
  },
};
</script>

<style scoped>
.doc-layout {
  min-width: 100%;
}

.main-content {
  border-left: 2px solid rgba(221, 223, 239, 0.5);
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
  background: rgb(255 255 255);
  box-shadow: 0px 8px 10px rgb(0 50 150 / 10%);
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

.main-content h1 {
  disply: none !important;
}

.html2pdf__page-break {
  margin: 0 !important;
}

@media(max-width:991px){
.feedback-component{
  transform:scale(0.8);
  margin-left:-5px !important;
}
}
</style>