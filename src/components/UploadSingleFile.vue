<template>
  <div>
    <el-upload
      :action="options.url"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      class="upload-load">
      <el-button
        v-if="fileList.length === 0"
        size="small"
        type="primary"
      >{{ $t('common.chooseFile') }}</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadSingleFile',
  // 弹窗 隐藏/显示
  model: {
    prop: 'uploadFileList',
    event: 'changeVal'
  },
  props: {
    // 配置项
    options: {
      type: Object,
      default: function () {
        return {
          // 上传地址
          url: '',
          // 禁用
          disabled: false
        }
      }
    },
    // 文件列表
    uploadFileList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    // 弹窗隐藏显示
    fileList: {
      get: function () {
        return this.uploadFileList
      },
      set: function (v) {
        this.$emit('changeVal', v)
      }
    }
  },
  methods: {
    // 文件更换,开始上传
    handleChange (file) {
      this.fileList = [file]
      this.$emit('change', file)
    },
    // 文件上传成功
    handleSuccess (response, file, fileList) {
      this.$emit('success', response, file, fileList)
    },
    // 文件上传处理错误
    handleError (err, file, fileList) {
      this.$message.error(err)
    },
    // 文件移除
    handleRemove () {
      this.fileList = []
      this.$emit('remove')
    }
  }
}
</script>

<style scoped>
  .upload-load {
    display: inline-block;
    width: 100%;
  }
  .upload-load >>> .el-upload-list {
    margin-top: -41px;
    position: absolute;
    width: 100%;
  }
  .upload-load >>> .el-upload-list .el-upload-list__item {
    transition: none;
  }
</style>
