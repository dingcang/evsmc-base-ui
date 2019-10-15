<template>
  <div class="xy-container">
    <!-- 查询 -->
    <slot name="query" />
    <div class="xy-grid-container">
      <!-- 按钮 -->
      <slot name="batchButton" />
      <!-- 表格 -->
      <slot name="grid" />
    </div>
    <div>
      <!-- 其他内容 -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutGridPage',
  props: {
    loadend: {
      type: Function,
      default: null
    }
  },
  mounted () {
    this.loadend && this.loadend()
  }
}
</script>
