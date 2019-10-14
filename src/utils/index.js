// 判断是否不为空 (数字/数组/对象/字符串)
let isNotEmpty = function (val) {
  if (val instanceof Number) {
    return true
  } else if (val instanceof Array) {
    if (val.length === 0) return false
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return false
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return false
  }
  return true
}

// 判断是否为空 (数字/数组/对象/字符串)
let isEmpty = function (val) {
  if (val instanceof Number) {
    return false
  } else if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
  }
  return false
}

Vue.prototype.$method = {
  isNotEmpty,
  isEmpty
}
