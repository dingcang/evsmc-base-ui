<template>
  <dialog-head
    v-model="visible"
    :options="options"
    @close="close"
  >
    <div slot="content">
      <img
        :src="imageSrc"
        width="70%"
        alt=""
      >
    </div>
    <div slot="footer">
      &nbsp;
    </div>
  </dialog-head>
</template>

<script>
import Locale from '@/mixins/locale'
import DialogHead from './DialogHead'
export default {
  name: 'ShowImage',
  components: {
    DialogHead
  },
  mixins: [Locale],
  model: {
    prop: 'show',
    event: 'changeVal'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imageSrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        // 弹窗名称
        title: this.t('common.search'),
        width: 'normal'
      }
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.show
      },
      set: function (v) {
        this.$emit('changeVal', v)
      }
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
</script>
