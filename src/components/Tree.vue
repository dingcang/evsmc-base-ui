<template>
  <div>
    <el-row
      v-if="options.showFilter"
      :gutter="10">
      <el-col
        v-if="showMultipartQuery"
        :span="filterLeftSpan">
        <el-select
          v-model="multipartQueryModel"
          size="mini">
          <el-option
            v-for="item in options.multipartQuery"
            :key="item.value"
            :label="item.name"
            :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="filterRightSpan">
        <el-input
          :placeholder="$t('common.filterText')"
          v-model="filterText"
          :maxlength="64"
          size="mini"
          class="margin-bottom10"
          prefix-icon="el-icon-search"
          clearable
        />
      </el-col>
    </el-row>
    <div class="tree xy-scrollbar">
      <!-- 正常树 -->
      <el-tree
        v-if="!options.lazy"
        ref="tree"
        :data="data"
        :props="options"
        :show-checkbox="options.checkbox"
        :node-key="options.nodeId"
        :default-expanded-keys="options.defaultExpandedKeys"
        :default-checked-keys="options.defaultCheckedKeys"
        :default-expand-all="options.defaultExpandAll"
        :empty-text="options.emptyText || $t('common.noDataTip')"
        :filter-node-method="filterNode"
        :highlight-current="true"
        :check-on-click-node="true"
        :check-strictly="options.strictly"
        :expand-on-click-node="!showRenderContent"
        :render-content="renderContent"
        @check-change="checkChangeCallBack"
        @node-click="nodeCallBack"
      />
      <!-- 懒加载树 -->
      <el-tree
        v-if="options.lazy"
        ref="tree"
        :props="options"
        :show-checkbox="options.checkbox"
        :node-key="options.nodeId"
        :default-expanded-keys="options.defaultExpandedKeys"
        :default-checked-keys="options.defaultCheckedKeys"
        :default-expand-all="options.defaultExpandAll"
        :filter-node-method="filterNode"
        :load="loadNode"
        :lazy="options.lazy"
        :highlight-current="true"
        :check-strictly="options.strictly"
        :expand-on-click-node="!showRenderContent"
        :render-content="renderContent"
        @check-change="checkChangeCallBack"
        @node-click="nodeCallBack"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    options: {
      type: Object,
      required: true,
      default: function () {
        return {
          // 显示名称 默认是label
          label: {
            type: String,
            default: 'label'
          },
          // 子节点名称 默认children
          children: {
            type: String,
            default: 'children'
          },
          // 多选 默认false
          checkbox: {
            type: Boolean,
            default: false
          },
          // 遵循父子不互相关联的做法
          strictly: {
            type: Boolean,
            default: false
          },
          // node-key绑定的字段 默认id
          nodeId: {
            type: String,
            default: 'id'
          },
          // 树展开的节点 默认空
          defaultExpandedKeys: {
            type: Array,
            default: []
          },
          // 树选中的节点 默认空
          defaultCheckedKeys: {
            type: Array,
            default: []
          },
          // 树全展开显示 默认false
          defaultExpandAll: {
            type: Boolean,
            default: false
          },
          // 显示过滤
          showFilter: {
            type: Boolean,
            default: false
          },
          // 懒加载
          lazy: {
            type: Boolean,
            default: false
          },
          // 多条件查询
          multipartQuery: {
            type: Array,
            default: function () {
              return []
            }
          },
          // 多条件默认选中类型
          multipartQueryModel: {
            type: String,
            default: ''
          },
          // 渲染的类型 info edit remove
          renderContentArray: {
            type: Array,
            default: function () {
              return []
            }
          },
          // 渲染的类型权限必须与类型属性一一对应 info edit remove
          renderContentArrayPerm: {
            type: Array,
            default: function () {
              return []
            }
          },
          // 显示按钮的判断条件
          showBtnIconJudge: {
            type: Object,
            default: {}
          }
        }
      }
    }
  },
  data: function () {
    return {
      // 过滤类型
      multipartQueryModel: '',
      // 过滤字
      filterText: ''
    }
  },
  computed: {
    // 显示条件过滤
    showMultipartQuery () {
      return this.$method.isNotEmpty(this.options.multipartQueryModel) && this.options.multipartQueryModel.length > 0
    },
    // 左侧过滤宽度
    filterLeftSpan () {
      if (this.showMultipartQuery) return 8
      return 0
    },
    // 右侧过滤宽度
    filterRightSpan () {
      if (this.showMultipartQuery) return 16
      return 24
    },
    // 显示按钮操作
    showRenderContent () {
      return (
        this.$method.isNotEmpty(this.options.renderContentArray) &&
          this.options.renderContentArray.length > 0
      )
    }
  },
  watch: {
    // 监控节点过滤默认值
    'options.multipartQueryModel': {
      handler (val) {
        if (this.$method.isEmpty(val)) return
        this.multipartQueryModel = val
      },
      immediate: true
    },
    // 监控节点过滤
    filterText (val) {
      // 去除空格
      if (this.$method.isNotEmpty(val)) {
        val = val.trim()
      }
      this.$refs.tree.filter(val)
      // 设置显示无数据时的提示文字
      if (this.$method.isNotEmpty(this.options.emptyText) && this.options.emptyText !== this.$t('common.noDataTip')) {
        this.options.emptyText = this.$t('common.noDataTip')
      }
    }
  },
  methods: {
    // 多选的动作回调
    checkChangeCallBack (data, node) {
      this.$emit('checkChangeCallBack', data, node)
    },
    // 点击树的动作回调
    nodeCallBack (data, node) {
      this.$emit('nodeCallBack', data, node)
    },
    // 通过key设置选中树节点
    setCheckedKeys (keys) {
      this.$refs.tree.setCheckedKeys(keys)
    },
    // 获取半选中的key
    getHalfCheckedKeys () {
      return this.$refs.tree.getHalfCheckedKeys()
    },
    // 获取树节点选中的key
    getCheckedKeys () {
      return this.$refs.tree.getCheckedKeys()
    },
    // 通过树节点数组设置选中树节点
    setCheckedNodes (nodes) {
      this.$refs.tree.setCheckedNodes(nodes)
    },
    // 获取选中的树节点
    getCheckedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },
    // 设置选中的树节点
    setCurrentKey (id) {
      return this.$refs.tree.setCurrentKey(id)
    },
    // 重置树的选中状态
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
    },
    // 删除树节点
    remove (data) {
      this.$refs.tree.remove(data)
    },
    // 树节点过滤
    filterNode (value, data) {
      if (!value) return true
      let filterColumn = this.options.label
      if (this.$method.isNotEmpty(this.multipartQueryModel)) filterColumn = this.multipartQueryModel
      let strData = data[filterColumn] + ''
      return strData.indexOf(value) !== -1
    },
    // 懒加载
    loadNode (node, resolve) {
      this.$emit('loadNode', node, resolve)
    },
    // 渲染页面操作按钮
    renderContent: function (createElement, { node, data }) {
      let that = this
      if (!this.showRenderContent) {
        // 默认渲染只显示label
        return createElement(
          'el-tooltip',
          {
            attrs: {
              class: 'item custom-tree-node',
              effect: 'dark',
              content: node.label,
              disabled: data.toolTipDisabled,
              placement: 'bottom'
            }
          }, [
            createElement(
              'span',
              [createElement('span', {
                on: {
                  mouseover: function (e) {
                    that.renderBtn(that, data, true, false, e)
                  },
                  mouseleave: function (e) {
                    that.renderBtn(that, data, false, false, e)
                  }
                }
              }, node.label)]
            )
          ])
      } else {
        return createElement(
          'el-tooltip',
          {
            attrs: {
              class: 'item custom-tree-node',
              effect: 'dark',
              content: node.label,
              disabled: data.toolTipDisabled,
              placement: 'bottom'
            }
          },
          [
            createElement(
              'span', {
                attrs: {
                  class: 'custom-tree-node'
                },
                on: {
                  click: function (e) {
                    that.renderBtn(that, data, true, true)
                  },
                  mouseover: function (e) {
                    that.renderBtn(that, data, true, false, e)
                  },
                  mouseleave: function (e) {
                    that.renderBtn(that, data, false, false, e)
                  }
                }
              },
              [
                createElement('span', {
                  attrs: {
                    class: that.showBtnIcon(data) ? 'fa fa-bold' : ''
                  }
                }, ' ' + node.label),
                createElement('span', {
                  attrs: {
                    class: 'tree-button'
                  }
                }, [
                  createElement('el-button', {
                    attrs: {
                      class: that.showBtnType(data, 'detail')
                        ? 'el-button el-button--text el-button--mini fa fa-info-circle'
                        : 'display-none'
                    },
                    on: {
                      click: function (e) {
                        window.event
                          ? (window.event.cancelBubble = true)
                          : e.stopPropagation()
                        that.operationCallBack('detail', data)
                      }
                    }
                  }),
                  createElement('el-button', {
                    attrs: {
                      class: that.showBtnType(data, 'edit')
                        ? 'el-button el-button--text el-button--mini fa fa-edit'
                        : 'display-none'
                    },
                    on: {
                      click: function (e) {
                        window.event
                          ? (window.event.cancelBubble = true)
                          : e.stopPropagation()
                        that.operationCallBack('edit', data)
                      }
                    }
                  }),
                  createElement('el-button', {
                    attrs: {
                      class: that.showBtnType(data, 'remove')
                        ? 'margin-right5 el-button el-button--text el-button--mini fa fa-trash'
                        : 'display-none'
                    },
                    on: {
                      click: function (e) {
                        window.event
                          ? (window.event.cancelBubble = true)
                          : e.stopPropagation()
                        that.operationCallBack('remove', data)
                      }
                    }
                  })
                ])
              ]
            )
          ]
        )
      }
    },
    // 渲染按钮显示隐藏
    renderBtn (that, data, value, currentNode, event) {
      if (!currentNode) {
        // 点击时放过
        if (value && data[this.options.label].length * 14 > event.srcElement.clientWidth) {
          // 鼠标划入
          that.$set(data, 'toolTipDisabled', false)
        } else {
          // 鼠标移出
          that.$set(data, 'toolTipDisabled', true)
        }
      }

      let children = this.$method.isEmpty(that.options.children) ? 'children' : that.options.children
      if (currentNode) {
        let setClicked = arr => {
          arr.forEach(v => {
            that.$set(v, 'currentNode', false)
            if (v[children] instanceof Array) {
              setClicked(v[children])
            }
          })
        }
        setClicked(that.data)
        that.$set(data, 'currentNode', true)
      }
      if (this.$method.isEmpty(this.options.renderContentArray)) return
      for (let cur of this.options.renderContentArray) {
        if (cur === 'detail') {
          that.$set(data, 'detailShow', value)
        } else if (cur === 'edit') {
          that.$set(data, 'editShow', value)
        } else if (cur === 'remove') {
          that.$set(data, 'removeShow', value)
        }
      }
    },
    // 判断按钮显示图标
    showBtnIcon (data) {
      let judge = this.options.showBtnIconJudge
      if (this.$method.isEmpty(judge)) return false
      if (this.$method.isEmpty(judge.secondKey)) {
        return data[judge.key] === judge.value
      } else {
        return data[judge.key][judge.secondKey] === judge.value
      }
    },
    // 判断点击或者显示悬浮 并且类型可见
    showBtnType (data, type) {
      // 某行隐藏指定按钮设置属性
      let btnHidden = !!data[type + 'Hidden']
      if (btnHidden) return false

      // 判断当前按钮列表是否显示该按钮
      let btnIndex = this.options.renderContentArray.findIndex(item => item === type)
      if (btnIndex === -1) return false

      // 判断按钮权限
      if (this.$method.isNotEmpty(this.options.renderContentArrayPerm)) {
        let noPerm = this.$method.isNotEmpty(this.options.renderContentArray) && !this.hasPerm(this.options.renderContentArrayPerm[btnIndex])
        if (noPerm) return false
      }

      let typeShow = data[type + 'Show']
      return (data.currentNode || typeShow)
    },
    // 点击树的操作按钮动作回调
    operationCallBack (type, data) {
      this.$emit('operationCallBack', type, data)
    }
  }
}
</script>
