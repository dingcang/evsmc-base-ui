<template>
  <div>
    <script
      :id="randomId"
      type="text/plain"
    />
  </div>
</template>

<script>
import '@p/ueditor/ueditor.config.js'
import '@p/ueditor/ueditor.all.js'
import '@p/ueditor/lang/zh-cn/zh-cn.js'

export default {
  name: 'Editor',
  props: {
    // 默认的内容
    value: {
      type: String,
      default: ''
    },
    // 配置项
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // 每个编辑器生成不同的id,以防止冲突
      randomId: 'editor_' + (Math.random() * 100000000000000000),
      // 编辑器实例
      editor: null,
      // 初始化完成状态
      ready: false
    }
  },
  watch: {
    value: function (val, oldVal) {
      if (this.$method.isNotEmpty(val) && this.ready) {
        this.editor = UE.getEditor(this.randomId, this.options)
        this.editor.setContent(val)
      }
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeDestroy () {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.editor !== null && this.editor.destroy) {
      this.editor.destroy()
    }
  },
  methods: {
    initEditor () {
      // dom元素已经挂载上去了
      this.$nextTick(() => {
        this.editor = UE.getEditor(this.randomId, this.options)
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.editor.addListener('ready', () => {
          this.ready = true
          this.$emit('ready', this.editor)
        })
      })
    },
    // 设置内容方法
    setUEContent (value) {
      this.editor.setContent(value)
    },
    // 获取内容方法
    getUEContent () {
      return this.editor.getContent()
    },
    // 设置Html内容方法
    execCommand (type, param) {
      this.editor.execCommand(type, param)
    },
    // 获取纯文本内容方法
    getUEContentTxt () {
      return this.editor.getContentTxt()
    },
    // 禁用/启用
    changeState (type) {
      if (type === 'enabled') {
        this.editor.setEnabled()
      } else if (type === 'disabled') {
        this.editor.setDisabled()
      }
    }
  }
}
</script>
