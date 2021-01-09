import request from '@axios/index.js'

export function getIconList(params) {
  return request({
    url: '/icon/getList',
    method: 'get',
    params,
  })
}
