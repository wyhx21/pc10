import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import appPage from './modules/appPage.js'
import appSetting from './modules/appSetting.js'
import appSystem from './modules/appSystem.js'
import appSystemInfo from './modules/appSystemInfo.js'
import appDict from './modules/appDict.js'
import appBasic from './modules/appBasic.js'
import appStore from './modules/appStore.js'

const store = createStore({
  modules: {
    appPage,
    appSetting,
    appSystem,
    appSystemInfo,
    appDict,
    appBasic,
    appStore,
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      modules: ['appSystem'],
    }).plugin,
  ],
})

export default store
