import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import appPage from './modules/appPage.js'
import appSetting from './modules/appSetting.js'
import appSystem from './modules/appSystem.js'

const store = createStore({
  modules: {
    appPage,
    appSetting,
    appSystem,
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      modules: ['appSystem'],
    }).plugin,
  ],
})

export default store
