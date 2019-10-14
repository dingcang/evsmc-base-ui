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
        <span style="color: red"> Tip: 像新增和编辑一样的界面组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <layout-page
      :load="load"
      :options="options"
    >
      <div slot="content">
        content test
      </div>
      <div slot="footer">
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
      </div>
    </layout-page>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import LayoutPage from '@/components/LayoutPage'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'LayoutPageDemo',
  components: {
    LayoutPage,
    ApiIntroduction
  },
  data: function () {
    return {
      // 遮罩 默认false
      load: true,
      options: {
        // 新增的标题
        title: this.$t('menu.layoutPage')
        // 隐藏保存并新增按钮
        // hideReset: true
      },
      showApi: false,
      propertyList: [
        { key: 'load', value: '页面加载时的遮罩', type: 'Boolean', default: 'false' },
        { key: 'options', value: '配置页面的属性(后续可扩展)', type: 'Object', default: '' },
        { key: ' - title', value: '标题名字', type: 'String', default: '' }]
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.load = false
    }, 2000)
  },
  methods: {
    save () {
      console.log(1)
    },
    cancel () {
      console.log('cancel')
    }
  }
}
</script>
