<template>
  <div class="mt-4 w-100" style="index:999 !important;">
    <b-button-group class="w-100 br-5 mb-3">
      <b-button class="br-5" @click="cancel()" variant="outline-danger">
        <b-icon-x-circle
          scale="0.66"
          style="position: relative; top: 1px"
        ></b-icon-x-circle>
        Cancel
      </b-button>
      <b-button class="br-5" @click="save()" variant="outline-success">
        <b-icon-check-circle
          scale="0.66"
          style="position: relative; top: 1px"
        ></b-icon-check-circle>
        Save
      </b-button>
    </b-button-group>
    <div
      v-if="
        originalFile != null &&
        originalFile.includes('---') &&
        fields.attributes != null
      "
    >
      <b-input-group
        class="mb-2"
        v-for="(field, index) in fields?.attributes"
        :key="index"
      >
        <template #prepend>
          <b-input-group-text style="min-width: 125px; font-size:75%;"
            ><strong class="text-dark">{{ index }}</strong></b-input-group-text
          >
        </template>
        <b-input
          @input="updateFrontMatter(null, true)"
          v-model="fields.attributes[index]"
        ></b-input>
      </b-input-group>
    </div>
    <vue-simplemde
      preview-class="nuxt-content"
      @input="updateFrontMatter"
      class="w-100 br-5 p-3"
      style="
        z-index: 9999 !important;
        margin: 0px !important;
        padding: 0px !important;
      "
      v-model="contentBodyString"
      ref="markdownEditor"
    />
    <textarea
      class="w-100 br-5 p-3 d-none"
      ref="textarea"
      v-model="file"
      @keydown.tab.exact.prevent="onTabRight"
      @keydown.tab.shift.prevent="onTabLeft"
      @compositionstart.prevent="isInComposition = true"
      @compositionend.prevent="isInComposition = false"
    />
  </div>
</template>

<script>
import fm from "front-matter";

export default {
  props: {
    value: String,
    isEditing: Boolean,
  },
  data() {
    return {
      file: "",
      contentBodyString: "",
      frontMatterString: "",
      cancelEdit: false,
      isInComposition: false,
      originalFile: null,
      fields: null,
    };
  },
  mounted() {
    this.updateFrontMatter();
  },
  watch: {
    originalFile() {
      function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      }
      if (this.originalFile != null && this.originalFile.includes("---")) {
        var frontMatter = fm(this.originalFile);
        this.fields = frontMatter;
      }
    },
    value() {
      this.file = this.value;
    },
    isEditing() {
      this.onType();
      this.$refs.textarea.focus();
      this.updateFrontMatter();
    },
    file() {
      this.onType();
      if (
        typeof this.value != "undefined" &&
        this.value != "" &&
        this.value != null
      ) {
        this.updateFrontMatter();
      }
      if (this.cancelEdit == false) {
        this.$emit("input", this.file);
        if (this.originalFile == "" || this.originalFile == null) {
          this.originalFile = this.file;
        }
      } else if (this.cancelEdit == true) {
        this.$emit("input", this.originalFile);
      }
    },
  },
  methods: {
    updateFrontMatter(input, frontMatterOnly) {
      // console.log(input); // input from vue-simplemde component
      this.frontMatterString = "---";
      if (
        this != null &&
        this.fields != null &&
        this.fields.attributes != null &&
        this.file != null
      ) {
        // Generate frontmatter by looping through all values
        for (const [key, value] of Object.entries(this.fields?.attributes)) {
          this.frontMatterString =
            this.frontMatterString + "\n" + key + ": " + value;          
        }
        this.frontMatterString = this.frontMatterString + "\n---";

        if (this.file.includes("---") && this.file.split("---").length > 2) {
          // If the contentBodyString has never been set, set it
          if (this.contentBodyString == "" || this.contentBodyString == null) {
            this.contentBodyString = this.file.split("---")[2];
          }
          // If input is being passed from the markdown component, use it
          if (input != null && frontMatterOnly != true) {
            this.contentBodyString = input;
          }

          // Combine the frontmatter and the 
          this.file = this.frontMatterString + "\n" + this.contentBodyString;
        }
      }
    },
    cancel() {
      this.cancelEdit = true;
      this.$emit("input", this.originalFile);
      this.$emit("endEdit");
      this.$router.go("/#/" + document.path);
    },
    save() {
      this.updateFrontMatter();
      this.$emit("endEdit");
      this.$router.go("/#/" + document.path);
    },
    onType() {
      const el = this.$refs.textarea;

      el.style.height = "auto";
      this.$nextTick(() => {
        el.style.height = el.scrollHeight + "px";
      });
    },
    onTabRight(event) {
      /*
      if (this.isInComposition) {
        return;
      }
      const text = this.file;
      const originalSelectionStart = event.target.selectionStart;
      const textStart = text.slice(0, originalSelectionStart);
      const textEnd = text.slice(originalSelectionStart);
      this.file = `${textStart}\t${textEnd}`;
      event.target.value = this.file; // required to make the cursor stay in place.
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
        */
    },
    onTabLeft(event) {
      /*
      if (this.isInComposition) {
        return;
      }
      const text = this.file;
      const originalSelectionStart = event.target.selectionStart;
      const textStart = text.slice(0, originalSelectionStart);
      const textEnd = text.slice(originalSelectionStart);
      this.file = `${textStart.replace(/\t$/, "")}${textEnd}`;
      event.target.value = this.file; // required to make the cursor stay in place.
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart - 1;
        */
    },
  },
};
</script>
