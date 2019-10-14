<!--
<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20">
      <el-col :span="24">
        <span style="color: red"> Tip: 树组件，包含直接设置数据和延迟加载树结构，以及过滤查询，点击节点事件回调等 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true">查看API</el-button>
      </el-col>
    </el-row>
    <div style="width:300px" >
      &lt;!&ndash;
        data: 为树形结构数据 懒加载时不传送
        option: 为配置树的属性
        nodeCallBack: 为点击树节点的事件回调
      &ndash;&gt;
      &lt;!&ndash;<tree
        ref="treeDemo"
        :data="treeData"
        :options="options"
        @nodeCallBack="nodeCallBack"
        @operationCallBack="operationCallBack"/>&ndash;&gt;
      &lt;!&ndash; lazy &ndash;&gt;
      <tree
        ref="treeDemo"
        :options="options"
        @nodeCallBack="nodeCallBack"
        @checkChangeCallBack = "checkChangeCallBack"
        @loadNode="loadNode"
        @operationCallBack="operationCallBack"/>
    </div>
    <div>
      <br>
      &lt;!&ndash; 测试方法 &ndash;&gt;
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="setCheckedKeys()">
        用key设置
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="getCheckedKeys()">
        用key获取
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="setCheckedNodes()">
        用node设置
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="getCheckedNodes()">
        用node获取
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="resetChecked()">
        清空
      </el-button>
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"/>
  </div>
</template>

<script>
  import Tree from '@/components/Tree'
  import ApiIntroduction from '@/components/ApiIntroduction'

  export default {
    name: 'TreeDemo',
    components: {
      Tree,
      ApiIntroduction
    },
    data: function () {
      return {
        // 树结构数据
        treeData: [],
        // 树的属性配置
        options: {
          // 显示名称 默认是label
          label: 'name',
          // 子节点名称 默认children
          children: 'child',
          // 多选 默认false
          checkbox: true,
          // 父子不关联
          strictly: true,
          // node-key绑定的字段 默认id
          nodeId: 'id',
          // 树展开的节点 默认空
          defaultExpandedKeys: [1, 2],
          // 树选中的节点 默认空
          defaultCheckedKeys: [5],
          // 树全展开显示 默认false
          defaultExpandAll: false,
          // 显示过滤
          showFilter: true,
          // 懒加载
          lazy: true,
          // 设置树的渲染
          renderContentArray: ['detail', 'edit', 'remove']
        },
        showApi: false,
        propertyList: [
          {key: 'lazy tree', value: '懒加载类型的树结构', type: '', default: ''},
          {key: 'options', value: '树的配置选项(后续可扩展)', type: 'Object', default: ''},
          {key: ' - label', value: '显示名称', type: '* String', default: 'label'},
          {key: ' - children', value: '子节点名称', type: '* String', default: 'children'},
          {key: ' - checkbox', value: '多选框', type: '* Boolean', default: 'false'},
          {key: ' - strictly', value: '多选框父子不关联显示', type: 'Boolean', default: 'false'},
          {key: ' - nodeId', value: 'node-key绑定的字段', type: '* String', default: 'id'},
          {key: ' - defaultExpandedKeys', value: '树展开的节点id', type: 'Array', default: ''},
          {key: ' - defaultCheckedKeys', value: '树选中的节点', type: 'Array', default: ''},
          {key: ' - defaultExpandAll', value: '树全展开显示', type: 'Boolean', default: 'false'},
          {key: ' - showFilter', value: '显示过滤', type: 'Boolean', default: 'false'},
          {key: ' - lazy', value: '懒加载', type: 'Boolean', default: ''},
          {key: 'no lazy tree', value: '一次性加载所有数据的树', type: '', default: ''},
          {key: 'data', value: '树的所有数据', type: 'Array', default: '[]'},
          {key: 'renderContentArray', value: '树的操作按钮 detail edit remove', type: 'Array', default: '[]'}]
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        let that = this
        setTimeout(function () {
          that.treeData = [{
            id: 1,
            name: '一级 1',
            child: [{
              id: 2,
              name: '二级 1-1',
              disabled: true,
              child: [{
                id: 3,
                name: '三级 1-1-1'
              }]
            }]
          }, {
            id: 4,
            name: '一级 2',
            child: [{
              id: 5,
              name: '二级 2-1',
              child: [{
                id: 6,
                name: '三级 2-1-1'
              }]
            }, {
              id: 7,
              name: '二级 2-2',
              child: [{
                id: 8,
                name: '三级 2-2-1'
              }]
            }]
          }, {
            id: 9,
            name: '一级 3',
            child: [{
              id: 10,
              name: '二级 3-1',
              child: [{
                id: 11,
                name: '三级 3-1-1'
              }]
            }, {
              id: 12,
              name: '二级 3-2',
              child: [{
                id: 13,
                name: '三级 3-2-1'
              }]
            }]
          }]
        }, 1000)
      },
      // 点击树节点的事件回调
      nodeCallBack (data) {
        console.log(data)
      },
      // 多选的回调
      checkChangeCallBack (data) {
        console.log(data)
      },
      // 通过key设置选中树节点
      setCheckedKeys () {
        this.$refs.treeDemo.setCheckedKeys([3])
      },
      // 获取树节点选中的key
      getCheckedKeys () {
        console.log(this.$refs.treeDemo.getCheckedKeys())
      },
      // 通过树节点数组设置选中树节点
      setCheckedNodes () {
        this.$refs.treeDemo.setCheckedNodes([{
          id: 8,
          name: '三级 2-2-1'
        }, {
          id: 9,
          name: '一级 3'
        }])
      },
      // 获取选中的树节点
      getCheckedNodes () {
        console.log(this.$refs.treeDemo.getCheckedNodes())
      },
      // 清空树节点选中状态
      resetChecked () {
        this.$refs.treeDemo.resetChecked()
      },
      // 懒加载设置数据
      loadNode (node, resolve) {
        if (node.level === 0) {
          return resolve([{ id: 1, name: 'region1' }, { id: 2, name: 'region2' }])
        }
        setTimeout(() => {
          if (node.level === 1) return resolve([{ id: 3, name: 'region3' }, { id: 4, name: 'region4' }])
          if (node.level === 2) return resolve([])
        }, 500)
      },
      operationCallBack (type, data) {
        switch (type) {
        case 'info':
          console.log(type)
          console.log(data)
          break
        case 'remove':
          console.log(type)
          console.log(data)
          this.$refs.treeDemo.remove(data)
          break
        default:
          console.log(type)
          console.log(data)
        }
      }
    }
  }
</script>
-->
<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 树组件，包含直接设置数据和延迟加载树结构，以及过滤查询，点击节点事件回调等 </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <!--
        data: 为树形结构数据 懒加载时不传送
        option: 为配置树的属性
        nodeCallBack: 为点击树节点的事件回调
      -->
        <tree
          ref="treeDemo"
          :data="treeData"
          :options="options"
          @nodeCallBack="nodeCallBack"
          @operationCallBack="operationCallBack"
        />
        <!-- lazy -->
        <!--<tree
        ref="treeDemo"
        :options="options"
        @nodeCallBack="nodeCallBack"
        @checkChangeCallBack = "checkChangeCallBack"
        @loadNode="loadNode"
        @operationCallBack="operationCallBack"/>-->
      </el-col>
    </el-row>
    <div>
      <br>
      <!-- 测试方法 -->
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="setCheckedKeys()"
      >
        用key设置
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="getCheckedKeys()"
      >
        用key获取
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="setCheckedNodes()"
      >
        用node设置
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="getCheckedNodes()"
      >
        用node获取
      </el-button>
      <el-button
        class="margin-right5"
        size="mini"
        type="primary"
        @click="resetChecked()"
      >
        清空
      </el-button>
    </div>
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import Tree from '@/components/Tree'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'TreeDemo',
  components: {
    Tree,
    ApiIntroduction
  },
  data: function () {
    return {
      // 树结构数据
      treeData: [],
      // 树的属性配置
      options: {
        // 显示名称 默认是label
        label: 'name',
        // 子节点名称 默认children
        children: 'child',
        // 多选 默认false
        checkbox: true,
        // 父子不关联
        strictly: true,
        // node-key绑定的字段 默认id
        nodeId: 'id',
        // 树展开的节点 默认空
        defaultExpandedKeys: [1, 2],
        // 树选中的节点 默认空
        defaultCheckedKeys: [5],
        // 树全展开显示 默认false
        defaultExpandAll: true,
        // 显示过滤
        showFilter: true,
        // 懒加载
        lazy: false,
        // 多条件查询 数组和默认值
        multipartQuery: [{ name: '名称', value: 'name' }, { name: '地址', value: 'address' }, { name: '电话', value: 'tel' }],
        multipartQueryModel: 'name',
        // 设置树的渲染
        renderContentArray: ['detail', 'edit', 'remove'],
        showBtnIconJudge: { key: 'id', value: 1 }
      },
      showApi: false,
      propertyList: [
        { key: 'lazy tree', value: '懒加载类型的树结构', type: '', default: '' },
        { key: 'options', value: '树的配置选项(后续可扩展)', type: 'Object', default: '' },
        { key: ' - height', value: '树的高度', type: 'String', default: '70vh' },
        { key: ' - label', value: '显示名称', type: '* String', default: 'label' },
        { key: ' - children', value: '子节点名称', type: '* String', default: 'children' },
        { key: ' - checkbox', value: '多选框', type: '* Boolean', default: 'false' },
        { key: ' - strictly', value: '多选框父子不关联显示', type: 'Boolean', default: 'false' },
        { key: ' - nodeId', value: 'node-key绑定的字段', type: '* String', default: 'id' },
        { key: ' - defaultExpandedKeys', value: '树展开的节点id', type: 'Array', default: '' },
        { key: ' - defaultCheckedKeys', value: '树选中的节点', type: 'Array', default: '' },
        { key: ' - defaultExpandAll', value: '树全展开显示', type: 'Boolean', default: 'false' },
        { key: ' - showFilter', value: '显示过滤', type: 'Boolean', default: 'false' },
        { key: ' - lazy', value: '懒加载', type: 'Boolean', default: '' },
        { key: ' - multipartQuery', value: '过滤的数组', type: 'Array', default: '[]' },
        { key: ' - - name', value: '过滤的数组的单项显示', type: 'String', default: '' },
        { key: ' - - value', value: '过滤的数组的值', type: 'String/Number', default: '' },
        { key: ' - multipartQueryModel', value: '过滤的数组默认项', type: ' String', default: '' },
        { key: ' - renderContentArray', value: '树的操作按钮 detail edit remove', type: 'Array', default: '[]' },
        { key: ' - showBtnIconJudge', value: '树节点显示图标', type: 'Object', default: '{}' },
        { key: ' - - key', value: '显示的数据的key', type: 'String', default: '' },
        { key: ' - - secondKey', value: '显示的数据的二级key', type: 'String', default: '' },
        { key: ' - - value', value: '显示的数据的值', type: 'String/Number/Boolean', default: '' },
        { key: 'no lazy tree', value: '一次性加载所有数据的树', type: '', default: '' },
        { key: 'data', value: '树的所有数据', type: 'Array', default: '[]' },
        { key: ' - data', value: '树节点指定按钮隐藏 editHidden/detailHidden/removeHidden=true', type: 'String', default: '' }
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let that = this
      setTimeout(function () {
        that.treeData = [{
          id: 1,
          name: '李大三[海淀区]-13188887777',
          address: '海淀区',
          tel: '13188887777',
          child: [{
            id: 2,
            name: '李大二[昌平区]-13222223333',
            tel: '13222223333',
            address: '昌平区',
            disabled: true,
            child: [{
              id: 3,
              name: '李大一[朝阳区]-13222224444',
              tel: '13222224444',
              address: '朝阳区'
            }]
          }]
        }, {
          id: 4,
          name: '一级 2',
          address: '昌平区',
          tel: '13188887777',
          child: [{
            id: 5,
            name: '二级 2-1',
            address: '昌平区',
            tel: '13188887777',
            child: [{
              id: 6,
              name: '三级 2-1-1',
              address: '昌平区',
              tel: '13188887777'
            }]
          }, {
            id: 7,
            name: '二级 2-2',
            address: '昌平区',
            child: [{
              id: 8,
              name: '三级 2-2-1',
              address: '昌平区',
              tel: '13188887777'
            }]
          }]
        }, {
          id: 9,
          name: '一级 3',
          address: '昌平区',
          tel: '13188887777',
          child: [{
            id: 10,
            name: '二级 3-1',
            address: '昌平区',
            tel: '13188887777',
            child: [{
              id: 11,
              name: '三级 3-1-1',
              address: '昌平区',
              tel: '13188887777'
            }]
          }, {
            id: 12,
            name: '二级 3-2',
            address: '昌平区',
            tel: '13188887777',
            child: [{
              id: 13,
              name: '三级 3-2-1',
              address: '昌平区',
              tel: '13188887777'
            }]
          }]
        }]
      }, 1000)
    },
    // 点击树节点的事件回调
    nodeCallBack (data) {
      console.log(data)
    },
    // 多选的回调
    checkChangeCallBack (data) {
      console.log(data)
    },
    // 通过key设置选中树节点
    setCheckedKeys () {
      this.$refs.treeDemo.setCheckedKeys([3])
    },
    // 获取树节点选中的key
    getCheckedKeys () {
      console.log(this.$refs.treeDemo.getCheckedKeys())
    },
    // 通过树节点数组设置选中树节点
    setCheckedNodes () {
      this.$refs.treeDemo.setCheckedNodes([{
        id: 8,
        name: '三级 2-2-1'
      }, {
        id: 9,
        name: '一级 3'
      }])
    },
    // 获取选中的树节点
    getCheckedNodes () {
      console.log(this.$refs.treeDemo.getCheckedNodes())
    },
    // 清空树节点选中状态
    resetChecked () {
      this.$refs.treeDemo.resetChecked()
    },
    // 懒加载设置数据
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ id: 1, name: 'region1' }, { id: 2, name: 'region2' }])
      }
      setTimeout(() => {
        if (node.level === 1) return resolve([{ id: 3, name: 'region3' }, { id: 4, name: 'region4' }])
        if (node.level === 2) return resolve([])
      }, 500)
    },
    operationCallBack (type, data) {
      switch (type) {
        case 'info':
          console.log(type)
          console.log(data)
          break
        case 'remove':
          console.log(type)
          console.log(data)
          this.$refs.treeDemo.remove(data)
          break
        default:
          console.log(type)
          console.log(data)
      }
    }
  }
}
</script>
