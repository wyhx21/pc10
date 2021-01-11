import { createRouter, createWebHashHistory } from 'vue-router'
import common from './package/common.js'
import initPage from './package/initPage.js'
import systemInfo from './package/systemInfo.js'
import dict from './package/dict.js'

const routdefault = createRouter({
  history: createWebHashHistory(),
  routes: [...common, ...initPage, ...systemInfo, ...dict],
})

export default routdefault
