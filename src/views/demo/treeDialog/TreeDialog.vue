<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 弹窗树组件,配置弹窗树选择 </span>
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
    <tree-dialog
      ref="treeDialog"
      v-model="showDialog"
      :options="options"
      :tree-options="treeOptions"
      :parent-item="parentItem"
      :selected="selected"
      :last-child="false"
      radio-or-selection="radio"
      @save="save"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
// import {VehType} from '../../../api'
import TreeDialog from '@/components/TreeDialog'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'TreeDialogDemo',
  components: {
    TreeDialog,
    ApiIntroduction
  },
  props: {},
  data () {
    return {
      // 弹窗配置
      options: {
        // 弹窗名称
        title: '树组件选择弹窗',
        width: 'mini',
        // 表头描述 (span不写默认是12)
        headTextSpan: 12,
        headText: [{ label: '用户名', model: 'name' }, { label: '性别', model: 'sex' }],
        // 接口及查询方法名
        treeApi: '',
        treeQueryMethod: 'queryTree'
      },
      // 树的属性配置
      treeOptions: {
        // node-key绑定的字段
        nodeId: 'id',
        // 显示名称
        label: 'label',
        // 子节点名称 默认children
        children: 'children',
        // 树全展开显示
        defaultExpandAll: true,
        // 显示过滤
        showFilter: true,
        // 多选框 显示隐藏
        checkbox: true,
        // 父子不关联 (单选时一定要设置为true)
        strictly: true
      },
      // 弹窗隐藏显示
      showDialog: false,
      // 详细的对象
      parentItem: { name: '小李', sex: '女' },
      // 已选中
      selected: [],
      // selected: [{id: 'a64c8bda15c6444d89b01954fe83d76c'}, {id: '1'}],

      showApi: false,
      propertyList: [
        { key: 'showDialog', value: '组件隐藏显示,已双向绑定', type: 'Boolean', default: 'false' },
        { key: 'parentItem', value: '组件头部显示的详细对象,没有详细不传此值', type: 'Object', default: '' },
        { key: 'selected', value: '组件已选中的值,数组类型,单选也传送数组', type: 'Array', default: '[]' },
        { key: 'autoTreeData', value: '树组件默认数据', type: 'Array', default: '[]' },
        { key: 'options', value: '组件属性配置', type: 'Object', default: '' },
        { key: ' - center', value: '弹窗居中', type: 'Boolean', default: 'false' },
        { key: ' - title', value: '弹窗的标题', type: '* String', default: '' },
        { key: ' - width', value: '弹窗大小 mini/small/normal/big', type: 'String', default: 'mini' },
        { key: ' - headTextSpan', value: '头部显示对象每列宽度 自己尽量不要设置 用默认', type: 'Number', default: '12' },
        { key: ' - headText', value: '头部显示的数据展示', type: 'Array', default: '[]' },
        { key: '   - label', value: '显示的文字描述', type: 'String', default: '' },
        { key: '   - model', value: '显示的对象属性', type: 'String', default: '' },
        { key: ' - treeApi', value: '查询的Api', type: 'Object', default: '' },
        { key: ' - treeQueryMethod', value: '查询方法名', type: 'String', default: '' },
        { key: ' - treeCheckType', value: '单选或多选 radio/selection', type: 'String', default: '' },
        { key: ' - urlParams', value: '查询时有携带在url中的参数', type: 'Object', default: '' },
        { key: ' - hiddenQueryParams', value: '查询时携带在conditions里的参数', type: 'Object', default: '' },
        { key: 'treeOptions', value: '树组件属性配置 自己去树组件看', type: 'Object', default: '' },
        { key: 'radio-or-selection', value: '单选多选配置 radio/selection', type: 'String', default: 'selection' },
        { key: 'last-child', value: '是否选中最底层节点', type: 'Boolean', default: 'false' },
        { key: '@save', value: '保存按钮回调', type: '事件', default: '' },
        { key: '@cancel', value: '取消按钮回调 不用写', type: '事件', default: '' }]
    }
  },
  methods: {
    save (showText, data) {
      console.log(showText, data)
    }
  }
}
</script>
