<template>
  <div>
    <el-upload
      ref="upload"
      :file-list="list"
      :before-upload="beforeUpload"
      :limit="limit"
      :on-preview="showImage"
      :on-remove="removeImage"
      :on-success="uploadSuccess"
      :action="uploadUrl"
      :disabled="options.disabled"
      :on-exceed="handleExceed"
      :class="{'xy-upload-full': hideAdd}"
      multiple
      list-type="picture-card"
      accept="image/*"
    >
      <i class="el-icon-plus" />
      <div
        slot="tip"
        class="el-upload__tip"
      >
        {{ tip }}
      </div>
    </el-upload>

    <show-image
      v-model="showBigImage"
      :image-src="srcId"
    />
  </div>
</template>

<script>
import * as config from '../api/config'

import ShowImage from '@/components/ShowImage'
import { isEmpty } from '@/utils'

export default {
  name: 'UploadImg',
  components: {
    ShowImage
  },
  props: {
    // 旧图片
    oldImage: {
      type: String,
      default: ''
    },
    // 限制上传图片数目
    limit: {
      type: Number,
      default: 1
    },
    // 提示
    tip: {
      type: String,
      default: ''
    },
    // 限制上传图片的宽高
    limitWith: {
      type: Array,
      default: function () {
        return []
      }
    },
    options: {
      type: Object,
      default: function () {
        return {
          // 禁用
          disabled: false
        }
      }
    }
  },
  data () {
    return {
      // 上传列表
      list: [],
      // 查看图片
      showBigImage: false,
      // 图片地址
      srcId: '',
      // 上传图片的地址
      uploadUrl: config.uploadImg,
      // 图片的ids
      imageIds: [],
      // 记录旧的image
      oldImageIds: []
    }
  },
  computed: {
    hideAdd () {
      return this.oldImageIds.length + this.imageIds.length === this.limit
    }
  },
  watch: {
    // 设置旧imageIds
    oldImage: {
      handler (val) {
        if (isEmpty(val)) {
          this.list = []
          this.oldImageIds = []
          this.imageIds = []
          return
        }
        // 判断图片是多张
        let oldIds = val.split(',')
        for (let id of oldIds) {
          this.getImageById(id)
        }
      },
      immediate: true
    },
    // 设置imageIds
    imageIds: {
      handler (val) {
        let ids = []
        for (let item of val) {
          ids.push(item.id)
        }
        for (let item of this.oldImageIds) {
          ids.push(item.id)
        }
        this.$emit('save', ids.join(','))
      },
      immediate: true
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (resp, file, fileList) {
      this.imageIds.push({ id: resp.data, url: file.url })
    },
    // 上传前校验
    beforeUpload (file, fileList) {
      if (this.limitWith.length !== 0) {
        return this.checkWidth(file)
      }
      let mess = this.t('common.uploadImageTip')
      let err = this.checkTypeAndSize(file)
      if (err) {
        this.$message({
          message: mess,
          type: 'warning'
        })
        return false
      }
    },
    // 查看照片
    showImage (file) {
      this.srcId = file.url
      this.showBigImage = true
    },
    // 移除照片
    removeImage (file) {
      let oldIndex = this.oldImageIds.findIndex(item => item.url === file.url)
      this.oldImageIds.splice(oldIndex, 1)
      let index = this.imageIds.findIndex(item => item.url === file.url)
      this.imageIds.splice(index, 1)
    },
    checkWidth (file) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        let _URL = window.URL || window.webkitURL
        img.src = _URL.createObjectURL(file)
        img.onload = () => {
          if (img.width <= this.limitWith[0] && img.height <= this.limitWith[1]) {
            resolve()
          } else {
            this.$message.warning(this.t('interNumber.uploadLimit') + this.limitWith[0] + '*' + this.limitWith[1])
            reject(Error('sizelimit'))
          }
        }
      })
    },
    // 检查图片类型及大小 jpg/png  小于5Mb
    checkTypeAndSize (file) {
      let suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase()
      let suffixErr = suffix === 'JPG' || suffix === 'PNG'
      return !suffixErr || file.size > 5242880
    },
    handleExceed (files, fileList) {
      this.$message.warning(this.t('common.uploadLimitTip1') + this.limit +
          this.t('common.uploadLimitTip2') + files.length +
          this.t('common.uploadLimitTip3') + (files.length + fileList.length) +
          this.t('common.uploadLimitTip4'))
    },
    // 获取图片
    async getImageById (id) {
      let url = await this.$xyConfig.getImageById(id)
      this.list = [{ url: url }]
      this.oldImageIds.push({ id: id, url: url })
    },
    // 清空文件
    clearFiles () {
      this.list = []
      this.imageIds = []
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
