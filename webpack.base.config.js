const path = require('path');
let htmlWepackPlugin = require('html-webpack-plugin');             // 打包生成一个html文件
let miniCssExtractPlugin = require('mini-css-extract-plugin');     // 将css 文件单独打包，不作为style标签插入到head标签中
let optimizeCss = require('optimize-css-assets-webpack-plugin');   // 压缩单独打包的css，使用后需使用uglifyjs对js文件进行压缩优化
let uglifyJs = require('uglifyjs-webpack-plugin');                 //优化压缩js
let cleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
module.exports = {

    // entry: './index.js',
    entry: {
        home: './index.js',         //多文件入口
        other: './other.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),        
        filename: '[name].[hash:8].js',   //文件名hash值，:8 只显示8位hash值  
    },
    // output: {
    //     path: path.resolve(__dirname, 'build'),        
    //     filename: 'bundle.[hash:8].js',   //文件名hash值，:8 只显示8位hash值
    //     //publicpath: 'https://xxx'  //给资源统一加上前缀  
    // },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: 'file-loader'
            // },
            {
                test: /\.(png|jpg|gif)$/,  //当图片小于xkb时，使用url-loader转换成base64，否则使用file-loader现实真实的图片地址
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200 *1024,
                        output: '/img/',  //添加输出目录
                        // publicPath: 'https://xxx'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',              //主要用于解析路径  处理@import css语法
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',      //es6 转换成 es5
                    options: {
                        presets: [                // 大插件集合
                            '@babel/preset-env'
                        ],
                        plugins: [              // 配置各个小插件 
                            '@babel/plugin-proposal-class-properties',        // 转换 class 语法
                            // '@babel/plugin-proposal-decorators'               // 转换装饰器语法 @
                        ]
                    }
                }
            },
            // {
            //     test: require.resolve('jquery'),           //暴露全局变量$
            //     use: 'expose-loader?$'
            // }
        ],
    },
    resolve: {   // 解析第三方模块
        modules: [path.resolve('node_modules'),path.resolve('src')],
        mainFields: ['style','main'],    // 先找 style 对应的文件，找不到再找main对应的文件
        alias: {   //别名
            $: 'jquery/index.js'
        }
    },
    externals: {          // 外部模块，不打包进build中
        jquery: '$'
    },
    plugins: [
        // new webpack.DefinePlugin({             // 定义环境变量
        //     DEV: JSON.stringify('dev')    
        // }),
        new cleanWebpackPlugin(['build']),
        new htmlWepackPlugin({         // 打包后的文件夹会自动生成一个入口html文件，并引用入口js文件
            template: './index.html',  //以index.html作为引用模板
            filename: 'index.html',     //生成的文件名（可另取名字）
            chunks: ['home'],   //引用哪个文件，对应入口文件
            minify: {
                removeAttributeQuotes: true,    //删除html标签属性的双引号
                collapseWhitespace: true,       // 折叠空行

            },
            hash: true           // 文件名后面加上hash  filename.ext?has
        }),
        new htmlWepackPlugin({         // 打包后的文件夹会自动生成一个入口html文件，并引用入口js文件
            template: './index.html',  //以index.html作为引用模板
            filename: 'index.html',     //生成的文件名（可另取名字）
            chunks: ['other'],   //引用哪个文件，对应入口文件
        }),
        new miniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'              // 在每个模块中都注入一个$, 但window 全局变量中无法访问到$
        })  
      ]

};