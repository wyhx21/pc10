import { supplierPage, productPage } from '@axios/order/purchaseOrder.js'

export default {
  namespaced: true,
  state: {
    conponent: '',
    supplier: {},
    param: {
      param1: '',
      param2: '',
    },
    pageInfo: {
      page: 1,
      size: 10,
      total: 0,
    },
    supplierList: [],
    productList: [],
    orderProductList: [],
  },
  getters: {
    conponent: (_state) => _state.conponent,
    param: (_state) => _state.param,
    param1: (_state) => _state.param.param1,
    param2: (_state) => _state.param.param2,
    pageInfo: (_state) => _state.pageInfo,
    supplier: (_state) => _state.supplier,
    orderProductList: (_state) => _state.orderProductList,
    supplierList: (_state) => _state.supplierList,
    productList: (_state) => _state.productList,
  },
  mutations: {
    init: (_state) => {
      _state.conponent = 'AppMain'
      _state.supplier = {}
      _state.productList = []
      _state.supplierList = []
      _state.orderProductList = []
    },
    toPage: (_state, page) => {
      _state.param = {
        param1: '',
        param2: '',
      }
      _state.pageInfo = {
        page: 1,
        size: 10,
        total: 0,
      }
      _state.productList = []
      _state.supplierList = []
      _state.conponent = page
    },
    updateExtraAmount: (_state, value) => (_state.supplier.extraAmount = value),
    updateRemark: (_state, value) => (_state.supplier.remark = value),

    setParam1: (_state, value = '') => (_state.param.param1 = value),
    setParam2: (_state, value = '') => (_state.param.param2 = value),
    setTotalSize: (_state, value = 0) => (_state.pageInfo.total = value),
    setPageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      ;(_state.pageInfo.page = page), (_state.pageInfo.size = size)
    },

    setSupplier: (_state, supplier = {}) => (_state.supplier = supplier),
    setOrderProductList: (_state, list = []) =>
      (_state.orderProductList = list),

    setSupplierList: (_state, list = []) => (_state.supplierList = list),
    setProductList: (_state, list = []) => (_state.productList = list),
  },
  actions: {
    querySupplier: async ({ getters, commit }) => {
      const { param1: supplierCode, param2: supplierName } = getters.param
      const { page, size } = getters.pageInfo
      commit('setSupplierList')
      commit('setTotalSize')
      supplierPage({ supplierCode, supplierName }, { page, size })
        .then((result) => {
          const { total, data } = result
          commit('setSupplierList', data)
          commit('setTotalSize', total)
        })
        .catch(() => {})
    },
    queryProduct: async ({ getters, commit }) => {
      const { param1: prodCode, param2: prodName } = getters.param
      const { page, size } = getters.pageInfo
      commit('setProductList')
      commit('setTotalSize')
      productPage({ prodCode, prodName }, { page, size })
        .then((result) => {
          const { total, data } = result
          commit('setProductList', data)
          commit('setTotalSize', total)
        })
        .catch(() => {})
    },
  },
}
