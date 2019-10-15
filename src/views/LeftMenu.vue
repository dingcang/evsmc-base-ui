<template>
  <div>
    <el-menu mode="horizontal">
      <el-menu-item
        v-for="item in menu"
        :key="item.id"
        :index="item.id"
        @click="activeMenuItem(item)"
      >
        <el-tooltip
          :disabled="!isClose"
          :content="item.label"
          placement="right"
        >
          <div class="top-menu-itemCon">
            <span>{{ item.name }}</span>
          </div>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: JSON.parse('[{"name":"interval Demo","path":"/interval"},{"name":"Echarts Demo","path":"/echarts"},{"name":"TreeGridDetailForm Demo","path":"/treeGridDetailForm"},{"name":"Icon BatchButton Demo","path":"/iconBatchButton"},{"name":"Password Demo","path":"/password"},{"name":"DialogHead Demo","path":"/dialogHead"},{"name":"DetailDialog Demo","path":"/detailDialog"},{"name":"TreeDialog Demo","path":"/treeDialog"},{"name":"TransferPageTable Demo","path":"/transferPageTable"},{"name":"LayoutPage Demo","path":"/layoutPage"},{"name":"AlarmReminder Demo","path":"/alarmReminder"},{"name":"Upload Img Demo","path":"/uploadImg"},{"name":"TransferTreeTable Demo","path":"/transferTreeTable"},{"name":"TreeGridHead Demo","path":"/treeGridHead"},{"name":"TransferTable Demo","path":"/transferTable"},{"name":"ImportFile Demo","path":"/importFile"},{"name":"Tree Grid Demo","path":"/treeGrid"},{"name":"Generating Code Demo","path":"/generatingCode"},{"name":"Copy Demo","path":"/copy"},{"name":"Tab Demo","path":"/tab/first"},{"name":"Translate Demo","path":"/translate"},{"name":"Breadcrumb Demo","path":"/breadcrumb"},{"name":"Line Add Remove","path":"/lineCut"},{"name":"Event Bus Demo","path":"/eventBus"},{"name":"AddOrEdit","path":"/addOrEdit"},{"name":"Choose TableRow Demo","path":"/chooseTableRowDialog"},{"name":"Query Demo","path":"/query"},{"name":"Tree Demo","path":"/tree"},{"name":"Batch Button Demo","path":"/batchButton"},{"name":"Jsencrypt Demo","path":"/jsencrypt"},{"name":"Grid Demo","path":"/grid"}]')
    }
  },
  methods: {
    activeMenuItem (item) {
      this.$router.push(item.path)
    }
  }
}
</script>
