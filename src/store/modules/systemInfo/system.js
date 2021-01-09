import { queryPage, querySysMenu } from '@axios/systemInfo/system.js'

export default {
  namespaced: true,
  state: {
    params: {
      sysCode: '',
      sysName: '',
    },
    dataList: [],
    currentData: {},
    sysMenu: {
      trees: [],
      idList: [],
    },
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'system_setting'
      )
      return arr.includes('system_setting_merge')
    },
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'system_setting'
      )
      return arr.includes('system_setting_persist')
    },
    currentData: (_state) => _state.currentData,
    sysMenuTrees: (_state) => _state.sysMenu.trees,
    sysMenuIds: (_state) => _state.sysMenu.idList,
  },
  mutations: {
    queryParam: (_state, params = {}) => (_state.params = params),
    dataList: (_state, list = []) => (_state.dataList = list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    sysMenu: (_state, { trees = [], idList = [] }) =>
      (_state.sysMenu = { trees, idList }),
  },
  actions: {
    queryPage: async ({ commit, getters }) => {
      commit('dataList')
      return new Promise((resolve, reject) => {
        queryPage(getters.params)
          .then((res) => {
            commit('dataList', res)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    sysMenu: async ({ getters }) => {
      const sysId = getters.currentData['id']
      querySysMenu(sysId)
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
    },
  },
}
