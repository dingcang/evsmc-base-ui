import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Element from './index'
import './utils'
import './utils/hasButtonPermission'

import '@/assets/css/app.scss'
import '@/assets/css/common.scss'

import { uploadImportSearchFile } from '@/api/config'

Vue.use(Element, {
  uploadImportSearchFile
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
