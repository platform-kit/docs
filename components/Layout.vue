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
  background: #f4f7f9;
  overflow-x: hidden !important;
}

.bg-none {
  backgroud: none !important;
}

html,
body {
  overflow-x: hidden !important;
}
body {
  position: relative;
}

@media (max-width: 991px) {
}
</style>

<style>
.br-5 {
  border-radius: 5px;
}

.br-10 {
  border-radius: 10px;
}

.br-10 {
  border-radius: 10px;
}
.br-15 {
  border-radius: 15px;
}
.br-20 {
  border-radius: 20px;
}

.br-25 {
  border-radius: 25px;
}

.raised {
  box-shadow: 0px 5px 15px rgba(0, 50, 100, 0.1) !important;
}

.text__highlight {
  background: #fff0b4 !important;
  border-radius: 3px !important;
}
</style>