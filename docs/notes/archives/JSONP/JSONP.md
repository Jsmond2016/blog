---
title: JSONP
date: 2018-01-24
tags: 
  - JavaScript
  - JSONP
---

# JSONP

> 问：什么是　JSONP？

## 1. 问题引入

在日常开发中，前端程序员想要从后端请求一些数据，是如何操作的呢？如下图：

![](https://i.loli.net/2018/01/07/5a523be62229c.png)

> 需求为：用户每点击一下“打钱”，上面的账户余额数量减１
> 如何实现？

首先，要修改动态数据必然是要请求数据库的数据，在此基础上进行修改，然后保存在数据库中，便于下一次使用。由此发现，在请求数据过程中必然是要请求外部链接。

然而在HTML标签中，可以发请求的标签屈指可数，只有`<a href="">,<form action="">,<img src="">,<link rel="stylesheet" href="">,<script src＝“”>` 等。

我们的设想是，把数据请求包装成为一个　HTML  标签，然后让服务端对我发出的请求进行相应的操作，操作完成后返回给我一个操作成功或者失败的标志，同时修改页面中的数据为修改后的数据。

## 2.方案一：使用　`<form>`

```html
<body>
<h3>您的余额为<span id="amount">&&&amount&&&</span></h3>
<form aciton="/pay" method="post">
	<input type="submit" value="付款">
</form>
</body>
```

考虑到 `<form>`　传输数据方式为　`post`  安全性较高， 然后用户在页面中操作的时候后台实现修改数据并告知用户操作成功与失败。

此方案看似可以，但是有个问题，后台每次都在新页面中返回个`success`  和　`fail` ，但当前页面的数据没有变化，需要用户点击后退再回到刚才的页面才可看到变化后的数据。

![后台返回的标志在新页面中](https://i.loli.net/2018/01/07/5a5240fc24fa9.png)

![点击后退后查看数据](https://i.loli.net/2018/01/07/5a524188205df.png)

我们发现，查看成功与失败的状态在两个不同的页面中，每一次用户点击“付款”都要回到原来的页面才能看到变化后数据，用户体验很差。

原因：**在页面中使用`<fomr>`提交数据后一定会刷新页面**　

如何优化用户体验？
在页面中嵌入一个`<iframe>`　把数据放入 `<iframe>`中，这样刷新页面返回成功或者失败的时候只会刷新并显示在`<iframe>`中，而不会刷新当前页面，然后我们点击刷新后即可看到变化后的数据。
![使用 iframe](https://i.loli.net/2018/01/07/5a5243aadfa8b.png)

显然，尽管优化后，用户体验依然不是很好。（ps:这是早期程序员开发网站时使用的方式）

## 3.方案二：使用　`<img>` 

```html
<body>
<h5>您的账户余额为<span id="amount">amount</h5>
<button id="button">打钱</button>
<script>
button.addEventListener('click',(e)={
  let image = document.creatElement('img')
  image.src =  '/pay'
  image.onload = function(){
  	alert('success')
}
  image.onerror = function(){
	alert('fail')
	}
})
</script>
</body>
  
  //部分后端代码如下
  if(path == '/'){
    var string = fs.readFileSync('./index.html','utf8')
    response.setHeader('Content-Type', 'image/jpg; charset=utf-8')
    response.write(string)
    response.end()
  }
  
```

假设服务器允许该请求，在请求路径为`/pay`  时表示告诉服务器要请求数据，后台进行相对应的操作。



## 4.方案三：使用 `<script>`

```html
<body>
	<h3>您的余额为<span id="amount">amount</span></h3>
	<button id="button">打钱</button>
	<script>
		button.addEventListener('click',(e)=>{
			let script = document.createElement('script')
			script.src = '/pay'
			document.body.appendChild(script)
		})
  </script>
</body>
```



细节：

- 使用 `<scirpt>` 标签的传输 方式只能为 `get` ，没有 `post` 的方式
- 创建 `<script>` 后必须得添加到 `body` 里面才能被执行，使用代码 `document.body.appendChild(script)`
- 创建后的 `<script>` 会不断重复叠加，显得不好看。

改进：

```html
	<script>
		button.addEventListener('click',(e)=>{
			let script = document.createElement('script')
			script.src = '/pay'
			document.body.appendChild(script)
		
          //当script执行完了以后就自动删除	
          script.onload = function(e){
				alert('success')
				e.currentTarget.remove();
			}
			script.onerror = function(e){
				alert('fail')
				e.currentTarget.remove();
			}
		})

	</script>

// 部分后端代码
if(path == '/'){
    var string = fs.readFileSync('./index.html','utf8')
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }else if(path == '/pay'){
    var amount = fs.readFileSync('./db','utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db',newAmount)
    response.setHeader('Content-Type','application/javascript')
    response.statusCode = 200
    response.write(`amount.innerText = amountText - 1`)
    response.end
}else{
    response.statusCode = 404
    response.end()
}
```

- 当script执行完了以后,无论成功或者失败，都自动删除
- 验证方法？ `debugger` 

## 使用`<script>`请求另一个网站

思考：我们使用  `jQuery` 时，引用的是外部链接，然而外部链接 并不是我们自己写的，但是我们却可以使用它。而在上面我们发现，使用`<script>` 相比使用 `<img>,<form>` 都要方便的多，那么我们想，是否可以使用 `<script>` 请求另一个网站并且获取数据呢？

答案是可以的

假设有一个这样的网站 `www.jack.com` ，那么我们在请求的时候使用的地址应该为  `script.src = 'http://www.jack.com/pay'`

同样的，假设网站 `www.jack.com` 也允许访问，同时写好了对应地方后端代码提供相应的数据，那么，使用 `<script>`是可以访问这个网站并且请求到数据的。

但是，并不是每个网站的后端程序员都知道前端代码的请求操作去写类似的 `response.write(`amount.innerText = amountText - 1`)` ，事实上，依据**代码分离的原则**，前端和后端不应该有这样的**代码耦合**（即前后端的代码依赖程度高）

这时候怎么办呢？JSONP出现了！

为了实现代码分离，更好的进行**解耦** ，我们这样设想：

> 在`<script>` 中把要进行操作的代码写在一个函数中，然后在请求数据的时候加入这个请求函数名作为请求参数（函数名），例如: 
>
> ```html
> window.yyy = function(result){
>   if(result === 'success'){
>     response.write(amount.innerText = amountText - 1)
>   }else{
>     alert('fail')
>   }
> }
> script.src = 'http://www.jack.com/pay?callbackName=yyy
> ```
>
> 然后后端程序员看到这个函数名参数以后，把整理好的数据放入这个函数的第一个参数中返回给前端，然后就实现了上述操作。例如： 
> ```html
> response.write(`${query.callbackName}.call(undefined,'success')`)
> ```

这就是 JSONP的实现原理!

具体为：返回的函数的第二个参数为一个对象

```
response.write(`${query.callbackName}.call(undefined,{
  "success":true,
  "left":${newAmount}
})`)
```

![](https://i.loli.net/2018/01/11/5a571e28f256a.png)

如图：代码高亮部分为 `JSON` ，高亮 左侧部分为 **左padding** ，高亮右侧的反括号为 **右padding**  ，由此组成了 `JSONP` 

 下面，我们给JSONP做个定义

> JSONP 
>
> 前台方面：浏览器发出请求，例 ：`jsmond.com`
>
> 后台方面：服务器接受并响应请求，例: `manager.com`
>
> 1.请求方创建 `script` ,`src` 指向响应方，同时传一个查询参数 `?callbackName=yyy`
>
> 2.响应方根据查询参数 `callbackName` ，构造形如 
>
> ​	(1)  `yyy.call(undefined,"你要的数据")`
>
> ​	(2) `yyy('你要的数据')`
>
> ​	这样的响应
>
>
> 3.浏览器接收到响应后，就会执行 `yyy.call(undefined,'你要的数据')`
>
> 4.那么请求方就知道了他要的数据
>
> 约定：
>
> 1. callbckName -> callback
> 2. yyy - >随机数  frank123123123123()
>
> 这就是JSONP

```html
<body>
	<h3>您的余额为<span id="amount">&&&amount&&&</span></h3>
	<button id="button">打钱</button>
	<script>
		button.addEventListener('onclick',(e)=>{
			let script = doucment.createElement('script')
			let functionName = 'frank'+parseInt(Math.random()*10000000,10)
			window[functionName] =  funciton(result){
				if(result === 'success'){
					amount.innerText = amount.innerText - 1
				}else{}
			}
			script.src = 'http://www.jack.com/pay?callback='+functionName
			document.body.appendChild(script)
			script.onload = funciton(e){
				e.currentTarget.remove()
				delete window[functionName]
			}
			script.onerror = funciton(e){
				alert('fail')
				e.currentTarget.remove
				delete window[functionName]
			}
		})
	</script>
</body>
```

知道 以上原理以后，我们可以开始使用 `jQuery`

首先引用 [jQuery](https://cdnjs.com/)，关于 JSONP 的API 和使用方法可以参考 [jsonp-jquery](http://api.jquery.com/jQuery.getJSON/)

```html
$.ajax({
  dataType: "json",
  url: "http://www.jack.com/pay",
  data: data,
  success: function(rewponse){
    if(response === 'success'){
      amount.innerText = amount.innerText - 1
    }
  }
});
```

注意：上面的 `$.ajax` 和 `AJAX` 没有半毛钱关系，它的本质还是上面我们说到的 **动态`<script>`** 

- 为什么JSONP不支持POST？

  > １．因为JSONP是**通过动态创建`<script>`实现的**
  >
  > ２．动态创建`script` 的时候只能用　 `get` 而无法使用　`post` 

  ​

参考链接：

[JSONP--知乎](https://www.zhihu.com/search?type=content&q=%EF%BC%AA%EF%BC%B3%EF%BC%AF%EF%BC%AE%EF%BC%B0)

[JSONP为什么不支持POST请求？](https://www.zhihu.com/question/28890257/answer/269738446)

