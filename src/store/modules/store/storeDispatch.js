import {
  queryPage,
  queryDetail,
  mergeRecord,
  deleteRecord,
} from '@axios/store/storeDispatch.js'
import persist from './storeDispatchPersist.js'

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
      disPacherStatus: '',
      orderNo: '',
      sourceStoreId: '',
      toStoreId: '',
    },
    dataList: [],
    currentData: {},
    detailList: [],
  },
  getters: {
    dataList: (_state) => _state.dataList,
    detailList: (_state) => _state.detailList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_dispather'
      )
      return arr.includes('store_dispather_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_dispather'
      )
      return arr.includes('store_dispather_merge')
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_dispather'
      )
      return arr.includes('store_dispather_delete')
    },
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_dispather'
      )
      return arr.includes('store_dispather_detail')
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
    detailList: (_state, list = []) => (_state.detailList = list),
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
    queryDetail: async ({ getters, commit }) => {
      commit('detailList')
      const { id } = getters.currentData
      queryDetail(id)
        .then((res) => {
          commit('detailList', res)
        })
        .catch(() => {})
    },
    deleteRecord: async ({ getters }) => {
      const { id } = getters.currentData
      return deleteRecord(id)
    },
    confirmRecord: async ({ getters }) => {
      const { id } = getters.currentData
      return mergeRecord(id)
    },
    // todo
  },
}
