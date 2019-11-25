<template>
  <div class="detail-page">
    <el-row :gutter="gutter">
      <el-col
        v-for="(item, index) in columns"
        :key="index"
        :span="colSpan(item)"
      >
        <!-- editor-->
        <el-form-item
          v-if="showEditorCol(item, data)"
          :label="item.label"
        >
          <div style="line-height: normal;">
            <editor
              :value="data[item.model]"
              :options="editorOptions"
              @ready="editorReady(data[item.model], arguments)"
            />
          </div>
        </el-form-item>

        <!-- title类型展示标题 -->
        <div v-if="item.type==='title'">
          <div class="xy-title">
            {{ item.label }}
          </div>
          <el-row class="margin-bottom10">
            <el-col>
              <div class="title-line" />
            </el-col>
          </el-row>
        </div>
        <!-- 循环横向表格 -->
        <div
          v-if="item.type==='repeatHorizontalTable'"
          class="margin-bottom10"
        >
          <div
            v-for="(table, indexKey) in data[item.arrModel]"
            :key="indexKey"
            class="margin-bottom10"
          >
            <el-row>
              <el-col
                v-for="item2 in item.columns"
                :key="item2.label"
                :span="horizontalTableSpan"
                :class="showTextCol(item2, table) ? '' : 'display-none'"
              >
                <el-form-item
                  :label="item2.label"
                >
                  <el-tooltip
                    :disabled="!textOverflow(table[item2.model])"
                    :content="table[item2.model] + ''"
                    class="item"
                    effect="dark"
                    placement="top-start"
                  >
                    <div class="detail-text">
                      {{ showTextValue(table[item2.model]) }}
                    </div>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 横向表格 -->
        <div
          v-if="showHorizontalTable(item, data)"
          class="margin-bottom10"
        >
          <el-row>
            <el-col
              v-for="item2 in item.columns"
              :key="item2.label"
              :span="horizontalTableSpan"
              :class="showTextCol(item2, data) ? '' : 'display-none'"
              class="margin-bottom10"
            >
              <el-form-item
                :label="item2.label"
              >
                <el-tooltip
                  :disabled="!textOverflow(data[item2.model])"
                  :content="data[item2.model] + ''"
                  class="item"
                  effect="dark"
                  placement="top-start"
                >
                  <div class="detail-text">
                    {{ showTextValue(data[item2.model]) }}
                  </div>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 纵向表格 -->
        <div
          v-if="item.type==='verticalTable'"
          class="margin-bottom10"
        >
          <el-table
            :data="data[item.list]"
            border
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column
              v-for="item2 in item.title"
              :key="item2.label"
              :label="item2.label"
              :prop="item2.model"
              show-overflow-tooltip
            >
              <!-- 加红色提示图标 -->
              <template slot-scope="scope">
                <span v-if="item2.param">
                  <span
                    v-for="it in item2.param"
                    :key="it.value"
                  >
                    <span
                      v-if="scope.row[it.key] === it.value"
                      :class="it.color ? it.color : ''"
                    >
                      <i :class="it.icon" />
                      {{ scope.row[item2.model] }}
                    </span>
                  </span>
                </span>
                <span v-if="!item2.param">
                  {{ scope.row[item2.model] }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- textarea-->
        <el-form-item
          v-if="showTextAreaCol(item, data)"
          :label="item.label"
        >
          <el-input
            v-model="data[item.model]"
            readonly
            type="textarea"
          />
        </el-form-item>

        <!-- 正常文字 -->
        <el-form-item
          v-if="showTextCol(item, data)"
          :label="item.label"
        >
          <span>
            <el-tooltip
              :disabled="!textOverflow(data[item.model])"
              :content="data[item.model] + ''"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div class="detail-text">
                {{ showTextValue(data[item.model]) }}
              </div>
            </el-tooltip>
          </span>
        </el-form-item>

        <!-- 带图标或颜色显示的字 -->
        <el-form-item
          v-if="showColorTextCol(item)"
          :label="item.label"
        >
          <span
            v-for="(item2, index) in item.param"
            v-if="data[item2.key] === item2.value"
            :key="index"
            :style="'font-weight: bolder;font-size:14px;color:' + item2.color"
          >
            <span v-if="!item2.icon">
              {{ showTextValue(data[item.model]) }}
            </span>
            <span v-if="item2.icon">
              <i :class="item2.icon ? 'fa margin-right5 '+ item2.icon : ''" />
              {{ showTextValue(data[item.model]) }}
            </span>
          </span>
        </el-form-item>
        <el-form-item
          v-if="showImageCol(item, data)"
          :label="item.label"
        >
          <img
            :src="data[data[item.model]]"
            class="detail-image"
          >
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import { isNotEmpty, isEmpty } from '@/utils'

export default {
  name: 'DetailPage',
  components: {
    Editor
  },
  props: {
    // 列
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 页面数据对象
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // 列间距
      gutter: 10,
      // 列宽
      span: 12,
      // 横向表格列宽
      horizontalTableSpan: 12,
      // 文本框配置
      editorOptions: {
        initialFrameWidth: null,
        initialFrameHeight: 300,
        readonly: true
      }
    }
  },
  watch: {
    data: {
      handler (val, oldVal) {
        if (val === oldVal) return
        let that = this
        let setImage = arr => {
          arr.forEach(v => {
            if (v['type'] === 'image') {
              this.getImageSrc(that.data[v.model])
            }
            if (v['columns'] instanceof Array) {
              setImage(v['columns'])
            }
          })
        }
        setImage(this.columns)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 设置显示值
    showTextValue (value) {
      if (isNotEmpty(value)) return value
      return '-'
    },
    // 显示隐藏 horizontalTable
    showHorizontalTable (item, data) {
      if (isNotEmpty(item.show)) {
        return data[item.show.model] === item.show.value && item.type === 'horizontalTable'
      }
      return item.type === 'horizontalTable'
    },
    // 计算列
    colSpan (item) {
      if (item.type === 'title' ||
          item.type === 'horizontalTable' ||
          item.type === 'verticalTable' ||
          item.type === 'textarea' ||
          item.type === 'image' ||
          item.type === 'editor' ||
          item.type === 'repeatHorizontalTable') return 24
      return 12
    },
    // 隐藏列
    showTextCol (item, data) {
      if (isNotEmpty(item.hide)) {
        return data[item.hide.model] !== item.hide.value && isEmpty(item.type)
      }
      return isEmpty(item.type)
    },
    // 显示隐藏textarea
    showTextAreaCol (item, data) {
      if (isNotEmpty(item.hide)) {
        return data[item.hide.model] !== item.hide.value && item.type === 'textarea'
      }
      return item.type === 'textarea'
    },
    // 显示隐藏带颜色的字
    showColorTextCol (item) {
      return item.type === 'colorText'
    },
    // 显示隐藏 图片
    showImageCol (item) {
      return item.type === 'image'
    },
    // 获取图片地址
    async getImageSrc (id) {
      // TODO
      let src = await this.$xyConfig.getImageById(id)
      this.$set(this.data, id, src)
    },
    // 判断文本超长
    textOverflow (text) {
      return isNotEmpty(text) && text.length > 10
    },
    // 计算纵向表格列
    verticalTableSpan (len) {
      return parseInt(24 / len)
    },
    // 显示隐藏富文本编辑器
    showEditorCol (item) {
      return item.type === 'editor'
    },
    // 富文本编辑器加载完成
    editorReady (param, instance) {
      instance[0].setContent(param)
    }
  }
}
</script>
