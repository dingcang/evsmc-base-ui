<template>
  <div class="xy-dialog-container xy-scrollbar">
    <div
      :class="queryOptions.hidden ? 'display-none' : ''"
      class="xy-dialog-query"
    >
      <el-row
        :gutter="10"
        class="margin-bottom10"
      >
        <el-form
          size="mini"
          label-position="right"
          label-width="100px"
        >
          <el-col
            v-for="item in queryOptions.columns"
            :key="item.id"
            :span="item.span || 9"
          >
            <!-- input -->
            <el-form-item
              v-if="item.type === 'input'"
              :label="item.name"
              :label-width="item.labelWidth"
            >
              <el-input
                v-model="queryValue[item.id]"
                :placeholder="item.placeholder"
              />
            </el-form-item>
            <!-- select -->
            <el-form-item
              v-if="item.type === 'select'"
              :label="item.name"
            >
              <el-select
                v-model="queryValue[item.id]"
                :placeholder="item.placeholder"
              >
                <el-option
                  v-for="option in item.data"
                  :key="option.value"
                  :label="option.name"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
            <!-- date -->
            <el-form-item
              v-if="item.type === 'date'"
              :label="item.name"
            >
              <el-date-picker
                v-model="queryValue[item.id]"
                :type="item.dateType"
                :placeholder="item.placeholder"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <!-- datetime -->
            <el-form-item
              v-if="item.type === 'datetime'"
              :label="item.name"
            >
              <el-date-picker
                v-model="queryValue[item.id]"
                :type="item.dateType"
                :placeholder="item.placeholder"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col
            v-if="showQuery"
            :span="6"
          >
            <el-button
              type="primary"
              size="mini"
              @click="query"
            >
              {{ t('common.query') }}
            </el-button>
            <el-button
              size="mini"
              @click="reset"
            >
              {{ t('common.reset') }}
            </el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <grid
      ref="chooseGrid"
      v-model="selections"
      :grid-options="gridOptions"
      :grid-column="tableColumn"
      :grid-data="gridData"
      @setPageParam="query"
    />
  </div>
</template>

<script>
import Locale from '@/mixins/locale'
import _ from 'underscore'
import Grid from '@/components/Grid'
import { isNotEmpty } from '@/utils'

export default {
  name: 'ChooseTableRow',
  components: {
    Grid
  },
  mixins: [Locale],
  // 双向绑定单选和多选结果
  model: {
    prop: 'selects',
    event: 'changeVal'
  },
  props: {
    // 查询配置
    queryOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 查询默认选中的值
    queryDefault: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表格配置
    gridOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表格列
    tableColumn: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表格数据
    gridData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 单选或多选状态
    selects: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 隐藏的默认查询条件
    hiddenQueryDefault: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isResetQuery: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 查询绑定的值
      queryValue: {}
    }
  },
  computed: {
    // 表格单选或多选双向绑定
    selections: {
      get: function () { return this.selects },
      set: function (v) { this.$emit('changeVal', v) }
    },
    showQuery () {
      return !this.queryOptions.hiddenQueryBtn && isNotEmpty(this.queryOptions) && this.queryOptions.columns.length > 0
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      // 设置默认值
      this.addDefault(this.queryDefault)
    },
    // 添加默认值属性
    addDefault (params) {
      _.each(params, (value, key) => {
        // 添加默认属性
        this.$set(this.queryValue, key, value)
      })
    },
    // 查询方法回调
    query (params) {
      let conditions = { conditions: [] }
      _.each(this.hiddenQueryDefault, (value, key) => {
        conditions.conditions.push({ name: key, value: value })
      })
      // 分页
      if (isNotEmpty(params)) {
        Object.assign(conditions, params)
      }
      _.each(this.queryOptions.columns, item => {
        let value = this.queryValue[item.id]
        if (isNotEmpty(value) || typeof value === 'number' || typeof value === 'boolean') {
          // 特殊处理年类型的日期
          if (item.dateType === 'year') value = value.substr(0, 4)
          conditions.conditions.push({ name: item.model, value: value })
        }
      })
      this.$emit('query', conditions)
    },
    // 清空
    reset () {
      this.queryValue = {}
      this.initData()
      if (this.isResetQuery) this.query()
    },
    // 根据index选中单选
    radioCheck (index) {
      this.$refs.chooseGrid.radioCheck(index)
    },
    // 根据datas选中多选
    selectionCheck (datas, gridData) {
      this.$refs.chooseGrid.selectionCheck(datas, gridData)
    }
  }
}
</script>
