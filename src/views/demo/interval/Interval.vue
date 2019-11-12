<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 设置定时弹窗 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <query
        ref="demoQuery"
        :query-dom="queryDom"
        @query="query"
        @reset="reset"
        @queryCallBack="select"
      />
    </el-row>

    <!-- 打印查询条件 -->
    <div class="margin-top5">
      {{ queryStr }}
    </div>

    <interval
      v-model="show"
      :data="data"
      @save="save"
      @close="close"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Interval from '@/components/Interval'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'IntervalDemo',
  components: {
    Interval,
    ApiIntroduction
  },
  data () {
    return {
      // 默认查询条件
      queryParams: {
        conditions: [],
        sort: [],
        start: 0,
        limit: -1
      },
      // 打印查询条件值
      queryStr: '',
      queryDom: [
        {
          name: this.$t('common.description'),
          placeholder: this.$t('common.pleaseSelect'),
          type: 'search',
          // 显示字段
          showModel: 'tip',
          // 查询的model
          model: 'time',
          // 查询的数据
          queryModel: 'data',
          id: 1
        }],

      show: false,
      data: {},
      showApi: false,
      propertyList: [
        { key: 'show', value: '打开关闭弹窗', type: 'Boolean', default: '' },
        { key: 'data', value: '回选的数据', type: 'Object', default: '' },
        { key: '@save', value: '保存', type: '事件', default: '' },
        { key: '@close', value: '关闭', type: '事件', default: '' }]
    }
  },
  methods: {
    save (data) {
      this.data = data
      console.log(JSON.stringify(data))
      this.$refs.demoQuery.setOpenDialogValue(data)
    },
    close () {
      console.log('close')
    },

    // 查询操作
    query (params) {
      Object.assign(this.queryParams, params)
      this.queryStr = JSON.parse(JSON.stringify(this.queryParams))
    },
    // 重置操作
    reset () {
      this.queryParams.conditions = []
    },
    // 选择弹出框 打开
    select (index, param) {
      switch (index) {
        case 1:
          this.show = true
          break
        default:
          console.log(index, param)
      }
    }
  }
}
</script>
