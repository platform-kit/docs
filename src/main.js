// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' // Bootstrap-Vue
import 'bootstrap/dist/css/bootstrap.css'                 // Bootstrap-Vue
import 'bootstrap-vue/dist/bootstrap-vue.css'             // Bootstrap-Vue

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Bootstrap Vue
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin)

}
