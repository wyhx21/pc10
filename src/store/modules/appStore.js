import store from './store/store.js'
import storeProd from './store/storeProd.js'
import storeSelector from './store/storeSelector.js'

export default {
  namespaced: true,
  modules: {
    store,
    storeSelector,
    storeProd,
  },
}
