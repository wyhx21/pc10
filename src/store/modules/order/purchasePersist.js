import {
  supplierPage,
  productPage,
  persistRecord,
} from '@axios/order/purchaseOrder.js'

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
    },
    pageTotal: 0,
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
    pageTotal: (_state) => _state.pageTotal,
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
      }
      _state.pageTotal = 0
      _state.productList = []
      _state.supplierList = []
      _state.conponent = page
    },
    updateExtraAmount: (_state, value) => (_state.supplier.extraAmount = value),
    updateRemark: (_state, value) => (_state.supplier.remark = value),

    setParam1: (_state, value = '') => (_state.param.param1 = value),
    setParam2: (_state, value = '') => (_state.param.param2 = value),
    setTotalSize: (_state, value = 0) => (_state.pageTotal = value),
    setPageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      _state.pageInfo = { page, size }
    },

    setSupplier: (_state, supplier = {}) => (_state.supplier = supplier),
    setOrderProductList: (_state, list = []) =>
      (_state.orderProductList = list),

    setSupplierList: (_state, list = []) => (_state.supplierList = list),
    setProductList: (_state, list = []) => (_state.productList = list),

    updateProduct: (_state, { id, price = 0, prodNum = 0 }) => {
      const _orderProductList = _state.orderProductList
      const [rowData] = _orderProductList.filter((item) => item['id'] == id)
      const prodAmount = price * prodNum
      Object.assign(rowData, { price, prodNum, prodAmount })
    },
    updateProdRemark: (_state, { id, itemRemark }) => {
      const _orderProductList = _state.orderProductList
      const [rowData] = _orderProductList.filter((item) => item['id'] == id)
      Object.assign(rowData, { itemRemark })
    },
    deleteOrderProduct: (_state, id) => {
      _state.orderProductList = _state.orderProductList.filter(
        (item) => item['id'] != id
      )
    },
  },
  actions: {
    initQuery: async (
      { dispatch, getters, commit },
      { page = 1, size = 10 } = {}
    ) => {
      commit('setPageInfo', { page, size })
      if (getters.conponent == 'AppSupplier') {
        dispatch('querySupplier')
      } else if (getters.conponent == 'AppProduct') {
        dispatch('queryProduct')
      }
    },
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
    persistOrder: async ({ getters }) => {
      const supplier = getters.supplier
      const prodList = getters.orderProductList
      const data = {
        supplierId: supplier['id'],
        extraAmount: supplier['extraAmount'],
        remark: supplier['remark'],
      }
      const detailList = prodList.map((item) => {
        const [prodId, prodNum, prodPrice, remark] = [
          item['id'],
          item['prodNum'],
          item['price'],
          item['itemRemark'],
        ]
        return { prodId, prodNum, prodPrice, remark }
      })
      Object.assign(data, { detailList })
      return new Promise((resolve, reject) => {
        persistRecord(data)
          .then(() => {
            resolve()
          })
          .catch((err) => reject(err))
      })
    },
  },
}
