<template>
  <div>
    <dialog-head
      v-model="visible"
      :options="dialogOptions"
      @close="close"
    >
      <div slot="content">
        <el-tabs
          v-model="activeTab"
          type="border-card"
        >
          <el-tab-pane :label="t('components.singleExecution')">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              :show-message="true"
              :label-position="labelPosition"
              :size="size"
              :label-width="labelWidth"
            >
              <el-row :gutter="gutter">
                <el-col :span="span">
                  <el-form-item
                    :label="t('components.startDate')"
                    prop="startDate"
                  >
                    <el-date-picker
                      v-model="ruleForm.startDate"
                      :placeholder="t('components.chooseTheStartDate')"
                      type="date"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="gutter">
                <el-col :span="span">
                  <el-form-item
                    :label="t('components.endDate')"
                    prop="endDate"
                  >
                    <el-date-picker
                      v-model="ruleForm.endDate"
                      :placeholder="t('components.chooseTheEndDate')"
                      type="date"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="gutter">
                <el-col :span="span">
                  <el-form-item
                    :label="t('components.enableStartTime')"
                    prop="startTime"
                  >
                    <el-time-picker
                      v-model="ruleForm.startTime"
                      :disabled="disableTime"
                      :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                      }"
                      value-format="HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="gutter">
                <el-col :span="span">
                  <el-form-item
                    :label="t('components.enableEndTime')"
                    prop="endTime"
                  >
                    <el-time-picker
                      v-model="ruleForm.endTime"
                      :disabled="disableTime"
                      :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                      }"
                      value-format="HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="span">
                  <el-form-item
                    label=" "
                    prop="allHours"
                  >
                    <el-checkbox
                      v-model="ruleForm.allHours"
                      class="margin-right5"
                    />{{ t('components.24HoursADay') }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="t('components.loopExecution')">
            <el-form
              ref="ruleForm2"
              :model="ruleForm2"
              :rules="rules2"
              :show-message="true"
              :label-position="labelPosition"
              :size="size"
              :label-width="labelWidth"
            >
              <div class="interval">
                <el-row :gutter="gutter">
                  <el-col :span="span">
                    <el-form-item
                      :label="t('components.cycleType')"
                      prop="periodType"
                    >
                      <el-select v-model="ruleForm2.periodType">
                        <el-option
                          v-for="item in periodType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row
                  v-show="ruleForm2.periodType === 1"
                  :gutter="gutter"
                >
                  <el-col :span="span">
                    <el-form-item
                      :label="t('components.openingWeek')"
                      prop="week"
                    >
                      <el-checkbox-group
                        v-model="ruleForm2.week"
                        size="mini"
                      >
                        <el-checkbox-button
                          v-for="item in weeks"
                          :key="item.value"
                          :label="item.value"
                        >
                          {{ item.label }}
                        </el-checkbox-button>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="gutter">
                  <el-col :span="span">
                    <el-form-item
                      :label="t('components.enableStartTime')"
                      prop="startTime"
                    >
                      <el-time-picker
                        v-model="ruleForm2.startTime"
                        :disabled="disableTime2"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                        value-format="HH:mm:ss"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="gutter">
                  <el-col :span="span">
                    <el-form-item
                      :label="t('components.enableEndTime')"
                      prop="endTime"
                    >
                      <el-time-picker
                        v-model="ruleForm2.endTime"
                        :disabled="disableTime2"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                        value-format="HH:mm:ss"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <el-form-item
                      label=" "
                      prop="allHours"
                    >
                      <el-checkbox
                        v-model="ruleForm2.allHours"
                        class="margin-right5"
                      />{{ t('components.24HoursADay') }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-row>
          <el-col
            :span="24"
            class="text-align-center"
          >
            <el-button
              type="primary"
              size="mini"
              @click="save"
            >
              {{ t('common.confirm') }}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </dialog-head>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import DialogHead from '@/components/DialogHead'
import Locale from '@/mixins/locale'
import { isEmpty, validateFrom } from '@/utils'

export default {
  name: 'Interval',
  components: {
    DialogHead
  },
  mixins: [Locale],
  // 弹窗 隐藏/显示
  model: {
    prop: 'show',
    event: 'changeVal'
  },
  props: {
    // 组件显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 旧数据格式
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // 弹窗配置项
      dialogOptions: {
        title: this.t('components.setupTime'),
        width: 'mini'
      },
      // 选中的tab
      activeTab: '',
      // 表单
      ruleForm: {
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        allHours: false
      },
      // 表单校验规则
      rules: {
        startDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        endDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        startTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        endTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
      },
      labelPosition: 'left',
      labelWidth: '110px',
      size: 'mini',
      gutter: 20,
      span: 24,
      halfSpan: 12,

      // 循环执行
      // 周期类型
      periodType: [{ value: 1, label: this.t('components.weeklyCycle') }, { value: 2, label: this.t('components.dailyCirculation') }],
      // 启用星期
      weeks: [{ value: 1, label: this.t('components.one') },
        { value: 2, label: this.t('components.two') },
        { value: 3, label: this.t('components.three') },
        { value: 4, label: this.t('components.four') },
        { value: 5, label: this.t('components.five') },
        { value: 6, label: this.t('components.six') },
        { value: 7, label: this.t('components.seven') }],
      // 表单
      ruleForm2: {
        periodType: 1,
        week: [],
        startTime: '',
        endTime: '',
        allHours: false
      },
      // 表单校验规则
      rules2: {
        periodType: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        week: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        startTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
        endTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 弹窗隐藏显示
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    },
    disableTime () {
      return this.ruleForm.allHours
    },
    disableTime2 () {
      return this.ruleForm2.allHours
    },
    formName () {
      return this.activeTab === '0' ? 'ruleForm' : 'ruleForm2'
    },
    unWeek () {
      return (this.activeTab === '1' && this.ruleForm2.periodType === 2) || this.activeTab === '0'
    }
  },
  watch: {
    visible: {
      handler: function (v) {
        if (v) {
          // 如果存在旧的选中的值 设置选中
          if (isEmpty(this.data)) {
            this.$nextTick(function () {
              this.$refs.ruleForm.resetFields()
              this.$refs.ruleForm2.resetFields()
            })
            return
          }
          this.activeTab = this.data.tabId
          this[this.formName] = Object.assign({}, this[this.formName], this.data.data)
        }
      }
    },
    'ruleForm.allHours': {
      handler: function (v) {
        if (v) {
          this.ruleForm.startTime = ''
          this.ruleForm.endTime = ''
          this.rules = {
            startDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            endDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
          }
        } else {
          this.rules = {
            startDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            endDate: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            startTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            endTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
          }
        }
        this.$nextTick(function () {
          this.$refs.ruleForm.clearValidate()
        })
      }
    },
    'ruleForm2.allHours': {
      handler: function (v) {
        if (v) {
          this.ruleForm2.startTime = ''
          this.ruleForm2.endTime = ''
          this.rules2 = {
            periodType: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
          }
        } else {
          this.rules2 = {
            periodType: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            startTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }],
            endTime: [{ required: true, message: this.t('common.required'), trigger: 'blur' }]
          }
        }
        if (!this.unWeek) {
          this.$set(this.rules2, 'week', [{ required: true, message: this.t('common.required'), trigger: 'blur' }])
        }
        this.$nextTick(function () {
          this.$refs.ruleForm2.clearValidate()
        })
      }
    },
    'ruleForm2.periodType': {
      handler: function (v) {
        if (this.unWeek) {
          if (this.rules2.week) {
            delete this.rules2.week
          }
        } else {
          if (!this.rules2.week) {
            this.$set(this.rules2, 'week', [{ required: true, message: this.t('common.required'), trigger: 'blur' }])
          }
        }
        this.$nextTick(function () {
          this.$refs.ruleForm2.clearValidate()
        })
      }
    }
  },
  methods: {
    save () {
      // 校验表单
      if (!validateFrom(this.$refs[this.formName])) return
      if (!this.validateForm()) return
      // 设置返回数据结构, tabId为单次执行或循环执行 '0'/'1', data为表单数据
      let data = { tabId: this.activeTab, data: this[this.formName], tip: this.t('common.alreadySet') }
      if (this.activeTab === '0') {
        data.data.type = 1
      } else {
        data.data.type = data.data.periodType + 1
      }
      this.$emit('save', data)
      this.visible = false
    },
    close () {
      this.visible = false
      this.$emit('close')
    },
    // 校验时间 开始不能大于结束
    validateForm () {
      let success = true
      if (this.formName === 'ruleForm') {
        if (dayjs(this.ruleForm.startDate).isAfter(dayjs(this.ruleForm.endDate))) {
          this.$message.error(this.t('components.startDateLessEndDateTip'))
          success = false
        }
      }
      if (!this[this.formName].allHours && success) {
        if (dayjs('2018-1-1' + this[this.formName].startTime).isAfter(dayjs('2018-1-1' + this[this.formName].endTime))) {
          this.$message.error(this.t('components.startTimeLessEndTimeTip'))
          success = false
        }
      }
      return success
    }
  }
}
</script>
