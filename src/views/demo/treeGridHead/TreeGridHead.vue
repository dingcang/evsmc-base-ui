<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 左侧树右侧表格的标题组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <tree-grid-head
      :operation="options"
      @dropDownCallBack="dropDownCallBack"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import TreeGridHead from '@/components/TreeGridHead'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'DropDownList',
  components: {
    TreeGridHead,
    ApiIntroduction
  },
  data () {
    return {
      options: {
        titleName: this.$t('module.name'),
        titleSpan: 10,
        btnSpan: 14,
        btnOperation: [
          { name: this.$t('common.add'), icon: 'fa-plus', type: 'add', outShow: true },
          { name: this.$t('common.enable'), icon: 'fa-check-square', type: 'enable' },
          { name: this.$t('common.disable'), icon: 'fa-square', type: 'disable' },
          { name: this.$t('common.edit'), icon: 'fa-edit', type: 'edit' },
          { name: this.$t('common.remove'), icon: 'fa-trash', type: 'remove' }
        ]
      },
      showApi: false,
      propertyList: [
        { key: 'titleName', value: '名称', type: 'String', default: 'none' },
        { key: 'titleSpan', value: '标题宽度', type: 'Number', default: '24' },
        { key: 'btnSpan', value: '按钮宽度', type: 'Number', default: '0' },
        { key: 'btnOperation', value: '按钮组', type: 'Array', default: '[]' },
        { key: ' - name', value: '按钮名称', type: 'String', default: '' },
        { key: ' - icon', value: '按钮图标', type: 'String', default: '' },
        { key: ' - type', value: '按钮类型', type: 'String', default: '' },
        { key: ' - outShow', value: '按钮外置显示', type: 'Boolean', default: 'false' }]
    }
  },
  methods: {
    dropDownCallBack (type) {
      console.log(type)
    }
  }
}
</script>
