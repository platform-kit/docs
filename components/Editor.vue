<template>
  <div class="mt-4 w-100">
    <b-button-group class="w-100 br-5 mb-3">
    <b-button class="br-5" @click="save()" variant="dark">Save</b-button>
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
      isInComposition: false,
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
      this.$emit("input", this.file);
    },
  },
  methods: {
    save(){
      this.$emit('endEdit');      
      this.$router.go('/#/' + document.path);
    },
    onType() {
      const el = this.$refs.textarea;

      el.style.height = "auto";
      this.$nextTick(() => {
        el.style.height = el.scrollHeight + "px";
      });
    },
    onTabRight(event) {
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
    },
    onTabLeft(event) {
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
    },
  },
};
</script>
