<template>
  <div>
    <el-row
      class="margin-bottom10 text-align-right"
    >
      <el-col
        :span="24"
      >
        <div
          v-for="(item, index) in buttonList"
          :key="index"
          class="margin-left5 inline-style"
        >
          <!-- 单个按钮 -->
          <el-tooltip
            :content="item.name"
            class="item"
            effect="dark"
            placement="top"
          >
            <el-button
              v-if="showSingleBtn(item)"
              size="mini"
              @click="handleButton(item.type)"
            >
              <i :class="isNotEmpty(item.icon) ? 'fa ' + item.icon : 'display-none'" />
            </el-button>
          </el-tooltip>
          <!-- 下拉列表显示的配置 -->
          <el-tooltip
            :content="item.name"
            class="item"
            effect="dark"
            placement="top"
          >
            <el-dropdown
              v-if="showDropDownBtn(item)"
            >
              <el-button size="mini">
                <i :class="isNotEmpty(item.icon) ? 'fa ' + item.icon : 'display-none'" />
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item2,index) in item.data"
                  v-if="showDropDownItem(item2)"
                  :key="index"
                  @click.native="handleButton(item2.type)"
                >
                  <span>
                    {{ item2.name }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isNotEmpty, isEmpty } from '@/utils'

export default {
  name: 'IconBatchButton',
  props: {
    // 按钮的配置
    buttonOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 按钮详细列表信息
    buttonList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {}
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 判断单个按钮权限 显示/隐藏
    showSingleBtn (item) {
      if (item.kind !== 'button') return false
      return isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 判断显示下拉按钮权限 显示/隐藏
    showDropDownBtn (item) {
      if (item.kind !== 'dropDown') return false
      // 判断是否存在至少一个选项 不存在则隐藏
      let noPermIndex = item.data.findIndex(cur => isEmpty(cur.perm))
      let index = item.data.findIndex(cur => this.hasPerm(cur.perm))
      return index !== -1 || noPermIndex !== -1
    },
    // 判断显示下拉选项权限 显示/隐藏
    showDropDownItem (item) {
      return isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 初始化 配置显示或隐藏  显示/隐藏列按钮
    initData () {
      this.options = Object.assign({}, this.options, this.buttonOptions)
    },
    // 按钮事件回调 回传类型
    handleButton (type) {
      this.$emit('buttonCallBack', type)
    },
    // 按钮类型
    btnType (item) {
      if (isEmpty(item.btnType)) return 'primary'
      if (isNotEmpty(item.btnType) && item.btnType === 'empty') return ''
      if (isNotEmpty(item.btnType)) return item.btnType
    },
    isNotEmpty
  }
}
</script>
<style lang="scss" scoped>
  .inline-style{
    display:inline-block
  }
</style>
