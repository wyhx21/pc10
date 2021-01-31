import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/statistics/order/querySalePage', data, param)

const exportData = (data) => axios.doPost(`/statistics/order/exportSale`, data)

export { queryPage, exportData }
