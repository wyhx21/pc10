import {
  queryPage,
  deleteRecode,
  mergeRecord,
  persistRecord,
} from '@axios/systemInfo/role.js'
const defaultPageSize = 10

export default {
  namespaced: true,
  state: {
    pageInfo: {
      page: 1,
      size: defaultPageSize,
    },
    pageResult: {
      total: 2 * defaultPageSize,
      toalPage: 2,
    },
    params: {
      roleCode: '',
      roleName: '',
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
      const arr = _rootGetters['userRoleAuth/pageRoleAuth']('role_setting')
      return arr.includes('role_setting_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['userRoleAuth/pageRoleAuth']('role_setting')
      return arr.includes('role_setting_merge')
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['userRoleAuth/pageRoleAuth']('role_setting')
      return arr.includes('role_setting_delete')
    },
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) => {
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
    dataMerge: async (args0, val = {}) => {
      return mergeRecord(val)
    },
    dataPersist: async (args0, val = {}) => {
      return persistRecord(val)
    },
    dataDelete: async (args0, id) => {
      return deleteRecode(id)
    },
  },
}
