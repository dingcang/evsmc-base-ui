import addOrEdit from '@/components/AddOrEdit'
import batchButton from '@/components/BatchButton'
import query from '@/components/Query'
import grid from '@/components/Grid'

export const AddOrEdit = {
  install (Vue) {
    Vue.component(addOrEdit.name, addOrEdit)
    Vue.component('edit', addOrEdit)
  }
}

export const BatchButton = {
  install (Vue) {
    Vue.component(batchButton.name, batchButton)
  }
}

export const Query = {
  install (Vue) {
    Vue.component(query.name, query)
  }
}

export const Grid = {
  install (Vue) {
    Vue.component(grid.name, grid)
  }
}

export default {
  install (Vue) {
    Vue.component('add', addOrEdit)
    Vue.component('edit', addOrEdit)
    Vue.component(batchButton.name, batchButton)
    Vue.component(query.name, query)
    Vue.component(grid.name, grid)
  }
}
