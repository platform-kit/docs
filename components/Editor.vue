<template>
  <div class="mt-4 w-100">
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
    <textarea
      class="w-100 br-5 p-3"
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
export default {
  props: {
    value: String,
    isEditing: Boolean,
  },
  data() {
    return {
      file: "",
      cancelEdit: false,
      isInComposition: false,
      originalFile: null,
    };
  },
  watch: {
    value() {
      this.file = this.value;
    },
    isEditing() {
      this.onType();
      this.$refs.textarea.focus();
    },
    file() {
      this.onType();
      if (this.cancelEdit == false) {
        this.$emit("input", this.file);
        if (this.originalFile == "" || this.originalFile == null) {
          this.originalFile = this.originalFile;
        }
      } else if (this.cancelEdit == true) {
        this.$emit("input", this.originalFile);
      }
    },
  },
  methods: {
    cancel() {
      this.cancelEdit = true;
      this.$emit("input", this.originalFile);
      this.$emit("endEdit");
      this.$router.go("/#/" + document.path);
    },
    save() {
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
