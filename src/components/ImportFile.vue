<template>
  <dialog-head
    v-model="visible"
    :options="dialogOption"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
  >
    <div slot="content">
      <el-form
        enctype="multipart/form-data"
        label-width="100px"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- 选择文件 -->
            <el-form-item
              :label="$t('common.chooseFile')"
            >
              <el-upload
                ref="uploadFile"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :auto-upload="false"
                :show-file-list="false"
                :action="actionUrl"
                :on-change="changed"
                :limit="2"
                class="margin-bottom20 import-upload"
              >
                <el-input
                  slot="trigger"
                  v-model="fileName"
                  :placeholder="$t('common.importFileTip')"
                  suffix-icon="iconfont icon-refresh-cw"
                />
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- 导入 重置 -->
          <el-col :span="8">
            <el-button
              :disabled="disabledUpload"
              type="primary"
              size="small"
              @click="begin"
            >
              {{ btnText }}
            </el-button>
            <el-button
              size="small"
              @click="reset"
            >
              {{ $t('common.reset') }}
            </el-button>
          </el-col>
        </el-row>
        <!-- 输出区域 进度和信息 -->
        <el-row v-show="showInfo">
          <el-col
            :span="24"
          >
            <el-form-item :label="$t('common.schedule')">
              <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="percentage"
                status="success"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="showInfo">
          <el-col
            :span="24"
          >
            <el-form-item :label="$t('common.consoleInfo')">
              <el-input
                v-model="msgText"
                :rows="15"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <el-row v-if="showInfo">
          <el-col
            :span="24"
            class="text-align-center"
          >
            <el-button
              v-if="showDownLoad"
              size="small"
              @click="downloadTable"
            >
              {{ $t('common.downloadDataTable') }}
            </el-button>
            <el-button
              size="small"
              @click="downloadError"
            >
              {{ $t('common.downloadErrorInfo') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </dialog-head>
</template>

<script>
// import { socket, subjectSocket } from '../eventbus'

import DialogHead from '@/components/DialogHead'
export default {
  name: 'ImportFile',
  components: {
    DialogHead
  },
  // 显示隐藏弹出框
  model: {
    prop: 'show',
    event: 'changeVal'
  },
  props: {
    // 配置属性(标题/导入类型/上传地址)
    options: {
      type: Object,
      default: function () {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 显示下载错误数据表和错误报告
      showDownLoad: false,
      // 禁用导入
      disabledUpload: false,
      // 显示进度条及上传信息
      showInfo: false,
      // 进度
      percentage: 0,
      // 上传后提示信息
      msgText: '',
      // 上传列表
      fileList: [],
      // 文件名称
      fileName: '',
      // 按钮名称
      btnText: this.$t('common.beginImport'),
      // 导入的地址
      actionUrl: '',
      // 弹窗名称
      dialogOption: {
        title: '',
        width: 'normal',
        center: true
      },
      // 订阅者
      pageSocket: {}
    }
  },
  computed: {
    visible: {
      get: function () { return this.show },
      set: function (v) { this.$emit('changeVal', v) }
    },
    // 判断是导入
    isImport () {
      return this.btnText === this.$t('common.beginImport')
    }
  },
  watch: {
    visible (val) {
      if (val) {
        // 设置显示的 标题 查询按钮 action地址 下载按钮
        this.dialogOption.title = this.options.title || this.$t('common.import')
        this.btnText = this.options.btnText || this.$t('common.beginImport')
        this.actionUrl = this.$method.judgeExportPath(this.options.action, this.options.isCustom)
        this.showDownLoad = this.options.showDownLoad || false
        this.reset()
      }
    }
  },
  mounted () {
    // 注册订阅ws
    this.listenSocket()
  },
  destroyed () {
    // 注销订阅ws
    this.pageSocket.unsubscribe()
  },
  methods: {
    // 订阅监听ws
    listenSocket () {
      // this.pageSocket = subjectSocket.subscribe(
      //   (msg) => {
      //     // console.log(msg)
      //     if (msg.resourceType === this.options.type) {
      //       if (this.$method.isNotEmpty(msg.message)) {
      //         this.msgText = this.msgText + msg.message + '\r\n'
      //       }
      //       if (msg.data > 0) {
      //         this.percentage = msg.data
      //       }
      //     }
      //   },
      //   (err) => console.log(err),
      //   () => console.log('complete')
      // )
    },
    // 导入/更新
    begin () {
      // 判断ws断开则出提示信息
      // if (socket.readyState !== 1) {
      //   this.$message.error(this.$t('common.webSocketDisConnect'))
      //   return
      // }
      // 判断是否是一个文件
      if (this.fileList.length !== 1) {
        let mess = this.$t('common.importFileTip')
        this.$message({
          message: mess,
          type: 'warning'
        })
      }
      this.$refs.uploadFile.submit()
      // 禁用导入/更新按钮 显示详细
      this.disabledUpload = true
      this.showInfo = true
    },
    // 变更文件
    changed (file, fileList) {
      if (file.status !== 'ready') return
      this.reset()
      if (this.typeOrSizeError(file)) {
        let mess = this.$t('common.uploadQueryFileTip')
        this.$message({
          message: mess,
          type: 'warning'
        })
        return
      }
      this.disabledUpload = false
      this.fileList.push(file)
      this.fileName = file.name
    },
    // 检查上传文件类型及大小 .xls或.xlsx  小于5M
    typeOrSizeError (file) {
      let suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase()
      let suffixErr = suffix === 'XLS' || suffix === 'XLSX'
      return !suffixErr || file.size > 5120 * 1024
    },
    // 重置页面
    reset () {
      this.showInfo = false
      this.disabledUpload = false
      this.fileList = []
      this.fileName = ''
      this.percentage = 0
      this.msgText = ''
    },
    // 关闭
    close () {
      this.visible = false
      this.$emit('close')
    },
    // 下载错误数据表
    downloadTable () {
      this.$method.downLoadFile(this.$method.judgeExportPath('getRecordFile'), '', this.options.type)
    },
    // 下载错误报告
    downloadError () {
      this.$method.downloadTxt(this.$t('common.errorInfoFileName'), this.msgText)
    },
    // 上传成功
    uploadSuccess (resp, file, fileList) {
      if (resp.code !== 200) this.$message.error(resp.message)
    },
    // 上传失败
    uploadError (resp, file, fileList) {
      if (resp.code !== 200) this.$message.error(resp.message)
    }
  }
}
</script>
