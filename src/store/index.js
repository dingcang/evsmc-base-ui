import demo from './modules/demo'
import common from './modules/common'

const state = {
  btnPermission: [] // 按钮权限
}

export default new Vuex.Store({
  state,
  // mutations,
  // actions,
  // getters,
  modules: {
    demo,
    common
  }
})
