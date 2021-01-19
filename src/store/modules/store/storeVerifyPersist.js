export default {
  namespaced: true,
  state: {
    storeId: '',
    verifyCode: '',
    remark: '',
    detailList: [],
    maxDetailId: 0,
  },
  getters: {
    storeId: (_state) => _state.storeId,
    verifyCode: (_state) => _state.verifyCode,
    remark: (_state) => _state.remark,
    detailList: (_state) => _state.detailList,
    selecDisable: (_state) => _state.detailList.length > 0,
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
      _state.detailList = []
      _state.maxDetailId = 0
    },
    storeId: (_state, val) => (_state.storeId = val),
    verifyCode: (_state, val) => (_state.verifyCode = val),
    remark: (_state, val = '') => (_state.remark = val),
    detailList: (_state, val = []) => (_state.detailList = val),

    addRecord: (_state) => {
      _state.maxDetailId++
      const detailId = _state.maxDetailId
      _state.detailList.push({ detailId, keyIndex: 0 })
    },
    deleteRecord: (_state, detailId) => {
      _state.detailList = _state.detailList.filter(
        (item) => item['detailId'] != detailId
      )
    },
  },
  actions: {
    persistRecord: () => {
      console.log('persistRecord')
      return
    },
  },
}
