<template>
  <a-upload-dragger
    name="file"
    :action="url"
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
</template>

<script>
  import { CloudUploadOutlined } from '@ant-design/icons-vue'
  import { mapGetters } from 'vuex'
  import { tokenName } from '@/config'
  import { infoLog, errorLog } from '@utils/messagerUtil.js'
  import store from '@store/index.js'
  import router from '@router'
  export default {
    components: {
      CloudUploadOutlined,
    },
    props: {
      url: {
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
    },
    methods: {
      handleChange(info) {
        const status = info.file.status
        if (status === 'done') {
          const respCode = info?.file?.response?.respCode
          const respMsg = info?.file?.response?.respMsg
          switch (respCode) {
            case '000000':
              infoLog({ respCode, respMsg: '文件上传成功!' })
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
