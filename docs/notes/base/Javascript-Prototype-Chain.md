
# js面向对象--原型(Prototype)和原型链

## 什么是原型（Prototype）?

举个例子：

```javascript
var a = new Number(1)
console.log(a.toString()) // 1

var b = new String('123')
console.log(b.toString()) // 123

var c = new Boolean(false)
console.log(c.toString()) // false

var d = new Object()
console.log(d.toString()) // [object Object] 

```

![](https://i.loli.net/2018/04/20/5ad9fe5b44bbe.png)

如图，上面的几个对象，都有一个共有的方法 `toString` ，那么，这个方法是哪儿来的呢 ？

我们知道，**使用了`new` 关键字创建的都是对象**，上面的每一个对象，都有一个 `toString()`方法。

我们想，既然都是叫做同一个名字 `toString` 方法，就不必要每个对象都创建一个功能相同的同名函数 `toString`，这样会**浪费很大的内存空间** 。

那怎么办呢？

因为他们都是对象，于是我们给`Object`定义**共有属性 `toString()`**，每次创建一个对象的时候，他们的 `toString` 都会指向 `Object.toString`

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_083.png)

按照**内存图的理解方式**，我们也可以认为他们是指向的**同一块内存地址**

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_084.png)

这样的话，难道我们每一次创建对象的时候都要写一个 `toString()` 方法指向共有属性的内存吗？

然而，js 不是这样做的，它使用的是一个新的属性  `__proto__`

这上面所说的 **共有属性** 就是 `prototype`

## `__proto__` 的出现

尽管 js 使用了新的属性 `__proto__` ，但是本质还是一样的，**就是使用 `__proto__` 指向了 `Object` 的共有属性的内存地址**

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_086.png)

我们在控制台看到，创建一个新的对象以后，对象里面含有一个 `__prpto__` 属性，但是，我们并没有在这里面看到 `toString` 方法啊？

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_085.png)

此时，我们点开 `__proto__` ，我们看到如下

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_087.png)

所有的共有属性都放在了 `__proto__` 里面，也就是说，**每一个创建的对象，他都会有一个`__proto__`属性存储其共有属性的地址，指向他的共有属性**



## 自有属性和共有属性

通过上面的学习我们知道，每次创建一个对象，都有2种属性，即 **自有属性和共有属性**，举例如下：

```javascript
var o  = new Object()
o.name = 'hello'
o.age = 18

console.log(o)
```

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_088.png)

我们可以直接看到的就是创建的对象的**自有属性** ，而在 `__proto__` 中存储的就是他的**共有属性**

那么，如何判断不同对象的共有属性都是相同的呢？如下图：

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_089.png)

## 什么是原型链？

有了上面的基础，我们对**原型链**的学习就好理解多了，比如，我们创建一个 `Number`

```js
var n = new Number()
console.log(n)
```

我们知道，使用 `new` 关键词创建的都是对象，即`arr` 是一个对象，他有对象的一些共有属性，例如：`toString` , `valueOf`；

同时我们也知道， `arr` 作为一个 `Number` ，他也有 `Number` 的一些共有属性，例如：

`toExponential`,`toFixed` 等

那么，他既是 `Object` 又是 `Number` ，他是如何处理好这二者之间的共有属性的呢？

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_091.png)

如上图，我们可能会有2种猜想

- 一种是，`n` 的 `__proto__` 直接指向了 `Object` 的共有属性，但是此时却丢失了 `Number` 的共有属性
- 另一种是，`n` 的 `__proto__` 指向了 `Number` 的共有属性，然后 `Number`  的 `__proto__` 指向了 `Object` 的共有属性

显然，通过验证知道，第一种猜想是错误的。

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_093.png)

细心的话，我们也会发现，在 `Number` 的`__proto__` 中，重写了 `toString` 和 `valueOf` 方法

那么，到底什么是原型链呢？

例如上面的例子：

> `n` 的 `__proto__` 指向了 `Number` 的共有属性，然后 `Number`  的 `__proto__` 指向了 `Object` 的共有属性

参考阮一峰老师的教程说法是：

> JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……
>
> 如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。

个人理解： **这种不断从自有属性向共有属性的查找过程形成的一种链式结构，就是原型链**

## 结论

由此，我们得出了一个结论

![](http://p7mnxf7o4.bkt.clouddn.com/Selection_094.png)

```js
var o = new Number()
o.__proto__ === Number.prototype

var arr = new Array()
arr.__proto === Array.prototype

var b = new Object()
b.__proto__ === Function.prototype

var f = new Function()
f.__proto__ === Function.prototype
```

需要注意的两个地方：

- 对象的原型 `b.__proto__ === Function.prototype`
- 函数的原型 `f.__proto__ === Function.prototype`

参考资料：

- [prototype 对象--阮一峰](http://javascript.ruanyifeng.com/oop/prototype.html)
- [Object.prototype-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

