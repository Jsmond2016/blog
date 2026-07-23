# Flex 与 Grid：常用布局、等效写法与选择

Flex 和 Grid 都能处理布局，但解决问题的出发点不同：Flex 先沿一条主轴排列项目，再处理换行；Grid 先建立行和列组成的二维网格，再把项目放进网格。它们不是互斥关系，实际页面常常用 Grid 划分结构、用 Flex 排齐组件内部内容。

![Flex 与 Grid 对比图：Flex 适合横向导航等一维排列，Grid 适合卡片墙等二维排列。](/illustrations/frontend/flex-grid-layout.svg)

## 先判断布局问题

| 要解决的问题 | 优先选择 | 典型属性 |
| --- | --- | --- |
| 一行或一列内的顺序、对齐、剩余空间 | Flex | `justify-content`、`align-items`、`flex` |
| 同时控制列数、行数、跨行跨列 | Grid | `grid-template-columns`、`grid-column`、`grid-row` |
| 未知数量的卡片自动换行 | 两者都可 | Flex 用 `flex-wrap`；Grid 用 `auto-fit` / `minmax()` |
| 页面头部、侧栏、内容区的整体关系 | Grid | `grid-template-areas` |
| 图标、标题、按钮等一组局部元素 | Flex | `gap`、`margin-left: auto` |

## Flex 的工作方式

对父元素设置 `display: flex` 后，直接子元素成为 flex 项目。默认值为 `flex-direction: row`：主轴从左到右，交叉轴从上到下。设为 `column` 后，主轴和交叉轴的含义随之交换。

```css
.container {
  display: flex;
  flex-direction: row;      /* row | row-reverse | column | column-reverse */
  flex-wrap: nowrap;        /* nowrap | wrap */
  justify-content: flex-start; /* 主轴：起点、居中、两端、均分 */
  align-items: stretch;     /* 交叉轴：拉伸、起点、居中、终点 */
  gap: 16px;
}
```

单个项目还可使用以下属性：

```css
.item {
  flex: 1 1 0;       /* grow shrink basis，常用于等宽可伸缩项 */
  align-self: center; /* 只覆盖当前项目的交叉轴对齐 */
  order: 1;           /* 视觉顺序；不要用它改变语义阅读顺序 */
}
```

`flex: 1` 是 `flex: 1 1 0%` 的简写。它让项目从相同的基础宽度开始分配剩余空间；若项目内有不可断开的长文本，配合 `min-width: 0` 才能允许它收缩。

## 例 1：导航栏两端对齐

品牌在左、操作链接在右，是 Flex 最直接的场景。`margin-left: auto` 会吃掉主轴上剩余的空间，因此右侧操作区被推到末端。

```html
<nav class="site-nav">
  <a class="brand" href="/">My Site</a>
  <div class="nav-actions">
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
  min-height: 56px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}
```

同样效果用 Grid 也很简洁，第一列占满剩余空间，第二列按内容宽度排列：

```css
.site-nav {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 16px;
  min-height: 56px;
}

.nav-actions {
  display: flex;
  gap: 12px;
}
```

这里选 Flex 更贴切，因为关心的是一条水平轴上的对齐；Grid 版本在后续要加入固定宽度搜索框等明确列关系时更方便。

## 例 2：水平和垂直居中

弹窗、空状态和加载区域常需要把一个元素放在容器正中。Flex 使用两个轴的对齐属性：

```html
<section class="empty-state">
  <div class="empty-content">暂无内容</div>
</section>
```

```css
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
  border: 1px dashed #94a3b8;
}
```

Grid 的等效写法是 `place-items`，它是 `align-items` 和 `justify-items` 的简写：

```css
.empty-state {
  display: grid;
  place-items: center;
  min-height: 240px;
  border: 1px dashed #94a3b8;
}
```

单个项目需要偏离默认对齐时，Flex 用 `align-self`；Grid 可用 `place-self`：

```css
.flex-item { align-self: flex-end; }
.grid-item { place-self: end center; }
```

## 例 3：会自动换行的标签或按钮组

项目宽度取决于内容、只要自然换行时，Flex 的 `wrap` 很合适。`gap` 负责行与列之间的间距，不必再给每个项目写外边距。

```html
<div class="tag-list">
  <a class="tag">CSS</a>
  <a class="tag">JavaScript</a>
  <a class="tag">可访问性</a>
  <a class="tag">性能优化</a>
  <a class="tag">工程化</a>
</div>
```

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}
```

Grid 也能实现，不过需要给每个网格项目设定一个最小宽度，适合标签希望有规律地占满每一行的情况：

```css
.tag-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
  gap: 8px;
}
```

两者的视觉结果不同：Flex 中每个标签保持内容宽度；Grid 中每个标签会扩展到所在列的宽度。不要为了使用 Grid 而让一组本应紧凑的标签变成等宽按钮。

## 例 4：等宽列和响应式卡片列表

三个统计块等宽时，Flex 的关键是给所有项目相同的增长、收缩和基础尺寸：

```html
<div class="stats">
  <article class="stat">文章<br><strong>32</strong></article>
  <article class="stat">评论<br><strong>128</strong></article>
  <article class="stat">收藏<br><strong>56</strong></article>
</div>
```

```css
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stat {
  flex: 1 1 180px;
  min-width: 0;
  padding: 16px;
  border: 1px solid #cbd5e1;
}
```

容器足够宽时它们三等分；每项低于约 180px 时会换行。Grid 对这种明确的列布局更稳定，也更容易读出意图：

```css
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat {
  min-width: 0;
  padding: 16px;
  border: 1px solid #cbd5e1;
}
```

`auto-fit` 会折叠空轨道并拉伸已有项目；如果希望保留空轨道，使用 `auto-fill`。卡片列表通常选择 `auto-fit`，让最后一行的卡片能填满可用空间。

## 例 5：左侧固定、右侧自适应的媒体对象

头像、商品缩略图和评论项都常见「左侧固定，右侧随剩余空间变化」的结构。Flex 写法如下：

```html
<article class="comment">
  <img class="avatar" src="/avatar.png" alt="用户头像">
  <div class="comment-body">
    <h3>王小明</h3>
    <p>很长的内容也应当能够换行，而不把头像挤出容器。</p>
  </div>
</article>
```

```css
.comment {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.avatar {
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.comment-body {
  min-width: 0;
}
```

Grid 的等效版本更明确地声明了两列：

```css
.comment {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
```

`minmax(0, 1fr)` 和 Flex 中的 `min-width: 0` 都是在处理同一个坑：网格或 flex 项目的默认最小尺寸可能被长文本撑开。内容区域含长链接、代码或 `white-space: nowrap` 文本时尤其要注意。

## 例 6：底部固定在页面末端

当页面内容较少时，页脚仍应贴近视口底部；内容变多时又要自然向下滚动。Flex 的纵向布局非常适合这个需求：

```html
<div class="page">
  <header>Header</header>
  <main>页面内容</main>
  <footer>Footer</footer>
</div>
```

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page main {
  flex: 1;
}
```

Grid 的等效写法把行轨道直接表达出来：

```css
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

两个方案都正确。已经用 Grid 管理页面外层区域时，后者避免混用模型；单纯的纵向堆叠，Flex 更轻量。

## Grid 特别擅长的三个场景

### 1. 命名区域表达页面骨架

Grid 可以让 CSS 的视觉结构接近页面草图，适用于头部、侧栏、主内容和页脚同时存在的布局。

```html
<div class="app-layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main</main>
  <footer class="footer">Footer</footer>
</div>
```

```css
.app-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; min-width: 0; }
.footer { grid-area: footer; }

@media (max-width: 720px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}
```

这类结构用 Flex 也能实现，但通常需要额外的内层容器来包住侧栏和主内容。Grid 能在一个容器内声明二维关系，也能在媒体查询中只改区域顺序。

### 2. 跨列、跨行的编辑布局

某些项目需要占据多个轨道，例如仪表盘中的大图表。Grid 项目可以精确指定起止线：

```html
<section class="dashboard">
  <article class="revenue">营收趋势</article>
  <article class="orders">订单</article>
  <article class="users">用户</article>
  <article class="activity">最近活动</article>
</section>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
}

.revenue { grid-column: span 3; grid-row: span 2; }
.orders { grid-column: span 1; }
.users { grid-column: span 1; }
.activity { grid-column: span 3; }

@media (max-width: 720px) {
  .dashboard { grid-template-columns: 1fr; }
  .revenue, .orders, .users, .activity { grid-column: auto; grid-row: auto; }
}
```

Flex 的换行布局无法直接表达「这张卡占三列、那张卡占两行」。可以用百分比宽度模拟部分效果，但行高和空位的关系很快难以维护。

### 3. 内容不规则的图片墙

`grid-auto-flow: dense` 能尝试填补较早出现的空格，适合不强调阅读顺序的照片或素材墙：

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-auto-flow: dense;
  grid-auto-rows: 120px;
  gap: 12px;
}

.gallery .wide { grid-column: span 2; }
.gallery .tall { grid-row: span 2; }
```

`dense` 可能把后面的项目提前放进空位，视觉顺序会与 DOM、键盘焦点顺序不同。因此不要把它用于按时间阅读的文章流、表单和数据列表。

## 常见误区与排查

**`justify-content` 没有生效。** 它分配的是主轴上的剩余空间。容器没有剩余空间、项目本身已占满，或误把交叉轴当作主轴时，视觉上都不会有变化。先检查 `flex-direction` 和容器尺寸。

**给每个项目写 `margin` 做间距。** 优先用父容器的 `gap`。它不会让第一项、最后一项产生多余外边距，也能同时控制 Grid 的行列间距。

**Flex 项目被长文本撑破。** 给需要收缩的内容区加 `min-width: 0`，再按需要配合 `overflow-wrap: anywhere` 或省略号样式。

```css
.title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**把 `order` 当作响应式重排的常规方案。** `order` 只改视觉位置，DOM 顺序、屏幕阅读器阅读顺序和键盘焦点顺序通常不变。若内容语义顺序也要变化，优先调整 HTML 结构；Grid 的 `template-areas` 也应谨慎使用。

**认为 Grid 只能做复杂页面。** 两列信息、等宽按钮组和响应式卡片都可用 Grid；关键不是复杂度，而是是否需要同时表达行与列。

## 小结

一维的排列、推挤、居中和内容宽度优先用 Flex；需要稳定列轨道、跨行跨列或命名区域时优先用 Grid。对于卡片列表，两者都可行：希望项目按内容自然排列时用 Flex，希望列整齐且自适应时用 Grid。页面外层用 Grid、组件内部用 Flex，通常是最清晰也最容易维护的组合。

延伸阅读：[响应式/移动端页面](./CSS-Responsive-Page)。
