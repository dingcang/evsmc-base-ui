<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 穿梭框带分页的表格组件，配置多选弹窗或单选弹窗 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="showDialog = true"
        >
          查看弹窗组件
        </el-button>
      </el-col>
    </el-row>
    <transfer-page-table
      ref="transferPageTableRef"
      v-model="showDialog"
      :options="options"
      :query-options="queryOptions"
      :parent-item="parentItem"
      :selected="selected"
      :radio-or-selection="radioOrSelection"
      @transferCallBack="transferCallBack"
      @save="save"
      @cancel="cancel"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
// import { User } from '../../../api'
import TransferPageTable from '@/components/TransferPageTable'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'TransferTableDemo',
  components: {
    TransferPageTable,
    ApiIntroduction
  },
  props: {},
  data () {
    return {
      // 导入查询配置
      queryOptions: {
        radio: {
          // 条件查询显示字段(条件查询字段全显示时,可以不配置该属性)
          condition: [1, 2, 3],
          // 导出查询显示字段(导入查询时不包含条件查询时,可以不配置该属性)
          import: [0],
          // 显示单选
          show: true
        },
        // 导入模板下载地址
        importTemplateUrl: 'vehicleImportSearchFileDownload',
        // 设置一行几列
        colNum: 2
      },
      options: {
        // dialog (width不写默认是normal)
        center: true,
        title: '测试弹窗',
        width: 'normal',
        // 表头描述 (span不写默认是8)
        headTextSpan: 8,
        headText: [{ label: '用户名', model: 'name' }, { label: '性别', model: 'sex' }],
        // 查询
        hiddenQueryDefault: { a: 1 },
        queryColumn: [
          {
            name: this.$t('common.importQueryFile'),
            type: 'upload',
            id: 0
          },
          {
            name: '名称',
            type: 'input',
            model: 'username',
            id: 1
          },
          {
            name: '地址',
            type: 'input',
            model: 'address',
            id: 2
          },
          {
            name: '邮箱',
            type: 'input',
            model: 'email',
            id: 3
          }
        ],
        // 表格接口及查询方法名
        tableApi: '',
        tableQueryMethod: 'query',
        // 表格列
        gridColumn: [
          { kind: 'text', prop: 'username', label: '用户名' },
          { kind: 'text', prop: 'unitName', label: '单位名称' },
          { kind: 'judge',
            prop: 'isValid',
            label: '是否有效',
            param: [] }
        ],
        // 最多可选长度
        limitSelected: 3,
        tagLabel: 'username',
        tagKey: 'id'
        // footerButtons: [{buttonType: 'primary', type: 'save', name: '保存'}, {buttonType: '', type: 'cancel', name: '取消'}]
      },
      // 单选和多选设置
      radioOrSelection: 'selection',
      showDialog: false,
      parentItem: { name: '小李', sex: '女' },
      selected: [{ id: 'bd2cedb73a06483d9dfc73771eac7965', username: 'lhy1' }],

      showApi: false,
      propertyList: [
        { key: 'showDialog', value: '组件隐藏显示,已双向绑定', type: 'Boolean', default: 'false' },
        { key: 'radioOrSelection', value: '表格单选或多选 radio/selection', type: 'String', default: 'selection' },
        { key: 'parentItem', value: '组件头部显示的详细对象,没有详细不传此值', type: 'Object', default: '' },
        { key: 'selected', value: '组件已选中的值,数组类型,单选也传送数组', type: 'Array', default: '[]' },
        { key: 'queryOptions', value: '查询组件的配置项(后续可扩展),没有导入查询可不配置', type: 'Object', default: '' },
        { key: ' - unQuery', value: '设置重置时不查询', type: 'Boolean', default: 'false' },
        { key: ' - colNum', value: '设置一行几列', type: 'Number', default: '4' },
        { key: ' - radio', value: '查询的单选项,包含条件查询和导入查询 没有导入查询可不配置', type: 'Object', default: '' },
        { key: ' - - condition', value: '条件查询时,显示的查询列 不配置显示全部', type: 'Array', default: '' },
        { key: ' - - import', value: '导入查询时,显示的查询列 不配置显示全部', type: 'Array', default: '' },
        { key: ' - - show', value: '显示或隐藏条件查询和导入查询', type: 'Boolean', default: 'false' },
        { key: 'options', value: '组件属性配置', type: 'Object', default: '' },
        { key: ' - center', value: '弹窗居中', type: 'Boolean', default: 'false' },
        { key: ' - title', value: '弹窗的标题', type: '* String', default: '' },
        { key: ' - width', value: '弹窗大小 mini/small/normal/big', type: 'String', default: 'normal' },
        { key: ' - headTextSpan', value: '头部显示对象每列宽度 自己尽量不要设置 用默认', type: 'Number', default: '8' },
        { key: ' - headText', value: '头部显示的数据展示', type: 'Array', default: '[]' },
        { key: '   - label', value: '显示的文字描述', type: 'String', default: '' },
        { key: '   - model', value: '显示的对象属性', type: 'String', default: '' },
        { key: ' - tagKey', value: '标签的键值', type: 'String', default: '' },
        { key: ' - tagLabel', value: '标签显示的名称模型', type: 'String', default: '' },
        { key: ' - tableApi', value: '表格查询的Api', type: 'Object', default: '' },
        { key: ' - tableQueryMethod', value: '表格的查询方法名', type: 'String', default: '' },
        { key: ' - urlParams', value: '查询时有携带在url中的参数', type: 'Object', default: '' },
        { key: ' - hiddenQueryParams', value: '查询时携带在conditions里的参数', type: 'Object', default: '' },
        { key: ' - limitSelected', value: '最大可选长度限制', type: 'Number', default: '' },
        { key: ' - queryColumn', value: '表格的查询列', type: 'Array', default: '[]' },
        { key: '   - placeholder', value: '占位符', type: 'String', default: '' },
        { key: '   - name', value: '显示描述', type: '* String', default: '' },
        { key: '   - model', value: '字段模型', type: 'String', default: '' },
        { key: '   - type', value: '字段类型用于回调', type: 'String', default: '' },
        { key: '   - id', value: '字段主键值', type: '* Number', default: '' },
        { key: ' - gridColumn', value: '表格列', type: 'Array', default: '' },
        { key: '   - kind', value: '列类型', type: '* String', default: '' },
        { key: '   - prop', value: '列模型', type: '* String', default: '' },
        { key: '   - label', value: '列名称', type: '* String', default: '' },
        { key: ' - footerButtons', value: '弹窗页脚按钮 按钮无特殊则不写此属性', type: 'Array', default: '' },
        { key: '   - buttonType', value: '按钮显示的类型 primary/不写/其他', type: 'String', default: '' },
        { key: '   - type', value: '按钮类型用于回调', type: '* String', default: '' },
        { key: '   - name', value: '按钮名称', type: '* String', default: '' },
        { key: '@save', value: '保存按钮回调', type: '事件', default: '' },
        { key: '@cancel', value: '取消按钮回调 不用写', type: '事件', default: '' },
        { key: '@transferCallBack', value: '自定义按钮事件回调 没有自定义则不写此事件', type: '事件', default: '' }]
    }
  },
  mounted () {
    this.setDictColumn()
  },
  methods: {
    setDictColumn () {
      let temp = this.$store.getters['common/dictionary'](this.$globalConstant.BOOL_TYPE)
      for (let item of temp) {
        this.options.gridColumn[2].param.push({ key: 'isValid',
          condition: item.value,
          showText: item.name })
      }
    },
    transferCallBack (type) {
      switch (type) {
        case 'save':
          console.log(type)
          break
        default:
          console.log(type)
      }
    },
    save (data) {
      console.log(data)
    },
    cancel () {
      console.log('cancel')
    }
  }
}
</script>
