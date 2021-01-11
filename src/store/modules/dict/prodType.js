import { queryPage, mergeRecord, persistRecord } from '@axios/dict/prodType.js'

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
      dicKey: '',
      dicValue: '',
    },
    dataList: [],
    currentData: {},
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'dic_prodType'
      )
      return arr.includes('dic_prodType_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'dic_prodType'
      )
      return arr.includes('dic_prodType_merge')
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
    dataMerge: async ({ getters }) => {
      const {
        id,
        dicKey,
        dicValue,
        deleted,
        remark,
        dicSort,
      } = getters.currentData
      return mergeRecord({ id, dicKey, dicValue, deleted, remark, dicSort })
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        dicKey,
        dicValue,
        deleted,
        remark,
        dicSort,
      } = getters.currentData
      return persistRecord({ id, dicKey, dicValue, deleted, remark, dicSort })
    },
  },
}
