---
title: CSS常见样式（二）
date: 2017-11-24 00:11:57
tags: CSS
categories: CSS
---

##  1. `text-align: center`的作用是什么，作用在什么元素上？能让什么元素水平居中

（1）作用：CSS属性定义行内内容（例如文字）如何相对它的块父元素对齐。`text-align` 并不控制块元素自己的对齐，只控制它的行内内容的对齐。
（2）作用元素：块元素
（3）可以让块元素的内容相对其父元素水平居中。

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    .div,
    h1{
        text-align:center;
        border:1px solid red;
  }
</style>
</head>
<body>
<div class="div">hello</div>
<h1>hello</h1>
</body>
</html>
```
效果:
![text-align:center](https://i.loli.net/2017/11/22/5a1535b56050e.png)



## 2. IE 盒模型和W3C盒模型有什么区别?

主要区别在宽度的计算方式上：

- IE盒模型：

  width = content + border + padding 
  ​

  优点：宽度固定。设置宽度以后会，盒模型整体宽度不需要单独考虑padding和border对整体的影响。

  > 因为IE盒模型的宽度包括了content、padding、border，所以我们在布局样式的时候不需要单独去计算每个部分的宽度，只需要考虑每个每个元素之间的margin即可，但是也有个问题需要注意，因为宽度包含了边距和边框，对应的 content 可以利用的空间相对较少。

  缺点：content 可利用空间受限制。

  > 因为 padding和border占据了一定的空间，那么在宽度固定的情况下，content 和padding 及border的宽度相互制约。

  ​

  ![](https://i.loli.net/2017/11/22/5a153aac0ff81.png)


- 标准盒模型（W3C盒模型）:
  ​
  width = content
  ​
  优点：content 不受padding和border限制。
  缺点：盒子整体宽度受限制。在进行整体布局的时候，因为考虑到border和padding的宽度，盒子的整体宽度需要单独计算，比较繁琐。
  ​
  ​
  ![](https://i.loli.net/2017/11/22/5a153a29d1b43.png)


- 如何使用？

  在上述两种盒模型中，没有哪个绝对的好与坏。实际开发中，面对不同的情况，所选择的盒子模型也不同，所以，按需求出发，哪种情况下哪种盒模型更好用就用哪一个，以下为两种盒模型的转换方法:
  ​

  > box-sizing: content-box ; // 设置盒模型为标准盒模型
  >
  > box-sizing: border-box; //设置和模型为IE盒模型



## 3. `*{ box-sizing: border-box;}`的作用是什么？

作用：

> 设置所有的块元素的和模型结构为 IE盒模型，即 width = content + padding + border ；好处在于盒模型整体结构不会受到padding和border的影响。

## 4. `line-height: 2`和`line-height: 200%`有什么区别?

`line-height` 后有三种参数可写，分别为 数字（代表倍数），百分比（默认行高的百分之几），带单位的像素值。已知Chrome的默认字体大小为16px。

- `line-height:2` 
  （1）设置字体的行高是默认/本身 字体的行高的2倍

  > 当没有单独设置字体大小的情况下，此时行高就按照默认字体16px的2倍来计算来计算；
  >
  > 当已经设置了字体大小 a px，此时行高的大小为 2a px；
  > ​
  >
  > 下图中 `line-height: 2`  ==  `line-height: 32px`  

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
    <style>
      .div{
        border:1px solid black;
        width: 200px;
        line-height:2;
        /* line-height: 32px; */
      }
    </style>
  </head>
  <body>
  <div class="div">
    这是一段文字，这是一段文字
     这是一段文字，这是一段文字
     这是一段文字，这是一段文字
     这是一段文字，这是一段文字
    <p></p>
  </div>
  </body>
  </html>
  ```

  ![](https://i.loli.net/2017/11/23/5a15a1a8631d5.png)

  ​

  （2）继承属性
  当父元素设置 了 `line-height` 以后，后面的元素会继承前面的属性，如下图：

  对 `body` 设置 `line-height: 2` 后面的子元素没有设置但是依然可以继承父元素的属性。

  ​

  ```css
  //css样式如下
  body{
    line-height: 2;
  }
  .div{
    border:1px solid black;
    width: 200px ;
  }

  ```

  ![](https://i.loli.net/2017/11/23/5a15a2d2e0257.png)

  ​

  但是：

  当子元素设置了字体大小，那么父元素又设置了 `font-height:2` 此时子元素的行高大小为当前值的2倍。
  论证了前面的观点 *（1）设置字体的行高是默认/本身 字体的行高的2倍* ，代码如下：

  ​

  ```css
  body{
    line-height: 2;
  }

  .div{
    border:1px solid black;
    width: 200px;
    font-size: 20px;
  }
  ```

  ![](https://i.loli.net/2017/11/23/5a15a412318da.png)

  ​

- `line-height:200%`
  （1）设置字体的行高是 默认/当前 字体的行高的2倍，即Chrome的默认字体大小为16px，那么此时行高的大小 == 32px

  等价于 `line-height:200%; == line-height: 32px;`

  ```
  .div{
    border:1px solid black;
    width: 200px;
  /* font-size:16px; */
    line-height: 200%;
  }
  ```

  （2）继承属性，和上面同理

  ​

- `line-height:32px` 
  设置字体的行高为32px，
  ​

  ```
  .div{
    border:1px solid black;
    width: 200px;
    line-height: 50px;
  }
  ```

  ![](https://i.loli.net/2017/11/23/5a15a707974a0.png)

  ​

  （2）继承属性，和上面同理

## 5. inline-block有什么特性？如何去除缝隙？高度不一样的inline-block元素如何顶端对齐?

- inline-block 的元素（如input、img)既具有 block 元素可以设置宽高的特性，同时又具有 inline 元素默认不换行的特性。当然不仅仅是这些特性，比如 inline-block 元素也可以设置 vertical-align（因为这个垂直对齐属性只对设置了inline-block的元素有效） 属性。


- HTML 中的换行符、空格符、制表符等合并为空白符，字体大小不为 0 的情况下，空白符自然占据一定的宽度，使用inline-block 会产生元素间的空隙
- 简单来说：`inline-block` 元素可以 设置宽高，不会换行，不会占满一行


- 如何去除空隙？
  （1）如图，两个hello 之间有个缝隙，这是为什么呢？
  ![](https://i.loli.net/2017/11/23/5a15a8dc289cb.png)

   >从图中的HTML的代码中我们可以看到，2个span元素之间有个空格（转行），解决缝隙的办法就是将2个span并排写在一起就好了。
   >
   >```html
   ><span class="box">hello</span><span class="box">hello</span>
   >```

（2）在外层包裹一个div，设置其字体大小为0，然后在box内部重新设置回去即可。

```
//HTML
<div class = "wrap">
 	<span class="box">hello</span>
 	<span class="box">hello</span>
</div>

//CSS
.wrap{
  font-size: 0;
}
.box{
  border:1px solid black;
  width: 100px;
  display:inline-block;
  font-size: 14px;
}

```

![](https://i.loli.net/2017/11/23/5a15aab0bb9ad.png)

- 如图，高度不同如何顶端对齐?
  当给两边的span给定不同的宽高和内容大小以后，结果两个元素内容依然以内容的基线对齐？为什么？因为该box定义为 `display: inline-block` 那么它就有行内元素的一个特性，即内容默认以基线对齐。

![](https://i.loli.net/2017/11/23/5a15ace11026f.png)  

那么，该使用什么方式让他们底部/顶部对齐呢？

> vertical-align: top ;   //以顶端对齐
>
> vertical-align: bottom;   //以底部对齐。



参考链接：

[块级元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)

[行内元素和块级元素的具体区别是什么？inline-block是什么？（面试题目）](http://www.cnblogs.com/iceflorence/p/6626187.html)

[CSS块级元素和行内元素](https://jeffjade.com/2015/06/24/2015-06-24-css-block-inline/)



## 6. CSS sprite 是什么?

- [CSS 精灵图](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/CSS_Image_Sprites) ：将不同的图片/图标合并到一张图片上

雪碧图被运用在众多使用了很多小图标的网站上。相对于把每张小图标以.png格式文件的形式引用到页面上，使用雪碧图只需要引用一张图片，对内存和带宽更加友好。

举例：打开淘宝网站选择其中一个小图标，右键审查元素找到该图片的链接,实际上就是后面一整张图片使用绝对定位得到该图片的位置。

使用精灵图的 优点：可以减少网络请求，提高网络加载性能。

使用精灵图的 缺点：无法缩放，无法修改图片。

![](https://i.loli.net/2017/11/23/5a16ae3cbb03d.png)

![](https://i.loli.net/2017/11/23/5a16ae9cc224c.png)

CSS 精灵图自动化生成工具：[css sprites generator](https://spritegen.website-performance.org/)

## 7. 让一个元素"看不见"有几种方式？有什么区别?

> 有两种方式——隐藏 or 透明 

- 隐藏：看不见，但是不占用位置
  `display: none` :消失，不占用位置
  ​

- 透明：看不见，但是占用位置
  （1）`opacity: 0` 设置透明度为0，即看不见被该元素修饰的东西，但是依然占用位置
  （2）`visility: hideen` 隐藏内容，但是依然占用位置
  （3）`background-color:rgba(0,0,0,0.2)` 设置背景色透明，只是针对于背景色为透明。

  ​

