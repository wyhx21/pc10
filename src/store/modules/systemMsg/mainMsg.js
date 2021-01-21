import {
  queryPage,
  deleteRecode,
  mergeRecord,
  persistRecord,
} from '@axios/systemMsg/mainMsg.js'

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
      msgType: '',
      title: '',
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
    currentPage: (_state) => _state.pageInfo.page,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'system_msg_main'
      )
      return arr.includes('system_msg_main_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'system_msg_main'
      )
      return arr.includes('system_msg_main_merge')
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'system_msg_main'
      )
      return arr.includes('system_msg_main_delete')
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
        deleted,
        title,
        content,
        msgLink,
        beginTime,
        endTime,
        msgSort,
        msgType,
      } = getters.currentData
      return mergeRecord({
        id,
        deleted,
        title,
        content,
        msgLink,
        beginTime,
        endTime,
        msgSort,
        msgType,
      })
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        deleted,
        title,
        content,
        msgLink,
        beginTime,
        endTime,
        msgSort,
        msgType,
      } = getters.currentData
      return persistRecord({
        id,
        deleted,
        title,
        content,
        msgLink,
        beginTime,
        endTime,
        msgSort,
        msgType,
      })
    },
    dataDelete: async (args0, id) => {
      return deleteRecode(id)
    },
  },
}
