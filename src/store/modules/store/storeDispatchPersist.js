import { queryAreaProdList, queryAreaProdNum } from '@axios/store/storeProd.js'
import { Message } from '@utils/messagerUtil.js'
import { persistRecord } from '@axios/store/storeDispatch.js'
export default {
  namespaced: true,
  state: {
    sourceStoreId: null,
    toStoreId: null,
    remark: '',
    sourceAreaList: [],
    toAreaList: [],
    detailList: [],
    maxDetailId: 0,
  },
  getters: {
    sourceStoreId: (_state) => _state.sourceStoreId,
    toStoreId: (_state) => _state.toStoreId,
    remark: (_state) => _state.remark,
    sourceAreaList: (_state) => _state.sourceAreaList,
    toAreaList: (_state) => _state.toAreaList,
    detailList: (_state) => _state.detailList,
    storeDisabled: (_state) => _state.detailList.length > 0,
    detailDisabled: (_state) => {
      if (_state.sourceStoreId && _state.toStoreId) {
        return true
      }
      return false
    },
  },
  mutations: {
    init: (_state) => {
      _state.sourceStoreId = null
      _state.toStoreId = null
      _state.remark = ''
      _state.sourceAreaList = []
      _state.toAreaList = []
      _state.detailList = []
      _state.maxDetailId = 0
    },
    sourceStoreId: (_state, val) => (_state.sourceStoreId = val),
    toStoreId: (_state, val) => (_state.toStoreId = val),
    remark: (_state, val = '') => (_state.remark = val),
    sourceAreaList: (_state, val = []) => (_state.sourceAreaList = val),
    toAreaList: (_state, val = []) => (_state.toAreaList = val),
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
    setSourceAreaId: (_state, { detailId, sourceAreaId, list = [] }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      const sourceProdList = list.map((item) => {
        const { id: storeProdId, prodName, prodNum, prodUnit, prodId } = item
        return { storeProdId, prodName, prodNum, prodUnit, prodId }
      })
      row['keyIndex']++
      Object.assign(row, {
        sourceAreaId,
        sourceProdList,
      })
      delete row['sourceProdNum']
      delete row['storeProdId']
      delete row['prodId']
      delete row['toAreaId']
      delete row['toProdNum']
      delete row['prodNum']
    },
    setStoreProdId: (_state, { detailId, storeProdId }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      const oldCount = _state.detailList.filter(
        (item) => item['storeProdId'] == storeProdId
      ).length
      if (oldCount > 0) {
        Message({ message: '该记录已存在，请不要重复添加' })
        delete row['sourceProdNum']
        delete row['storeProdId']
        delete row['prodId']
        delete row['prodNum']
        delete row['toProdNum']
        delete row['toAreaId']
        row['keyIndex']++
        return
      }
      const { sourceProdList } = row
      if (!sourceProdList) {
        return
      }
      const [selectProd] = sourceProdList
        .filter((item) => item['storeProdId'] == storeProdId)
        .map((item) => {
          const { prodNum, prodUnit, prodId } = item
          return { sourceProdNum: `${prodNum}(${prodUnit})`, prodId }
        })
      const { sourceProdNum, prodId } = selectProd
      delete row['prodNum']
      delete row['toProdNum']
      delete row['toAreaId']
      row['keyIndex']++
      Object.assign(row, { sourceProdNum, storeProdId, prodId })
    },
    setToProdNum: (_state, { detailId, toProdNum = '0', toAreaId }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      if (row['sourceAreaId'] == toAreaId) {
        delete row['prodNum']
        delete row['toAreaId']
        delete row['toProdNum']
        row['keyIndex']++
        Message({ message: '不能相同区域调度' })
        return
      }
      row['keyIndex']++
      delete row['prodNum']
      Object.assign(row, {
        toProdNum,
        toAreaId,
      })
    },
    setProdNum: (_state, { detailId, prodNum }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      Object.assign(row, {
        prodNum,
      })
    },
  },
  actions: {
    setSourceAreaId: async ({ commit }, { detailId, sourceAreaId }) => {
      queryAreaProdList(sourceAreaId)
        .then((list) => {
          commit('setSourceAreaId', { detailId, sourceAreaId, list })
        })
        .catch(() => {
          commit('setSourceAreaId', { detailId })
        })
    },
    setToAreaId: async ({ commit }, { detailId, prodId, toAreaId }) => {
      queryAreaProdNum({ areaId: toAreaId, productId: prodId })
        .then((data) => {
          const { prodNum, prodUnit } = data
          const toProdNum = `${prodNum}(${prodUnit})`
          commit('setToProdNum', { detailId, toProdNum, toAreaId })
        })
        .catch(() => {
          commit('setToProdNum', { detailId, toAreaId })
        })
    },
    persistRecord: async ({ getters }) => {
      const sourceStoreId = getters.sourceStoreId
      const toStoreId = getters.toStoreId
      const remark = getters.remark
      const details = getters.detailList.map((item) => {
        const { sourceAreaId, toAreaId, storeProdId, prodNum } = item
        return { sourceAreaId, toAreaId, storeProdId, prodNum }
      })
      const param = {
        sourceStoreId,
        toStoreId,
        remark,
        details,
      }
      return persistRecord(param)
    },
  },
}
