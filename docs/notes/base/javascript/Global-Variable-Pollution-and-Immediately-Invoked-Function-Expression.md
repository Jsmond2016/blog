
# 全局变量污染和立即执行函数

### 全局变量污染

在`HTML`中,对比一下两个不同id名字的div分析

```html
<body>
	<div id=x></div>
	<div id=parent></div>
</body>
<script>
	console.log(x) //<div id=x></div>
	console.log(parent)  //Window 
</script>
```

发现：

为什么第二个div名字为 `parent` 打印出来的结果是 `window` ，因为局部变量`div`的`parent`被全局变量`parent` 所覆盖。即局部变量和全局变量名字冲突。

另一种情况，在 `<script></script>` 中使用全局变量名会怎样？

```html
<body>
	<div id="x"></div>
	
	<script>
		var parent = document.querySelector("#x")
		console.log(parent) //<div id="x"></div>
	</script>
</body>
```

发现：

使用全局变量`var` 声明,全局属性window.parent被覆盖了，输出结果只有 `<div id="x"></div>` 

同理，其他全局变量名字如 `alert` ,`close`,`confirm` ,`find` 等也有这样的情况。

**总结：全局变量污染，不可用**，根本原因是使用关键字 `var` 进行声明所导致的变量提升！

那么，在局部作用域中使用会怎样呢？

代码如下：

```html
<body>
<div id=x></div>
</body>
<script>
function x(){
  var parent = document.querySelector("#x")
  console.log(parent) 	
}
x.call() 	//<div id=x></div>
console.log(parent)		//window
</script>
```

这里涉及到一个概念： **立即执行函数**，

### 立即执行函数

即为了使用一个函数以内的局部变量，声明函数后立即调用它，即可避免局部变量和全局变量的冲突问题。

同时，调用函数也可以直接是匿名的函数，并且立即调用它，代码为

```javascript
 function (){
  var parent = document.querySelector("#x")
  console.log(parent) 		
}.call()  //浏览器报错，无法识别该语法
```

直接声明匿名函数并且立即调用时，浏览器无法识别，所以会报错，解决办法有以下几种：

- 对整个函数和调用使用括号包起来

  ```javascript
  //方法一：使用括号包起来
  (function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }.call() )
  ```

- 对匿名函数使用括号包起来

  ```javascript
  //方法二：对匿名函数使用括号包起来
  (function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }).call() 
  ```

  ​

- 在匿名函数开头使用运算符作为标记（实际上是计算，但是我们不做任何计算和返回，目的是使用匿名函数）

  ```javascript
  //方法三：使用 “-” 或 “+” 或 “~”（位运算符）或“!”
  -function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }.call() 

  +function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }.call() 

  ~function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }.call() 

  !function (){
    var parent = document.querySelector("#x")
    console.log(parent) 	
  }.call() 
  ```

  ​

参考链接：

[立即执行函数-方应杭](https://zhuanlan.zhihu.com/p/22465092?refer=study-fe)









