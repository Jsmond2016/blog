# CSS常见样式

## 1. 块级元素和行内元素分别有哪些？动手测试并列出4条以上的特性区别 

答：

（1）块级元素含义：block element
HTML（超文本标记语言）中元素大多数都是“块级”元素或行内元素。块级元素占据其父元素（容器）的整个空间，因此创建了一个“块”。                             

（2）块级元素举例：

```
- address – 地址
- blockquote – 块引用
- center – 举中对齐块
- dir – 目录列表
- div – 常用块级容易，也是CSS layout的主要标签
- dl – 定义列表
- fieldset – form控制组
- form – 交互表单
- h1 – 大标题
- h2 – 副标题
- h3 – 3级标题
- h4 – 4级标题
- h5 – 5级标题
- h6 – 6级标题
- hr – 水平分隔线
- isindex – input prompt
- menu – 菜单列表
- noframes – frames可选内容，（对于不支持frame的浏览器显示此区块内容
- noscript – 可选脚本内容（对于不支持script的浏览器显示此内容）
- ol – 有序表单
- p – 段落
- pre – 格式化文本
- table – 表格
- ul – 无序列表
```

特性：

-  块级元素从新行开始，结束接着一个断行。
  如图可见，2个块元素各占一行。且内容默认占满容器。

![](https://i.loli.net/2017/11/20/5a12ba52dd495.png)

-  宽高和内外边距都可以控制
  如图，我们给块元素div3设置宽度高度可以生效。

![](https://i.loli.net/2017/11/20/5a12ba8d31a43.png)

-  宽度默认是它容器的100%，除非指定一个具体宽度
-  可以容纳其它内联元素和块元素

（3）行内元素含义：inline element
  也叫内联元素、内嵌元素等；行内元素一般都是基于语义级(semantic)的基本元素，只能容纳文本或其他内联元素，常见内联元素 “a”。比如 SPAN 元素，IFRAME元素和元素样式的display : inline的都是行内元素。例如文字这类元素，各个字母 之间横向排列，到最右端自动折行。

（4）行内元素举例

```
- a – 锚点
- abbr – 缩写
- acronym – 首字
- b – 粗体(不推荐)
- bdo – bidi override
- big – 大字体
- br – 换行
- cite – 引用
- code – 计算机代码(在引用源码的时候需要)
- dfn – 定义字段
- em – 强调
- font – 字体设定(不推荐)
- i – 斜体
- img – 图片
- input – 输入框
- kbd – 定义键盘文本
- label – 表格标签
- q – 短引用
- s – 中划线(不推荐)
- samp – 定义范例计算机代码
- select – 项目选择
- small – 小字体文本
- span – 常用内联容器，定义文本内区块
- strike – 中划线
- strong – 粗体强调
- sub – 下标
- sup – 上标
- textarea – 多行文本输入框
- tt – 电传文本
- u – 下划线

```

特性：

- 行内元素横向从左往右排列。
  从图中可以看出，两个行内元素从左往右排列，但是，发现一个有趣的现象，两个元素中间有个空格，原因是代码写的两个标签有个转行，这就是为什么两个行内元素中间有空格的原因。

![](https://i.loli.net/2017/11/20/5a12b8ec8948b.png)

- 高，行高及外边距和内边距不可改变
  如图，给行内元素s2设置左边距有效，但是设置上边距无效。同时，可以看出行内元素的两侧紧贴内容的两边，发现宽度是由内容所决定。

![](https://i.loli.net/2017/11/20/5a12b9d111297.png)

- 宽度就是它的文字和图片的宽度，不可改变

- 内联元素只能容纳文本或者其他内联元素


（5）二者区别：

区别一：

- 块级：块级元素会独占一行，默认情况下宽度自动填满其父元素宽度
- 行内：行内元素不会独占一行，相邻的行内元素会排在同一行。其宽度随内容的变化而变化。

区别二：

- 块级：块级元素可以设置宽高
- 行内：行内元素不可以设置宽高

区别三：

- 块级：块级元素可以设置内外边距
- 行内：行内元素可以设置水平方向的内外边距，不可以设置竖直方向的内外边距

区别四：

- 块级：`display:block;`
- 行内：`display:inline;`
- 可以通过修改 `display` 属性来切换块级元素和行内元素

（6）拓展： `inline-block`

- `inline-block` 的元素(如 `input、img` )既具有 `block` 元素可以设置宽高的特性，同时又具有 `inline` 元素默认不换行的特性。当然不仅仅是这些特性，比如 `inline-block` 元素也可以设置 `vertical-align` (因为这个垂直对齐属性只对设置了 `inline-block` 的元素有效 )属性。


- HTML 中的换行符、空格符、制表符等合并为空白符，字体大小不为 0 的情况下，空白符自然占据一定的宽度，使用 `inline-block` 会产生元素间的空隙
- 简单来说：`inline-block` 元素可以 设置宽高，不会换行，不会占满一行

参考链接：

- [块级元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)
- [行内元素和块级元素的具体区别是什么？inline-block是什么？（面试题目）](http://www.cnblogs.com/iceflorence/p/6626187.html)
- [CSS块级元素和行内元素](https://jeffjade.com/2015/06/24/2015-06-24-css-block-inline/)



## 2. 什么是 CSS 继承? 哪些属性能继承，哪些不能？ 

答：CSS继承：

（1）含义： 

- 每个 CSS 属性定义 的概述都指出了这个属性是默认继承的 ("Inherited: Yes") 还是默认不继承的 ("Inherited: no")。这决定了当你没有为元素的属性指定值时该如何计算值。
- 当元素的一个 继承属性 （inherited property ）没有指定值时，则取父元素的同属性的 计算值 computed value 。只有文档根元素取该属性的概述中给定的初始值（initial value）（这里的意思应该是在该属性本身的定义中的默认值）。

（2）哪些可以被继承？

- 文本相关属性

```css
font-family, font-size, font-style,
font-variant, font-weight, font, letter-spacing,
line-height, text-align, text-indent, texttransform,word-spacing
```

- 列表相关属性

```css
list-style-image, list-style-position,
list-style-type, list-style
```

- color属性

（3）哪些不可以被继承？

```html
display、margin、border、padding、background、height、min-height、
max- height、width、min-width、max-width、overflow、position、left、
right、top、 bottom、z-index、float、clear、table-layout、vertical-align、
page-break-after、 page-bread-before和unicode-bidi
```



参考：

- [CSS样式表继承详解](http://www.cnphp.info/css-style-inheritance.html)
- [CSS-样式继承与覆盖](http://www.jianshu.com/p/d0c035ae63dd)
- [层叠和继承](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Cascading_and_inheritance)
- [CSS中可以和不可以被继承的属性](http://blog.163.com/yhwwen@126/blog/static/170468853201326421822/)



## 3. 如何让块级元素水平居中？如何让行内元素水平居中? 

答：

- 块级元素水平居中：`margin: 0 auto ;`
  这是当子元素为定宽且位于正常瀑布流的情况下的居中方式，当子元素不是正常瀑布流的情况下，例如子元素浮动脱离文档流为绝对定位时，需要明确指出四个方向的定位，代码如下：

```css
.parent{
    position: relative;   
    width: 500px;
    height: 100px;
    background-color: #eee;
}
.child{
    position: absolute;
    width: 100px;
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    background-color: #82ab00;
}
```

  ​

- 行内元素水平居中：`text-align: center;`
   但是有个缺点，由于 `text-align: center;`  是可继承属性，即父元素内部所有元素都会继承这个属性，从而它在元素内部的文本都会居中显示。因此需要对子元素的文本居中样式单独设定。



参考链接：

- [CSS居中完整指南](https://www.w3cplus.com/css/centering-css-complete-guide.html)
- [CSS之元素水平居中](http://www.jianshu.com/p/b74689ee1eac)
- [CSS使用技巧--实现元素（水平、垂直）居中](http://www.jianshu.com/p/1ab54c32f2c2)

## 4. 用 CSS 实现一个三角形 

答：

- 原理：设置边框的宽度粗细，设置其颜色微透明，组成所想要的三角形


- 实现代码和效果如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
  .div{
  width:0;
  height:0;
  border:20px solid black;
  border-right:20px solid rgba(0,0,0,0);
  border-bottom:20px solid rgba(0,0,0,0);
}
  </style>
</head>
<body>
<div class="div"></div>
</body>
</html>
```

![](https://i.loli.net/2017/11/20/5a11b1ccbcb8b.png)

## 5. 单行文本溢出加 `...`如何实现? 

答：

```html
//单行

<style>

  .single-line{

   width:200px;

   overflow:hidden;

   white-space:nowrap;  

   text-overflow:ellipsis;

   border: 1px solid black;
}
</style>

<div class="single-line"></div>

//多行

<style>
  .multiple-line{   

   width:200px;   

   display:-webkit-box;   

  -webkit-box-orient:vertical;   

  -webkit-line-clamp:2;   

   overflow:hidden;   
   
  border: 1px solid black;
}
</style>
<div class="multile-line">
</div>
```

效果如下：

- ![](https://i.loli.net/2017/11/20/5a11b41ab91d0.png)

参考：

- [CSS实现单行、多行文本溢出显示省略号（…）](http://www.daqianduan.com/6179.html)
- [CSS实现单行、多行文本溢出显示省略号](http://ghmagical.com/article/page/id/uoeIOGfG7v4j)

## 6. px, em, rem 有什么区别? 

答：

- px： (pixel，像素)，是一个虚拟长度单位，是计算机系统的数字化图像长度单位，如果px要换算成物理长度，需要指定精度DPI(Dots Per Inch，每英寸像素数)，在扫描打印时一般都有DPI可选。Windows系统默认是 96dpi，Apple 系统默认是 72dpi。

特点：px 在缩放页面时无法调整那些使用它作为单位的字体、按钮等的大小；

- em：(相对长度单位，相对于当前对象内文本的字体尺寸)：是一个相对长度单位，最初是指字母M的宽度，故名em。现指的是字符宽度的倍数，用法类似百分比，如：0.8em, 1.2em, 2em 等。通常 1em=16px。

特点：em 的值并不是固定的，会继承父级元素的字体大小，代表倍数；

- rem：是 CSS3 新增的一个相对单位，这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了 IE8 及更早版本外，所有浏览器均已支持 rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。

特点：rem 的值并不是固定的，始终是基于根元素 `<html>` 的，也代表倍数。



参考链接：

- [CSS：区别 px、em、rem](https://segmentfault.com/a/1190000005936910)
- [彻底弄懂css中单位px和em,rem的区别](https://www.cnblogs.com/leejersey/p/3662612.html)
- [css中的px、em、rem 详解](http://www.mamicode.com/info-detail-655497.html)



## 7. 解释下面代码的作用?为什么要加引号? 字体里`\5b8b\4f53`代表什么? 

```html
body{
  font: 12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
}
```

答：

（1）作用：
 
- 依次设置 字体的大小，行高，字体类型

- 即: `font-size  /  line-height , font-family` 
 
- 等价于以下代码：


```css
body{
  font-size: 12px;
  line-height: 1.2;
  font-family: tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
}
```

**详细说明：**

在CSS设置字体时，直接写字体中文或英文名称浏览器都能识别，直接写中文的情况下编码(GB2312,UTF-8等)不匹配时会产生乱码。保险的方式是将字体名称使用Unicode来表示，每一种字体都有唯一的Unicode 编码与之对应。

举例 2 种情况：

（1）当你的网页字体设置为 `font-family:'微软雅黑'` 时，某个外国人打开你的网页，但是他的系统里面是没有 “微软雅黑” 这几个字的，所以我们设置的`font-family:'微软雅黑'` 外国人的电脑就不能识别 ，这样的话，即使他的电脑里面安装了 `Microsoft YaHei` 这种字体，但是不能和我们网页设置的字体对应起来；

（2）但我们在写CSS的时候保存为 GB2312的格字符编码式，但是用户在使用浏览器的解析我们的代码使用的是 UTF-8 字符编码格式，此时会产生乱码。

那，我们该怎么办呢？

- 引号：
  
我们对每一种字体设置一种它指定的英文名字，例如 “宋体” 为 “SimSun”  ，“黑体”为 “SimHei” ，“微软雅黑” 为 “Microsoft YaHei”，因为这个名字较长中间有空格，所以我们使用 引号将它包裹起来

- `'\5b8b\4f53'` ：

上述方法中，我们使用引号将字体名字包裹起来，貌似已经解决了字体的问题，但是，在有些浏览器中对使用引号包裹起来的字体存在兼容的问题，依然无法识别，怎么办？此时就与要用到 Unicode 编码的方式，比如：黑体的 Unicode 编码为 `\9ED1\4F53`  ，宋体的Unicode 编码为 `\5B8B\4F53`  ，微软雅黑的Unicode 编码为 `\5FAE\8F6F\96C5\9ED1` ,其中用 `\` 来区分一个中文字符。这样的话，使用 “中文+英文+Unicode编码” 的方式就可以确定你使用的字体啦。

- 我们如何得到每一种字体的对应的Unicode编码呢？
  
只需要在控制台输入 `escape('字体')` 即可得到，然后使用 `\` 替换对应的 `%u` 即可， 如图。

![](https://i.loli.net/2017/11/20/5a12b05d285e1.png)

