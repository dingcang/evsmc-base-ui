<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :before-close="close"
      width="1000px"
      title="查看API"
    >
      <el-table
        :data="property"
        border
        class="margin-top5"
      >
        <el-table-column
          prop="key"
          label="属性"
          width="180"
        />
        <el-table-column
          prop="type"
          label="类型"
          width="100"
        />
        <el-table-column
          prop="default"
          label="默认"
          width="100"
        />
        <el-table-column
          prop="value"
          label="描述"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ApiIntroduction',
  // 隐藏显示属性
  model: {
    prop: 'showApi',
    event: 'changeVal'
  },
  // api详情
  props: {
    showApi: {
      type: Boolean,
      default: false
    },
    property: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    visible: {
      get: function () { return this.showApi },
      set: function (v) { this.$emit('changeVal', v) }
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
</script>
