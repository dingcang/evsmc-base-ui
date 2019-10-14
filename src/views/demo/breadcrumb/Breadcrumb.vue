<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 面包屑添加/删除演示(包含如何添加路径，删除路径) </span>
      </el-col>
    </el-row>
    <hr>
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="8">
        <el-button
          size="mini"
          type="primary"
          @click="addData"
        >
          添加子菜单
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addPathData"
        >
          添加带链接子菜单
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          v-model="name"
          size="mini"
          placeholder="删除菜单的名称"
        />
      </el-col>
      <el-col :span="12">
        <el-button
          size="mini"
          type="primary"
          @click="removeMenu"
        >
          删除菜单
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="removeMenuFrom"
        >
          删除某个名字后的菜单
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbDemo',
  data: function () {
    return {
      name: ''
    }
  },
  methods: {
    addData () {
      this.$store.commit('addLevel', { name: this.name ? this.name : 'a1' })
    },
    addPathData () {
      this.$store.commit('addLevel', { name: this.name ? this.name : 'a2', path: '/breadcrumb/add' })
    },
    removeMenu () {
      this.$store.commit('removeLevelByName', { name: this.name })
    },
    removeMenuFrom () {
      this.$store.commit('removeLevelAfterName', { name: this.name })
    }
  }
}
</script>
