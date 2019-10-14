<template>
  <div>
    <el-row class="margin-bottom20">
      <el-col :span="2">
        <slot name="c1">此处为插槽,父组件不传送此插槽则显示当前文字</slot>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="value"
          size="mini"
          placeholder="输入要传送的值"/>
      </el-col>
      <el-col
        :span="17"
        :offset="1">
        <el-button
          size="mini"
          type="primary"
          @click="send">传值至2</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {eventBus} from '@/eventbus'

  export default {
    name: 'Children1Demo',
    data: function () {
      return {
        value: ''
      }
    },
    methods: {
      // 引入eventBus,发送事件
      send () {
        eventBus.$emit('sendFrom1', this.value)
      }
    }
  }
</script>
