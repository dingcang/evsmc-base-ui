<template>
  <el-container>
    <el-header>
      <h3>查看API</h3>
    </el-header>
    <el-main>
      <el-table
        :data="property"
        border
        class="margin-top5"
      >
        <el-table-column
          prop="key"
          label="属性"
          width="200"
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
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ApiIntroduction',
  // api详情
  props: {
    property: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
