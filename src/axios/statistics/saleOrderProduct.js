import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/statistics/orderProduct/querySalePage', data, param)

const exportData = (data) =>
  axios.doPost(`/statistics/orderProduct/exportSale`, data)

export { queryPage, exportData }
