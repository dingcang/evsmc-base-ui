<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 表格操作 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <!-- 列显示隐藏 -->
    <div class="margin-bottom20">
      <el-button
        size="mini"
        type="primary"
        @click="setColumnDisplay"
      >
        {{ $t("common.columnDisplay") }}
      </el-button>
    </div>
    <div>
      <!-- 当有单/多选时,传v-model双向绑定,当没有时不写；
        grid-options为表格属性
        grid-column为表格列
        grid-data为表格数据
        gird-mergecells为合并单元格的列名
        gridCallBack为点击链接或按钮或图片的事件回调,没有则不写；
        setPageParam为点击分页的条件回传,没有分页则不写 -->
      <grid
        ref="demoGrid"
        v-model="selections"
        :grid-options="options"
        :grid-column="gridColumn"
        :grid-data="gridData"
        :grid-operation="gridOperation"
        :gird-mergecells="girdMergecells"
        @gridCallBack="gridCallBack"
        @setPageParam="paginationQuery"
      />
    </div>
    <div>
      <!-- save为列显示隐藏的保存按钮回调 -->
      <grid-column-display
        ref="columnDisplay"
        @save="saveColumnDisplay"
      />
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import GridColumnDisplay from '@/components/GridColumnDisplay'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'GridDemo',
  components: {
    Grid, GridColumnDisplay, ApiIntroduction
  },
  data: function () {
    return {
      // 单/多选值记录, 单选用selections[0]取值
      selections: [],
      // 表格属性
      options: {
        // 固定表头属性,不写height则为不固定
        // height: 300,
        // 多选
        checkboxSelection: true,
        // 分页不需要设置 limit为-1自动不显示分页
        // 列操作按钮
        operationShow: true,
        operationFixed: 'right'
      },
      /*
         * kind: link/text/judge/image/links 必填
         * width: num,不写则自适应 非必填
         * prop: 对应字段属性,必填； links、 非必填
         * label: 输入框标题, 非必填
         * param 对应判断条件或显示提示 非必填
         * fixed 固定方向或固定显示 true/false/left/center/right 非必填
         * */
      // 根据字段true或false显示不同字
      // judge example true/false {key: 'builtin', condition: true, showText: '男'}, {key: 'builtin', condition: false, showText: '女'}]
      // 根据多种条件显示不同字
      // judge example number {key: 'sex', condition: 1, showText: '男'}, {key: 'sex', condition: 2, showText: '女'}, {key: 'sex', condition: 3, showText: '无'}
      gridColumn: [
        { kind: 'link', prop: 'name', label: this.$t('common.name'), width: '400px' },
        { kind: 'link', prop: 'address', label: this.$t('common.address'), width: '200px' },
        { kind: 'text', prop: 'description', label: this.$t('common.description') },
        { kind: 'moreTitle',
          label: '多级表头',
          param: [
            { kind: 'text', prop: 'hadData', label: '有数据', width: '200px' },
            { kind: 'text',
              prop: 'sexText',
              label: '定位',
              width: '200px',
              param: [
                { key: 'sex', value: 1, color: 'blue', icon: 'iconfont icon-weidingwei' },
                { key: 'sex', value: 2, color: 'red', icon: 'iconfont icon-lixian' },
                { key: 'sex', value: 3, color: '', icon: 'iconfont icon-lixian' }] },
            { kind: 'text', prop: 'context', label: '行驶', width: '200px' },
            { kind: 'text', prop: 'baseType', label: '是否在线' }] },
        { kind: 'judge', prop: 'context', label: this.$t('common.sex'), param: [{ key: 'context', condition: 'cluster', showText: this.$t('common.male') }, { key: 'context', condition: 'project', showText: this.$t('common.female') }] },
        { kind: 'links', label: this.$t('common.operation'), param: [{ type: 'edit', showText: this.$t('common.edit') }, { type: 'remove', showText: this.$t('common.remove') }] }
      ],
      // 表格数据
      gridData: [],
      // 表格下拉按钮组
      gridOperation: [
        { name: this.$t('common.add'), icon: 'fa-plus', type: 'add' },
        { name: this.$t('common.enable'), icon: 'fa-check-square', type: 'enable', show: { key: 'context', value: 'cluster' } },
        { name: this.$t('common.disable'), icon: 'fa-square', type: 'disable', show: { key: 'context', value: 'project' } },
        { name: this.$t('common.edit'), icon: 'fa-edit', type: 'edit' },
        { name: this.$t('common.remove'), icon: 'fa-trash', type: 'remove' }
      ],
      // 指定要合并单元格的列，第一项为主合并列，其它列在主列合并后的基础上进行合并
      girdMergecells: ['address', 'sexText'],
      showApi: false,
      propertyList: [
        { key: 'v-model', value: '双向绑定选择框选中的值', type: 'Array', default: '[]' },
        { key: 'grid-options', value: '表格属性设置', type: 'Object', default: '' },
        { key: ' - divPageable', value: '定制分页，可使用插槽，不用插槽则不显示条数', type: 'Boolean', default: 'false' },
        { key: ' - checkboxSelection', value: '多选框显示 true/false', type: 'Boolean', default: 'false' },
        { key: ' - fixedCheckbox', value: '固定多选框', type: 'Boolean', default: 'false' },
        { key: ' - checkboxWidth', value: '多选框长度', type: 'String', default: '30' },
        { key: ' - radioSelection', value: '单选框显示 true/false', type: 'Boolean', default: 'false' },
        { key: ' - radioFixed', value: '固定单选框', type: 'Boolean', default: 'false' },
        { key: ' - radioWidth', value: '单选框长度', type: 'String', default: '30' },
        { key: ' - radioValue', value: '单选框选中的值', type: 'String', default: '-1' },
        { key: ' - operationWidth', value: '操作列长度 true/false', type: 'String', default: '100px' },
        { key: ' - operationShow', value: '操作列显示', type: 'Boolean', default: 'false' },
        { key: ' - operationFixed', value: '固定操作列 true/left/right', type: 'String, Boolean', default: 'false' },
        { key: ' - tableLoading', value: '表格加载动画', type: 'Boolean', default: 'true' },
        { key: ' - outShowBtn', value: '按钮显示在操作收起外展示', type: 'Boolean', default: 'false' },
        { key: ' - sortRule', value: '排序的对象', type: 'Object', default: '' },
        { key: ' -  - prop', value: '排序的字段', type: 'String', default: '' },
        { key: ' -  - order', value: '升序或降序 ascending,descending', type: 'String', default: '' },
        { key: 'grid-column', value: '表格标题名字', type: 'Array', default: '' },
        { key: ' - kind', value: '表格列类型 text/link/links/judge/judgeModel/image(废除)/tag/boldText/colorText/moreTitle/iconText', type: '* String', default: '' },
        { key: ' - prop', value: '表格列模型名绑定', type: '* String', default: '' },
        { key: ' - showName', value: '表格列中显示的名称', type: 'String', default: '' },
        { key: ' - label', value: '表格表头名称', type: 'String', default: '' },
        { key: ' - sort', value: '设置列排序', type: 'Boolean', default: 'false' },
        { key: ' - param(kind=moreTitle)', value: '多级表头图标变色配置 在param中配置', type: 'String', default: '' },
        { key: ' -  - key', value: '判断的属性', type: 'String', default: '' },
        { key: ' -  - value', value: '属性等于的值', type: 'String', default: '' },
        { key: ' -  - color', value: '图标的颜色', type: 'String', default: '' },
        { key: ' -  - icon', value: '图标样式', type: 'String', default: '' },
        { key: 'grid-data', value: '表格数据', type: 'Array', default: '' },
        { key: 'grid-operation', value: '表格的操作按钮', type: 'Array', default: '' },
        { key: ' - name', value: '按钮显示的名称', type: 'String', default: '' },
        { key: ' - icon', value: '按钮的图标', type: '* String', default: '' },
        { key: ' - type', value: '按钮的类型为回调的唯一标识', type: 'String', default: '' },
        { key: ' - btnType', value: '按钮类型 text/textNoLink', type: 'String', default: 'primary' },
        { key: ' - show', value: '按钮的显示隐藏根据状态显示 key和value', type: 'Object', default: '' },
        { key: ' -  - key', value: '判断的属性', type: 'String', default: '' },
        { key: ' -  - value', value: '属性等于的值', type: 'String', default: '' },
        { key: 'grid-girdMergecells', value: '指定要合并单元格的列（相邻两条数据相同则合并），第一项为主合并列，其它列在主列合并后的基础上进行合并', type: 'Array', default: '' },
        { key: '@gridCallBack', value: '表格上非操作按钮的link或button等的事件操作回调', type: '事件', default: '' },
        { key: '@selectedRow', value: '表格上单击一行的动作回调', type: '事件', default: '' },
        { key: '@setPageParam', value: '分页查询的回调方法', type: '事件', default: '' }]
    }
  },
  mounted () {
    // 定时打印 选中状态
    let that = this
    // 2秒后加载数据
    setTimeout(function () {
      that.setTableData()
    }, 2000)
  },
  methods: {
    // region 列显示隐藏
    // 设置列显示隐藏
    setColumnDisplay () {
      let columns = this.$method.deepCopy(this.$refs.demoGrid.tableColumn)
      this.$refs.columnDisplay.initData(columns)
    },
    // 保存列显示隐藏
    saveColumnDisplay (columns) {
      this.$refs.demoGrid.setColumnDisplay(columns)
    },
    // endregion

    // region 表格
    // 设置表格数据
    setTableData () {
      this.gridData = []
      this.gridData = [{
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 1,
        'sexText': '男',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'ffffff',
        'external': false,
        'hidden': false,
        'id': 'cluster-owner',
        'locked': false,
        'name': 'Cluster Owner',
        'type': 'roleTemplate',
        'uuid': 'baaa31bf-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 1,
        'sexText': '男',
        'baseType': 'roleTemplate',
        'builtin': false,
        'context': 'project',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'wwww',
        'external': false,
        'hidden': false,
        'id': 'create-ns',
        'locked': false,
        'name': 'Create Namespaces',
        'type': 'roleTemplate',
        'uuid': 'baab1f6f-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1519 弄',
        'sex': 2,
        'sexText': '女',
        'baseType': 'roleTemplate',
        'builtin': false,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'qqq',
        'external': false,
        'hidden': false,
        'id': 'projects-create',
        'locked': false,
        'name': 'Create Projects1',
        'type': 'roleTemplate',
        'uuid': 'bab377ba-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1519 弄',
        'sex': 3,
        'sexText': '无',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'qqq',
        'external': false,
        'hidden': false,
        'id': 'projects-create',
        'locked': false,
        'name': 'Create Projects2',
        'type': 'roleTemplate',
        'uuid': 'bab377ba-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 3,
        'sexText': '无',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'qqq',
        'external': false,
        'hidden': false,
        'id': 'projects-create',
        'locked': false,
        'name': 'Create Projects3',
        'type': 'roleTemplate',
        'uuid': 'bab377ba-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1519 弄',
        'sex': 2,
        'sexText': '女',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'qqq',
        'external': false,
        'hidden': false,
        'id': 'projects-create',
        'locked': false,
        'name': 'Create Projects4',
        'type': 'roleTemplate',
        'uuid': 'bab377ba-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 1,
        'sexText': '男',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'project',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'dddddddd',
        'external': true,
        'hidden': true,
        'id': 'admin',
        'locked': false,
        'name': 'Kubernetes admin',
        'type': 'roleTemplate',
        'uuid': 'bab1d1e6-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 1,
        'sexText': '男',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'cluster',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'cccc',
        'external': true,
        'hidden': true,
        'id': 'cluster-admin',
        'locked': false,
        'name': 'Kubernetes cluster-admin',
        'type': 'roleTemplate',
        'uuid': 'baaf196f-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 2,
        'sexText': '女',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'project',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'sssssss',
        'external': true,
        'hidden': true,
        'id': 'edit',
        'locked': false,
        'name': 'Kubernetes edit',
        'type': 'roleTemplate',
        'uuid': 'bab12d45-93e7-11e8-a55a-0242ac110002'
      }, {
        'address': '上海市普陀区金沙江路 1518 弄',
        'sex': 3,
        'sexText': '无',
        'baseType': 'roleTemplate',
        'builtin': true,
        'context': 'project',
        'created': '2018-07-30T11:00:11Z',
        'createdTS': 1532948411000,
        'creatorId': null,
        'description': 'aaaaaaa',
        'external': true,
        'hidden': true,
        'id': 'view',
        'locked': false,
        'name': 'Kubernetes view',
        'type': 'roleTemplate',
        'uuid': 'baad9e31-93e7-11e8-a55a-0242ac110002'
      }]
      this.options.pagination = Object.assign({}, { limit: 10, total: 11, page: 1, pageSize: 10, pageTotal: 2 })
    },
    // 点击链接或按钮或图片的事件回调
    gridCallBack (type, row) {
      // 打印选中状态
      console.log(this.selections)
      switch (type) {
        case 'name':
          this.clickName(row)
          break
        case 'edit':
          this.edit(row)
          break
        case 'remove':
          this.remove(row)
          break
        default:
          console.log(type)
          console.log(row)
      }
    },
    // endregion

    // region 界面事件处理
    // 点击名称
    clickName (row) {
      console.log('come in clickName method')
      console.log(row)
    },
    // 编辑操作
    edit (row) {
      console.log('come in edit method')
      console.log(row)
    },
    // 删除操作
    remove (row) {
      console.log('come in remove method')
      console.log(row)
    },
    // 分页查询
    paginationQuery (params) {
      console.log('查询条件')
      console.log(params)
    }
    // endregion
  }
}
</script>
