import {
  customerPage,
  productPage,
  persistRecord,
} from '@axios/order/saleOrder.js'

export default {
  namespaced: true,
  state: {
    conponent: '',
    customer: {},
    param: {
      param1: '',
      param2: '',
    },
    pageInfo: {
      page: 1,
      size: 10,
    },
    pageTotal: 0,
    customerList: [],
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
    customer: (_state) => _state.customer,
    orderProductList: (_state) => _state.orderProductList,
    customerList: (_state) => _state.customerList,
    productList: (_state) => _state.productList,
  },
  mutations: {
    init: (_state) => {
      _state.conponent = 'AppMain'
      _state.customer = {}
      _state.productList = []
      _state.customerList = []
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
      _state.customerList = []
      _state.conponent = page
    },
    updateExtraAmount: (_state, value) => (_state.customer.extraAmount = value),
    updateRemark: (_state, value) => (_state.customer.remark = value),

    setParam1: (_state, value = '') => (_state.param.param1 = value),
    setParam2: (_state, value = '') => (_state.param.param2 = value),
    setTotalSize: (_state, value = 0) => (_state.pageTotal = value),
    setPageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      _state.pageInfo = { page, size }
    },

    setCustomer: (_state, customer = {}) => (_state.customer = customer),
    setOrderProductList: (_state, list = []) =>
      (_state.orderProductList = list),

    setCustomerList: (_state, list = []) => (_state.customerList = list),
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
      if (getters.conponent == 'AppCustomer') {
        dispatch('queryCustomer')
      } else if (getters.conponent == 'AppProduct') {
        dispatch('queryProduct')
      }
    },
    queryCustomer: async ({ getters, commit }) => {
      const { param1: cusCode, param2: cusName } = getters.param
      const { page, size } = getters.pageInfo
      commit('setCustomerList')
      commit('setTotalSize')
      customerPage({ cusCode, cusName }, { page, size })
        .then((result) => {
          const { total, data } = result
          commit('setCustomerList', data)
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
      const customer = getters.customer
      const prodList = getters.orderProductList
      const data = {
        cusId: customer['id'],
        extraAmount: customer['extraAmount'],
        remark: customer['remark'],
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
