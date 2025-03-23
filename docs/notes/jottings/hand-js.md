# 手写 js 代码

**目录：**

- 防抖节流
- 事件委托
- 深浅拷贝
- —维数组转树形结构
- 发布订阅模式
- 数组扁平化
- 函数柯里化
- 实现compose
- 利用mouse事件写一个可拖拽的div
- query 参数解析成对象
- 选择/快速/冒泡排序算法
- 手写懒加载
- 手写 instanceof 和 new
- 手写 call/apply/bind 并发请求的控制
- 使用 setTmeout 模拟 setlnterval
- 驼峰命名和下划线命名互换



## 防抖节流

日报 1129#

```js
 // 防抖（一段时间会等，然后带着一起做了）
 function debounce(fn, delay){
     let timerId = null
     return function(){
         const context = this
         if(timerId){window.clearTimeout(timerId)}
         timerId = setTimeout(()=>{
             fn.apply(context, arguments)
             timerId = null
         },delay)
     }
 }
 const debounced = debounce(()=>console.log('hi'))
 debounced()
 debounced()


 // 节流（一段时间执行一次之后，就不执行第二次）
 function throttle(fn, delay){
     let canUse = true
     return function(){
         if(canUse){
             fn.apply(this, arguments)
             canUse = false
             setTimeout(()=>canUse = true, delay)
         }
     }
 }

 const throttled = throttle(()=>console.log('只有一个hi'))
 throttled()
 throttled()

```

## 事件委托

日报 1130#

```js
ul.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() === 'li'){
        fn() // 执行某个函数
    }
})


// 进阶版本
function delegate(parentNode, eventType, selector, fn) {
  parentNode.addEventListener(eventType, e => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (parentNode === el) {
        el = null
        break
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el)
  })
  return parentNode;
}

```

## 深浅拷贝

日报 1201#

```js
let obj1 = {
  a:{
    b:1
  }
}
function deepClone(obj) { 
  let cloneObj = {}
  for(let key in obj) {                 //遍历
    if(typeof obj[key] ==='object') { 
      cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]  //基本类型的话直接复制值
    }
  }
  return cloneObj
}
let obj2 = deepClone(obj1);
obj1.a.b = 2;
console.log(obj2);   //  {a:{b:1}}



// 高阶版本 ....


// 'Object' | 'Function' | 'Array' ...
const isObj = obj => Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    // 日期对象直接返回一个新的日期对象
    return new Date(obj)
  }
  if (obj.constructor === RegExp) {
    //正则对象直接返回一个新的正则对象
    return new RegExp(obj)     
  }
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj)
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  //继承原型链
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) { 
    cloneObj[key] = isObj(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}

// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () { console.log('我是一个函数') },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
  enumerable: false, value: '不可枚举属性' }
);
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)

```

## 一维数组转树形结构：

日报 1202#

```js
const source = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 6, parentId: 3 },
]

// 目标是将 source 转换成下面的结构

// {
//   id: 1, 
//   children: [
//       {
//           id: 2,
//           children: [
//               { id: 4, children: [] },
//               { id: 5, children: [] }
//           ]
//       },
//       {
//           id: 3,
//           children: [
//               { id: 6, children: [] }
//           ]
//       }
//   ]
//   }

const rootObj = {
  id: source.find(s => s.parentId == null).id,
  children: []
}
const map = new Map();
source.filter(s => s.parentId !== null).forEach(item => {
  const subItem = { id: item.id, children: [] };
  if (map.has(item.parentId)) {
    const obj = map.get(item.parentId);
    obj.children.push(subItem)
    map.set(item.parentId, obj)
  } else {
    map.set(item.id, subItem)
  }
})

rootObj.children = [...map.values()]

console.log(JSON.stringify(rootObj))
```

## 发布订阅模式

日报 1203#

```js
class Event {
  constructor () {}
  // 首先定义一个事件容器，用来装事件数组（因为订阅者可以是多个）
  handlers = {}

  // 事件添加方法，参数有事件名和事件方法
  addEventListener (type, handler) {
    // 首先判断handlers内有没有type事件容器，没有则创建一个新数组容器
    if (!(type in this.handlers)) {
      this.handlers[type] = []
    }
    // 将事件存入
    this.handlers[type].push(handler)
  }

  // 触发事件两个参数（事件名，参数）
  dispatchEvent (type, ...params) {
    // 若没有注册该事件则抛出错误
    if (!(type in this.handlers)) {
      return new Error('未注册该事件')
    }
    // 便利触发
    this.handlers[type].forEach(handler => {
      handler(...params)
    })
  }

  // 事件移除参数（事件名，删除的事件，若无第二个参数则删除该事件的订阅和发布）
  removeEventListener (type, handler) {
      // 无效事件抛出
      if (!(type in this.handlers)) {
        return new Error('无效事件')
      }
      if (!handler) {
        // 直接移除事件
        delete this.handlers[type]
      } else {
        const idx = this.handlers[type].findIndex(ele => ele === handler)
        // 抛出异常事件
        if (idx === -1) {
          return new Error('无该绑定事件')
        }
        // 移除事件
        this.handlers[type].splice(idx, 1)
        if (this.handlers[type].length === 0) {
          delete this.handlers[type]
        }
      }
    }
}

var event = new Event() // 创建event实例
// 定义一个自定义事件:"load"
function load (params) {
  console.log('load', params)
}
event.addEventListener('load', load)
// 再定义一个load事件
function load2 (params) {
  console.log('load2', params)
}
event.addEventListener('load', load2)
// 触发该事件
event.dispatchEvent('load', 'load事件触发')
// 移除load2事件
event.removeEventListener('load', load2)
// 移除所有load事件
event.removeEventListener('load')

```

## 数组扁平化

日报 1206#

```js
// 方法一： reduce,  Array.isArray, ...拓展运算符/concat, 递归 flattern

const flattern = (arr = []) => arr.reduce((pre, cur) => Array.isArray(cur) ? [...pre, ...flattern(cur)] : [...pre, cur], [])

const source = [
  1,
  2,
  [ 3,4, 
  [ 5, 6 ]]
]
const result = flattern(source)
console.log('result', result)

// 方法二：while 循环，Array.some, Array.isArray

const flattern = (arr = []) => {
  while(arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
  }
  return arr;
}

const source = [1,2,[3,4, [5, 6]]]
const result = flattern(source)
console.log('result', result)


// 方法3：Array.flat(Infinity)

[1,2,[3,4, [5, 6]]].flat(Infinity)

// 方法4：toString, split, map
// eg:
[1,2,[3,4, [5, 6]]].toString()
// '1,2,3,4,5,6'

const flattern = (arr = [] ) => {
  return arr.toString().split(",").map(Number)
}

const source = [1,2,[3,4, [5, 6]]]
const result = flattern(source)
console.log('result', result)
```

## 函数柯里化

日报 1207#

```js
let curry = fn => {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      // 递归调用 curriedFn，参数累计到 fn 的参数后就立即执行 fn(args)，否则一直递归自己——加参数
      return function() {
        return curriedFn.apply(null, [...args, ...arguments])
      }
    }
    return fn.apply(null, args)
  }
}

 const sum = (x, y, z) => x * y * z * 10;
 const curriedSum = curry(sum)
 console.log(curriedSum(2)(3)(4))
```

## 实现 compose

日报 1208#

```js
function compose() {
    const fns = [...arguments]
    return function(args) {
        return fns.reduceRight((pre, curFn) => pre = curFn(pre), args)
    }
}

const  fn1 = (param1) => { return "fn1-" + param1 }
const  fn2 = (param2) => { return "fn2-" + param2 }
const  fn3 = (param3) => { return "fn3-" + param3 }

const Fn = compose(fn1, fn2, fn3)
console.log('res', Fn('hello'))
// res fn1-fn2-fn3-hello

// or
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];


```

## 利用 mouse 事件写一个可拖拽的 div

日报 1209#

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <style type="text/css">
    div {
    border: 1px solid red;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
  }

*{margin:0; padding: 0;}
  </style>
</head>
<body>
<div id="xxx"></div>

<script>
  var dragging = false
  var position = null

  xxx.addEventListener('mousedown',function(e){
    dragging = true
    position = [e.clientX, e.clientY]
  })

  document.addEventListener('mousemove', function(e){
    if(dragging === false){return}
    console.log('hi')
    const [x, y] = [e.clientX, e.clientY]
    const [originX, originY] = position || [0, 0]
    const [deltaX, deltaY] = [x - originX, y - originY]
    const [left, top] = [parseInt(xxx.style.left || 0), parseInt(xxx.style.top || 0)]
    xxx.style.left = left + deltaX + 'px'
    xxx.style.top = top + deltaY + 'px'
    position = [x, y]
  })
  document.addEventListener('mouseup', function(e){
    dragging = false
  })
</script>

</body>
</html>
```

- [演示demo](https://jsbin.com/xacuceholu/edit?js,output)


## query 参数解析成对象

日报 1210#

```js
// input
// https://www.baidu.com/s?name=tom&age=12

const url1 = 'https://www.baidu.com/s?name=tom&age=12'

const transformQuery = (url) => {
  const _url = new URL(url)
  return Object.fromEntries(new URLSearchParams(_url.search))
}

transformQuery(url1)
// { name: 'tom', age: '12' }


// or 

const url1 = 'https://www.baidu.com/s?name=tom&age=12'

const transformQuery = (url) => {
  const search = url.split("?")[1]
  let res = {}
  search.split("&").forEach(item => {
      const [key, name] = item.split("=")
      res[key] = name
  })

  // or
  // return search.split("&").reduce((pre, cur) => (pre[cur.split('=')[0]] = cur.split('=')[1], pre), {})
  return res
}

transformQuery(url1)

```

## 选择/快速/冒泡排序算法

日报 1211#


冒泡排序算法

平均时间复杂度O(n²)

```js
const array = [5,4,3,2,1,8]

function bubble (arr = []) {
  for (let i = 0; i < arr.length - 1; i++ ) {
    for (let m = 0; m < arr.length - 1 - i; m ++) {
      if (arr[m] > arr [m+1]) {
        const temp = arr[m]
        arr[m] = arr[m+1]
        arr[m+1] = temp
      }
    }
  }
  return arr
}
console.log(bubble(array)) // [ 1, 2, 3, 4, 5, 8 ]

```

选择排序

算法复杂度：O(n²)

```js
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}


selectionSort([5,4,3,2,1,8]) // [1, 2, 3, 4, 5, 8]
```

快速排序

```js
function quickSort(arr, l = 0, r = arr.length -1) {
    if (l < r) {
        let i, j, x;
        i = l,
        j = r,
        x = arr[i];
        while (i < j) {
            while (i < j && arr[j] > x) {
                j-- // 从右向左找第一个小于x的数
            }
            if (i < j) {
                arr[i ++] = arr[j]
            }
            while (i < j && arr[i] < x) {
                i++ // 从左向右找第一个大于x的数
            }
            if (i < j) {
                arr[j--] = arr[i]
            }
        }
        arr[i] = x;
        quickSort(arr, l, i-1) // 递归
        quickSort(arr, i+1, r) // 递归
    }
    return arr
}

quickSort([5,4,3,2,1,8])
```

## 手写懒加载

日报1219#

```html
<body>
    <div data-v-b2db8566="" 
         data-v-009ea7bb="" 
         data-v-6b46a625=""   
         data-src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/27/16619f449ee24252~tplv-t2oaga2asx-image.image" 
         class="lazy thumb thumb"    
         style="background-image: none; background-size: cover;"
         >  
    </div>
</body>


<script>
    // 获取所有的图片标签
    const imgs = document.getElementsByTagName('img')
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0
    function lazyload(){
        for(let i=num; i<imgs.length; i++) {
            // 用可视区域高度减去元素顶部距离可视区域顶部的高度
            let distance = viewHeight - imgs[i].getBoundingClientRect().top
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
            if(distance >= 0 ){
                // 给元素写入真实的src，展示图片
                imgs[i].src = imgs[i].getAttribute('data-src')
                // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                num = i + 1
            }
        }
    }
    // 监听Scroll事件
    window.addEventListener('scroll', lazyload, false);
</script>
```

## 手写 instanceof 和 new

日报 1220#

手写 instanceof

参考：https://www.cnblogs.com/chenjy259/p/14829268.html

- 参数的左侧和右侧必须是对象

```js
function myInstanceof(left, right) {
    let proto = left.__proto__;
    let prototype = right.prototype;
    
    // proto为空，即遍历到原型链的尽头
    // prototype为空，传入的构造函数异常
    if (proto === null || prototype === null) {
        return false;
    } else if(proto === prototype){
        return true;
    } else {
        myInstanceof(proto, right);		// 递归，判断right是否left的原型链上
    }
}
```

手写 new

new 操作符做了什么？

- 创建一个新的对象
- 继承父类原型上的方法.
- 添加父类的 属性 到新的对象上并初始化. 保存方法的执行结果.
- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

参考：https://juejin.cn/post/6844903937405878280

```js
function _new(obj, ...rest){
  // 基于obj的原型创建一个新的对象
  const emptyObj = Object.create(obj.prototype);

  // 添加属性到新创建的 emptyObj 上, 并获取obj函数执行的结果.
  const result = obj.apply(emptyObj, rest);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === 'object' ? result : emptyObj;
}


// 验证

function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;

  return 'demo';
}

const tb = new Person('Chen', 'Tianbao');
console.log(tb);

const tb2 = _new(Person, 'Chen', 'Tianbao');
console.log(tb2)

```

## 手写 call/apply/bind


- call


```js
Function.prototype.myCall = function(context, ...args) { // 解构context 与arguments
   if(typeof this !== 'function') { // this 必须是函数
     throw new TypeError(`It's must be a function`)
   }
   if(!context) context = window; // 没有context，或者传递的是 null undefined，则重置为window
   const fn = Symbol(); // 指定唯一属性，防止 delete 删除错误
   context[fn] = this; // 将 this 添加到 context的属性上
   const result = context[fn](...args); // 直接调用context 的 fn
   delete context[fn]; // 删除掉context新增的symbol属性
   return result; // 返回返回值
}


// 示例
const obj = {a: 1}
function foo(b) {
    console.log(this.a, b);
    return this.a + b
}
foo.myCall(obj, 2)
// 1 2 
// 3
```

拓展：[symbol 学习](https://coder.itclan.cn/fontend/js/understand-symbol) 了解 symbol 常用 API 和基本用途


- apply


```js
Function.prototype.myApply = function(context, args = []) { // 解构方式
   if(typeof this !== 'function') {
     throw new TypeError(`It's must be a function`)
   }
   if(!context) context = window;
   const fn = Symbol();
   context[fn] = this;
   const result = context[fn](...args);
   delete context[fn];
   return result;
}

// 示例
const arr = [1,2,6,4,5]
Math.min.myApply(null, arr)
Math.max.myApply(null, arr)

```


- bind

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  if(typeof fn !== 'function'){
      throw new TypeError('It must be a function');
  }
  if(!context) context = window;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  };
};


// 示例
const bar  = {a: 1}
function foo(b, c) {
    console.log(this.a, b, c)
}
const fn = foo.myBind(bar, 2)
fn(3,4)
// 1  2  3
```


## 并发请求的控制

```js
class Scheduler {
  constructor(limitNum) {
    this.limitNum = limitNum
    this.queue = []
    this.runningNum = 0;
  }

  add(taskFn) {
    this.queue.push(taskFn);
  }

  start() {
    for (let i = 0;i < this.limitNum;i++) {
      this.excute()
    }
  }

  excute() {
    if (this.queue.length && this.runningNum < this.limitNum) {
      this.runningNum++
      const fn = this.queue.shift();
      fn().then(() => {
        this.runningNum--;
        this.excute();
      })
    }

  }

}


const timeout = (time) => new Promise(resolve => setTimeout(resolve, time))

const scheduler = new Scheduler(2) // 并发限制为 2 

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

scheduler.start()
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

```

## 使用 setTmeout 模拟 setInterval

使用 setTmeout 模拟 setInterval


看看 使用 setInterval 的例子；

```js
let timer = setInterval(() => {
  count ++
  console.log(count)
  if (count === 10) {
    clearInterval(timer)
  }
}, 1000);
```

接下来使用 setTimeout 来模拟实现：

```js
let count = 0

let timer = setTimeout(function run() {
  count ++
  console.log(count)
  if (count === 10) {
    clearInterval(timer)
    return
  }
  timer = setTimeout(run, 1000);
}, 1000);

```

## 驼峰命名和下划线命名互换

```js
const toLine = (str) => str.replace(/\B([A-Z])/g, '_$1').toLowerCase()

// toLine('GetElementById')
// 'get_element_by_id'

const toHump = (str) => str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())

// toHump('get_element_by_id')
// 'getElementById'

```