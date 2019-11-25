<template>
  <div class="xy-query">
    <!-- 单选 条件查询或导入查询 -->
    <div
      v-if="radioOptions.show"
      class="el-query-mode"
    >
      <el-radio
        v-for="item in radioOptions.data"
        :key="item.type"
        v-model="radioOptions.default"
        :label="item.type"
      >
        {{ item.name }}
      </el-radio>
    </div>
    <el-form
      ref="queryRuleForm"
      :rules="rules"
      :model="value"
      label-position="top"
      size="small"
      @submit.native.prevent
    >
      <div class="xy-query-box">
        <div class="xy-query-content">
          <el-row
            v-for="(row, index) in rowData"
            v-show="expand || index===0"
            :key="index"
            :gutter="16"
            type="flex"
            class="column-flex"
          >
            <!-- 显示更多查询 或展开 或当前index小于隐藏起始index 并且可显示时 展示当前列 -->
            <el-col
              v-for="item in row"
              v-show="item.show"
              :key="item.id"
              :span="item.type === 'doubleDate' || item.type === 'doubleDateTime' ? colSpan*2 : colSpan"
            >
              <!-- multipleSelect -->
              <el-form-item
                v-if="item.type === 'multipleSelect'"
                :label="item.name"
              >
                <el-select
                  v-model="value[item.id]"
                  :placeholder="item.placeholder"
                  collapse-tags
                  multiple
                >
                  <el-option
                    v-for="innerItem in item.data"
                    :key="innerItem.value"
                    :label="innerItem.name"
                    :value="innerItem.value"
                  />
                </el-select>
              </el-form-item>
              <!-- upload -->
              <el-form-item
                v-if="item.type === 'upload'"
                :label="item.name"
              >
                <el-row :gutter="20">
                  <el-col
                    :span="15"
                  >
                    <el-upload
                      :file-list="fileList"
                      :action="actionUrl"
                      :show-file-list="false"
                      :auto-upload="true"
                      :multiple="false"
                      :before-upload="beforeUpload"
                      :on-success="uploadSuccess"
                    >
                      <el-input
                        slot="trigger"
                        v-model="fileName"
                        :placeholder="t('common.chooseFile')"
                        suffix-icon="el-icon-document"
                      />
                    </el-upload>
                  </el-col>
                  <el-col
                    :span="9"
                  >
                    <el-button
                      type="text"
                      @click.native="downLoadTemplate"
                    >
                      <i class="margin-right5 fa fa-download" />
                      {{ t('common.queryModuleDownload') }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- input -->
              <el-form-item
                v-if="item.type === 'input'"
                :label="item.name"
              >
                <el-input
                  v-model="value[item.id]"
                  :placeholder="item.placeholder"
                  :maxlength="item.maxLength || 64"
                  clearable
                />
              </el-form-item>
              <!-- select -->
              <el-form-item
                v-if="item.type === 'select'"
                :label="item.name"
              >
                <el-select
                  v-model="value[item.id]"
                  :placeholder="item.placeholder"
                  :clearable="!item.unClearAble"
                  @change="selectChange(item, value[item.id])"
                >
                  <el-option
                    v-for="option in item.data"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
              <!-- search -->
              <el-form-item
                v-if="item.type === 'search'"
                :label="item.name"
              >
                <el-input
                  v-model="value[item.id]"
                  :readonly="true"
                  :placeholder="item.placeholder"
                  class="hand"
                >
                  <i slot="suffix">
                    <i
                      v-if="value[item.id]"
                      class="el-icon-error margin-right5"
                      @click="clearSelect(item.id)"
                    />
                    <i
                      class="el-icon-search margin-right5"
                      @click="openSelect(item.id)"
                    />
                  </i>
                </el-input>
              </el-form-item>
              <!-- formatDate -->
              <el-form-item
                v-if="item.type === 'formatDate'"
                :label="item.name"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :placeholder="item.placeholder"
                  :value-format="item.format"
                  size="mini"
                  @change="checkFormatTypeDate(item, value[item.id])"
                />
              </el-form-item>
              <!-- date -->
              <el-form-item
                v-if="item.type === 'date'"
                :label="item.name"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :placeholder="item.placeholder"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  @change="checkDate(item, value[item.id])"
                />
              </el-form-item>
              <!-- datetime -->
              <el-form-item
                v-if="item.type === 'datetime'"
                :label="item.name"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :placeholder="item.placeholder"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="checkDate(item, value[item.id])"
                />
              </el-form-item>
              <!-- doubleSplitDateTime -->
              <el-form-item
                v-if="item.type === 'doubleSplitDateTime'"
                :label="item.name"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :placeholder="item.placeholder"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="checkSplitDate(item, value[item.id])"
                />
              </el-form-item>
              <!-- double date -->
              <el-form-item
                v-if="item.type === 'doubleDate'"
                :label="item.name"
                :prop="item.id+''"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :range-separator="item.rangeSeparator"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  :picker-options="datePickerOptions"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  @change="checkRangeDate(item, value[item.id])"
                />
              </el-form-item>
              <!-- double datetime -->
              <el-form-item
                v-if="item.type === 'doubleDateTime'"
                :label="item.name"
                :prop="item.id+''"
              >
                <el-date-picker
                  v-model="value[item.id]"
                  :type="item.dateType"
                  :range-separator="item.rangeSeparator"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  :picker-options="datePickerOptions"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="checkRangeDate(item, value[item.id])"
                />
              </el-form-item>
            </el-col>
            <!--查询 最右侧-->
            <el-col
              v-if="!hiddenQueryBtn && rightShowDeploy(index)"
              style="width:220px"
            >
              <el-form-item>
                <el-row>
                  <el-col :span="4">
                    <el-button
                      v-show="showMore"
                      :icon="expand ? 'fa-angle-double-up' : 'fa-angle-double-down'"
                      type="text"
                      class="fa "
                      @click="expand = !expand"
                    />
                  </el-col>
                  <el-col :span="20">
                    <el-button
                      type="primary"
                      @click="query()"
                    >
                      {{ t('common.query') }}
                    </el-button>
                    <el-button
                      @click="reset()"
                    >
                      {{ t('common.reset') }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <!--查询 跟随列-->
            <el-col
              v-if="!hiddenQueryBtn && bottomShowDeploy(index)"
              style="width:220px"
            >
              <el-form-item>
                <div class="column-query">
                  <el-button
                    v-show="showMore"
                    :icon="expand ? 'fa-angle-double-up' : 'fa-angle-double-down'"
                    type="text"
                    class="fa "
                    @click="expand = !expand"
                  />
                  <el-button
                    type="primary"
                    @click="query()"
                  >
                    {{ t('common.query') }}
                  </el-button>
                  <el-button
                    @click="reset()"
                  >
                    {{ t('common.reset') }}
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="query-line" />
  </div>
</template>

<script>
import Locale from '@/mixins/locale'
import dayjs from 'dayjs'
import { isNotEmpty, isEmpty, validateFrom } from '@/utils'

export default {
  name: 'Query',
  mixins: [Locale],
  props: {
    // 单选配置和其他配置
    options: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 页面dom
    queryDom: {
      type: Array,
      default: function () {
        return []
      }
    },
    // dom 默认值
    queryDefault: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 隐藏的默认查询条件
    hiddenQueryDefault: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // 记录弹出框的唯一标识
      openId: 0,
      // 查询组件dom
      domData: [],
      // 按行划分dom
      rowData: [],
      // 记录 默认/重置 查询条件
      default: {},
      // 查询条件值
      value: {},
      // 单选或多选对象记录
      valueObj: {},
      // false: 收起更多查询, true: 展开更多查询
      expand: false,
      // false: 显示查询重置按钮, true: 隐藏查询重置按钮
      hiddenQueryBtn: false,
      // 切换按钮 记录condition的查询条件和展开收起
      conditionRecord: {},
      // 切换按钮 记录import的查询条件和展开收起
      importRecord: {},
      // 单选配置
      radioOptions: {},
      defaultRadioOptions: {
        data: [
          { type: 'condition', name: this.t('common.conditionQuery') },
          { type: 'import', name: this.t('common.importQuery') }
        ],
        // 单选默认查询条件 condition/import
        default: 'condition',
        // 显示隐藏单选按钮
        show: false
      },
      // 默认跨列为4列
      colNum: 4,

      // 导入文件列表
      fileList: [],
      // 导入文件名字
      fileName: '',
      // file的md5键
      fileMd5Key: 'fileMd5',
      // 上传成功的文件的md5值
      fileMd5: '',
      // 上传地址
      actionUrl: this.options.uploadImportSearchFile || this.$xyConfig.uploadImportSearchFile || '',
      // 日期时间区间设置 带快捷键
      datePickerOptions: {
        shortcuts: [{
          text: this.t('common.lastDay'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.t('common.lastThreeDay'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.t('common.lastWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    colSpan () {
      return parseInt((this.expand ? 24 : 20) / this.colNum)
    },
    // 显示的dom元素
    queryOptions () {
      let conditionArr = this.radioOptions.condition === undefined ? [] : this.radioOptions.condition
      let importArr = this.radioOptions.import === undefined ? [] : this.radioOptions.import
      if (this.radioOptions.default === 'import') return importArr
      return conditionArr
    },
    // 是否显示 展开收起
    showMore () {
      return this.rowData.length > 1
    }
  },
  watch: {
    // 监视options,设置radio
    options: {
      immediate: true,
      deep: true,
      handler (val) {
        this.expand = !!val.deploy || !!val.expand
        this.hiddenQueryBtn = !!val.hiddenQueryBtn
        if (typeof val.colNum === 'number') this.colNum = val.colNum
        this.radioOptions = Object.assign({}, this.defaultRadioOptions, val.radio)
      }
    },
    // 切换单选按钮时,记录新的值，赋值旧的值
    'radioOptions.default': function () {
      this.setDomShow()
    },
    // 监视查询列变化
    queryDom: {
      immediate: true,
      deep: true,
      handler (val) {
        this.initData()
      }
    }
  },
  methods: {
    // 设置日期区间快捷键
    setDateRangeShortCut () {
      this.datePickerOptions.shortcuts[0].text = this.t('common.lastDay')
      this.datePickerOptions.shortcuts[1].text = this.t('common.lastThreeDay')
      this.datePickerOptions.shortcuts[2].text = this.t('common.lastWeek')
    },
    rightShowDeploy (index) {
      return index === 0 && !this.expand
    },
    bottomShowDeploy (index) {
      return this.rowData.length === index + 1 && this.expand
    },
    // 月份 或其他类型时间校验过滤
    checkFormatTypeDate (item, val) {
      // 过滤 设置了当月不可选 月份类型
      let current = dayjs(new Date()).format('YYYY-MM')
      if (item.dateType === 'month' && item.rules && item.rules.unSelectCurrentMonth) {
        if (dayjs(val).isSame(current)) {
          this.$message.error(this.t('common.pleaseSelectLessCurrentMonth'))
          this.$set(this.value, item.id, '')
        }
      }

      if (dayjs(val).isAfter(current)) {
        this.$message.error(this.t('common.selectTimeThanCurrentTimeTip'))
        this.$set(this.value, item.id, '')
      } else {
        // 时间改变时 触发回调事件
        this.$emit('setFormatTypeDate', item.id, val)
      }
    },
    // 时间校验
    checkDate (item, val) {
      // 过滤 设置了当天不可选 日期类型
      if (item.dateType === 'date' && item.rules && item.rules.unSelectToday) {
        let current = dayjs(new Date()).format('YYYY-MM-DD')
        if (dayjs(val).isSame(current)) {
          this.$message.error(this.t('common.pleaseSelectLessCurrentDay'))
          this.$set(this.value, item.id, '')
        }
      }

      if (dayjs(val).isAfter(dayjs(new Date()))) {
        this.$message.error(this.t('common.selectTimeThanCurrentTimeTip'))
        this.$set(this.value, item.id, '')
      } else {
        // 时间改变时 触发回调事件
        this.$emit('setDate', item.id, val)
      }
    },
    checkSplitDate (item, val) {
      if (isEmpty(val) || item.type !== 'doubleSplitDateTime') return
      let beginTime = ''
      let endTime = ''
      if (item.model === 'endTime') {
        endTime = val
        beginTime = this.value[item.id - 1]
      } else {
        endTime = this.value[item.id + 1]
        beginTime = val
      }

      if (isNotEmpty(beginTime) && isNotEmpty(endTime)) {
        if (dayjs(beginTime).isAfter(dayjs(endTime))) {
          this.$message.error(this.t('common.startTime') + this.t('common.lessThan') + this.t('common.endTime'))
          this.$set(this.value, item.id, '')
          return
        }

        if (isNotEmpty(item.dayRange) && isNotEmpty(val)) {
          let day = dayjs(endTime).diff(dayjs(beginTime), 'day')
          if (day > item.dayRange) {
            this.$message.error(this.t('common.startDateRange') + item.dayRange + this.t('common.endDateRange'))
            this.$set(this.value, item.id, '')
          }
        }
      }
    },
    // 时间段校验
    checkRangeDate (item, val) {
      if (isEmpty(val)) return
      if (val.length === 2 && dayjs(val[1]).isAfter(dayjs(new Date()))) {
        this.$message.error(this.t('common.endTimeThanCurrentTimeTip'))
        this.$set(this.value, item.id, '')
        return
      }

      if (isNotEmpty(item.dayRange) && isNotEmpty(val)) {
        let startTime = val[0]
        let endTime = val[1]
        let day = dayjs(endTime).diff(dayjs(startTime), 'day')
        if (day > item.dayRange) {
          this.$message.error(this.t('common.startDateRange') + item.dayRange + this.t('common.endDateRange'))
          this.$set(this.value, item.id, '')
        }
      }
    },
    // 初始化查询组件,渲染dom,设置默认值
    initData () {
      // 设置要显示的dom元素
      this.setDomShow()
      // 设置默认值
      this.addDefault(this.queryDefault)
    },
    // 设置要显示的dom元素
    setDomShow () {
      let allShow = false
      if (this.queryOptions.length === 0) allShow = true
      this.domData = this.queryDom.map(row => {
        row.show = true
        if (!allShow) {
          row.show = this.queryOptions.findIndex(item => item === row.id) !== -1
        }
        return row
      })
      // 设置行
      this.setRowData()
    },
    // 设置行
    setRowData () {
      this.rowData = []
      let row = []
      let colSpan = 0
      for (let item of this.domData) {
        if (!item.show) continue
        let col = (item.type === 'doubleDate' || item.type === 'doubleDateTime') ? 2 : 1
        if (colSpan + col > this.colNum) {
          this.rowData.push(row)
          colSpan = 0
          row = []
        }
        colSpan = colSpan + col
        row.push(item)
      }
      if (row.length > 0) this.rowData.push(row)
    },
    // 重新渲染一个dom组件
    setDomData (dom) {
      for (let i = 0; i < this.domData.length; i++) {
        let cur = this.domData[i]
        if (dom.id === cur.id) {
          Object.assign(this.domData[i], dom)
          break
        }
      }
    },
    // 添加默认值属性
    addDefault (params) {
      for (const key in params) {
        // 添加默认属性
        this.$set(this.default, key, params[key])
        // 添加初始显示dom值
        this.$set(this.value, key, params[key])
        if (this.radioOptions.show) {
          // 记录condition值
          this.$set(this.conditionRecord, key, params[key])
          // 记录import值
          this.$set(this.importRecord, key, params[key])
        }
      }
    },
    // 添加显示值属性
    addValue (params) {
      for (const key in params) {
        this.$set(this.value, key, params[key])
      }
    },
    // 打开弹出框
    openSelect (id) {
      this.openId = id
      this.$emit('queryCallBack', id, this.valueObj[id])
    },
    // 弹出框值回写
    setOpenDialogValue (rows) {
      let openIndex = this.domData.findIndex(item => item.id === this.openId)
      let showProperty = this.domData[openIndex].showModel || 'name'
      // 会写的值为空
      if (isEmpty(rows)) {
        this.$set(this.value, this.openId, '')
        this.$set(this.valueObj, this.openId, {})
        return
      }
      // 回写的值不为空
      if (rows instanceof Array) {
        let name = []
        for (let item of rows.values()) {
          name.push(item[showProperty])
        }
        this.$set(this.value, this.openId, name.join())
        this.$set(this.valueObj, this.openId, rows)
      } else if (rows instanceof Object) {
        this.$set(this.value, this.openId, rows[showProperty])
        this.$set(this.valueObj, this.openId, rows)
      }
    },
    // 清空弹框的值
    clearSelect (id) {
      this.$set(this.value, id, '')
      if (this.valueObj[id] instanceof Array) {
        this.$set(this.valueObj, id, [])
      } else {
        this.$set(this.valueObj, id, {})
      }
    },

    // 检查上传文件类型及大小 .xls或.xlsx  小于2M
    typeOrSizeError (file) {
      let suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase()
      let suffixErr = suffix === 'XLS' || suffix === 'XLSX'
      return !suffixErr || file.size > 5120 * 1024
    },
    // 上传前校验
    beforeUpload (file, fileList) {
      if (this.typeOrSizeError(file)) {
        let mess = this.t('common.uploadQueryFileTip')
        this.$message({
          message: mess,
          type: 'warning'
        })
        return false
      }
      this.fileName = file.name
      this.fileList = []
      this.fileList.push(file)
    },
    // 上传成功
    uploadSuccess (resp, file, fileList) {
      this.fileMd5 = resp.data
    },

    // 查询
    query () {
      // 校验表单
      if (!validateFrom(this.$refs['queryRuleForm'])) return

      // 点击查询收起页面 隐藏
      // if (this.showMore) this.expand = false
      let conditions = {
        start: 0,
        conditions: [] }
      if (this.radioOptions.default === 'condition') {
        for (const key in this.hiddenQueryDefault) {
          conditions.conditions.push({ name: key, value: this.hiddenQueryDefault[key] })
        }
        for (let item of this.domData) {
          let value = this.value[item.id]
          if (isNotEmpty(value) || typeof value === 'number' || typeof value === 'boolean') {
            // 特殊处理年类型的日期
            if (item.dateType === 'year') value = value.substr(0, 4)
            // 特殊处理search类型显示name查询时使用id或其他
            if (item.type === 'search' && isNotEmpty(item.queryModel)) {
              let obj = this.valueObj[item.id]
              if (Array.isArray(obj)) {
                // 多选的数据
                value = []
                for (let v of obj) {
                  value.push(v[item.queryModel])
                }
              } else if (typeof (obj) === 'object') {
                // 单选的数据
                value = obj[item.queryModel]
              }
            }
            // 特殊处理doubleDateTime类型 变为beginTime和endTime
            if (item.type === 'doubleDateTime' && value.length === 2) {
              conditions.conditions.push({ name: 'beginTime', value: value[0] })
              conditions.conditions.push({ name: 'endTime', value: value[1] })
              continue
            }
            // 特殊处理doubleDate类型 变为startDate和endDate
            if (item.type === 'doubleDate' && value.length === 2) {
              conditions.conditions.push({ name: 'startDate', value: value[0] })
              conditions.conditions.push({ name: 'endDate', value: value[1] })
              continue
            }

            if (Array.isArray(value)) {
              value = value.join()
            }
            conditions.conditions.push({ name: item.model, value: value })
          }
        }
      } else if (this.radioOptions.default === 'import') {
        conditions.conditions.push({ name: this.fileMd5Key, value: this.fileMd5 })
      }
      this.$emit('query', conditions)
    },
    selectChange (item, value) {
      this.$emit('selectChange', item.model, value)
    },
    // 重置
    reset () {
      for (let key in this.value) {
        if (Array.isArray(this.value[key])) {
          this.value[key] = []
        } else {
          this.value[key] = ''
        }
      }
      this.valueObj = {}
      this.addValue(this.default)
      // 如果是导入查询模式 清空已设置的值
      if (this.radioOptions.default === 'import') {
        this.fileName = ''
        this.fileMd5 = ''
      }
      this.$emit('reset')
      // 设置重置时不查询
      if (this.options.unQuery) return
      this.query()
    },
    // 下载查询模板
    downLoadTemplate () {
      if (isEmpty(this.options.importTemplateUrl)) {
        this.$message.error(this.t('common.pleaseSetSearchTemplateUrl'))
      }
      this.$xyConfig.downLoadFile(this.options.importTemplatePath)
    },
    // 清空值
    cleanValue () {
      this.value = {}
      this.valueObj = {}
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/components/query.scss";
</style>
