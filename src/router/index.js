import { createRouter, createWebHashHistory } from 'vue-router'
import common from './package/common.js'
import initPage from './package/initPage.js'
import systemInfo from './package/systemInfo.js'

const routdefault = createRouter({
  history: createWebHashHistory(),
  routes: [...common, ...initPage, ...systemInfo],
})

export default routdefault
