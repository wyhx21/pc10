import purchaseOrder from './order/purchaseOrder'
import saleOrder from './order/saleOrder'

export default {
  namespaced: true,
  modules: {
    purchaseOrder,
    saleOrder,
  },
}
