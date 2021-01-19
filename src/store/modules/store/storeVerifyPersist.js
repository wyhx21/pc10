export default {
  namespaced: true,
  state: {
    storeId: '',
    verifyCode: '',
    remark: '',
    details: [],
  },
  getters: {
    storeId: (_state) => _state.storeId,
    verifyCode: (_state) => _state.verifyCode,
    remark: (_state) => _state.remark,
    details: (_state) => _state.details,
    selecDisable: (_state) => _state.details.length > 0,
    detailDisabled: (_state) => {
      if (_state.storeId && _state.verifyCode) {
        return true
      }
      return false
    },
  },
  mutations: {
    init: (_state) => {
      _state.storeId = null
      _state.verifyCode = null
      _state.remark = ''
      _state.details = []
    },
    storeId: (_state, val) => (_state.storeId = val),
    verifyCode: (_state, val) => (_state.verifyCode = val),
    remark: (_state, val = '') => (_state.remark = val),
    details: (_state, val = []) => (_state.details = val),
  },
  actions: {
    persistRecord: () => {
      console.log('persistRecord')
      return
    },
  },
}
