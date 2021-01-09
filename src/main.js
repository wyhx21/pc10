import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from '@router/index.js'
import store from '@store/index.js'
import 'ant-design-vue/dist/antd.css'
import '@/vab'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Antd)
app.mount('#app')
