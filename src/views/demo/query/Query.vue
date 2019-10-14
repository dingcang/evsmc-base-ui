<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 查询组件，包含收起 展开 查询 重置 弹出框回填 延迟设置默认数据等功能 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <!--
      options 为查询配置项
      query-dom 为查询组件的dom元素
      query-default 为查询dom的默认值
      query为查询方法的回调(return 查询条件对象)
      reset为重置
      select为选择弹出框的回调(没有弹出回调则不写) -->
    <query
      ref="demoQuery"
      :options="queryOptions"
      :query-dom="queryDom"
      :query-default="queryDefault"
      :hidden-query-default="hiddenQueryDefault"
      @query="query"
      @reset="reset"
      @queryCallBack="select"
    />

    <!-- 打印查询条件 -->
    <div class="margin-top5">
      {{ queryStr }}
    </div>
    <div>
      <!-- 单选弹窗 -->
      <select-age
        ref="selectAgeDialog"
        :selected="searchSelected"
        @save="dialogSave"
      />
      <!-- 多选弹窗 -->
      <select-description
        ref="selectDescDialog"
        :selected="searchSelected"
        @save="dialogSave"
      />
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Query from '@/components/Query'
import SelectAge from './components/SelectAge'
import SelectDescription from './components/SelectDescription'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'QueryDemo',
  components: {
    Query, SelectAge, SelectDescription, ApiIntroduction
  },
  data: function () {
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
      // 单选切换配置(没有条件查询和导入查询时不写该配置项)
      queryOptions: {
        radio: {
          // 条件查询显示字段(条件查询字段全显示时,可以不配置该属性)
          condition: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          // 导出查询显示字段(导入查询时不包含条件查询时,可以不配置该属性)
          import: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          // 显示单选
          show: true
        },
        // 导入模板下载地址
        importTemplateUrl: 'vehTerminalInfoSearchFileDownload'
        // 车辆 vehicleImportSearchFileDownload
        // 终端 vehTerminalInfoSearchFileDownload
      },
      /*
        * queryDom: 为查询组件初始化dom数据
        * name: 输入框或选择框等前边的名称
        * type: input/select/search/date/datetime/doubleDate/doubleDateTime/upload 依次为：输入/选择/搜索/日期/时间/开始日期至结束日期/开始时间至结束时间/上传
        * model: 查询时输入框或选择框等绑定的值
        * id: 各输入框或选择框等的唯一标识，建议从0开始
        * placeholder: 未输入时的提示文字
        * data: 当type为select时,绑定的下拉框值
        * dataType: 当type为date/datetime/doubleDate/doubleDateTime时,绑定的日期选择类型
        * rangeSeparator: 当type为doubleDate/doubleDateTime时,中间连接显示字
        * startPlaceholder: 当type为doubleDate/doubleDateTime时,开始时间框未输入时的提示文字
        * endPlaceholder: 当type为doubleDate/doubleDateTime时,结束时间框未输入时的提示文字
        * action: 为上传提交的地址
        *
        * */
      queryDom: [
        {
          name: this.$t('common.importQueryFile'),
          type: 'upload',
          id: 0
        }, {
          name: this.$t('common.name'),
          type: 'input',
          model: 'name',
          id: 1
        }, {
          name: '单选',
          placeholder: this.$t('common.pleaseSelect'),
          type: 'search',
          queryModel: 'id',
          showModel: 'name',
          model: 'dan',
          id: 2
        }, {
          name: '多选',
          placeholder: this.$t('common.pleaseSelect'),
          type: 'search',
          queryModel: 'id',
          showModel: 'name',
          model: 'duo',
          id: 3
        }, {
          name: this.$t('common.sex'),
          type: 'select',
          model: 'sex',
          data: [
            { name: this.$t('common.male'), value: '1' },
            { name: this.$t('common.female'), value: '2' }
          ],
          id: 4
        }, {
          name: this.$t('common.date'),
          placeholder: this.$t('common.selectDate'),
          type: 'date',
          model: 'date',
          dateType: 'date',
          rules: { unSelectToday: true },
          id: 5
        }, {
          name: this.$t('common.datetime'),
          placeholder: this.$t('common.selectDatetime'),
          type: 'datetime',
          model: 'datetime',
          dateType: 'datetime',
          id: 6
        }, {
          name: this.$t('common.date'),
          type: 'doubleDate',
          model: 'doubleDate',
          dateType: 'daterange',
          rangeSeparator: this.$t('common.to'),
          startPlaceholder: this.$t('common.startDate'),
          endPlaceholder: this.$t('common.endDate'),
          id: 7
        }, {
          name: this.$t('common.datetime'),
          type: 'doubleDateTime',
          model: 'doubleDateTime',
          dateType: 'datetimerange',
          rangeSeparator: '-',
          startPlaceholder: this.$t('common.startTime'),
          endPlaceholder: this.$t('common.endTime'),
          id: 8
        }, {
          name: '月份',
          placeholder: this.$t('common.selectDate'),
          type: 'formatDate',
          format: 'yyyy-MM',
          model: 'chooseMonth',
          dateType: 'month',
          rules: { unSelectCurrentMonth: true },
          id: 9
        }, {
          name: '多选',
          type: 'multipleSelect',
          model: 'multipleSelect',
          data: [
            { name: this.$t('common.male'), value: '1' },
            { name: this.$t('common.female'), value: '2' },
            { name: 'aaaaaaaa', value: '3' },
            { name: 'sssssss', value: '4' },
            { name: 'ddddddd', value: '5' },
            { name: 'fffffffff', value: '6' }
          ],
          id: 10
        }
      ],
      // 设置默认值和重置值,根据唯一标识
      queryDefault: {
        1: 'tom',
        4: '1'
      },
      // 隐藏的默认查询条件
      hiddenQueryDefault: {
      },
      // 选中的多选或单选
      searchSelected: {},

      showApi: false,
      propertyList: [
        { key: 'options', value: '查询组件的配置项(后续可扩展),没有导入查询可不配置', type: 'Object', default: '' },
        { key: ' - importTemplateUrl', value: '导入模板下载地址名称', type: 'String', default: '' },
        { key: ' - isCustom', value: '是否定制化', type: 'Boolean', default: 'false' },
        { key: ' - unQuery', value: '设置重置时不查询', type: 'Boolean', default: 'false' },
        { key: ' - colNum', value: '设置一行几列', type: 'Number', default: '4' },
        { key: ' - radio', value: '查询的单选项,包含条件查询和导入查询 没有导入查询可不配置', type: 'Object', default: '' },
        { key: ' - - condition', value: '条件查询时,显示的查询列 不配置显示全部', type: 'Array', default: '' },
        { key: ' - - import', value: '导入查询时,显示的查询列 不配置显示全部', type: 'Array', default: '' },
        { key: ' - - show', value: '显示或隐藏条件查询和导入查询', type: 'Boolean', default: 'false' },
        { key: 'query-default', value: '查询的列默认项 id: value', type: 'Object', default: '' },
        { key: 'query-dom', value: '查询的列配置', type: 'Array', default: '' },
        { key: ' - name', value: '查询列的名称', type: 'String', default: '' },
        { key: ' - placeholder', value: '查询列的占位符', type: 'String', default: '' },
        { key: ' - type', value: '查询列类型 input/select/data/datatime/upload/search/select/doubleDate/doubleDateTime/formatDate/multipleSelect', type: '* String', default: '' },
        { key: ' - unClearAble', value: 'select列不可以清空', type: 'Boolean', default: 'false' },
        { key: ' - model', value: '查询列的模型名', type: '* String', default: '' },
        { key: ' - maxLength', value: '查询输入框为input类型时可配置 默认64', type: 'Number', default: '64' },
        { key: ' - queryModel', value: '查询列的search类型的查询id', type: '* String', default: '' },
        { key: ' - showModel', value: '查询列的search类型的查询回写的模型', type: 'String', default: 'name' },
        { key: ' - id', value: '查询列的唯一标识,建议从0开始排列', type: '* Number', default: '' },
        { key: ' - data', value: '当type=select时,绑定的下拉菜单 包含name和value属性必填', type: 'Array', default: '' },
        { key: ' - dateType', value: '当type=data/datatime/doubleDate/doubleDateTime时,需要设置dataType=date/datatime/daterange/datetimerange', type: 'String', default: '' },
        { key: ' - dayRange', value: '当type=doubleDate/doubleDateTime时 用于设置时间范围取值 单位为天', type: 'Number', default: '' },
        { key: ' - rules', value: '查询框的校验', type: 'Object', default: '' },
        { key: ' - - unSelectToday', value: '当dateType: date 时可设置不能不选择当天', type: 'Object', default: 'false' },
        { key: ' - - unSelectCurrentMonth', value: '当dateType: month 时可设置不能不选择当月', type: 'Object', default: 'false' },
        { key: 'rules', value: '查询的校验规则', type: 'Object', default: '' },
        { key: 'query-default', value: '查询的默认查询条件 设置时用查询列id和值', type: 'Object', default: '' },
        { key: 'hidden-query-default', value: '查询的默认查询条件 隐藏的查询条件', type: 'Object', default: '' },
        { key: '@query', value: '查询按钮回调', type: '事件', default: '' },
        { key: '@reset', value: '重置按钮回调', type: '事件', default: '' },
        { key: '@setDate', value: '时间改变回调事件 id, val', type: '事件', default: '' },
        { key: '@queryCallBack', value: 'search弹出框按钮回调(id, oldItemData)', type: '事件', default: '' }]
    }
  },
  mounted () {
    // 初始化查询组件
    this.initQueryToolBar()
  },
  methods: {
    // 初始化查询组件
    initQueryToolBar () {
      let that = this
      // 延迟改变dom数据,延迟设置默认查询条件
      setTimeout(function () {
        that.$refs.demoQuery.setDomData({
          data: [{ name: that.$t('common.male'), value: '1' },
            { name: that.$t('common.female'), value: '2' },
            { name: that.$t('common.none'), value: '3' }],
          id: 4
        })
        that.$refs.demoQuery.addDefault({ 4: '3' })
        // 设置隐藏的查询条件
        that.hiddenQueryDefault = { hideLhy: '1', hideLhy2: 2 }
      }, 3000)
    },
    // 查询操作
    query (params, files) {
      Object.assign(this.queryParams, params)
      this.queryStr = JSON.parse(JSON.stringify(this.queryParams))
      if (this.radioOptions && this.radioOptions.default === 'import') console.log(files)
    },
    // 重置操作
    reset () {
      this.queryParams.conditions = []
    },
    // 选择弹出框 打开
    select (index, param) {
      this.searchSelected = param
      switch (index) {
        case 2:
          this.$refs.selectAgeDialog.initData(param)
          break
        case 3:
          this.$refs.selectDescDialog.initData(param)
          break
        default:
          console.log(index, param)
      }
    },
    // 选择弹出框 保存后的统一回调
    dialogSave (v) {
      this.$refs.demoQuery.setOpenDialogValue(v)
    }
  }
}
</script>
