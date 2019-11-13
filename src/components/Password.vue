<template>
  <div>
    <el-input
      v-if="hidden"
      v-model="valueModel"
      :placeholder="options.placeholder"
      :size="options.size"
      autocomplete="off"
      type="password"
    >
      <i
        slot="suffix"
        class="hand el-input__icon el-icon-view"
        @click="hidden = false"
      />
    </el-input>
    <el-input
      v-else
      v-model="valueModel"
      :placeholder="options.placeholder"
      :size="options.size"
      autocomplete="off"
      type="text"
    >
      <i
        slot="suffix"
        class="hand el-input__icon el-icon-view"
        @click="hidden = true"
      />
    </el-input>
  </div>
</template>

<script>
import Locale from '@/mixins/locale'

export default {
  name: 'Password',
  mixins: [Locale],
  // 值
  model: {
    prop: 'value',
    event: 'changeVal'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: function () {
        return {
          size: 'small',
          placeholder: this.t('user.passwordTip')
        }
      }
    }
  },
  data () {
    return {
      hidden: true
    }
  },
  computed: {
    valueModel: {
      get: function () { return this.value },
      set: function (v) { this.$emit('changeVal', v) }
    }
  }
}
</script>
