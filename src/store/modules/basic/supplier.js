import {
  queryPage,
  mergeRecord,
  persistRecord,
  exportData,
} from '@axios/basic/supplier.js'
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
      supplierCode: '',
      supplierName: '',
      deleted: '',
      linkName: '',
      mobile: '',
    },
    dataList: [],
    currentData: {},
  },
  getters: {
    dataList: (_state) => _state.dataList,
    params: (_state) => _state.params,
    pageInfo: (_state) => _state.pageInfo,
    currentData: (_state) => _state.currentData,
    totalPageSize: (_state) => _state.pageResult.total,
    currentPage: (_state) => _state.pageInfo.page,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'supplier_setting'
      )
      return arr.includes('supplier_setting_persist')
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'supplier_setting'
      )
      return arr.includes('supplier_setting_merge')
    },
    perExport: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'supplier_setting'
      )
      return arr.includes('supplier_setting_export')
    },
    perUpload: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters['appSystem/userRoleAuth/pageRoleAuth'](
        'supplier_setting'
      )
      return arr.includes('supplier_setting_upload')
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
  },
  actions: {
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
        supplierCode,
        supplierName,
        linkName,
        sex,
        mobile,
        address,
        remark,
        deleted,
      } = getters.currentData
      return mergeRecord({
        id,
        supplierCode,
        supplierName,
        linkName,
        sex,
        mobile,
        address,
        remark,
        deleted,
      })
    },
    dataPersist: async ({ getters }) => {
      const {
        id,
        supplierCode,
        supplierName,
        linkName,
        sex,
        mobile,
        address,
        remark,
        deleted,
      } = getters.currentData
      return persistRecord({
        id,
        supplierCode,
        supplierName,
        linkName,
        sex,
        mobile,
        address,
        remark,
        deleted,
      })
    },
  },
}
