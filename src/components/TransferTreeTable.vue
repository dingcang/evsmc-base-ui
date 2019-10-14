<template>
  <div v-loading="load">
    <div
      :class="{'check-all': checkAllReadonly && checkAll}"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <el-row class="margin-bottom10">
        <el-col :span="6">
          <b>{{ options.leftTitleName }}</b>
        </el-col>
        <el-col
          :span="6"
          class="text-align-right"
        >
          <el-checkbox
            v-model="checkAll"
            @change="treeCheckAll"
          >
            {{ chooseAllText }}
          </el-checkbox>
        </el-col>
        <!-- 已选择和清除按钮 -->
        <el-col
          :span="6"
          :offset="1"
        >
          <b>{{ $t('common.alreadySelect') }} {{ selectedTags.length }} {{ $t('common.alreadySelectEnd') }}</b>
        </el-col>
        <el-col :span="5">
          <div class="text-align-right">
            <el-button
              size="mini"
              type="text"
              class="empty-btn"
              @click="toggleTree([])"
            >
              {{ $t('common.clean') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <!-- 树 -->
        <el-col :span="12">
          <!-- 过滤条件 -->
          <el-row
            :gutter="10"
            class="margin-bottom10"
          >
            <el-col
              :span="24"
            >
              <el-input
                v-model="filterText"
                :placeholder="treeOptions.queryPlaceholder"
                prefix-icon="el-icon-search"
                size="mini"
              />
            </el-col>
          </el-row>
          <div class="tree xy-scrollbar">
            <el-tree
              ref="tree"
              :props="treeOptions"
              :show-checkbox="treeOptions.showCheckbox"
              :default-expand-all="treeOptions.defaultExpandAll"
              :data="data"
              :node-key="treeOptions.nodeKey"
              :filter-node-method="filterNode"
              style="width: 100%"
              highlight-current
              @check-change="treeCheck"
            />
          </div>
        </el-col>
        <!-- 已选择标签 -->
        <el-col
          :span="11"
          :offset="1"
        >
          <div class="transfer-table-right xy-scrollbar">
            <!-- 这里不能使用index作为key值，会出现移除任何一个tag都会跳到最尾端执行渐变动画的bug -->
            <el-tag
              v-for="tag in selectedTags"
              :key="tag.id"
              :span="24"
              :disable-transitions="false"
              closable
              @close="removeTag(tag)"
            >
              {{ tag[options.tagLabel] }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferTreeTable',
  model: {
    prop: 'selected',
    event: 'changeVal'
  },
  props: {
    selected: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 全选文字
    chooseAllText: {
      type: String,
      default: function () {
        return this.$t('common.allChecked')
      }
    },
    // 树穿梭框配置
    options: {
      type: Object,
      required: true,
      default: function () {
        return {
          // 左侧显示名称
          leftTitleName: '',
          // 查询
          query: [],
          // 已选择标签显示属性
          tagLabel: ''
        }
      }
    },
    // 树配置
    treeOptions: {
      type: Object,
      required: true,
      default: function () {
        return {
          // 查询占位符
          queryPlaceholder: {
            type: String,
            default: ''
          },
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
          // 多选
          showCheckbox: {
            type: Boolean,
            default: true
          },
          // 全展开
          defaultExpandAll: {
            type: Boolean,
            default: false
          },
          // node-key绑定的字段
          nodeKey: {
            type: String,
            default: 'id'
          }
        }
      }
    },
    // 树加载的遮罩
    load: {
      type: Boolean,
      default: false
    },
    // 表格数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 已选择的数据回选
    selectedData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 全选
    checkAllDefault: {
      type: Boolean,
      default: false
    },
    // 全选时组件变只读
    checkAllReadonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 树数据
      data: [],
      // 全选
      checkAll: false,
      // 树数据 单数组形式
      treeDataList: [],
      // 树数据ID 单数组形式
      treeDataIdList: [],
      // 过滤字段
      filterText: ''
    }
  },
  computed: {
    // 选中的数据
    selectedTags: {
      get: function () {
        return this.selected
      },
      set: function (v) { this.$emit('changeVal', v) }
    }
  },
  watch: {
    // 树过滤查询
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    // 设置树数据
    treeData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.data = []
        this.data = val
        this.makeTreeListData()
      }
    },
    // 设置已选择的数据
    selectedData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.toggleTree(val)
      }
    }
  },
  methods: {
    // 重组树结构的数据 单数组形式
    makeTreeListData () {
      this.checkAll = this.checkAllDefault
      this.treeDataList = []
      this.treeDataIdList = []
      let childrenName = this.treeOptions.children
      let getId = arr => {
        arr.forEach(v => {
          // v.disabled = this.checkAll
          this.treeDataList.push(v)
          this.treeDataIdList.push(v[this.treeOptions.nodeKey])
          if (v[childrenName] instanceof Array) {
            getId(v[childrenName])
          }
        })
      }
      getId(this.data)
    },
    // 树全选和全取消
    treeCheckAll () {
      let data = this.checkAll ? this.treeDataIdList : []
      this.toggleTree(data)
      this.$emit('checkAll', this.checkAll)
    },
    // 过滤
    filterNode (value, data) {
      if (!value) return true
      return data[this.treeOptions.label].indexOf(value) !== -1
    },
    // 树节点选中状态变化时 对应的tag变化
    treeCheck (current, checked) {
      if (this.$method.isNotEmpty(current[this.treeOptions.children])) return
      if (checked) {
        // 当默认勾选项太多的时候，会出现tags重复的bug，所以这里要加一个是否已存在tag的判断
        this.selectedTags.every(item => item.id !== current.id) && this.selectedTags.push(current)
      } else {
        let removeIndex = this.selectedTags.findIndex(item => item.id === current.id)
        if (removeIndex !== -1) this.selectedTags.splice(removeIndex, 1)
      }
    },
    // 移除已选择
    removeTag (tag) {
      this.selectedTags.splice(this.selectedTags.findIndex(item => item.id === tag.id), 1)
      let ids = []
      for (let item of this.selectedTags) ids.push(item.id)
      this.toggleTree(ids)
    },
    // 设置选中或取消
    toggleTree (rows) {
      if (rows.length === 0) this.checkAll = false
      this.$nextTick(function () {
        this.$refs.tree.setCheckedKeys(rows)
      })
    }
  }
}
</script>

<style scoped>
  .empty-btn {
    padding: 0;
  }
  .check-all >>> .el-tree .el-checkbox {
    pointer-events: none;
  }
  .check-all >>> .el-tree .el-checkbox__input .el-checkbox__inner {
    background-color: #f2f6fc;
    border-color: #dcdfe6;
  }
  .check-all >>> .el-tree .el-checkbox__input .el-checkbox__inner:after {
    border-color: #c0c4cc;
  }
  .check-all .empty-btn, .check-all >>> .transfer-table-right .el-tag__close {
    display: none;
  }
</style>
