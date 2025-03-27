---
title: getBoundingClientRect的用法
date: 2018-04-15
tags: 
  - getBoundingClientRect
---

# getBoundingClientRect的用法

## 用途

`Element.getClientRects()` 方法返回一个指向客户端中每一个盒子的边界矩形的矩形集合。 用来获得元素相对视口的位置

## 基本语法

```
rectObject = object.getBoundingClientRect();
```

## 常用属性

- 如图

  ![](https://i.loli.net/2018/04/15/5ad2c0a296dbf.jpg)

`rectObject.top`：元素上边到视窗上边的距离;

`rectObject.right`：元素右边到视窗左边的距离;

`rectObject.bottom`：元素下边到视窗上边的距离;

`rectObject.left`：元素左边到视窗左边的距离;

- 注意细节

  当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作
  即：当滚动位置发生了改变，top和left属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。

  如果你需要获得相对于整个网页左上角定位的属性值，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的值。

  > 为了跨浏览器兼容，请使用 window.pageXOffset 和 window.pageYOffset 代替 window.scrollX 和 window.scrollY。

## 注意问题

不同平台和浏览器版本兼容性不同，详情见 [博客](https://www.cnblogs.com/Songyc/p/4458570.html)

参考资料:

- [Element.getBoundingClientRect()-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [getBoundingClientRect的用法](https://www.cnblogs.com/Songyc/p/4458570.html)
- [JavaScript中getBoundingClientRect()方法详解](https://www.cnblogs.com/leejersey/p/4127714.html)