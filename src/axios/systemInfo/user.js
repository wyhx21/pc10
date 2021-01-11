import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/system/user/query', data, param)

const mergeRecord = (data) => axios.doPost(`/system/user/merge`, data)

const persistRecord = (data) => axios.doPost(`/system/user/persist`, data)

const queryUserRole = (userId) => axios.doGet(`/system/user/userRole/${userId}`)

export { queryPage, mergeRecord, persistRecord, queryUserRole }
