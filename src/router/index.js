import { createRouter, createWebHashHistory } from 'vue-router'
import common from './package/common.js'
import initPage from './package/initPage.js'
import systemInfo from './package/systemInfo.js'
import dict from './package/dict.js'
import basic from './package/basic.js'
import store from './package/store.js'
import order from './package/order.js'

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
  ],
})

export default routdefault
