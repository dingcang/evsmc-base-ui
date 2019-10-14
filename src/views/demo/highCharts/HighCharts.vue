<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: Highchars组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>

    <high-charts
      :id="id"
      :option="pyramidOptions"
    />

    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
// import Hc from 'highcharts'

import HighCharts from '@/components/HighCharts'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'HighChartsDemo',
  components: {
    HighCharts, ApiIntroduction
  },
  data () {
    return {
      id: 'highcharts',
      option: {},
      data: [
        {
          name: '安装，实施人员',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
          name: '工人',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
          name: '销售',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
          name: '项目开发',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
          name: '其他',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],
      other: {
        title: {
          // 大标题
          text: ''
        },
        subtitle: {
          // 小标题
          text: ''
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: '',
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      },
      barOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: '月平均降雨量'
        },
        subtitle: {
          text: '数据来源: WorldClimate.com'
        },
        xAxis: {
          categories: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '降雨量 (mm)'
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        credits: {
          enabled: false // 不显示LOGO
        },
        series: [{
          name: '东京',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 500, 194.1, 95.6, 54.4]
        }]
      },
      pyramidOptions: {
        chart: {
          type: 'pyramid',
          marginRight: 100
        },
        title: {
          text: '销售金字塔',
          x: -50
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> ({point.y:,.0f})',
              // color: (Hc.theme && Hc.theme.contrastTextColor) || 'black',
              color: 'black',
              softConnector: true
            }
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false // 不显示LOGO
        },
        series: [{
          name: '用户',
          data: [
            ['访问网站', 15654],
            ['下载产品', 4064],
            ['询价', 1987],
            ['发送合同', 976],
            ['成交', 846]
          ]
        }]
      },

      showApi: false,
      propertyList: [
        { key: 'id', value: 'highcharts 的id', type: 'String', default: '' },
        { key: 'height', value: 'echarts 高度', type: 'String', default: '300px' },
        { key: 'width', value: 'echarts 宽度', type: 'String', default: '100%' },
        { key: 'options', value: '配置图表类型及数据', type: 'Object', default: '{}' }]
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.other.title.text = '2010 ~ 2016 年太阳能行业就业人员发展情况'
    this.other.subtitle.text = '数据来源：thesolarfoundation.com'
    this.other.series = this.data // 数据
    this.other.yAxis.title.text = '就业人数' // 数据
    this.option = this.other
  },
  methods: {}
}
</script>
