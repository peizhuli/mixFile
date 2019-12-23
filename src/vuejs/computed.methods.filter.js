// computed 定义一个函数，对data数据进行函数运算，会对结果进行缓存，只要它依赖的data没有发生变化，最终返回的计算属性就不会重新计算，直接使用缓存的数据
// methods是一个函数，可以接收参数， 但computed不能接收参数，computed可以依赖于其他computed或者组件 
// methods 定义一个函数，每次渲染页面都会重新执行函数，不会缓存数据
// 模板中需要使用 复杂的逻辑表达式时，选用 计算属性
// filters
// watch： 一些数据需要依赖另一些数据变化时 或只是动态监听一个值的时候，选用computed， 当有一个通用的相应数据变化时，监听后需要进行回调操作时，选用watch

//vue2.0 数组变化与页面数据更新问题
// 调用能改变原数组的api会是数据发生改变，即页面会更新；如：push, pop, shift, unshift, sort, reverse, splice
// 调用不会改变原数组的api，页面数据不会发生变化。如：slice, concat, filter

// vue 不能检测一下变动的数组
// 1. 通过数组下标修改数组的值 arr[index] = newValue;  可通过 Vue.set(arr, index, newValue); 或 arr.splice(index, 1, newValue)方式修改
// 2. 改变数组的长度 arr.length = newLength; 


/**
 * 组件中的data
 */
//组件中data必须是一个函数，因为组件是可复用的，为了避免组件复用时，修改了data中的数据，所以data数据必须是隔离的，
//即每当复用一个组件，data中的数据就被复制一份，修改各自组件data，互不影响其他组件data的数据，所以data不能是一个简单的对象，否则会存在引用问题


/**
 * v-model
 */
//v-model是一个语法糖，相当于绑定数据之后，又增减了一个事件监听
 //<input v-model="data" />  
 //=>
 //<input v-bind:value="data" v-on:input="searchText = $event" />  


//history 和 hash 模式
// vue-router 默认是hash模式（url带有 #），原理是监听onhashchange事件
// history 模式（HTML5 API），在二级页面刷新时，会报404错误。pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。
// 因为刷新相当于重新请求，会向后台发起url地址请求，hash模式的话，#后面的内容不会被携带在请求的url中，history模式下，就是整个请求url，

// route 是路由信息对象，包含path, param, query等信息
// router 是路由对象，拥有路由api和钩子函数，如router.push() 