<template>
  <div class="margin-bottom20">
    <slot name="c3" />
    <el-form
      label-width="50px"
      class="margin-bottom20"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="id">
            <el-input
              v-model="id"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="value">
            <el-input
              v-model="value"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="1"
          style="padding-top: 6px"
        >
          <el-button
            size="mini"
            type="primary"
            @click="addData"
          >
            add
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="editData"
          >
            edit
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="removeData"
          >
            remove
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="clearData"
          >
            clear
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="name">
            <el-input
              v-model="newName"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="17"
          :offset="1"
          style="padding-top: 6px"
        >
          <el-button
            size="mini"
            type="primary"
            @click="setName"
          >
            setName
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="sex">
            <el-radio
              v-model="newSex"
              :label="true"
              size="mini"
            >
              男
            </el-radio>
            <el-radio
              v-model="newSex"
              :label="false"
              size="mini"
            >
              女
            </el-radio>
          </el-form-item>
        </el-col>
        <el-col
          :span="17"
          :offset="1"
          style="padding-top: 6px"
        >
          <el-button
            size="mini"
            type="primary"
            @click="setSex"
          >
            setSex
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="17"
          :offset="1"
          style="padding-top: 6px"
        >
          <el-button
            size="mini"
            type="primary"
            @click="setQueryData"
          >
            queryData
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getInfoBy1"
          >
            getInfoBy1
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="color: red; overflow-y:scroll; height:100px">
      子组件3获取的vuex值:
      <br>
      data: {{ data }}
      <br>
      name: {{ name }}
      <br>
      sex: {{ sex }}
      <br>
      info: {{ info }}
    </div>
  </div>
</template>

<script>
// 初始vuex化命名空间
const { mapGetters, mapMutations, mapActions } = Vuex.createNamespacedHelpers('demo')

export default {
  name: 'Children3Demo',
  data: function () {
    return {
      id: 1,
      value: '',
      newName: '',
      newSex: false
    }
  },
  computed: {
    // 批量注册getters
    ...mapGetters([
      'data',
      'name',
      'sex',
      'info',
      'getById'
    ])
  },
  methods: {
    // vuex mutations 方法批量引入
    ...mapMutations({
      add: 'add',
      edit: 'edit',
      remove: 'remove',
      clear: 'clear',
      sName: 'name',
      sSex: 'sex',
      sData: 'data'
    }),
    // vuex actions 方法批量引入
    ...mapActions([
      'queryData'
    ]),
    addData () {
      // 单条操作提交mutations
      this.$store.commit('demo/add', { id: this.id, value: this.value })
      // 批量引入时,可用方法提交mutations
      // this.add({id: this.id, value: this.value})
    },
    editData () {
      this.edit({ id: this.id, value: this.value })
    },
    removeData () {
      this.remove({ id: this.id, value: this.value })
    },
    clearData () {
      this.clear({ id: this.id, value: this.value })
    },
    setName () {
      this.sName(this.newName)
    },
    setSex () {
      this.sSex(this.newSex)
    },
    setQueryData () {
      this.clearData()
      // 单条操作提交actions
      this.$store.dispatch('demo/queryData')
      // 批量引入时,可用方法提交actions
      // this.queryData()
    },
    getInfoBy1 () {
      // getters 根据参数获取指定信息
      this.$alert(this.getById(1))
    }
  }
}
</script>
