const notesSidebar = [
  {
    text: "技术文章",
    items: [{ text: "文章总览", link: "/notes/index" }],
  },
  {
    text: "框架与工程",
    items: [
      { text: "浅谈前端路由", link: "/notes/A-Brief-Discussion-Front-End-Router" },
      { text: "Vue 的父子通信问题", link: "/notes/Vue.js-Parent-Child-Communication-Issues" },
      { text: "Vue 3 响应式系统", link: "/notes/vue/Vue3-Reactivity-Guide" },
      { text: "React 状态与副作用", link: "/notes/react/React-State-and-Effects" },
    ],
  },
  {
    text: "浏览器与网络",
    items: [
      { text: "浏览器从 HTML 到像素", link: "/notes/browser/Browser-Rendering-Pipeline" },
      { text: "Fetch 请求的完整生命周期", link: "/notes/browser/Fetch-Request-Lifecycle" },
      { text: "浏览器存储怎么选", link: "/notes/browser/Browser-Storage-Guide" },
      { text: "内存泄漏排查入门", link: "/notes/browser/Memory-Leak-Diagnosis" },
      { text: "Cookie 小知识", link: "/notes/chrome/Cookie" },
      { text: "Cookie、Session 与 Cache-Control", link: "/notes/chrome/Cookie-Session-Cache-Control" },
      { text: "HTTP 小记", link: "/notes/http/HTTP-Basic" },
      { text: "HTTP 缓存", link: "/notes/http/HTTP-Cache" },
      { text: "HTTP 常见状态码", link: "/notes/http/HTTP-Status-Code" },
    ],
  },
  {
    text: "CSS",
    items: [
      { text: "CSS 选择器", link: "/notes/css/CSS-Selectors" },
      { text: "CSS 常用样式 1", link: "/notes/css/Common-CSS-Styles-Summary-1" },
      { text: "CSS 常用样式 2", link: "/notes/css/Common-CSS-Styles-Summary-2" },
      { text: "浮动、定位、BFC 与边距合并", link: "/notes/css/Common-CSS-Styles-Summary-3" },
      { text: "响应式与移动端页面", link: "/notes/css/CSS-Responsive-Page" },
      { text: "动态 REM", link: "/notes/css/CSS-REM" },
      { text: "CSS 宽度与高度", link: "/notes/css/CSS-Width-Height" },
      { text: "Flex 与 Grid 布局选择", link: "/notes/css/Flex-and-Grid-Layout" },
      { text: "CSS 学习资源推荐", link: "/notes/css/CSS-Learning-Resources-Recommendation" },
    ],
  },
  {
    text: "JavaScript",
    items: [
      { text: "全局变量污染和立即执行函数", link: "/notes/javascript/Global-Variable-Pollution-and-Immediately-Invoked-Function-Expression" },
      { text: "DOM 事件", link: "/notes/javascript/DOM-Event-Model" },
      { text: "原型与原型链", link: "/notes/javascript/Javascript-Prototype-Chain" },
      { text: "JSONP", link: "/notes/javascript/JSONP" },
      { text: "异步执行与事件循环", link: "/notes/javascript/JavaScript-Event-Loop" },
      { text: "异步并发控制", link: "/notes/javascript/JavaScript-Concurrency-Control" },
    ],
  },
  {
    text: "TypeScript",
    items: [
      { text: "TypeScript Enum 问题", link: "/notes/typescript/ts-enum-01" },
      { text: "TypeScript 在前端项目中的实用边界", link: "/notes/typescript/TypeScript-Practical-Modeling" },
    ],
  },
  {
    text: "开发工具与基础",
    items: [
      { text: "编程基础", link: "/notes/common/Program-Basics" },
      { text: "Linux 常用命令行", link: "/notes/common/Common-Linux-Commands-Summary" },
      { text: "Git 常用操作", link: "/notes/common/Git-Common-Operations" },
      { text: "Vim 常用操作", link: "/notes/common/Vim-Common-Operations" },
      { text: "VS Code Vim 配置", link: "/notes/common/Vscode-Vim-Config" },
    ],
  },
  {
    text: "Node.js",
    items: [
      { text: "Node.js 读取文件夹目录", link: "/notes/nodejs/nodejs-fs-readdir" },
      {
        text: "Express.js 系列",
        items: [
          { text: "1. 初识 Express", link: "/notes/nodejs/express/express-01" },
          { text: "2. 后端路由", link: "/notes/nodejs/express/express-02" },
          { text: "3. 配置静态资源", link: "/notes/nodejs/express/express-03" },
          { text: "4. 解析请求体", link: "/notes/nodejs/express/express-04" },
          { text: "5. 文件上传：前端操作", link: "/notes/nodejs/express/express-05" },
          { text: "6. 单名字单文件上传", link: "/notes/nodejs/express/express-06" },
          { text: "7. 单名字多文件上传", link: "/notes/nodejs/express/express-07" },
          { text: "8. 多名字多文件上传", link: "/notes/nodejs/express/express-08" },
          { text: "9. Cookie 操作和设置", link: "/notes/nodejs/express/express-09" },
          { text: "10. Session 的设置和操作", link: "/notes/nodejs/express/express-10" },
          { text: "12. 服务端渲染", link: "/notes/nodejs/express/express-12" },
          { text: "13. 中间件", link: "/notes/nodejs/express/express-13" },
          { text: "14. MVC 开发模式", link: "/notes/nodejs/express/express-14" },
          { text: "15. Token", link: "/notes/nodejs/express/express-15" },
          { text: "16. JWT", link: "/notes/nodejs/express/16-了解jwt" },
        ],
      },
      { text: "Koa 学习笔记", link: "/notes/nodejs/koa/koa-study" },
    ],
  },
];

export const notesSideBar = {
  "/notes/": notesSidebar,
};
