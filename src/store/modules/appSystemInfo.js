import system from './systemInfo/system.js'
import role from './systemInfo/role.js'
import user from './systemInfo/user.js'
import index from './systemInfo/index.js'

export default {
  namespaced: true,
  modules: {
    system,
    role,
    user,
    index,
  },
}
