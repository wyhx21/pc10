import { login, userLogout } from '@axios/system/account.js'
import { notification } from '@utils/messagerUtil.js'
import { title } from '@/config'
export default {
  namespaced: true,
  state: {
    roleId: null,
    roleType: null,
    sysId: null,
    userName: null,
    token: null,
    userInfo: {
      userCode: '',
      passWord: '',
      type: [],
    },
  },
  getters: {
    roleId: (_state) => _state.roleId,
    sysId: (_state) => _state.sysId,
    sysRoleValue: (_state) => {
      return [`${_state.sysId}`, `${_state.roleId}`]
    },
    userName: (_state) => _state.userName,
    token: (_state) => _state.token,
    userInfo: (_state) => _state.userInfo,
  },
  mutations: {
    // 登录信息
    loginInfo: (
      _state,
      { roleId = null, roleType = null, sysId = null, userName = null } = {}
    ) => {
      _state.roleId = roleId
      _state.roleType = roleType
      _state.userName = userName
      _state.sysId = sysId
    },
    token: (_state, { token } = {}) => (_state.token = token),
    userInfo: (_state, { userCode, passWord, type = [] } = {}) => {
      if (type.length < 1) {
        userCode = ''
        passWord = ''
      }
      _state.userInfo = { userCode, passWord, type }
    },
  },
  actions: {
    // 登录
    loginSubmit: async (
      { commit },
      { userCode = '', passWord = '', type = [] } = {}
    ) => {
      return new Promise((resolve, reject) => {
        login({ userCode, passWord })
          .then((res) => {
            commit('userInfo', { userCode, passWord, type })
            commit('loginInfo', res)
            commit('token', res)
            const hour = new Date().getHours()
            const thisTime =
              hour < 8
                ? '早上好'
                : hour <= 11
                ? '上午好'
                : hour <= 13
                ? '中午好'
                : hour < 18
                ? '下午好'
                : '晚上好'
            notification({
              message: `欢迎登录${title}`,
              description: `${thisTime}！`,
            })
            resolve()
          })
          .catch((err) => {
            commit('loginInfo', {})
            reject(err)
          })
      })
    },
    logOut: async ({ commit }) => {
      return new Promise((resolve, reject) => {
        userLogout()
          .then((res) => {
            commit('loginInfo')
            commit('token')
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
