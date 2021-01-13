import axios from '@axios/index.js'

const queryPage = (data, param) => axios.doPost('/basic/cus/query', data, param)

const mergeRecord = (data) => axios.doPost(`/basic/cus/merge`, data)

const persistRecord = (data) => axios.doPost(`/basic/cus/persist`, data)

const exportData = (data) => axios.doPost(`/basic/cus/export`, data)

export { queryPage, mergeRecord, persistRecord, exportData }
