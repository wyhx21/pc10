import { queryPage, queryDetail, mergeRecord } from '@axios/store/outstore.js'
import { queryAreaProdNum } from '@axios/store/storeProd.js'

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
      orderNo: '',
    },
    dataList: [],
    currentData: {},
    storeId: '',
    detailList: [],
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    storeId: (_state) => _state.storeId,
    detailList: (_state) => _state.detailList,
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_outstore'
      )
      return arr.includes('store_outstore_handle')
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
    storeId: (_state, storeId) => {
      _state.detailList.map((item) => {
        delete item['areaId']
        delete item['storeNum']
        delete item['storeProdId']
      })
      _state.storeId = storeId
    },
    selectDetailArea: (_state, { id, areaId, storeNum, storeProdId }) => {
      const [row] = _state.detailList.filter((item) => item['id'] == id)
      if (!row) {
        return
      }
      Object.assign(row, {
        areaId,
        storeNum,
        storeProdId,
      })
    },
    delteDetailArea: (_state, id) => {
      const [row] = _state.detailList.filter((item) => item['id'] == id)
      if (!row) {
        return
      }
      delete row['areaId']
      delete row['storeNum']
      delete row['storeProdId']
    },
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
    queryDetail: async ({ commit, getters }) => {
      const { id } = getters.currentData
      commit('detailList')
      queryDetail(id)
        .then((list) => {
          commit('detailList', list)
        })
        .catch(() => {})
    },
    selectArea: async ({ commit }, { areaId, productId, id }) => {
      queryAreaProdNum({ areaId, productId })
        .then((res) => {
          const { id: storeProdId, prodNum: storeNum } = res
          commit('selectDetailArea', { id, areaId, storeNum, storeProdId })
        })
        .catch(() => {
          commit('delteDetailArea', id)
        })
    },
    dataMerge: async ({ getters }) => {
      const { id: orderId } = getters.currentData
      const storeId = getters.storeId
      const details = getters.detailList.map((item) => {
        const { storeProdId, id: orderDetailId } = item
        return { storeProdId, orderDetailId }
      })
      const params = {
        details,
        storeId,
        orderId,
      }
      return mergeRecord(params)
    },
  },
}
