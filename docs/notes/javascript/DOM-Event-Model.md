
# Dom 事件

## Dom 事件的历史

> 关键词搜索： DOM spec

- DOM 0 级：

  在最初的W3C 标准出现之前就有了，主要为2大阵营——IE  和 Firefox，都有相似的事件，相互兼容。

- DOM 1 级：

  W3C 标准化，即对以前 IE 和 Firefox 的DOM 0 级事件进行综合汇总整理,主要包括[两个版本](https://www.w3.org/DOM/DOMTR#dom1)

  - [版本一](https://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/) 制定于1998年10月1日，修订不够完善，因此有了第二个版本
  - [版本二](https://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/) 制定于2000年9月29日，主要有两个章节：
    - [Chapter 1: Document Object Model Core](https://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core.html)
    - [Chapter 2: Document Object Model HTML](https://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-html.html)
    - 特点：内容主要是对DOM 0 级的东西做了一次整理。

- [DOM 2 级](https://www.w3.org/DOM/DOMTR#dom2)：

  - [Document Object Model Level 2 Core](https://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/) 
  - [Document Object Model Level 2 Views](https://www.w3.org/TR/2000/REC-DOM-Level-2-Views-20001113/) 
  - [Document Object Model Level 2 Style](https://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/) 
  - [Document Object Model Level 2 Traversal and Range](https://www.w3.org/TR/2000/REC-DOM-Level-2-Traversal-Range-20001113/) 
  - [Document Object Model Level 2 HTML](https://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/) 
  - [Document Object Model Level 2 Events](https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/)

  相比DOM 1 级更加详细化，出现了DOM-Views,DOM-Score,DOM-Style,DOM-Events是目前使用最广泛的DOM标准。

- DOM 3 级：

  - [Document Object Model Level 3 Core](https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/)
  - [Document Object Model Level 3 Load and Save](https://www.w3.org/TR/2004/REC-DOM-Level-3-LS-20040407/) 
  - [Document Object Model Level 3 Validation](https://www.w3.org/TR/2004/REC-DOM-Level-3-Val-20040127/) 

  这里我们发现，DOM 3 停止了对DOM-Events 的更新，认为在DOM2级中已经写的很详细了。

- 综上当面试官问你，**目前我们使用的最广泛的DOM标准是什么？DOM 2级标准**




## DOM 的学习

### DOM 0 级

问题一：

小测试，如下代码：

![](https://i.loli.net/2018/01/24/5a67f7a04942f.png)

请问：此时点击A、B、C 中哪个会打印出 “hi” ？

问题二：

如下代码：

![](https://i.loli.net/2018/01/24/5a67f83b7d509.png)

请问：此时点击A、B、C 中 哪个会打印出 “hi” ？

答：

（1）第一题点击B、C 会打印出 “hi”，理由如下：

- `onclick  = "要执行的代码"` ，一旦用户点击，浏览器就 `eval("要执行的代码")` ，即会对括号内的字符串当做代码执行。
- 而`eval("print")` 并不会做什么 ，只用调用它才会执行：`eval("print()")` ，等价于 `eval("print.call()")`

（2）第二题只有点击 A 会打印出 “hi”，理由如下：

- `X.onclick = print` 表示一旦用户点击 ，浏览器就会调用`onclick`  后面的函数。类似于 `onclick.call(x,{})`
- `Y,onclick = print()` 表示把函数返回的结果 `undefined` 给  `Y.onclick` 
- `Z.onclick.call()` 同理。

### DOM 2级

使用 `addEventListener` 

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <script>
  X.addEventListener('click',function(){console.log("hi")})
  </script>  
  
  <button id=X >A</button>
  <button id=Y >B</button>
  <button id=Z >C</button>
</body>
</html>
```

使用  `addEventListener` 给 `click` 添加事件，效果一样，因此有人会说这么写多麻烦啊，直接写 `onclick` 多简单啊

但是，有这样一种情况：

> 如果一次点击事件有两个函数呢？

简单思考为：

```
X.onlick = function(){
  console.log(1)
}
X.onclick = function(){
  console.log(2)
}
```

这样的输出结果是怎样呢？打印出 1 还是 2 ？还是 1 和 2 都会打印出来？

答案是：只会打印出2

原因： 

`onclick `作为一个属性，而且是唯一的。按照上面 js 代码的先后顺序执行，前面的会被后面的覆盖。

而使用 `addEventListener()` 是一个队列模型，里面的函数会被依次执行而不是被后面的覆盖。

### DOM 事件的理解

#### 说法一：

看图，如下代码：

![](https://i.loli.net/2018/01/24/5a6882b64de71.png)

请问：点击儿子，先后打印出的结果为以下猜想的哪一个？

- 答案一：儿子、爸爸、爷爷
- 答案二：爷爷、爸爸、儿子

赞同第一种的理由可能是：鼠标先点击儿子当然先触发儿子的事件啊

赞同第二种的理由可能是：儿子在爸爸里面，爸爸在爷爷里面，自然是儿子在爷爷里面，点击的也必然是爷爷的一部分啊，所以先触发爷爷的事件啊

W3C的答案是：以上两个答案都对！

为什么？

W3C规定说，在 `addEventListener` 里面有一个参数，当不填写的时候默认为`false` ，因为没有写就是 `undefined` ，而 `undefined` 是 js 中5个falsy值的一部分。

- `addEventListener('click',fn(){},false)` 表示由里到外，先触发儿子然后是爸爸最后是爷爷；
- `addEventListener('click',fn(){},true)` 表示由外到内，先触发爷爷然后是爸爸最后是儿子；
- 不同参数不同结果，效果如下：

![](https://i.loli.net/2018/01/24/5a688526d0776.png)

![](https://i.loli.net/2018/01/24/5a688527975f6.png)

#### 说法二：事件模型

即将上述的事件描述为 “事件捕获”  和 “事件冒泡”

如图：

![](https://i.loli.net/2018/01/24/5a68881540ea4.png)

- 【从上往下】为事件捕获阶段，事件响应顺序依次为爷爷、爸爸、儿子；即是第一个说法的参数为 `true`
- 【从下往上】为事件冒泡阶段，事件响应顺序依次为儿子、爸爸、爷爷；即第一个说法的参数为 `false` 

我们来看几个例子：

例子1：

![](https://i.loli.net/2018/01/24/5a6889e70f512.png)

问：上述代码中，打印出的结果依次是什么？

答：爷爷、儿子、爸爸

原因：爷爷、儿子都是在捕获阶段的事件，从外层往内层执行；而爸爸是在冒泡阶段，即最后执行，所以其顺序为：爷爷、儿子、爸爸。

例子2：**面试易踩的坑！！！！**

![](https://i.loli.net/2018/01/24/5a688b56e9d1c.png)

问：看图，请问打印出的结果依次为什么？

根据上面我们学习的知识分析，虽然2个事件都是作用在同一个对象上，第一个的参数为 `true`，第二个参数为 `false` ，所以应该先捕获后冒泡，结果为：捕获、冒泡

这里，我们先不说结论，我们再看想下面这个图

![](https://i.loli.net/2018/01/24/5a688c4060520.png)

问：看图，请问打印出的结果依次为什么？

仔细看下这两张图的代码我们发现，只是两行代码执行顺序不同而已，逻辑按道理应该也是一样的啊，还是：捕获、冒泡

现在我们来揭晓答案——大错特错！！！！！

**这种分析思路大错特错！！！**

答案看图：

![](https://i.loli.net/2018/01/24/5a688dc56ce63.png)

![](https://i.loli.net/2018/01/24/5a688dc59ef14.png)

答案揭晓：

**当是最后一个事件元素的时候，有多个事件作用在一个元素上的时候，按照先后顺序依次执行！！！**

#### 使用：

那么，分析了这么久，到底我们在实际工作中如何使用呢？

答案：随便咯，喜欢哪种就用哪种，设置好对应的参数即可，当然，作为一个懒懒的程序员，自然是选择不加参数 即 “事件冒泡” 那一种 咯！

 


参考资料：

- [DOM-Events  阮一峰](http://javascript.ruanyifeng.com/dom/event.html)
- [DOM-Events ](https://www.w3.org/DOM/DOMTR)

## 