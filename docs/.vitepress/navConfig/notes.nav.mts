export const notesSideBar = {
  "/notes/": [
    {
      text: "技术文章",
      items: [{ text: "文章总览", link: "/notes/index" }],
    },
    {
      text: "框架与工程",
      items: [
        {
          text: "浅谈前端路由",
          link: "/notes/A-Brief-Discussion-Front-End-Router",
        },
        {
          text: "Vue 的父子通信问题",
          link: "/notes/Vue.js-Parent-Child-Communication-Issues",
        },
      ],
    },
    {
      text: "浏览器原理",
      items: [
        {
          text: "浏览器从 HTML 到像素",
          link: "/notes/browser/Browser-Rendering-Pipeline",
        },
        {
          text: "Fetch 请求的完整生命周期",
          link: "/notes/browser/Fetch-Request-Lifecycle",
        },
        {
          text: "浏览器存储怎么选",
          link: "/notes/browser/Browser-Storage-Guide",
        },
        {
          text: "内存泄漏排查入门",
          link: "/notes/browser/Memory-Leak-Diagnosis",
        },
      ],
    },
    {
      text: "CSS 实践",
      items: [
        {
          text: "Flex 与 Grid 布局选择",
          link: "/notes/css/Flex-and-Grid-Layout",
        },
      ],
    },
    {
      text: "JavaScript",
      items: [
        {
          text: "JavaScript 异步执行与事件循环",
          link: "/notes/javascript/JavaScript-Event-Loop",
        },
        {
          text: "JavaScript 异步并发控制",
          link: "/notes/javascript/JavaScript-Concurrency-Control",
        },
      ],
    },
    {
      text: "Vue",
      items: [
        {
          text: "Vue 3 响应式系统",
          link: "/notes/vue/Vue3-Reactivity-Guide",
        },
      ],
    },
    {
      text: "React",
      items: [
        {
          text: "React 状态与副作用",
          link: "/notes/react/React-State-and-Effects",
        },
      ],
    },
    {
      text: "TypeScript",
      items: [
        {
          text: "TypeScript 在前端项目中的实用边界",
          link: "/notes/typescript/TypeScript-Practical-Modeling",
        },
      ],
    },
  ],
  "/notes/common": [
    {
      text: "Linux",
      items: [
        {
          text: "编程基础",
          link: "/notes/common/Program-Basics",
        },

        {
          text: "Linux 常用命令行",
          link: "/notes/common/Common-Linux-Commands-Summary",
        },
        {
          text: "Vim 常用操作",
          link: "/notes/common/Vim-Common-Operations",
        },
        {
          text: "我的 vimrc 配置",
          link: "/notes/common/Vimrc-Config",
        },
        {
          text: "vscode-vim 配置",
          link: "/notes/common/Vscode-Vim-Config",
        },
      ],
    },
    {
      text: "Git",
      items: [
        {
          text: "Git的常用操作",
          link: "/notes/common/Git-Common-Operations",
        },
      ],
    },
  ],
  "/notes/css": [
    {
      text: "CSS",
      items: [
        {
          text: "CSS选择器",
          link: "/notes/css/CSS-Selectors",
        },
        {
          text: "CSS 常用样式-1",
          link: "/notes/css/Common-CSS-Styles-Summary-1",
        },
        {
          text: "CSS 常用样式-2",
          link: "/notes/css/Common-CSS-Styles-Summary-2",
        },
        {
          text: "CSS 常用样式-3浮动定位BFC边距合并",
          link: "/notes/css/Common-CSS-Styles-Summary-3",
        },
        {
          text: "响应式/移动端页面",
          link: "/notes/css/CSS-Responsive-Page",
        },
        {
          text: "CSS深入浅出——动态REM",
          link: "/notes/css/CSS-REM",
        },
        {
          text: "CSS-宽度与高度",
          link: "/notes/css/CSS-Width-Height",
        },
        {
          text: "CSS学习资源推荐",
          link: "/notes/css/CSS-Learning-Resources-Recommendation",
        },
        {
          text: "Flex 与 Grid 布局选择",
          link: "/notes/css/Flex-and-Grid-Layout",
        },
      ],
    },
  ],
  "/notes/javascript": [
    {
      text: "JavaScript",
      items: [
        {
          text: "全局变量污染和立即执行函数",
          link: "/notes/javascript/Global-Variable-Pollution-and-Immediately-Invoked-Function-Expression",
        },
        {
          text: "Dom 事件",
          link: "/notes/javascript/DOM-Event-Model",
        },
        {
          text: "js面向对象--原型(Prototype)和原型链",
          link: "/notes/javascript/Javascript-Prototype-Chain",
        },
        {
          text: "JSONP",
          link: "/notes/javascript/JSONP",
        },
        {
          text: "JavaScript 异步执行与事件循环",
          link: "/notes/javascript/JavaScript-Event-Loop",
        },
        {
          text: "JavaScript 异步并发控制",
          link: "/notes/javascript/JavaScript-Concurrency-Control",
        },
      ],
    },
  ],
  "/notes/chrome/": [
    {
      text: "Chrome",
      items: [
        {
          text: "Cookie 小知识",
          link: "/notes/chrome/Cookie",
        },
        {
          text: "Cookie-Session-Cache-Control",
          link: "/notes/chrome/Cookie-Session-Cache-Control",
        },
      ],
    },
  ],
  "/notes/nodejs": [
    {
      text: "Nodejs 系列",
      items: [
        {
          text: "Node.js",
          items: [
            {
              text: "nodejs如何读取文件夹目录的内容",
              link: "/notes/nodejs/nodejs-fs-readdir",
            },
          ],
        },

        {
          text: "Express.js",
          items: [
            {
              text: "1-初始express",
              link: "/notes/nodejs/express/express-01",
            },
            {
              text: "2-了解后端路由",
              link: "/notes/nodejs/express/express-02",
            },
            {
              text: "3-配置静态资源",
              link: "/notes/nodejs/express/express-03",
            },
            // 4-解析请求体
            {
              text: "4-解析请求体",
              link: "/notes/nodejs/express/express-04",
            },
            // 5-文件上传-前端操作
            {
              text: "5-文件上传-前端操作",
              link: "/notes/nodejs/express/express-05",
            },
            // 6-文件上传-单名字单文件上传
            {
              text: "6-文件上传-单名字单文件上传",
              link: "/notes/nodejs/express/express-06",
            },
            // 7-文件上传-单名字多文件上传
            {
              text: "7-文件上传-单名字多文件上传",
              link: "/notes/nodejs/express/express-07",
            },
            // 8-文件上传-多名字多文件上传
            {
              text: "8-文件上传-多名字多文件上传",
              link: "/notes/nodejs/express/express-08",
            },
            // 9-cookie操作和设置
            {
              text: "9-cookie操作和设置",
              link: "/notes/nodejs/express/express-09",
            },
            // 10-session的设置和操作
            {
              text: "10-session的设置和操作",
              link: "/notes/nodejs/express/express-10",
            },
            // 12-art-template服务端渲染
            {
              text: "12-art-template服务端渲染",
              link: "/notes/nodejs/express/express-12",
            },
            // 13-中间件
            {
              text: "13-中间件",
              link: "/notes/nodejs/express/express-13",
            },
            // 14-了解MVC开发模式
            {
              text: "14-了解MVC开发模式",
              link: "/notes/nodejs/express/express-14",
            },
            // 15-了解token
            {
              text: "15-了解token",
              link: "/notes/nodejs/express/express-15",
            },
          ],
        },
        {
          text: "Koa.js",
          items: [
            {
              text: "koa-study",
              link: "/notes/nodejs/koa/koa-study",
            },
          ],
        },
      ],
    },
  ],
  "/notes/http": [
    {
      text: "HTTP",
      items: [
        {
          text: "HTTP小记",
          link: "/notes/http/HTTP-Basic",
        },
        {
          text: "HTTP-Cache",
          link: "/notes/http/HTTP-Cache",
        },
        {
          text: "HTTP常见状态码",
          link: "/notes/http/HTTP-Status-Code",
        },
      ],
    },
  ],
  "/notes/typescript": [
    {
      text: "Typescript",
      items: [
        {
          text: "Typescript Enum 问题",
          link: "/notes/typescript/ts-enum-01",
        },
        {
          text: "TypeScript 在前端项目中的实用边界",
          link: "/notes/typescript/TypeScript-Practical-Modeling",
        },
      ],
    },
  ],
};
