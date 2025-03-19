---
title: HTML标签
date: 2017-10-21 23:06:49
tags: HTML
categories: HTML
---

今天主要想说的是以下几个标签

-  `<a>` 
-  `<iframe>`
-  `<form>` 
-  `<input>`  && `<button>`
-  `<table>`



1. `<a>` 标签
- 全称：`anchor` ：锚点
- 常见用法一：`<a href=" http://www.xxx.com" target="_blank" > hello</a>`

属性理解1：target ：目标，把什么作为目标

> (1) `_blank` : 新窗口打开，即到一个新的未命名的HTML4窗口或HTML5浏览器上下文
> `例子：<a href=" http://www.xxx.com" target="_blank" > hello</a>`
>
> (2) `_self` ：  当前页面加载，即当前的响应到同一HTML 4 frame（或HTML5浏览上下文）。此值是默认的，如果没有指定属性的话。
> `例子：<a href=" http://www.xxx.com" target="_self" > hello</a>`
>
> (3) `_top` ： IHTML4中：加载的响应成完整的，原来的窗口，取消所有其它frame。 HTML5中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有parent）。如果没有parent框架或者浏览上下文，此选项的行为方式相同_self
> `例子：<a href=" http://www.xxx.com" target="_top" > hello</a>`
>
> (4) `_parent` ：加载响应到当前框架的HTML4父框架或当前的HTML5浏览上下文的父浏览上下文。如果没有parent框架或者浏览上下文，此选项的行为方式相同_self。
> `例子:<a href=" http://www.xxx.com" target="_parent" > hello</a>`


属性理解2：href ：超链接
>(1)  链接到外部地址：`http://xxx.com`
>`例子：<a href ="http://www.qq.com" >QQ</a>`
>
>(2)  链接到本页的某个部分：`#属性`
>`例子：<a href ="#attribute" >xxx</a>`
>
>(3)  打开某个文件：
>`使用file协议`:`file:///C:/Users/Administrator/Desktop/homework/vsCode/Html/Untitled-1.html`
>`例子：<a href ="file:///users/html/index.html" >demo</a>`
>
>(4)  创建一个可点击的图片：`http://www.qq.com/imgs/1.png`
>`例子：<a href ="http://www.qq.com/imgs/1.png" >pic</a>`
>
>(5)  创建一个email链接：`mailto:123@qq.com`
>`例子：<a href ="mailto:123@qq.com" >QQemail</a>`
>
>(6)  创建电话链接：`tel:+1356789456`
>`例子：<a href ="tel:+1356789456" >+1356789456</a>`
>
>(7) 查询参数：`?name=Tom`
> `例子：<a href ="http://www.user.com/?name=Tom" >Tom</a>`
>
>(8) 伪协议：`javascript:;`或`javascript:void(0);`
>`例子：<a href ="javascript:;" >点击无响应</a>`
>注：***以上参数中，只有（7）是会发起请求的，其他的都不会向服务器发起请求***
>示例代码：
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<a href="ohter.html?name=hello">hello</a>
</body>
</html>
```
点击 超链接 `hello` 后的效果，打开控制台查看请求为

![查询参数](http://upload-images.jianshu.io/upload_images/1683063-618ee12c2f734c74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




- 常见用法二：`<a href="www.xxx.com" download>hello</a>`

属性理解:1:download:下载URL而不是导航到URL，因此将提示用户将其保存为本地文件。
- 注：仅在HTML中，下载URL只有2种方式，一种是上面的`download`属性，另一种为HTTP响应中`conten-type`的参数为`application/octet-stream`时，浏览器会下载文件

1. `<iframe> ` 标签
- 名称：框架
- 常见用法：主要在页面嵌套页面，经常和`<a>`标签一起使用；
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<iframe name=xxx src="#" frameborder="0"></iframe>
	<a href="http://www.qq.com" target="xxx">QQ</a>
	<a href="http://www.123.com" target="xxx">123</a>
</body>
</html>
```
效果为：
![iframe](http://upload-images.jianshu.io/upload_images/1683063-a02a4c0914a74e69.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

属性分析一：`<iframe name=xxx src="#" frameborder="0"></iframe>`
属性：`name=xxx`,`src=#`
分析:在`<a>`标签中，分别对应不同的超链接，但是目标都指向iframe，以第一个QQ超链接为例，即表示在iframe打开链接为`http://www.qq.com`窗口，第二个123链接同理

属性分析二：`<iframe name=xxx src="#" frameborder="0"></iframe>`
属性：`src=#`
分析：除了上面所示参数可以为绝对路径以外，也可以放置相对路径，即在本地新建一个`index.html`，上面`src="index.html"`，即下面QQ在`index.html`打开

1. `<form> ` 标签
- form：表单
- 常见用法：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<form action="index.html" method="post" target="_blank">
		<input type="text" name="account">
		<input type="submit" value="提交">

	</form>
</body>
</html>
```
![post](http://upload-images.jianshu.io/upload_images/1683063-603921f2b3d7bf32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 属性分析一：`action` 
  解释：类似`<a href="" >123</a>` 中的`href`一样，跳转链接，主要服务于后面`submit`所要提交到的位置

- 属性分析二：`method`
  解释1：在`<form>`中，若不申明method的传输方式，则默认为 `get`；只有声明为`method="pos"t` 时，才是`post`，并且，HTTP协议会有第四部分即(`Form Data`)的内容；如果有查询参数出现，也是出现在`Form Data`中，而不是像`get`一样出现在搜索框中。

![method="post"](http://upload-images.jianshu.io/upload_images/1683063-3a3dbde916ff8955.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>说明：当在表单输入账号密码时，因为使用的不是HTTPS协议，所以密码在最后一部分以明文的方式进行传输，存储方式为上一部分`Content-Type:application/x-www-form-urlencoded`，若要是中间有人进行监听，那么密码就泄露了，这就是为什么HTTP协议不安全所在之处。

解释2：上图中，我们看到，当`method="post"`时，可以 上传数据，那么，想问：当`method=post`时，是否可以像`method="get"`一样查询呢？
答案：可以的，需要修改1个地方，即：`action=user?xxx=3 ` (其中=号两边为任意参数)

- 属性分析三：`target`
  和`<a>`标签一样，可以跳转到其他的链接，不同的是，前者是 get 一个页面， form 是 post 一个页面。

- 属性分析四：`submit`
  解释：在 `<form>` 中，如果没有这个 `提交` 按钮 ，就无法提交 `<form>` 内的数据，除非使用JS。

1. `<input>` 标签
- input 输入
- 常见参数一： `type="text"`,`type="password"`,`type="button"`......
  说明：在页面效果上 `<input type="submit" value="button">` 和`<button>button</button>` 是一样的 ，那么它们有什么区别呢？
  **区别：**
- 当`<form>`中只有一个 `<button>`时，这个时候  `<button>` 就会自动升级为 `<input type="submit" value="button">` 进行提交数据，即 `<button>button</button> == <input type="submit" value="button">` 二者等价。
- 当 `<form>` 的`<input type="button" value="">` 说明了`type`类型为 `button` 那么此按钮也仅仅是一个按钮，不具有提交功能。

- 常见参数二：
  看如下代码：
```
<input type="checkbox" id="boy" > <label for="boy">男</label>
<label ><input type="checkbox">男</label>
```

当我们选择多选框时，通常只有点击多选框才能勾选其内容，显然，这不太人性化；需求是，我们只要点击和多选框对应的文字，那么就可以选中该多选框，实现方式有2种，使用`<label>`标签实现，如上代码。

- 常见参数三：单选框如何做到只会选中一个？

```
<input type="radio" name="apple" value="yes">
<input type="radio" name="apple" value="no">水果
```
效果：
![水果](http://upload-images.jianshu.io/upload_images/1683063-b6a8f9155e892181.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
方法：使用 `name` ，当单选框中name取的参数值相同时，就是二者或是多者选一；

- 常见参数三：下拉框 `<select> <option></option> </select>`

```
<select name="group" id="">
	<option value=""></option>
	<option value="second" selected>第二组</option>
	<option value="third" disabled="">第三组</option>
	<option value="fourth">第四组</option>
	<option value="fifth">第五组</option>
</select>

```

![分组](http://upload-images.jianshu.io/upload_images/1683063-d4f9d9d8365b9025.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




 1. `<table>` 标签


  ```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
   <table border="1px">
     <colgroup>
       <col width=100 bgcolor=red>
       <col width=150 bgcolor=green>
       <col width=160 bgcolor=yellow>
     </colgroup>
     <thead>
       <th>班级</th>
       <th>姓名</th>
       <th>分数</th>
     </thead>
     <tbody>
       <tr>
         <td>1班</td>
         <td>张三</td>
         <td>李四</td>
       </tr>
       <tr>
         <td>2班</td>
         <td>赵六</td>
         <td>刘七</td>
       </tr>
     </tbody>
     <tfoot>
     </tfoot>
   </table>
</body>
</html>

  ```

![效果图](http://upload-images.jianshu.io/upload_images/1683063-a2e4f6119d9b9132.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>tr == table row
>td ==table data
>th ==theader

- 说明一：`<colgroup>` 标签的使用，自上而下的 `<col>` 分别设置第一列，第二列...的属性

- 说明二：如果改变`<tfoot>`的顺序，将其放置在 `<tbody>` 前面，那么效果如何？
  答案是：不会改变，浏览器会自动排列顺序。

- 说明三：属性`border-collapse:collapse;`
  设置合并边框


```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    table{
      border-collapse: collapse;
    }
  </style>
</head>
<body>
   <table border="1px">
     <colgroup>
       <col width=100 bgcolor=red>
       <col width=150 bgcolor=green>
       <col width=160 bgcolor=yellow>
     </colgroup>
     <thead>
       <th>班级</th>
       <th>姓名</th>
       <th>分数</th>
     </thead>
     <tbody>
       <tr>
         <td>1班</td>
         <td>张三</td>
         <td>李四</td>
       </tr>
       <tr>
         <td>2班</td>
         <td>赵六</td>
         <td>刘七</td>
       </tr>
     </tbody>
     <tfoot>
       
     </tfoot>
   </table>
</body>
</html>
```

![](http://upload-images.jianshu.io/upload_images/1683063-9272e1470d5a227e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(完)