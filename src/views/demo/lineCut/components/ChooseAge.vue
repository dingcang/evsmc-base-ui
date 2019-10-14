<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="test"
    width="850px"
    @close="close"
  >
    <choose-table-row
      ref="chooseTableRowDialog"
      v-model="selections"
      :query-options="queryOptions"
      :grid-options="gridOptions"
      :table-column="tableColumn"
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
</template>

<script>
import _ from 'underscore'
import ChooseTableRow from '@/components/ChooseTableRow'

export default {
  name: 'ChooseAgeDialog',
  components: {
    ChooseTableRow
  },
  data () {
    return {
      // 弹框显示隐藏
      visible: false,
      // 单选多选双向绑定
      selections: [],
      // 旧的选中的数据
      oldId: '',
      // 查询字段
      queryOptions: {
        columns: [{
          name: this.$t('vehicle.unitName'),
          placeholder: this.$t('vehicle.pleaseInputUnitName'),
          type: 'input',
          model: 'unitName',
          id: 0
        }]
      },
      // 表格属性
      gridOptions: {
        // 固定表头属性,不写height则为不固定
        height: 200,
        // 单选
        radioSelection: true,
        radioValue: -1,
        // 分页
        pageable: true
      },
      // 表格列表
      tableColumn: [
        { kind: 'text', prop: 'id', label: 'id' },
        { kind: 'text', prop: 'unitName', label: this.$t('vehicle.unitName') },
        { kind: 'text', prop: 'unifiedSocialCode', label: this.$t('vehicle.unifiedSocialCode') },
        { kind: 'text', prop: 'unitType', label: this.$t('vehicle.unitType') },
        { kind: 'text', prop: 'contacts', label: this.$t('common.contacts') },
        { kind: 'text', prop: 'contactTelephone', label: this.$t('common.contactTelephone') }
      ],
      // 表格数据
      gridData: []
    }
  },
  methods: {
    // 初始化界面
    initData (row) {
      // 有选中的行时记录并在查询表格时选中
      if (!_.isUndefined(row)) this.oldId = row['id']
      // 显示弹窗
      this.visible = true
      // 查询
      this.query()
    },
    query () {
      let that = this
      setTimeout(function () {
        that.gridData = [
          { id: '1', unitName: '奥迪汽车', unifiedSocialCode: 'UOMZBNOHXH1', unitType: '车辆制造企业1', contacts: '罗艳1', contactTelephone: '15080597672' },
          { id: '2', unitName: '吉利汽车', unifiedSocialCode: 'UOMZBNOHXH2', unitType: '车辆制造企业2', contacts: '罗艳2', contactTelephone: '15080597672' },
          { id: '3', unitName: '奥迪汽车', unifiedSocialCode: 'UOMZBNOHXH3', unitType: '车辆制造企业3', contacts: '罗艳3', contactTelephone: '15080597672' },
          { id: '4', unitName: '奔驰汽车', unifiedSocialCode: 'UOMZBNOHXH4', unitType: '车辆制造企业4', contacts: '罗艳4', contactTelephone: '15080597672' },
          { id: '5', unitName: '奔驰汽车', unifiedSocialCode: 'UOMZBNOHXH5', unitType: '车辆制造企业5', contacts: '罗艳5', contactTelephone: '15080597672' },
          { id: '6', unitName: '东风汽车', unifiedSocialCode: 'UOMZBNOHXH6', unitType: '车辆制造企业6', contacts: '罗艳6', contactTelephone: '15080597672' },
          { id: '7', unitName: '沃尔沃汽车', unifiedSocialCode: 'UOMZBNOHXH7', unitType: '车辆制造企业7', contacts: '罗艳7', contactTelephone: '15080597672' },
          { id: '8', unitName: '长城汽车', unifiedSocialCode: 'UOMZBNOHXH8', unitType: '车辆制造企业8', contacts: '罗艳8', contactTelephone: '15080597672' }
        ]
        let radioIndex = that.gridData.findIndex(item => item.id === that.oldId)
        that.$refs.chooseTableRowDialog.radioCheck(radioIndex)
      }, 10)
    },
    // 保存
    save () {
      if (this.selectedNotOneRow()) return
      this.$emit('save', this.selections[0].unitName, this.selections[0])
      this.close()
    },
    // 关闭
    close () {
      // 清空表格 去除选中的数据 隐藏弹窗
      this.gridData = []
      this.selections = []
      this.visible = false
    },
    // 判断只能选一条
    selectedNotOneRow () {
      if (this.selections.length !== 1) this.$message.error(this.$t('common.pleaseSelectOneData'))
      return this.selections.length !== 1
    }
  }
}
</script>
