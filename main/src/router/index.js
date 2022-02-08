import Vue from 'vue'
import VueRouter from 'vue-router'
import apis from '@/api'

Vue.use(VueRouter)

const routes = []

const config = {
  '/main': () => import('@/views/Home.vue')
}

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  const routes = router.options.routes
  console.log(routes)
  if (routes.length) {
    next()
  } else {
    apis.getMenu().then(menus => {
      menus.forEach(item => {
        if (item.type === 'main') {
          item.component = config[item.path]
        }
      })
      router.addRoutes(menus)
      router.options.routes = menus
      next({ ...to, replace: true })
    })
  }
})

export default router
