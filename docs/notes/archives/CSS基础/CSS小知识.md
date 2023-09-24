
---
title: CSS小知识
date: 2017-11-17 19:45:38
tags: CSS
categories: CSS
---


### 1. CSS的全称是什么?
### 答：Cascading Style Sheets——层叠样式表



###  2. CSS有几种引入方式? link 和@import 有什么区别?

- 内联样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div style="background: red">内联样式</div>
</body>
</html>
```

> 说明：不推荐使用。
>
> 直接嵌入在HTLML的style属性中，相同样式的代码要重复写，容易使得代码冗长，难以维护

- 嵌入样式

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>Document</title>
  	<style>
  		.content {background: red;}
  	</style>
  </head>
  <body>
  	<div class="content">嵌入样式</div>
  </body>
  </html>
  ```

  > 说明：不推荐使用。
  >
  > 嵌入到HTML头部style内，只对当前网页有效，当多个页面需要引入相同的 CSS 代码时，这样写会导致代码冗余，也不利于维护。

  - 导入样式：使用css规则导入外部样式

    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="UTF-8">
    	<title>Document</title>
    	<style>
    		@import url(style.css);
    	</style>
    </head>
    <body>
    	<div class="content">导入外部样式</div>
    </body>
    </html>
    ```

> 说明：推荐使用。
>
> 使用 CSS 规则引入外部 CSS 文件，放在HTML头部的style里面。

-  链接样式

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="content">链接样式</div>
</body>
</html>
```

> 说明：推荐使用。
>
> 使用 HTML 头部的 <head> 标签引入外部的 CSS 文件。所有的 CSS 代码只存在于单独的 CSS 文件中，所以具有良好的可维护性。并且所有的 CSS 代码只存在于 CSS 文件中，CSS 文件会在第一次加载时引入，以后切换页面时只需加载 HTML 文件即可。

区别：
（1）link：link 属于 HTML，通过 <link> 标签中的 href 属性来引入外部文件，而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件；

（2）@import：是 CSS2.1 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；

（3）当 HTML 文件被加载时，link 引用的文件会同时被加载，而 @import 引用的文件则会等页面全部下载完毕再被加载；

参考：
[CSS引入方式1](http://www.cnblogs.com/yang5201314/p/5738447.html)
[CSS引入方式2](https://segmentfault.com/a/1190000003866058)

###  3. 以下这几种文件路径分别用在什么地方，代表什么意思?
- css/a.css ：相对路径，在当前的目录下的css文件夹中的a.css文件 
- ./css/a.css：相对路径，在当前的目录下的css文件夹中的a.css文件 
- b.css：相对路径，在当前的目录下的b.css文件
- ../imgs/a.png：相对路径，在上级目录的img文件夹下的a.png文件
- /Users/hunger/project/css/a.css：绝对路径，在/Users/hunger/project/css文件夹下的a.css文件
- /static/css/a.css ： 网站路径，通常而言`static`是约定好的在服务器上的某个默认文件夹，一些静态文件放在其中，例如`img  ,  html  ,css  ,js  `等 ，如果采用相对路径前加了 `/` ，那么就默认访问 `localhost:8080` 的根目录，而根目录下还有一个`static` 文件件，那么访问的时候就需要在前面添加上这个`static`作为相对路径
  例如：目录结构为以下结构
>static--
>static--css--style.css
>static--img--avatar.jpg
>static-- js  --main.js
>static--index.html

代码为：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>hello,world!</h1>
	<!-- 错误示范 -->
	<img src="/img/hello.jpg" alt="图片">
	<!-- 正确示范 -->
	<img src="/static/img/hello.jpg" alt="图片">
	<img src="https://i.loli.net/2017/11/14/5a0ab01593c3c.jpg" alt="图片">
</body>
</html>

```
结果为：第一张图片没有显示，查看控制台显示报错信息，因为其路径`/img/hello.jpg`的文件不存在。
![image.png](http://upload-images.jianshu.io/upload_images/1683063-853e9d07255f90cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- `http://cdn.jirengu.com/kejian1/8-1.png` 引用线上地址,如下代码。
```
<img src="https://i.loli.net/2017/11/14/5a0ab01593c3c.jpg" alt="图片">
```



### 4.如果我想在js.jirengu.com上展示一个图片，需要怎么操作?
答 ：如果服务器的文件结构如图，可采用2种方式展示图片
![示例图片](http://upload-images.jianshu.io/upload_images/1683063-cdee76e0864ff7b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

（1）相对路径：`<img src="img/hello.jpg" alt="图片">`

（2）外部链接：`<img src="https://i.loli.net/2017/11/14/5a0ab01593c3c.jpg" alt="图片">`

代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>hello,world!</h1>
	<img src="img/hello.jpg" alt="图片">
	<img src="https://i.loli.net/2017/11/14/5a0ab01593c3c.jpg" alt="图片">
</body>
</html>
```

 显示效果：

![效果如图](http://upload-images.jianshu.io/upload_images/1683063-4730886e90e5027c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###5.列出5条以上html和 css 的书写规范
答：
- HTML：
  （1）使用HTML5的文档声明`<!Doctype html>`
  （2）必须申明文档的编码charset，且与文件本身编码保持一致，推荐使用UTF-8编码。`<meta charset="utf-8">`
  （3）title 不可缺少，控制在25个字、50个字节以内。“二级栏目 - 一级栏目 - 网站名称”。
  （4）keywords很重要，关键词，针对SEO。注意： 5个左右,单个8汉字以内；禁忌堆砌，与网站主题无关。
  （5）书写注释，方便程序开发嵌套。注释方式：
```
开始注释：<!-- 注释 -->
结束注释：<!-- /注释文案 -->
允许只有开始注释
注意： 浮动的地方不要加注释，可能导致布局错位或文字的BUG。
```
（6）img添加alt属性，增加可访问性。
`<img src="" alt="图片描述" title="图片描述">`
- 参考链接[HTML书写规范](http://h-ui.net/Hui-notes-htmlStructure.shtml)


- CSS:
  （1）语法不区分大小写，但是建议都用小写；
  （2）不使用内联的style属性定义样式；
  （3）id和class使用有意义的单词，分隔符建议使用 `-` ；
  （4）属性值是0就省略单位，例如：
```
div{
      margin: 10px 0 20x 0;
}
```
（5）块内容就缩进，例如：
```
h1,
h2{
    color: red;
    font-weight: normal;
}
```
（6）属性名后面添加一个空格`space`，如上（5）的例子

参考链接
[CSS书写规范-知乎](https://www.zhihu.com/question/19586885)
[网易前端工程师HTMNL,CSS规范](http://nec.netease.com/standard)


### 6. 截图介绍 chrome 开发者工具的功能区

![Image 1.png](http://upload-images.jianshu.io/upload_images/1683063-5f11f1c8bdcbf325.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Image 2.png](http://upload-images.jianshu.io/upload_images/1683063-284cbb9328cc835e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Image 4.png](http://upload-images.jianshu.io/upload_images/1683063-e09b765af99f166d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Image 5.png](http://upload-images.jianshu.io/upload_images/1683063-58be6cccdf7ed5e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Image 7.png](http://upload-images.jianshu.io/upload_images/1683063-9712529972c721a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





















