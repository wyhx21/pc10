import {
  queryPage,
  mergeRecord,
  persistRecord,
  areaQuery,
  areaMerge,
  areaPersist,
} from '@axios/store/store.js'

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
      storeCode: '',
      storeName: '',
      deleted: '',
    },
    dataList: [],
    currentData: {},
    currentArea: {},
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    currentArea: (_state) => _state.currentArea,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_setting'
      )
      return arr.includes('store_setting_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_setting'
      )
      return arr.includes('store_setting_merge')
    },
    perAreaQuery: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_setting'
      )
      return arr.includes('storeArea_setting_query')
    },
    perAreaPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_setting'
      )
      return arr.includes('storeArea_setting_persist')
    },
    perAreaMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_setting'
      )
      return arr.includes('storeArea_setting_merge')
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
    currentArea: (_state, data = {}) => (_state.currentArea = data),
    areaList: (_state, { id, areaList = [] }) => {
      const [data] = _state.dataList.filter((item) => item['id'] == id)
      Object.assign(data, { areaList })
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
    dataMerge: async ({ getters }) => {
      const {
        id,
        storeCode,
        storeName,
        address,
        remark,
        deleted,
      } = getters.currentData
      return mergeRecord({
        id,
        storeCode,
        storeName,
        address,
        remark,
        deleted,
      })
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        storeCode,
        storeName,
        address,
        remark,
        deleted,
      } = getters.currentData
      return persistRecord({
        id,
        storeCode,
        storeName,
        address,
        remark,
        deleted,
      })
    },
    storeAreaQuery: async ({ commit }, { id }) => {
      commit('areaList', { id })
      areaQuery(id)
        .then((areaList) => {
          commit('areaList', { id, areaList })
          return Promise.resolve()
        })
        .catch(() => {
          commit('areaList', { id })
          return Promise.resolve()
        })
    },
    storeAreaPersist: async ({ getters }) => {
      return areaPersist(getters.currentArea)
    },
    storeAreaMerge: async ({ getters }) => {
      return areaMerge(getters.currentArea)
    },
  },
}
