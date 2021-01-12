import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/system/dic/prodType/query', data, param)

const mergeRecord = (data) => axios.doPost(`/system/dic/prodType/merge`, data)

const persistRecord = (data) =>
  axios.doPost(`/system/dic/prodType/persist`, data)

const prodTypeList = () => axios.doGet(`/system/dic/sysDic/prodType`)

export { queryPage, mergeRecord, persistRecord, prodTypeList }
