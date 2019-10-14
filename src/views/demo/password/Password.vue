<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 密码组件 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <password
          v-model="value"
          :options="options"
        />
      </el-col>
    </el-row>

    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Password from '@/components/Password'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'PasswordDemo',
  components: {
    Password,
    ApiIntroduction
  },
  data () {
    return {
      value: '',
      options: {
        size: 'small'
      },
      showApi: false,
      propertyList: [
        { key: 'value', value: '双向绑定', type: 'String', default: '' },
        { key: 'options', value: '组件属性配置', type: 'Object', default: '' },
        { key: ' - size', value: '大小', type: 'String', default: 'small' },
        { key: ' - placeholder', value: '提示占位符', type: 'String', default: '6位以上30位以下密码' }]
    }
  },
  watch: {
    value: {
      handler (val) {
        console.log(val)
      }
    }
  },
  methods: {
  }
}
</script>
