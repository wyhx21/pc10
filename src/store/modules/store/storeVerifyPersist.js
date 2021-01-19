import { queryAreaProdList } from '@axios/store/storeProd.js'
import { Message } from '@utils/messagerUtil.js'
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

    setAreaId: (_state, { detailId, areaId, list = [] }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      const prodList = list.map((item) => {
        const { id: storeProdId, prodName, prodNum, prodUnit } = item
        return { storeProdId, prodName, prodNum, prodUnit }
      })
      row['keyIndex']++
      Object.assign(row, {
        areaId,
        prodList,
      })
      delete row['storeProdId']
      delete row['storeNum']
      delete row['verifiType']
      delete row['prodNum']
      delete row['remark']
    },
    selectProduct: (_state, { detailId, storeProdId }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      const { prodList } = row
      if (!prodList) {
        return
      }
      const [prod] = prodList.filter(
        (item) => item['storeProdId'] == storeProdId
      )
      if (!prod) {
        return
      }
      const oldCount = _state.detailList.filter(
        (item) => item['storeProdId'] == storeProdId
      ).length
      if (oldCount > 0) {
        Message({ message: '该记录已存在，请不要重复添加' })
        delete row['verifiType']
        delete row['prodNum']
        delete row['remark']
        delete row['storeProdId']
        delete row['storeNum']
        row['keyIndex']++
        return
      }
      const { prodNum, prodUnit } = prod
      const storeNum = `${prodNum}(${prodUnit})`
      row['keyIndex']++
      Object.assign(row, {
        storeProdId,
        storeNum,
      })
      delete row['verifiType']
      delete row['prodNum']
      delete row['remark']
    },
    selectVerifyType: (_state, { verifiType, detailId }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      row['keyIndex']++
      Object.assign(row, {
        verifiType,
      })
      delete row['prodNum']
      delete row['remark']
    },
    updateProdNum: (_state, { prodNum, detailId }) => {
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
    updateRemark: (_state, { remark, detailId }) => {
      const [row] = _state.detailList.filter(
        (item) => item['detailId'] == detailId
      )
      if (!row) {
        return
      }
      Object.assign(row, {
        remark,
      })
    },
  },
  actions: {
    selectArea: ({ commit }, { areaId, detailId }) => {
      queryAreaProdList(areaId)
        .then((list) => {
          commit('setAreaId', { detailId, areaId, list })
        })
        .catch(() => {
          commit('setAreaId', { detailId })
        })
    },
    persistRecord: () => {
      console.log('persistRecord')
      return
    },
  },
}
