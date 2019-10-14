<template>
  <div id="app">
    <el-scrollbar>
      <left-menu class="menu" />
    </el-scrollbar>
    <router-view />
  </div>
</template>

<script>
import LeftMenu from '@/views/LeftMenu'

export default {
  name: 'App',
  components: {
    LeftMenu
  }
}
</script>
