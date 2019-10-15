<template>
  <!-- 弹窗标题 显示/隐藏 宽度 关闭按钮 -->
  <el-dialog
    :title="options.title"
    :visible.sync="visible"
    :width="dialogWidth"
    :top="options.center ? '15vh' : '86px'"
    append-to-body
    @close="close"
  >
    <div>
      <div
        :style="'width:' + dialogInnerWidth"
        class="xy-dialog-container xy-scrollbar"
      >
        <!-- 表头文字详情部分 -->
        <el-row
          v-if="showHeadText"
          class="margin-bottom20"
        >
          <el-col
            v-for="item in options.headText"
            :key="item.label"
            :span="options.headTextSpan || 8"
          >
            <b>{{ item.label }}: </b> {{ parentItem[item.model] }}
          </el-col>
        </el-row>
        <!-- 已选区域 -->
        <el-row
          v-if="showSelected"
          class="bottom-line"
        >
          <el-col :span="4">
            <b>{{ $t('common.alreadySelect') }} {{ selectedTagsLength }} {{ $t('common.alreadySelectEnd') }}</b>
          </el-col>
          <el-col
            :span="8"
            style="min-height: 0px;"
          >
            <el-input
              v-model="tagFilter"
              :placeholder="$t('common.filterText')"
              prefix-icon="el-icon-search"
              size="mini"
            />
          </el-col>
          <el-col
            :span="12"
            class="text-align-right"
          >
            <el-button
              size="mini"
              type="text"
              @click="removeTag()"
            >
              {{ $t('common.clean') }}
            </el-button>
          </el-col>
        </el-row>
        <el-row
          v-if="showSelected"
          class="margin-bottom20"
        >
          <el-col :span="24">
            <div class="xy-dialog-selected xy-scrollbar">
              <el-tag
                v-for="(tag, index) in showSelectedTags"
                :key="index"
                :span="24"
                closable
                @close="removeTag(tag)"
              >
                {{ tag[options.tagLabel] }}
              </el-tag>
            </div>
          </el-col>
        </el-row>
        <!-- 查询和表格 标题 -->
        <el-row
          v-if="showHeadText || showSelected"
          class="bottom-line"
        >
          <el-col :span="24">
            <b>{{ $t('common.unChoose') }}</b>
          </el-col>
        </el-row>
        <!-- 查询区域 -->
        <el-row v-if="showQuery">
          <div>
            <query
              ref="query"
              :options="queryOptions"
              :query-dom="options.queryColumn"
              @query="query"
              @reset="reset"
            />
          </div>
        </el-row>
        <!-- 表格区域 -->
        <el-row>
          <div>
            <grid
              ref="dialogGrid"
              v-model="selections"
              :grid-options="gridOptions"
              :grid-column="options.gridColumn"
              :grid-data="gridData"
              @selectedChange="selectedChange"
              @rowClick="rowClick"
              @selectedAllChange="selectedAllChange"
              @setPageParam="query"
            />
          </div>
        </el-row>
      </div>
    </div>
    <!-- 弹窗页脚 -->
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        v-for="item in options.footerButtons"
        :key="item.type"
        :type="item.buttonType"
        size="mini"
        @click="transferCallBack(item.type)"
      >{{ item.name }}</el-button>
      <template v-if="showDefaultButton">
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >{{ $t('common.confirm') }}</el-button>
        <el-button
          size="mini"
          @click="close"
        >{{ $t('common.cancel') }}</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import Query from '@/components/Query'
import Grid from '@/components/Grid'

export default {
  name: 'TransferPageTable',
  components: {
    Query,
    Grid
  },
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
    // 查询配置
    queryOptions: {
      type: Object,
      default: function () {
        return {
          colNum: 2
        }
      }
    },
    // 组件配置
    options: {
      type: Object,
      default: function () {
        return {
          // 居中弹窗
          center: false,
          // 标题
          title: '',
          // 表格大小 mini/small/normal/big
          width: '',

          // 表头描述 (span不写默认是8)
          headTextSpan: 8,
          headText: [],

          // 选择显示的tag的key和value
          tagKey: 'id',
          tagLabel: 'username',

          // 表格接口及查询方法名
          tableApi: {},
          tableQueryMethod: 'query',
          // 查询时带在url中的参数
          urlParams: {},
          // 隐藏的查询条件
          hiddenQueryParams: {},
          // 查询列
          queryColumn: [],
          // 表格列
          gridColumn: [],
          // 最多可选长度
          limitSelected: 0,

          // 组件的页脚按钮
          footerButtons: []
        }
      }
    },
    // 表头描述的对象
    parentItem: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 选中的数据 无论单条或多条都用数组
    selected: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表格单选或多选 默认多选
    radioOrSelection: {
      type: String,
      default: 'selection'
    }
  },
  data () {
    return {
      // region dialog
      // 弹窗位置
      defaultTop: '86px',
      // 弹窗大小
      dialogWidth: '',
      // 弹窗内部大小
      dialogInnerWidth: '',
      // endregion
      // region tag
      // 真实选中的tag
      realSelectedTags: [],
      // 过滤后显示的tag
      showSelectedTags: [],
      // 过滤字段
      tagFilter: '',
      // endregion

      // region query grid
      // 默认查询条件
      queryParams: {
        conditions: [],
        sort: [],
        start: 0,
        limit: 10
      },
      // 表格选中的值 单选用
      selections: [],
      // 表格
      gridOptions: {
        // 多选
        // checkboxSelection: true
        // 单选
        radioSelection: true,
        radioValue: -1
      },
      // 表格数据
      gridData: []
      // endregion
    }
  },
  computed: {
    // 弹窗隐藏显示
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    },
    // 判断是否显示表头描述
    showHeadText () {
      return this.$method.isNotEmpty(this.options) &&
          this.$method.isNotEmpty(this.options.headText) &&
          this.options.headText.length > 0
    },
    // 判断tag长度
    selectedTagsLength () {
      return this.realSelectedTags.length ? this.realSelectedTags.length : 0
    },
    // 判断是否显示tag选择框
    showSelected () {
      return this.$method.isNotEmpty(this.options) &&
          this.$method.isNotEmpty(this.radioOrSelection) &&
          this.radioOrSelection !== 'radio'
    },
    // 判断是否显示查询
    showQuery () {
      return this.$method.isNotEmpty(this.options) &&
          this.$method.isNotEmpty(this.options.queryColumn) &&
          this.options.queryColumn.length > 0
    },
    // 判断是否显示页脚默认的按钮 确认和取消
    showDefaultButton () {
      return this.$method.isEmpty(this.options) ||
          this.$method.isEmpty(this.options.footerButtons) ||
          this.options.footerButtons.length === 0
    }
  },
  watch: {
    // 监控打开窗口 tag记录已选中
    visible: {
      handler (v) {
        if (!v) return
        this.reset()
        this.query()
        this.tagFilter = ''
        this.realSelectedTags = []
        this.realSelectedTags.push(...this.selected)
      }
    },
    // 弹窗大小判断
    'options.width': {
      handler (v) {
        switch (v) {
          case 'mini':
            this.dialogWidth = this.$store.state.common.miniDialogWidth
            this.dialogInnerWidth = this.$store.state.common.miniDialogInnerWidth
            break
          case 'small':
            this.dialogWidth = this.$store.state.common.smallDialogWidth
            this.dialogInnerWidth = this.$store.state.common.smallDialogInnerWidth
            break
          case 'big':
            this.dialogWidth = this.$store.state.common.bigDialogWidth
            this.dialogInnerWidth = this.$store.state.common.bigDialogInnerWidth
            break
          default:
            this.dialogWidth = this.$store.state.common.dialogWidth
            this.dialogInnerWidth = this.$store.state.common.dialogInnerWidth
        }
      },
      immediate: true
    },
    // 过滤标签
    tagFilter: {
      handler (v) {
        this.filterTags()
      }
    },
    // tag选中项变化时执行过滤
    'realSelectedTags.length': {
      handler (v) {
        this.filterTags()
      }
    },
    // 表格单选多选判断
    radioOrSelection: {
      handler (v) {
        if (v === 'radio') {
          this.gridOptions.radioSelection = true
          this.gridOptions.radioValue = -1
          delete this.gridOptions.checkboxSelection
        } else {
          this.gridOptions.checkboxSelection = true
          delete this.gridOptions.radioSelection
          delete this.gridOptions.radioValue
        }
      },
      immediate: true
    }
    // 监控表格列 并设置

  },
  methods: {
    // 过滤显示的标签
    filterTags () {
      if (this.$method.isEmpty(this.tagFilter) || this.realSelectedTags.length === 0) {
        this.showSelectedTags = this.realSelectedTags
        return
      }
      let arr = this.realSelectedTags
      arr = arr.filter(data => (data[this.options.tagLabel] + '').includes(this.tagFilter))
      this.showSelectedTags = arr
    },
    // 移除tag
    removeTag (item) {
      // 特殊处理单选取消时去掉表格单选
      if (this.radioOrSelection === 'radio') this.$refs.dialogGrid.radioCheck(-1)
      // 移除单个
      if (this.$method.isNotEmpty(item)) {
        this.realSelectedTags.splice(this.realSelectedTags.findIndex(c => c[this.options.tagKey] === item[this.options.tagKey]), 1)
        this.$refs.dialogGrid.selectionCheck([item], this.gridData)
        return
      }
      // 移除全部
      this.realSelectedTags = []
      this.toggleGrid()
    },
    // 查询
    query (params) {
      Object.assign(this.queryParams, params)
      // 设置url中的参数
      if (this.$method.isNotEmpty(this.options.urlParams)) Object.assign(this.queryParams, this.options.urlParams)
      // 设置隐藏的查询条件
      if (this.$method.isNotEmpty(this.options.hiddenQueryParams)) {
        for (let key in this.options.hiddenQueryParams) {
          this.queryParams.conditions.push({ name: key, value: this.options.hiddenQueryParams[key] })
        }
      }
      this.options.tableApi[this.options.tableQueryMethod](this.queryParams).then(resp => {
        this.gridData = resp.data
        this.gridOptions.pagination = resp.pagination
        if (this.radioOrSelection === 'radio') {
          if (this.selected.length === 0) return
          // 单选选中
          let radioIndex = this.gridData.findIndex(item => item[this.options.tagKey] === this.realSelectedTags[0][this.options.tagKey])
          this.$refs.dialogGrid.radioCheck(radioIndex)
        } else {
          // 多选选中
          this.$refs.dialogGrid.selectionCheck(this.realSelectedTags, this.gridData)
        }
      })
    },
    // 重置
    reset () {
      this.queryParams.conditions = []
      this.queryParams.start = 0
      this.queryValue = {}
    },
    // 单行点击
    rowClick (row, column) {
      console.log(row)
      console.log(column)
    },
    // 表格多选按钮 单选时变化
    selectedChange (checked, row) {
      if (checked.length > 0) {
        let addIndex = checked.findIndex(item => item.id === row.id)
        if (addIndex !== -1) {
          this.realSelectedTags.push(row)
          return
        }
      }
      this.realSelectedTags.splice(this.realSelectedTags.findIndex(item => item.id === row.id), 1)
    },
    // 表格多选按钮 全选时变化
    selectedAllChange (rows) {
      // 取消时 移除tag
      if (rows.length !== 0) {
        // 合并 去重
        let arr = [...this.realSelectedTags, ...rows]
        let id = this.options.tagKey
        let hash = []
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i][id] === arr[j][id]) ++i
          }
          hash.push(arr[i])
        }
        this.realSelectedTags = hash
      } else {
        for (let cur of this.gridData) {
          let index = this.realSelectedTags.findIndex(item => item.id === cur.id)
          if (index !== -1) this.realSelectedTags.splice(index, 1)
        }
      }
    },
    // 设置表格选中或取消
    toggleGrid (rows) {
      // 单击行
      if (this.$method.isNotEmpty(rows) && rows instanceof Object) rows = [rows]
      if (rows) {
        rows.forEach(row => {
          // 选中单行
          this.$refs.dialogGrid.toggleRowSelection(row)
        })
      } else {
        // 清空
        this.$refs.dialogGrid.toggleRowSelection()
      }
    },
    // 自定义事件回调
    transferCallBack (type) {
      this.$emit('transferCallBack', type)
    },
    // 保存
    save () {
      if (this.radioOrSelection === 'radio') {
        let data = {}
        data = this.$method.isNotEmpty(this.selections) ? this.selections[0] : {}
        this.$emit('save', data)
      } else {
        if (this.$method.overMaxLimit(this.realSelectedTags, this.options.limitSelected)) return
        this.$emit('save', this.realSelectedTags)
      }
      this.close()
    },
    // 关闭
    close () {
      this.$refs.query.cleanValue()
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>
