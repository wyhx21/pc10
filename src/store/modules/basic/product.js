import {
  queryPage,
  mergeRecord,
  persistRecord,
  exportData,
} from '@axios/basic/product.js'
import { prodTypeList } from '@axios/dict/prodType.js'
import { downloadExcel } from '@axios/common.js'

export default {
  namespaced: true,
  state: {
    pageInfo: {
      page: 1,
      size: 10,
    },
    pageResult: {
      total: 20,
      toalPage: 2,
    },
    params: {
      deleted: '',
      prodCode: '',
      prodName: '',
      prodType: '',
    },
    dataList: [],
    currentData: {},
    prodTypeList: [],
  },
  getters: {
    prodTypeList: (_state) => _state.prodTypeList,
    allProdTypeList: (_state) => {
      const all = { code: '', value: '全部' }
      return [all, ..._state.prodTypeList]
    },
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'prod_setting'
      )
      return arr.includes('prod_setting_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'prod_setting'
      )
      return arr.includes('prod_setting_merge')
    },
    perExport: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'prod_setting'
      )
      return arr.includes('prod_setting_export')
    },
    perUpload: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'prod_setting'
      )
      return arr.includes('prod_setting_upload')
    },
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = 10 } = {}) => {
      page = page < 1 ? 1 : page
      _state.pageInfo = { page, size }
    },
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total }
    },
    queryParam: (_state, params = {}) => (_state.params = params),
    dataList: (_state, list = []) => (_state.dataList = list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    prodTypeList: (_state, list = []) => (_state.prodTypeList = list),
  },
  actions: {
    prodTypeList: async ({ commit }) => {
      prodTypeList()
        .then((res) => {
          commit('prodTypeList', res)
        })
        .catch(() => {
          commit('prodTypeList')
        })
    },
    queryPage: async ({ commit, getters }) => {
      commit('dataList')
      return new Promise((resolve, reject) => {
        queryPage(getters.params, getters.pageInfo)
          .then((res) => {
            commit('pageResult', res)
            commit('dataList', res['data'])
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    exportData: async ({ getters }) => {
      return new Promise((resolve, reject) => {
        exportData(getters.params)
          .then(async (res) => {
            await downloadExcel(res)
            resolve(res)
          })
          .catch(() => reject())
      })
    },
    dataMerge: async ({ getters }) => {
      const {
        id,
        prodType,
        prodCode,
        prodName,
        purchPrice,
        salePrice,
        prodUnit,
        remark,
        deleted,
      } = getters.currentData
      return mergeRecord({
        id,
        prodType,
        prodCode,
        prodName,
        purchPrice,
        salePrice,
        prodUnit,
        remark,
        deleted,
      })
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        prodType,
        prodCode,
        prodName,
        purchPrice,
        salePrice,
        prodUnit,
        remark,
        deleted,
      } = getters.currentData
      return persistRecord({
        id,
        prodType,
        prodCode,
        prodName,
        purchPrice,
        salePrice,
        prodUnit,
        remark,
        deleted,
      })
    },
  },
}
