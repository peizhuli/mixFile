let {smart} = require('webpack-merge');
let base = require('webpack.base.config.js');

module.exports = smart(base, {
    mode: 'development',
    devServer: {            //开发服务器配置（打包后的文件访问地址）
        port: 3000,
        progress: true,
        contentBase: './build',   //执行目录
        compress: true,
        proxy: {              // 跨域处理
            '/api': {         // 本地所有请求以 /api  开头的接口（如 /api/login） 都代理到 http://xxx （http://xxx/login） 
                target: 'http://xxx',       // 目标请求服务器地址
                pathRewrite: {'/api':''}    // 将请求中的 /api 去掉， 目标请求地址为 http://xxx，而不是 http://api/xxx, 所以需要将 /api去掉
            }
        },
        open: true
    },
    wath: true,
    wathOptions: {
        poll: 1000,    //每秒询问（文件是否有变化）的次数
        aggreatment: 500,         //防抖，在输入期间500ms后才重新打包
        igroned: /node_modules/  //不需要监控的文件
    },
    devtool: 'source-map',    //增加映射文件，方便调试代码
    // source-map 单独生成一个.map文件，和源码有映射关系， 报错时会标识源码行和列
    // eval-source-map : 不会产生单独的.map文件，代码集成在打包文件中，报错时也会标识源码行和列
    // cheap-module-source-map：会产生一个单独的.map文件，但不会和源码产生映射关系，可用于调试。报错时，会标识行，不标识列，可在.map文件寻找对应报错具体位置
    // cheap-module-eval-source-map：不会产生单独的.map文件，文件集成在打包后的文件中，报错时，标识行，不会标识列
});