import addOrEdit from '@/components/AddOrEdit'
// import apiIntroduction from '@/components/ApiIntroduction'
import batchButton from '@/components/BatchButton'
import chooseTableRow from '@/components/ChooseTableRow'
import coordinate from '@/components/Coordinate'
// import copy from '@/components/Copy'
import detailDialog from '@/components/DetailDialog'
import detailPage from '@/components/DetailPage'
import dialogHead from '@/components/DialogHead'
import echarts from '@/components/Echarts'
// import editor from '@/components/Editor'
import grid from '@/components/Grid'
import gridColumnDisplay from '@/components/GridColumnDisplay'
import iconBatchButton from '@/components/IconBatchButton'
// import importFile from '@/components/ImportFile'
import interval from '@/components/Interval'
import layoutGridPage from '@/components/LayoutGridPage'
import layoutPage from '@/components/LayoutPage'
import lineCut from '@/components/LineCut'
import password from '@/components/Password'
import query from '@/components/Query'
import showImage from '@/components/ShowImage'
import topTheme from '@/components/TopTheme'
import transferPageTable from '@/components/TransferPageTable'
import transferTable from '@/components/TransferTable'
import transferTreeTable from '@/components/TransferTreeTable'
import tree from '@/components/Tree'
import treeDialog from '@/components/TreeDialog'
import treeGridDetailForm from '@/components/TreeGridDetailForm'
import treeGridHead from '@/components/TreeGridHead'
// import uploadImg from '@/components/UploadImg'

import locale from '@/locale'

const components = [
  addOrEdit,
  batchButton,
  chooseTableRow,
  coordinate,
  // copy,
  detailDialog,
  detailPage,
  dialogHead,
  echarts,
  // editor,
  grid,
  gridColumnDisplay,
  iconBatchButton,
  // importFile,
  interval,
  layoutGridPage,
  layoutPage,
  lineCut,
  password,
  query,
  showImage,
  topTheme,
  transferPageTable,
  transferTable,
  transferTreeTable,
  tree,
  treeDialog,
  treeGridDetailForm,
  treeGridHead
  // uploadImg
]

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

export const ChooseTableRow = {
  install (Vue) {
    Vue.component(chooseTableRow.name, chooseTableRow)
  }
}

export const Coordinate = {
  install (Vue) {
    Vue.component(coordinate.name, coordinate)
  }
}

export const DetailDialog = {
  install (Vue) {
    Vue.component(detailDialog.name, detailDialog)
  }
}

export const DialogHead = {
  install (Vue) {
    Vue.component(dialogHead.name, dialogHead)
  }
}

export const Echarts = {
  install (Vue) {
    Vue.component(echarts.name, echarts)
  }
}

// export const Editor = {
//   install (Vue) {
//     Vue.component(editor.name, editor)
//   }
// }

export const Grid = {
  install (Vue) {
    Vue.component(grid.name, grid)
  }
}

export const GridColumnDisplay = {
  install (Vue) {
    Vue.component(gridColumnDisplay.name, gridColumnDisplay)
  }
}

export const IconBatchButton = {
  install (Vue) {
    Vue.component(iconBatchButton.name, iconBatchButton)
  }
}

// export const ImportFile = {
//   install (Vue) {
//     Vue.component(importFile.name, importFile)
//   }
// }

export const Interval = {
  install (Vue) {
    Vue.component(interval.name, interval)
  }
}

export const LayoutGridPage = {
  install (Vue) {
    Vue.component(layoutGridPage.name, layoutGridPage)
  }
}

export const LayoutPage = {
  install (Vue) {
    Vue.component(layoutPage.name, layoutPage)
  }
}

export const LineCut = {
  install (Vue) {
    Vue.component(lineCut.name, lineCut)
  }
}

export const Password = {
  install (Vue) {
    Vue.component(password.name, password)
  }
}

export const Query = {
  install (Vue) {
    Vue.component(query.name, query)
  }
}

export const ShowImage = {
  install (Vue) {
    Vue.component(showImage.name, showImage)
  }
}

export const TopTheme = {
  install (Vue) {
    Vue.component(topTheme.name, topTheme)
  }
}

export const TransferPageTable = {
  install (Vue) {
    Vue.component(transferPageTable.name, transferPageTable)
  }
}

export const TransferTable = {
  install (Vue) {
    Vue.component(transferTable.name, transferTable)
  }
}

export const TransferTreeTable = {
  install (Vue) {
    Vue.component(transferTreeTable.name, transferTreeTable)
  }
}

export const Tree = {
  install (Vue) {
    Vue.component(tree.name, tree)
  }
}

export const TreeDialog = {
  install (Vue) {
    Vue.component(treeDialog.name, treeDialog)
  }
}

export const TreeGridDetailForm = {
  install (Vue) {
    Vue.component(treeGridDetailForm.name, treeGridDetailForm)
  }
}

export const TreeGridHead = {
  install (Vue) {
    Vue.component(treeGridHead.name, treeGridHead)
  }
}

// export const UploadImg = {
//   install (Vue) {
//     Vue.component(uploadImg.name, uploadImg)
//   }
// }

function install (Vue, options = {}) {
  locale.use(options.locale)
  locale.i18n(options.i18n)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.component('edit', addOrEdit)

  Vue.prototype.$xyConfig = options
}

export default {
  version: '0.2.2-beta',
  locale: locale.use,
  i18n: locale.i18n,
  install
}
