<template>
  <div id="app">
    <nav>
      <el-scrollbar>
        <img
          class="logo"
          src="/logo.png"
        >
        <left-menu class="menu" />
      </el-scrollbar>
    </nav>
    <main>
      <el-scrollbar>
        <router-view />
      </el-scrollbar>
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
