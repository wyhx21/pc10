import {
  queryPage,
  detailOrder,
  detailStore,
  deleteRecord,
  submitRecord,
  transferRecord,
} from '@axios/order/saleOrder.js'
import persist from './salePersist.js'

export default {
  namespaced: true,
  modules: {
    persist,
  },
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
    detailList: [],
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    totalPageSize: (_state) => _state.pageResult.total,
    currentData: (_state) => _state.currentData,
    detailList: (_state) => _state.detailList,
    perDetailOrder: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_detail_query')
    },
    perDetailStore: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_detail_store')
    },
    perSubmit: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_submit')
    },
    perTransfer: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_transfer')
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_delete')
    },
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'order_info_sale'
      )
      return arr.includes('order_info_sale_persist')
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
    detailList: (_state, list = []) => (_state.detailList = list),
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
    queryOrderDetail: async ({ getters, commit }) => {
      commit('detailList')
      detailOrder(getters.currentData['id'])
        .then((res) => {
          commit('detailList', res)
        })
        .catch(() => {
          commit('detailList')
        })
    },
    queryDetailStore: async ({ getters, commit }) => {
      commit('detailList')
      detailStore(getters.currentData['orderNo'])
        .then((res) => {
          commit('detailList', res)
        })
        .catch(() => {
          commit('detailList')
        })
    },
    deleteRecord: async ({ getters }) => {
      return deleteRecord(getters.currentData['id'])
    },
    submitRecord: async ({ getters }) => {
      return submitRecord(getters.currentData['id'])
    },
    transferRecord: async ({ getters }) => {
      return transferRecord(getters.currentData['id'])
    },
  },
}
