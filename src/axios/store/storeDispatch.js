import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/store/dispacher/findPage', data, param)

const queryDetail = (orderId) =>
  axios.doGet(`/store/dispacherDetail/detail/${orderId}`)

const mergeRecord = (orderId) =>
  axios.doGet(`/store/dispacher/merge/${orderId}`)

const deleteRecord = (orderId) =>
  axios.doGet(`/store/dispacher/delete/${orderId}`)

const persistRecord = (data) => axios.doPost('/store/dispacher/persist', data)

export { queryPage, mergeRecord, queryDetail, deleteRecord, persistRecord }
