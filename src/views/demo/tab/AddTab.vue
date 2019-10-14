<template>
  <div class="xy-container">
    add
    <el-button @click="cancel">
      返回
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'AddTab',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {
    let path = this.$method.getSecondPath(this.$route.fullPath)
    this.$store.commit('removeLevelAfterName', { name: this.$route.params.tabId })
    this.$store.commit('editSecondLevel', { path: path })
    this.$store.commit('addLevel', { name: this.$t('common.add') })
  },
  methods: {
    cancel () {
      this.$router.push({ name: 'tab', params: { tabId: this.$route.params.tabId } })
    }
  }
}
</script>
