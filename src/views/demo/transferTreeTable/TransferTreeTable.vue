<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 树表格穿梭框组件，配置从树中选中数据 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <transfer-tree-table
      ref="transferTableRef"
      v-model="selected"
      :options="options"
      :tree-options="treeOptions"
      :tree-data="treeData"
      :selected-data="selectedData"
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
import TransferTreeTable from '@/components/TransferTreeTable'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'TransferTreeTableDemo',
  components: {
    TransferTreeTable,
    ApiIntroduction
  },
  data () {
    return {
      options: {
        // 左侧显示名称
        leftTitleName: '未选择的数据项',
        // 标签显示名称
        tagLabel: 'name'
      },
      // 树的属性配置
      treeOptions: {
        // 查询占位符
        queryPlaceholder: '输入名称过滤',
        // 显示名称 默认是label
        label: 'name',
        // 子节点名称 默认children
        children: 'child',
        // 多选
        showCheckbox: true,
        // 全展开
        defaultExpandAll: true,
        // node-key绑定的字段
        nodeKey: 'id'
      },
      // 树数据
      treeData: [],
      // 已选择数据
      selectedData: [],
      // 双向绑定选中的数据
      selected: [],
      showApi: false,
      propertyList: [
        { key: 'options', value: '树穿梭框配置', type: 'Object', default: '' },
        { key: ' - leftTitleName', value: '左侧显示标题名字显示', type: 'String', default: '' },
        { key: ' - tagLabel', value: '标签显示名称', type: 'String', default: '' },
        { key: 'treeOptions', value: '树配置', type: 'Object', default: '' },
        { key: ' - queryPlaceholder', value: '过滤字段占位符', type: 'String', default: '' },
        { key: ' - label', value: '树显示字段', type: '* String', default: '' },
        { key: ' - children', value: '树子节点字段', type: '* String', default: '' },
        { key: ' - showCheckbox', value: '多选显示', type: 'Boolean', default: '' },
        { key: ' - defaultExpandAll', value: '全展开树', type: 'Boolean', default: 'false' },
        { key: ' - nodeKey', value: '树的唯一键值', type: 'String', default: '' },
        { key: 'treeData', value: '一次性加载所有数据的树', type: '', default: '' },
        { key: 'selectedData', value: '树的选中数据', type: 'Array', default: '[]' },
        { key: 'selected', value: '选中Tag数据', type: 'Array', default: '[]' }]
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.treeData = [{
        id: 1,
        name: '一级 1',
        child: [{
          id: 2,
          name: '二级 1-1'
        }, {
          id: 3,
          name: '三级 1-1-1'
        }]
      }, {
        id: 4,
        name: '一级 2',
        child: [{
          id: 5,
          name: '二级 2-1'
        }, {
          id: 6,
          name: '三级 2-1-1'
        }, {
          id: 7,
          name: '二级 2-2'
        }, {
          id: 8,
          name: '三级 2-2-1'
        }]
      }, {
        id: 9,
        name: '一级 3',
        child: [{
          id: 10,
          name: '二级 3-1'
        }, {
          id: 11,
          name: '三级 3-1-1'
        }, {
          id: 12,
          name: '二级 3-2'
        }, {
          id: 13,
          name: '三级 3-2-1'
        }]
      }]
    }, 2000)
    setTimeout(function () {
      that.selectedData = [2, 11]
    }, 3000)
  },
  methods: {
    save (data) {
      console.log(data)
    },
    cancel () {
      console.log('cancel')
    }
  }
}
</script>
