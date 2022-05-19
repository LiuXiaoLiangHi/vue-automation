/**
 * 对项目进行配置，具体的内容请按照自己需求更该
 * 具体配置请在https://cli.vuejs.org/zh/config/#pages
 * 以及https://www.webpackjs.com/concepts/查看
 */
'use strict'
const path = require('path')

/**@description 主要是需要设置文档的title */
const defaultSettings = require('./src/settings.js')

/**@description 返回当前项目的绝对路径*/
function resolve(dir) {
    return path.join(__dirname, dir)
}
/**@argument name 页面的title */
const name = defaultSettings.title || 'vue Element Admin'

/**@argument port  项目的端口号*/
const port = process.env.port || process.env.npm_config_port || 9527 // 端口

/**@argument proxyTargetMap  需要代理的地址集合*/
const proxyTargetMap = {
    dev: 'xxxx',
    test: 'http://localhost:3000',
    prod: 'xxxxxx'
}

/**@argument proxyTargetMap   当前被代理的地址*/
const proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.prod

//webpack具体的配置项
module.exports = {
    //部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath一致，默认为 '/'
    publicPath: '/',
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录----打包后的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'static',
    //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
    lintOnSave: process.env.NODE_ENV === 'development',
    //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建---可具体查看文件报错的位置
    productionSourceMap: false,
    //服务的一些配置
    devServer: {
        //配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求
        disableHostCheck: true,
        // 是否项目启动自动打开浏览器
        open: true,
        // host位置
        host: 'localhost',
        // ???
        https: false,
        //设置为true话，如果编译报错，你再改成正确的，重新编译，浏览器不会刷新！否之相反
        hotOnly: false,
        // 项目端口号
        port: port,
        // eslint
        overlay: {
            warnings: false,
            errors: true
        },
        //服务器代理
        proxy: {
            '/api': {
                target: proxyTarget,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    configureWebpack: {

        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    chainWebpack(config) {
        //它可以提高第一个屏幕的速度，建议开启预加载
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        //当页面太多时，会导致太多无意义的请求,删除prefetch解决预加载失效的问题
        config.plugins.delete('prefetch')

        // 设置 svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config
       
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,

                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    //将elementUI拆分为单个包
                                    name: 'chunk-elementUI',
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'),  //可以自定义规则
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}
