---
title: CSS深入浅出——动态REM
date: 2018-01-17
tags: "CSS"
---

# CSS深入浅出——动态REM

强记知识 ：浏览器默认字体大小为 16px

> 但是chrome可以设置网页的最小字体大小为其他值，所以此时设置CSS的字体大小会不起作用，在safari浏览器和firefox浏览器中则不存在这个问题，如果没有单独设置字体大小就是原来的默认值大小。

## 1.什么是REM

## 2.REM、px、em的区别

### 2.1 REM和EM

- REM：根元素的`font-size`大小，即html的`font-size`大小
- EM ：当前汉字的大小



## 2.动态REM

在进行响应式布局的时候，因为不同移动设备的像素宽度是不同的，所以对应的页面大小也有所差异，因此需要对每个不同像素宽度的设备分别写一套css吗？

举例：

> iphone6  375*667
>
> iphone+ 414*736
>
> iphone5 320*568
>
> Nexus 412*732

以上是不同像素的移动设备，对设备按尺寸分类，对应的css如下

> 对应的响应式 css
>
> 0-320px 一套css
>
> 320-375px  另一套css
>
> 375-414px  第三套css

实现思路：

- 百分比布局
- 整体缩放

具体实现：

- 探索误区
- 如何获得屏幕宽度并且写入css 中设置rem？

> 1rem ===html font-size ===1 page width



参考资料：[REM--MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)