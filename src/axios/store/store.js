import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/store/store/query', data, param)

const mergeRecord = (data) => axios.doPost(`/store/store/merge`, data)

const persistRecord = (data) => axios.doPost(`/store/store/persist`, data)

const areaQuery = (storeId) => axios.doGet(`/store/storeArea/list/${storeId}`)

const areaMerge = (data) => axios.doPost(`/store/storeArea/merge`, data)

const areaPersist = (data) => axios.doPost(`/store/storeArea/persist`, data)

const querySysStore = () => axios.doGet(`/store/store/sysStore`)

const queryStoreArea = (storeId) =>
  axios.doGet(`/store/storeArea/sysArea/${storeId}`)

export {
  queryPage,
  mergeRecord,
  persistRecord,
  areaQuery,
  areaMerge,
  areaPersist,
  querySysStore,
  queryStoreArea,
}
