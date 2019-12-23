// import $ from 'jquery';
console.log($);
console.log(window.$);   // 全局变量

console.log('webpack');
require('./src/css/index.css');

let fn = () => {
    console.log('箭头函数');
}

fn();
// @log
class A {
    a = 1;
};

let a = new A();
console.log(a.a);

// @log
// function log(target) {
//     console.log(target, '23');
// }


/**
 * 第三方模块 tree shakng， tree shaking遗爱es6的模块系统，所以只能使用import形式引用模块
 * 第三方模块不支持es模块方式，需下载相应的es模块
 */
// 安装相应的第三方es模块，例如 loadsh-es
import {chunk} from 'loadsh-es'; 
// 则会自动对其进行tree shaking