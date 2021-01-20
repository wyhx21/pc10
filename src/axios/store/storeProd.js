import axios from '@axios/index.js'

const queryPage = (data, param) =>
  axios.doPost('/store/storeProd/findPage', data, param)

const queryDetailPage = (data, param) =>
  axios.doPost(`/store/storeProdDetail/detail`, data, param)

const exportData = (data) => axios.doPost(`/store/storeProd/export`, data)

const queryAreaProdNum = ({ areaId, productId }) =>
  axios.doGet(`/store/storeProd/findAreaProd/${areaId}/${productId}`)

const queryAreaProdList = (areaId) =>
  axios.doGet(`/store/storeProd/prodList/${areaId}`)

const queryOrderStoreDetail = ({ detailType, orderNo }) =>
  axios.doGet(
    `/store/storeProdDetail/orderStoreDetail/${detailType}/${orderNo}`
  )

export {
  queryPage,
  queryDetailPage,
  exportData,
  queryAreaProdNum,
  queryAreaProdList,
  queryOrderStoreDetail,
}
