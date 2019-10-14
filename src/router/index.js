import Vue from 'vue'
import Router from 'vue-router'

import Jsencrypt from '@/views/demo/jsencrypt/Jsencrypt.vue'
import Grid from '@/views/demo/grid/Grid.vue'
import BatchButton from '@/views/demo/batchButton/BatchButton.vue'
import Tree from '@/views/demo/tree/Tree.vue'
import Query from '@/views/demo/query/Query.vue'
import ChooseTableRowDialog from '@/views/demo/chooseTableRowDialog/ChooseTableRowDialog.vue'
import AddOrEdit from '@/views/demo/addOrEdit/AddOrEdit.vue'
// import EventBus from '@/views/demo/bus/EventBus.vue'
import LineCut from '@/views/demo/lineCut/LineCut.vue'
import Breadcrumb from '@/views/demo/breadcrumb/Breadcrumb.vue'
import Tab from '@/views/demo/tab/Tab.vue'
import AddTab from '@/views/demo/tab/AddTab.vue'
import EditTab from '@/views/demo/tab/EditTab.vue'
import Copy from '@/views/demo/copy/Copy.vue'
import GeneratingCode from '@/views/demo/generatingCode/GeneratingCode.vue'
import TreeGrid from '@/views/demo/treeGrid/TreeGrid.vue'
import ImportFile from '@/views/demo/importFile/ImportFile.vue'
import TransferTable from '@/views/demo/transferTable/TransferTable.vue'
import TreeGridHead from '@/views/demo/treeGridHead/TreeGridHead.vue'
import TransferTreeTable from '@/views/demo/transferTreeTable/TransferTreeTable.vue'
import UploadImg from '@/views/demo/uploadImg/UploadImg.vue'
import AlarmReminder from '@/views/demo/staticPage/AlarmReminder.vue'
import LayoutPage from '@/views/demo/layoutPage/LayoutPage.vue'
import TransferPageTable from '@/views/demo/transferPageTable/TransferPageTable.vue'
import TreeDialog from '@/views/demo/treeDialog/TreeDialog.vue'
import DialogHead from '@/views/demo/dialogHead/DialogHead.vue'
import Password from '@/views/demo/password/Password.vue'
import IconBatchButton from '@/views/demo/iconBatchButton/IconBatchButton.vue'
import TreeGridDetailForm from '@/views/demo/treeGridDetailForm/TreeGridDetailForm.vue'
import Echarts from '@/views/demo/echarts/Echarts.vue'
import HighCharts from '@/views/demo/highCharts/HighCharts.vue'
import Interval from '@/views/demo/interval/Interval.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/query'
    },
    {
      path: '/jsencrypt',
      name: 'jsencrypt',
      component: Jsencrypt
    },
    {
      path: '/grid',
      name: 'grid',
      component: Grid
    },
    {
      path: '/batchButton',
      name: 'batchButton',
      component: BatchButton
    },
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    },
    {
      path: '/query',
      name: 'query',
      component: Query
    },
    {
      path: '/chooseTableRowDialog',
      name: 'chooseTableRowDialog',
      component: ChooseTableRowDialog
    },
    {
      path: '/addOrEdit',
      name: 'addOrEdit',
      component: AddOrEdit
    },
    // {
    //   path: '/eventBus',
    //   name: 'eventBus',
    //   component: EventBus
    // },
    {
      path: '/lineCut',
      name: 'lineCut',
      component: LineCut
    },
    {
      path: '/breadcrumb',
      name: 'breadcrumb',
      component: Breadcrumb
    },
    {
      path: '/tab/:tabId',
      name: 'tab',
      component: Tab
    },
    {
      path: '/tab/:tabId/add',
      name: 'addTab',
      component: AddTab
    },
    {
      path: '/tab/:tabId/edit/:id',
      name: 'editTab',
      component: EditTab
    },
    {
      path: '/copy',
      name: 'copy',
      component: Copy
    },
    {
      path: '/generatingCode',
      name: 'generatingCode',
      component: GeneratingCode
    },
    {
      path: '/treeGrid',
      name: 'treeGrid',
      component: TreeGrid
    },
    {
      path: '/importFile',
      name: 'importFile',
      component: ImportFile
    },
    {
      path: '/transferTable',
      name: 'transferTable',
      component: TransferTable
    },
    {
      path: '/treeGridHead',
      name: 'treeGridHead',
      component: TreeGridHead
    },
    {
      path: '/transferTreeTable',
      name: 'transferTreeTable',
      component: TransferTreeTable
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: UploadImg
    },
    {
      path: '/alarmReminder',
      name: 'alarmReminder',
      component: AlarmReminder
    },
    {
      path: '/layoutPage',
      name: 'layoutPage',
      component: LayoutPage
    },
    {
      path: '/transferPageTable',
      name: 'transferPageTable',
      component: TransferPageTable
    },
    {
      path: '/treeDialog',
      name: 'treeDialog',
      component: TreeDialog
    },
    {
      path: '/dialogHead',
      name: 'dialogHead',
      component: DialogHead
    },
    {
      path: '/password',
      name: 'password',
      component: Password
    },
    {
      path: '/iconBatchButton',
      name: 'iconBatchButton',
      component: IconBatchButton
    },
    {
      path: '/treeGridDetailForm',
      name: 'treeGridDetailForm',
      component: TreeGridDetailForm
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: Echarts
    },
    {
      path: '/highCharts',
      name: 'highCharts',
      component: HighCharts
    },
    {
      path: '/interval',
      name: 'interval',
      component: Interval
    }

  ]
})
