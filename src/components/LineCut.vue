<template>
  <div>
    <el-form
      ref="lineCutForm"
      :model="ruleForm"
      :rules="lineRules"
      label-position="right"
      size="small"
    >
      <el-row :gutter="16">
        <table class="member-table">
          <thead>
            <!-- 表头名称 -->
            <tr>
              <td
                v-for="item in titles"
                :key="item.name"
              >
                <span :class="item.required ? 'required-code' : ''">{{ item.name }}</span>
              </td>
              <td>
                <div class="line-cur-operation">
                  <el-button
                    icon="fa fa-plus"
                    size="mini"
                    circle
                    @click="addLine"
                  />
                </div>
              </td>
            </tr>
          </thead>
          <tbody style="padding-top: 16px">
            <!-- 行 -->
            <tr
              v-for="(line, index) in lines"
              :key="line.index"
            >
              <!-- 列 -->
              <td
                v-for="item in columns"
                :key="item.model"
                :style="item.width ? 'width:' + item.width : ''"
              >
                <!-- input -->
                <el-form-item
                  v-if="item.type === 'input' && showColumn(item, index)"
                  :prop="item.model + line.index"
                >
                  <el-input
                    v-if="item.dataType !== 'number'"
                    v-model="line[item.model]"
                    :maxlength="item.maxLength || 64"
                    :placeholder="item.placeholder"
                  />
                  <el-input
                    v-else
                    v-model.number="line[item.model]"
                    :placeholder="item.placeholder"
                    type="number"
                  />
                </el-form-item>
                <!-- select -->
                <el-form-item
                  v-if="item.type === 'select' && showColumn(item, index)"
                  :prop="item.model + line.index"
                >
                  <el-select
                    v-if="item.dataType !== 'number'"
                    v-model="line[item.model]"
                    :placeholder="item.placeholder"
                    @change="selectChange(item.model, line)"
                  >
                    <el-option
                      v-for="option in item.data"
                      :key="option.value"
                      :label="option.name"
                      :value="option.value"
                    />
                  </el-select>
                  <el-select
                    v-else
                    v-model.number="line[item.model]"
                    :placeholder="item.placeholder"
                    @change="selectChange(item.model, line)"
                  >
                    <el-option
                      v-for="option in item.data"
                      :key="option.value"
                      :label="option.name"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>

                <!-- multiple select -->
                <el-form-item
                  v-if="item.type === 'multipleSelect' && showColumn(item, index)"
                  :prop="item.model + line.index"
                >
                  <el-select
                    v-model="line[item.model]"
                    :placeholder="item.placeholder"
                    multiple
                    @change="multipleSelectChange(item.model, line)"
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
                  :prop="item.model + line.index"
                >
                  <el-input
                    v-model="line[item.model]"
                    :placeholder="item.placeholder"
                    :readonly="true"
                    suffix-icon="el-icon-search"
                    style="cursor:pointer"
                    @click.native="openSelect(line, item.model)"
                  />
                </el-form-item>
                <!-- transfer -->
                <el-form-item
                  v-if="item.type === 'transfer'"
                  :prop="item.model + line.index"
                >
                  <div
                    v-if="showTag(line.index, item.model)"
                    style="width:90%"
                    class="line-cut-transfer-left xy-scrollbar"
                  >
                    <el-tag
                      v-for="(tag, tagIndex) in selectedItem[line.index][item.model]"
                      :key="tag[item.tagKey]"
                      :span="24"
                      :disable-transitions="false"
                      size="mini"
                      closable
                      @close="removeTag(index, line.index, item, tag, tagIndex)"
                    >
                      {{ tag[item.tagLabel] }}
                    </el-tag>
                  </div>
                  <template v-else>
                    <el-input
                      v-model="line[item.model]"
                      :readonly="true"
                      suffix-icon="el-icon-search"
                      @click.native="openSelect(line, item.model)"
                    />
                  </template>
                  <div
                    v-if="showTag(line.index, item.model)"
                    class="line-cut-transfer-right"
                    style="width:10%"
                    @click="openSelect(line, item.model)"
                  >
                    <i class="fa fa-search" />
                  </div>
                </el-form-item>
              </td>
              <!-- 删除 -->
              <td width="5%">
                <el-button
                  icon="fa fa-minus"
                  size="mini"
                  circle
                  @click="removeLine(line.index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'LineCut',
  // 表头字  动态注入的列
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          maxLength: 100
        }
      }
    },
    titles: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    rules: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      // 要校验的表单
      ruleForm: {},
      // 行校验规则
      lineRules: {},
      // 行数据
      lines: [],
      // 行唯一编号
      index: 0,
      // 打开弹窗的id
      openId: 0,
      // 打开的弹窗model
      openModel: '',
      // 弹出框选中对象记录
      selectedItem: {}
    }
  },
  computed: {
    noRules () {
      return this.$method.isEmpty(this.rules)
    },
    ruleAndLine () {
      if (this.noRules) return false
      return { lines: this.$method.deepCopy(this.lines) }
    }
  },
  watch: {
    columns: {
      immediate: true,
      deep: true,
      handler (val) {
        // 重新初始化第一列
        this.initData()
      }
    },
    ruleAndLine: {
      deep: true,
      handler (value) {
        if (!value) return
        this.lineRules = {}
        this.ruleForm = {}
        _.each(this.lines, line => {
          _.each(this.rules, (value, key) => {
            this.$set(this.lineRules, key + line.index, value)
            this.$set(this.ruleForm, key + line.index, line[key])
          })
        })
      }
    }
  },
  methods: {
    // 隐藏第一行的第一列
    showColumn (item, index) {
      if (item.hiddenFirst && index === 0) {
        // 删除旧的属性
        delete this.lines[index][item.model]
        return false
      }
      return true
    },
    // 初始化组件
    initData () {
      // 重新初始化第一列
      this.lines = []
      this.addLine()
    },
    // 添加一行
    addLine () {
      if (this.lines.length === this.options.maxLength) {
        this.$message.warning(this.$t('common.maxLimit') + this.options.maxLength + this.$t('common.strip'))
        return
      }
      this.lines.push(this.makeEmptyLine())
    },
    // 移除一行
    removeLine (index) {
      this.lines.splice(this.lines.findIndex(t => t.index === index), 1)
    },
    // 制作一空行
    makeEmptyLine () {
      let emptyLine = {
        index: this.index++
      }
      for (let item of this.columns) {
        let defaultValue = this.$method.isNotEmpty(item.default) ? item.default : ''
        emptyLine[item.model] = defaultValue
      }
      return emptyLine
    },
    // 设置数据
    setData (datas) {
      // 获取是否有transfer类型输入框
      let tagColumns = []
      for (let column of this.columns) {
        if (column.type === 'transfer') tagColumns.push(column)
      }

      this.lines = []
      this.lines = datas
      for (let i = 0; i < datas.length; i++) {
        let index = this.index
        if (tagColumns.length > 0) {
          this.setTag(index, datas[i], tagColumns)
        }

        this.$set(this.lines[i], 'index', this.index++)
      }
    },
    // 获取数据
    getData () {
      let validate = this.validate()
      let data = validate ? this.makeRetData() : {}
      return { validate: validate, data: data }
    },
    // 设置tag
    setTag (index, data, tagColumns) {
      for (let item of tagColumns) {
        if (this.$method.isNotEmpty(data[item.model])) {
          let rows = []
          let tagKeys = data[item.model].split(',')
          let tagLabels = data[item.model + 'Name'].split(',')
          for (let i = 0; i < tagKeys.length; i++) {
            let tagObj = {}
            tagObj[item.tagKey] = tagKeys[i]
            tagObj[item.tagLabel] = tagLabels[i]
            rows.push(tagObj)
          }
          if (this.$method.isEmpty(this.selectedItem[index])) this.$set(this.selectedItem, index, {})
          this.$set(this.selectedItem[index], item.model, rows)
        }
      }
    },
    // 校验
    validate () {
      let state = true
      if (!this.noRules) {
        this.$refs['lineCutForm'].validate((valid) => {
          state = valid
        })
      }
      return state
    },
    // 制作返回的数据结构
    makeRetData () {
      // 去除index属性
      let datas = this.$method.deepCopy(this.lines)
      _.each(datas, data => {
        delete data.index
      })
      return datas
    },
    // 设置重新渲染单列
    setColumn (data) {
      // 重新渲染列
      for (let i = 0; i < this.columns.length; i++) {
        let item = this.columns[i]
        if (data.model === item.model) {
          this.columns.splice(i, 1, data)
          break
        }
      }
      // 重新初始化第一列
      this.lines = []
      this.addLine()
    },
    // 弹出框打开
    openSelect (line, model) {
      this.openId = line.index
      this.openModel = model
      let oldItem = []
      if (this.$method.isNotEmpty(this.selectedItem[line.index]) &&
          this.$method.isNotEmpty(this.selectedItem[line.index][model])) {
        oldItem = this.selectedItem[line.index][model]
      }
      this.$emit('lineCallBack', model, oldItem, line)
    },
    // 弹出框值回写
    setOpenDialogValue (showText, rows) {
      let index = this.lines.findIndex(t => t.index === this.openId)
      this.$set(this.lines[index], this.openModel, showText)

      if (this.$method.isEmpty(this.selectedItem[this.openId])) this.$set(this.selectedItem, this.openId, {})
      this.$set(this.selectedItem[this.openId], this.openModel, rows)
    },
    // 下拉框变化
    selectChange (model, line) {
      this.$emit('selectChange', model, line)
    },
    // 保存下拉框变化
    setSelectChange (model, line, showText, rows = []) {
      let index = this.lines.findIndex(t => t.index === line.index)
      this.$set(this.lines[index], model, showText)

      if (this.$method.isEmpty(this.selectedItem[line.index])) this.$set(this.selectedItem, line.index, {})
      this.$set(this.selectedItem[line.index], model, rows)
    },
    // 多选下拉框变化
    multipleSelectChange (model, line) {
      this.$emit('multipleSelectChange', model, line)
    },
    // 保存多选下拉框变化
    setMultipleSelectChange (model, line, showText) {
      let index = this.lines.findIndex(t => t.index === line.index)
      this.$set(this.lines[index], model, showText)
    },
    // 判断tag隐藏显示
    showTag (index, model) {
      return this.$method.isNotEmpty(this.selectedItem[index]) && this.$method.isNotEmpty(this.selectedItem[index][model])
    },
    // 删除tag
    removeTag (lineIndex, index, item, tag, tagIndex) {
      // 删除隐藏值 删除tag
      let keyArr = this.lines[lineIndex][item.model].split(',')
      let keyIndex = keyArr.findIndex(cur => cur + '' === tag[item.tagKey] + '')
      if (keyIndex === -1) return
      keyArr.splice(keyIndex, 1)
      let hiddenText = keyArr.join(',')
      this.lines[lineIndex][item.model] = hiddenText
      this.selectedItem[index][item.model].splice(tagIndex, 1)
    }
  }
}
</script>
