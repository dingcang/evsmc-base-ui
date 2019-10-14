<template>
  <div>
    <div>
      <el-row
        :gutter="10"
        class="margin-bottom20"
      >
        <el-col :span="16">
          <div
            v-for="(item, index) in buttonList"
            :key="index"
            class="margin-right5 inline-style"
          >
            <!-- 单个按钮 -->
            <el-button
              v-if="showSingleBtn(item)"
              :type="btnType(item)"
              size="mini"
              @click="handleButton(item.type)"
            >
              <i :class="$method.isNotEmpty(item.icon) ? 'fa margin-right5 ' + item.icon : 'display-none'" />
              {{ item.name }}
            </el-button>
            <!-- 下拉列表显示的配置 -->
            <el-dropdown
              v-if="showDropDownBtn(item)"
            >
              <el-button
                size="mini"
                type="primary"
              >
                <!--<i :class="$method.isNotEmpty(item.icon) ? 'fa margin-right5 ' + item.icon : 'display-none'" />-->
                {{ item.name }}
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
                    <!--<i :class="$method.isNotEmpty(item2.icon) ? 'fa margin-right5 ' + item2.icon : 'display-none'" />-->
                    {{ item2.name }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- text类型按钮-->
            <el-button
              v-if="showTextBtn(item)"
              :type="btnType(item)"
              size="mini"
              @click="handleButton(item.type)"
            >
              <i :class="$method.isNotEmpty(item.icon) ? 'fa margin-left20 margin-right5 ' + item.icon : 'display-none'" />
              {{ item.name }}
            </el-button>
          </div>
          <!-- 空格占位 当按钮为空时 -->
          &nbsp;
        </el-col>
        <el-col
          :span="8"
        >
          <div class="text-align-right">
            <span
              v-for="(item, index) in buttonList"
              :key="index"
              class="xy-button-item"
            >
              <!-- 按钮显示的配置 -->
              <el-button
                v-if="item.right"
                size="mini"
                type="text"
                class="margin-right10"
                @click="handleButton(item.type)"
              >
                <i :class="$method.isNotEmpty(item.icon) ? 'fa margin-right5 ' + item.icon : 'display-none'" />
                {{ item.name }}
              </el-button>
            </span>
            <!-- 显示/隐藏列 -->
            <el-button
              v-if="options.showDisplay"
              size="mini"
              type="text"
              @click="setColumnDisplay"
            >
              {{ $t("common.columnDisplay") }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <!-- save为列显示隐藏的保存按钮回调 -->
      <grid-column-display
        ref="columnDisplay"
        @save="saveColumnDisplay"
      />
    </div>
  </div>
</template>

<script>
import GridColumnDisplay from '@/components/GridColumnDisplay'

export default {
  name: 'BatchButton',
  components: {
    GridColumnDisplay
  },
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
    return {
      // 按钮配置项，默认显示 显示/隐藏列按钮
      options: {
        showDisplay: true
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 判断单个按钮权限 显示/隐藏
    showSingleBtn (item) {
      if (item.kind !== 'button') return false
      return this.$method.isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 判断单个按钮权限 显示/隐藏
    showTextBtn (item) {
      return item.kind === 'text' && !item.right
    },
    // 判断显示下拉按钮权限 显示/隐藏
    showDropDownBtn (item) {
      if (item.kind !== 'dropDown') return false
      // 判断是否存在至少一个选项 不存在则隐藏
      let noPermIndex = item.data.findIndex(cur => this.$method.isEmpty(cur.perm))
      let index = item.data.findIndex(cur => this.hasPerm(cur.perm))
      return index !== -1 || noPermIndex !== -1
    },
    // 判断显示下拉选项权限 显示/隐藏
    showDropDownItem (item) {
      return this.$method.isEmpty(item.perm) || this.hasPerm(item.perm)
    },
    // 初始化 配置显示或隐藏  显示/隐藏列按钮
    initData () {
      this.options = Object.assign({}, this.options, this.buttonOptions)
    },
    // 按钮事件回调 回传类型
    handleButton (type) {
      this.$emit('buttonCallBack', type)
    },
    // 显示隐藏列的回调
    setColumnDisplay () {
      this.$emit('setColumnDisplay')
    },
    // 打开列显示隐藏组件
    openColumnDisplay (columns, gridColumnKey) {
      this.$refs.columnDisplay.initData(columns, gridColumnKey)
    },
    // 保存列显示隐藏回调
    saveColumnDisplay (columns) {
      this.$emit('saveColumnDisplay', columns)
    },
    // 按钮类型
    btnType (item) {
      if (this.$method.isEmpty(item.btnType)) return 'primary'
      if (this.$method.isNotEmpty(item.btnType) && item.btnType === 'empty') return ''
      if (this.$method.isNotEmpty(item.btnType)) return item.btnType
    }
  }
}
</script>
