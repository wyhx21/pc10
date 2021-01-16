export default {
  namespaced: true,
  state: {
    sourceStoreId: null,
    toStoreId: null,
    remark: '',
    sourceAreaList: [],
    toAreaList: [],
    detailList: [],
  },
  getters: {
    sourceStoreId: (_state) => _state.sourceStoreId,
    toStoreId: (_state) => _state.toStoreId,
    remark: (_state) => _state.remark,
    sourceAreaList: (_state) => _state.sourceAreaList,
    toAreaList: (_state) => _state.toAreaList,
    detailList: (_state) => _state.detailList,
  },
  mutations: {
    init: (_state) => {
      _state.sourceStoreId = null
      _state.toStoreId = null
      _state.remark = ''
      _state.sourceAreaList = []
      _state.toAreaList = []
      _state.detailList = []
    },
    sourceStoreId: (_state, val) => (_state.sourceStoreId = val),
    toStoreId: (_state, val) => (_state.toStoreId = val),
    remark: (_state, val = '') => (_state.remark = val),
    sourceAreaList: (_state, val = []) => (_state.sourceAreaList = val),
    toAreaList: (_state, val = []) => (_state.toAreaList = val),
    detailList: (_state, val = []) => (_state.detailList = val),
  },
  actions: {},
}
