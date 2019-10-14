<template>
  <dialog-head
    v-model="visible"
    :options="dialogOptions"
  >
    <div slot="content">
      <el-row>
        <el-col
          :span="24"
          class="xy-column-check"
        >
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAll"
          >
            {{ $t("common.allChecked") }}
          </el-checkbox>
        </el-col>
        <el-col
          v-for="(column, index) in columns"
          :key="index"
          :span="24"
        >
          <el-checkbox
            v-show="showColumn(column)"
            v-model="column.show"
            :label="column.label"
            @change="handleCheckedColumn"
          >
            {{ column.label }}
          </el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        size="mini"
        @click="save"
      >
        {{ $t('common.save') }}
      </el-button>
      <el-button
        size="mini"
        @click="close"
      >
        {{ $t('common.cancel') }}
      </el-button>
    </div>
  </dialog-head>
</template>

<script>
// import { PersonalCenter } from '@/api'
import DialogHead from '@/components/DialogHead'
export default {
  name: 'GridColumnDisplay',
  components: {
    DialogHead
  },
  data () {
    return {
      dialogOptions: {
        // 弹窗名称
        title: this.$t('common.chooseColumn'),
        width: 'mini',
        center: true
      },
      // 全选
      checkAll: false,
      // 全选样式
      isIndeterminate: false,
      // 显示隐藏组件
      visible: false,
      // 列
      columns: [],
      // 隐藏的前两列
      hiddenColumns: [],
      // 保存时的tableKey
      gridColumnKey: ''
    }
  },
  methods: {
    // 初始化并打开dialog
    initData (columns, gridColumnKey) {
      // 设置表格名称  如果没传入则取路由名称
      this.gridColumnKey = gridColumnKey || this.$route.name
      this.visible = true
      this.columns = this.setHiddenColumn(columns)
      this.showCheckAllOrIndeterminate()
    },
    // 设置前两列隐藏
    setHiddenColumn (columns) {
      this.hiddenColumns = []
      let len = columns.length
      if (len >= 2) {
        this.hiddenColumns = columns.splice(0, 2)
      } else if (len === 1) {
        this.hiddenColumns = columns.splice(0, 1)
      }
      return columns
    },
    // 判断列显示隐藏
    showColumn (column) {
      return column.kind === 'iconText' ||
          column.kind === 'moreTitle' ||
          column.kind === 'tag' ||
          column.kind === 'boldText' ||
          column.kind === 'colorText' ||
          column.kind === 'link' ||
          column.kind === 'text' ||
          column.kind === 'judge' ||
          column.kind === 'image'
    },
    // 点击全选
    handleCheckAll (val) {
      this.columns.forEach((item) => {
        item.show = val
      })
      this.isIndeterminate = false
    },
    // 点击列
    handleCheckedColumn () {
      this.showCheckAllOrIndeterminate()
    },
    // 判断选中数目的状态显示
    showCheckAllOrIndeterminate () {
      let checkedCount = this.columns.filter(item => item.show).length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    },
    // 保存
    save () {
      let param = {
        tableId: this.gridColumnKey,
        columns: []
      }
      for (let item of this.columns) {
        if (!item.show) param.columns.push(item.prop)
      }
      // PersonalCenter.hiddenColumns(param).then(() => {
      //   // 设置本地隐藏列
      //   this.$store.commit('setHiddenGridColumnById', param)
      //   this.columns = [...this.hiddenColumns, ...this.columns]
      //   this.$emit('save', this.columns)
      //   this.close()
      // })
    },
    // 关闭
    close () {
      this.visible = false
    }
  }
}
</script>
