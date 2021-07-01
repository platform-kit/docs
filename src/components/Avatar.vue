<template>
  <b-avatar
    :text="getUsername()"
    class="d-inline-block bg-light-blue"
    style="
      margin-top: 0px;
      margin-left: -5px !important;
      margin-right: -5px;
      max-height: 25px;
      max-width: 25px;
    "
  ></b-avatar>
</template>

<script>
export default {
  name: "Avatar",
  props: ["username"],
  components: {},
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    getUsername() {
      if (this.username != null) {
        return this.username[0];
      } else {
        return "u";
      }
    },
  },
};
</script>