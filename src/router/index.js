import { createRouter, createWebHashHistory } from 'vue-router'
import common from './package/common.js'
import initPage from './package/initPage.js'
import systemInfo from './package/systemInfo.js'
import dict from './package/dict.js'
import basic from './package/basic.js'
import store from './package/store.js'
import order from './package/order.js'
import systemMsg from './package/systemMsg.js'
import statistics from './package/statistics.js'

const routdefault = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...common,
    ...initPage,
    ...systemInfo,
    ...dict,
    ...basic,
    ...store,
    ...order,
    ...systemMsg,
    ...statistics,
  ],
})

export default routdefault
