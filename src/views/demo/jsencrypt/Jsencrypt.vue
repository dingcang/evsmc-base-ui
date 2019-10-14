<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 通过rsa加密解密算法 </span>
      </el-col>
    </el-row>
    <hr>
    <el-row class="margin-bottom20">
      <el-col :span="6">
        <el-input
          v-model="str"
          size="mini"
        />
      </el-col>
      <el-col
        :span="4"
        :offset="1"
      >
        <el-button
          size="mini"
          type="primary"
          @click="encode()"
        >
          {{ $t('common.encode') }}
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="decode()"
        >
          {{ $t('common.decode') }}
        </el-button>
      </el-col>
    </el-row>
    <el-row class="margin-bottom20">
      <el-col :span="12">
        {{ $t('common.encode') }}：{{ encodeStr }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        {{ $t('common.decode') }}：{{ decodeStr }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Jsencrypt',
  data: function () {
    return {
      str: '',
      encodeStr: '',
      decodeStr: ''
    }
  },
  methods: {
    encode () {
      this.encodeStr = this.$method.jseEncode(this.str)
    },
    decode () {
      this.decodeStr = this.$method.jseDecode(this.encodeStr)
    }
  }
}
</script>
