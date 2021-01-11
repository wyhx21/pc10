import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/system/role/query', data, param)

const deleteRecode = (sysId) => axios.doGet(`/system/role/delete/${sysId}`)

const mergeRecord = (data) => axios.doPost(`/system/role/merge`, data)

const persistRecord = (data) => axios.doPost(`/system/role/persist`, data)

const queryRoleMenu = (roleId) => axios.doGet(`/system/role/roleMenu/${roleId}`)

export { queryPage, deleteRecode, mergeRecord, persistRecord, queryRoleMenu }
