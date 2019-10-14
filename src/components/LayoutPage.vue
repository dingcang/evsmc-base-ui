<template>
  <div
    v-loading="load"
    class="xy-container"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="xy-page">
      <el-row class="margin-bottom10">
        <el-col :span="24"><span class="xy-left-title">{{ options.title }}</span></el-col>
      </el-row>
      <div class="xy-content">
        <slot name="content" />
      </div>
      <div class="text-align-center">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  props: {
    load: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {}
  },
  methods: {}
}
</script>
