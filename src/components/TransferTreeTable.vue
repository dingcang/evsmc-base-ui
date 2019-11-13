<template>
  <div>
    <div
      v-loading="load"
      element-loading-background="rgba(0, 0, 0, 0)"
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
            {{ t('common.allChecked') }}
          </el-checkbox>
        </el-col>
        <!-- 已选择和清除按钮 -->
        <el-col
          :span="6"
          :offset="1"
        >
          <b>{{ t('common.alreadySelect') }} {{ selectedTags.length }} {{ t('common.alreadySelectEnd') }}</b>
        </el-col>
        <el-col :span="5">
          <div class="text-align-right">
            <el-button
              size="mini"
              type="text"
              @click="toggleTree([])"
            >
              {{ t('common.clean') }}
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
          <div
            class="tree xy-scrollbar"
            style="max-height: 300px"
          >
            <el-tree
              ref="tree"
              :props="treeOptions"
              :show-checkbox="treeOptions.showCheckbox"
              :default-expand-all="treeOptions.defaultExpandAll"
              :render-after-expand="treeOptions.renderAfterExpand"
              :data="data"
              :node-key="treeOptions.nodeKey"
              :filter-node-method="filterNode"
              :empty-text="emptyText"
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
            <el-tag
              v-for="(tag, index) in selectedTags"
              :key="index"
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
import Locale from '@/mixins/locale'

export default {
  name: 'TransferTreeTable',
  mixins: [Locale],
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
          // 是否在第一次展开某个树节点后才渲染其子节点
          renderAfterExpand: {
            type: Boolean,
            default: true
          },
          // node-key绑定的字段
          nodeKey: {
            type: String,
            default: 'id'
          }
        }
      }
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
    }
  },
  data () {
    return {
      // 加载的遮罩
      load: false,
      // 树数据
      data: [],
      // 全选
      checkAll: false,
      // 过滤字段
      filterText: '',
      timer: null,
      loadText: this.t('common.loading'),
      // 表格空数据提示
      emptyText: ' '
    }
  },
  computed: {
    // 选中的数据
    selectedTags: {
      get: function () { return this.selected },
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
        this.data = val
      }
    },
    // 设置已选择的数据
    selectedData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          this.$refs.tree.setCheckedKeys(val)
        })
      }
    },
    load: function (v) {
      if (v) {
        this.emptyText = ' '
      } else {
        this.emptyText = this.t('common.noDataTip')
      }
    }
  },
  methods: {
    // 树全选和全取消
    treeCheckAll () {
      let data = this.checkAll ? this.data : []
      if (data.length !== 0) {
        data = data.filter(item =>
          item.attributes.disabled !== 'true'
        )
      }
      this.load = true
      this.toggleTree(data)
    },
    // 过滤
    filterNode (value, data) {
      if (!value) return true
      return data[this.treeOptions.label].indexOf(value) !== -1
    },
    // 树节点选中状态变化时 对应的tag变化
    treeCheck (current, checked, children) {
      current.checked = checked
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        this.selectedTags = this.filterSelectedNote(this.data, 'children', 'attributes')
      }.bind(this), 200)
    },
    // 移除已选择
    removeTag (tag) {
      this.selectedTags.splice(this.selectedTags.findIndex(item => item.id === tag.id), 1)
      this.toggleTree(this.selectedTags)
    },
    // 设置选中或取消
    toggleTree (rows) {
      if (rows.length === 0) this.checkAll = false
      this.$nextTick(function () {
        this.$refs.tree.setCheckedNodes(rows)
      })
      this.load = false
    },
    // 过滤已选择的节点
    filterSelectedNote (tree, children, attributes) {
      return tree.reduce((a, i) => {
        if (!i[children]) return a
        if (i[children].length === 0) {
          if (i[attributes].disabled === 'false') {
            if (i.checked) {
              a.push(i)
            }
          }
          return a
        } else {
          let currentItem = this.filterSelectedNote(i[children], children, attributes)
          return a.concat(currentItem)
        }
      }, [])
    }
  }
}
</script>
