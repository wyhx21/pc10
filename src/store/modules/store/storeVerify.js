import {
  queryPage,
  queryDetail,
  orderConfirm,
  orderDelete,
} from '@axios/store/storeVerify.js'
import { verifyTypeList } from '@axios/dict/verifyType.js'

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
      orderNo: '',
      storeId: '',
      verifiCode: '',
      verifiStatus: '',
    },
    dataList: [],
    currentData: {},
    detailList: [],
    verifyTypeList: [],
  },
  getters: {
    verifyTypeList: (_state) => _state.verifyTypeList,
    allVerifyTypeList: (_state) => {
      const all = { code: '', value: '全部' }
      return [all, ..._state.verifyTypeList]
    },
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    detailList: (_state) => _state.detailList,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_verifi'
      )
      return arr.includes('store_verifi_persist')
    },
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_verifi'
      )
      return arr.includes('store_verifi_detail')
    },
    perConfirm: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_verifi'
      )
      return arr.includes('store_verifi_confirm')
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'store_verifi'
      )
      return arr.includes('store_verifi_delete')
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
    verifyTypeList: (_state, list = []) => (_state.verifyTypeList = list),
  },
  actions: {
    verifyTypeList: async ({ commit }) => {
      verifyTypeList()
        .then((res) => {
          commit('verifyTypeList', res)
        })
        .catch(() => {
          commit('verifyTypeList')
        })
    },
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
      return orderDelete(id)
    },
    confirmRecord: async ({ getters }) => {
      const { id } = getters.currentData
      return orderConfirm(id)
    },
    //
  },
}
