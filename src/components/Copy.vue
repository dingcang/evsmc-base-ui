<template>
  <el-tooltip
    :content="copyTip"
    class="item"
    effect="dark"
    placement="top"
  >
    <span @click="copy">
      <i class="fa fa-copy cursor-pointer"><span v-show="description">{{ $t('common.copyToClipboard') }}</span></i>
    </span>
  </el-tooltip>
</template>

<script>
import _ from 'underscore'
export default {
  props: {
    // 描述
    description: {
      type: Boolean,
      default: false
    },
    // 拷贝的值
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      copyTip: this.$t('common.copyToClipboard')
    }
  },
  methods: {
    // 拷贝,不设置回调方法
    copy (text) {
      let that = this
      if (!_.isUndefined(text)) this.value = text
      this.$method.copyToClipboard(this.value)
      this.copyTip = this.$t('common.copied')
      setTimeout(function () {
        that.copyTip = that.$t('common.copyToClipboard')
      }, 2000)
    }
  }
}
</script>
