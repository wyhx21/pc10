import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/statistics/orderProduct/queryPurchasePage', data, param)

const exportData = (data) =>
  axios.doPost(`/statistics/orderProduct/exportPurchase`, data)

export { queryPage, exportData }
