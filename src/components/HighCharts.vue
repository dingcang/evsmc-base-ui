<template>
  <div
    :id="id"
    :option="option"
    :style="style"/>
</template>

<script>
export default {
  name: 'HighCharts',
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
    option: {
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
    option: {
      handler (newVal, oldVal) {
        this.$highcharts.chart(this.id, this.option)
      }
    }
  },
  mounted () {
    // 初始化
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.$highcharts.chart(this.id, this.option)
    }
  }
}
</script>
