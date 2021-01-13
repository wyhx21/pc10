import {
  queryPage,
  exportData,
  queryDetailPage,
} from '@axios/store/storeProd.js'
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
      areaId: '',
      storeId: '',
      prodCode: '',
    },
    dataList: [],
    currentData: {},
    detailPageInfo: {
      page: 1,
      size: 10,
    },
    detailTotal: 0,
    detailDataList: [],
  },
  getters: {
    detailPageInfo: (_state) => _state.detailPageInfo,
    detailTotal: (_state) => _state.detailTotal,
    detailDataList: (_state) => _state.detailDataList,
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_prod'
      )
      return arr.includes('store_prod_detail')
    },
    perExport: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_prod'
      )
      return arr.includes('store_prod_export')
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
    detailPageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      _state.detailPageInfo = { page, size }
    },
    detailTotal: (_state, total = 0) => (_state.detailTotal = total),
    detailDataList: (_state, list = []) => (_state.detailDataList = list),
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
    queryDetailPage: async ({ getters, commit }) => {
      const { areaId, prodId } = getters.currentData
      queryDetailPage({ areaId, prodId }, getters.detailPageInfo)
        .then((res) => {
          const { data, total } = res
          commit('detailDataList', data)
          commit('detailTotal', total)
        })
        .catch(() => {
          commit('detailDataList')
          commit('detailTotal')
        })
    },
  },
}
