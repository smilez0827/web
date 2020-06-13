module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://132.232.18.227:8087',
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
