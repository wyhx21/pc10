import {
  userRole,
  userMenu,
  userAuth,
  roleChange,
} from '@axios/system/account.js'

export default {
  namespaced: true,
  state: {
    roleInfo: [],
    roleMenu: {},
    roleAuth: {},
  },
  getters: {
    roleOptions: (_state) => {
      const _roleInfo = _state.roleInfo
      if (!_roleInfo) {
        return []
      }
      const options = _roleInfo.map((val) => {
        const { code, value: label, children } = val
        const chs = children.map((val2) => {
          const { code: code2, value: label2 } = val2
          return { value: code2, label: `${label2}` }
        })
        return { value: code, label: `${label}`, children: chs }
      })
      return options
    },
    roleMenu: (_state) => {
      if (!_state.roleMenu) {
        return []
      }
      return _state.roleMenu['children']
    },
    pageRoleAuth: (_state) => (code) => {
      const auth1 = _state.roleAuth[code]
      if (!auth1) {
        return []
      }
      return auth1
    },
    systemName: (_state, _getters, _rootState, _rootGetters) => {
      const sysId = _rootGetters['appSystem/account/sysId']
      const [system] = _state.roleInfo.filter((item) => item['code'] == sysId)
      return system?.value
    },
  },
  mutations: {
    roleInfo: (_state, roleInfo = []) => (_state.roleInfo = roleInfo),
    roleMenu: (_state, roleMenu = {}) => (_state.roleMenu = roleMenu),
    roleAuth: (_state, roleAuth = {}) => (_state.roleAuth = roleAuth),
    clearCache: (_state) => {
      _state.roleInfo = []
      _state.roleAuth = {}
      _state.roleMenu = {}
    },
  },
  actions: {
    // 初始化数据
    accountInit: async ({ dispatch }) => {
      dispatch('systemRole')
      dispatch('systemMenu')
      dispatch('systemAuth')
    },
    // 修改角色
    roleChange: async ({ commit, dispatch }, { roleId }) => {
      return new Promise((resolve, reject) => {
        roleChange(roleId)
          .then((res) => {
            commit('appSystem/account/loginInfo', res, { root: true })
            dispatch('systemMenu')
            dispatch('systemAuth')
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 角色信息
    systemRole: async ({ commit }) => {
      return new Promise((resolve) => {
        userRole()
          .then((res) => {
            commit('roleInfo', res)
            resolve(res)
          })
          .catch(() => {})
      })
    },
    // 系统菜单信息
    systemMenu: async ({ commit }) => {
      return new Promise((resolve) => {
        userMenu()
          .then((res) => {
            commit('roleMenu', res)
            resolve(res)
          })
          .catch(() => {})
      })
    },
    // 系统权限信息
    systemAuth: async ({ commit }) => {
      return new Promise((resolve) => {
        userAuth()
          .then((res) => {
            commit('roleAuth', res)
            resolve(res)
          })
          .catch(() => {})
      })
    },
  },
}
