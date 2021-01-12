<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="400px"
    :maskClosable="false"
    @update:visible="onfinish"
  >
    <a-upload-dragger
      name="file"
      :action="updloadPath"
      :headers="headers"
      :showUploadList="false"
      @change="handleChange"
    >
      <p class="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p class="ant-upload-text">点击上传文件</p>
      <p class="ant-upload-hint">请上传 Excel 文件</p>
    </a-upload-dragger>

    <template #footer>
      <div class="app-upload-temp-down">
        <a @click="donwLoadTemp">点击下载模板>></a>
      </div>
    </template>
  </a-modal>
</template>

<script>
  import { CloudUploadOutlined } from '@ant-design/icons-vue'
  import { mapGetters } from 'vuex'
  import { tokenName, baseURL } from '@/config'
  import { infoLog, errorLog } from '@utils/messagerUtil.js'
  import { downloadFile } from '@axios/common.js'
  import store from '@store/index.js'
  import router from '@router'
  export default {
    components: {
      CloudUploadOutlined,
    },
    props: {
      title: {
        default: '文件上传',
      },
      url: {
        default: '',
      },
      tempUrl: {
        default: '',
      },
    },
    computed: {
      ...mapGetters({
        token: 'appSystem/account/token',
      }),
      headers() {
        const head = {}
        head[tokenName] = this.token
        return head
      },
      updloadPath() {
        return baseURL + this.url
      },
    },
    methods: {
      onfinish() {
        this.$emit('update:visible', false)
      },
      donwLoadTemp() {
        downloadFile(this.tempUrl)
      },
      handleChange(info) {
        const status = info.file.status
        if (status === 'done') {
          const respCode = info?.file?.response?.respCode
          const respMsg = info?.file?.response?.respMsg
          switch (respCode) {
            case '000000':
              infoLog({ respCode, respMsg: '文件上传成功!' })
              this.onfinish()
              break
            case '200001': {
              store.commit('appSystem/account/loginInfo')
              store.commit('appSystem/account/token')
              store.commit('appSystem/userRoleAuth/clearCache')
              router.push('/login')
              break
            }
            default: {
              infoLog({ respCode, respMsg })
              break
            }
          }
        } else if (status === 'error') {
          errorLog({ message: '文件上传失败!' })
        }
      },
    },
  }
</script>
<style lang="scss">
  .app-upload-temp-down {
    text-align: left;
    margin-left: 10px;
  }
</style>
