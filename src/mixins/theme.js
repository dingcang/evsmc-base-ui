const { mapGetters } = Vuex.createNamespacedHelpers('common')
// 获取element-ui版本从node_modules
const version = '2.6.3'
// 系统默认颜色
const ORIGINAL_THEME = '#409EFF'

export default function () {
  return {
    data () {
      return {
        themeValue: ORIGINAL_THEME
      }
    },
    created () {
      this.themeValue = this.theme
    },
    methods: {
      // 更新主题
      updateTheme (val, oldVal) {
        if (typeof val !== 'string') return
        const head = document.getElementsByTagName('head')[0]
        const themeCluster = this.getThemeCluster(val.replace('#', ''))
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
        const getHandler = (variable, id) => {
          return () => {
            // 全局搜索 旧的主题色 进行替换
            const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
            const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
            // 添加新的style样式
            let styleTag = document.getElementById(id)
            if (!styleTag) {
              styleTag = document.createElement('style')
              styleTag.setAttribute('id', id)
              head.appendChild(styleTag)
            }
            styleTag.innerText = newStyle
          }
        }

        const chalkHandler = getHandler('chalk', 'chalk-style')
        if (!this.chalk) {
          // 不存在主题色css时 去生成
          const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
          this.getCSSString(url, chalkHandler, 'chalk')
        } else {
          chalkHandler()
        }

        // 查找自定义样式替换颜色
        const styles = [].slice
          .call(document.querySelectorAll('style'))
          .filter(style => {
            const text = style.innerText
            return (
              new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
            )
          })
        styles.forEach(style => {
          const { innerText } = style
          if (typeof innerText !== 'string') return
          style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
        })
      },
      // 更新样式
      updateStyle (style, oldCluster, newCluster) {
        let newStyle = style
        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
        })
        return newStyle
      },
      // 获取样式
      getCSSString (url, callback, variable) {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (variable) {
              this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            }
            callback(xhr.responseText)
          }
        }
        xhr.open('GET', url)
        xhr.send()
      },
      // 获取主题
      getThemeCluster (theme) {
        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(',')
          } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
          }
        }

        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          red = Math.round((1 - shade) * red)
          green = Math.round((1 - shade) * green)
          blue = Math.round((1 - shade) * blue)

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }

        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
      }
    },
    computed: {
      ...mapGetters(['theme'])
    },
    watch: {
      themeValue (val, oldVal) {
        // 记录新主题色 更改旧主题色
        this.$store.commit('common/edit', val)
        this.updateTheme(val, oldVal)
      }
    }
  }
}
