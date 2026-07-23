# 浏览器从 HTML 到像素：渲染流水线与性能切入点

页面变慢时，先不要急着加缓存或节流。浏览器究竟在哪一步花了时间，决定了优化是否有效。这篇文章用一条渲染流水线把 HTML、CSS 和最终画面串起来。

![浏览器渲染流程：HTML 和 CSS 构建结构与样式，随后经历渲染树、布局、绘制、合成。](/illustrations/frontend/browser-rendering-pipeline.svg)

## 一次渲染发生了什么

浏览器解析 HTML 得到 DOM，解析 CSS 得到 CSSOM。两者合并为渲染树，树中只保留需要展示的节点，例如 `display: none` 的节点不在其中。

随后经历三个阶段：

1. **布局（Layout）**：计算每个盒子的尺寸和位置。
2. **绘制（Paint）**：把文字、边框、阴影等转换为绘制指令。
3. **合成（Composite）**：把图层组合到屏幕上。

可以把它理解为：先决定有哪些东西，再决定它们摆在哪里，最后决定怎样画出来。

## 为什么有些 CSS 动画更流畅

改变 `width` 或 `top` 往往会影响元素几何信息，需要重新布局；改变背景色可能需要重绘；而 `transform` 和 `opacity` 在适当条件下可以只进入合成阶段，避开布局与大面积绘制。

```css
/* 位置变化通常需要重新布局 */
.panel { left: 24px; }

/* 更适合做位移动画 */
.panel { transform: translateX(24px); }
```

关键不是机械地使用某个属性，而是先确认视觉效果，再选择对渲染流水线影响更小的属性。

## 避免交错读写 DOM

循环中反复「写样式再读尺寸」时，浏览器可能为了返回正确尺寸而提前布局，数据量大时容易卡顿：

```js
for (const card of cards) {
  card.style.width = `${card.offsetWidth + 10}px`;
}
```

先读取和计算，再统一写入更容易被浏览器高效处理：

```js
const widths = [...cards].map((card) => card.offsetWidth + 10);
cards.forEach((card, index) => {
  card.style.width = `${widths[index]}px`;
});
```

## 性能排查从哪里开始

在 Chrome DevTools 的 **Performance** 面板录制一次可复现操作，重点看：长 JavaScript 任务是否阻塞主线程、Layout 和 Paint 是否反复出现、滚动或动画是否持续大面积绘制。先测量，再优化；页面结构、图层和设备性能都会影响实际结果。

## 常见误区

**`will-change` 会自动加速动画。** 它可能创建额外图层并增加内存，只应在范围很小、确实需要的元素上使用。

**一次状态更新只会渲染一次。** 框架会批处理，但强制读取布局和同步 DOM 操作仍可能产生额外工作。

## 小结

渲染性能的核心是减少不必要的工作：少做布局、少画无关区域、不要在热点路径里交错读取和写入 DOM。理解流水线后，再用 Performance 面板定位具体阶段，优化才有明确方向。

后续将补充一篇「前端性能排查实战」，用 Performance 面板定位长任务和重渲染。
