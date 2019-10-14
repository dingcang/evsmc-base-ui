<template>
  <div class="xy-container">
    <div class="xy-grid-container">
      <el-row
        :gutter="10"
        class="margin-bottom20"
      >
        <el-col :span="24">
          <span style="color: red"> Tip: 批量按钮操作，包含事件回调,下拉列表,列的显示隐藏弹框回调 </span>
          <el-button
            size="mini"
            type="primary"
            @click="showApi = true"
          >
            查看API
          </el-button>
        </el-col>
      </el-row>
      <!-- 当需要隐藏  ‘隐藏/显示列’按钮时传button-options配置false,其他情况不传此参数;
        list为按钮的列表信息;
        buttonCallBack为按钮的事件回调;
        setColumnDisplay为‘显示/隐藏列’按钮的事件回调,没有则不写;
        saveColumnDisplay为‘显示/隐藏列’按钮的保存事件回调,没有则不写;-->
      <batch-button
        ref="buttonDemo"
        :button-options="options"
        :button-list="list"
        @buttonCallBack="buttonCallBack"
        @setColumnDisplay="setColumnDisplay"
        @saveColumnDisplay="saveColumnDisplay"
      />
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import BatchButton from '@/components/BatchButton'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'BatchButtonDemo',
  components: {
    BatchButton,
    ApiIntroduction
  },
  data: function () {
    return {
      // 配置隐藏 ‘隐藏/显示列’按钮,不配置此项时默认显示
      options: {
        showDisplay: true
      },
      /*
         * kind: button/dropDown 分别显示按钮或下拉按钮 必填
         * type: 为按钮事件的类型 kind:button必填,dropDown里的data必填
         * icon: 为图标样式,不写则不显示图标 非必填
         * name: 为按钮名称展示 非必填
         * data kind=dropDown 时配置的下拉列表 非必填
         * */
      list: [
        { kind: 'button', type: 'add', icon: 'fa-plus', name: this.$t('common.add') },
        { kind: 'button', type: 'edit', icon: 'fa-edit', name: this.$t('common.edit') },
        { kind: 'button', type: 'remove', icon: 'fa-trash', name: this.$t('common.remove') },
        { kind: 'dropDown', icon: 'fa-trash', name: this.$t('common.import'), data: [{ type: 'batchImport', icon: 'fa-download', name: this.$t('common.batchImport') }, { type: 'batchUpdate', icon: 'fa-download', name: this.$t('common.batchUpdate') }] },
        { kind: 'dropDown', icon: 'fa-trash', name: this.$t('common.listDataExport'), data: [{ type: 'importModule', icon: 'fa-download', name: this.$t('common.importModule') }, { type: 'updateModule', icon: 'fa-download', name: this.$t('common.NationalPlatformDataExport') }] },
        { kind: 'button', type: 'export', icon: 'fa-download', name: this.$t('common.export') }
      ],
      showApi: false,
      propertyList: [
        { key: 'button-options', value: '批量操作按钮的配置(后续可扩展)', type: 'Object', default: '' },
        { key: ' - showDisplay', value: '列的显示隐藏配置', type: 'Boolean', default: 'true' },
        { key: 'button-list', value: '按钮列表', type: 'Array', default: '' },
        { key: ' - kind', value: '按钮的类型 button/dropDown', type: '* String', default: '' },
        { key: ' - btnType', value: '按钮的类型 text/empty', type: 'String', default: 'primary' },
        { key: ' - type', value: '按钮的类型回调唯一标识 dropDown无type', type: 'String', default: '' },
        { key: ' - icon', value: '图标的样式', type: 'String', default: '' },
        { key: ' - name', value: '按钮的名称描述', type: 'String', default: '' },
        { key: ' - data', value: '当type=dropDown时,需要设置此参数 里边是button的配置', type: 'Array', default: '' },
        { key: '@buttonCallBack', value: '按钮的事件回调 根据type判断', type: '事件', default: '' },
        { key: '@setColumnDisplay', value: '打开列显示隐藏组件', type: '事件', default: '' },
        { key: '@saveColumnDisplay', value: '保存列显示隐藏组件结果', type: '事件', default: '' }]
    }
  },
  methods: {
    // 按钮组件回调的总入口,根据不同type调用不同方法
    buttonCallBack (type) {
      switch (type) {
        case 'add':
          this.add()
          break
        case 'edit':
          this.edit()
          break
        default:
          console.log(type)
      }
    },
    // 新增
    add () {
      console.log('come in add method')
    },
    // 编辑
    edit () {
      console.log('come in edit method')
    },
    // 列显示隐藏
    setColumnDisplay () {
      console.log('come in column show or hide method')
      let gridColumn = [
        { kind: 'link', prop: 'name', label: this.$t('common.name') },
        { kind: 'link', prop: 'address', width: '400', label: this.$t('common.address') },
        { kind: 'text', prop: 'description', label: this.$t('common.description') }
      ]
      this.$refs.buttonDemo.openColumnDisplay(gridColumn)
    },
    // 保存事件回调
    saveColumnDisplay (columns) {
      console.log('after save columns')
      console.log(columns)
    }
  }
}
</script>
