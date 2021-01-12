import {
  queryPage,
  mergeRecord,
  persistRecord,
  queryUserRole,
} from '@axios/systemInfo/user.js'
import { treeSelectUtil } from '@utils/commonUtil.js'

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
      userCode: '',
      userName: '',
    },
    dataList: [],
    currentData: {},
    roleIdList: [],
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    roleIdList: (_state) => _state.roleIdList,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'user_setting'
      )
      return arr.includes('user_setting_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'user_setting'
      )
      return arr.includes('user_setting_merge')
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
    roleIdList: (_state, idList = []) => (_state.roleIdList = idList),
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
    userRole: async ({ getters, commit }) => {
      const userId = getters.currentData['id']
      return new Promise((resolve, reject) => {
        queryUserRole(userId)
          .then((res) => {
            const { roleIds, trees } = res
            commit('roleIdList', roleIds)
            const idList = treeSelectUtil(trees, roleIds)
            resolve({ trees, idList })
          })
          .catch(() => reject())
      })
    },
    dataMerge: async ({ getters }) => {
      const {
        id,
        userCode,
        userName,
        userPwd,
        sex,
        deleted,
      } = getters.currentData
      const roleIds = getters.roleIdList
      const param = {
        data: {
          id,
          userCode,
          userName,
          userPwd,
          sex,
          deleted,
        },
        roleIds,
      }
      return mergeRecord(param)
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        userCode,
        userName,
        userPwd,
        sex,
        deleted,
      } = getters.currentData
      const roleIds = getters.roleIdList
      const param = {
        data: {
          id,
          userCode,
          userName,
          userPwd,
          sex,
          deleted,
        },
        roleIds,
      }
      return persistRecord(param)
    },
  },
}
