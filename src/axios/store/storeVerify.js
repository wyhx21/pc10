import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/store/storeVerifi/findPage', data, param)

const queryDetail = (orderId) =>
  axios.doGet(`/store/storeVerifiDetail/detail/${orderId}`)

const orderPersist = (data) => axios.doPost('/store/storeVerifi/persist', data)

const orderConfirm = (orderId) =>
  axios.doGet(`/store/storeVerifi/confirm/${orderId}`)

const orderDelete = (orderId) =>
  axios.doGet(`/store/storeVerifi/delete/${orderId}`)

export { queryPage, orderPersist, queryDetail, orderConfirm, orderDelete }
