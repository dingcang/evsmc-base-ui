<template>
  <div
    class="xy-container"
  >
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 拷贝组件，包含带图标和不带图标的拷贝 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-row class="margin-bottom20">
      <el-col :span="5">
        <span class="margin-bottom10">拷贝我Name</span>
        <span>
          <copy
            :value="value1"
            :description="true"
          />
        </span>
      </el-col>
      <el-col :span="6">
        <span class="margin-bottom10">拷贝我Key</span>
        <span>
          <copy
            :value="value2"
          />
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-button
          size="mini"
          type="primary"
          @click="changeValue"
        >
          重新设置值
        </el-button>
      </el-col>
    </el-row>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Copy from '@/components/Copy'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'CopyDemo',
  components: {
    Copy,
    ApiIntroduction
  },
  data () {
    return {
      value1: 'copyName',
      value2: 'copyKey',
      showApi: false,
      propertyList: [
        { key: 'value', value: '要拷贝的内容', type: 'String', default: '' },
        { key: 'description', value: '显示或隐藏 复制到剪切板的文字描述 true/false', type: 'Boolean', default: 'false' }]
    }
  },
  methods: {
    changeValue () {
      this.value1 = 'changeCopy1'
      this.value2 = 'changeCopy2'
    }
  }
}
</script>
