import axios from '@axios/index.js'

const queryPage = (data) => axios.doPost('system/system/query', data)

const querySysMenu = (sysId) => axios.doGet(`/system/system/sysMenu/${sysId}`)

const mergeRecord = (data) => axios.doPost(`/system/system/merge`, data)

export { queryPage, querySysMenu, mergeRecord }
