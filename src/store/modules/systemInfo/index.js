import { queryMsg } from '@axios/system/account.js'

export default {
  namespaced: true,
  state: {
    pageInfo: {
      page: 1,
      size: 100,
    },
    dataList: [],
  },
  getters: {
    pageInfo: (_state) => _state.pageInfo,
    dataList: (_state) => _state.dataList,
  },
  mutations: {
    dataList: (_state, list = []) => (_state.dataList = list),
  },
  actions: {
    queryMsg: async ({ commit, getters }) => {
      commit('dataList')
      return new Promise((resolve) => {
        queryMsg(getters.pageInfo)
          .then((res) => {
            commit('dataList', res['data'])
            resolve()
          })
          .catch(() => {
            commit('dataList')
            resolve()
          })
      })
    },
  },
}
