<template>
  <div>
    <el-row>
      <el-col :span="2">
        <slot name="c2"/>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="input"
          :readobly="true"
          size="mini"
          placeholder="接收子组件1传来的值"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {eventBus} from '@/eventbus'

  export default {
    name: 'Children2Demo',
    data: function () {
      return {
        input: ''
      }
    },
    mounted () {
      // 初始化该组件时注册指定事件的eventBus
      this.listenBusEvent()
    },
    methods: {
      listenBusEvent () {
        let that = this
        eventBus.$on('sendFrom1', function (val) {
          that.input = val
        })
      }
    }
  }
</script>
