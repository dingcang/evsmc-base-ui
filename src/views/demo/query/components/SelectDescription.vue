<template>
  <div class="margin-bottom20">
    <el-dialog
      :title="$t('common.choose')"
      :visible.sync="visible"
      :close-on-click-modal="false"
      center
      width="50%"
      @close="close"
    >
      <div>
        传入参数： {{ oldValue }}
        <br>
        会返回一个数组
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="save"
        >
          {{ $t('common.save') }}
        </el-button>
        <el-button @click="close">
          {{ $t('common.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SelectDescription',
  data () {
    return {
      oldValue: [],
      visible: false,
      value: []
    }
  },
  methods: {
    initData (param) {
      this.visible = true
      this.oldValue = param
    },
    save () {
      this.value = [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }]
      this.$emit('save', this.value)
      this.close()
    },
    close () {
      this.visible = false
    }
  }
}
</script>
