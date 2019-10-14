<!--<template>
  <div class="xy-container">
    <div
      :ref="saleName"
      :style="saleStyle"/>
  </div>
</template>

<script>
  export default {
    name: 'EchartsDemo',
    components: {},
    props: {},
    data () {
      return {
        saleName: 'sale',
        saleStyle: {width: '600px', height: '600px'}
      }
    },
    mounted () {
      // 初始化
      let sale = this.$echarts.init(this.$refs[this.saleName])
      // 绘制图表
      sale.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
</script>-->

<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: Echars组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>

    <echarts
      :id="saleName"
      :options="options"
    />

    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Echarts from '@/components/Echarts'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'EchartsDemo',
  components: {
    Echarts, ApiIntroduction
  },
  props: {},
  data () {
    return {
      saleName: 'sale',
      chartData: {
        xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        sData: [5, 20, 36, 10, 10, 70]
      },
      options: {
        title: { text: 'vue-echars' },
        tooltip: {},
        xAxis: {
          data: ['A', 'S', 'D', 'F', 'E', 'G']
        },
        yAxis: {},
        series: [{
          name: 'TEST',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },

      showApi: false,
      propertyList: [
        { key: 'id', value: 'echarts 的id', type: 'String', default: '' },
        { key: 'height', value: 'echarts 高度', type: 'String', default: '300px' },
        { key: 'width', value: 'echarts 宽度', type: 'String', default: '100%' },
        { key: 'options', value: '配置图表类型及数据', type: 'Object', default: '{}' },
        { key: '---', value: '注意如果图标较复杂,事件较多,请调用上边我注释掉的', type: 'Object', default: '{}' }]
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    refreshData () {
      // 横轴数据
      let xData = this.chartData.xData
      // 系列值
      let sData = this.chartData.sData
      for (let i = 0; i < xData.length; i++) {
        setTimeout(() => {
          this.options.xAxis.data.push(xData[i])
          this.options.series[0].data.push(sData[i])
        }, 5000 * i)
      }
    }
  }
}
</script>
