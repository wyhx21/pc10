import { queryPage, exportData } from '@axios/statistics/saleOrder.js'
import { downloadExcel } from '@axios/common.js'

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
      statisticBegin: '',
      statisticEnd: '',
      cusCode: '',
    },
    dataList: [],
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    perExport: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'statistics_order_sale'
      )
      return arr.includes('statistics_order_sale_export')
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
    exportData: async ({ getters }) => {
      return new Promise((resolve, reject) => {
        exportData(getters.params)
          .then(async (res) => {
            await downloadExcel(res)
            resolve(res)
          })
          .catch(() => reject())
      })
    },
  },
}
