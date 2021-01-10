import {
  queryPage,
  querySysMenu,
  mergeRecord as meregeData,
} from '@axios/systemInfo/system.js'
import { treeSelectUtil } from '@utils/commonUtil.js'
export default {
  namespaced: true,
  state: {
    params: {
      sysCode: '',
      sysName: '',
    },
    dataList: [],
    currentData: {},
    menuIdList: [],
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
    menuIdList: (_state) => _state.menuIdList,
  },
  mutations: {
    queryParam: (_state, params = {}) => (_state.params = params),
    dataList: (_state, list = []) => (_state.dataList = list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    menuIdList: (_state, idList = []) =>
      (_state.menuIdList = idList.filter((item) => item != 1)),
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
    sysMenu: async ({ getters, commit }) => {
      const sysId = getters.currentData['id']
      return new Promise((resolve, reject) => {
        querySysMenu(sysId)
          .then((res) => {
            const { menuIds, trees } = res
            commit('menuIdList', menuIds)
            const idList = treeSelectUtil(trees, menuIds)
            resolve({ trees, idList })
          })
          .catch(() => reject())
      })
    },
    mergeRecode: async ({ getters }) => {
      let { id, deleted, remark, sysCode, sysName } = getters.currentData
      let menuIdList = getters.menuIdList
      const data = { menuIdList, id, deleted, remark, sysCode, sysName }
      return new Promise((resolve, reject) => {
        meregeData(data)
          .then(() => resolve())
          .catch(() => reject)
      })
    },
  },
}
