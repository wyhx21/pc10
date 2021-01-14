import { queryPage } from '@axios/order/purchaseOrder.js'

export default {
  namespaced: true,
  state: {
    pageInfo: {
      page: 1,
      size: 10,
    },
    pageResult: {
      total: 20,
      toalPage: 2,
    },
    params: {
      cusCode: '',
      orderAmountMax: '',
      orderAmountMin: '',
      orderNo: '',
      orderStatus: '',
      orderTimeBegin: '',
      orderTimeEnd: '',
    },
    dataList: [],
    currentData: {},
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    perDetailOrder: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_purchase'
      )
      return arr.includes('order_info_purchase_detail_query')
    },
    perDetailStore: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_purchase'
      )
      return arr.includes('order_info_purchase_detail_store')
    },
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      _state.pageInfo = { page, size }
    },
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total }
    },
    queryParam: (_state, params = {}) => (_state.params = params),
    dataList: (_state, list = []) => (_state.dataList = list),
    currentData: (_state, data = {}) => (_state.currentData = data),
  },
  actions: {
    queryPage: async ({ commit, getters }) => {
      commit('dataList')
      return new Promise((resolve, reject) => {
        queryPage(getters.params, getters.pageInfo)
          .then((res) => {
            commit('pageResult', res)
            commit('dataList', res['data'])
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
