---
title: CSS深入浅出——响应式
date: 2017-12-30 17:52:25
tags: "CSS"
---

# 响应式/移动端页面



手机端页面（响应式）的做法

## 1. 学会 media query

例子：

[媒体查询教程-—MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)

```html
<style>
/*一种限定条件*/
 @media(max-width:375px){ /*最大宽度小于375px时，以下样式生效*/  
	 body{ 
     	background:red;  
     	}
     }
 @media(min-width:375px){  /*最小宽度大于375px时，以下样式生效*/
 	body{  
 		background:green;
        }
     }
  
  /* 多种限定条件 使用or或者是and连接限定条件*/
   @media(min-width:375px) or||and (max-width:960px){
 	 body{
	 	 background:blue;
   		 }
	}
  </style>
```

常见问题，当写多个媒体查询条件时，后面的媒体查询条件会覆盖前面的，举例如下：

```html
<style>
@media(max-width:320px){
  body{
  	background:red;
	}
}
@media(max-width:375px){
  body{
  	background:orange;
	}
}
@media(max-width:425px){
  body{
  	background:green;
	}
}
@media(max-width:768px){
  body{
  	background:blue;
	}
}
@media(min-width:769px){ /*最小宽度为769px*/
  body{
  	background:purple;
	}
}
</style>
```

![媒体查询](https://i.loli.net/2017/12/30/5a473dfa5fe53.png)

出现的结果为：当屏幕宽度为320px时，屏幕颜色为蓝色，按道理应该是红色，但是却是对倒数第二个媒体查询的限定条件生效了

**原因 在于后面的css样式覆盖了前面的样式**


- 解决办法一：更改媒体查询的限定条件的顺序

  ```html
  <style>
  @media(max-width:768px){
    body{
    	background:blue;
  	}
  }
    @media(max-width:425px){
    body{
    	background:green;
  	}
  }
    @media(max-width:375px){
    body{
    	background:orange;
  	}
  }
    @media(max-width:320px){
    body{
    	background:red;
  	}
  }

  @media(min-width:769px){ /*最小宽度为769px*/
    body{
    	background:purple;
  	}
  }
  </style>
  ```

  ![媒体查询](https://i.loli.net/2017/12/30/5a473f0c11917.png)

- 解决办法二：使用组合限定条件，即使用`or,and` 等条件加以限定

  ```html
  <style>
  @media(max-width:320px){
    body{
    	background:red;
  	}
  }
  @media(min-width:321px) and (max-width:375px) {
    body{
    	background:orange;
  	}
  }
  @media(min-width:376px) and (max-width:425px){
    body{
    	background:green;
  	}
  }
  @media(min-width:426px) and (max-width:768px){
    body{
    	background:blue;
  	}
  }
  @media(min-width:769px){ /*最小宽度为769px*/
    body{
    	background:purple;
  	}
  }
  </style>
  ```

  ![媒体查询](https://i.loli.net/2017/12/30/5a4749c6bf7bd.png)


有个细节要注意：

限定条件`and,or` 前后一定要有**空格**，不然没有效果！！
限定条件`and,or` 前后一定要有**空格**，不然没有效果！！
限定条件`and,or` 前后一定要有**空格**，不然没有效果！！

```html
<style>
/*错误写法*/
@media(min-width:426px)and(max-width:768px){ 
	body{  
    background:blue;  
    }
  }
  /*正确写法*/
@media(min-width:426px) and (max-width:768px){ 
body{   
 background:blue;  
  }
}
</style>
```



## 2. 学会要设计图（没图不做）

pc端有pc端对应的设计图，同时，手机端也有手机端的设计图，如果产品经理给你个pc端的设计图，让你做个移动端的页面，抱歉，不干！！

或者，做也行，做的丑这个锅前端工程师不背！！！

就是这么任性！！！

## 3. 学会隐藏元素

具体实例，做一个简单的Demo学习viewport响应式 在不同的分辨率下不同的显示效果。

通常来说，在不同的像素宽度的设备上，显示的页面是有所差异的，常见的一种方式是隐藏一部分元素或者更改一些元素来实现使用不同设备的用户想要的效果。

具体参考Demo参考 [css深入浅出--响应式第三节](https://xiedaimala.com/courses/003b1951-22af-4821-ad80-d2880c0074eb/tasks/f61cdba2-cea3-4da1-90b6-3f37bd8d6d5b)

## 4. 手机端要加一个 meta
   `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0,maximum-  scale=1.0, minimum-scale=1.0"> `

早期的网页只有pc端，没有移动端，当时给诺基亚使用还要专门给诺基亚用户写一套网页，使用的是wap语言

之后，iPhone进入中国以后，它调查了全世界所有的网页，发现大部分的网页都是在980px的宽度，所以，在使用iphone看网页的时候，它会模拟一个980px宽度的网页显示，实际上就是缩放页面进行显示。

如何证明？控制台模拟iphone手机，在控制台输入 `document.documentElement.clientWidth` ,你得到的返回值为980px  

但是事实上，我们前端工程师已经给移动端写好了一套移动端页面，而iphone手机又要缩放显示，那整个页面显示就会很丑，怎么办？

使用以下meta标签 ，告诉浏览器不要缩放！

   `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0,maximum-  scale=1.0, minimum-scale=1.0"> `

- content = "width=device-width"  内容等于设备的宽度
- user-scalable=no 不允许用户缩放
- initial-scale=1.0 初始缩放比例为1.0
- maximum-  scale=1.0 最大的缩放倍数为1.0
- minimum-scale=1.0" 最小缩放的倍数为1.0

此时，你再模拟iphone用户，在控制台输入 `document.documentElement.clientWidth` 即可得到网页宽度和手机宽度一致。

> 在sublime Text快速输入此meta方式为 `meta:vp` + Tab

参考资料 [在移动浏览器中使用viewport元标签控制布局—MDN](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)

## 5. 手机端的交互方式不一样
   >1. 没有 hover
   >2. 有 touch 事件
   >3. 没有 resize
   >4. 没有滚动条

