<template>
  <div>
    <el-row
      :gutter="30"
      class="margin-bottom10 tree-grid-head"
    >
      <el-col
        :span="24"
        class="margin-bottom5"
      >
        <slot name="leftDropdown" />
      </el-col>
      <el-col
        :span="options.titleSpan"
        :class="options.secondLevelTitle ? 'second-title' : 'title'"
      >
        {{ options.titleName }}
      </el-col>
      <el-col
        :span="options.btnSpan"
      >
        <div>
          <span
            v-for="item in options.btnOperation"
            :key="item.type"
            :class="{'display-none': !item.outShow}"
            class="margin-right5 "
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.showText"
              class="item"
              effect="dark"
              placement="bottom"
            >
              <el-button
                v-if="showSingleBtn(item)"
                size="mini"
                @click="dropDownCallBack(item.type)"
              >
                <i :class="$method.isNotEmpty(item.icon) ? 'fa ' + item.icon : 'display-none'" />
                <span v-if="item.showText">
                  {{ item.name }}
                </span>
              </el-button>
            </el-tooltip>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-if="options.showLine"
      class="margin-bottom10"
    >
      <el-col>
        <div class="title-line" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TreeGridHead',
  props: {
    operation: {
      type: Object,
      required: true,
      default: function () {
        return {
          // 显示名称
          titleName: {
            type: String,
            default: 'none'
          },
          // 标题宽度
          titleSpan: {
            type: Number,
            default: 24
          },
          // 右侧按钮宽度
          btnSpan: {
            type: Number,
            default: 0
          },
          // 右侧按钮组
          btnOperation: {
            type: Array,
            default: function () {
              return []
            }
          }
        }
      }
    }
  },
  data () {
    return {
      options: {
        // 标题宽度
        titleSpan: 24,
        // 按钮宽度
        btnSpan: 0
      }
    }
  },
  watch: {
    operation: {
      handler (val) {
        this.options = Object.assign({}, this.options, val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 左侧/右侧 更多按钮 显示/隐藏
    showMoreMenu (list) {
      if (this.$method.isEmpty(list)) return false
      let hadMore = list.findIndex(item => {
        return item.outShow !== true && (this.$method.isEmpty(item.perm) || this.hasPerm(item.perm))
      }) !== -1
      return hadMore
    },
    // 判断单个按钮权限 显示/隐藏
    showSingleBtn (item) {
      return this.$method.isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 判断下拉选项  显示/隐藏
    showDropDownItem (item) {
      if (item.outShow) return false
      return this.$method.isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 点击树的动作回调
    dropDownCallBack (type) {
      this.$emit('dropDownCallBack', type)
    }
  }
}
</script>
