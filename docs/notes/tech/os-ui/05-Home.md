# Home 页装修

## 选择需要 copy 的好看背景图

- [dribbble.com](https://dribbble.com)
- 参考 vuejs 和 React 官网
- 参考 element-ui 等 ui 页面的官网

## CSS 相关

- 如何画一个渐变色背景？参考这个网站 [https://cssgradient.io/](https://cssgradient.io/)


- 使用 border-radius 和 clip-path 做圆角

```css
border-bottom-left-radius: 50% 40px
border-bottom-rihgt-radius: 50% 100px
```

方法2： 

 [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)


 - 使用 grid 布局

 [CSS Grid 网格布局教程-阮一峰](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
 [CSS Grid-MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)


 - 响应式页面

 使用 [@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 做手机端


 ## 文档页

 使用 markdown 样式：

 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

 开发 Vite 插件，支持 markdown 文件解析

- [vite 官网](https://github.com/vitejs/vite)

- [vite config 配置](https://github.com/vitejs/vite#config-file)

- [vite config 源代码](https://github.com/vitejs/vite/blob/master/src/node/config.ts)

- [vue3 vite plugin](https://medium.com/better-programming/designing-vue3-plugins-using-provide-and-inject-47b586d9ce4)

- 使用 [marked-github](https://github.com/markedjs/marked)


代码多次优化，使用 【事不过三】原则

遇到问题，路由不显示？ router 需要设置 key


当前代码缺点：使用异步加载的方式加载组件，可能需要等待时间。
解决办法：使用 SSR，但是当前 Vite 没有相关 SSR 方案，因此无解，如果要支持，需要自己搭建一套SSR


抽离 Switch1Demo，书写 展示页样式


## 展示源代码

使用 [Vue-loader的Custom Blocks](https://github.com/vitejs/vite#custom-blocks) 功能


## 高亮源代码

[https://prismjs.com](https://prismjs.com/)

安装： `yarn add prismjs`


## 封装 Demo 组件

将 样式，高亮代码等逻辑，封装在 Demo 组件中



