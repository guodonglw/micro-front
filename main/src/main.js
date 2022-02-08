import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { begin } from './qiankun'
import pager from './pager'

Vue.config.productionTip = false
Vue.use(Antd)

let app = null

function render ({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      data () {
        return {
          content: appContent,
          loading
        }
      },
      render (h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}

function initApp () {
  render({ appContent: '', loading: true })
}

initApp()

const msg = {
  data: store,
  pager: pager
}

// 开启微服务
begin(msg)
