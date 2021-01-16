import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/orderInfo/saleOrder/outstoreOrder', data, param)

const queryDetail = (storeId) =>
  axios.doGet(`/orderInfo/orderDetail/outstore/${storeId}`)

const mergeRecord = (data) => axios.doPost(`/store/storeProd/outstore`, data)

export { queryPage, mergeRecord, queryDetail }
