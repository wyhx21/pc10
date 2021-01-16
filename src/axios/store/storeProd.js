import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/store/storeProd/findPage', data, param)

const queryDetailPage = (data, param) =>
  axios.doPost(`/store/storeProdDetail/detail`, data, param)

const exportData = (data) => axios.doPost(`/store/storeProd/export`, data)

const queryAreaProdNum = ({ areaId, productId }) =>
  axios.doGet(`/store/storeProd/findAreaProd/${areaId}/${productId}`)

export { queryPage, queryDetailPage, exportData, queryAreaProdNum }
