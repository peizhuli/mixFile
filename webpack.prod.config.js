let {smart} = require('webpack-merge');
let base = require('webpack.base.config.js');

module.exports = smart(base, {
    mode: 'production',
    optimization: {        //优化项
        minimizer: [
            new uglifyJs(),
            new optimizeCss()
        ]
    },
});