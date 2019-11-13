<template>
  <div>
    <div
      v-loading="load"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <el-row class="margin-bottom20">
        <el-col :span="15">
          <!-- 过滤条件 -->
          <el-row :gutter="10">
            <el-col
              v-for="item in options.query"
              :key="item.model"
              :span="item.span"
            >
              <el-input
                v-model="queryModel[item.model]"
                :placeholder="item.placeholder"
                prefix-icon="el-icon-search"
                size="mini"
              />
            </el-col>
          </el-row>
        </el-col>
        <!-- 已选和清除按钮 -->
        <el-col
          :span="4"
          :offset="1"
        >
          {{ t('common.alreadySelect') }} {{ selected.length }} {{ t('common.alreadySelectEnd') }}
        </el-col>
        <el-col :span="4">
          <div class="text-align-right">
            <el-button
              size="mini"
              @click="toggleGrid()"
            >
              {{ t('common.clean') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="margin-bottom20">
        <!-- 表格 -->
        <el-col :span="15">
          <el-table
            ref="transferTable"
            :header-cell-style="tableHeaderColor"
            :data="gridData"
            :row-key="options.rowKey"
            tooltip-effect="dark"
            height="300px"
            style="width: 100%"
            border
            @row-click="rowClick"
            @selection-change="gridSelected"
          >
            <el-table-column
              :reserve-selection="true"
              type="selection"
              width="55"
            />
            <el-table-column
              v-for="item in options.tableColumn"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip
            />
          </el-table>
        </el-col>
        <!-- 已选择标签 -->
        <el-col
          :span="8"
          :offset="1"
        >
          <div class="transfer-table-right">
            <el-tag
              v-for="(tag, index) in selected"
              :key="index"
              :span="24"
              :disable-transitions="false"
              closable
              @close="removeTag(tag)"
            >
              {{ tag[options.tagLabel] }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Locale from '@/mixins/locale'

export default {
  name: 'TransferTable',
  mixins: [Locale],
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          // 查询
          query: [],
          // 表格列
          tableColumn: [],
          // 已选择标签显示属性
          tagLabel: '',
          // 过滤的唯一id
          rowKey: ''
        }
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 已选择的数据回选
    selectedData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // 表头颜色
      tableHeaderColor: {
        'background': '#F7F6Fd'
      },
      // 表格数据
      gridData: [],
      // 查询的model
      queryModel: {},
      // 选中的数据
      selected: [],
      // 加载的遮罩
      load: false,
      // 表格全部数据,用于记录
      allData: []
    }
  },
  watch: {
    // 设置表格数据
    tableData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.allData = []
        this.gridData = []
        this.allData = val
        this.gridData = val
      }
    },
    // 过滤表格
    queryModel: {
      deep: true,
      handler (val) {
        this.filterGridData()
      }
    },
    // 设置已选择的数据
    selectedData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.selected = []
        let selectedArr = []
        if (val !== undefined && val.length > 0) {
          for (let cur of val) {
            let index = this.gridData.findIndex(item => item.id === cur)
            if (index !== -1) selectedArr.push(this.gridData[index])
          }
          if (selectedArr.length > 0) this.toggleGrid(selectedArr)
        }
      }
    }
  },
  methods: {
    // 过滤表格数据
    filterGridData () {
      let queryArr = Object.keys(this.queryModel)
      if (queryArr.length === 0) {
        this.gridData = this.tableData
      } else {
        let arr = this.tableData
        for (let item of queryArr) {
          let filterText = this.queryModel[item] + ''
          arr = arr.filter(data => (data[item] + '').includes(filterText))
        }
        this.gridData = arr
      }
    },
    // 移除已选择
    removeTag (tag) {
      this.$refs.transferTable.toggleRowSelection(tag, false)
    },
    // 多选点击回调
    gridSelected (val) {
      this.selected = val
    },
    // 行点击事件回调
    rowClick (row) {
      this.toggleGrid([row])
    },
    // 设置选中或取消
    toggleGrid (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.transferTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.transferTable.clearSelection()
      }
    }
  }
}
</script>

<style>

</style>
