import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/system/dic/verifyType/query', data, param)

const mergeRecord = (data) => axios.doPost(`/system/dic/verifyType/merge`, data)

const persistRecord = (data) =>
  axios.doPost(`/system/dic/verifyType/persist`, data)

export { queryPage, mergeRecord, persistRecord }
