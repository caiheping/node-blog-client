const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  baseUrl: process.env.NODE_ENV === 'production' ? '/blog/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    // 配置静态资源图片
    config.module.rules.delete('images')
    // 清除svg默认的处理方式
    config.module.rules.delete('svg')
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: [resolve('src/static/icons')],
          options: {
            symbolId: 'icon-[name]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
          exclude: [resolve('src/static/icons')],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        }
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.168:8003',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
