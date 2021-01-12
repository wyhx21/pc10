import { createRouter, createWebHashHistory } from 'vue-router'
import common from './package/common.js'
import initPage from './package/initPage.js'
import systemInfo from './package/systemInfo.js'
import dict from './package/dict.js'
import basic from './package/basic.js'

const routdefault = createRouter({
  history: createWebHashHistory(),
  routes: [...common, ...initPage, ...systemInfo, ...dict, ...basic],
})

export default routdefault
