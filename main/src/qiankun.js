// 导入qiankun
import { registerMicroApps, start } from 'qiankun'
import apis from './api'
const { VUE_APP_CURRENTMODE, VUE_APP_LOCAL_MICRO } = process.env

function genActiveRule (routerPrefix) {
  return location => location.hash.startsWith(routerPrefix)
}

// 处理菜单
function flatMenu (menus, msg) {
  const res = []
  let i = 0
  const fn = item => {
    i++
    const { type, microUrl } = item
    if (type === 'micro') {
      const row = {
      name: 'micro' + i,
      entry: microUrl,
      container: '#mainContainer', // 子应用所在容器
      activeRule: genActiveRule(`#${item.path}`),
      props: msg
    }
    // 本地开发时替换url
    if (VUE_APP_CURRENTMODE === 'local') {
      row.entry = VUE_APP_LOCAL_MICRO
    }
    res.push(row)
    }
  }
  menus.forEach(item => {
    fn(item)
  })
  return res
}

function startQiankun (menus) {
  // 注册子应用
  registerMicroApps(
    [...menus],
    {
      beforeLoad: [
        app => {
          console.log('before load', app)
        }
      ], // 挂载前回调
      beforeMount: [
        app => {
          console.log('before mount', app)
        }
      ], // 挂载后回调
      afterUnmount: [
        app => {
          console.log('after unload', app)
        }
      ] // 卸载后回调
    }
  )

  // 开启服务
  start()
}

export const begin = (msg) => {
  apis.getMenu().then(menus => {
    const menu = flatMenu(menus, msg)
    startQiankun(menu)
  })
}
