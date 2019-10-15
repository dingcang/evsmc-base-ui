<template>
  <el-color-picker
    v-model="themeValue"
    size="small"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import theme from '@/mixins/theme'

export default {
  name: 'TopTheme',
  mixins: [theme()],
  data () {
    return {
      chalk: ''
    }
  }
}
</script>
