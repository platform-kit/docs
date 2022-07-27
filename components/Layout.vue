<!-- Please remove this file from your project -->
<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
.layout {
  min-width: 100%;
  background: #fff;
}

.br-10 {
  border-radius: 10px;
}

.raised {
  box-shadow: 0px 5px 15px rgba(0, 50, 100, 0.1) !important;
}

.bg-none {
  backgroud: none !important;
}
</style>