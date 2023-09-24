---
title: 有了这些CSS套路，你也可以写一份自己的个性简历
date: 2017-11-03 21:28:24
tags: HTML
categories: Project
---

简历效果预览：[简历](http://jsmond.info/homework/Oct/Resume/index)
原图预览 [Resume](http://rscardwp.px-lab.com/)

## 预备知识
- HTML 基本标签
- CSS 基本知识
- DIV+CSS 布局知识
- 套路：浮动与清除浮动
- 块元素和内联元素的区别和用法
- 工具的使用：阴影效果的制作

## 一、结构分类
1. 头部导航条制作
2. 遮罩层制作
3. 头像、信息展示层
4. 自我介绍层制作
5. 技能进度条制作
6. 作品集制作
> 说明：以上结构分类仅仅是个人分类方式，按照不同需求可以有不同的分类方式。

## 二、头部导航条制作
效果图 ：
 ![导航条](http://upload-images.jianshu.io/upload_images/1683063-e292701aaf4594bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 分析：
  （1）头部导航条分为左右两侧，左侧为一个 名字的 Logo，且logo的两边颜色和字体大小均不同，鼠标悬浮变化样式且可以点击跳转链接；
  （2）右侧为一个导航条，字间距，而且鼠标移上去会有边红色框效果。
  （3）整个导航条始终定位在浏览器顶部不随滚动条而变动。
- 遇到问题：
> 1.如何让logo和导航条左右分布？
> 答：Logo左浮动，导航条右浮动。
>
> 2.如何让Logo字体左右大小不同，颜色不同？
> 答：分别对"RS" 和 "card" 使用 `<span><a>xxx</a></span>`标签包裹，分别给与CSS样式。
>
> 3.右边浮动效果？
> 答：使用无序列表，让列表浮动，使其并排展示，并且清除列表默认样式；
>
> 4.鼠标悬浮让导航下变色效果？
> 答：设置下边框鼠标悬浮效果，添加颜色，粗细程度；
>
> 5.让整个导航条相对定位在顶部？
> 答：在其外层再包裹一层 `.topNavbar-inner`，相对其定位；注意，需设置其宽度为100%，不然Nav无法浮动在右侧，因为块元素的宽度是由内容所决定，而内容不能占满一整行，所以需定义其宽度。
>
> 6.如何让右边导航栏和左侧的logo对其？
> 答：设置上边距 `margin-top`

## 三、遮罩层制作
效果如图：
![遮罩层](http://upload-images.jianshu.io/upload_images/1683063-463da6f71848b447.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 分析：
  （1）主要为两部分组成，其中外部为图片，内部为遮罩；
  （2）背景图片需要相对浏览器横纵向居中，且图片要适应浏览器而平铺。
- 遇到问题：
> 1.设置背景图平铺，居中?
> ` style="background-position: center center; background-size: cover;" `
>
> 2.遮罩层如何设置阴暗效果？
> `style=" background-color:rgba(0,0,0,0.8); " `
>
> 3.其他问题？
> 记得设置图片和遮罩层的高度为图片的大小 ` style=" width = xxx px ;"`

## 四、头像、信息展示层：
效果如图：
![信息展示层](http://upload-images.jianshu.io/upload_images/1683063-64a7bcf90270bfbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 分析：
  （1）左侧为头像展示，距离周边都有一定的距离；
  （2）右侧为信息展示。难点：“Hello”标志左下角的三角形制作；以及基本信息的左右对称展示
  （3）下部边沿部分，背景颜色，图标和之间距离，以及鼠标悬浮有背景灰色的效果。
  （4）整个信息展示位居中且靠近上半部分。

- 遇到问题：
> 1.如何让展示层居中且靠近上半部分？
> 答：对外层信息层给定一个固定宽和高，设置 `margin:0 auto`进行居中；设置整体`margin-top:-xxx px;`给定一个负值即可上浮。
>
> 2.**难点：** “hello”标志的和下方三角形的制作？
> 答-1：内容包裹在 `span`内，设置背景色，为了让内容居中显示更美观，使用`padding` 进行填充。
> 答-2：三角形的制作：原理：定义一个块，使其宽和高均为0；设定其border的厚度，然后设置三角形以外的部分为透明即可得到。
>
> **注意一个小问题：**我在写代码的时候遇到这样一个问题：因为三角形的外部结构为 ` .hello>.triangle`，但是我在写CSS给三角形定位的时候没有使用 `.hello >.triangle` ，而是写成了 `.hello .triangle{position:absolute}`，当然，上层为 `.hello{position:relative}` 但是三角形却相对 `body`而定位（之前定义导航栏的时候也使用了`position`） 想知道是为什么呢？

效果和代码
![image](http://upload-images.jianshu.io/upload_images/1683063-88bce6a7ab37669a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
      span{
      display:block;
      border:15px solid red;
      width:0;
      height:0;
      border-top-color:red;
      border-right-color:blue;
      border-bottom-color:blue;
     /*  border-right-color:transparent;
      border-bottom-color:transparent; */
    }
  </style>
</head>
<body>
<span></span>
</body>
</html>
```
>3.**难点：** 对信息左右对称分布该怎么处理？
>答：因为左右两边是一一对应的，我们很容易想到使用 `<dl><dt><dd>`这三个标签。那么是如何做到的呢？首先，让`<dt><dd>`元素都左浮动，同时父元素添加`clearfix`清除浮动；然后他们会合并成一行。接下来，设置 `<dt>、<dd>`的宽度分别各占总宽度的30%和70%（具体美感细节可以自己调节）。然后设置行高`line-height:xx px;`，避免后续引起其他的bug。为了让其和左边照片对齐，适当调节上下的`margin`即可。
>
>4.`footer`部分的svg链接如何制作？
>答：此处，需要使用到一个工具：[阿里巴巴矢量图库](http://www.iconfont.cn)
>第一步，注册账号，选择我们需要使用到的图标，加入购物车；
>第二步：点击购物车，创建项目，将选择的图标添加进入项目；
>**第三步：关键一步！！！！！！——看图操作，一步都不可省略！！！即使是添加了新图标也要刷新该代码！！我之前就是因为添加了新图标没有刷新得到新代码，结果图标半天都出不来，折腾了半天才发现是这个问题**
>![看图操作一：操作说明](http://upload-images.jianshu.io/upload_images/1683063-01b773e4f2e49fc3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>![看图操作二：部分截图](http://upload-images.jianshu.io/upload_images/1683063-8dbf416bc0b08418.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>接下来就是按照说明操作即可。
>
>第四步：检查刚才的操作，是否引入了`js代码`？是否加入了`CSS设置相关代码`？是否修改了`svg的图标代码`？
>
>5.鼠标浮动在“QQ、微博、Github”上，有背后圆润的暗色背景效果？
>答：结构为：`<a><svg></svg</a>`，设置外层a标签为`inline-block`，设置边框为`border-radius:50%`即圆角的设置方式，调整好大小 ，外层添加`padding,margin`把`footer`撑起来。设置鼠标悬浮改变背景色，即可出现圆润的暗色背景效果。
>
>6.注意问题：整个信息展示展示层的边框有不是很明显的阴影效果，如何设置？
>答：实用工具——推荐网站:[制作阴影效果](https://www.cssmatic.com/box-shadow)，然后复制右侧没有前缀的那一串代码即可。

## 五、自我介绍层
- 分析：
  （1）此部分分为2部分，其中一部分是 简历下载 按钮的制作，一部分是简单的自我介绍。
- 遇到问题：
>1.如何制作简历下载的按钮？
>答：通常我们理解为是一个按钮`button`标签，但是此处我们使用的不是按钮，而是使用`<a href="#"></a>`来代替，但是它没有外层效果，所以在外层包裹一个    `<p>`元素，设置其属性为`display:inline-block`就可以使其长度适应内容变化而变化。同时也和上面一样有阴影效果。
>
>2.自我介绍部分？
>答：这一部分比较简单，在外层设置一个`div`设置其宽度，让内容居中即可。当然，这你也可以使用自己喜欢的字体进行设置。

## 六、技能进度条制作
效果图：
![image](http://upload-images.jianshu.io/upload_images/1683063-89f93684965c6cae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 分析：
  （1）首先是标题部分，字体加粗；
  （2）进度条部分：主要解决两个问题：如何制作进度条？如何设置进度条布局？

- 遇到问题：
> 1.进度条制作？
> 答：定义2个`div`，里外各一个，外层表示背景色，内层表示进度条，设置边框和背景色即可.。
>
> 2.如何布局？
> 答：定义一个无序列表，使其浮动，然后设置两边宽度分别占一半（或者一半少一点，更好布局）。
>
> 3.向左浮动的时候，原本右边设置好的边距扩大了？
> 答 ：有两种方式，你可以对右边的技能进度条的左边距设置固定值；或者是使右边的进度条向右浮动，但是，两种方式都要用到一个特殊的伪类元素 `nth-child(参数)://参数even表示偶数，odd表示奇数，也可填写具体数字，表示第几个`; 

**注意** 外边框有阴影效果和圆角边框，记得再添加样式的时候不能遗漏。

## 七、作品集制作
效果图：
![作品集](http://upload-images.jianshu.io/upload_images/1683063-efac0cf55db323b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 分析：
  （1）其中，上部标题和下面`nav`部分，包括进度条部分，首先要实现居中布局，然后进度条部分和之前一样，内外两层，只是，要使鼠标点击不同的选项进度条也跟随变化，这里要使用到部分`js代码`，原理还是`css`。要使进度条里面的红色部分移动到中间部分和右边，只需要用到2个属性：一个是指定内部进度条的长度；其次是在中间和右边的时候，需要用到`margin-left:xx px;`具体值当然是自己调试啦~

（2）下面的3个作品集，还是一样的套路，总体外部居中，指定宽和高，同时也给图片指定宽和高。但是，一个需要注意的问题：为了后面更好添加`js效果`，这里我们不采用浮动的方式对图片布局，而是使用`position`相对定位。

## 最后：阶段总结
总结我们在这个页面中使用了哪些套路？
1.首先清楚默认样式：
```
body{
	margin: 0;
}
a{
	color: inherit;
	text-decoration: none;
}
*{
	padding:0;
	margin: 0;
}
ul,ol{
	list-style: none;
}
h1,h2,h3,h4,h5,h6{
	font-weight: normal;
}
```
2.`float 和 clearfix` ：浮动和清除浮动：子元素要浮动，给它的父类添加浮动；
```
.clearfix::after {
	content: '';
	display: block;
	clear: both;
}
```
3.固定定位，例如导航条使用到的固定定位在头部：父类`position:relative`；子类`position:absolute`，同时设置具体的位置`top,left...`
4.背景色设置暗色效果：`background-color: rgba(0,0,0,0.8);`
5.设置阴影: `box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);`
6.`display:block` 、`display:inline` 、`display:inline-block` 三者的区别
- `display:block` ：块元素

（1）`block`元素会独占一行，多个`block`元素会各自新起一行。默认情况下，`block`元素宽度自动填满其父元素宽度。
（2）`block`元素可以设置`width`,`height`属性。块级元素即使设置了宽度,仍然是独占一行。
（3）`block`元素可以设置`margin`和`padding`属性。
**常见块元素有：`DIV, FORM, TABLE, P, PRE, H1~H6, DL, OL, UL 等`**

- `display:inline` ：内联元素

（1）`inline`元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
（2）`inline`元素设置`width,height`属性无效。
（3）`inline`元素的`margin`和`padding`属性，水平方向的`padding-left`, ` padding-right`, `margin-left`, `margin-right`都产生边距效果；但竖直方向的`padding-top`, `padding-bottom`, `margin-top`, `margin-bottom`不会产生边距效果。
**常见的内联元素有 `SPAN, A, STRONG, EM, LABEL, INPUT, SELECT, TEXTAREA, IMG, BR 等`**

- `display:inline-block`
  （1）简单来说就是将对象呈现为`inline`对象，但是对象的内容作为`block`对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个`link（a元素）inline-block`属性值，使其既具有`block`的宽度高度特性又具有`inline`的同行特性。
  （2）通常和另一个属性结合使用，二者不分家
```
	display: inline-block;
	vertical-align: top;
```


7.设置边框圆角：`border-radius: 2px;` ，具体参数可以自己调试
8.伪类元素`nth-child(attr)`参数值可以为 `具体数字，奇数odd，偶数even` ，主要为了方便给元素添加CSS效果。

（完）

























