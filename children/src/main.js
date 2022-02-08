import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let instance = null

function render (props = {}) {
  const { container } = props

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// webpack打包公共文件路径
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 生命周期
export async function bootstrap (props = {}) {
  Vue.prototype.$store1 = props.data
  Vue.prototype.$pager = props.pager
  Array.isArray(props) && props.prototype.map(pty => {
    Vue.prototype[pty.name] = pty.value
  })
}
export async function mount (props = {}) {
  render(props)
}
export async function unmount () {
  instance.$destroy()
}