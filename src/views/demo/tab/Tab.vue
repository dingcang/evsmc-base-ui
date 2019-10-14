<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: tab标签的操作，一个主页面，每个标签是一个文件夹</span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-click="tabClick"
    >
      <el-tab-pane
        :label="$t('vehTerminalManage.vehTerminalInfo')"
        name="first"
      >
        <veh-terminal-info />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('vehTerminalManage.vehTerminalType')"
        name="second"
      >
        <veh-terminal-type />
      </el-tab-pane>
      <el-tab-pane
        label="page3"
        name="third"
      >
        <page3 />
      </el-tab-pane>
      <el-tab-pane
        label="page4"
        name="fourth"
      >
        <page4 />
      </el-tab-pane>
    </el-tabs>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import VehTerminalInfo from './vehTerminalInfo/VehTerminalInfo'
import VehTerminalType from './vehTerminalType/VehTerminalType'
import Page3 from './page3/Page3'
import Page4 from './page4/Page4'
import ApiIntroduction from '@/components/ApiIntroduction'
export default {
  name: 'TabDemo',
  components: {
    VehTerminalInfo, VehTerminalType, Page3, Page4, ApiIntroduction
  },
  data () {
    return {
      activeTab: '',
      showApi: false,
      propertyList: [
        { key: 'el-tabs', value: '', type: '*', default: '' },
        { key: ' - card', value: '卡片样式 card/border-card', type: '* String', default: '' },
        { key: ' - v-model', value: '绑定的model值', type: '* String', default: '' },
        { key: ' - @tab-click', value: '标签点击的事件回调,返回参数有tab和event', type: '* 点击回调', default: '' },
        { key: 'el-tab-pane', value: '', type: '*', default: '' },
        { key: ' - label', value: 'tab显示的名字', type: '* String', default: '' },
        { key: ' - name', value: 'tab的唯一标识', type: '* String', default: '' }]
    }
  },
  watch: {
    activeTab: {
      handler (val) {
        this.$store.commit('removeLevelAfterName', { name: this.$t('menu.index') })
        this.$store.commit('addLevel', { name: val })
      }
    }
  },
  mounted () {
    this.activeTab = this.$route.params.tabId
  },
  methods: {
    tabClick (tab, event) {
      // console.log(tab, event)
      this.$router.push({ name: 'tab', params: { tabId: tab.name } })
    }
  }
}
</script>
