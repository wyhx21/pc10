import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/basic/supplier/query', data, param)

const mergeRecord = (data) => axios.doPost(`/basic/supplier/merge`, data)

const persistRecord = (data) => axios.doPost(`/basic/supplier/persist`, data)

const exportData = (data) => axios.doPost(`/basic/supplier/export`, data)

export { queryPage, mergeRecord, persistRecord, exportData }
