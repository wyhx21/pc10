import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/system/message/findPage', data, param)

const deleteRecode = (id) => axios.doGet(`/system/message/delete/${id}`)

const mergeRecord = (data) => axios.doPost(`/system/message/merge`, data)

const persistRecord = (data) => axios.doPost(`/system/message/persist`, data)

export { queryPage, deleteRecode, mergeRecord, persistRecord }
