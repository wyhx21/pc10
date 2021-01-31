import saleOrder from './statistics/saleOrder.js'
import purchaseOrder from './statistics/purchaseOrder.js'
import saleOrderProduct from './statistics/saleOrderProduct.js'
import purchaseOrderProduct from './statistics/purchaseOrderProduct.js'

export default {
  namespaced: true,
  modules: {
    saleOrder,
    purchaseOrder,
    saleOrderProduct,
    purchaseOrderProduct,
  },
}
