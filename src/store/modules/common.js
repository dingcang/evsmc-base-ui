const state = {
  currentUnit: undefined,

  // 系统主题色
  theme: '#409EFF',
  // 所有字典项
  dictionary: {},
  // 常用属性
  yesOrNo: {},
  // 页面属性
  formSize: 'small',
  column: 2,
  span: 12,
  gutter: 100,
  labelWidth: '150px',
  labelPosition: 'top',
  textareaSpan: 24,

  // 树表格详情
  treeGridDetailLabelWidth: '100px',

  // 弹窗描述标题
  dialogLabelWidth: '150px',
  dialogSize: 'small',
  dialogGutter: 50,

  // 弹窗大小
  miniDialogWidth: '450px',
  miniDialogInnerWidth: '400px',
  smallDialogWidth: '650px',
  smallDialogInnerWidth: '600px',
  dialogWidth: '850px',
  dialogInnerWidth: '800px',
  bigDialogWidth: '1150px',
  bigDialogInnerWidth: '1100px',

  // 是否进行报警声音提醒
  alarmMusic: 0,
  // 报警声音提醒名称
  alarmMusicName: '',
  // 是否进行报警推送
  alarmPush: false,
  // 允许进行报警推送的模块
  alarmPushModule: ['/alarmInfo', '/alarmHistory', '/alarmPush', '/codeType', '/parameterRule', '/parameterManage'],
  // 报警推送的数据
  alarmData: null,
  // 报警弹窗持续时间
  notifyDuration: 3000,
  // 切换页面是否关闭弹窗
  notificationCloseAll: false,
  // 公司名称
  companyInfo: {}
}

const getters = {
  // 获取主题色
  theme: state => state.theme,
  dictionary: (state) => (id) => {
    return state.dictionary[id] !== undefined ? state.dictionary[id] : []
  },
  currentUnitItem: (state) => (key) => state.currentUnit ? state.currentUnit[key] : undefined
}

const mutations = {
  // 修改主题色
  edit: (state, color) => {
    state.theme = color
  },
  // 设置字典
  setDictionary (state, dictionary) {
    let dict = {}
    for (let item of dictionary) {
      let key = item.type
      if (dict[key] === undefined) dict[key] = []
      let value = isNaN(parseInt(item.value)) ? item.value : parseInt(item.value)
      dict[key].push({ name: item.name, value: value })
    }
    state.dictionary = dict
    // 设置是否
    for (let item of dict['BOOL_TYPE']) {
      state.yesOrNo[item.value] = item.name
    }
  },
  // 设置页面span 和 gutter
  setPage (state, params) {
    if (params === 3) {
      state.gutter = 16
      state.span = 8
    } else if (params === 2) {
      state.gutter = 100
      state.span = 12
    } else if (params === 1) {
      state.gutter = 100
      state.span = 24
    }
    state.column = params
  },
  clear (state) {
    state.dictionary = {}
    state.yesOrNo = {}
  },
  setCurrentUnit (state, data) {
    state.currentUnit = data
  },

  // 修改报警声音提醒设置
  setAlarmMusic (state, data) {
    state.alarmMusic = data
  },
  // 修改报警声音名称
  setAlarmMusicName (state, data) {
    state.alarmMusicName = data
  },
  // 修改是否进行报警推送
  setAlarmPush (state, data) {
    state.alarmPush = data
  },
  // 修改允许进行报警推送的模块
  setAlarmPushModule (state, alarmPushModule) {
    state.alarmPushModule.splice(0, state.alarmPushModule.length, ...alarmPushModule)
  },
  // 修改报警弹窗持续时间
  setDuration (state, notifyDuration) {
    state.notifyDuration = notifyDuration
  },
  /**
   *
   * @param {Object} state 状态对象
   * @param {Boolean} notificationCloseAll 是否切换页面关闭报警弹窗
   */
  updateNotificationCloseAll (state, notificationCloseAll) {
    state.notificationCloseAll = notificationCloseAll
  },
  // 为报警数据赋值
  setAlarmData (state, data) {
    state.alarmData = data
  },
  // 设置公司名称
  setCompanyInfo (state, data) {
    state.companyInfo = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
