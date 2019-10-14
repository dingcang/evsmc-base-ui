const state = {
  data: [],
  name: '',
  sex: false
}

const getters = {
  data: (state) => {
    return state.data
  },
  name: (state) => {
    return state.name
  },
  sex: (state) => {
    return state.sex ? '男' : '女'
  },
  info: (state, getters) => {
    let obj = {}
    obj['name'] = getters.name
    obj['sex'] = getters.sex
    obj['data'] = getters.data
    return obj
  },
  getById: (state, getters) => (id) => {
    return getters.info.data.find(item => item.id === id)
  }
}

const mutations = {
  name (state, data) {
    state.name = data
  },
  sex (state, data) {
    state.sex = data
  },
  data (state, data) {
    state.data = data
  },
  add (state, row) {
    if (state.data.findIndex(item => item.id === row.id) === -1) state.data.push(row)
  },
  edit (state, row) {
    state.data.splice(state.data.findIndex(item => item.id === row.id), 1, row)
  },
  remove (state, row) {
    state.data.splice(state.data.findIndex(item => item.id === row.id), 1)
  },
  clear (state) {
    state.data = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
