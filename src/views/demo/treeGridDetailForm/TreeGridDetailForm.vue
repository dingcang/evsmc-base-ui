<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 左树右表格详细组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>

    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="8">
        站位
      </el-col>
      <el-col :span="16">
        <tree-grid-detail-form
          :options="options"
          :list="list"
          :data="data"
        />
      </el-col>
    </el-row>

    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import ApiIntroduction from '@/components/ApiIntroduction'
import TreeGridDetailForm from '@/components/TreeGridDetailForm'
export default {
  name: 'TreeGridDetailFormDemo',
  components: {
    ApiIntroduction,
    TreeGridDetailForm
  },
  data () {
    return {
      options: {},
      data: { name: 'sssssddddd', sex: '男', age: 19 },
      list: [{ model: 'name', name: '名称' }, { model: 'sex', name: '性别' }, { model: 'age', name: '年纪' }],

      showApi: false,
      propertyList: [
        { key: 'options', value: '组件属性配置', type: 'Object', default: '' },
        { key: ' - labelWidth', value: '标题宽度', type: 'String', default: '120px' },
        { key: ' - size', value: '表单大小', type: 'mini/small', default: 'small' },
        { key: ' - pageGutter', value: '列间距', type: 'Number', default: '10' },
        { key: ' - detailSpan', value: '列宽度', type: 'Number', default: '8' },
        { key: 'data', value: '数据', type: 'Object', default: '' },
        { key: 'list', value: '字段配置', type: 'Object', default: '' },
        { key: ' - name', value: '字段显示名称', type: 'String', default: '' },
        { key: ' - model', value: '属性', type: 'String', default: '' },
        { key: ' - type', value: 'icon/button', type: 'String', default: '' },
        { key: ' - param', value: '配置图标或按钮的属性', type: 'Object', default: '' },
        { key: 'imageList', value: '图片配置', type: 'Object', default: '' },
        { key: ' - name', value: '字段显示名称', type: 'String', default: '' },
        { key: ' - model', value: '属性', type: 'String', default: '' },
        { key: ' - srcModel', value: '图片地址', type: 'String', default: '' },
        { key: '@formBtnCallBack', value: '按钮的回调事件', type: '事件', default: '' }]
    }
  },
  computed: {},
  watch: {},
  mounted () {
  },
  methods: {}
}
</script>
