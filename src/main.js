import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import BASEUI from './index'
import './utils'
import './utils/hasButtonPermission'
import locale from '@/locale/lang/zh-CN'
// import locale from '@/locale/lang/en'

import '@/assets/css/app.scss'
import '@/assets/css/common.scss'

import { uploadImportSearchFile } from '@/api/config'

// ELEMENT.locale(ELEMENT.lang.en)
Vue.use(BASEUI, {
  locale,
  uploadImportSearchFile
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
