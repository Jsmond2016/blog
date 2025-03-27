
# CSS深入浅出（二）：宽度与高度

## 1. `div` 的宽度与高度

### 1.1 字体与高度

示例代码：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
  div{
    border:1px solid red;
    font-size:20px;
    font-family:Tahoma;
  }
  </style>
</head>
<body>
<div>1</div>
</body>
</html>
```

![](https://i.loli.net/2017/12/12/5a2f3c2a81ab5.png)

![](https://i.loli.net/2017/12/12/5a2f3c3d3cbb4.png)

发现问题：

- div的高度由内容决定，但是同样的内容为数字“1”时，设置字体大小相同，改变字体，高度却不同；


- 所以，字体不同时div的高度也不同，因此得出不同的字体高度也不同，那么这是为什么呢？这就要涉及到字体设计有关的知识了。

拓展：字体设计排版原理

- 以前，我们在四线三格上写英文的时候，每个字母都会有它的书写结构，为 上、中、下；但是主体内容都是居中对齐，如图：
  ![](https://i.loli.net/2017/12/12/5a2f417039c3a.png)

- 以上，对比中文和英文的书写和用户的视觉习惯，我们得出字体是按照基线对齐的，那么字体的大小又是由谁决定的呢？为什么设置同样的 `font-size` ，不同的字体大小会不同？不应该都是一样的大吗？

- 事实上，不同的字体，设计师在设计的时候都会有一个建议行高，并将这个建议行高放入字体文件中，浏览器在加载这个字体文件的时候就会遵循设计师的要求来控制字体的行高。这个行高才是决定字体大小的关键所在！！

  ![](https://i.loli.net/2017/12/12/5a2f41c23ad2c.png)

**那么，div的高度是由谁决定的呢？**

答案：`line-height` 

- 如图，我们设置字体大小为 50px，但是div却没有被字体大小所撑开，依然为原来的大小；
- 但是，当我们将  `line-height` 设置为 50px 时，很明显div的高度改变了。
  [代码-效果预览](http://js.jirengu.com/jawojemehi/3/edit)

![](https://i.loli.net/2017/12/12/5a2f4245ae0ad.png)

- 综上所述，字体行高是由设计师的建议行高所决定的，div 的高度是由  `font-height` 决定的。

### 1.2 空格与宽度

#### 1.21 `no break space` 

如图：当我们在代码左侧敲多个空格时，显示效果只有一个空格的效果，这是为什么呢？因为 `html` 会把多余的空格缩起来。

![](https://i.loli.net/2017/12/12/5a2f43b10934a.png)

解决办法：使用 `&nbsp;` 即 `no break space` 不断行的空格。

#### 1.22  `text-align:justify` 和两边对齐 

通常，我们在写一个个人信息页面的时候，需要姓名，联系方式等上下两边对齐。常用的写法，就是使用 `&nbsp;`

```
<body>
 姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<br>
 联系方式：
</body>
```

![](https://i.loli.net/2017/12/12/5a2f4a36972fe.png)

这种方法看似可行，但是细看一下感觉依然有些不足，即两依然没有完全对齐，为什么呢？还是回到上面的字体设计的原因：不同的字体它每个空格所对应字体大小不同。

那么，好的对齐方式是什么呢？

此时，我们可以使用到` text-align:justify` ,使用方式和效果预览：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body style="text-align:justify;">
<p>我是一段文字12314343123文字我是一段文字12314343123文字我是一段文字12314343123文字我是一段文我是一段文字12314343123文字我是一段文字12314343123文字我是一段文字12314343123文字我是一段文我是一段文字12314343123文字我是一段文字12314343123文字我是一段文字12314343123文字我是一段文我是一段文字12314343123文字我是一段文字12314343123文字我是一段文字12314343123文字我是一段文我是一段文字12314343123文字我是一段文字12314343123文字我是一段文字12314343123文字我是一段文</p>
</body>
</html>
```

没有使用 `text-align:justify` 时，

![](https://i.loli.net/2017/12/12/5a2f4a8e143eb.png)

使用`text-align:justify` 时，

![](https://i.loli.net/2017/12/12/5a2f4a9ce6a4f.png)

- 注意细节：只有在多行文本的时候可以使用，因为他要和下面行两端对齐，而在单行文本的时候没有第二行没有参照对象，所以没有效果；

- 因为只有一行，所以我们在使用 `text-align:justify` 让姓名和联系方式对齐时， 需要在下面添加一行，代码和[预览](http://js.jirengu.com/bujilawagu/2/edit)如下：

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
    <style>
    span{
      border:1px solid black;
      display:inline-block;
      width:5em;
      line-height:20px;
      height:20px;
      text-align:justify;
      overflow:hidden;
      
    }
      span::after{
        content:'';
        display:inline-block;
        width:100%;
        border:1px solid blue;
      }
    
    </style>
  </head>
  <body>
  <span>姓名</span><br>
  <span>联系方式</span>
  </body>
  </html>
  ```

  ![](https://i.loli.net/2017/12/12/5a2f50ab506d1.png)


- 因为只有单行文字，我们需要在`span` 后面的添加伪元素，设置它的宽度为 100%；


- 同时，下面多了一行不是我们想要的，如何隐藏但是不改变整体呢？需要对 `span` 设置高度和行高，即让它容不下第二行，那么第二行自然就溢出了，然后使用 `overflow:hidden` 就搞定了，是不是很神奇~！

#### 1.23 空格对内联元素的影响

- 常见的问题是内联元素有空格或者是回车，都会有空格。

  ```css
  <span>123</span>
  <span>456</span>
  ```

- 解决办法：写成一行

  ```css
  <span>123</span><span>456</span>
  ```

#### 1.24 `word-break:break-all` 允许在单词内换行。

![](https://i.loli.net/2017/12/12/5a2f896ac6589.png)

#### 1.25 不给div设置宽高，让div的高度为40px，让文字垂直横向居中

- 方法：在 `div` 中尽可能不要使用固定宽度和高度值，而是使用 `paddding` 实现宽高和居中，避免影响后面的元素，使得页面更美观，同时支持响应式。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
  div{
    border:1px solid red;
    line-height:24px;
    padding:7px 0;
    text-align:center;
  }
  
  </style>
</head>
<body>
<div>helloworldhelloworldhelloworldhellowor</div>
</body>
</html>
```

![](https://i.loli.net/2017/12/12/5a2f71e94c0d5.png)






## 2. 文本溢出

### 2.1 单行文本溢出

- `text-overflow:ellipsis` 

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
    <style>
    .div{
      border:1px solid black;
      width:250px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    </style>
  </head>
  <body>
  <div class="div">这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字</div>
  </body>
  </html>
  ```

### 2.2 多行文本溢出

- [CSS-Tricks](https://css-tricks.com/line-clampin/)

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
    <style>
    .div{
      border:1px solid black;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow:hidden;
    }
    </style>
  </head>
  <body>
  <div class="div">这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
    这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文
    这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文
    这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文</div>
  </body>
  </html>
  ```

  ​