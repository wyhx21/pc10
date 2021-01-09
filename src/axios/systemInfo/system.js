import axios from '@axios/index.js'

const queryPage = (data) => axios.doPost('system/system/query', data)

const querySysMenu = (sysId) => axios.doGet(`/system/system/sysMenu/${sysId}`)

export { queryPage, querySysMenu }
