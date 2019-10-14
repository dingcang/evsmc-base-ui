<template>
  <div class="xy-container">
    <el-row :gutter="30">
      <el-col :span="4">
        <tree
          ref="treeDemo"
          :options="options"
          @nodeCallBack="nodeCallBack"
          @loadNode="loadNode"
        />
      </el-col>
      <el-col
        v-loading="loadRight"
        :span="20"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <div>
          <query
            ref="vehicleListQuery"
            slot="query"
            :options="queryOptions"
            :query-dom="queryDom"
            @query="query"
            @reset="reset"
            @queryCallBack="select"
          />
          <batch-button
            ref="vehicleListButton"
            slot="batchButton"
            :button-list="buttonList"
            @buttonCallBack="buttonCallBack"
            @setColumnDisplay="setColumnDisplay"
            @saveColumnDisplay="saveColumnDisplay"
          />
          <grid
            ref="vehicleListGrid"
            slot="grid"
            v-model="selections"
            :grid-options="gridOptions"
            :grid-column="gridColumn"
            :grid-data="gridData"
            :grid-operation="gridOperation"
            @gridCallBack="gridCallBack"
            @setPageParam="query"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// api和工具类引用
// import _ from 'underscore'
// import { Vehicle } from '../../../api'

// 组件
import Query from '@/components/Query'
import BatchButton from '@/components/BatchButton'
import Grid from '@/components/Grid'
import Tree from '@/components/Tree'
export default {
  name: 'TreeGrid',
  components: {
    Tree, Query, BatchButton, Grid
  },
  data () {
    return {
      loadRight: false,
      options: {
        // 显示名称 默认是label
        label: 'name',
        // 子节点名称 默认children
        children: 'child',
        // 多选 默认false
        checkbox: true,
        // node-key绑定的字段 默认id
        nodeId: 'id',
        // 树展开的节点 默认空
        defaultExpandedKeys: [1, 2],
        // 树选中的节点 默认空
        defaultCheckedKeys: [5],
        // 树全展开显示 默认false
        defaultExpandAll: false,
        // 显示过滤
        showFilter: true,
        // 懒加载
        lazy: true
      },
      // 默认查询条件
      queryParams: {
        conditions: [],
        sort: [],
        start: 0,
        limit: 10
      },
      // region query
      // 单选切换配置(没有条件查询和导入查询时不写该配置项)
      queryOptions: {
        radio: {
          // 条件查询显示字段(条件查询字段全显示时,可以不配置该属性)
          condition: [1, 2, 3, 4, 5, 6, 7],
          // 导出查询显示字段(导入查询时不包含条件查询时,可以不配置该属性)
          import: [0],
          // 单选显示
          show: true
        }
      },
      queryDom: [
        {
          name: this.$t('common.importQueryFile'),
          type: 'upload',
          action: 'https://jsonplaceholder.typicode.com/posts/',
          id: 0
        }, {
          name: this.$t('common.plateNumber'),
          type: 'input',
          model: 'plateNumber',
          id: 1
        }, {
          name: this.$t('common.vin'),
          type: 'input',
          model: 'vin',
          id: 2
        }, {
          name: this.$t('common.vehicleProductionEnterprises'),
          type: 'search',
          model: 'vehicleProductionEnterprises',
          id: 3
        }, {
          name: this.$t('common.terminalProductionEnterprise'),
          type: 'search',
          model: 'terminalProductionEnterprise',
          id: 4
        }, {
          name: this.$t('common.iccid'),
          type: 'input',
          model: 'iccid',
          id: 5
        }, {
          name: this.$t('common.carOwnerInformation'),
          type: 'input',
          model: 'carOwnerInformation',
          id: 6
        }, {
          name: this.$t('common.contactTelephone'),
          type: 'input',
          model: 'contactTelephone',
          id: 7
        }
      ],
      // endregion
      // region button
      buttonList: [
        { kind: 'button', type: 'add', icon: 'fa-plus', name: this.$t('common.add') },
        { kind: 'dropDown', icon: 'fa-trash', name: this.$t('common.import'), data: [{ type: 'importModule', icon: 'fa-download', name: this.$t('common.importModule') }, { type: 'batchImport', icon: 'fa-download', name: this.$t('common.batchImport') }, { type: 'batchUpdate', icon: 'fa-download', name: this.$t('common.batchUpdate') }] },
        { kind: 'dropDown', icon: 'fa-trash', name: this.$t('common.export'), data: [{ type: 'listDataExport', icon: 'fa-download', name: this.$t('common.listDataExport') }, { type: 'batchUpdateDataExport', icon: 'fa-download', name: this.$t('common.batchUpdateDataExport') }, { type: 'nationalPlatformDataExport', icon: 'fa-download', name: this.$t('common.nationalPlatformDataExport') }] }
      ],
      // endregion
      // region grid
      // 单/多选值记录, 单选用selections[0]取值
      selections: [],
      // 表格属性
      gridOptions: {
        // 多选
        checkboxSelection: true,
        // 列操作按钮
        operationShow: true,
        operationFixed: 'right',
        tableLoading: false
      },
      gridColumn: [
        { kind: 'link', prop: 'vin', label: this.$t('common.vin'), fixed: true, width: '200px' },
        { kind: 'link', prop: 'plateNumber', label: this.$t('vehList.plateNumber') },
        { kind: 'text', prop: 'internalCode', label: this.$t('vehicle.internalCode') },
        { kind: 'text', prop: 'vehicleModel', label: this.$t('common.vehicleModel') },
        { kind: 'text', prop: 'vehicleTypes', label: this.$t('common.vehicleType') },
        { kind: 'text', prop: 'vehicleAnnouncementType', label: this.$t('common.vehicleNoticeType') },
        { kind: 'text', prop: 'terminalProductionEnterprise', label: this.$t('vehList.terminalProductionEnterprise') },
        { kind: 'text', prop: 'terminalModel', label: this.$t('vehList.terminalModel') },
        { kind: 'text', prop: 'mobileSubscriberNumber', label: this.$t('vehList.mobileSubscriberNumber') },
        { kind: 'text', prop: 'iccid', label: this.$t('common.iccid') },
        { kind: 'text', prop: 'carOwnerInformation', label: this.$t('vehList.carOwnerInformation') },
        { kind: 'text', prop: 'contactTelephone', label: this.$t('vehList.contactTelephone') },
        { kind: 'text', prop: 'vehiclePhase', label: this.$t('vehList.vehiclePhase') },
        { kind: 'text', prop: 'vehiclePhaseChangeTime', label: this.$t('vehList.vehiclePhaseChangeTime') },
        { kind: 'text', prop: 'lastOperator', label: this.$t('vehList.lastOperator') },
        { kind: 'text', prop: 'entryTime', label: this.$t('vehList.entryTime') }
      ],
      gridData: [],
      gridOperation: [
        { name: this.$t('common.edit'), icon: 'fa-edit', type: 'edit' },
        { name: this.$t('common.remove'), icon: 'fa-trash', type: 'remove' }
      ]
      // endregion
    }
  },
  computed: {
    queryRef () {
      return this.$refs.vehicleListQuery
    },
    gridRef () {
      return this.$refs.vehicleListGrid
    },
    buttonRef () {
      return this.$refs.vehicleListButton
    }
  },
  mounted () {
    // 进入页面时的第一次查询
    this.query()
  },
  methods: {
    // 点击树节点的事件回调
    nodeCallBack (data) {
      console.log(data)
      this.loadRight = true
      setTimeout(() => {
        this.loadRight = false
      }, 2000)
      this.query()
    },
    // 懒加载设置数据
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      setTimeout(() => {
        if (node.level === 1) return resolve([{ name: 'region3' }, { name: 'region4' }])
        if (node.level === 2) return resolve([])
      }, 500)
    },
    // region query
    // 查询
    query (params, files) {
      if (this.radioOptions && this.radioOptions.default === 'import') console.log(files)
      Object.assign(this.queryParams, params)
      // Vehicle.query(this.queryParams).then(resp => {
      //   this.gridData = resp.data
      //   this.gridOptions.pagination = { limit: -1, total: resp.data.length }
      // }, error => {
      //   console.log('error', error)
      // })
    },
    reset () {
      this.queryParams.conditions = []
    },
    // 查询search弹出框回调
    select (index, param) {
      switch (index) {
        case 3:
          // 选择车辆生产企业
          this.selectVehicle(param)
          break

        case 4:
          // 选择终端生产企业
          this.selectTerminal(param)
          break

        default:
          console.log(index, param)
      }
    },
    // endregion

    // region button
    // 按钮组件回调的总入口,根据不同type调用不同方法
    buttonCallBack (type) {
      switch (type) {
        case 'add':
          this.add()
          break
        case 'edit':
          this.edit()
          break
        case 'remove':
          this.remove()
          break
        default:
          console.log(type)
      }
    },
    // 列显示隐藏
    setColumnDisplay () {
      let columns = this.$method.deepCopy(this.gridRef.tableColumn)
      this.buttonRef.openColumnDisplay(columns)
    },
    // 保存列显示隐藏
    saveColumnDisplay (columns) {
      this.gridRef.setColumnDisplay(columns)
    },
    // endregion

    // region grid
    // 表格事件回调 link和button
    gridCallBack (type, row) {
      switch (type) {
        case 'vin':
          this.$router.push({ name: 'detailVehList', params: { id: row.id + 'test' } })
          break
        case 'edit':
          this.edit(row)
          break
        case 'remove':
          this.remove(row)
          break
        default:
          console.log(this.selections)
          console.log(type)
          console.log(row)
      }
    },
    // endregion
    // region list function
    // 新增
    add () {
      this.$router.push({ name: 'addVehList' })
    },
    // 编辑
    edit (row) {
      this.$router.push({ name: 'editVehList', params: { id: row.id } })
    },
    // 删除
    remove (row) {
      this.$confirm(this.$t('common.deleteDescription'), this.$t('common.confirmTip'), {
        cancelButtonClass: 'btn-custom-cancel',
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // 当前删除为列表中删掉一条  实际开发中应当刷新表格因为涉及到分页
        // let id = row.id
        // Vehicle.remove(id).then(resp => {
        //   if (_.isUndefined(resp.data.removed)) return
        //   this.gridData.splice(this.gridData.findIndex(item => item.id === id), 1)
        //   // this.query()
        // }).catch(error => {
        //   console.log(error)
        // })
      })
    },
    // 判断选中一行
    selectedNotOneRow () {
      if (this.selections.length !== 1) this.$message.error(this.$t('common.pleaseSelectOneData'))
      return this.selections.length !== 1
    },
    // 选择车辆生产企业
    selectVehicle (rows) {
      this.chooseRef.initData(rows)
    },
    // 选择终端生产企业
    selectTerminal (rows) {
    },
    // 保存search弹窗回调
    saveSelected (showText, rows) {
      this.queryRef.setOpenDialogValue(showText, rows)
    }
    // endregion
  }
}
</script>
