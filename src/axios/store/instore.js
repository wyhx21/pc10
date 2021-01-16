import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/orderInfo/purchaseOrder/instoreOrder', data, param)

const queryDetail = (storeId) =>
  axios.doGet(`/orderInfo/orderDetail/instore/${storeId}`)

const mergeRecord = (data) => axios.doPost(`/store/storeProd/instore`, data)

export { queryPage, mergeRecord, queryDetail }
