<template>
  <div>
    <!-- 加载时遮罩动画 -->
    <div
      v-loading="options.tableLoading"
      class="xy-table"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
      <!-- 表格 -->
      <el-table
        ref="table"
        :data="tableData"
        :height="options.height"
        :show-header="options.showHeader"
        :row-style="rowClass"
        :border="true"
        :empty-text="emptyText"
        :default-sort="options.sortRule"
        :span-method="mergeCells"
        size="mini"
        tooltip-effect="dark"
        @current-change="selectedRow"
        @cell-dblclick="cellDbClick"
        @row-click="rowClick"
        @select="selectedChange"
        @select-all="selectedAllChange"
        @selection-change="handleSection"
      >
        <!-- 单选 -->
        <el-table-column
          v-if="options.radioSelection && !hideAllRows"
          :width="options.radioWidth"
          :fixed="options.radioFixed"
          label=" "
        >
          <template slot-scope="scope">
            <el-radio
              :key="scope.$index"
              v-model="options.radioValue"
              :label="scope.$index"
            >
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <!-- 多选 -->
        <div v-if="options.checkboxSelection && !hideAllRows">
          <el-table-column
            :width="options.checkboxWidth"
            :fixed="true"
            type="selection"
          />
        </div>
        <!-- 循环渲染列 -->
        <template
          v-for="item in tableColumn"
        >
          <template
            v-if="item.show"
          >
            <el-table-column
              v-if="item.isFilter"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed"
              :min-width="item.width ? item.width : item.label.length*20 + 'px'"
              :align="item.kind === 'moreTitle' ? 'center' : 'left'"
              :sortable="item.sort"
              :filters="item.filter"
              :filter-method="item.filterTag"
              max-width="424px"
              size="mini"
              show-overflow-tooltip
            >
              <!-- moreTitle -->
              <template
                v-if="item.kind === 'moreTitle'"
              >
                <el-table-column
                  v-for="itemMore in item.param"
                  :key="itemMore.prop"
                  :prop="itemMore.prop"
                  :label="itemMore.label"
                  :width="itemMore.width"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="itemMore.param">
                      <span
                        v-for="it in itemMore.param"
                        v-if="scope.row[it.key] === it.value"
                        :key="it.value"
                      >
                        <span :class="it.color ? it.color : ''">
                          <i :class="it.icon" />
                        </span>
                        {{ scope.row[itemMore.prop] }}
                      </span>
                    </span>
                    <span v-if="!itemMore.param">
                      {{ scope.row[itemMore.prop] }}
                    </span>
                  </template>
                </el-table-column>
              </template>
              <template slot-scope="scope">
                <!-- progress -->
                <span v-if="item.kind === 'progress'">
                  <el-row>
                    <el-col :span="item.showText ? 18 : 24">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="12"
                        :color="makeProcessColor(scope.row, item)"
                        :percentage="makeProcess(scope.row, item)"
                      />
                    </el-col>
                    <el-col :span="item.showText ? 6 : 0">
                      <div
                        v-show="item.showText"
                        class="margin-left5"
                      >{{ scope.row[item.showText] }} </div>
                    </el-col>
                  </el-row>
                </span>
                <!-- iconText -->
                <span
                  v-if="item.kind === 'iconText'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                  >
                    <i
                      :class="item2.icon"
                      class="margin-right5 "
                    />
                    {{ scope.row[item.prop] }}
                  </span>
                </span>
                <!-- tag -->
                <span
                  v-if="item.kind === 'tag'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                  >
                    <el-tag
                      :color="item2.color"
                      :style="tagStyle(item2)"
                    >
                      {{ scope.row[item.prop] }}
                    </el-tag>
                  </span>
                </span>
                <!-- boldText -->
                <span
                  v-if="item.kind === 'boldText'"
                >
                  <span style="font-weight: bolder;font-size:14px">
                    {{ scope.row[item.prop] }}
                  </span>
                  <span
                    v-for="(item2, index) in item.param"
                    :key="index"
                  >
                    <br>
                    <span style="font-size:12px">
                      <b>{{ item2.title }}</b>: {{ scope.row[item2.prop] }}
                    </span>
                  </span>
                </span>
                <!-- colorText -->
                <span
                  v-if="item.kind === 'colorText'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                    :style="'font-weight: bolder;font-size:14px;color:' + item2.color"
                  >
                    <span v-if="!item2.type">
                      {{ scope.row[item.showName] || scope.row[item.prop] }}
                    </span>
                    <span
                      v-if="item2.type"
                      class="hand"
                      @click.stop="gridCallBack(item2.type, scope.row)"
                    >
                      <i
                        :class="makeColorTextClass(item2)"
                      />
                      {{ scope.row[item.showName] || scope.row[item.prop] }}
                    </span>
                  </span>
                </span>

                <!-- link -->
                <el-tooltip
                  v-if="item.kind === 'link'"
                  :content="item.desc || item.label"
                  class="item"
                  effect="dark"
                  placement="top"
                >
                  <a
                    class="xy-link-button"
                    @click.stop="gridCallBack(item.prop, scope.row)"
                  >
                    {{ scope.row[item.prop] }}
                  </a>
                </el-tooltip>
                <!-- links -->
                <span
                  v-for="(item3, index) in item.param"
                  :key="index"
                >
                  <a
                    v-if="item.kind === 'links'"
                    class="xy-link-button"
                    @click.stop="gridCallBack(item3.type, scope.row)"
                  >
                    {{ item3.showText }} &nbsp;
                  </a>
                </span>
                <!-- text -->
                <span v-if="item.kind === 'text'">
                  <span v-if="!item.secondProp">
                    {{ scope.row[item.prop] }}
                  </span>
                  <span v-else>
                    {{ secondGridText(scope.row, item) }}
                  </span>
                </span>
                <!-- judge -->
                <span v-if="item.kind === 'judge'">
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] == item2.condition"
                    :key="index"
                  >
                    {{ item2.showText }}
                  </span>
                </span>
                <!-- judgeModel -->
                <span v-if="item.kind === 'judgeModel'">
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] == item2.condition"
                    :key="index"
                  >
                    {{ scope.row[item2.showModel] }}
                  </span>
                </span>
                <!-- image -->
                <span v-if="item.kind === 'image'">
                  <img
                    :src="showImg(scope.row, item.param.src)"
                    :alt="scope.row[item.param.alt]"
                    :class="imgClass(scope.row, item.param.src) ? 'display-none' : 'gridImg'"
                    @click.stop="showImage(scope.row, item.param.src)"
                  >
                </span>
                <!-- button -->
                <el-button
                  v-if="showOneButton(item)"
                  type="primary"
                  size="mini"
                  @click.stop="gridCallBack(item.param.type, scope.row)"
                >
                  {{ item.param.showText }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed"
              :min-width="item.width ? item.width : item.label.length*20 + 'px'"
              :align="item.kind === 'moreTitle' ? 'center' : 'left'"
              :sortable="item.sort"
              max-width="424px"
              size="mini"
              show-overflow-tooltip
            >
              <!-- moreTitle -->
              <template
                v-if="item.kind === 'moreTitle'"
              >
                <el-table-column
                  v-for="itemMore in item.param"
                  :key="itemMore.prop"
                  :prop="itemMore.prop"
                  :label="itemMore.label"
                  :width="itemMore.width"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="itemMore.param">
                      <span
                        v-for="it in itemMore.param"
                        v-if="scope.row[it.key] === it.value"
                        :key="it.value"
                      >
                        <span :class="it.color ? it.color : ''">
                          <i :class="it.icon" />
                        </span>
                        {{ scope.row[itemMore.prop] }}
                      </span>
                    </span>
                    <span v-if="!itemMore.param">
                      {{ scope.row[itemMore.prop] }}
                    </span>
                  </template>
                </el-table-column>
              </template>
              <template slot-scope="scope">
                <!-- progress -->
                <span v-if="item.kind === 'progress'">
                  <el-row>
                    <el-col :span="item.showText ? 18 : 24">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="12"
                        :color="makeProcessColor(scope.row, item)"
                        :percentage="makeProcess(scope.row, item)"
                      />
                    </el-col>
                    <el-col :span="item.showText ? 6 : 0">
                      <div
                        v-show="item.showText"
                        class="margin-left5"
                      >{{ scope.row[item.showText] }} </div>
                    </el-col>
                  </el-row>
                </span>
                <!-- iconText -->
                <span
                  v-if="item.kind === 'iconText'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                  >
                    <i
                      :class="item2.icon"
                      class="margin-right5 "
                    />
                    {{ scope.row[item.prop] }}
                  </span>
                </span>
                <!-- tag -->
                <span
                  v-if="item.kind === 'tag'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                  >
                    <el-tag
                      :color="item2.color"
                      :style="tagStyle(item2)"
                    >
                      {{ scope.row[item.prop] }}
                    </el-tag>
                  </span>
                </span>
                <!-- boldText -->
                <span
                  v-if="item.kind === 'boldText'"
                >
                  <span style="font-weight: bolder;font-size:14px">
                    {{ scope.row[item.prop] }}
                  </span>
                  <span
                    v-for="(item2, index) in item.param"
                    :key="index"
                  >
                    <br>
                    <span style="font-size:12px">
                      <b>{{ item2.title }}</b>: {{ scope.row[item2.prop] }}
                    </span>
                  </span>
                </span>
                <!-- colorText -->
                <span
                  v-if="item.kind === 'colorText'"
                >
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] === item2.value"
                    :key="index"
                    :style="'font-weight: bolder;font-size:14px;color:' + item2.color"
                  >
                    <span v-if="!item2.type">
                      {{ scope.row[item.showName] || scope.row[item.prop] }}
                    </span>
                    <span
                      v-if="item2.type"
                      class="hand"
                      @click.stop="gridCallBack(item2.type, scope.row)"
                    >
                      <i
                        :class="makeColorTextClass(item2)"
                      />
                      {{ scope.row[item.showName] || scope.row[item.prop] }}
                    </span>
                  </span>
                </span>

                <!-- link -->
                <el-tooltip
                  v-if="item.kind === 'link'"
                  :content="item.desc || item.label"
                  class="item"
                  effect="dark"
                  placement="top"
                >
                  <a
                    class="xy-link-button"
                    @click.stop="gridCallBack(item.prop, scope.row)"
                  >
                    {{ scope.row[item.prop] }}
                  </a>
                </el-tooltip>
                <!-- links -->
                <span
                  v-for="(item3, index) in item.param"
                  :key="index"
                >
                  <a
                    v-if="item.kind === 'links'"
                    class="xy-link-button"
                    @click.stop="gridCallBack(item3.type, scope.row)"
                  >
                    {{ item3.showText }} &nbsp;
                  </a>
                </span>
                <!-- text -->
                <span v-if="item.kind === 'text'">
                  <span v-if="!item.secondProp">
                    {{ scope.row[item.prop] }}
                  </span>
                  <span v-else>
                    {{ secondGridText(scope.row, item) }}
                  </span>
                </span>
                <!-- judge -->
                <span v-if="item.kind === 'judge'">
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] == item2.condition"
                    :key="index"
                  >
                    {{ item2.showText }}
                  </span>
                </span>
                <!-- judgeModel -->
                <span v-if="item.kind === 'judgeModel'">
                  <span
                    v-for="(item2, index) in item.param"
                    v-if="scope.row[item2.key] == item2.condition"
                    :key="index"
                  >
                    {{ scope.row[item2.showModel] }}
                  </span>
                </span>
                <!-- image -->
                <span v-if="item.kind === 'image'">
                  <img
                    :src="showImg(scope.row, item.param.src)"
                    :alt="scope.row[item.param.alt]"
                    :class="imgClass(scope.row, item.param.src) ? 'display-none' : 'gridImg'"
                    @click.stop="showImage(scope.row, item.param.src)"
                  >
                </span>
                <!-- button -->
                <el-button
                  v-if="showOneButton(item)"
                  type="primary"
                  size="mini"
                  @click.stop="gridCallBack(item.param.type, scope.row)"
                >
                  {{ item.param.showText }}
                </el-button>
              </template>
            </el-table-column>
          </template>
        </template>
        <!--操作-->
        <el-table-column
          v-if="showOperationColumn()"
          :label="t('common.operation')"
          :width="operationWidth"
          :fixed="options.operationFixed"
        >
          <template slot-scope="scope">
            <!-- 按钮不收起显示 -->
            <span v-if="options.outShowBtn">
              <span
                v-for="item in gridOperation"
                :key="item.type"
                class="margin-right5"
              >
                <template
                  v-if="showOperationItem(item, scope.row)"
                >
                  <span v-if="item.btnType === 'textNoLink'">
                    {{ item.name }}
                  </span>
                  <el-button
                    v-else
                    :type="item.btnType ? item.btnType : 'primary'"
                    size="mini"
                    @click.stop="gridCallBack(item.type, scope.row)"
                  >
                    <i :class="item.icon ? 'fa margin-right5 ' + item.icon : ''" />
                    {{ item.name }}
                  </el-button>
                </template>
              </span>
            </span>
            <!-- 多个按钮 收起下拉显示 -->
            <el-dropdown
              v-if="gridOperation.length > 1 && !options.outShowBtn && showOperationTitle(scope.row)"
              trigger="click"
            >
              <el-button
                size="mini"
                type="text"
                @click.stop
              >
                {{ t('common.operation') }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in gridOperation"
                  v-show="showOperationItem(item, scope.row)"
                  :key="item.type"
                >
                  <div @click.stop="gridCallBack(item.type, scope.row)">
                    <i
                      :class="item.icon"
                      class="fa margin-right5"
                    />{{ item.name }}
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 不分页 -->
      <div
        v-if="!options.pageable"
        class="margin-bottom20 text-align-right"
      >
        <div
          v-if="!options.diyPageable"
          class="rg-pagination"
        >
          <!-- 共-条 -->
          <span class="base-tip-size margin-right10">
            {{ t('common.paginationTotalStart') }}
            <span class="pagination-total">
              {{ options.pagination.total }}
            </span>
            {{ t('common.paginationTotalEnd') }}
          </span>
        </div>
        <slot
          v-if="options.diyPageable"
          name="diyPageable"
        />
      </div>
      <!-- 分页 -->
      <div
        v-if="options.pageable"
        ref="pagination"
        class="margin-bottom20 text-align-right"
      >
        <div class="rg-pagination">
          <!-- 共-条 -->
          <span class="base-tip-size margin-right10">
            {{ t('common.paginationTotalStart') }}
            <span class="pagination-total">
              {{ options.pagination.total }}
            </span>
            {{ t('common.paginationTotalEnd') }}
          </span>
          <!-- 每页条数-->
          <el-select
            v-model="options.pagination.limit"
            class="pagination-select"
            size="mini"
            @change="first"
          >
            <el-option
              v-for="size in options.limitList"
              :key="size"
              :label="size + t('common.paginationPageSize')"
              :value="size"
            />
          </el-select>
          <!-- 页码 -->
          <el-pagination
            :current-page.sync="options.pagination.page"
            :page-size="options.pagination.limit"
            :total="options.pagination.total"
            layout="prev, pager, next"
            @current-change="jumpPage"
          />
          <!-- 前往-页 -->
          <div class="base-tip-size pagination-jump">
            {{ t('common.paginationJumpStart') }}
            <el-input
              v-model="options.pagination.jumper"
              type="text"
              size="mini"
              @keyup.enter.native="currentChange(options.pagination.jumper)"
            />
            {{ t('common.page') }}
          </div>
          <!-- 首页 -->
          <el-button
            v-if="false"
            :disabled="firstDisabled"
            size="mini"
            @click="first"
          >
            {{ t('common.paginationFirst') }}
          </el-button>
          <!-- 上一页 -->
          <el-button
            v-if="false"
            :disabled="firstDisabled"
            size="mini"
            @click="currentChange(options.pagination.page - 1)"
          >
            {{ t('common.paginationPrevious') }}
          </el-button>
          <!-- 当前页 -->
          <span
            v-if="false"
            class="current-page"
          >
            {{ options.pagination.page }}
          </span>
          <!-- 下一页 -->
          <el-button
            v-if="false"
            :disabled="lastDisabled"
            size="mini"
            @click="currentChange(options.pagination.page + 1)"
          >
            {{ t('common.paginationNext') }}
          </el-button>
          <!-- 尾页 -->
          <el-button
            v-if="false"
            :disabled="lastDisabled"
            size="mini"
            @click="last"
          >
            {{ t('common.paginationLast') }}
          </el-button>
          <!-- 共-页-->
          <span
            v-if="false"
            class="base-tip-size"
          >
            {{ t('common.paginationTotalStart') }}
            {{ options.pagination.pageTotal }}
            {{ t('common.page') }} |
          </span>
        </div>
      </div>
      <!--查看图片-->
      <show-image
        v-model="showBigImage"
        :image-src="imageSrc"
      />
    </div>
  </div>
</template>

<script>
import Locale from '@/mixins/locale'
import ShowImage from '@/components/ShowImage'

export default {
  name: 'Grid',
  components: {
    ShowImage
  },
  mixins: [Locale],
  // 双向绑定单选和多选结果
  model: {
    prop: 'selects',
    event: 'changeVal'
  },
  props: {
    // 单选或多选状态
    selects: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表格属性
    gridOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表格列
    gridColumn: {
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
    // 表格按钮操作
    gridOperation: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 指定要合并单元格的列
    girdMergecells: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {
      // 表格默认属性
      options: {
        // 显示操作列(默认不显示)
        // 固定操作列(默认不固定)
        operationShow: false,
        operationFixed: false,
        // 固定表头属性,不写height则为不固定
        // height: 300,
        // 固定列属性,不写width则为不固定
        // width: 200,
        // 表头显示隐藏 默认显示
        showHeader: true,
        // 表格加载动画遮罩
        tableLoading: false,
        // 单选显示隐藏,固定,宽度,默认选中值-1为不选中
        radioSelection: false,
        radioFixed: false,
        radioWidth: 30,
        radioValue: -1,
        // 多选显示隐藏,固定,宽度
        checkboxSelection: false,
        fixedCheckbox: false,
        checkboxWidth: 35,
        // 显示按钮在操作下拉菜单 外展示
        outShowBtn: false,
        // 分页
        pageable: true,
        diyPageable: false,
        pagination: {
          limit: 10,
          page: 1,
          // 等于limit
          pageSize: 10,
          // 总页数
          pageTotal: 1,
          total: 0,
          jumper: 1
        },
        limitList: [10, 50, 100]
      },
      // 列
      tableColumn: [],
      // 数据
      tableData: [],
      // 所有列隐藏时隐藏checkbox和raido和序号
      hideAllRows: false,
      // 查看图片的路径
      imageSrc: '',
      // 隐藏显示图片
      showBigImage: false,
      // 表格空数据提示
      emptyText: this.t('common.noDataTip'),
      // 合并单元格参数
      mergeCellsData: {}
    }
  },
  computed: {
    // 表格单选或多选双向绑定
    selections: {
      get: function () { return this.selects },
      set: function (v) { this.$emit('changeVal', v) }
    },
    // region 分页
    // 首页置灰计算
    firstDisabled () {
      return this.options.pagination.page === 1
    },
    // 尾页置灰计算
    lastDisabled () {
      return this.options.pagination.page === this.options.pagination.pageTotal
    },
    // 操作按钮宽度
    operationWidth () {
      if (this.$method.isNotEmpty(this.options.operationWidth)) return this.options.operationWidth
      if (this.options.outShowBtn) {
        if ((this.gridOperation.length === 2 && this.gridOperation[0].show) ||
            this.gridOperation.length === 1) return '100px'
        return '200px'
      }
      return '75px'
    }
    // endregion
  },
  watch: {
    // 监控load状态设置不同提示
    'options.tableLoading': function (v) {
      if (v) {
        this.emptyText = ' '
      } else {
        this.emptyText = this.t('common.noDataTip')
      }
    },
    'gridOptions.tableLoading': {
      handler (v) {
        this.options.tableLoading = v
      }
    },
    // 监控表格列变化
    gridColumn: function (v) {
      this.tableColumn = []
      this.initColumns()
    },
    // 监控表格数据变化实时赋值
    gridData: function (value) {
      this.setData(value)
      this.options.pagination = Object.assign({}, this.gridOptions.pagination)
      this.$set(this.options, 'pageable', this.gridOptions.pagination.limit !== -1)
      // 计算合并单元格的参数
      this.girdMergecells.length > 0 && this.mergeCellsCalc()
    },
    deep: true
  },
  mounted () {
    this.initTable()
  },
  methods: {
    clearFilter () {
      this.$refs.table.clearFilter()
    },
    // region table
    // 初始化表格
    initTable () {
      this.options = Object.assign(this.options, this.gridOptions)
      this.initColumns()
    },
    // 初始化表格列
    initColumns () {
      for (let item of this.gridColumn) {
        if (this.$method.isEmpty(item['show'])) {
          // 给每一列设置默认显示
          item['show'] = true
        }
        this.tableColumn.push(item)
      }
    },
    // 设置表格数据
    setData (data) {
      // this.options.tableLoading = true
      this.tableData.splice(0, this.tableData.length, ...data)
      // this.options.tableLoading = false
    },
    // 设置列显示隐藏
    setColumnDisplay (columns) {
      let hideAllRows = true
      for (let i = 0; i < this.tableColumn.length; i++) {
        let cur = this.tableColumn[i]
        cur.show = columns[i].show
        this.tableColumn.splice(i, 1, cur)
        if (cur.show) hideAllRows = false
      }
      this.hideAllRows = hideAllRows
    },
    // 点击链接或按钮或图片的事件回调
    gridCallBack (type, row) {
      this.$emit('gridCallBack', type, row)
    },
    // 点击多选
    handleSection (val) {
      this.selections = val
    },
    // 多选高亮选中行
    rowClass ({ row }) {
      if (this.selections.includes(row)) {
        return { 'background-color': '#E5F1FF' }
      }
    },
    // 手动选择多选时变化
    selectedChange (checked, row) {
      this.$emit('selectedChange', checked, row)
    },
    selectedAllChange (rows) {
      this.$emit('selectedAllChange', rows)
    },
    // 点击单选
    radioSection (row) {
      this.selections[0] = row
    },
    // 根据index选中单选
    radioCheck (index) {
      this.$set(this.options, 'radioValue', index)
    },
    // 根据datas选中多选
    selectionCheck (datas, gridData) {
      if (datas) {
        let checkedArr = []
        for (let i = 0; i < datas.length; i++) {
          let cur = datas[i]
          for (let j = 0; j < gridData.length; j++) {
            if (cur.id === gridData[j].id) {
              checkedArr.push(gridData[j])
              break
            }
          }
        }
        checkedArr.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      }
    },
    // 全取消 或 选中或取消多选
    toggleRowSelection (row) {
      if (this.$method.isEmpty(row)) {
        this.$refs.table.clearSelection()
        return
      }
      this.$refs.table.toggleRowSelection(row)
    },
    // 列双击
    cellDbClick (row, column, cell) {
      /* let copyText = cell.innerText
        this.$method.copyToClipboard(copyText)
        let copied = this.t('common.copiedMessage')
        this.$message({
          message: copied,
          type: 'success'
        }) */
    },
    // 行单击
    rowClick (row, column) {
      // 单选时
      if (this.options.radioSelection) {
        this.selections[0] = row
        const index = this.gridData.indexOf(row)
        this.$set(this.options, 'radioValue', index)
      }
      // 多选
      if (this.options.checkboxSelection) {
        this.$refs.table.toggleRowSelection(row)
        // 设置多选弹窗点击行回调点击checkbox事件
        let delIndex = this.selections.findIndex(item => item.id === row.id)
        if (delIndex !== -1) {
          // 取消
          let selections = this.selections
          selections.splice(delIndex, 1)
          this.$emit('selectedChange', selections, row)
        } else {
          // 选中
          this.$emit('selectedChange', [row, ...this.selections], row)
        }
      }
      this.$emit('rowClick', row, column)
    },
    // 为选中列增加class名字
    rowOnChecked ({ row, rowIndex }) {
      return this.selections.includes(row) ? 'checked' : ''
    },
    // 判断单按钮 显示/隐藏
    showOneButton (item) {
      return item.kind === 'button' && (this.hasPerm(item.perm) || this.$method.isEmpty(item.perm))
    },
    // 设置操作列的按钮权限 显示/隐藏
    showOperationItem (item, row) {
      // 有判断条件显示的按钮
      if (this.$method.isNotEmpty(item.show)) {
        return row[item.show.key] === item.show.value && (this.$method.isEmpty(item.perm) || this.hasPerm(item.perm))
      }
      return this.hasPerm(item.perm) || this.$method.isEmpty(item.perm)
    },
    // 设置隐藏操作下拉
    showOperationTitle (row) {
      let show = false
      for (let i = 0; i < this.gridOperation.length; i++) {
        let item = this.gridOperation[i]
        if (this.$method.isEmpty(item.show)) {
          show = true
          continue
        }
        if (row[item.show.key] === item.show.value && (this.$method.isEmpty(item.perm) || this.hasPerm(item.perm))) {
          show = true
          break
        }
      }
      return show
    },
    // 设置操作列权限 显示/隐藏
    showOperationColumn () {
      let noPermIndex = this.gridOperation.findIndex(item => this.$method.isEmpty(item.perm))
      let index = this.gridOperation.findIndex(item => this.hasPerm(item.perm))
      return index !== -1 || noPermIndex !== -1
    },
    // 显示图片
    showImg (data, src) {
      if (this.imgClass(data, src)) return
      return this.$method.getImageById(data[src])
    },
    // 图片样式
    imgClass (data, src) {
      return this.$method.isEmpty(data[src])
    },
    // 查看照片
    showImage (data, src) {
      this.imageSrc = this.showImg(data, src)
      this.showBigImage = true
    },
    // 选中当前行事件
    selectedRow (val) {
      this.$emit('selectedRow', val)
    },
    // 手动选中当前行
    setCurrentRow (row) {
      this.$refs.table.setCurrentRow(row)
    },
    // 设置俩级数据显示
    secondGridText (row, item) {
      if (this.$method.isEmpty(row[item.prop])) return ''
      return row[item.prop][item.secondProp]
    },
    // 制作进度条进度
    makeProcess (row, item) {
      let process = parseInt(row[item.prop]) ? parseInt(row[item.prop]) : 0
      return process
    },
    // 制作进度条颜色
    makeProcessColor (row, item) {
      let color = ''
      if (item.colorKey && item.color) {
        color = item.color[row[item.colorKey]]
      }
      return color
    },
    // 计算合并单元格的参数
    mergeCellsCalc () {
      let mergeLen = {}
      let mergeCellsData = {}
      // 遍历要合并的列
      this.girdMergecells.forEach(column => {
        mergeLen[column] = 1
        mergeCellsData[column] = []
      })
      // 倒序遍历表格数据
      for (let i = this.gridData.length - 1; i >= 0; i--) {
        // 遍历一条数据中的合并列
        for (let column in mergeCellsData) {
          // 如果遍历到了第一条，或者这一条数据与下一条不相等，或者当前是非主列并且合并范围超过了主列的合并范围，就终止合并，否则合并单元格
          if (i === 0 || this.gridData[i][column] !== this.gridData[i - 1][column] || (column !== this.girdMergecells[0] && mergeLen[this.girdMergecells[0]] === 1)) {
            mergeCellsData[column].unshift([mergeLen[column], 1])
            mergeLen[column] = 1
          } else {
            mergeCellsData[column].unshift([0, 0])
            mergeLen[column] += 1
          }
        }
      }

      this.mergeCellsData = mergeCellsData
    },
    // 合并单元格
    mergeCells ({ row, column, rowIndex, columnIndex }) {
      if (this.mergeCellsData.hasOwnProperty(column.property)) {
        let mergeData = this.mergeCellsData[column.property]
        if (rowIndex < mergeData.length) {
          return mergeData[rowIndex]
        }
      }
    },
    // endregion

    // region 分页
    // 首页
    first () {
      this.jumpPage('first')
    },
    // 末页
    last () {
      this.jumpPage('last')
    },
    // 当前页改变
    currentChange (page) {
      // 输入数字校验
      let reg = /^[0-9]+$/
      if (!reg.test(page)) {
        let mess = this.t('common.pleaseInputRightPage')
        this.$message.warning(mess)
        return false
      }
      page = parseInt(page)

      // 校验小于1的页数退出
      if (this.$method.isEmpty(page) || page < 1) {
        let mess = this.t('common.pleaseInputRightPage')
        this.$message.warning(mess)
        return false
      }

      let oldCurrent = this.options.pagination.page
      // 等于当前退出
      if (page === oldCurrent) return false
      // 校验大于最大页数退出
      if (page > this.options.pagination.pageTotal) {
        let mess = this.t('common.pleaseInputRightPage')
        this.$message.warning(mess)
        return false
      }

      this.jumpPage(page)
    },
    // 跳转页数 first last previous next jumper pageNumber
    jumpPage (page) {
      if (page === 'first') {
        page = 1
      } else if (page === 'last') {
        page = this.options.pagination.pageTotal
      }
      this.$set(this.options.pagination, 'page', parseInt(page))
      this.$set(this.options.pagination, 'jumper', 1)
      let params = this.makeParam()
      this.$emit('setPageParam', params)
    },
    makeParam () {
      // 制作查询对象
      let param = {
        start: this.options.pagination.page * this.options.pagination.limit - this.options.pagination.limit,
        limit: this.options.pagination.limit
      }
      return param
    },
    tagStyle (item) {
      return 'border-radius: 0;color:' + item.fontColor + ';border: 1px solid ' + item.fontColor
    },
    makeColorTextClass (item) {
      let iconColor = item.iconColor ? item.iconColor : 'default-color'
      return 'fa margin-right5 ' + iconColor + ' ' + item.icon
    }
    // endregion
  }
}
</script>

<style>
  .el-table-column--selection .cell{
    text-overflow: initial !important;
  }
</style>
