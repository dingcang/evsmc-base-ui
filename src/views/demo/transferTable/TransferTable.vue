<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 穿梭框组件，配置用户或角色权限分配 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <transfer-table
      ref="transferTableRef"
      :options="options"
      :table-data="tableData"
      :selected-data="selected"
      @save="save"
      @cancel="cancel"
    />
    <el-row>
      <el-col
        :span="24"
        class="text-align-center"
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
          @click="cancel"
        >
          {{ $t('common.cancel') }}
        </el-button>
      </el-col>
    </el-row>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import TransferTable from '../../../components/TransferTable'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'TransferTableDemo',
  components: {
    TransferTable,
    ApiIntroduction
  },
  props: {},
  data () {
    return {
      options: {
        query: [{ placeholder: '输入姓名过滤', model: 'name', span: 12 },
          { placeholder: '输入年龄过滤', model: 'age', span: 12 }],
        tableColumn: [{ prop: 'name', label: '姓名' }, { prop: 'age', label: '年龄' }],
        tagLabel: 'name',
        rowKey: 'id'
      },
      tableData: [],
      selected: [],
      showApi: false,
      propertyList: [
        { key: 'options', value: '穿梭框属性设置', type: 'Object', default: '' },
        { key: ' - query', value: '表格标题名字', type: 'Array', default: '' },
        { key: '   - placeholder', value: '占位符', type: 'String', default: '' },
        { key: '   - span', value: '列间距', type: '* Number', default: '' },
        { key: '   - model', value: '列模型', type: 'String', default: '' },
        { key: ' - tableColumn', value: '列', type: 'Array', default: '' },
        { key: '   - prop', value: '列模型', type: '* String', default: '' },
        { key: '   - label', value: '列名称', type: '* String', default: '' },
        { key: ' - tagLabel', value: '已选择标签框显示的属性', type: '* String', default: '' },
        { key: ' - rowKey', value: '行的唯一id', type: '* String', default: '' },
        { key: 'tableData', value: '表格数据', type: '* Array', default: '' },
        { key: 'selected', value: '表格已选择的标签', type: 'Array', default: '' }]
    }
  },
  computed: {},
  watch: {},
  mounted () {
    let that = this
    setTimeout(function () {
      that.tableData = [
        { id: 1, name: '小李', age: 12 },
        { id: 2, name: '小王', age: 22 },
        { id: 3, name: '小田', age: 13 },
        { id: 4, name: '小白', age: 23 }]
    }, 2000)
    setTimeout(function () {
      that.selected = [1, 2]
    }, 3000)
  },
  methods: {
    save () {
      console.log(this.$refs.transferTableRef.selected)
    },
    cancel () {
      console.log('cancel')
    }
  }
}
</script>
