<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col
        :span="23"
        :offset="1"
      >
        <span style="color: red"> Tip: 新增和编辑界面组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <add
      :load="load"
      :options="options"
      @reset="resetPage"
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
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'AddDemo',
  components: {
    ApiIntroduction
  },
  data: function () {
    return {
      // 遮罩 默认false
      load: true,
      options: {
        // 新增的标题
        title: this.$t('common.add')
        // 隐藏保存并新增按钮
        // hideReset: true
      },
      showApi: false,
      propertyList: [
        { key: 'load', value: '页面加载时的遮罩', type: 'Boolean', default: 'false' },
        { key: 'options', value: '配置页面的属性(后续可扩展)', type: 'Object', default: '' },
        { key: ' - title', value: '标题名字', type: 'String', default: '' },
        { key: 'hideReset', value: '当有hideReset=true属性时,隐藏保存并继续按钮', type: 'Boolean', default: 'false' },
        { key: '@save', value: '保存按钮回调和保存并继续的回调 根据type判断 continue和close', type: '事件', default: '' },
        { key: '@cancel', value: '取消按钮回调', type: '事件', default: '' },
        { key: '@reset', value: '重置按钮回调', type: '事件', default: '' }]
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.load = false
    }, 2000)
  },
  methods: {
    save (type) {
      console.log(this.columnNum)
      console.log(type)
    },
    cancel () {
      console.log('cancel')
    },
    resetPage () {
      console.log('cancel')
    }
  }
}
</script>
