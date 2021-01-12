import axios from '@axios/index.js'

const downloadFile = (url) =>
  axios
    .doGetBlob(url)
    .then((res) => {
      if (!res.data) {
        return
      }
      // 获取headers中的filename文件名
      const tempName = res.headers['content-disposition']
        .split(';')[1]
        .split('filename=')[1]
      // iconv-lite解决中文乱码
      const iconv = require('iconv-lite')
      // 忽略警告
      iconv.skipDecodeWarning = true
      const fileName = iconv.decode(tempName, 'UTF-8')
      // 转换成二进制对象
      const blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel;charset=UTF-8',
      })
      if ('download' in document.createElement('a')) {
        // 不是IE浏览器
        // 二进制对象转换成url地址
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        // 下载完成移除元素
        document.body.removeChild(link)
        // 释放掉blob对象
        window.URL.revokeObjectURL(url)
      } else {
        window.navigator.msSaveBlob(blob, fileName)
      }
      return
    })
    .catch((err) => {
      Promise.reject(err)
    })

const downloadExcel = (taskId) =>
  downloadFile(`/common/download/file/${taskId}`)

export { downloadExcel, downloadFile }
