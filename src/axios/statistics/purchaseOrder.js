import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/statistics/order/queryPurchasePage', data, param)

const exportData = (data) =>
  axios.doPost(`/statistics/order/exportPurchase`, data)

export { queryPage, exportData }
