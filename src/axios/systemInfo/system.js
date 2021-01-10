import axios from '@axios/index.js'

const queryPage = (data) => axios.doPost('system/system/query', data)

const querySysMenu = (sysId) => axios.doGet(`/system/system/sysMenu/${sysId}`)

const mergeRecord = (data) => axios.doPost(`/system/system/merge`, data)

const persistRecord = (data) => axios.doPost(`/system/system/persist`, data)

export { queryPage, querySysMenu, mergeRecord, persistRecord }
