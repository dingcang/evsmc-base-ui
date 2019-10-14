<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 弹出框，带查询和表格 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('vehicle.chooseVehicleProductionEnterprises')"
      :visible.sync="visible"
      width="850px"
      @close="close"
    >
      <choose-table-row
        ref="chooseTableRowDialog"
        v-model="selections"
        :query-options="queryOptions"
        :query-default="queryDefault"
        :grid-options="gridOptions"
        :table-column="tableColumn"
        :hidden-query-default="hiddenQueryDefault"
        :grid-data="gridData"
        @query="query"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >{{ $t('common.confirm') }}</el-button>
        <el-button
          size="mini"
          @click="close"
        >{{ $t('common.cancel') }}</el-button>
      </span>
    </el-dialog>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
// import { Vehicle } from '../../../api'
import ChooseTableRow from '@/components/ChooseTableRow'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'ChooseTableRowDialogDemo',
  components: {
    ChooseTableRow,
    ApiIntroduction
  },
  data () {
    return {
      // 弹框显示隐藏
      visible: true,
      // 单选多选双向绑定
      selections: [],
      // 查询字段
      queryOptions: {
        // 隐藏查询条件
        hidden: false,
        // 隐藏查询按钮
        hiddenQueryBtn: false,
        columns: [{
          name: this.$t('vehicle.unitName'),
          placeholder: this.$t('vehicle.pleaseInputUnitName'),
          type: 'input',
          model: 'unitName',
          id: 0
        }, {
          name: this.$t('common.sex'),
          type: 'select',
          model: 'sex',
          data: [
            { name: this.$t('common.male'), value: '1' },
            { name: this.$t('common.female'), value: '2' }
          ],
          id: 1
        }, {
          name: this.$t('common.date'),
          placeholder: this.$t('common.selectDate'),
          type: 'date',
          model: 'date',
          dateType: 'date',
          id: 2
        }, {
          name: this.$t('common.datetime'),
          placeholder: this.$t('common.selectDatetime'),
          type: 'datetime',
          model: 'datetime',
          dateType: 'datetime',
          id: 3
        }]
      },
      // 查询时默认值
      queryDefault: {
        0: 'testDefault',
        1: '1'
      },
      // 隐藏的默认查询条件
      hiddenQueryDefault: {
        kk: '11'
      },
      // 表格属性
      gridOptions: {
        // 多选
        checkboxSelection: true,
        // 分页
        pageable: true
      },
      // 表格列表
      tableColumn: [
        { kind: 'text', prop: 'unitName', label: this.$t('vehicle.unitName') },
        { kind: 'text', prop: 'unifiedSocialCode', label: this.$t('vehicle.unifiedSocialCode') },
        { kind: 'text', prop: 'unitType', label: this.$t('vehicle.unitType') },
        { kind: 'text', prop: 'contacts', label: this.$t('common.contacts') },
        { kind: 'text', prop: 'contactTelephone', label: this.$t('common.contactTelephone') }
      ],
      // 表格数据
      gridData: [],
      showApi: false,
      propertyList: [
        { key: 'v-model', value: '双向绑定选择框选中的值', type: 'Array', default: '[]' },
        { key: 'query-options', value: '查询条件配置', type: 'Object', default: '' },
        { key: ' - hidden', value: '隐藏查询', type: 'Boolean', default: 'false' },
        { key: ' - hiddenQueryBtn', value: '隐藏查询重置按钮', type: 'Boolean', default: 'false' },
        { key: ' - columns', value: '查询的列配置', type: 'Array', default: '' },
        { key: ' - - name', value: '查询列的名称', type: 'String', default: '' },
        { key: ' - - placeholder', value: '查询列的占位符', type: 'String', default: '' },
        { key: ' - - type', value: '查询列类型 input/select/data/datatime', type: '* String', default: '' },
        { key: ' - - model', value: '查询列的模型名', type: '* String', default: '' },
        { key: ' - - id', value: '查询列的唯一标识,建议从0开始排列', type: '* Number', default: '' },
        { key: ' - - data', value: '当type=select时,绑定的下拉菜单 包含name和value属性必填', type: 'Array', default: '' },
        { key: ' - - dateType', value: '当type=data时,需要设置dataType=date/datatime', type: 'String', default: '' },
        { key: 'query-default', value: '查询的默认查询条件 设置时用查询列id和值', type: 'Object', default: '' },
        { key: 'hidden-query-default', value: '查询的隐藏默认查询条件', type: 'Object', default: '' },
        { key: 'grid-options', value: '表格属性设置', type: 'Object', default: '' },
        { key: ' - checkboxSelection', value: '多选框显示 true/false', type: 'Boolean', default: 'false' },
        { key: ' - fixedCheckbox', value: '固定多选框', type: 'Boolean', default: 'false' },
        { key: ' - checkboxWidth', value: '多选框长度', type: 'String', default: '30' },
        { key: ' - radioSelection', value: '单选框显示 true/false', type: 'Boolean', default: 'false' },
        { key: ' - radioFixed', value: '固定单选框', type: 'Boolean', default: 'false' },
        { key: ' - radioWidth', value: '单选框长度', type: 'String', default: '30' },
        { key: ' - radioValue', value: '单选框选中的值', type: 'String', default: '-1' },
        { key: ' - operationWidth', value: '操作列长度 true/false', type: 'String', default: '100px' },
        { key: ' - operationShow', value: '操作列显示', type: 'Boolean', default: 'false' },
        { key: ' - operationFixed', value: '固定操作列', type: 'String', default: 'false' },
        { key: ' - tableLoading', value: '表格加载动画', type: 'Boolean', default: 'true' },
        { key: ' - pageable', value: '分页显示 true/false', type: 'Boolean', default: 'false' },
        { key: 'table-column', value: '表格标题名字', type: 'Array', default: '' },
        { key: ' - kind', value: '表格列类型 text/link/links/judge/image/button/buttons', type: '* String', default: '' },
        { key: ' - prop', value: '表格列模型名绑定', type: '* String', default: '' },
        { key: ' - label', value: '表格表头名称', type: 'String', default: '' },
        { key: 'grid-data', value: '表格数据', type: 'Array', default: '' },
        { key: '@query', value: '查询按钮回调', type: '事件', default: '' }]
    }
  },
  mounted () {
    // 查询
    this.query()
  },
  methods: {
    query (params) {
      console.log(params)
      // Vehicle.query(params).then(resp => {
      //   this.gridData = resp.data
      //   this.gridOptions.pagination = Object.assign({}, { limit: -1, total: resp.data.length })
      // }).catch(error => {
      //   console.log('error', error)
      // })
    },
    // 保存
    save () {
      if (this.$method.notOneRow(this.selections)) return
      console.log(this.selections)
      this.close()
    },
    // 关闭
    close () {
      this.visible = false
    }
  }
}
</script>
