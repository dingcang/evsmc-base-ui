<template>
  <div
    class="xy-container"
  >
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 上传图片组件和查看图片方法 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <div class="xy-block">
      <el-form
        ref="ruleForm"
        size="mini"
        label-width="150px"
        label-position="top"
        class="demo-ruleForm"
      >
        <!-- 上传图片 -->
        <el-row>
          <el-col
            :span="12"
          >
            <el-form-item label="测试上传正面图片">
              <upload-img
                :old-image="oldImageId"
                @save="saveId"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试禁用图片">
              <upload-img
                :options="options"
                @save="saveId2"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="测试上传正面图片3">
              <upload-img
                @save="saveId3"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试上传反面图片4">
              <upload-img @save="saveId4" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="测试上传多张图片">
              <upload-img
                :limit="3"
                @save="saveId5"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <hr>
        <!-- 查看图片 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="获取查看的图片">
              <el-input v-model="imageId" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label=" ">
              <el-button
                type="primary"
                size="mini"
                @click="getImg"
              >
                查看
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="查看图片结果">
              <img :src="imgSrc">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'UploadImgDemo',
  components: {
    UploadImg,
    ApiIntroduction
  },
  data () {
    return {
      options: {
        disabled: true
      },
      // 要查看的图片id
      imageId: '',
      // 查看的图片地址
      imgSrc: '',
      // 旧图片的id
      oldImageId: '7208e3cc243248fdbc9d0504c1493961',
      showApi: false,
      propertyList: [
        { key: 'oldImage', value: '旧图片', type: 'String', default: '' },
        { key: 'limit', value: '限制上传的数目 不传默认是1', type: 'Number', default: '1' },
        { key: 'options', value: '图片上传组件配置', type: 'Object', default: '' },
        { key: ' - disabled', value: '禁用', type: 'Boolean', default: 'false' },
        { key: '@save', value: '保存图片后的图片id回调', type: '事件', default: '' }]
    }
  },
  methods: {
    // 查看图片
    async getImg () {
      this.imgSrc = await this.$method.getImageById(this.imageId)
    },
    saveId (id) {
      console.log(1)
      console.log(id)
    },
    saveId2 (id) {
      console.log(2)
      console.log(id)
    },
    saveId3 (id) {
      console.log(3)
      console.log(id)
    },
    saveId4 (id) {
      console.log(4)
      console.log(id)
    },
    saveId5 (id) {
      console.log(5)
      console.log(id)
    }
  }
}
</script>
