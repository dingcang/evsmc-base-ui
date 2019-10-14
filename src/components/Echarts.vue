<template>
  <div
    :id="id"
    :style="style"
  />
</template>

<script>
export default {
  name: 'Echarts',
  props: {
    // 父组件需要传递的参数：id，width，height，options
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 实例
      chart: ''
    }
  },
  computed: {
    // 宽高
    style () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  watch: {
    // 监控echarts属性变化
    options: {
      handler (newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true
    }
  },
  mounted () {
    // 初始化
    this.init()
  },
  destroyed () {
    // 销毁
    this.chart.dispose()
  },
  methods: {
    // 初始化
    init () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.options)
      // 重绘
      window.addEventListener('resize', this.chart.resize)
    }
  }
}
</script>
