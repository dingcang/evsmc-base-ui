<template>
  <div class="xy-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <div>
          <layout>
            <query
              ref="query"
              slot="query"
              :query-dom="queryDom"
              @query="query"
              @reset="reset"
            />
            <batch-button
              ref="batchButton"
              slot="batchButton"
              :button-list="buttonList"
              @setColumnDisplay="setColumnDisplay"
              @saveColumnDisplay="saveColumnDisplay"
            />
            <grid
              ref="grid"
              slot="grid"
              v-model="selections"
              :grid-options="gridOptions"
              :grid-column="gridColumn"
              :grid-data="gridData"
              :grid-operation="gridOperation"
              @gridCallBack="gridCallBack"
              @selectedRow="selectedRow"
              @setPageParam="query"
            />
          </layout>
        </div>
      </el-col>
      <el-col
        :span="14"
        class="margin-top20"
      >
        <el-row>
          <div style="text-align: center">
            <el-col :span="6">
              已处理
            </el-col>
            <el-col :span="6">
              未处理
            </el-col>
            <el-col :span="6">
              故障
            </el-col>
            <el-col :span="6">
              预警
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div style="text-align: center;font-weight: bolder;font-size: 18px;color: red;">
            <el-col :span="6">
              2222
            </el-col>
            <el-col :span="6">
              3333
            </el-col>
            <el-col :span="6">
              4444
            </el-col>
            <el-col :span="6">
              5555
            </el-col>
          </div>
        </el-row>
        <div class="xy-block margin-top20">
          <div class="xy-title">
            {{ $t('vehicle.basicInformation') }}
          </div>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleManufacturer') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                3
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
          </el-row>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleManufacturer') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                3
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="xy-block margin-top20">
          <div class="xy-title">
            {{ $t('vehicle.basicInformation') }}
          </div>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('common.vin') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                1
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.internalCode') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                2
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.internalCode') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                2
              </div>
            </el-col>
          </el-row>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleManufacturer') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                3
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.internalCode') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                2
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="xy-block margin-top20">
          <div class="xy-title">
            {{ $t('vehicle.basicInformation') }}
          </div>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleManufacturer') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                3
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
          </el-row>
          <el-row class="bd-purple">
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleManufacturer') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                3
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <span>{{ $t('vehicle.vehicleNoticeNumber') }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                4
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="height: 200px; width: 500px;background: yellow">
          aaa
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Layout from '@/components/LayoutGridPage'
import Query from '@/components/Query'
import BatchButton from '@/components/BatchButton'
import Grid from '@/components/Grid'

export default {
  name: 'AlarmReminder',
  components: {
    Layout,
    Query,
    BatchButton,
    Grid
  },
  data () {
    return {
      // 默认查询条件
      queryParams: {
        conditions: [],
        sort: [],
        start: 0,
        limit: 10
      },
      // region grid
      // 单/多选值记录, 单选用selections[0]取值
      selections: [],
      // 表格属性
      gridOptions: {
        // 多选
        checkboxSelection: true,
        // 列操作按钮
        operationShow: false,
        tableLoading: false,
        // 显示表头
        showHeader: true
      },
      gridData: [],
      // region query
      queryDom: [
        {
          name: 'VIN',
          type: 'input',
          model: 'name',
          id: 0
        }, {
          name: '类型',
          type: 'select',
          model: 'isValid',
          data: [{ name: '全部', value: '' }, { name: '故障码', value: '1' }, { name: '参数异常', value: '2' }],
          id: 1
        }
      ],
      // endregion
      // region button
      buttonList: [
        { kind: 'button', type: '', icon: '', name: '批量处理' },
        { kind: 'button', type: '', icon: '', name: '历史报警' },
        { kind: 'button', type: 'export', icon: 'fa-download', name: this.$t('common.export') }
      ],
      // endregion
      // region grid
      gridColumn: [
        { kind: 'tag',
          prop: 'a',
          label: '故障类型',
          param: [
            { key: 'a', value: '故障码', color: 'red', fontColor: 'white' },
            { key: 'a', value: '预警', color: 'orange', fontColor: 'white' }] },
        { kind: 'boldText',
          prop: 'b',
          label: '报警名称',
          width: '230px',
          param: [
            { title: 'VIN', prop: 'f' },
            { title: '开始时间', prop: 'e' }] },
        { kind: 'colorText',
          prop: 'c',
          label: '处理状态',
          param: [
            { key: 'c', value: '未处理', color: 'red', icon: 'fa-edit', type: 'editA' },
            { key: 'c', value: '已处理', color: 'green' }] },
        { kind: 'colorText',
          prop: 'd',
          label: '危险级别',
          param: [
            { key: 'd', value: '1级', color: 'red' },
            { key: 'd', value: '2级', color: 'orange' },
            { key: 'd', value: '3级', color: 'blue' }] },
        { kind: 'iconText',
          prop: 'gText',
          label: '图标和字',
          param: [
            { key: 'g', value: 1, color: '', icon: 'fa-lock default-color' },
            { key: 'g', value: 2, color: '', icon: 'fa-unlock default-color' },
            { key: 'g', value: 3, color: '', icon: 'fa-plus default-color' },
            { key: 'g', value: 4, color: '', icon: 'fa-remove default-color' }] }
      ],
      gridOperation: []
      // endregion
    }
  },
  computed: {
    queryRef () {
      return this.$refs.query
    },
    buttonRef () {
      return this.$refs.batchButton
    },
    gridRef () {
      return this.$refs.grid
    }
  },
  watch: {},
  mounted () {
    this.query()
  },
  methods: {
    // region query
    // 查询
    query () {
      this.gridData = [
        { id: '1', type: 'red', a: '故障码', b: '车辆起飞信号', c: '未处理', d: '1级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 1, gText: '在线' },
        { id: '2', type: 'orange', a: '预警', b: '车辆等待起飞', c: '已处理', d: '2级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 2, gText: '离线' },
        { id: '3', type: 'orange', a: '故障码', b: '车辆起飞信号2', c: '未处理', d: '3级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 3, gText: '充电' },
        { id: '4', type: 'orange', a: '预警', b: '车辆等待起飞3', c: '已处理', d: '1级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 4, gText: '在线' },
        { id: '11', type: 'orange', a: '故障码', b: '车辆起飞信号', c: '未处理', d: '3级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 1, gText: '在线' },
        { id: '21', type: 'orange', a: '预警', b: '车辆等待起飞', c: '已处理', d: '2级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 2, gText: '离线' },
        { id: '31', type: 'orange', a: '故障码', b: '车辆起飞信号2', c: '未处理', d: '3级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 3, gText: '在线' },
        { id: '41', type: 'orange', a: '预警', b: '车辆等待起飞3', c: '已处理', d: '2级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 3, gText: '离线' },
        { id: '12', type: 'red', a: '故障码', b: '车辆起飞信号', c: '未处理', d: '3级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 3, gText: '充电' },
        { id: '22', type: 'red', a: '预警', b: '车辆等待起飞', c: '已处理', d: '2级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 2, gText: '充电' },
        { id: '32', type: 'red', a: '故障码', b: '车辆起飞信号2', c: '未处理', d: '3级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 2, gText: '在线' },
        { id: '42', type: 'red', a: '预警', b: '车辆等待起飞3', c: '已处理', d: '2级', e: '2018-11-08 17:41:09', f: 'LJJJHDGDGDGDGDGSGSH', g: 4, gText: '离线' }]
      this.gridOptions.pagination = { limit: 10, start: 0, total: 12 }
      // 选中第一行
      this.gridRef.setCurrentRow(this.gridData[0])
    },
    // 重置
    reset () {
      this.queryParams.conditions = []
      this.queryParams.start = 0
    },
    // endregion

    // region button
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
    gridCallBack (type, row) {
      switch (type) {
        case 'editA':
          console.log(row)
          break
        default:
          console.log('d')
          console.log(row)
      }
    },
    // 单击行的动作
    selectedRow (row) {
      console.log(row)
    }
  }
}
</script>
