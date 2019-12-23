const path = require('path');
let htmlWepackPlugin = require('html-webpack-plugin');             // 打包生成一个html文件
let purifyCss = require('purifycss-webpack');
let miniCssExtractPlugin = require('mini-css-extract-plugin');     // 将css 文件单独打包，不作为style标签插入到head标签中
let optimizeCss = require('optimize-css-assets-webpack-plugin');   // 压缩单独打包的css，使用后需使用uglifyjs对js文件进行压缩优化
let uglifyJs = require('uglifyjs-webpack-plugin');                 //优化压缩js
let cleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
 
module.exports = {
    // devServer: {            //开发服务器配置（打包后的文件访问地址）
    //     port: 3000,
    //     progress: true,
    //     contentBase: './build',   //执行目录
    //     compress: true
    // },
    optimization: {        //优化项
        minimizer: [
            new uglifyJs(),
            new optimizeCss()
        ]
    },
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),        
        filename: 'bundle.[hash:8].js',   //文件名hash值，:8 只显示8位hash值
        //publicpath: ''  
    },
    module: {
        rules: [
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
    externals: {          // 外部模块，不打包进build中
        jquery: '$'
    },
    plugins: [
        new cleanWebpackPlugin(['build']),
        new htmlWepackPlugin({         // 打包后的文件夹会自动生成一个入口html文件，并引用入口js文件
            template: './index.html',  //以index.html作为引用模板
            filename: 'index.html',     //生成的文件名（可另取名字）
            minify: {
                removeAttributeQuotes: true,    //删除html标签属性的双引号
                collapseWhitespace: true,       // 折叠空行

            },
            hash: true           // 文件名后面加上hash  filename.ext?has
        }),
        //对css进行tree shaking        
        new purifyCss({
            paht: glob.sync([
                path.resolve(__dirname, "../../*.html"),
                path.resolve(__dirname, "../src/*.js")
            ])
        }),
        new miniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'              // 在每个模块中都注入一个$, 但window 全局变量中无法访问到$
        })  
      ]

};