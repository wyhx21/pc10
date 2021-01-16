import store from './store/store.js'
import storeProd from './store/storeProd.js'
import storeSelector from './store/storeSelector.js'
import instore from './store/instore.js'
import outstore from './store/outstore.js'

export default {
  namespaced: true,
  modules: {
    store,
    storeSelector,
    storeProd,
    instore,
    outstore,
  },
}
