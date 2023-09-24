---
title: this 的学习
date: 2018-01-22
tags: 
  - this
---

# this 的学习

![](https://i.loli.net/2018/01/22/5a659d377049d.jpg)

##  this 是什么？

### 唯一解释

- **this 是 `call()` 的第一个参数**

### 具体例子

例子1：

```
button.onclick = function f1(){
  console.log(this)
}
```

问题：这里的 `this` 是什么？

答案： `this` === `button` ，触发事件的元素

确定方式：

（1）  看 `onclick()` 的源码，但是我们大多数人都做不到 

（2）MDN的开发者知道 `onclick()` 的源码，知道 `f1.call()` 的第一个参数，[onclick-MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick)

![](https://i.loli.net/2018/01/22/5a656671e3d70.png)

例子2：

```
button.addEventListener('click',function f2(){
  console.log(this)
})
```

问题：这里的 `this` 是什么？

答案：`this===button`  //该元素的引用

确定方式：

（1）  看 `addEventListener()` 的源码，但是我们大多数人都做不到 

（2）MDN的开发者知道 `addEventListener()` 的源码，知道 `f2.call()` 的第一个参数，[addEventListener-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

![](https://i.loli.net/2018/01/22/5a65687f64224.png)

例子3：

```
$('ul').on('click','li',function(){
  console.log(this)
})
```

问题：这里的 `this` 是什么？

答案：`this===button`  // button

![](https://i.loli.net/2018/01/22/5a65856d3b8aa.png)

参考jQery API：  [jQuery.on()](https://www.jquery123.com/on/)

例子4：

```
button.onclick.call({name:'frank'})
```

问题：这里的 `this` 是什么？

答：`this === {name:'frank'}`

原因：this是call() 的第一个参数

例子5：

```javascript
function X(){
  return object = {
    name:'object',
    f1(x){
      x.f2()
    },
    f2(){
      console.log(this)  //A
    }
  }
}

var options = {
  name:'options',
  f1(){} ,
  f2(){
    console.log(this) // B
  }
}

var x = X()
x.f1(options)

```

问：上述代码中，执行结果为A 还是 B ？为什么？

答：B  ，因为

（1） x  为 函数 X的执行结果 object

（2） `x.f1(options)` 实际上是执行的 `x.f1()` 但是参数为 `options` ，执行参数 `options.f2()` 即为 `options.f2() //B`

例子5

```javascript
function X(){
  return object = {
    name:'object',
    f1(x){
      this.options = x
      this.f2()
    },
    f2(){
     this.options.f2.call(this)  //C    object/options
    }
  }
}

var options = {
  name:'options',
  f1(){} ,
  f2(){
    console.log(this) // D  object/options
  }
}

var x = X()
x.f1(options)

```

问：上述代码中，执行结果打印出的  `this` 是什么？

答：`object`  执行顺序和对应的 this分别为 

```javascript
function X(){
  return object = {
    name:'object',
    f1(x){
      this.options = x  
      // 3. object.f1(x) ，所以这里的  this === object，结果为：object.opitons === options1
      this.f2()
      // 4. this === object,意为：object.f2()
    },
    f2(){
     this.options.f2.call(this) 
      // 5. options1.f2.call(this)  === object.f2()
      // options1.f2.call(this) 的  this 为 object  
    }
  }
}

var options1 = {
  name:'options',
  f1(){} ,
  f2(){
    console.log(this) 
    // 6.  options1.f2.call(this) 的  this 为 object  
    // console.log(this)  === console.log(object) 
  }
}

var x = X()		//1. x === object
x.f1(options1)   //2.  x.f1(options) === object.f1(options)
```

易错点：

容易在第5步错误分析 `this === options1`,实际上不是，考虑到函数作用域的问题，`this.f2()` 到 `  this.options.f2.call(this) ` ，实际上还是 `this.f2()` 中的 `this` ，依然还是原来的 object

换一种角度思考，在第2步中 `x.f1(options1)` 对象调用了这个函数，那么这个函数的后面的调用的 this 依然还是原来的 `x` ,即 `x = x() === object`







推荐文章：

- [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)





