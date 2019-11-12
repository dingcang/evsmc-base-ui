<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 消息总线，包含兄弟组件间传值和vuex传值 </span>
      </el-col>
    </el-row>
    <hr>
    <div class="margin-bottom20">
      传值方式:
      <el-select
        v-model="listModel"
        size="small"
        style="width: 200px;"
      >
        <el-option
          v-for="item in list"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div
      v-show="listModel === 'eventBus'"
      class="margin-bottom40"
      style="font-weight: bolder"
    >
      不经过父组件，俩个兄弟组件之间传值通过eventBus：
      <hr>
      <div>
        <children1 ref="children1">
          <h5 slot="c1">
            子组件1号
          </h5>
        </children1>
        <children2 ref="children2">
          <h5 slot="c2">
            子组件2号
          </h5>
        </children2>
      </div>
    </div>
    <div
      v-show="listModel === 'vuex'"
      class="margin-top5"
      style="font-weight: bolder"
    >
      不经过父组件，俩个兄弟组件之间传值通过vuex：
      <hr>
      <div>
        <children3 ref="children3">
          <h5 slot="c3">
            子组件3号
          </h5>
        </children3>
        <children4 ref="children4" />
      </div>
    </div>
  </div>
</template>

<script>
import Children1 from './components/Children1'
import Children2 from './components/Children2'
import Children3 from './components/Children3'
import Children4 from './components/Children4'

export default {
  name: 'ParentDemo',
  components: {
    Children1, Children2, Children3, Children4
  },
  data: function () {
    return {
      list: ['eventBus', 'vuex'],
      listModel: 'eventBus'
    }
  }
}
</script>
