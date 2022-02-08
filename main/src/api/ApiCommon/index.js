
const apis = {
  getMenu: () => {
    return new Promise((resolve, reject) => {
      const menus = [
        {
          type: 'main',
          path: '/main',
          name: '主项目',
          microUrl: 'http://localhost:8888'
        },
        {
          type: 'micro',
          path: '/micro',
          name: '子项目',
          microUrl: 'http://localhost:8888'
        }
      ]
      resolve(menus)
    })
  }
}

export default apis
