---
title: BootStrap 学习笔记
date: 2018-03-25
tags: 
  - BootStrap
---

# BootStrap 学习笔记

- Normalize.css

  最外层需要包裹一层 container 或者 container-fluid

  - container  用于固定宽度并支持响应式布局的容器。
  - container-fluid  类用于 100% 宽度，占据全部视口（viewport）的容器。

- 栅格系统

  使用 row 和 column 来包裹元素

  细节：使用了 row 以后会有一个负 margin 为15像素，整体页面会更宽

  ```html
  <div class="row" > 
    <div class="col-md-1">.col-md-1</div>
    <div class="col-md-1">.col-md-1</div>
    <div class="col-md-1">.col-md-1</div>
    <div class="col-md-1">.col-md-1</div>
  </div>
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-md-4">.col-md-4</div>
  </div>
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4">.col-md-4</div>
  </div>
  <div class="row">
    <div class="col-md-6">.col-md-6</div>
    <div class="col-md-6">.col-md-6</div>
  </div>
  ```

  ​

  `<div class="col-md-1">.col-md-1</div>` 表示该元素占 row 的 1/12

  `<div class="col-md-8">.col-md-8</div>` 表示该元素占 row 的 8/12

  ` <div class="col-md-6">.col-md-6</div>` 表示该元素占 row 的 6/12

   特殊情况：

  - 溢出怎么办？

    ```html
    <div class="row">
      <div class="col-md-8">.col-md-8</div>
      <div class="col-md-6">.col-md-6</div>
    </div>
    ```

    内部元素的宽度占比为 13/12 超出了 row  的总宽度，后面的元素会转行

  - 列偏移 `col-md-offset`

    ```html
    <div class="row">
      <div class="col-md-8">.col-md-8</div>
      <div class="col-md-2 col-md-offset-2">.col-md-2</div>
    </div>
    ```

    元素的宽度累计占比为 10/12 使用列偏移 `col-md-offset-2` 中间空了2个宽占比 

  ​