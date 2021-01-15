import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/orderInfo/purchaseOrder/query', data, param)

const persistRecord = (data) =>
  axios.doPost(`/orderInfo/purchaseOrder/persist`, data)

const deleteRecord = (orderId) =>
  axios.doGet(`/orderInfo/purchaseOrder/delete/${orderId}`)

const submitRecord = (orderId) =>
  axios.doGet(`/orderInfo/purchaseOrder/submit/${orderId}`)

const transferRecord = (orderId) =>
  axios.doGet(`/orderInfo/purchaseOrder/transfer/${orderId}`)

const detailOrder = (orderId) =>
  axios.doGet(`/orderInfo/orderDetail/purchase/${orderId}`)

const detailStore = (orderId) =>
  axios.doGet(`/store/storeProdDetail/orderNo/${orderId}`)

const supplierPage = (param, page) =>
  axios.doPost('/basic/supplier/supplier', param, page)

const productPage = (param, page) =>
  axios.doPost('/basic/product/purchase', param, page)

export {
  queryPage,
  persistRecord,
  deleteRecord,
  submitRecord,
  transferRecord,
  detailOrder,
  detailStore,
  supplierPage,
  productPage,
}
