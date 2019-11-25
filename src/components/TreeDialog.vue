<template>
  <!-- 弹窗标题 显示/隐藏 宽度 关闭按钮 -->
  <el-dialog
    :title="options.title"
    :visible.sync="visible"
    :width="dialogWidth"
    :top="options.center ? '15vh' : '86px'"
    append-to-body
    @close="close"
  >
    <div>
      <div
        :style="'width:' + dialogInnerWidth"
        class="xy-dialog-tree-container"
      >
        <!-- 表头文字详情部分 -->
        <el-row
          v-if="showHeadText"
          class="margin-bottom20"
        >
          <el-col
            v-for="item in options.headText"
            :key="item.label"
            :span="options.headTextSpan || 12"
          >
            <b v-show="item.label">{{ item.label }}: </b> {{ parentItem[item.model] }}
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          class="margin-bottom20"
        >
          <el-col
            :span="24"
          >
            <tree
              v-if="!treeOptions.lazy"
              ref="treeDialog"
              :data="treeData"
              :options="treeOptions"
              @checkChangeCallBack="checkChangeCallBack"
            />

            <tree
              v-if="treeOptions.lazy"
              ref="tree"
              :data="treeData"
              :options="treeOptions"
              @checkChangeCallBack="checkChangeCallBack"
              @loadNode="loadNode"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹窗页脚 -->
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        size="mini"
        @click="save"
      >{{ t('common.confirm') }}</el-button>
      <el-button
        size="mini"
        @click="close"
      >{{ t('common.cancel') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Locale from '@/mixins/locale'
import Tree from '@/components/Tree'
import { isNotEmpty, isEmpty, deepCopy } from '@/utils'

export default {
  name: 'TreeDialog',
  components: {
    Tree
  },
  mixins: [Locale],
  // 弹窗 隐藏/显示
  model: {
    prop: 'show',
    event: 'changeVal'
  },
  props: {
    // 组件显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 组件配置项
    options: {
      type: Object,
      default: function () {
        return {
          // 标题 弹窗大小默认mini
          center: false,
          title: '',
          width: 'mini',
          // 表头描述 (span不写默认是12)
          headTextSpan: 12,
          headText: [],

          // 接口及查询方法名
          treeApi: {},
          treeQueryMethod: 'queryTree',
          // 查询时带在url中的参数
          urlParams: {},
          // 隐藏的查询条件
          hiddenQueryParams: {},
          // 默认不查询
          unQuery: false
        }
      }
    },
    // 树组件配置
    treeOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表头描述的对象
    parentItem: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 选中的数据 无论单条或多条都用数组
    selected: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 树类型配置 radio/selection 不传默认是单选
    radioOrSelection: {
      type: String,
      default: 'selection'
    },
    // 是否只能选择最底层节点
    lastChild: {
      type: Boolean,
      default: false
    },
    // 默认树的数据
    autoTreeData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // region dialog
      // 弹窗大小
      dialogWidth: '',
      // 弹窗内部大小
      dialogInnerWidth: '',
      // endregion
      // 树的数据
      treeData: [],
      queryParams: {
        conditions: [],
        start: 0,
        limit: -1
      }
    }
  },
  computed: {
    // 弹窗隐藏显示
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    },
    // 判断是否显示表头描述
    showHeadText () {
      return isNotEmpty(this.options) &&
          isNotEmpty(this.options.headText) &&
          this.options.headText.length > 0
    }
  },
  watch: {
    autoTreeData: {
      handler (v) {
        if (isEmpty(v)) return
        this.treeData = deepCopy(v)
        this.checkedTree()
      },
      deep: true,
      immediate: true
    },
    // 监控打开窗口 tag记录已选中
    visible: {
      handler (v) {
        if (!v) return
        // 设置url中的参数
        if (isNotEmpty(this.options.urlParams)) Object.assign(this.queryParams, this.options.urlParams)
        // 设置隐藏的查询条件
        if (isNotEmpty(this.options.hiddenQueryParams)) {
          for (let key in this.options.hiddenQueryParams) {
            this.queryParams.conditions.push({ name: key, value: this.options.hiddenQueryParams[key] })
          }
        }
        // 懒加载树时 不查询
        if (this.treeOptions.lazy) return
        if (isEmpty(this.options.unQuery) || !this.options.unQuery) this.query()
      }
    },
    // 弹窗大小判断
    'options.width': {
      handler (v) {
        switch (v) {
          case 'small':
            this.dialogWidth = this.$xyConfig.smallDialogWidth
            this.dialogInnerWidth = this.$xyConfig.smallDialogInnerWidth
            break
          case 'normal':
            this.dialogWidth = this.$xyConfig.dialogWidth
            this.dialogInnerWidth = this.$xyConfig.dialogInnerWidth
            break
          case 'big':
            this.dialogWidth = this.$xyConfig.bigDialogWidth
            this.dialogInnerWidth = this.$xyConfig.bigDialogInnerWidth
            break
          default:
            this.dialogWidth = this.$xyConfig.miniDialogWidth
            this.dialogInnerWidth = this.$xyConfig.miniDialogInnerWidth
        }
      },
      immediate: true
    }
  },
  methods: {
    // 查询
    query () {
      this.options.treeApi[this.options.treeQueryMethod](this.queryParams).then(resp => {
        let data = []
        if (resp.data instanceof Array) {
          data = resp.data
        } else if (resp.data instanceof Object) {
          data.push(resp.data)
        }
        this.treeData = this.makeTreeData(data)
        // 展开树节点
        this.expandedTree()
        this.checkedTree()
      })
    },
    // 展开root树节点
    expandedTree () {
      if (isNotEmpty(this.treeData) && this.treeData.length > 0 && !this.treeOptions.defaultExpandAll) {
        this.$set(this.treeOptions, 'defaultExpandedKeys', [this.treeData[0].id])
      }
    },
    makeTreeData (data) {
      if (!this.lastChild) return data
      let that = this
      let child = this.treeOptions.children || 'children'
      let setDisabled = arr => {
        arr.forEach(v => {
          if (isNotEmpty(v[child])) {
            that.$set(v, 'disabled', true)
          }
          if (v[child] instanceof Array) {
            setDisabled(v[child])
          }
        })
      }
      setDisabled(data)
      return data
    },
    // 选中树节点
    checkedTree () {
      if (this.treeData.length === 0 || this.selected.length === 0) {
        this.$refs.treeDialog.setCheckedKeys([])
        return
      }
      let ids = []
      for (let item of this.selected) {
        ids.push(item[this.treeOptions.nodeId])
      }
      this.$nextTick(function () {
        this.$refs.treeDialog.setCheckedKeys(ids)
      })
    },
    // 多选的回调
    checkChangeCallBack (data, check) {
      if (this.radioOrSelection === 'selection') return
      // 选中
      if (check) {
        this.$refs.treeDialog.setCheckedKeys([data.id])
        this.selectedTree = []
        this.selectedTree.push(data)
      } else {
        // 非子节点或点击已选中的子节点
        let arr = []
        if (this.selectedTree.length === 1) arr = [this.selectedTree[0].id]
        this.$refs.treeDialog.setCheckedKeys(arr)
      }
    },
    // 懒加载回调
    loadNode (node, resolve) {
      this.$emit('loadNode', node, resolve)
    },
    // 保存
    save () {
      let data = this.$refs.treeDialog.getCheckedNodes()
      // 单选时将数组改变为对象
      if (this.radioOrSelection === 'radio') {
        let item = {}
        item = isNotEmpty(data) ? data[0] : {}
        this.$emit('save', item)
      } else {
        this.$emit('save', data)
      }
      this.close()
    },
    // 关闭
    close () {
      this.$set(this.$refs.treeDialog._data, 'filterText', '')
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>
