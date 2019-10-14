<template>
  <el-form
    :label-width="options.labelWidth || labelWidth"
    :size="options.size || size"
    class="detail-page"
  >
    <el-row :gutter="options.pageGutter || pageGutter">
      <span
        v-for="item in list"
        :key="item.name"
      >
        <el-col :span="options.detailSpan || detailSpan">
          <el-form-item
            :label="item.name"
          >

            <!-- 按钮 -->
            <span v-if="showBtn(item)">
              <el-button
                :disabled="data[item.param.disabled]"
                :type="item.param.type"
                :class="item.param.class"
                :size="item.param.size"
                @click="formBtnCallBack(item.model, data)"
              >{{ data[item.model] }}</el-button>
            </span>

            <!-- 图标加字 -->
            <span v-if="item.type === 'icon'">
              <span :class="data[item.param.outerClass]">
                <i :class="data[item.param.icon]" />
                <span v-if="item.model">
                  {{ data[item.model] }}
                </span>
              </span>
            </span>
            <!-- 字 -->
            <span v-if="!item.type">
              <el-tooltip
                :content="'' + data[item.model]"
                :disabled="showTip(data[item.model])"
                class="item"
                effect="dark"
                placement="bottom"
              >
                <div class="detail-text">
                  {{ data[item.model] }}
                </div>
              </el-tooltip>
            </span>
          </el-form-item>
        </el-col>
      </span>
    </el-row>

    <el-row
      v-if="imageList.length > 0"
      :gutter="options.pageGutter || pageGutter"
    >
      <span
        v-for="item in imageList"
        :key="item.name"
      >
        <el-col :span="options.detailSpan || detailSpan">
          <el-form-item
            :label="item.name"
          >
            <img
              v-if="data[item.model]"
              :src="item.srcModel"
              class="hand"
              style="max-height: 100px;max-width: 150px;"
              @click="showImageDialog(item.srcModel)"
            >
          </el-form-item>
        </el-col>
      </span>
    </el-row>

    <show-image
      v-model="showBigImage"
      :image-src="srcId"
    />
  </el-form>
</template>

<script>
import ShowImage from '@/components/ShowImage'

export default {
  name: 'TreeGridDetailForm',
  components: {
    ShowImage
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          labelWidth: '',
          size: '',
          pageGutter: 10,
          detailSpan: 8
        }
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    imageList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      showBigImage: false,
      srcId: '',
      labelWidth: '120px',
      size: 'small',
      pageGutter: 10,
      detailSpan: 8
    }
  },
  methods: {
    showTip (value) {
      let strVal = value + ''
      return this.$method.isEmpty(strVal) || strVal.length < 8
    },
    formBtnCallBack (model, data) {
      this.$emit('formBtnCallBack', model, data)
    },
    showImageDialog (src) {
      this.srcId = src
      this.showBigImage = true
    },
    showBtn (item) {
      return item.type === 'button' && (this.hasPerm(item.param.perm) || this.$method.isEmpty(item.param.perm))
    }
  }
}
</script>
