<template>
  <div
    v-loading="load"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    class="xy-addOrEdit"
  >
    <el-row :class="hiddenTitle ? '' : 'margin-bottom10'">
      <el-col :span="18">
        <span class="xy-left-title">{{ options.title }}</span>
      </el-col>
      <div class="text-align-right">
        <el-col :span="6">
          <span class="xy-right-title">
            <span v-show="column === 1">
              {{ t('common.oneColumnOneRow') }}&nbsp;|&nbsp;
            </span>
            <span v-show="column !== 1">
              <el-button
                type="text"
                @click="column = 1"
              >{{ t('common.oneColumnOneRow') }}</el-button>&nbsp;|&nbsp;
            </span>

            <span v-show="column === 2">
              {{ t('common.twoColumnOneRow') }}&nbsp;|&nbsp;
            </span>
            <span v-show="column !== 2">
              <el-button
                type="text"
                @click="column = 2"
              >{{ t('common.twoColumnOneRow') }}</el-button>&nbsp;|&nbsp;
            </span>

            <span v-show="column === 3">
              {{ t('common.threeColumnOneRow') }}&nbsp;
            </span>
            <span v-show="column !== 3">
              <el-button
                type="text"
                @click="column = 3"
              >{{ t('common.threeColumnOneRow') }}</el-button>
            </span>
          </span>
        </el-col>
      </div>
    </el-row>
    <div :class="hiddenTitle ? '' : 'xy-content'">
      <el-row>
        <el-col
          :span="contentSpan"
          :offset="contentOffset"
        >
          <slot />
        </el-col>
      </el-row>
    </div>
    <div
      v-if="!options.isHiddenFooter"
      class="text-align-center"
    >
      <el-button
        v-if="options.showSaveAdd"
        type="primary"
        size="small"
        @click="saveContinue"
      >
        {{ t('common.saveAndContinueAdd') }}
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="save"
      >
        {{ t('common.save') }}
      </el-button>
      <el-button
        v-if="!options.hideReset"
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>
      <el-button
        size="small"
        @click="cancel"
      >
        {{ t('common.cancel') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Locale from '@/mixins/locale'
import { isEmpty } from '@/utils'

export default {
  name: 'Add',
  mixins: [Locale],
  props: {
    load: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function () {
        return {
          // 显示保存并继续
          showSaveAdd: false,
          // 隐藏重置按钮
          hideReset: false
        }
      }
    }
  },
  data: function () {
    return {
      // 配置内容宽度
      contentSpan: 24,
      // 配置内容左偏移
      contentOffset: 0
    }
  },
  computed: {
    column: {
      get () {
        return this.$xyConfig.column || 2
      },
      set (newValue) {
        this.$xyConfig.column = newValue
      }
    },
    // 隐藏头标题时 去掉三个样式
    hiddenTitle () {
      return isEmpty(this.options.title)
    }
  },
  watch: {
    // 监控点击切换列
    column: {
      immediate: true,
      handler (val) {
        if (val === 1) {
          this.contentSpan = 14
          this.contentOffset = 5
        } else {
          this.contentSpan = 24
          this.contentOffset = 0
        }
        if (val === 3) {
          this.$xyConfig.gutter = 16
          this.$xyConfig.span = 8
        } else if (val === 2) {
          this.$xyConfig.gutter = 100
          this.$xyConfig.span = 12
        } else if (val === 1) {
          this.$xyConfig.gutter = 100
          this.$xyConfig.span = 24
        }
      }
    }
  },
  created () {
    window.queryC = this
  },
  methods: {
    saveContinue () {
      this.$emit('save', 'continue')
    },
    save () {
      this.$emit('save', 'close')
    },
    cancel () {
      this.$emit('cancel')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/components/addOrEdit.scss";
</style>
