<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 生成代码组件，可生成Api,Router,View,Login</span>
      </el-col>
    </el-row>

    <el-card class="code-yaml">
      <el-form
        ref="ruleForm"
        label-position="top"
        size="mini"
      >
        <el-row
          :gutter="6"
          class="margin-bottom10"
        >
          <!-- 全部生成或单文件生成 -->
          <el-col :span="10">
            <el-radio-group v-model="genType">
              <el-radio label="all">
                全部生成
              </el-radio>
              <el-radio label="single">
                单文件生成
              </el-radio>
            </el-radio-group>
          </el-col>
          <!-- 操作按钮 -->
          <el-col :span="6">
            <el-button
              v-show="genType === 'single'"
              size="mini"
              type="primary"
              @click="generating"
            >
              生成
            </el-button>
            <el-button
              v-show="genType === 'all'"
              size="mini"
              type="primary"
              @click="generatingAll"
            >
              生成
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="clear"
            >
              清空
            </el-button>
          </el-col>
        </el-row>

        <!-- 输入和按钮区域 -->
        <el-row :gutter="10">
          <!-- 是否定制化 -->
          <el-col :span="2">
            <el-form-item label="定制化">
              <el-select
                v-model="isCustom"
                size="mini"
              >
                <el-option
                  v-for="item in customTypes"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 生成类型 -->
          <el-col :span="3">
            <el-form-item label="生成类型">
              <el-select
                v-model="pageType"
                size="mini"
              >
                <el-option
                  v-for="item in pageTypes"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 创建类型 -->
          <el-col
            v-show="genType==='single'"
            :span="2"
          >
            <el-form-item label="创建类型">
              <el-select
                v-model="type"
                size="mini"
              >
                <el-option
                  v-for="item in createType"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 模块名称 -->
          <el-col :span="8">
            <el-form-item label="模块名称">
              <el-input
                v-model="moduleName"
                :placeholder="pageType === 'grid' ? '模块名称(驼峰形式命名，小写开头)' : '树模块名称(驼峰形式命名，小写开头)'"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <!-- 表格模块名称 -->
          <el-col
            v-if="pageType === 'treeGrid'"
            :span="4"
          >
            <el-form-item label="表格模块名称">
              <el-input
                v-model="gridModuleName"
                size="mini"
                placeholder="表格模块名称"
              />
            </el-form-item>
          </el-col>
          <!-- API前缀 -->
          <el-col :span="3">
            <el-form-item label="API前缀">
              <el-input
                v-model="prefix"
                size="mini"
                placeholder="API前缀名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr>
      <!-- 输出区域 -->
      <div
        v-for="(item, index) in codeList"
        :key="index"
      >
        <el-row class="margin-top5">
          <el-col :span="16">
            {{ item.title }}
          </el-col>
          <el-col :span="6">
            <span v-show="item.filename">
              {{ item.filename }}&nbsp;<el-button
                size="mini"
                type="primary"
                @click="copy(item.filename)"
              >拷贝文件名</el-button>
            </span>
            <span v-show="!item.filename">
              &nbsp;
            </span>
          </el-col>
          <el-col
            v-show="item.text !== ''"
            :span="2"
          >
            <el-button
              size="mini"
              type="primary"
              @click="copy(item.text)"
            >
              拷贝代码
            </el-button>
          </el-col>
        </el-row>
        <!-- 代码区域 -->
        <el-row v-show="item.text !== ''">
          <el-col
            :span="16"
            :offset="4"
          >
            <highlight-code
              ref="yamlTool"
              lang="yaml"
              contenteditable="true"
            >
              {{ item.text }}
            </highlight-code>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 隐藏的拷贝组件 -->
    <div style="display: none">
      <span>
        <copy
          ref="copyRef"
          :value="copyText"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Copy from '@/components/Copy'

export default {
  name: 'GeneratingCode',
  components: {
    Copy
  },
  props: {},
  data () {
    return {
      // 生成方式
      genType: 'all',

      // 定制化选项
      customTypes: [true, false],
      // 定制化值
      isCustom: true,

      // 页面类型grid和表格树
      pageTypes: ['grid', 'treeGrid'],
      // 页面类型
      pageType: 'grid',

      // 模块名称
      moduleName: '',
      // 树的表格模块名称
      gridModuleName: '',

      // 所有生成的类型
      createType: ['Api', 'View', 'Router'],
      // 默认选中的生成类型
      type: 'Api',

      // 选中的前缀
      prefix: 'prefix',

      // 生成的文件详细
      codeList: [],

      copyText: ''
    }
  },
  computed: {
    // 模块名首字母小写
    lower () {
      if (this.moduleName.length === 0) return ''
      return this.moduleName.charAt(0).toLowerCase() + this.moduleName.substr(1, this.moduleName.length)
    },
    // 模块名首字母大写
    upper () {
      if (this.moduleName.length === 0) return ''
      return this.moduleName.charAt(0).toUpperCase() + this.moduleName.substr(1, this.moduleName.length)
    },
    // 表格模块名首字母小写
    gridLower () {
      if (this.gridModuleName.length === 0) return ''
      return this.gridModuleName.charAt(0).toLowerCase() + this.gridModuleName.substr(1, this.gridModuleName.length)
    },
    // 表格模块名首字母大写
    gridUpper () {
      if (this.gridModuleName.length === 0) return ''
      return this.gridModuleName.charAt(0).toUpperCase() + this.gridModuleName.substr(1, this.gridModuleName.length)
    },
    // 判断是grid
    isGrid () {
      return this.pageType === 'grid'
    }
  },
  methods: {
    // 生成代码
    generating () {
      // 校验输入模块名称
      if (this.check()) return false
      if (this.isGrid) {
        this.generatingTable()
      } else {
        this.generatingTreeTable()
      }
    },
    // 全部生成
    generatingAll () {
      // 校验输入模块名称
      if (this.check()) return false
      if (this.isGrid) {
        this.generatingAllGrid()
      } else {
        this.generatingAllTreeGrid()
      }
    },

    // 生成表格代码
    generatingTable () {
      // 校验输入模块名称
      if (this.check()) return false
      this.codeList = []
      switch (this.type) {
        case 'Api':
          this.makeApi()
          break
        case 'Router':
          this.makeRouter()
          break
        case 'View':
          this.makeView()
          break
      }
    },
    // 生成表格全部
    generatingAllGrid () {
      if (this.check()) return false
      this.codeList = []
      this.makeApi()
      this.makeView()
      this.makeRouter()
    },

    // 生成树表格代码
    generatingTreeTable () {
      // 校验输入模块名称
      if (this.check()) return false
      this.codeList = []
      switch (this.type) {
        case 'Api':
          this.makeApi()
          this.makeApi(this.gridModuleName)
          break
        case 'Router':
          this.makeRouter()
          this.makeRouter(this.gridModuleName)
          break
        case 'View':
          this.makeTreeGridView()
          break
      }
    },
    // 生成树表格全部
    generatingAllTreeGrid () {
      if (this.check()) return false
      this.codeList = []
      this.makeApi()
      this.makeTreeGridView()
      this.makeRouter()
    },

    // 清空
    clear () {
      this.genType = 'all'
      this.codeList = []
      this.moduleName = ''
    },
    // 复制
    copy (text) {
      this.$message({
        message: '拷贝成功!',
        type: 'success',
        duration: 1000
      })
      this.$refs.copyRef.copy(text)
    },
    makeApi (moduleName) {
      let lower = this.makeLowerOrUpper('lower', moduleName)
      let upper = this.makeLowerOrUpper('upper', moduleName)

      // 制作 config.js
      let configTitle = this.makeCustom('configTitle')
      let configText = '// ' + lower +
          '\n' + 'export const ' + lower + 'C = ' + this.prefix + ' + \'/' + lower + '\'\n' +
          'export const ' + lower + 'Q = ' + lower + 'C + \'s\'\n' +
          'export const ' + lower + 'URD = ' + lower + 'C + \'s/\'\n' +
          'export const ' + lower + 'BatchImport = ' + lower + 'Q + \'/batchImport\'\n' +
          'export const ' + lower + 'BatchUpdate = ' + lower + 'Q + \'/batchUpdate\'\n' +
          'export const ' + lower + 'Export = ' + lower + 'Q + \'/export/\'\n' +
          'export const ' + lower + 'ImportTemplateFile = ' + lower + 'Q + \'/importTemplateFile\'' +
          '\n' +
          '\n'
      this.codeList.push({ type: 'Api', filename: '', title: configTitle, text: configText })
      // 制作 模块名.js
      let apiFileName = lower + '.js'
      let title = this.makeCustom('apiName') + apiFileName
      let text = '\'use strict\'\n' +
          'import * as axios from \'@/api/http\'\n' +
          'import * as config from \'./config\'\n' +
          '\n' +
          'export const add = (param) => axios.post(config.' + lower + 'C, param)\n' +
          'export const query = (param) => axios.post(config.' + lower + 'Q, param)\n' +
          'export const remove = (id) => axios.remove(config.' + lower + 'URD + id)\n' +
          'export const edit = (param) => axios.put(config.' + lower + 'URD + param.id, param)\n' +
          'export const detail = (id) => axios.get(config.' + lower + 'URD + id)\n' +
          '\n'
      this.codeList.push({ type: 'Api', filename: apiFileName, title: title, text: text })
      // 制作 index.js
      let indexTitle = this.makeCustom('indexApiName')
      let indexText = 'import * as ' + upper + ' from \'./' + lower + '\'\n\n' +
          upper + ',\n'
      this.codeList.push({ type: 'Api', filename: '', title: indexTitle, text: indexText })
    },
    makeRouter (moduleName) {
      let lower = this.makeLowerOrUpper('lower', moduleName)
      let upper = this.makeLowerOrUpper('upper', moduleName)

      let apiFileName = lower + '.js'
      let title = this.makeCustom('routerTitle') + apiFileName
      let text = 'import ' + upper + ' from \'' + this.makeCustom('@') + '/views/' + lower + '/' + upper + '.vue\'\n' +
          'import ' + upper + 'Add from \'' + this.makeCustom('@') + '/views/' + lower + '/' + upper + 'Add.vue\'\n' +
          'import ' + upper + 'Edit from \'' + this.makeCustom('@') + '/views/' + lower + '/' + upper + 'Edit.vue\'\n' +
          '\n' +
          'const ' + lower + ' = [\n' +
          '  {\n' +
          '    path: \'/' + lower + '\',\n' +
          '    name: \'' + lower + '\',\n' +
          '    component: ' + upper + '\n' +
          '  },\n' +
          '  {\n' +
          '    path: \'/' + lower + '/add\',\n' +
          '    name: \'add' + upper + '\',\n' +
          '    component: ' + upper + 'Add\n' +
          '  },\n' +
          '  {\n' +
          '    path: \'/' + lower + '/edit/:id\',\n' +
          '    name: \'edit' + upper + '\',\n' +
          '    component: ' + upper + 'Edit\n' +
          '  }\n' +
          ']\n' +
          '\n' +
          'export default ' + lower + '\n'
      this.codeList.push({ type: 'Router', filename: apiFileName, title: title, text: text })
      // 制作 index.js
      let indexTitle = this.makeCustom('routerFileTitle')
      let indexText = 'import ' + lower + ' from \'' + this.makeCustom('@') + '/router/' + lower + '\'\n\n\n' +
          ',\n...' + lower
      this.codeList.push({ type: 'Router', filename: '', title: indexTitle, text: indexText })
    },
    makeTreeGridView () {
      let lower = this.lower
      let upper = this.upper
      let gridLower = this.gridLower
      let gridUpper = this.gridUpper
      // 列表
      let fileNameNoVue = upper
      let fileName = upper + '.vue'
      let title = this.makeCustom('treeGridTitle') + lower + '/' + fileName
      let text = '<template>\n' +
          '  <div class="xy-container xy-treeGrid-container">\n' +
          '    <el-row\n' +
          '      :gutter="pageGutter"\n' +
          '      type="flex">\n' +
          '      <!-- 标题/按钮/树 -->\n' +
          '      <el-col\n' +
          '        :span="pageLeftSpan"\n' +
          '        class="xy-treeGrid-left">\n' +
          '        <tree-grid-head :operation="leftHeadOptions" />\n' +
          '        <icon-batch-button\n' +
          '          :button-list="iconList"\n' +
          '          @buttonCallBack="iconButtonCallBack" />\n' +
          '        <tree\n' +
          '          ref="tree"\n' +
          '          :data="treeData"\n' +
          '          :options="options"\n' +
          '          @nodeCallBack="nodeCallBack"\n' +
          '          @operationCallBack="treeCallBack"/>\n' +
          '      </el-col>\n' +
          '      <el-col\n' +
          '        v-loading="loadRight"\n' +
          '        :span="pageRightSpan"\n' +
          '        element-loading-background="rgba(0, 0, 0, 0.5)">\n' +
          '      <!-- 右侧标题 -->\n' +
          '      <tree-grid-head :operation="rightHeadOptions" />\n' +
          '      <!-- 详情部分 -->\n' +
          '      <tree-grid-detail-form\n' +
          '        :list="detailList"\n' +
          '        :data="detail"/>\n' +
          '      <!-- 右侧 标题/表格 -->\n' +
          '      <tree-grid-head :operation="rightBottomOptions" />\n' +
          '        <layout>\n' +
          '          <query\n' +
          '            ref="query"\n' +
          '            slot="query"\n' +
          '            :query-dom="queryDom"\n' +
          '            :hidden-query-default="hiddenQueryDefault"\n' +
          '            @query="query"\n' +
          '            @reset="reset"/>\n' +
          '          <batch-button\n' +
          '            ref="batchButton"\n' +
          '            slot="batchButton"\n' +
          '            :button-list="buttonList"\n' +
          '            @buttonCallBack="buttonCallBack"\n' +
          '            @setColumnDisplay="setColumnDisplay"\n' +
          '            @saveColumnDisplay="saveColumnDisplay"/>\n' +
          '          <grid\n' +
          '            ref="grid"\n' +
          '            slot="grid"\n' +
          '            :grid-options="gridOptions"\n' +
          '            :grid-column="gridColumn"\n' +
          '            :grid-data="gridData"\n' +
          '            :grid-operation="gridOperation"\n' +
          '            @gridCallBack="gridCallBack"\n' +
          '            @setPageParam="query"/>\n' +
          '        </layout>\n' +
          '      </el-col>\n' +
          '    </el-row>\n' +
          '\n' +
          '    <!-- 详细弹窗 -->\n' +
          '    <' + lower + '-detail\n' +
          '      ref="' + lower + 'Detail"\n' +
          '      v-model="showTreeDetail"\n' +
          '      :id="treeDetailId"/>\n' +
          '  </div>\n' +
          '</template>\n' +
          '\n' +
          '<script>\n' +
          '  // API\n' +
          '  import { ' + upper + ', ' + gridUpper + ' } from \'' + this.makeCustom('@') + '/api\'\n' +
          '\n' +
          '  // 混入及组件\n' +
          '  import TreeGridList from \'@/mixins/treeGridList\'\n' +
          '  import ' + upper + 'Detail from \'./components/' + upper + 'Detail\'\n' +
          '\n' +
          '  export default {\n' +
          '    name: \'' + upper + '\',\n' +
          '    components: {\n' +
          '      ' + upper + 'Detail\n' +
          '    },\n' +
          '    mixins: [TreeGridList],\n' +
          '    data () {\n' +
          '      return {\n' +
          '        // region treeGridHead\n' +
          '        leftHeadOptions: {\n' +
          '          titleName: this.$t(\'' + lower + '.name\')\n' +
          '        },\n' +
          '        rightHeadOptions: {\n' +
          '          titleName: this.$t(\'' + lower + '.detail\'),\n' +
          '          secondLevelTitle: true,\n' +
          '          showLine: true\n' +
          '        },\n' +
          '        rightBottomOptions: {\n' +
          '          titleName: this.$t(\'' + lower + '.buttonDataItem\'),\n' +
          '          secondLevelTitle: true,\n' +
          '          showLine: true\n' +
          '        },\n' +
          '        // endregion\n\n' +
          '        // region iconBatchButton\n' +
          '        iconList: [\n' +
          '          {kind: \'button\', name: this.$t(\'common.add\'), icon: \'fa-plus\', type: \'treeAdd\', perm: \'' + lower + 'Add\'}\n' +
          '        ],\n' +
          '        // endregion\n\n' +
          '        // region tree\n' +
          '        options: {\n' +
          '          nodeId: \'id\',\n' +
          '          label: \'label\',\n' +
          '          // 父子不关联\n' +
          '          strictly: true,\n' +
          '          // 显示过滤\n' +
          '          showFilter: true,\n' +
          '          // 设置树的渲染\n' +
          '          renderContentArray: [\'detail\', \'edit\', \'remove\'],\n' +
          '          // 树按钮权限\n' +
          '          renderContentArrayPerm: [\'' + lower + 'Detail\', \'' + lower + 'Edit\', \'' + lower + 'Remove\']\n' +
          '        },\n' +
          '        // endregion\n\n' +

          '        // region detail\n' +
          '        detailList: [\n' +
          '          {name: this.$t(\'common.name\'), model: \'name\'}\n' +
          '        ],\n' +
          '        // endregion\n\n' +

          '        // region query\n' +
          '        queryDom: [\n' +
          '          {\n' +
          '            name: this.$t(\'common.name\'),\n' +
          '            type: \'input\',\n' +
          '            model: \'name\',\n' +
          '            id: 0\n' +
          '          }\n' +
          '        ],\n' +
          '        // endregion\n\n' +

          '        // region button\n' +
          '        buttonList: [\n' +
          '          {kind: \'button\', type: \'add\', icon: \'fa-plus\', name: this.$t(\'common.add\')},\n' +
          '          {kind: \'button\', type: \'export\', icon: \'fa-download\', name: this.$t(\'common.export\')}\n' +
          '        ],\n' +
          '        // endregion\n\n' +

          '        // region grid\n' +
          '        gridColumn: [\n' +
          '          {kind: \'text\', prop: \'name\', label: this.$t(\'common.name\')}\n' +
          '        ],\n' +
          '        gridOperation: [\n' +
          '          {name: this.$t(\'common.edit\'), icon: \'fa-edit\', type: \'edit\'},\n' +
          '          {name: this.$t(\'common.remove\'), icon: \'fa-trash\', type: \'remove\'}\n' +
          '        ],\n' +
          '        // endregion\n\n' +
          '        // region mixins\n' +
          '        // 树的API\n' +
          '        ApiTree: ' + upper + ',\n' +
          '        // 树查询方法名\n' +
          '        treeQueryMethodName: \'query' + upper + 'Tree\',\n' +
          '        // 树移除方法名\n' +
          '        treeRemoveMethodName: \'remove' + upper + 'Tree\',\n' +
          '        // 树新增的路由名称\n' +
          '        addTreeRouteName: \'add' + upper + '\',\n' +
          '        // 树编辑的路由名称\n' +
          '        editTreeRouteName: \'edit' + upper + '\',\n' +
          '        // 表格的API\n' +
          '        ApiGrid: ' + gridUpper + ',\n' +
          '        // 表格导出API名称\n' +
          '        exportApiName: \'' + gridLower + 'Export\',\n' +
          '        // 表格新增的路由名称\n' +
          '        addGridRouteName: \'add' + gridUpper + '\',\n' +
          '        // 表格编辑的路由名称\n' +
          '        editGridRouteName: \'edit' + gridUpper + '\'\n' +
          '        // endregion\n\n' +
          '        // region pageParam\n' +
          '        // endregion\n' +
          '      }\n' +
          '    },\n' +
          '    methods: {\n' +
          '      // region iconButton\n' +
          '      iconButtonCallBack (type) {\n' +
          '        switch (type) {\n' +
          '        case \'treeAdd\':\n' +
          '          this.treeAdd()\n' +
          '          break\n' +
          '        default:\n' +
          '          this.iconBatchButtonCallBackDefault(type)\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n\n' +

          '      // region tree\n' +
          '      // 选中树\n' +
          '      nodeCallBack (data) {\n' +
          '        // 记录点击的节点\n' +
          '        this.checkedTreeData = data\n' +
          '        // 设置隐藏的查询条件 记录菜单id\n' +
          '        this.$set(this.hiddenQueryDefault, \'' + lower + 'Id\', data.id)\n' +
          '        // 页面初始化 手动设置查询条件一次\n' +
          '        this.queryParams.conditions = [{name: \'' + lower + 'Id\', value: data.id}]\n' +
          '        this.query()\n' +
          '      },\n' +
          '      // 树节点的按钮点击事件回调\n' +
          '      treeCallBack (type, data) {\n' +
          '        switch (type) {\n' +
          '        case \'detail\':\n' +
          '          this.treeDetail(data)\n' +
          '          break\n' +
          '        case \'edit\':\n' +
          '          this.treeEdit(data)\n' +
          '          break\n' +
          '        case \'remove\':\n' +
          '          this.treeRemove(data)\n' +
          '          break\n' +
          '        default:\n' +
          '          this.treeCallBackDefault(data)\n' +
          '        }\n' +
          '      },\n' +
          '      // 展开root树节点\n' +
          '      expandedTree () {\n' +
          '        if (this.$method.isNotEmpty(this.treeData) && this.treeData.length > 0) {\n' +
          '          this.$set(this.options, \'defaultExpandedKeys\', [this.treeData[0].id])\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n' +
          '\n' +
          '      // region button\n' +
          '      // 按钮组件回调\n' +
          '      buttonCallBack (type) {\n' +
          '        switch (type) {\n' +
          '        case \'add\':\n' +
          '          this.add()\n' +
          '          break\n' +
          '        case \'export\':\n' +
          '          this.exportFile()\n' +
          '          break\n' +
          '        default:\n' +
          '          this.batchButtonCallBackDefault(type)\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n' +
          '\n' +
          '      // region grid\n' +
          '      // 表格事件回调\n' +
          '      gridCallBack (type, row) {\n' +
          '        switch (type) {\n' +
          '        case \'edit\':\n' +
          '          this.edit(row)\n' +
          '          break\n' +
          '        case \'remove\':\n' +
          '          this.remove(row)\n' +
          '          break\n' +
          '        default:\n' +
          '          this.gridCallBackDefault(row)\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n' +
          '    }\n' +
          '  }\n' +
          '</' + 'script>\n'
      this.codeList.push({ type: 'View', filename: fileNameNoVue, title: title, text: text })
      // 新增
      let addFileNameNoVue = upper + 'Add'
      let addFileName = upper + 'Add.vue'
      let addTitle = '创建添加页至：/src/views/' + lower + '/' + addFileName
      this.codeList.push({ type: 'View', filename: addFileNameNoVue, title: addTitle, text: this.makeAddView() })
      // 编辑
      let editFileNameNoVue = upper + 'Edit'
      let editFileName = upper + 'Edit.vue'
      let editTitle = '创建修改页至：/src/views/' + lower + '/' + editFileName
      this.codeList.push({ type: 'View', filename: editFileNameNoVue, title: editTitle, text: this.makeEditView() })
    },
    makeView () {
      // 列表
      let fileNameNoVue = this.upper
      let fileName = this.upper + '.vue'
      let title = this.makeCustom('viewList') + this.lower + '/' + fileName
      let text = '<template>\n' +
          '  <layout>\n' +
          '    <query\n' +
          '      ref="query"\n' +
          '      slot="query"\n' +
          '      :query-dom="queryDom"\n' +
          '      @query="query"\n' +
          '      @reset="reset"\n' +
          '      @queryCallBack="queryCallBack" />\n' +
          '    <batch-button\n' +
          '      ref="batchButton"\n' +
          '      slot="batchButton"\n' +
          '      :button-list="buttonList"\n' +
          '      @buttonCallBack="buttonCallBack"\n' +
          '      @setColumnDisplay="setColumnDisplay"\n' +
          '      @saveColumnDisplay="saveColumnDisplay" />\n' +
          '    <grid\n' +
          '      ref="grid"\n' +
          '      slot="grid"\n' +
          '      v-model="selections"\n' +
          '      :grid-options="gridOptions"\n' +
          '      :grid-column="gridColumn"\n' +
          '      :grid-data="gridData"\n' +
          '      :grid-operation="gridOperation"\n' +
          '      @gridCallBack="gridCallBack"\n' +
          '      @setPageParam="query" />\n' +
          '  </layout>\n' +
          '</template>\n' +
          '\n' +
          '<script>\n' +
          '  // API\n' +
          '  import { ' + this.upper + ' } from \'' + this.makeCustom('@') + '/api\'\n' +
          '\n' +
          '  // 组件\n' +
          '  import List from \'@/mixins/list\'\n\n' +
          '  export default {\n' +
          '    name: \'' + this.upper + '\',\n' +
          '    mixins: [List],\n' +
          '    data: function () {\n' +
          '      return {\n' +
          '        // region query\n' +
          '        queryDom: [],\n' +
          '        // endregion\n\n' +
          '        // region button\n' +
          '        buttonList: [],\n' +
          '        // endregion\n\n' +
          '        // region grid\n' +
          '        gridColumn: [],\n' +
          '        gridOperation: [],\n' +
          '        // endregion\n\n' +
          '        // region mixins\n' +

          this.makeCustom('listCustom') +

          '        // 列表的API\n' +
          '        Api: ' + this.upper + ',\n' +
          '        // 新增的路由名称\n' +
          '        addRouteName: \'add' + this.upper + '\',\n' +
          '        // 编辑的路由名称\n' +
          '        editRouteName: \'edit' + this.upper + '\',\n' +
          '        // 导出名称\n' +
          '        exportApiName: \'' + this.lower + 'Export\'\n' +
          '        // endregion\n\n' +
          '        // region pageParam\n' +
          '        // endregion\n' +
          '      }\n' +
          '    },\n' +
          '    methods: {\n' +
          '      // region query\n' +
          '      // 查询组件回调\n' +
          '      queryCallBack (index, row) {\n' +
          '        switch (index) {\n' +
          '        case \'id\':\n' +
          '          // TODO 弹出框回调选择的处理逻辑,无回调则删除次方法\n' +
          '          break\n' +
          '        default:\n' +
          '          this.queryCallBackDefault(row)\n' +
          '        }\n' +
          '      },\n' +
          '      // 制作表格需要的数据格式\n' +
          '      makeGridData (gridData, pagination) {\n' +
          '      // TODO 编写自己需要改变的数据结构,无需改变则删除次方法\n' +
          '        this.gridData = gridData\n' +
          '        this.gridOptions.pagination = pagination\n' +
          '      },\n' +
          '      // endregion\n' +
          '\n' +
          '      // region button\n' +
          '      // 按钮组件回调\n' +
          '      buttonCallBack (type) {\n' +
          '        switch (type) {\n' +
          '        case \'add\':\n' +
          '          this.add()\n' +
          '          break\n' +
          '        case \'export\':\n' +
          '          this.exportFile()\n' +
          '          break\n' +
          '        default:\n' +
          '          this.batchButtonCallBackDefault(type)\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n' +
          '\n' +
          '      // region grid\n' +
          '      // 表格组件回调\n' +
          '      gridCallBack (type, row) {\n' +
          '        switch (type) {\n' +
          '        case \'edit\':\n' +
          '          this.edit(row)\n' +
          '          break\n' +
          '        case \'remove\':\n' +
          '          this.remove(row)\n' +
          '          break\n' +
          '        default:\n' +
          '          this.gridCallBackDefault(row)\n' +
          '        }\n' +
          '      },\n' +
          '      // endregion\n' +
          '    }\n' +
          '}\n' +
          '</' + 'script>\n'
      this.codeList.push({ type: 'View', filename: fileNameNoVue, title: title, text: text })
      // 新增
      let addFileNameNoVue = this.upper + 'Add'
      let addFileName = this.upper + 'Add.vue'
      let addTitle = this.makeCustom('addName') + this.lower + '/' + addFileName
      this.codeList.push({ type: 'View', filename: addFileNameNoVue, title: addTitle, text: this.makeAddView() })
      // 编辑
      let editFileNameNoVue = this.upper + 'Edit'
      let editFileName = this.upper + 'Edit.vue'
      let editTitle = this.makeCustom('editName') + this.lower + '/' + editFileName
      this.codeList.push({ type: 'View', filename: editFileNameNoVue, title: editTitle, text: this.makeEditView() })
    },
    makeAddView () {
      let text = '<template>\n' +
          '  <add\n' +
          '    :load="load"\n' +
          '    :options="options"\n' +
          '    @reset="resetPage"\n' +
          '    @save="save"\n' +
          '    @cancel="cancelCheck">\n' +
          '    <el-form\n' +
          '      ref="ruleForm"\n' +
          '      :model="ruleForm"\n' +
          '      :rules="rules"\n' +
          '      :show-message="true"\n' +
          '      :label-position="labelPosition"\n' +
          '      :label-width="labelWidth"\n' +
          '      :size="size">\n' +
          '      <el-row :gutter="gutter">\n' +
          '        <el-col :span="span">\n' +
          '          <el-form-item\n' +
          '            :label="$t(\'common.name\')"\n' +
          '            prop="name">\n' +
          '            <el-input v-model="ruleForm.name"/>\n' +
          '          </el-form-item>\n' +
          '        </el-col>\n' +
          '      </el-row>\n' +
          '    </el-form>\n' +
          '  </add>\n' +
          '</template>\n\n' +
          '<script>\n' +
          '  //API\n' +
          '  import { ' + this.upper + ' } from \'' + this.makeCustom('@') + '/api\'\n' +
          '\n' +
          '  // 混入及组件\n' +
          '  import Add from \'@/mixins/add\'\n' +
          '\n' +
          '  export default {\n' +
          '    name: \'' + this.upper + 'Add\',\n' +
          '    mixins: [Add],\n' +
          '    data: function () {\n' +
          '      return {\n' +
          '        // 标题\n' +
          '        options: {\n' +
          '          title: this.$t(\'' + this.lower + '.add\')\n' +
          '        },\n' +
          '        // 表单\n' +
          '        ruleForm: {\n' +
          '          name: \'\'\n' +
          '        },\n' +
          '        // 表单校验规则\n' +
          '        rules: {\n' +
          '          name: this.makeRules(this.$globalConstant.VALIDATE_STRING, \'blur\', true, 2, 20)\n' +
          '        },\n\n' +
          '        // region mixins\n' +
          '        // 保存的API\n' +
          '        Api: ' + this.upper + ',\n' +
          '        // 取消的路由地址\n' +
          '        cancelRouterName: \'' + this.lower + '\'\n' +
          '        // endregion\n\n' +
          '        // region pageParam\n' +
          '        // endregion\n' +
          '      }\n' +
          '    },\n' +
          '    methods: {\n' +
          '      // 重置表单\n' +
          '      reset () {\n' +
          '        // TODO 此处可以加入继续新增的重置逻辑等 如果无逻辑 删除此方法\n' +
          '        this.stopLoad()\n' +
          '      },\n' +
          '      // 制作数据\n' +
          '      makeData () {\n' +
          '        let retData = this.$method.shallowCopy(this.ruleForm)\n' +
          '        // TODO 此处加入保存时的数据结构 如果直接保存ruleForm则删除此方法\n' +
          '        return retData\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '</' + 'script>\n'
      return text
    },
    makeEditView () {
      let text = '<template>\n' +
          '  <edit\n' +
          '    :load="load"\n' +
          '    :options="options"\n' +
          '    @save="save"\n' +
          '    @cancel="cancelCheck">\n' +
          '    <el-form\n' +
          '      ref="ruleForm"\n' +
          '      :model="ruleForm"\n' +
          '      :rules="rules"\n' +
          '      :show-message="true"\n' +
          '      :label-position="labelPosition"\n' +
          '      :label-width="labelWidth"\n' +
          '      :size="size">\n' +
          '      <el-row :gutter="gutter">\n' +
          '        <el-col :span="span">\n' +
          '          <el-form-item\n' +
          '            :label="$t(\'common.name\')"\n' +
          '            prop="name">\n' +
          '            <el-input v-model="ruleForm.name"/>\n' +
          '          </el-form-item>\n' +
          '        </el-col>\n' +
          '      </el-row>\n' +
          '    </el-form>\n' +
          '  </edit>\n' +
          '</template>\n\n' +
          '<script>\n' +
          '  //API\n' +
          '  import { ' + this.upper + ' } from \'' + this.makeCustom('@') + '/api\'\n' +
          '\n' +
          '  // 混入及组件\n' +
          '  import Edit from \'@/mixins/edit\'\n' +
          '\n' +
          '  export default {\n' +
          '    name: \'' + this.upper + 'Edit\',\n' +
          '    mixins: [Edit],\n' +
          '    data: function () {\n' +
          '      return {\n' +
          '        // 标题\n' +
          '        options: {\n' +
          '          title: this.$t(\'' + this.lower + '.edit\'),\n' +
          '          hideReset: true\n' +
          '        },\n' +
          '        // 表单\n' +
          '        ruleForm: {\n' +
          '          name: \'\'\n' +
          '        },\n' +
          '        // 表单校验规则\n' +
          '        rules: {\n' +
          '          name: this.makeRules(this.$globalConstant.VALIDATE_STRING, \'blur\', true, 2, 20)\n' +
          '        },\n\n' +
          '        // region mixins\n' +
          '        // 保存的API\n' +
          '        Api: ' + this.upper + ',\n' +
          '        // 取消的路由地址\n' +
          '        cancelRouterName: \'' + this.lower + '\'\n' +
          '        // endregion\n\n' +
          '        // region pageParam\n' +
          '        // endregion\n' +
          '      }\n' +
          '    },\n' +
          '    methods: {\n' +
          '      // 打开编辑时的初始化\n' +
          '      initData () {\n' +
          '        // TODO 加入进入编辑页面的逻辑 无逻辑则删除此方法\n' +
          '      },\n' +
          '      // 制作数据\n' +
          '      makeData () {\n' +
          '        let retData = this.$method.shallowCopy(this.oldData, this.ruleForm)\n' +
          '        // TODO 此处加入保存时的数据结构 如果直接保存ruleForm则删除此方法\n' +
          '        return retData\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '</' + 'script>\n'
      return text
    },
    check () {
      if (this.pageType === 'treeGrid') {
        if (this.moduleName === '') this.$message.error('请输入模块名称')
        if (this.gridModuleName === '') this.$message.error('请输入表格模块名称')
        return this.moduleName === '' || this.gridModuleName === ''
      } else {
        if (this.prefix === '') this.$message.error('请输入API前缀')
        if (this.moduleName === '') this.$message.error('请输入模块名称')
        return this.moduleName === '' || this.prefix === ''
      }
    },
    makeLowerOrUpper (type, moduleName) {
      let str = this[type]
      // 树表格
      if (this.$method.isNotEmpty(moduleName)) {
        if (type === 'lower') {
          str = this.gridLower
        } else {
          str = this.gridUpper
        }
      }
      return str
    },
    // 制作定制化
    makeCustom (type) {
      let val = ''
      let custom = this.isCustom

      switch (type) {
        // API
        case 'configTitle':
          val = custom ? '请添加至: src/custom/api/config.js' : '请添加至: src/api/config.js'
          break
        case 'apiName':
          val = custom ? '新建文件至：src/custom/api/' : '新建文件至：/src/api/'
          break
        case 'indexApiName':
          val = custom ? '请添加至: src/custom/api/index.js' : '请添加至: src/api/index.js'
          break
        // ROUTER
        case 'routerTitle':
          val = custom ? '新建文件至：src/custom/router/' : '新建文件至：src/router/'
          break
        case 'routerFileTitle':
          val = custom ? '请添加至: src/custom/router/index.js' : '请添加至: src/router/index.js'
          break
        // ADD/EDIT
        case 'viewList':
          val = custom ? '创建文件夹及列表页至：src/custom/views/' : '创建文件夹及列表页至：src/views/'
          break
        case 'addName':
          val = custom ? '创建添加页至：src/custom/views/' : '创建添加页至：src/views/'
          break
        case 'editName':
          val = custom ? '创建修改页至：src/custom/views/' : '创建修改页至：src/views/'
          break

        case 'treeGridTitle':
          val = custom ? '创建文件夹及列表页至：src/custom/views/' : '创建文件夹及列表页至：src/views/'
          break
        case '3':
          val = custom ? '创建修改页至：src/custom/views/' : '创建修改页至：src/views/'
          break
        case '4':
          val = custom ? '创建修改页至：src/custom/views/' : '创建修改页至：src/views/'
          break

        // 根路径替换
        case '@':
          val = custom ? '@c' : '@'
          break
        // 定制化grid
        case 'listCustom':
          val = custom ? '        // 定制化\n' + '        customApi: true,\n' : ''
          break
      }

      return val
    }
  }
}
</script>
