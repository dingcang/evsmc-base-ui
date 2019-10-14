<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 导入和批量更新组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-button
      size="mini"
      type="primary"
      @click="upload"
    >
      批量导入
    </el-button>
    <import-file
      v-model="importShow"
      :options="options"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import ApiIntroduction from '@/components/ApiIntroduction'
import ImportFile from '@/components/ImportFile'
export default {
  name: 'ImportFileDemo',
  components: {
    ApiIntroduction, ImportFile
  },
  data () {
    return {
      importShow: false,
      options: {
        title: '',
        btnText: '',
        showDownLoad: false,
        type: '',
        action: ''
      },
      showApi: false,
      propertyList: [
        { key: 'options', value: '配置', type: 'Object', default: '' },
        { key: 'title', value: '弹窗名称 导入可不写 默认 导入', type: 'String', default: '导入' },
        { key: 'btnText', value: '按钮名称 导入开始可不写 默认 导入开始', type: 'String', default: '导入开始' },
        { key: 'showDownLoad', value: '显示下载按钮 默认是false', type: 'Boolean', default: 'false' },
        { key: 'type', value: 'WS对应的类型', type: 'String', default: '' },
        { key: 'action', value: '提交的地址名', type: 'String', default: '' },
        { key: '@close', value: '关闭回调', type: '事件', default: '' }]
    }
  },
  methods: {
    upload () {
      // this.options.btnText = this.$t('common.beginUpdate')
      // this.options.title = this.$t('common.batchImportUpdate')
      this.options.type = 'BATTERYDEVICEMODEL_BATCH_IMPORT'
      this.options.action = 'batteryDeviceModelBatchImport'
      this.importShow = true
    }
  }
}
</script>
