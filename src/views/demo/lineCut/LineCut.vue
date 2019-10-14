<template>
  <div class="xy-container">
    <el-row
      :gutter="10"
      class="margin-bottom20"
    >
      <el-col :span="24">
        <span style="color: red"> Tip: 单行删减演示(包含校验规则，延迟设置，获取数据，设置数据) </span>
        <el-button
          size="mini"
          type="primary"
          @click="showApi = true"
        >
          查看API
        </el-button>
      </el-col>
    </el-row>
    <hr>
    <!--
      titles 表头
      columns 操作的列
      rules 规则
      lineCallBack 事件回调 如search类型
    -->
    <line-cut
      ref="lineCut"
      :titles="titles"
      :options="options"
      :columns="columns"
      :rules="rules"
      @lineCallBack="lineCallBack"
    />
    <div class="margin-top5">
      <el-button
        type="primary"
        size="mini"
        @click="setData"
      >
        setData
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="getData"
      >
        getData
      </el-button>
      <br>
      <br>
      {{ lineData }}
    </div>
    <choose-age
      ref="chooseAge"
      @save="dialogSave"
    />
    <api-introduction
      v-model="showApi"
      :property="propertyList"
    />
  </div>
</template>

<script>
import LineCut from '@/components/LineCut'
import ChooseAge from './components/ChooseAge'
import ApiIntroduction from '@/components/ApiIntroduction'

export default {
  name: 'LineCutDemo',
  components: {
    LineCut, ChooseAge, ApiIntroduction
  },
  data: function () {
    return {
      lineData: '',
      // 配置单行删减最大行数
      options: {
        maxLength: 3
      },
      titles: [
        { name: this.$t('common.name'), required: true },
        { name: this.$t('common.description') },
        { name: this.$t('common.age') },
        { name: this.$t('common.sex') },
        { name: '下拉多选' },
        { name: this.$t('common.search') }
      ],
      columns: [
        {
          type: 'input',
          model: 'name',
          hiddenFirst: true,
          width: '15%',
          default: 'test'
        }, {
          type: 'search',
          model: 'description',
          width: '20%',
          placeholder: this.$t('common.pleaseSelect')
        }, {
          type: 'search',
          model: 'age',
          width: '20%',
          placeholder: this.$t('common.pleaseSelect')
        }, {
          type: 'select',
          model: 'sex',
          dataType: 'number',
          data: [
            { name: this.$t('common.male'), value: 1 },
            { name: this.$t('common.female'), value: 2 }
          ],
          width: '10%',
          default: 1
        }, {
          type: 'multipleSelect',
          model: 'sex2',
          data: [
            { name: this.$t('common.male'), value: 1 },
            { name: this.$t('common.female'), value: 2 }
          ],
          placeholder: this.$t('common.pleaseSelect'),
          width: '10%'
        }, {
          type: 'transfer',
          tagKey: 'id',
          tagLabel: 'name',
          model: 'testNumber',
          width: '20%'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, type: 'number', message: '数字型必填', trigger: 'blur' }
        ],
        testNumber: [
          { required: true, trigger: 'blur' }
        ]
      },
      showApi: false,
      propertyList: [
        { key: 'options', value: '配置', type: 'Object', default: '' },
        { key: ' - maxLength', value: '最大行数', type: 'Number', default: '100' },
        { key: 'titles', value: '表头名字', type: '* Array', default: '' },
        { key: ' - name', value: '名称', type: '* String', default: '' },
        { key: ' - required', value: '是否必填', type: 'Boolean', default: 'false' },
        { key: 'columns', value: '列', type: '* Array', default: '' },
        { key: ' - type', value: '列类型 input/search/select、multipleSelect', type: '* String', default: '' },
        { key: ' - model', value: '列模型名', type: '* String', default: '' },
        { key: ' - maxLength', value: '输入类型为input时 设置最大可输入 默认64', type: 'Number', default: '64' },
        { key: ' - dataType', value: '字段类型 number或不写', type: 'String', default: '' },
        { key: ' - default', value: '列默认值', type: 'String', default: '' },
        { key: ' - placeholder', value: '列占位符', type: '* String', default: '' },
        { key: ' - data', value: '只有type=select时,才可设置data对象属性', type: '* Array', default: '' },
        { key: ' - hiddenFirst', value: '隐藏第一行第一列', type: 'Boolean', default: 'false' },
        { key: ' - width', value: '宽度设置 请设置百分比 总长度为95%', type: 'String', default: '' },
        { key: ' - - name', value: 'data中下拉显示的值', type: '* String', default: '' },
        { key: ' - - value', value: 'data中下拉选中的值', type: '* String', default: '' },
        { key: 'rules', value: '请参照element-ui的form的rule设置', type: 'Object', default: '' },
        { key: '@selectChange', value: '当有列为type=select时,回调事件(model, line)', type: '事件', default: '' },
        { key: '@lineCallBack', value: '当有列为type=search时,弹出框的回调事件(model, oldSelectedItem)', type: '事件', default: '' }]
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.columns[3].data.push({ name: 'wu', value: '3' })
      that.columns[3].default = '3'
    }, 2000)
  },
  methods: {
    setData () {
      this.$refs.lineCut.setData([{ name: 'name1', description: 'desc1', age: 11, sex: '2' }])
    },
    getData () {
      this.lineData = this.$refs.lineCut.getData()
    },
    lineCallBack (model, oldItem, line) {
      if (model === 'description') {
      } else if (model === 'age') {
        this.$refs.chooseAge.initData(oldItem)
      } else if (model === 'testNumber') {
        this.dialogSave('1,2,3,4', [{ id: 1, name: 'a11' }, { id: 2, name: '111' }, { id: 3, name: '1111' }, { id: 4, name: '111111' }, { id: 5, name: '1221' },
          { id: 11, name: '11' }, { id: 21, name: '111' }, { id: 31, name: '1111' }, { id: 41, name: '111111' }, { id: 51, name: '1221' }])
      }
    },
    // 选择弹出框 保存后的统一回调
    dialogSave (showText, row) {
      this.$refs.lineCut.setOpenDialogValue(showText, row)
    }
  }
}
</script>
