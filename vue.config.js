const path = require('path')
const cdn = {
  css: [
    'https://unpkg.com/element-ui@2.6.3/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.7/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcss.com/element-ui/2.6.3/index.js',
    'https://cdn.bootcss.com/vue-i18n/8.14.1/vue-i18n.min.js'
  ]
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@p', path.resolve(__dirname, 'public'))

    if (process.env.NODE_ENV !== 'production') {
      config.plugin('html')
        .tap(args => {
          args[0].css = cdn.css
          args[0].js = cdn.js
          return args
        })
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'element-ui': 'ELEMENT'
    }
  },
  css: {
    extract: false
  }
}
