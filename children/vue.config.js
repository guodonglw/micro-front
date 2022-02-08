const path = require('path')
const { name } = require('./package');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    disableHostCheck: true, //  新增该配置项
    // proxy: {
    //   '/template': {
    //     //要访问的跨域的域名
    //     // target: 'http://test.fe.sohuno.com/',
    //     target: 'http://10.2.131.9:6677/',
    //     //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
    //     changOrigin: true,
    //   }
    // },
    before: app => {},
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  runtimeCompiler: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less'
    }
  },
  lintOnSave: true,
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式(必须)
      library: 'micro',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
