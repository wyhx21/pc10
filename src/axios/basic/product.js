import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/basic/product/query', data, param)

const mergeRecord = (data) => axios.doPost(`/basic/product/merge`, data)

const persistRecord = (data) => axios.doPost(`/basic/product/persist`, data)

const exportData = (data) => axios.doPost(`/basic/product/export`, data)

export { queryPage, mergeRecord, persistRecord, exportData }
