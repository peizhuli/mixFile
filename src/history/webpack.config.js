const path = require('path');
let htmlWepackPlugin = require('html-webpack-plugin');
let miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // devServer: {            //开发服务器配置（打包后的文件访问地址）
    //     port: 3000,
    //     progress: true,
    //     contentBase: './build',   //执行目录
    //     compress: true
    // },
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
                    {   //loader执行顺序：从右向左，从下到上 ，css-loader ->  style-loader
                        loader: 'style-loader',        // 将css插入到head标签中
                        options: {
                            insertAt: 'top'            // 将css插入到head的最前面
                        }
                    },
                    'css-loader'              //主要用于解析路径  处理@import css语法
                ]
            }
        ],
    },
    plugins: [
        new htmlWepackPlugin({         // 打包后的文件夹会自动生成一个入口html文件，并引用入口js文件
            template: './index.html',  //以index.html作为引用模板
            filename: 'index.html',     //生成的文件名（可另取名字）
            minify: {
                removeAttributeQuotes: true,    //删除html标签属性的双引号
                collapseWhitespace: true,       // 折叠空行

            },
            hash: true           // 文件名后面加上hash  filename.ext?has
        }),
        new miniCssExtractPlugin({
            filename: 'main.css'
        })  
      ]

};