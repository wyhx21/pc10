import router from '@router'
import store from '@store'
import { titleReverse, titleSeparator } from '@/config'

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    store.commit('appSystem/account/loginInfo')
    store.commit('appSystem/account/token')
    store.commit('appSystem/userRoleAuth/clearCache')
  }
  if (to.matched.length < 1) {
    return next('/error/404')
  }
  next()
})

router.afterEach((to) => {
  document.title = getPageTitle(to)
})

const getPageTitle = (to) => {
  const title = store.getters['appSystem/userRoleAuth/systemName']
  const pageTitle = to?.meta?.title
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
