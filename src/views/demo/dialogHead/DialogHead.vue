<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 弹窗头部组件,配置弹窗大小 </span>
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
          查看弹窗头部组件
        </el-button>
      </el-col>
    </el-row>
    <dialog-head
      v-model="showDialog"
      :options="options"
    >
      <div slot="content">
        <el-form ref="ruleForm">
          <el-row :gutter="10">
            <el-col :span="12">
              aaa
            </el-col>
            <el-col :span="12">
              sss
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >
          {{ $t('common.confirm') }}
        </el-button>
        <el-button
          size="mini"
          @click="close"
        >
          {{ $t('common.cancel') }}
        </el-button>
      </div>
    </dialog-head>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import DialogHead from '../../../components/DialogHead'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'DialogHeadDemo',
  components: {
    DialogHead,
    ApiIntroduction
  },
  props: {},
  data () {
    return {
      // 弹窗隐藏显示
      showDialog: false,
      // 弹窗配置
      options: {
        // 弹窗名称
        title: '测试弹窗详细',
        width: 'normal'
      },

      showApi: false,
      propertyList: [
        { key: 'showDialog', value: '组件隐藏显示,已双向绑定', type: 'Boolean', default: 'false' },
        { key: 'options', value: '组件属性配置', type: 'Object', default: '' },
        { key: ' - center', value: '弹窗居中', type: 'Boolean', default: 'false' },
        { key: ' - title', value: '弹窗的标题', type: '* String', default: '' },
        { key: ' - width', value: '弹窗大小 mini/small/normal/big', type: 'String', default: 'normal' },
        { key: 'columns', value: '单对象形式显示,无tab时(tab选项时不传送)', type: 'Object', default: '' },
        { key: ' - label', value: '字典名称', type: 'String', default: '' },
        { key: ' - model', value: '字段模型', type: 'String', default: '' },
        { key: ' - type', value: '字段显示的类型 只是文字不写/textarea/title', type: 'String', default: '' },
        { key: 'data', value: '当弹窗不是tab时,传此对象显示详细(tab选项时不传送)', type: 'Object', default: '' },
        { key: 'tabColumns', value: '多个页签时传送此数组', type: 'Array', default: '' },
        { key: ' - title', value: 'tab的名称', type: 'String', default: '' },
        { key: ' - columns', value: 'tab的列显示', type: 'Array', default: '' },
        { key: ' - data', value: 'tab的数据', type: 'Object', default: '' }]
    }
  },
  methods: {
    save () {},
    close () {}
  }
}
</script>
