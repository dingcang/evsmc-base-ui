<template>
  <!-- 弹窗标题 显示/隐藏 宽度 关闭按钮 -->
  <el-dialog
    :title="options.title"
    :visible.sync="visible"
    :width="dialogWidth"
    :top="options.center ? '15vh' : '86px'"
    :show-close="showClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :modal="options.modal"
    append-to-body
    @close="close"
  >
    <div>
      <div
        :style="'width:' + dialogInnerWidth"
        class="xy-dialog-container xy-scrollbar"
      >
        <div>
          <slot name="content" />
        </div>
      </div>
    </div>
    <div
      v-if="!options.hideFooter"
      class="text-align-center margin-top20 margin-bottom20"
    >
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogHead',
  components: {},
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
    // 组件关闭按钮显示true
    showClose: {
      type: Boolean,
      default: true
    },
    // 组件是否可以通过点击modal关闭Dialog
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // 组件是否可以通过按下ESC关闭Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 组件配置
    options: {
      type: Object,
      default: function () {
        return {
          // 居中
          center: false,
          // 标题
          title: '',
          // 表格大小 mini/small/normal/big
          width: '',
          // 是否需要遮罩层
          modal: true,
          // 隐藏底部
          hideFooter: false
        }
      }
    }
  },
  data () {
    return {
      // 弹窗大小
      dialogWidth: '',
      // 弹窗内部大小
      dialogInnerWidth: ''
    }
  },
  computed: {
    // 弹窗隐藏显示
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    }
  },
  watch: {
    // 弹窗大小判断
    'options.width': {
      handler (v) {
        switch (v) {
          case 'mini':
            this.dialogWidth = this.$xyConfig.miniDialogWidth
            this.dialogInnerWidth = this.$xyConfig.miniDialogInnerWidth
            break
          case 'small':
            this.dialogWidth = this.$xyConfig.smallDialogWidth
            this.dialogInnerWidth = this.$xyConfig.smallDialogInnerWidth
            break
          case 'big':
            this.dialogWidth = this.$xyConfig.bigDialogWidth
            this.dialogInnerWidth = this.$xyConfig.bigDialogInnerWidth
            break
          default:
            this.dialogWidth = this.$xyConfig.dialogWidth
            this.dialogInnerWidth = this.$xyConfig.dialogInnerWidth
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
    }
  }
}
</script>
