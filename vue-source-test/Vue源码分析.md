# Vue 源码分析

关于 Dep 和 Watcher 解释：https://juejin.cn/post/6844903870578032648

> 课程：https://www.bilibili.com/video/BV1LE411e7HE?p=8
>
> 代码笔记：https://github.com/kunjiang/vue-src-course

## 模板语法

> 简单版本的模板，便于理解

```html
<body>
  <!-- 写模板 -->
  <div id="root">
    <p>{{name}}</p>
    <p>{{message}}</p>
  </div>

  <script>
    console.log( root );
    // 第二步 创建 实例
    let app = new Vue( {
      el: '#root',
      data: {
        name: '张三'
        , message: '是一个男人'
      }
    } );

    // 第三步是挂载: 这种用法的挂载在 vue.js 中帮我们实现了
    console.log( root );
  </script>
</body>
```

几个核心：

- 挂载的 DOM：`id="root"` 和 `el: '#root'`
- 模板内变量的表示 `{{name}}`

## Vue原理的第一印象

思路：

- 拿到模板：拿到模板内的 DOM，取出所有的 子节点
- 拿到数据：即 `data` 里面的数据。
- 将数据与模板结合, 得到 的是 HTML 元素 ( DOM 元素 )
  - 对子节点进行分析，拿到【插槽的值】—— `{{name}}`
  - 子节点含有子节点，则递归遍历
  - 子节点为 文本节点，则替换 `{{name}}` 内的变量值为 `data` 里面的变量值
- 放到页面中：所有节点的变量值更改完成后，一次性返回 DOM

代码：

```js
<body>
  <div id="root">
    <div>
      <p>{{name}}-{{message}}</p>
    </div>
    <p>{{name}}</p>
    <p>{{message}}</p>
  </div>

  <script>
    // 匹配 {{}} 的正则
    let rkuohao = /\{\{(.+?)\}\}/g;

    // 1. 拿到模板
    let tmpNode = document.querySelector( '#root' ); // 元素拿到了 模板就是他了
    
	// 2  拿到数据 ( data )
    let data = {
      name: '一个新name'
      , message: '一个消息'
    };

    // 3. 将数据放到模板中
    //  一般都是使用 递归
    // 在现在这个案例中 template 是 DOM 元素,
    // 在真正的 Vue 源码中是 DOM -> 字符串模板 -> VNode -> 真正的 DOM
    function compiler(template, data) {
      let childNodes = template.childNodes; // 取出子元素
      for (let i = 0;i < childNodes.length;i++) {
        let type = childNodes[i].nodeType; // 1 元素, 3 文本节点
        if (type === 3) {
          // 文本节点, 可以判断里面是否有 {{}} 插值
          let txt = childNodes[i].nodeValue; // 该属性只有文本节点才有意义

          // 有没有双花括号??? 
          txt = txt.replace(rkuohao, function (_, g) { // replace 使用正则匹配一次 函数就会被调用一次
            // 函数的 第 0 个参数 表示匹配到的内容
            // 函数的 第 n 个参数 表示正则中的 第 n 组
            let key = g.trim(); // 写在双花括号里面的 东西
            let value = data[key];

            // 将 {{ xxxx }} 用这个 值替换
            return value;
          });
          // 注意:  txt 现在和 DOM 元素是没有关系
          childNodes[i].nodeValue = txt;
        }
        else if (type === 1) {
          // 元素, 考虑它有没有子元素, 是否需要将其子元素进行 判断是否要插值
          compiler(childNodes[i], data);
        }
      }
    }

    // 利用 模板生成一个 需要被渲染的 HTML 标签 ( 准 真正在页面中显示的 标签 )
    let generateNode = tmpNode.cloneNode( true ); // 注意这里是 DOM 元素, 可以这么用

    compiler(generateNode, data); // 将 坑 替换掉

    // 我们此时是没有生成 新的 template, 所以这里看到的 是直接在页面中就更新的数据, 因为 DOM 是引用类型
    // 这样做 模板就没有了

    // 4. 将 渲染好的 HTML 加到页面中
    root.parentNode.replaceChild( generateNode, root );

  </script>
</body>
```

因为是简易版本的 Vue 实现，因此存在诸多的缺点，例如：

- `Vue` 使用的 虚拟 `DOM`
- 只考虑了 单属性`{{ name }}`, 而 Vue 中大量的使用层级 `{{ child.name.firstName }}`
- 代码没有整合等

## 实现简单版本的 MyVue

- 自定义简单版本的 render 实现：

```js
let rkuohao = /\{\{(.+?)\}\}/g;
function compiler(template, data) {
    let childNodes = template.childNodes; // 取出子元素
    for (let i = 0;i < childNodes.length;i++) {
        let type = childNodes[i].nodeType; // 1 元素, 3 文本节点
        if (type === 3) {
            // 文本节点, 可以判断里面是否有 {{}} 插值
            let txt = childNodes[i].nodeValue; // 该属性只有文本节点才有意义
            txt = txt.replace(rkuohao, function (_, g) { // replace 使用正则匹配一次 函数就会被调用一次
                let key = g.trim();
                let value = data[key];
                return value;
            });
            // 注意:  txt 现在和 DOM 元素是没有关系
            childNodes[i].nodeValue = txt;
        }
        else if (type === 1) {
            // 元素, 考虑它有没有子元素, 是否需要将其子元素进行 判断是否要插值
            compiler(childNodes[i], data);
        }
    }
}
```

- class 版本的 MyVue

```js
function MyVue(options) {
    // 习惯: 内部的数据使用 _ 开头, 只读数据使用 $ 开头
    this._data = options.data;
    this._el = options.el;

    // 准备工作 ( 准备模板 )
    this._templateDOM = document.querySelector(this._el);
    this._parent = this._templateDOM.parentNode;

    // 渲染工作
    this.render()
}
/** 将模板 即 可数据, 得到 HTML 加到页面中 */
MyVue.prototype.render = function () {
    this.compiler();
};
/** 编译 将 模板与数据结合 得到 真正的 DOM 元素 */
MyVue.prototype.compiler = function () {
    let realHTMLDOM = this._templateDOM.cloneNode(true); // 用 模板 拷贝 得到 一个 准 DOM
    compiler(realHTMLDOM, this._data);
    this.update(realHTMLDOM);
}
/** 将 DOM 的元素 放到页面中 */
MyVue.prototype.update = function (real) {
    this._parent.replaceChild(real, document.querySelector('#root'));
}
```

- 使用方式：看看，和 `Vue` 的初始化方式是不是很像。

```js
let app = new MyVue({
    el: '#root',
    data: {
        name: 'jim',
        message: 'info'
    }
});
```



## 获取层级属性的值

试想，获取单属性的方式为 `app.name` ，多层级，比如：`app.obj.name.firstName` ，怎么去获取呢？

```js
function getValueByPath( obj, path ) {
    let paths = path.split( '.' ); // [ xxx, yyy, zzz ]
    let res = obj; // 定义一个结果
    let prop;
    while( prop = paths.shift() ) {
        res = res[ prop ];
    }
    return res;
}
```

测试举例：

```js
let o = {
    a: {
        b: {
            c: {
                d: {
                    e: '正确了'
                }
            }
        }
    }
};

var res = getValueByPath( o, 'a.b.c.d.e' );

// 获取层级属性的值
console.log( res );
```

- 此时，可以修改我们前面定义的 `compiler` 实现

```diff
let rkuohao = /\{\{(.+?)\}\}/g;
function compiler(template, data) {
    let childNodes = template.childNodes; // 取出子元素
    for (let i = 0;i < childNodes.length;i++) {
        let type = childNodes[i].nodeType; // 1 元素, 3 文本节点
        if (type === 3) {
            // 文本节点, 可以判断里面是否有 {{}} 插值
            let txt = childNodes[i].nodeValue; // 该属性只有文本节点才有意义
            txt = txt.replace(rkuohao, function (_, g) { // replace 使用正则匹配一次 函数就会被调用一次
                let path = g.trim(); // 写在双花括号里面的 东西
+			   let value = getValueByPath(data, path);
                return value;
            });
            // 注意:  txt 现在和 DOM 元素是没有关系
            childNodes[i].nodeValue = txt;
        }
        else if (type === 1) {
            // 元素, 考虑它有没有子元素, 是否需要将其子元素进行 判断是否要插值
            compiler(childNodes[i], data);
        }
    }
}
```



## 定义 VNode

分析 VNode 包含哪些内容：

- tag 标签名
- data 模板的数据
- value 值
- type 标签类型
- children 子元素
- ... 等其他

```js
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }

    appendChild ( vnode ) {
        this.children.push( vnode );
    }
}
```



## 将 DOM 转换成 VDOM

方法：递归遍历 DOM，生成 VDOM，本质上就是递归给对象设置属性，值。

```js
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    if (nodeType === 1) {
        // 元素
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for (let i = 0;i < attrs.length;i++) { // attrs[ i ] 属性节点 ( nodeType == 2 )
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);
        // 考虑 node 的子元素
        let childNodes = node.childNodes;
        for (let i = 0;i < childNodes.length;i++) {
            _vnode.appendChild(getVNode(childNodes[i])); // 递归
        }
    } else if (nodeType === 3) {
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
    }
    return _vnode;
}
```

## 将 VDOM 转换成 DOM

思路一致，只不过是反过来，依然是递归的方式

```js
function parseVNode( vnode ) {
    // 创建 真实的 DOM
    let type = vnode.type;
    let _node = null;
    if ( type === 3 ) {
        return document.createTextNode( vnode.value ); // 创建文本节点
    } else if ( type === 1 ) {
        _node = document.createElement( vnode.tag );
        // 属性
        let data = vnode.data; // 现在这个 data 是键值对
        Object.keys(data).forEach( (key) => {
            let attrName = key;
            let attrValue = data[ key ];
            _node.setAttribute( attrName, attrValue);
        } );
        // 子元素
        let children = vnode.children;
        children.forEach( subvnode => {
            _node.appendChild(parseVNode( subvnode )); // 递归转换子元素 ( 虚拟 DOM )
        } );
        return _node;
    }
}
```



## 通过函数柯里化学习 makeMap

- [函数式编程指北](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html)
- 维基百科：柯里化

概念：

- 柯里化：一个函数原本有多个参数，只传入**一个参数**，生成一个函数，剩下的参数有生成的函数接收，运行得到结果。
- 偏函数：一个函数原本有多个参数，只传入**部分参数**，生成一个函数，剩下的参数有生成的函数接收，运行得到结果。
- 高阶函数：**一个函数的参数是一个函数**，该函数对参数这个函数进行加工，得到一个函数，这个加工用的函数就是高阶函数

为什么要使用柯里化？

为了提升性能，使用柯里化可以缓存一部分能力。

2个例子说明：

1.判断元素

问：Vue 本质上是使用 HTML 的字符串作为模板的，将字符串 模板转换成 AST， 再转换成为 VNode

- 模板 ==》 AST
- AST ==》VNode
- VNode ==》 DOM

问：哪一个阶段最消耗性能？答案是第一阶段

例子：

```js
let s = "1 + 2 + (3 + 4 * (5 + 6))"
// 写一个程序，解析这个表单是，得到结果（一般化）
```

通解：将表达式转换成【波兰式】，然后使用栈结构来运算

问2：在 Vue 中的每一个标签可以是真正的 HTML 标签，也可以是自定义组件，怎么区分？

在 Vue 源码中其实将所有可以用的 HTML 标签存起来了


假设这里是考虑几个标签:

```js
let tags = 'div,p,a,img,ul,li'.split(',');
```

需要一个函数, 判断一个标签名是否为 内置的 标签

```js
function isHTMLTag( tagName ) {
  tagName = tagName.toLowerCase();
  if ( tags.indexOf( tagName ) > -1 ) return true;
  return false;
}
```

模板是任意编写的, 可以写的很简单, 也可以写到很复杂, indexOf 内部也是要循环的

如果有 6 中内置标签, 而模板中有 10 个标签需要判断, 那么就需要执行 60 次循环


2. 虚拟 DOM 的 render 方法

思考: vue 项目 *模板 转换为 抽象语法树* 需要执行几次??? 

- 页面一开始加载需要渲染
- 每一个属性 ( 响应式 ) 数据在发生变化的时候 要渲染
- watch, computed 等等

我们昨天写的代码 每次需要渲染的时候, 模板就会被解析一次 ( 注意, 这里我们简化了解析方法 )

render 的作用是将 虚拟 DOM 转换为 真正的 DOM 加到页面中

- 虚拟 DOM 可以降级理解为 AST
- 一个项目运行的时候 模板是不会变 的, 就表示 AST 是不会变的

我们可以将代码进行优化, 将 虚拟 DOM 缓存起来, 生成一个函数, 函数只需要传入数据 就可以得到 真正的 DOM

**讨论**

- 这样的闭包会内存泄漏吗老师?
  - 性能一定是会有问题
  - 尽可能的提高性能
- 原生的好多东西都忘记了，不知道从哪学起？

**问题:**

- 没明白柯里化怎么就只要循环一次。昨天 讲的 
  - **缓存一部分行为**
- mountComponent 这个函数里面的内容 没太理解 ( 具体 )
- call


makeMap( [ 'div', 'p' ] ) 需要遍历这个数据 生成 键值对 

```
let set = {
  div: true
  p: true
}

set[ 'div' ] // ture

set[ 'Navigator' ] // undefined -> false
```

但是如果是使用的函数, 每次都需要循环遍历判断是不是数组中的

- 在 Vue 源码中经常会使用到的 makeMap 方法，从 柯里化的方式学习其原理

```js
let tags = 'div,p,a,img,ul,li'.split(',');

function makeMap( keys ) {
    let set = {}; // 集合
    tags.forEach( key => set[ key ] = true );

    return function ( tagName ) {
        return !!set[tagName.toLowerCase()]
    }
}

let isHTMLTag = makeMap( tags ); // 返回的函数
isHTMLTag('div') // true
isHTMLTag('li') // true ，第二次判断时，减少循环，提高性能
```

优缺点：

- 缓存数据，提高性能，减少遍历。
- 拆分实现，减少 代码量
- 缺点：消耗一点点内存



## 进阶版本的 自定义 Vue

- 构造函数

```js
/** 虚拟 DOM 构造函数 */
class VNode {
    constructor( tag, data, value, type ) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }

    appendChild ( vnode ) {
        this.children.push( vnode );
    }
}
```

- getVnode 方法 创建虚拟节点的过程

```js
/** 由 HTML DOM -> VNode: 将这个函数当做 compiler 函数 */
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    if (nodeType === 1) {
        // 元素
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for (let i = 0;i < attrs.length;i++) { // attrs[ i ] 属性节点 ( nodeType == 2 )
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

        // 考虑 node 的子元素
        let childNodes = node.childNodes;
        for (let i = 0;i < childNodes.length;i++) {
            _vnode.appendChild(getVNode(childNodes[i])); // 递归
        }
    } else if (nodeType === 3) {
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
    }

    return _vnode;
}
```

- getValueByPath 递归获取 data 的属性值

```js
/** 根据路径 访问对象成员 */
function getValueByPath(obj, path) {
    let paths = path.split('.'); // [ xxx, yyy, zzz ]
    let res = obj;
    let prop;
    while (prop = paths.shift()) {
        res = res[prop];
    }
    return res;
}
```

- combine 函数，将模板和数据结合起来

```js
/** 将 带有 坑的 Vnode 与数据 data 结合, 得到 填充数据的 VNode: 模拟 AST -> VNode */
function combine(vnode, data) {
    let _type = vnode.type;
    let _data = vnode.data;
    let _value = vnode.value;
    let _tag = vnode.tag;
    let _children = vnode.children;

    let _vnode = null;

    if (_type === 3) { // 文本节点 
        // 对文本处理
        _value = _value.replace(rkuohao, function (_, g) {
            return getValueByPath(data, g.trim());
        });
        _vnode = new VNode(_tag, _data, _value, _type)
    } else if (_type === 1) { // 元素节点
        _vnode = new VNode(_tag, _data, _value, _type);
        _children.forEach(_subvnode => _vnode.appendChild(combine(_subvnode, data)));
    }
    return _vnode;
}
```

- JGVue 函数
  - 初始化
  - mount
  - mountComponent
  - createRenderFn
  - update

```js
function JGVue(options) {
    this._data = options.data;
    let elm = document.querySelector(options.el); // vue 是字符串, 这里是 DOM 
    this._template = elm;
    this._parent = elm.parentNode;

    this.mount(); // 挂载
}

JGVue.prototype.mount = function () {
    // 需要提供一个 render 方法: 生成 虚拟 DOM
    this.render = this.createRenderFn() // 带有缓存 ( Vue 本身是可以带有 render 成员 )

    this.mountComponent();
}
JGVue.prototype.mountComponent = function () {
    // 执行 mountComponent() 函数 
    let mount = () => { // 这里是一个函数, 函数的 this 默认是全局对象 "函数调用模式"
        this.update(this.render())
    }
    mount.call(this); // 本质应该交给 watcher 来调用, 但是还没有讲到这里

    // 为什么
    // this.update( this.render() ); // 使用发布订阅模式. 渲染和计算的行为应该交给 watcher 来完成
}

/**
     * 在真正的 Vue 中使用了 二次提交的 设计结构
     * 1. 在 页面中 的 DOM 和 虚拟 DOM 是一一对应的关系
     * 2. 先 有 AST 和 数据 生成 VNode ( 新, render )
     * 3. 将 就的 VNode 和 新的 VNode 比较 ( diff ), 更新 ( update )
     */

// 这里是生成 render 函数, 目的是缓存 抽象语法树 ( 我们使用 虚拟 DOM 来模拟 )
JGVue.prototype.createRenderFn = function () {
    let ast = getVNode(this._template);
    // Vue: 将 AST + data => VNode
    // 我们: 带有坑的 VNode + data => 含有数据的 VNode
    return function render() {
        // 将 带有 坑的 VNode 转换为 待数据的 VNode
        let _tmp = combine(ast, this._data);
        return _tmp;
    }
}

// 将虚拟 DOM 渲染到页面中: diff 算法就在里
JGVue.prototype.update = function (vnode) {
    // 简化, 直接生成 HTML DOM replaceChild 到页面中
    // 父元素.replaceChild( 新元素, 旧元素 )
    let realDOM = parseVNode(vnode);

    this._parent.replaceChild(realDOM, document.querySelector('#root'));
    // 这个算法是不负责任的: 
    // 每次会将页面中的 DOM 全部替换
}

```

- 使用方式：

```js
let app = new JGVue({
    el: '#root',
    data: {
        name: '张三'
        , age: 19
        , gender: '难'
    }
});
```



## 递归获取 data 的属性

- 普通版本：

```js
/** 原理 */
function getValue(data, path) {
  let paths = path.split('.')
  let res = data
  while (prop = paths.shift()) {
    res = res[prop]
  }
  return res
}

const data = {
  a: {
    b: {
      c: 'zzz'
    }
  }
}

// getValue(data, 'a.b.c')
console.log('getValue', getValue(data, 'a.b.c'));
```

- 进阶版本：

```js
/** 升级版，柯里化--使用闭包方式提升性能 */
function createGetValue(path) {
  let paths = path.split('.')

  return function getValue(data) {
    let res = data
    while (prop = paths.shift()) {
      res = res[prop]
    }
    return res
  }
}


const data2 = {
  a: {
    b: {
      c: 'zzz'
    }
  }
}
const fn = createGetValue('a.b.c')
const res = fn(data2)
console.log('createGetValue', res);
```



## 响应式原理

###  defineProperty 的使用

- 我们在使用 Vue 时候, 赋值属性获得属性都是直接使用的 Vue 实例
- 我们在设计属性值的时候, 页面的数据更新
- 使用 `Object.defineProperty`

```js
Object.defineProperty( 对象, '设置什么属性名', {
  writeable
  configurable
  enumerable  // 控制属性是否可枚举, 是不是可以被 for-in 取出来
  set() {}  //赋值触发
  get() {}  //取值触发
} )

```

- 封装成 `defineReactive`

```js
// 简化后的版本
function defineReactive( target, key, value, enumerable ) {
  // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
  Object.defineProperty( target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get () {
      console.log( `读取 o 的 ${key} 属性` ); // 额外
      return value;
    },
    set ( newVal ) {
      console.log( `设置 o 的 ${key} 属性为: ${newVal}` ); // 额外
      value = newVal;
    }
  } )
}
```


但是，实际开发中对象一般是有多级

```js
let o = {
  list: [
    {  }
  ],
  ads: [
    { }
  ],
  user: {

  }
}
```

**怎么处理呢???**

**答案： 递归**

### 对象变成响应式

```js
let data = {
    name: '张三',
    age: 19,
    course: [
        { name: '语文' },
        { name: '数学' },
        { name: '英语' },
    ]
}; 

// 除了递归还可以使用队列 ( 深度优先转换为广度优先 )
// 简化后的版本
function defineReactive(target, key, value, enumerable) {
    // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
    if (typeof value === 'object' && value != null && !Array.isArray(value)) {
        // 是非数组的引用类型
        reactify(value); // 递归
    }
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,

        get() {
            console.log(`读取 ${key} 属性`); // 额外
            return value;
        },
        set(newVal) {
            console.log(`设置 ${key} 属性为: ${newVal}`); // 额外
            value = newVal;
        }
    });
}
// 将对象 o 响应式化
function reactify(o) {
    let keys = Object.keys(o);
    for (let i = 0;i < keys.length;i++) {
        let key = keys[i]; // 属性名
        let value = o[key];
        // 判断这个属性是不是引用类型, 判断是不是数组
        // 如果引用类型就需要递归, 如果不是就不用递归
        //  如果不是引用类型, 需要使用 defineReactive 将其变成响应式的
        //  如果是引用类型, 还是需要调用 defineReactive 将其变成响应式的
        // 如果是数组呢? 就需要遍历数组, 然后将数组里面的元素进行响应式化
        if (Array.isArray(value)) {
            // 数组
            for (let j = 0;j < value.length;j++) {
                reactify(value[j]); // 递归
            }
        } else {
            // 对象或值类型
            defineReactive(o, key, value, true);
        }
    }
}

// 把对象变成响应式
reactify(data);
```



### 响应式中数组的处理

- 前置知识：如何拓展函数的功能？

```js
// 这个就是在函数原有的基础上增加额外的操作: 函数的拦截
// 1. 使用一个临时的函数名存储函数
// 2. 重新定义原来的函数
// 3. 定义扩展的功能
// 4. 调用临时的那个函数

function func() {
    console.log( '原始的功能' );
}

// 1
let _tmpFn = func;

// 2
func = function () {
    // 4
    _tmpFn();

    // 3
    console.log( '新的扩展的功能' );

};


func(); 
// 1. 打印出 原始的功能
// 2. 打印出 新的扩展功能
```

基于此知识，我们可以用在 **数组方法的拓展上**。

**对于对象可以使用 递归来响应式化, 但是 数组 我们也需要处理，这 7 个方法。**

- push
- pop
- shift
- unshift
- reverse
- sort
- splice

要做什么事情呢?

1. 在改变数组的数据的时候, 要发出通知
   - Vue 2 中的缺陷, 数组发生变化, 设置 length 没法通知 ( Vue 3 中使用 Proxy 语法 ES6 的语法解决了这个问题 )
2. 加入的元素应该变成响应式的

技巧: 如果一个函数已经定义了, 但是我们需要扩展其功能, 我们一般的处理办法:

1. 使用一个临时的函数名存储函数
2. 重新定义原来的函数
3. 定义扩展的功能
4. 调用临时的那个函数

- 数组方法处理的示例代码：

```js
let ARRAY_METHOD = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice',
];

// 思路, 原型式继承: 修改原型链的结构
let arr = [];
// 继承关系: arr -> Array.prototype -> Object.prototype -> ...
// 继承关系: arr -> 改写的方法 -> Array.prototype -> Object.prototype -> ...
let array_methods = Object.create(Array.prototype);

ARRAY_METHOD.forEach(method => {
    array_methods[method] = function () {
        // 调用原来的方法
        console.log('调用的是拦截的 ' + method + ' 方法');
        // 将数据进行响应式化
        let res = Array.prototype[method].apply(this, arguments);
        // Array.prototype[ method ].call( this, ...arguments ); // 类比
        return res;
    }
});

arr.__proto__ = array_methods;


// Vue 的源码中也做了判断
// 如果 浏览器支持 __proto__ 那么他就这么做
// 如果不支持, vue 使用的是混入法

// 注意 arr.length = 0 无法响应式
```

- 结合 响应式方法使用 的示例代码：

```js
let data = {
    name: '张三',
    age: 19,
    course: [
        { name: '语文' },
        { name: '数学' },
        { name: '英语' },
    ]
};


let ARRAY_METHOD = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice',
];
let array_methods = Object.create(Array.prototype);
ARRAY_METHOD.forEach(method => {
    array_methods[method] = function () {
        // 调用原来的方法
        console.log('调用的是拦截的 ' + method + ' 方法');

        // 将数据进行响应式化
        for (let i = 0;i < arguments.length;i++) {
            reactify(arguments[i]);
        }

        let res = Array.prototype[method].apply(this, arguments);
        // Array.prototype[ method ].call( this, ...arguments ); // 类比
        return res;
    }
});

// 简化后的版本
function defineReactive(target, key, value, enumerable) {
    // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
    if (typeof value === 'object' && value != null && !Array.isArray(value)) {
        // 是非数组的引用类型
        reactify(value); // 递归
    }
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            console.log(`读取 ${key} 属性`); // 额外
            return value;
        },
        set(newVal) {
            console.log(`设置 ${key} 属性为: ${newVal}`); // 额外
            value = newVal;
        }
    });
}

// 将对象 o 响应式化
function reactify(o) {
    let keys = Object.keys(o);
    for (let i = 0;i < keys.length;i++) {
        let key = keys[i]; // 属性名
        let value = o[key];
        if (Array.isArray(value)) {
            // 数组 --> 核心代码
            value.__proto__ = array_methods; // 数组就响应式了
            for (let j = 0;j < value.length;j++) {
                reactify(value[j]); // 递归
            }
        } else {
            // 对象或值类型
            defineReactive(o, key, value, true);
        }
    }
}

// 数据响应式
reactify(data);
```

这里的核心代码在于：

```js
if (Array.isArray(value)) {
    // 数组 --> 核心代码
    value.__proto__ = array_methods; // 数组就响应式了
   
    
    // 遍历属性支持响应式
    for (let j = 0;j < value.length;j++) {
        reactify(value[j]); // 递归
    }
}
```


扩展数组的 push 和 pop 怎么处理呢???

- 直接修改 prototype ？**不行**
- 修改要进行响应式化的数组的原型 ( __proto__ )

已经将对象改成响应式的了. 但是如果直接给对象赋值, 赋值另一个对象, 那么就不是响应式的了, 怎么办? 

```
// 继承关系: arr -> Array.prototype -> Object.prototype -> ...
// 继承关系: arr -> 改写的方法 -> Array.prototype -> Object.prototype -> ...
```



- 此时的 JGVue 总览

```js
/** 虚拟 DOM 构造函数 */
class VNode {
    constructor( tag, data, value, type ) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }

    appendChild ( vnode ) {
        this.children.push( vnode );
    }
}
/** 由 HTML DOM -> VNode: 将这个函数当做 compiler 函数 */
function getVNode( node ) { 
    let nodeType = node.nodeType;
    let _vnode = null;
    if ( nodeType === 1 ) {
        // 元素
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for ( let i = 0; i < attrs.length; i++ ) { // attrs[ i ] 属性节点 ( nodeType == 2 )
            _attrObj[ attrs[ i ].nodeName ] = attrs[ i ].nodeValue;
        }
        _vnode = new VNode( nodeName, _attrObj, undefined, nodeType );
        // 考虑 node 的子元素
        let childNodes = node.childNodes;
        for ( let i = 0; i < childNodes.length; i++ ) {
            _vnode.appendChild( getVNode( childNodes[ i ] ) ); // 递归
        }
    } else if ( nodeType === 3 ) {
        _vnode = new VNode( undefined, undefined, node.nodeValue, nodeType );
    }
    return _vnode;
}

/** 将虚拟 DOM 转换成真正的 DOM */
function parseVNode( vnode ) {
    // 创建 真实的 DOM
    let type = vnode.type;
    let _node = null;
    if ( type === 3 ) {
        return document.createTextNode( vnode.value ); // 创建文本节点
    } else if ( type === 1 ) {
        _node = document.createElement( vnode.tag );
        // 属性
        let data = vnode.data; // 现在这个 data 是键值对
        Object.keys( data ).forEach( ( key ) => {
            let attrName = key;
            let attrValue = data[ key ];
            _node.setAttribute( attrName, attrValue );
        } );

        // 子元素
        let children = vnode.children;
        children.forEach( subvnode => {
            _node.appendChild(parseVNode(subvnode)); // 递归转换子元素 ( 虚拟 DOM )
        } );
        return _node;
    }
}

let rkuohao = /\{\{(.+?)\}\}/g;
/** 根据路径 访问对象成员 */
function getValueByPath( obj, path ) {
    let paths = path.split( '.' ); // [ xxx, yyy, zzz ]
    let res = obj;
    let prop;
    while( prop = paths.shift() ) {
        res = res[ prop ];
    }
    return res;
}

/** 将 带有 坑的 Vnode 与数据 data 结合, 得到 填充数据的 VNode: 模拟 AST -> VNode */
function combine( vnode, data ) {
    let _type = vnode.type;
    let _data = vnode.data;
    let _value = vnode.value;
    let _tag = vnode.tag;
    let _children = vnode.children;


    let _vnode = null;

    if ( _type === 3 ) { // 文本节点 
        // 对文本处理
        _value = _value.replace( rkuohao, function ( _, g ) {
            return getValueByPath( data, g.trim() ); // 除了 get 读取器
        } );
        _vnode = new VNode( _tag, _data, _value, _type )
    } else if ( _type === 1 ) { // 元素节点
        _vnode = new VNode( _tag, _data, _value, _type );
        _children.forEach( _subvnode => _vnode.appendChild(combine(_subvnode, data)));
    }
    return _vnode;
}

function JGVue( options ) {
    this._data = options.data;
    let elm = document.querySelector( options.el ); // vue 是字符串, 这里是 DOM 
    this._template = elm;
    this._parent = elm.parentNode;

    reactify(this._data, this); // 将 Vue 实例传入, 折中的处理
    this.mount(); // 挂载
}  

JGVue.prototype.mount = function () {
    // 需要提供一个 render 方法: 生成 虚拟 DOM
    this.render = this.createRenderFn() // 带有缓存 ( Vue 本身是可以带有 render 成员 )
    this.mountComponent();
}
JGVue.prototype.mountComponent = function () {
    // 执行 mountComponent() 函数 
    let mount = () => { // 这里是一个函数, 函数的 this 默认是全局对象 "函数调用模式"
        this.update( this.render() )
    }
    mount.call( this ); // 本质应该交给 watcher 来调用, 但是还没有讲到这里

    // 为什么
    // this.update( this.render() ); // 使用发布订阅模式. 渲染和计算的行为应该交给 watcher 来完成
}

/**
     * 在真正的 Vue 中使用了 二次提交的 设计结构
     * 1. 在 页面中 的 DOM 和 虚拟 DOM 是一一对应的关系
     * 2. 先 有 AST 和 数据 生成 VNode ( 新, render )
     * 3. 将 就的 VNode 和 新的 VNode 比较 ( diff ), 更新 ( update )
     */

// 这里是生成 render 函数, 目的是缓存 抽象语法树 ( 我们使用 虚拟 DOM 来模拟 )
JGVue.prototype.createRenderFn = function () {
    let ast = getVNode( this._template );
    // Vue: 将 AST + data => VNode
    // 我们: 带有坑的 VNode + data => 含有数据的 VNode
    return function render () {
        // 将 带有 坑的 VNode 转换为 待数据的 VNode
        let _tmp = combine( ast, this._data );
        return _tmp;
    }
}

// 将虚拟 DOM 渲染到页面中: diff 算法就在里
JGVue.prototype.update = function ( vnode ) {
    // 简化, 直接生成 HTML DOM replaceChild 到页面中
    // 父元素.replaceChild( 新元素, 旧元素 )
    let realDOM = parseVNode( vnode );

    this._parent.replaceChild(realDOM, document.querySelector( '#root' ));
    // 说明：这个算法是不负责任的，每次会将页面中的 DOM 全部替换
}

// 响应式化的部分
let ARRAY_METHOD = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice',
];
let array_methods = Object.create( Array.prototype );
ARRAY_METHOD.forEach( method => {
    array_methods[ method ] = function () {
        // 调用原来的方法
        console.log( '调用的是拦截的 ' + method + ' 方法' );
        // 将数据进行响应式化
        for( let i = 0; i < arguments.length; i++ ) {
            reactify( arguments[ i ] );
        } 

        let res = Array.prototype[ method ].apply( this, arguments );
        // Array.prototype[ method ].call( this, ...arguments ); // 类比
        return res;
    }
} );

// 简化后的版本 
function defineReactive( target, key, value, enumerable ) {
    // 折中处理后, this 就是 Vue 实例
    let that = this;
    // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
    if ( typeof value === 'object' && value != null && !Array.isArray( value ) ) {
        // 是非数组的引用类型
        reactify( value ); // 递归
    }

    Object.defineProperty( target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get () {
            console.log( `读取 ${key} 属性` ); // 额外
            return value;
        },
        set ( newVal ) {
            console.log( `设置 ${key} 属性为: ${newVal}` ); // 额外
            value = newVal;
            // 模板刷新 (这现在是假的, 只是演示)
            // vue 实例??? watcher 就不会有这个问题
            that.mountComponent();

        }
    } );
}
// 将对象 o 响应式化
function reactify( o, vm ) {
    let keys = Object.keys( o );

    for ( let i = 0; i < keys.length; i++ ) {
        let key = keys[ i ]; // 属性名
        let value = o[ key ];
        if ( Array.isArray( value ) ) {
            // 数组-响应式
            value.__proto__ = array_methods; // 数组就响应式了
            for ( let j = 0; j < value.length; j++ ) {
                reactify( value[ j ], vm ); // 递归
            }
        } else {
            // 对象或值类型
            defineReactive.call( vm, o, key, value, true );
        }
    }
}


let app = new JGVue( {
    el: '#root',
    data: {
        name: '张三',
        age: 19,
        gender: '难',
        datas: [
            { info: '好难' },
            { info: '太难' },
            { info: '真的难么?' },
            { info: '练习一下' },
        ]
    }
} );
```



### this.data 初始化和代理 proxy

vue 是怎么做到访问 `this.xxx` 实际访问的是 `this.data.xxx ` 的呢？

### 解释 proxy

```js
app._data.name
// vue 设计, 不希望访问 _ 开头的数据
// vue 中有一个潜规则:
// 以 _ 开头的数据是私有数据
// 以 $ 开头的是只读数据
app.name
// 将 对 _data.xxx 的访问 交给了 实例

// 重点: 访问 app 的 xxx 就是在访问 app._data.xxx
```

### proxy 实现

```js
/** 将 某一个对象的属性 访问 映射到 对象的某一个属性成员上 */
function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get () {
            return target[ prop ][ key ];
        },
        set ( newVal ) {
            target[ prop ][ key ] = newVal;
        }
    } );
}
```

### 数据初始化

```js
JGVue.prototype.initData = function () {
    // 遍历 this._data 的成员, 将 属性转换为响应式 ( 上 ), 将 直接属性, 代理到 实例上
    let keys = Object.keys(this._data);

    // 响应式化
    for ( let i = 0; i < keys.length; i++ ) {
        // 这里将 对象 this._data[ keys[ i ] ] 变成响应式的
        reactify( this._data, this );
    }

    // 代理
    for ( let i = 0; i < keys.length; i++ ) {
        // 将 this._data[ keys[ i ] ] 映射到 this[ keys[ i ] ] 上
        // 就是要 让 this 提供 keys[ i ] 这个属性
        // 在访问这个属性的时候 相当于在 访文this._data 的这个属性
        proxy( this, '_data', keys[i] );
    }
};
```

此时的 JGVue 初始化，需要新增 `initData` 方法代理数据

```js
function JGVue( options ) {
    this._data = options.data;
    let elm = document.querySelector(options.el); // vue 是字符串, 这里是 DOM 
    this._template = elm;
    this._parent = elm.parentNode;

    // 将 data 进行响应式转换, 进行代理
    this.initData(); 

    this.mount(); // 挂载
} 
```



## 发布订阅模式

目标: 解耦, 让各个模块之间没有紧密的联系

现在的处理办法是 属性在更新的 时候 调用 mountComponent 方法. 

问题: mountComponent 更新的是什么??? (现在) 全部的页面 -> 当前虚拟 DOM 对应的页面 DOM

在 Vue 中, 整个的更新是按照组件为单位进行 **判断**, 以节点为单位进行更新.

- 如果代码中没有自定义组件, 那么在比较算法的时候, 我们会将全部的模板 对应的 虚拟 DOM 进行比较.
- 如果代码中含有自定义组件, 那么在比较算法的时候, 就会判断更新的是哪一些组件中的属性, 只会判断更新数据的组件, 其他组件不会更新.

复杂的页面是有很多组件构成. 每一个属性要更新的都要调用 更新的方法?

**目标,：如果修改了什么属性, 就尽可能只更新这些属性对应的页面 DOM**

这样就一定不能将更新的代码写死.

例子: 预售可能一个东西没有现货, 告诉老板, 如果东西到了 就告诉我. 

老板就是发布者
订阅什么东西作为中间媒介
我就是订阅者

使用代码的结构来描述:

1. 老板提供一个 账簿( 数组 )
2. 我可以根据需求订阅我的商品( 老板要记录下 谁 定了什么东西, 在数组中存储 某些东西 )
3. 等待, 可以做其他的事情
4. 当货品来到的时候, 老板就查看 账簿, 挨个的打电话 ( 遍历数组, 取出数组的元素来使用 )

实际上就是事件模型

1. 有一个 event 对象
2. on, off, emit 方法

实现事件模型, 思考怎么用?

1. event 是一个全局对象
2. event.on( '事件名', 处理函数 ), 订阅事件
   1. 事件可以连续订阅
   2. 可以移除: event.off()
      1. 移除所有
      2. 移除某一个类型的事件
      3. 移除某一个类型的某一个处理函数
3. 写别的代码
4. event.emit( '事件名', 参数 ), 先前注册的事件处理函数就会依次调用

原因:

1. 描述发布订阅模式
2. 后面会使用到事件


发布订阅模式 ( 形式不局限于函数, 形式可以是对象等 ) :

1. 中间的**全局的容器**, 用来**存储**可以被触发的东西( 函数, 对象 )
2. 需要一个方法, 可以往容器中**传入**东西 ( 函数, 对象 )
3. 需要一个方法, 可以将容器中的东西取出来**使用**( 函数调用, 对象的方法调用 )

Vue 模型

页面中的变更 ( diff ) 是一组件为单位

- 如果页面中只有一个组件 ( Vue 实例 ), 不会有性能损失
- 但是如果页面中有多个组件 ( 多 watcher 的一种情况 ), 第一次会有 多个组件的 watcher 存入到 全局watcher 中.
  - 如果修改了局部的数据( 例如其中一个组件的数据 )
  - 表示只会对该组件进行 diff 算法, 也就是说只会重新生成该组件的 抽象语法树
  - 只会访问该组件的 watcher
  - 也就表示再次往全局存储的只有该组件的 watcher
  - 页面更新的时候也就只需要更新一部分

```js
let eventBus = {}
function EventBusDispatch() {
  const on = function (type, handler) {
    (eventBus[type] || (eventBus[type] = [])).push(handler)
  }
  const off = function (type, handler) {
    console.log('off--arguments', arguments)
    if (arguments.length === 0) {
      eventBus = {}
    } else if(arguments.length === 1) {
      // off(type)
      eventBus[type] = []
    } else if (arguments.length === 2) {
      // off(type, handler)
      let fnArr = eventBus[type]
      if (!fnArr || !fnArr.length) return
      // 倒着循环，数组序号不受影响
      for (let i = fnArr.length-1; i >= 0; i--) {
        if (fnArr[i] === handler) {
          fnArr.splice(i, 1)
        }
      }
    }
  }
  const emit = function (type)  {
    console.log('emit---arguments: ', arguments);
    let args = [].slice(arguments, 1)
    let fns = eventBus[type]
    if (!fns) return
    for (let i=0; i<fns.length; i++) {
      fns[i].apply(null, args)
    }
  }
  return {
    eventBus,
    on,
    off,
    emit
  }
}

const { on, off, emit } = EventBusDispatch()

const fn1 = () => console.log('fn1')
const fn2 = () => console.log('fn2')
const fn3 = () => console.log('fn3')
on('click', fn1)
on('click2', fn2)
on('click2', fn3)
console.log('eventBus111', eventBus)
emit('click')
off('click2')
console.log('eventBus222', eventBus)

off('click', fn1)

console.log('eventBus333', eventBus)

on('click', fn1)
on('click2', fn2)
on('click2', fn3)
console.log('444---全都有', eventBus)

off()
console.log('555--全部被删除', eventBus)
```



## 移除事件

错误写法：

```js
var btn = document.querySelector( '#btn' );

// // 注册
btn.addEventListener( 'click', function() { 
   console.log( '点击了' );
 });

//移除
btn.removeEventListener( 'click', function() { 
  console.log( '点击了' );
});

// 是不是移除了呢???
```

实际没有，因为移出的 **不是同一个事件函数**

正确写法：

```js
// 函数声明，保证地址唯一
function handler() {
    console.log( '一个可移除的事件处理函数' );
}

btn.addEventListener( 'click', handler );

btn.removeEventListener( 'click', handler );
```



## 响应式原理之 Watcher 和 Dep

> https://juejin.cn/post/6844903870578032648

- 核心原理：

```js
// ... 
let dep = new Dep()
return Object.defineProperty(obj, prop, {
    // ...
    get: function(key) {
        dep.target = this
        dep.addSub()
        // ...
    }
    set: function(newVal) {
        val = newVue;
        // 发送一个dep信号
        dep.notify()
        // ...
    }
})

// vue3 中实现为

let target = {}
let p = new Proxy(target, {
    set: function() {
        //...
    },
    get: function() {
        //...
    }
})

```

为了更好理解，可以看关系图：

![](https://user-gold-cdn.xitu.io/2019/6/18/16b6a027985fa9e6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- Dep 实现

该对象提供 依赖收集 ( depend ) 的功能, 和 派发更新 ( notify ) 的功能

在 notify 中去调用 watcher 的 update 方法

```js
class Dep {
  constructor() {
    // this.id = i++;
    this.subs = []; // 存储的是与 当前 Dep 关联的 watcher
  }
  /** 添加一个 watcher */
  addSub(sub) {}
  /** 移除 */
  removeSub(sub) {}

  /** 将当前 Dep 与当前的 watcher ( 暂时渲染 watcher ) 关联*/
  depend() {}
  /** 触发与之关联的 watcher 的 update 方法, 起到更新的作用 */
  notify() {
    // 在真实的 Vue 中是依次触发 this.subs 中的 watcher 的 update 方法
    if (Dep.target) {
      Dep.target.update();
    }
  }

}
// 全局的容器存储渲染 Watcher
// let globalWatcher
// 学 Vue 的实现
Dep.target = null; // 这就是全局的 Watcher

```

- Watcher 实现

Watcher 的作用：

1. 只考虑修改后刷新 ( 响应式 )
2. 再考虑依赖收集 ( 优化 )

在 Vue 中提供一个构造函数 Watcher，Watcher 会有一些方法: 

- get() 用来进行**计算**或**执行**处理函数
- update() 公共的外部方法, 该方法会触发内部的 run 方法
- run() 运行, 用来判断内部是使用异步运行还是同步运行等, 这个方法最终会调用内部的 get 方法
- cleanupDep() 简单理解为清除队列

我们的页面渲染是上面那一个方法执行的呢???

我们的 watcher 实例有一个属性 vm, 表示的就是 当前的 vue 实例

```js

/** Watcher 观察者, 用于 发射更新的行为 */
class Watcher {

  /**
   * 
   * @param {Object} vm JGVue 实例
   * @param {String|Function} expOrfn 如果是渲染 watcher, 传入的就是渲染函数, 如果是 计算 watcher 传入的就是路径表达式, 暂时只考虑 expOrFn 为函数的情况.
   */
  constructor(vm, expOrfn) {
    this.vm = vm;
    this.getter = expOrfn;

    this.deps = []; // 依赖项
    this.depIds = {}; // 是一个 Set 类型, 用于保证 依赖项的唯一性 ( 简化的代码暂时不实现这一块 )

    // 一开始需要渲染: 真实 vue 中: this.lazy ? undefined : this.get()
    this.get();
  }

  /** 计算, 触发 getter */
  get() {
    this.getter.call(this.vm, this.vm); // 上下文的问题就解决了
  }

  /**
   * 执行, 并判断是懒加载, 还是同步执行, 还是异步执行: 
   * 我们现在只考虑 异步执行 ( 简化的是 同步执行 )
   */
  run() {
    this.get();
    // 在真正的 vue 中是调用 queueWatcher, 来触发 nextTick 进行异步的执行
  }

  /** 对外公开的函数, 用于在 属性发生变化时触发的接口 */
  update() {
    this.run();
  }

  /** 清空依赖队列 */
  cleanupDep() {}
}
```

- 流程分析

Vue的初始化：

- initData
- mount

```js
function JGVue( options ) {
  this._data = options.data;
  let elm = document.querySelector( options.el ); // vue 是字符串, 这里是 DOM 
  this._template = elm;
  this._parent = elm.parentNode;

  // 核心代码
  this.initData(); // 将 data 进行响应式转换, 进行代理
  this.mount(); // 挂载
}  
```

在初始化数据 initData 时：

- 数据初始化
- 对数据进行响应式化：
  - 调用 `defineReactive` 将数据进行响应式
- 数据代理到 this 上

```js
JGVue.prototype.initData = function () {
  // 遍历 this._data 的成员, 将 属性转换为响应式 ( 上 ), 将 直接属性, 代理到 实例上
  let keys = Object.keys(this._data);

  // 响应式化
  observe( this._data );

  // 代理
  for (let i = 0; i < keys.length; i++) {
    // 将 this._data[keys[i ]] 映射到 this[keys[i]] 上
    // 就是要 让 this 提供 keys[i] 这个属性
    // 在访问这个属性的时候 相当于在 访文this._data 的这个属性

    proxy(this, '_data', keys[i]);
  }
};

/** 将对象 o 变成响应式, vm 就是 vue 实例, 为了在调用时处理上下文 */
function observe( obj ) {
  if (Array.isArray(obj)) {
    obj.__proto__ = array_methods;
    for ( let i = 0; i < obj.length; i++ ) {
      observe( obj[ i ] ); // 递归处理每一个数组元素
      // 如果想要这么处理, 就在这里继续调用 defineRective
      // defineReactive.call( vm, obj, i, obj[ i ], true ); 
    }
  } else {
    // 对其成员进行处理
    let keys = Object.keys(obj);
    for ( let i = 0; i < keys.length; i++ ) {
      let prop = keys[i]; // 属性名
      defineReactive(obj, prop, obj[ prop ], true );
    }
  }
}
// ...
```

在 mount 阶段

- `createRenderFn`: 创建渲染函数
- `mountComponent` ：挂载组件
  - 创建全局 watcher，传入 vue 实例和渲染函数
  - 挂载在 Dep.target 上。

```js
JGVue.prototype.mount = function () {
  // 需要提供一个 render 方法: 生成 虚拟 DOM
  this.render = this.createRenderFn() // 带有缓存 (Vue 本身是可以带有 render 成员 )

  this.mountComponent();
}
JGVue.prototype.mountComponent = function () {
  // 执行 mountComponent() 函数 
  let mount = () => { // 这里是一个函数, 函数的 this 默认是全局对象 "函数调用模式"
    this.update(this.render())
  }
  
  // 这个 Watcher 就是全局的 Watcher, 在任何一个位置都可以访问他了 (简化的写法)
  Dep.target = new Watcher(this, mount); // 相当于这里调用了 mount
}
```

在数据响应式过程中：

- 为每一个需要响应式的数据定义 `Dep`
- 每一次响应式数据变化的时候，**派发更新**， 执行所有渲染函数

```js
// 简化后的版本 
function defineReactive(target, key, value, enumerable) {
  if ( typeof value === 'object' && value != null ) {
    // 是非数组的引用类型
    observe(value); // 递归
  }

  let dep = new Dep();

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      // 依赖收集 ( 暂时略 )
      return value;
    },
    set(newVal) {
      if ( value === newVal ) return;

      if (typeof newVal === 'object' && newVal != null) {
        observe(newVal);
      } 
      value = newVal;
      // 派发更新, 找到全局的 watcher, 调用 update
      dep.notify();
    }
  });
}
```

此时，`dep.notify` 派发更新执行的，渲染函数：

```js
notify() {
    // 在真实的 Vue 中是依次触发 this.subs 中的 watcher 的 update 方法
    if (Dep.target) {
        Dep.target.update();
    }
}
```

总体流程梳理：

![](./img/dep-watcher.png)

```
Vue 初始化 --> 
	initData --> observe(this.data) --> defineReactive --> 为每一个响应式对象创建dep: let dep = new Dep() --> get 操作 --> 收集依赖 
		  																					    --> set 操作 --> dep.notify()
	mount --> mountComponent --> 定义 mount 渲染函数 --> 全局 watcher: Dep.target = new Watcher(this, mount) 这里传入了渲染函数 mount

数据变化时：dep.notify()

实际执行的是：Dep.target.update()，其中 Dep.target === Watcher，执行 watcher.update ==> wather.get ==> watcher.getter ==> exportFn ==> mount 函数
```



## Watcher 与 Dep

之前将 渲染 Watcher 放在全局作用域上, 这样处理是有问题的

- vue 项目中包含很多的组件, 各个组件是**自治**
  - 那么 watcher 就可能会有多个
  - 每一个 watcher 用于描述一个渲染行为 或 计算行为
    - 子组件发生数据的更新, 页面需要重新渲染 ( 真正的 Vue 中是**局部**渲染 )
    - 例如 vue 中推荐是使用 计算属性 代替复杂的 插值表达式.
      - 计算属性是会伴随其使用的属性的变化而变化的
      - `name: () => this.firstName + this.lastName` 
        - 计算属性 依赖于 属性 firstName 和 属性 lastName
        - 只要被依赖的属性发生变化, 那么就会促使计算属性 **重新计算** ( Watcher )
- 依赖收集与派发更新是怎么运行起来的

**我们在访问的时候 就会进行收集, 在修改的时候就会更新, 那么收集什么就更新什么**

所谓的依赖收集 **实际上就是告诉当前的 watcher 什么属性被访问了**, 
那么在这个 watcher 计算的时候 或 渲染页面的时候 就会 将这些收集到的属性进行更新.

**如何将 属性与 当前 watcher 关联起来??**

- 在全局 准备一个 targetStack ( watcher 栈, 简单的理解为 watcher "数组", 把一个操作中需要使用的 watcher 都存储起来 )
- 在 Watcher 调用 get 方法的时候, 将当前 Watcher 放到全局, 在 get 之前结束的时候(之后), 将这个 全局的 watcher 移除. 提供: pushTarget, popTarget
- 在每一个属性中 都有 一个 Dep 对象


我们在访问对象属性的时候 ( get ), 我们的渲染 watcher 就在全局中.
将 属性与 watcher 关联, 其实就是将当前渲染的 watcher 存储到属性相关的 dep 中.
同时, 将 dep 也存储到 当前全局的 watcher 中. ( 互相引用的关系 )

- 属性引用了当前的渲染 watcher, **属性知道谁渲染它**
- 当前渲染 watcher 引用了 访问的属性 ( Dep ), **当前的 Watcher 知道渲染了什么属性**


我们的 dep 有一个方法, 叫 notify() 
内部就是将 dep 中的 subs 取出来, 依次调用其 update 方法.

subs 中存储的是 **知道要渲染什么属性的 watcher**



## flow 的基本用法

> https://flow.org/

flow 本身 只是一个 静态的 语法 检查工具

优势:

1. 足够简单, 合适使用
2. **可以为已有的项目, 进行优化**
3. 为 ts 可以做一个铺垫

准备使用: 

用法: 

1. 使用命令行工具
   - 编写代码, 执行命令检查如果有问题 则提示, 没问题跳过 ( 和传统编译型语言 非常类似 )
2. 使用 IDE 插件 ( 推荐 )
   - 所见即所得


安装的内容

1. flow-bin 它就是 flow 的静态类型检查工具 ( 主程序 ).
2. 编译器 ( compiler ), 例如 flow-remove-types, 将类型的语法结构删除掉, 还原成 纯 js 的文件.


```js
// note
// flow 是一个静态类型的检查工具
// 给 js 增加了 类型

// 在变量的名字后面 跟上 `:类型名`

// 在使用的 需要在文件一开始的时候使用注释 
// 使用这个注释是告诉 flow 工具 需要检查这个文件, 如果不使用这个注释 flow 工具就会忽略该文件

// @flow

/* @flow */
```


## flow 命令行工具的用法

首先需要安装软件

```sh
$ npm i flow-bin flow-remove-types
```

编写代码

1. 代码中添加 一个 注释 `// @flow ` 或者 `/* @flow */` 
2. 在运行 flow 之前, 使用 `npx flow init` 初始化

检查代码

```sh
$ npx flow
```

注意: `npx` 是 node 工具, 是为了使用项目文件夹下 node_modules 中的可执行程序的工具

## flow-remove-types

将代码转换为纯 js 的代码

```sh
npx flow-remove-types 源文件 -d 生成的文件
```

一般会将该命令配置 到 package.json 文件中


## 使用 IDE 插件

> 补充一下: 第一次打开 flow 代码的时候, VS CODE 会下滑红色波浪线

推荐使用 flow language support 这个插件 ( VS Code 编辑器 )



## Vue 源码说明

`.flowconfig` 中

`module.name_mapper='^sfc/\(.*\)$' -> '<PROJECT_ROOT>/src/sfc/\1'`

的含义是将 代码中 from 后面导入模块使用的路径 `sfc/xxx/aa` 映射到 `项目根目录/src/sfc/xxx/aa`


## rollup 的基本用法

> https://www.rollupjs.com/

注意:

1. 版本, 生成文件的版本
2. 使用模块化的语法是 ES6 语法 ( http://es6.ruanyifeng.com/#docs/module )

使用 

1. 安装 ( 局部 安装 )
2. rollup 源文件的路径 --file 生成文件的路径 --format umd --name 生成的库的名字




面试题:

```js
let params = 'a=b&c=d&e=f';

// params.split( '&' ).reduce( (res, v) => {
//   let kv = v.split( '=' );
//   res[ kv[ 0 ] ] = kv[ 1 ];
//   return res;
// }, {} );

let t = null;
params.split( '&' ).reduce( ( res, v ) => ( t = v.split( '=' ), res[ t[ 0 ] ] = t[ 1 ], res ), {} );

```

2.虚拟DOM 的 render 方法



## Vue 源码值得学习的东西

### 缓存函数

> src/shared/util.js-> cached

函数：

```js
export function cached(fn) {
    const cache = Object.create(null)
    return function cacheFn(str) {
        const hit = cache[str]
        return hit ? (cache[hit] = fn[str])
    }
}
    
// 等价于
let hit = cached[str]
if (hit == null) { // null or undefined
    let res = fn[str]
    cached[str] = res
    return res
} else {
    return hit
}
```



### 驼峰命名规则转换函数

```js
/**
 * Hyphenate a camelCase string. 驼峰转连字符-> toDo ==> to-do
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```



### 比较两个对象是否相等

```js

// 在面试中可能会遇到, 思想重要
// 比较两个对象是否是相等的 两个对象
// 1. js 中对象是无法使用 == 来比较的, 比是地址
// 2. 我们一般会定义如果对象的各个属性值都相等 那么对象就是相等的对象. 例如: {} 就与 {} 相等.

// 算法描述
// 1. 假定对象 a 和 b
// 2. 遍历 a 中的成员, 判断是否每一个 a 中的成员都在 b 中. 并且 与 b 中的对应成员相等.
// 3. 再遍历 b 中的成员, 判断是否每一个 b 中的成员都在 a 中. 并且 与 a 中的对应成员相等.
// 4. 如果成员是引用类型, 递归.

// 抽象一下, 判断两个集合是否相等

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual (a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i]) // b 包含 a
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime() // 单独处理 Date 类型, 时间戳应该是一样的
      } else if ( 0 ) {
        // 如果需要考虑其它类型, 添加 if 即可，比如，正则表达式等
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        // 先判断 key 的长度, 再判断 a 包含于 b
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
```



### 让一个函数只允许调用一次

```js
// 让一个事件 ( 一个函数 ) 只允许调用一次
// 在 vue 中有函数方法 ( on, off 等, once ), once 事件就是这个思路
// 指令 v-on:click.once  ==> https://cn.vuejs.org/v2/guide/events.html
/**
 * Ensure a function is called only once.
 */
export function once (fn: Function): Function {
  let called = false // 是否调用过
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

### 带有缓存功能的函数

```js
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * 
 * makeMap 生成一个带有缓存的 函数, 用于判断 数据是否是缓存中的数据, 
 * 代表 判断字符串 ( 标签名 ) 是否为内置的 HTML 标签
 */
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

// 具体使用例子

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
```



### 删除数组元素

```js
/**
 * Remove an item from an array.
 */
export function remove (arr: Array<any>, item: any): Array<any> | void {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```

### 判断独有属性

```js
/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```





## 源码分析

### Vue 的构造流程

> src/core/instance/index.js 分析 Vue 的构造流程

- `index.js`

```js
/** Vue 构造函数 */
function Vue (options) {
  
  // 初始化
  this._init(options)
}

initMixin(Vue)        // 挂载初始化方法 ( _init )
stateMixin(Vue)       // 挂载 状态处理方法
eventsMixin(Vue)      // 挂载 事件 的方法
lifecycleMixin(Vue)   // 挂载 生命周期方法
renderMixin(Vue)      // 挂载与渲染有关的方法

export default Vue
```



- `init.js`

```js
export function initMixin (Vue: Class<Component>) {

  Vue.prototype._init = function (options?: Object) {
    /** Vue 实例 */
    const vm: Component = this
    // a uid
    vm._uid = uid++

    // a flag to avoid this being observed
    vm._isVue = true

    // merge options
    if (options && options._isComponent) {
      // 开始进行源码分析, 一般都是使用简单的 Vue 实例, 这里是针对组件, 暂时略
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(     // mergeOptions 可以简单的理解为合并, 为我们的 options 增加属性
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }


    // expose real self
    vm._self = vm

    initLifecycle(vm)                 // 初始化生命周期的 一些状态变量
    initEvents(vm)                    // 初始化事件的 容器
    initRender(vm)                    // 初始化创建元素的方法
    callHook(vm, 'beforeCreate')      // 调用生命周期函数
    initInjections(vm) // resolve injections before data/props // 初始化注入器 略
    initState(vm)                     // 重点, 初始化状态数据 ( data, property 等 )
    initProvide(vm) // resolve provide after data/props // 略
    callHook(vm, 'created')           // 生命周期函数的调用

    // 前面的代码是组件的创建
    // let app = new Vue( ... )
    // app.$mount( ... )

    if (vm.$options.el) {
      vm.$mount(vm.$options.el) // 组件的挂载, 将组件 挂载 到 el 描述的元素上
      // 会先调用 扩展的 那个 $mount 方法, 生成 render
      // 再调用 原始的 $mount 方法, 获得元素, 再调用 mountComponent 方法
      // 这两个方法都定义在 platforms/web 里面
    }
  }
}
```



- `proxy.js`
- `render.js` 
- `state.js` 文件

```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options

  // 处理 options.props 的成员, 一般定义组件的时候, 用于定义对外的成员, 初学少用, 其处理逻辑与 data 类似
  if (opts.props) initProps(vm, opts.props)

  // 处理 options.methods 的成员, 处理方法成员
  if (opts.methods) initMethods(vm, opts.methods)

  // 处理 options.data ( 响应式化 )
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }

  // 处理 options.computed 计算属性
  if (opts.computed) initComputed(vm, opts.computed)

  // 处理 options.watch 
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

// ...
function initData (vm: Component) {
  let data = vm.$options.data

  /** 将 data 挂载到 实例的 _data 上 */
  data = vm._data = typeof data === 'function'
    ? getData(data, vm) // 将函数调用一下, 获得函数的返回值
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
  }
  // proxy data on instance
  const keys = Object.keys(data)

  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]

    if (!isReserved(key)) {
      // ... 省略了其他逻辑
      proxy(vm, `_data`, key) 
      // 循环了 data 的所有属性, 映射到 Vue 实例上, 
      // 就必须要使用 app._data.xxx 来访问
      // 而是使用 app.xxx 来方法
    }
  }
  
  // observe data
  observe(data, true /* asRootData */) // 响应式化
}

// ...
export function getData (data: Function, vm: Component): any {
  pushTarget()  
  // 由于此时是 Vue 的初始化, 还没有进行模板渲染, 所以不需要进行依赖收集, 在 pushTarget 的时候传入 空
  // 就将全局的 Watcher 设置为 undefined, 依赖收集的时候有一个判断是 Dep.target 存在的时候才收集
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```




### Vue 的 observer 流程

> src/core/observer/index.js



- `array.js` 文件，特点在于 `enumrable` 作为参数传入，在使用 `Object.keys()` 时候避免递归自己陷入死循环
- `dep.js` 文件，每一个属性都有 `dep`，这里的 `dep` 会记录下每一个参与计算或渲染的 `watcher`
- `traverse.js` 递归比那里响应式数据 ==》 涉及到 数组去重，终极方案可以参考 `looseEqual` 工具方法的做法。

```js
// 递归属性变成响应式对象 ==> 避免重复递归自己
const seenObjects = new Set()
function _traverse (val: any, seen: SimpleSet) {
  let i, keys
  const isA = Array.isArray(val)

  /** 如果数据不是响应式的就不需要递归遍历 */
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }

  /** __ob__ 是表示这个对象是响应式对象, ob 就是 Observer */
  if (val.__ob__) {
    const depId = val.__ob__.dep.id

    /** 保证了循环引用不会递归遍历 */
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  if (isA) {
    i = val.length
    while (i--) _traverse(val[i], seen) // 对每一个数组项 递归 访问
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen) // 对每一个属性递归访问
  }
}
```

- `index.js` 文件，获取所有属性描述：`Object.getOwnPropertyDescriptor(obj, key)` ；以及 `NaN` 处理：`val !== val`  唯一一个自己不等于自己的。
- `watcher.js` 难点，需要重点理解。
- `scheduler.js` 文件，watcher 队列，对比理解为事件队列。nextTick 实现。
  - nextTick 实现分了几种降级实现：[资料-Nodejs事件循环](http://nodejs.cn/learn/the-nodejs-event-loop)， [Node.js 事件循环](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
    - Promise
    - MutaionObserver
    - setImmediate
    - setTimeout

 