<!-- Please remove this file from your project -->
<template>
  <div
    class="doc-layout container-fluid"
    v-if="content != null && content != false"
  >
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
        class="col-12 col-md-6 main-content m-0 p-0"
        style="margin: 0px; min-height: calc(100vh - 58px)"
      >
        <div
          class="w-100 p-3 text-light d-inline-block d-md-none page-nav-mobile"
        >
          <b-button-group class="w-100 article-nav">
            <b-button variant="light" v-b-modal.chapters-modal size="sm">
              <b-icon icon="card-list" class="mx-1"></b-icon>Contents
            </b-button>
            <b-button variant="light" size="sm" @click="download()">
              <b-icon icon="download" class="mx-1"></b-icon>PDF
            </b-button>
            <b-button
              variant="light"
              size="sm"
              v-if="content.Website != null"
              :href="content.Website"
              target="_blank"
            >
              <b-icon icon="link" class="mr-1"></b-icon>Website
            </b-button>
            <b-button
              variant="light"
              size="sm"
              v-if="content.Repository != null"
              :href="content.Repository"
              target="_blank"
            >
              <b-icon icon="code" class="mx-1"></b-icon>Code
            </b-button>
            <b-button
              style="
                max-width: 50px !important;
                min-width: 50px !important;
                width: 50px !important;
              "
              @click="toggleFavorite"
              v-if="content != null && content.Repository != null"
              variant="light"
              class="text-center"
              size="sm"
            >
              <b-icon
                v-if="favorite == true"
                icon="heart-fill"
                style="color: hotpink; opacity: 1; margin-left: 5px"
                class="mx-1"
              ></b-icon>
              <b-icon
                v-else
                icon="heart"
                style="color: hotpink; opacity: 1; margin-left: 5px"
                class="mx-1"
              ></b-icon>
            </b-button>
          </b-button-group>
        </div>
        <nuxt-content
          :class="{
            'with-excerpt': content.excerpt != null && this.user == null,
          }"
          class="px-3 px-md-5"
          :document="getContentOrExcerpt()"
        ></nuxt-content>
        <div
          class="pt-4 pb-0 mt-4 px-3"
          v-if="content.excerpt != null && this.user == null"
        >
          <b-card
            bg-variant="dark"
            class="text-center m-0 mb-0 px-0 pt-4 text-light br-10 raised"
            style="min-height: 50px"
          >
            <b-icon-exclamation-triangle-fill scale="1.5"
              class="mx-auto mb-3 mt-2"
            ></b-icon-exclamation-triangle-fill
            ><br />
            <p class="py-4 px-4" style="line-height: 200%">
              Sign in to continue reading the rest of this page.
            </p>
            <p class="pb-4 px-4">
              <b-button @click="signIn()" class="br-25 px-4 bg-white text-dark sign-in-button"><b-icon-person-badge class="mr-2" ></b-icon-person-badge>Sign In <b-icon-arrow-right class="ml-1" style="position:relative;top:1px;" scale="0.66"></b-icon-arrow-right></b-button>
            </p>
          </b-card>
        </div>
        <div
          class="surrounding-articles mt-4 pt-1 mb-0 border-top pt-2"
          v-if="nextPage != null"
        >
          <b-card
            v-if="nextPage != null"
            @click="goToNextPage()"
            class="mx-3 my-3 br-10 raised p-2 mb-0 next-article-card"
          >
            <span class="badge next-article-label"
              >Next Article
              <b-icon-arrow-right class="ml-2"></b-icon-arrow-right
            ></span>
            <b-card-title class="mb-2 mt-0">{{ nextPage.Title }}</b-card-title>
            <b-card-text>{{ nextPage.Description }}</b-card-text>
          </b-card>
        </div>
        <div
          v-b-visible="ctaHandler"
          class="w-100 px-0 pt-5 pb-4 border-top mt-4 text-center"
          id="footer"
        >
          <h5 class="w-100 text-center">Was this page helpful?</h5>
          <vue-feedback-reaction
            :key="content.path"
            v-model="feedback"
            :labels="['Terrible', 'Bad', 'Okay', 'Good', 'Great']"
            class="mr-auto mb-3 feedback-component"
            @input="sendAnalyticEvent('feedback', feedback)"
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
            @click="toggleFavorite"
            v-if="content != null && content.Repository != null"
            style="height: 42px"
            class="mb-2 mt-2 main-right-nav-item has-icon"
            ><span style="font-size: 75%; font-weight: 400"
              ><b-icon
                v-if="favorite == true"
                icon="heart-fill"
                style="color: hotpink !important; opacity: 1"
                class="mr-1"
              ></b-icon>
              <b-icon
                v-else
                icon="heart"
                style="color: hotpink !important; opacity: 1"
                class="mr-1"
              ></b-icon>
              Favorite</span
            ></b-nav-item
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
            v-scroll-to="'#' + link.id"
            :key="link.id"
            style=""
            class="mb-2 mt-2 main-right-nav-item"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
          >
            <a class="text-dark">
              <b-icon-arrow90deg-right
                flip-v
                scale="0.66"
                style="margin-top;3px;opacity:0.5;"
                class="caret"
                v-if="link.depth === 3"
              ></b-icon-arrow90deg-right
              >{{ link.text }}</a
            >
          </b-nav-item>
        </b-nav>
      </div>
    </div>

    <b-card
      :class="{
        'cta-visible': ctaVisible == true,
        'cta-hidden': ctaVisible == false,
      }"
      id="cta-card"
      img-left
      class="mb-3 cta br-10 p-0"
    >
      <div
        class="cta-image"
        v-if="content.CTAImage != null"
        v-bind:style="{ backgroundImage: 'url(' + content.CTAImage + ')' }"
      ></div>

      <b-button
        @click="ctaVisible = false"
        variant="light"
        class="text-danger raised cta-close-button border"
        style="
          float: right;
          position: absolute;
          top: -15px;
          right: -15px;
          border-radius: 50px;
          height: 50px;
          width: 50px;
        "
      >
        <b-icon-x></b-icon-x>
      </b-button>
      <div class="cta-content" v-html="content.CTA"></div>
    </b-card>

    <b-modal title="On This Page" id="chapters-modal" hide-footer>
      <b-list-group>
        <b-list-group-item
          v-scroll-to="'#' + link.id"
          @click="closeModal()"
          v-for="link in content.toc"
          :key="link.id"
          style=""
          class="mb-2 mt-2 border br-5 raised"
          :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
        >
          <span class="text-dark">
            <b-icon-arrow90deg-right
              flip-v
              scale="0.66"
              style="margin-top;3px;opacity:0.5;"
              class="caret"
              v-if="link.depth === 3"
            ></b-icon-arrow90deg-right
            >{{ link.text }}</span
          >
        </b-list-group-item>
      </b-list-group>
    </b-modal>

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
  props: ["content", "nextPage", "navOptions", "user"],
  data() {
    return {
      ctaVisible: false,
      favorite: null,
      feedback: null,
      showFeedback: true,
      contentData: null,
      previousArticle: null,
    };
  },
  components: {
    VueHtml2pdf: () => {
      if (process.client) {
        return import("vue-html2pdf");
      }
    },
  },
  async mounted() {
    this.ctaVisible = false;
    this.feedback = null;
    this.showFeedback = false;

    this.$nextTick(() => {
      // Add the component back in
      this.showFeedback = true;
    });
    var reactionData = window.localStorage.getItem(
      "feedback:" + this.content.path
    );
    var favorite = window.localStorage.getItem("favorite:" + this.content.path);
    if (favorite == true || favorite == "true") {
      this.favorite = true;
    }
    console.log(
      "Stored value for 'favorite:" + this.content.path + "': " + this.favorite
    );
    console.log("Previous feedback: " + reactionData);
    // this.feedback = reactionData;
  },
  beforeUpdate: function () {
    console.log("beforeUpdate()");

    var favorite = window.localStorage.getItem("favorite:" + this.content.path);
    if (favorite == true || favorite == "true") {
      this.favorite = true;
    } else {
      this.favorite = false;
    }
    console.log(
      "Stored value for 'favorite:" + this.content.path + "': " + this.favorite
    );
    this.feedback = null;
  },

  methods: {
    signIn() {
      var operand = "?";
      if (process.env.AUTH_URL != null && process.env.AUTH_URL.includes("?")) {
        operand = "&";
      }
      var url =
        process.env.AUTH_URL +
        operand +
        "redirect=" +
        encodeURIComponent(window.location.origin);
      console.log("Redirecting to: " + url);
      window.location.href = url;
    },
    updateSearch: function (value) {
      this.$emit("updateSearch", value);
    },
    getContentOrExcerpt() {
      if (this.content.excerpt != null) {
        if (this.user != null) {
          return { body: this.content.body };
        } else {
          return { body: this.content.excerpt };
        }
      } else {
        return { body: this.content.body };
      }
    },
    goToNextPage() {
      if (this.nextPage != null) {
        var redirect = "/#/" + this.nextPage.path.split("/")[1];
        console.log("Redirecting to: " + redirect);
        this.$router.push(redirect);
      }
    },

    ctaHandler(isVisible) {
      if (isVisible && this.content.CTA != null) {
        this.ctaVisible = true;
      } else {
        this.ctaVisible = false;
      }
    },
    toggleFavorite() {
      if (this.favorite == null || this.favorite == false) {
        this.favorite = true;
        this.makeFavorite();
      } else {
        this.favorite = false;
        this.unFavorite();
      }
    },
    makeFavorite() {
      this.favorite = true;
      window.localStorage.setItem("favorite:" + this.content.path, true);
    },
    unFavorite() {
      this.favorite = false;
      window.localStorage.setItem("favorite:" + this.content.path, false);
    },
    isFavorite() {
      if (
        localStorage.getItem("favorite:" + this.content.path) != null &&
        localStorage.getItem("favorite:" + this.content.path) == true &&
        localStorage.getItem("favorite:" + this.content.path) == "true"
      ) {
        this.favorite = true;
        return true;
      } else {
        this.favorite = false;
        return false;
      }
    },
    closeModal() {
      this.$bvModal.hide("chapters-modal");
    },
    async sendAnalyticEvent(eventType, feedbackValue) {
      console.log("Feedback Value: \n");
      console.log(feedbackValue);

      this.feedback = feedbackValue;
      if (feedbackValue != null) {
        var emoji = "🥳";
        if (this.feedback == 1 || this.feedback == 2) {
          emoji = "😬";
        }
        if (this.feedback == 5) {
          emoji = "🤩";
        }
      }
      if (feedbackValue != null) {
        this.$toast.show("Thanks for the feedback! " + emoji, {
          position: "top-center",
          theme: "toasted-primary",
          duration: 3000,
          closeOnSwipe: true,
          className: "toast-custom",
          containerClass: "toast-custom-container",
        });
      }
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
  background: #fff !important;
}
@media (min-width: 991px) {
  .main-content {
    border-left: 2px solid rgba(221, 223, 239, 0.5);
    border-right: 1px solid rgba(221, 223, 239, 0.75);
  }
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

.main-content h1 {
  disply: none !important;
}

.html2pdf__page-break {
  margin: 0 !important;
}

.feedback-component {
}

@media (max-width: 991px) {
  .feedback-component {
    transform: scale(0.75);
    position: relative;
    bottom: 0px;
    left: -5px;
    min-width: 100% !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}

.article-nav .btn {
  border: 1px solid rgb(215, 216, 229);
}
.article-nav .btn svg {
  opacity: 0.66;
  color: rgb(73, 97, 170);
}
</style>

<style>
.nuxt-content h1 {
  text-align: center;
  font-size: 180%;
  padding-bottom: 25px;
  margin-bottom: 25px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 50, 150, 0.1);
}

.nuxt-content h1,
.nuxt-content h2,
.nuxt-content h3,
.nuxt-content h4,
.nuxt-content h5,
.nuxt-content h6 {
  margin-bottom: 25px;
  margin-top: 25px;
}

.nuxt-content h1,
.nuxt-content h2 {
  font-weight: 700 !important;
}

.nuxt-content h3,
.nuxt-content h4,
.nuxt-content h5,
.nuxt-content h6 {
  font-weight: 300 !important;
}

.nuxt-content h2 {
  font-size: 160%;
}

.nuxt-content h3 {
  font-size: 140%;
}

.nuxt-content h4 {
  font-size: 120%;
}

.nuxt-content h5 {
  font-size: 100%;
}

.nuxt-content h6 {
  opacity: 0.66;
}

.nuxt-content .token {
  background: none;
  color: hotpink;
}

.nuxt-content img {
  margin-bottom: 5px;
  border-radius: 3px;
}
.nuxt-content pre {
  border-radius: 5px;
  background: #222;
  color: #fff;
  text-shadow: none;
}

.nuxt-content a img {
  transition: 0.3s all;
}

.nuxt-content a:hover img {
  transform: scale(1.03);
  box-shadow: 0px 7px 12px rgba(0, 50, 150, 0.25);
}

.nuxt-content img.raised {
  margin-bottom: 10px !important;
  box-shadow: none !important;
  filter: drop-shadow(3px 7px 9px rgb(0 50 150 / 0.15));
}

@media (min-width: 991px) {
  .toast-custom {
    pointer-events: none;
    text-align: center !important;
    padding: 10px 20px !important;
    margin: auto;
    display: block !important;
    border-radius: 25px !important;
  }

  .toast-custom-container {
    pointer-events: none;
    margin-top: -93px;
  }
}

.toast-custom {
  color: #000 !important;
  background: #edfff5 !important;
}

.toast-custom a {
  color: #fff !important;
  text-align: center;
  width: 100%;
  font-weight: 600;
}

@media (min-width: 991px) {
  .toast-custom-container {
    width: 100%;
  }
}

.page-nav-mobile {
  background: linear-gradient(90deg, #daecff, #e8fff8);
}

.nuxt-content {
  font-family: "Open Sans", sans-serif;
}

.cta {
  display: block !important;
  pointer-events: none;
  opacity: 0;
  position: fixed;
  right: 0px;
  bottom: 0px;
  min-width: 350px;
  z-index: 888;
  padding: 15px 20px 15px 15px;
  transition: all 0.5s;
  box-shadow: 0px 15px 15px rgba(0, 50, 100, 0.075),
    0px 7px 7px rgba(0, 50, 100, 0.15), 0px 5px 3px rgba(0, 50, 100, 0.1) !important;
}

@media (max-width: 991px) {
  .cta {
    width: calc(100% - 60px) !important;
    max-width: calc(100% - 60px) !important;
  }
}

.cta-content {
  padding-right: 8px;
}

.cta .cta-image {
  background: #eff;
  display: flex;
  float: left;
  margin: 0px 15px 15px 0px;
  min-height: 150px;
  width: 50%;
  min-width: 100px;
  max-width: 150px;
  border-radius: 4px;
  float: left;
  background-size: cover;
  background-position: center;
}
.cta-visible {
  transition: all 0.5s !important;
  margin: 15px 15px 0px 15px;
  pointer-events: all;
  opacity: 1;
  right: 15px;
  bottom: 15px;
  display: inline-block !important;
}

@media (max-width: 991px) {
  .cta-visible {
    margin: 15px 0px 0px 15px !important;
  }
}

.cta-hidden {
  transition: all 0.5s !important;
  pointer-events: none !important;
  opacity: 0;
}

.cta-content p {
  margin: 0px;
}

.next-article-card {
  cursor: pointer;
  transition: all 0.3s;
  background-repeat: no-repeat !important;
  background-position: -200px;
  background: #edfff5;
}

.next-article-label {
  background: rgb(173, 242, 203);
  color: green;
  position: absolute;
  right: -10px;
  top: 20px;
  float: right;
}

.with-excerpt:after {
  background: linear-gradient(
    0deg,
    #fff,
    rgba(255, 255, 255, 0) 350px
  ) !important;
  content: "\00a0";
  height: 350px;
  display: block;
  position: absolute;
  min-width: 100%;
  float: right;
  left: 0px;
  width: 100%;
  margin-top: -325px;
  z-index: 999;
}

.sign-in-button{
  color:#000 !important;
  background: linear-gradient(rgb(255,255,255), rgba(0,50,150,0.25));
}

.sign-in-button svg {
  color: rgb(0,35,75,0.5) !important;
}
</style>