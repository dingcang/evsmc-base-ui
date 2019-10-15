<template>
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
        :style="dialogStyle"
        class="xy-dialog-container xy-scrollbar"
      >
        <el-form
          ref="ruleForm"
          :label-width="options.labelWidth || labelWidth"
          :label-position="options.labelPosition || 'right'"
          size="small"
        >
          <!-- 单页面 -->
          <div
            v-if="!showTab"
            class="xy-block"
          >
            <detail-page
              :columns="pageColumn"
              :data="pageData"
            />
          </div>

          <!-- tab页面 -->
          <div v-if="showTab">
            <el-tabs
              v-model="activeTab"
              class="xy-dialogTab"
              type="card"
            >
              <el-tab-pane
                v-for="tab in tabColumns"
                :key="tab.title"
                :label="tab.title"
                :name="tab.title"
              >
                <div class="xy-block margin-top20">
                  <detail-page
                    :columns="pageColumn"
                    :data="pageData"
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <slot name="footer" />
    </span>
  </el-dialog>
</template>

<script>
import DetailPage from '@/components/DetailPage'
export default {
  name: 'DetailDialog',
  components: {
    DetailPage
  },
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
          // 居中
          center: false,
          // 标题 弹窗大小默认normal
          title: '',
          width: 'normal'
        }
      }
    },
    // 单页面列
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 单页面对象
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // tab页面
    tabColumns: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // 弹窗大小
      dialogWidth: '',
      // 弹窗内部大小
      dialogInnerWidth: '',
      // 激活的tab
      activeTab: '',
      // 标题宽度
      labelWidth: '150px',
      // 标题位置
      labelPosition: this.$store.state.common.labelPosition,
      // 页面展示的列名称和数据
      pageColumn: [],
      pageData: {}
    }
  },
  computed: {
    // 弹窗隐藏显示
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    },
    // 显示tab
    showTab () {
      return this.$method.isNotEmpty(this.tabColumns) && this.tabColumns.length > 0 && this.visible
    },
    dialogStyle () {
      if (this.$method.isNotEmpty(this.options.height)) return 'width:' + this.dialogInnerWidth + ';height:' + this.options.height
      return 'width:' + this.dialogInnerWidth
    }
  },
  watch: {
    // 弹窗大小判断
    'options.width': {
      handler (v) {
        if (this.$method.isEmpty(v)) return
        switch (this.options.width) {
          case 'mini':
            this.dialogWidth = this.$store.state.common.miniDialogWidth
            this.dialogInnerWidth = this.$store.state.common.miniDialogWidth
            // 特殊处理mini型弹窗的 label大小
            this.labelWidth = '50px'
            break
          case 'small':
            this.dialogWidth = this.$store.state.common.smallDialogWidth
            this.dialogInnerWidth = this.$store.state.common.smallDialogInnerWidth
            break
          case 'big':
            this.dialogWidth = this.$store.state.common.bigDialogWidth
            this.dialogInnerWidth = this.$store.state.common.bigDialogInnerWidth
            break
          default:
            this.dialogWidth = this.$store.state.common.dialogWidth
            this.dialogInnerWidth = this.$store.state.common.dialogInnerWidth
        }
      },
      immediate: true
    },
    // 监控data变化
    data: {
      handler (v) {
        if (this.$method.isEmpty(v)) return
        this.pageData = Object.assign({}, this.data)
      },
      immediate: true
    },
    // 点击第一个
    showTab: {
      handler (v) {
        if (v) {
          // tab
          this.activeTab = this.tabColumns[0].title
        } else {
          this.pageColumn = this.columns
        }
      },
      immediate: true
    },
    // 监控tab页变化
    activeTab: {
      handler (v) {
        if (this.$method.isEmpty(v)) return
        for (let item of this.tabColumns) {
          if (v === item.title) {
            this.pageColumn = item.columns
            this.pageData = Object.assign({}, item.data)
            break
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 关闭
    close () {
      this.visible = false
      this.$emit('close')
      this.activeTab = ''
    }
  }
}
</script>
