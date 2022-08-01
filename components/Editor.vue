<template>
  <div
    class="mt-4 w-100"
    style="min-height: 100vh; index: 999 !important; overflow: visible"
  >
    <b-button-group class="w-100 br-5 mb-3 raised">
      <b-button
        class="br-5 text-light cancel-button"
        @click="cancel()"
        variant="danger"
      >
        <b-icon-x-circle
          scale="0.66"
          style="position: relative; top: 1px"
        ></b-icon-x-circle>
        Cancel
      </b-button>
      <b-button
        class="br-5 text-light save-button"
        @click="save()"
        variant="dark"
      >
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
      <div v-for="(field, index) in fields?.attributes" :key="index">
        <b-input-group class="mb-3 br-5" v-if="field.length < 50">
          <div class="w-100 mb-2">
            <b-badge variant="dark" class="br-10 px-2 py-1 field-label">{{
              index
            }}</b-badge>
          </div>
          <b-input
            style="border-radius: 5px !important"
            @input="updateFrontMatter(null, true)"
            v-model="fields.attributes[index]"
          ></b-input>
        </b-input-group>
        <b-input-group class="mb-3 br-5" v-else>
          <div class="w-100 mb-2">
            <b-badge variant="dark" class="br-10 px-2 py-1 field-label">{{
              index
            }}</b-badge>
          </div>
          <b-textarea
            style="border-radius: 5px !important; min-height: 100px;"
            @input="updateFrontMatter(null, true)"
            v-model="fields.attributes[index]"
          >
          </b-textarea>
        </b-input-group>
      </div>
    </div>
    <div style="margin-top: -10px">
      <b-badge
        variant="dark"
        class="br-10 px-2 py-1 field-label"
        style="position: relative; top: 10px; z-index: 10"
        >Markdown Content</b-badge
      >
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
          if(value != null && typeof value == 'string' && value.includes(":")){
          this.frontMatterString =
            this.frontMatterString + "\n" + key + ': "' + value + '"';
          } else {
            this.frontMatterString =
            this.frontMatterString + "\n" + key + ': ' + value + '';
          }
        }
        this.frontMatterString = this.frontMatterString + "\n---\n";

        if (this.file.includes("---") && this.file.split("---").length > 2) {
          // If the contentBodyString has never been set, set it
          if (this.contentBodyString == "" || this.contentBodyString == null) {
            this.contentBodyString = this.file.split("---")[2];
          }
          // If input is being passed from the markdown component, use it
          if (input != null && frontMatterOnly != true) {
            this.contentBodyString = input;
          }
          this.contentBodyString = this.contentBodyString.trim();
          // Combine the frontmatter and the
          this.file = this.frontMatterString + this.contentBodyString;
          this.file = this.file.replaceAll("\n\n\n", "\n\n");
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

<style scoped>
.field-label {
  background: #dae7ff !important;
  color: #7c93b1 !important;
  float: left;
  position: absolute;
  left: -15px;
  top: -5px;
  z-index: 10;
}

.cancel-button {
}
.save-button {
}
</style>
<style >
.editor-toolbar {
  margin: auto !important;
  width: 100% !important;
  display: inline-block !important;
}
</style>