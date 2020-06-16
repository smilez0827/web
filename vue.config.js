module.exports = {
  publicPath:'./',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://132.232.18.227:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      '/pic': {
        target: 'http://132.232.18.227:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/pic': ''
        },
      },
    }
  },
}
