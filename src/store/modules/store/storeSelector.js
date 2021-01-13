import { querySysStore, queryStoreArea } from '@axios/store/store.js'

export default {
  namespaced: true,
  state: {
    all: [{ code: '', value: '全部' }],
    storeList: [],
    storeAreaList: [],
  },
  getters: {
    storeList: (_state) => _state.storeList,
    storeAreaList: (_state) => _state.storeAreaList,
    allStoreList: (_state) => [..._state.all, ..._state.storeList],
    allStoreAreaList: (_state) => [..._state.all, ..._state.storeAreaList],
  },
  mutations: {
    setStoreList: (_state, list = []) => (_state.storeList = list),
    setStoreAreaList: (_state, list = []) => (_state.storeAreaList = list),
  },
  actions: {
    querySysStore: async ({ commit }) => {
      commit('setStoreList')
      return new Promise((resolve, reject) => {
        querySysStore()
          .then((res) => {
            commit('setStoreList', res)
            resolve()
          })
          .catch(() => {
            commit('setStoreList')
            reject()
          })
      })
    },
    queryStoreArea: async ({ commit }, storeId) => {
      commit('setStoreAreaList')
      if (!storeId) {
        return
      }
      return new Promise((resolve, reject) => {
        queryStoreArea(storeId)
          .then((res) => {
            commit('setStoreAreaList', res)
            resolve()
          })
          .catch(() => {
            commit('setStoreAreaList')
            reject()
          })
      })
    },
  },
}
