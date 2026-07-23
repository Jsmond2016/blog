# Flex 与 Grid：从一维到二维布局的选择

Flex 和 Grid 都能解决布局问题，但它们关注的维度不同。Flex 负责沿一条轴分配空间，Grid 同时组织行与列；理解这个区别，比记住一长串 CSS 属性更重要。

![Flex 与 Grid 对比图：Flex 适合横向导航等一维排列，Grid 适合卡片墙等二维排列。](/illustrations/frontend/flex-grid-layout.svg)

## 先用这个问题做选择

只需要控制「一行」或「一列」内元素的对齐和间距时，优先使用 Flex；需要同时明确列数、行数、区域关系时，优先使用 Grid。

| 场景 | 更合适的方案 | 原因 |
| --- | --- | --- |
| 导航栏、按钮组、头像与文字 | Flex | 主轴上的对齐和剩余空间分配最直接 |
| 卡片列表、后台仪表盘、图片墙 | Grid | 可以同时定义列轨道与行轨道 |
| 页面整体大区域 | Grid | `grid-template-areas` 能表达页面结构 |
| 单个组件内部的局部对齐 | Flex | 代码更少，随内容伸缩自然 |

## Flex：让一行内容保持合理间距

下面的导航中，品牌固定在左侧，操作区被推到右侧。`margin-left: auto` 会占用主轴上的剩余空间。

```html
<nav class="site-nav">
  <a class="brand" href="/">My Site</a>
  <div class="actions">
    <a href="/articles">文章</a>
    <a href="/about">关于</a>
  </div>
</nav>
```

```css
.site-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
}
```

`justify-content` 负责主轴方向的分配，`align-items` 负责交叉轴方向的对齐。默认主轴是水平方向；设置 `flex-direction: column` 后，两个方向的含义会交换。

## Grid：让卡片随容器自动换列

卡片数量和屏幕宽度都不固定时，下面的写法比手动写多个断点更稳妥：

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
```

`minmax(220px, 1fr)` 表示每列最少 220 像素，有剩余空间时平分；`auto-fit` 会让浏览器根据容器实际宽度决定放几列。容器变窄时，卡片自然换到下一行。

## 不要把它们当成二选一

页面常常用 Grid 划分大区域，用 Flex 完成区域内部对齐。例如卡片墙使用 Grid，而每张卡片里的「标题 + 操作按钮」使用 Flex。这种组合比强迫一个布局模型解决所有问题更清晰。

## 常见误区

**Grid 只能做复杂页面。** 两列信息、标签列表和基础卡片墙都很适合 Grid。

**`flex: 1` 总能均分宽度。** 它会受内容最小尺寸影响。遇到长单词或长链接时，可按需给子项设置 `min-width: 0`，让内容允许收缩或换行。

**响应式只靠媒体查询。** 很多列表布局只需 `minmax()` 和 `auto-fit` 就能随容器变化；媒体查询更适合布局规则本身需要改变的场景。

## 小结

先判断要解决的是一维还是二维排列：一维用 Flex，二维用 Grid。两者可以嵌套使用；把整体结构和局部对齐分开处理，CSS 会更容易维护。

延伸阅读：[响应式/移动端页面](./CSS-Responsive-Page)。
