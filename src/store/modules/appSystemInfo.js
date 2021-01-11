import system from './systemInfo/system.js'
import role from './systemInfo/role.js'
import user from './systemInfo/user.js'

export default {
  namespaced: true,
  modules: {
    system,
    role,
    user,
  },
}
