import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/orderInfo/saleOrder/query', data, param)

const persistRecord = (data) =>
  axios.doPost(`/orderInfo/saleOrder/persist`, data)

const deleteRecord = (orderId) =>
  axios.doGet(`/orderInfo/saleOrder/delete/${orderId}`)

const submitRecord = (orderId) =>
  axios.doGet(`/orderInfo/saleOrder/submit/${orderId}`)

const transferRecord = (orderId) =>
  axios.doGet(`/orderInfo/saleOrder/transfer/${orderId}`)

const detailOrder = (orderId) =>
  axios.doGet(`/orderInfo/orderDetail/sale/${orderId}`)

const detailStore = (orderId) =>
  axios.doGet(`/store/storeProdDetail/orderNo/${orderId}`)

export {
  queryPage,
  persistRecord,
  deleteRecord,
  submitRecord,
  transferRecord,
  detailOrder,
  detailStore,
}
