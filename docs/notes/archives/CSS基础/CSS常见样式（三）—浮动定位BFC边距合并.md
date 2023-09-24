---
title: CSS常见样式（三）——浮动定位BFC边距合并
date: 2017-11-24 00:15:21
tags: CSS
categories: CSS
---

## 1. 浮动元素有什么特征？对父容器、其他浮动元素、普通元素、文字分别有什么影响?

> 文档流：normal flow
>
> 文档流指的是元素按照其在 HTML 中的位置顺序决定排布的过程，或者说在排布过程中将窗体自上而下分成一行行, 并在每行中按从左至右的顺序排放元素。
>
> 非浮动的块级元素独占一行，行内元素不会独占一行。

（1）特征：设置浮动的元素会脱离文档流，同时它会自动变成块元素，会使元素向左或向右移动，其周围的元素也会重新排列。

（2）影响：

- 父容器：无法再撑开父元素的宽高

- 其他浮动元素：根据设置浮动的属性（左/右）而依次向左或向右排列。

- 普通元素：分为两种情况
  a.根据HTML结构为例，在设置浮动元素  前面的元素不受影响，如下图的box1不受在他下面的元素的影响
  ​
  b.根据HTML结构为例，在设置浮动元素  后面的元素无法感知到浮动元素的存在，如下图的box2无法感知到浮动元素的存在，依然按照正常的文档流排列。

  ​
  代码和效果如下：

  ```
  //CSS样式
  <style>
    .box1{
    width:200px;
    height:200px;
    border:1px solid black;
    background:red;
    
  }
  .box2{
    width:200px;
    height:200px;
    border:1px solid black;
    background:blue;
    float:left;
  }
  .box3{
    width:300px;
    height:200px;
    border:1px solid black;
    background:green;
  }
    </style>
    
  //HTML 结构
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  ```

  ![](https://i.loli.net/2017/11/24/5a1777ba7652c.png)

- 文字：文字会自动识别浮动元素并且围绕浮动元素排布

如图：

![](https://i.loli.net/2017/11/24/5a17792503074.png)



参考链接：[CSS浮动、定位相关问题](http://www.joycesong.com/archives/204)

## 2. 清除浮动指什么? 如何清除浮动? 两种以上方法

（1）清除浮动：即让浮动元素继续浮动，但是清除浮动带来副作用，如下图：
设置了图片浮动，但是无法将内容撑开，整个页面显得比较丑。
![](https://i.loli.net/2017/11/24/5a183a82b5b5a.png)

（2）清除浮动方法：给父容器添加 `clearfix` 

- `clear` 有3个属性：left / right / both ，分别为设置清除左侧 /右侧 / 两边/ 浮动的影响，常用的为 `clear: both`  ,通常是在浮动后面添加一个空div，设置它的清除浮动属性。，如图：

  > 未设置清除浮动之前效果

  ![](https://i.loli.net/2017/11/24/5a183f2a9a46d.png)

  > 设置清除浮动以后效果

  ![](https://i.loli.net/2017/11/24/5a183fa2eaec6.png)


- 设置伪元素--推荐使用！

  ``` css
  //方法一
  .clearfix::after {
  	content: '';
  	display: block;
  	clear: both;
  }
  //方法二
  .clearfix:after{
    content:"";
    display: table;
    clear: both;
  }
  ```

- 给父元素设置浮动

- `zoom` 

  ```
  .clearfix{
    *zoom: 1;
  }
  ```

  ​

## 3. 有几种定位方式，分别是如何实现定位的，参考点是什么，使用场景是什么？

-   定位方式: `position: xxx;` 
    -  `inherit`: 规定应该从父元素继承 position 的值	
    -  `static`: 默认值，没有定位。
    -  `relative`: 生成 **相对定位** 的元素，相对于元素本身正常的位置进行定位
    -  `absolute`:生成 **绝对定位** 的元素 ，相对于 static 定位以外的第一个祖先元素进行定位，元素的设置通过 `left,top,right,bottom` 属性进行规定。
    > 绝对定位与相对定位
    >
    > - 相对定位可以看做是特殊的普通流定位，元素位置是相对于它在普通流中位置发生的变化，而绝对定位使元素的位置与文档流无关，也不占据文档流空间，普通流中的元素布局就像绝对定位中的元素不存在一样
    >
    > - 绝对定位的元素的位置是相对于位置距离较近的非`static`祖先元素位置决定的。如果元素没有已定位的祖先元素，那么他的位置就相对于初始包含块`html`来定位.，如图：
    >   当在 body中没有设置`position:relative ` 时，红色部分的位置
    >   当在body找设置了`position:relative` 时，红色部分明显下移，所以判断绝对定位是相对于 `html` 元素来定位的。
    >
    >   ![](https://i.loli.net/2017/11/26/5a1a80e5576ab.png)
    >
    >   ​
    >
    >   那么，问题来了，设置绝对定位是相对于已设置`position:relative`父元素的边框还是对应的`padding `和 `margin `定位呢？下面我们来验证：
    >
    >   - `top:auto;left:auto;`	
    >     当设置绝对定位为 `auto` 和没有设置属性（即默认情况下）的时候
    >   - `top:0 ;left: 0;`
    >     ![](https://i.loli.net/2017/11/26/5a1a85175a289.png)
    >   - 小问题：当设置子元素为绝对定位时，它就收缩为内容的宽度，因此要给它设置宽度和高度。那么，如果给它的宽度设置为 `width:100%` ，则它的宽度为就是父元素内容的宽度，这个时候就要考虑自己的 `margin` ，`border`和父元素的`padding` ，否则会超出父元素的宽度。
    >
    > - 因为绝对定位与文档流无关，所以绝对定位的元素可以覆盖页面上的其他元素，可以通过`z-idex`属性控制叠放顺序，`z-inde` 越高，元素位置越靠上。
    -  `fixed`: 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过`left,top,right,bottom` 属性进行规定。
    -  `sticky`:CSS3  新属性变现类似于 `position:relative` 和 `position:fixed` 的合体，在目标区域在屏幕中可见。


- 使用场景
  -  相对定位：`relative`  通常和绝对定位结合使用
  -  绝对定位:`absolute` 通常用于设置水平和垂直居中； 
  -  固定定位：`fixed`    适用于固定顶部导航条，广告弹窗等；

## 4. z-index 有什么作用? 如何使用?

- 作用：属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面

- 使用方式：只有在使用了position并脱离了文档流（absolute、fixed）的情况下可以使用，其他情况使用z-index不起作用。

  > `z-index: auto | number |inherit` : 默认 | 使用数字 | 继承父元素 `z-index` 的值。

  ![](https://ooo.0o0.ooo/2017/11/26/5a1a8fa92cd4d.png)

- 参考链接
  [浮动、定位](http://www.bijishequ.com/detail/242718)

## 5. `position:relative`和负`margin`都可以使元素位置发生偏移?二者有什么区别

区别：

- `position: relative`: 只对元素本身有作用，不影响其它的元素的位置
- `负margin`: 会增加元素的外边距，相当于改变了元素的大小，会影响周围元素的位置

## 6. BFC 是什么？如何生成 BFC？BFC 有什么作用？举例说明

- BFC: [Block Formatting Context,](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 块级格式化上下文

  是Web页面的可视化CSS渲染出的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。


- 特性：

  - 会阻止垂直外边距（margin-top，margin-bottom）折叠

  > （1）只有属于同一个BFC时，两个元素才有可能发生垂直 Margin 的重叠，这个包括相邻元素，嵌套元素，只要他们之间没有阻挡（例如边框、非空内容、padding 等）就会发生 Margin 重叠。
  > （2）因此，要解决margin重叠的问题，只要然让他们不在同一个BFC就行了，但是对于两个相邻元素来说，意义不大，没有必要给他们加个外壳，但是对于嵌套元素就很有必要了，只要把父元素设置为BFC就可以了。这样子元素的margin就不会和父元素的margin发生重叠

  - BFC不会重叠浮动元素

  - BFC可以包含浮动

  - 也有不足

    >使用BFC进行浮动的时候会使父容器长度缩短，而且还有个重要缺陷——父容器解决了塌陷问题，那么父容器的父容器怎么办？overflow属性会影响滚动条和绝对定位的元素；position会改变元素的定位方式，这是我们所不希望的，display这几种定位方式依然没有解决低版本IE问题。

- 哪些元素会生成BFC：

  - 根元素
  - float 不为 none
  - position 为 absolute 或 fixed
  - display 为 inline-block,table-cell ,table-caption ,flex ,inline-flex
  - overflow 不为 visible

- 作用：

  - 自适应两栏布局
    代码和效果如下

    ```
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>JS Bin</title>
      <style>
      .child1{
        width:200px;
        height:200px;
        background: red;
        float:left;
    }
      .child2{
        width:210px;
        height:200px;
        background: blue;
        overflow:hidden;
      }

      </style>
    </head>
    <body>
    <div class="father">
      <div class="child1"></div>
      <div class="child2"></div>
    </div>
    </body>
    </html>
    ```

    在没有生成BFC时效果如下，两个块元素会重叠
    ![](https://i.loli.net/2017/11/25/5a19241668fc6.png)

    在添加 `overflow:hidden` 时，形成了BFC，消除了影响，效果如下
    ![](https://i.loli.net/2017/11/25/5a19248515b5e.png)

  - 清除内部浮动,效果上图可见

  - 防止垂直方向上的 margin 重叠。
    ![](https://i.loli.net/2017/11/25/5a192c77bd318.png)

    ![](https://i.loli.net/2017/11/25/5a192c94b7b45.png)

    通过上面2张图可以看出，下面div设置 margin 无效，被重叠

    ![](https://i.loli.net/2017/11/25/5a192ce5e8dd0.png)

    在中间添加个div.wrap 设置其`overflow:hidden` 即使两个div.child 不在同一个BFC中，可阻止垂直边距合并。



参考

[前端精选文摘：BFC 神奇背后的原理（转）](https://www.w3ctech.com/topic/865)

## 7. 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例

- 合并外边距的场景：
  - 相邻的兄弟姐妹元素
  - 块元素与其第一个 / 最后一个元素
  - 空块元素
- 合并方式：垂直方向上两个块元素的中间边距合并。如图：
  ![](https://ooo.0o0.ooo/2017/11/26/5a1a972d5fd00.png)
- 如何阻止相邻元素外边距合并
  - 在其中添加一个空的div，阻止他们在同一个BFC

![](https://i.loli.net/2017/11/25/5a192ce5e8dd0.png)

- 处于静态流的元素会发生合并，所以设置 `float` 和 `position:xxx`都不会发合并。
- 设置为 `inline-block` 也不会发生合并。

参考链接：

[外边距合并-MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

[前端面试必备——外边距合并](https://juejin.im/post/5965c46ef265da6c2518f5ec)