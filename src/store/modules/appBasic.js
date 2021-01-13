import product from './basic/product.js'
import customer from './basic/customer.js'
import supplier from './basic/supplier.js'

export default {
  namespaced: true,
  modules: {
    product,
    customer,
    supplier,
  },
}
