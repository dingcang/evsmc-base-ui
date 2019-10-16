<template>
  <div id="app">
    <el-scrollbar>
      <img
        class="logo"
        src="/logo.png"
      >
      <left-menu class="menu" />
    </el-scrollbar>
    <main>
      <router-view />
    </main>
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
