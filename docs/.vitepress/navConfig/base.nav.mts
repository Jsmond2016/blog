export const baseNav = { text: "前端基础", link: "/notes/base/index" } as const;

export const baseNavSideBar = {
  "/notes/base/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "Linux",
      items: [
        {
          text: "编程基础",
          link: "/notes/base/Program-Basics",
        },

        {
          text: "Linux 常用命令行",
          link: "/notes/base/Common-Linux-Commands-Summary",
        },
        {
          text: "Vim 常用操作",
          link: "/notes/base/Vim-Common-Operations",
        },
      ],
    },
    {
      text: "Git",
      items: [
        {
          text: "Git的常用操作",
          link: "/notes/base/Git-Common-Operations",
        },
      ],
    },
    {
      text: "CSS",
      items: [
        {
          text: "CSS选择器",
          link: "/notes/base/CSS-Selectors",
        },
        {
          text: "CSS 常用样式-1",
          link: "/notes/base/Common-CSS-Styles-Summary-1",
        },
        {
          text: "CSS 常用样式-2",
          link: "/notes/base/Common-CSS-Styles-Summary-2",
        },
        {
          text: "CSS 常用样式-3浮动定位BFC边距合并",
          link: "/notes/base/Common-CSS-Styles-Summary-3",
        },
        {
          text: "响应式/移动端页面",
          link: "/notes/base/CSS-Responsive-Page",
        },
        {
          text: "CSS深入浅出——动态REM",
          link: "/notes/base/CSS-REM",
        },
        {
          text: "CSS-宽度与高度",
          link: "/notes/base/CSS-Width-Height",
        },
        {
          text: "CSS学习资源推荐",
          link: "/notes/base/CSS-Learning-Resources-Recommendation",
        },
      ],
    },
    {
      text: "JavaScript",
      items: [
        {
          text: "全局变量污染和立即执行函数",
          link: "/notes/base/Global-Variable-Pollution-and-Immediately-Invoked-Function-Expression",
        },
        {
          text: "Dom 事件",
          link: "/notes/base/DOM-Event-Model",
        },
        {
          text: "js面向对象--原型(Prototype)和原型链",
          link: "/notes/base/Javascript-Prototype-Chain",
        },
        {
          text: "JSONP",
          link: "/notes/base/JSONP",
        },
      ],
    },
    {
      text: "Chrome",
      items: [
        {
          text: "Cookie 小知识",
          link: "/notes/base/Cookie",
        },
        {
          text: "Cookie-Session-Cache-Control",
          link: "/notes/base/Cookie-Session-Cache-Control",
        },
      ],
    },
    {
      text: "Nodejs 系列",
      items: [
        {
          text: "Node.js",
          items: [
            {
              text: "nodejs如何读取文件夹目录的内容",
              link: "/notes/base/nodejs/nodejs-fs-readdir",
            },
          ],
        },

        {
          text: "Express.js",
          items: [
            {
              text: "1-初始express",
              link: "/notes/base/express/express-01",
            },
            {
              text: "2-了解后端路由",
              link: "/notes/base/express/express-02",
            },
            {
              text: "3-配置静态资源",
              link: "/notes/base/express/express-03",
            },
            // 4-解析请求体
            {
              text: "4-解析请求体",
              link: "/notes/base/express/express-04",
            },
            // 5-文件上传-前端操作
            {
              text: "5-文件上传-前端操作",
              link: "/notes/base/express/express-05",
            },
            // 6-文件上传-单名字单文件上传
            {
              text: "6-文件上传-单名字单文件上传",
              link: "/notes/base/express/express-06",
            },
            // 7-文件上传-单名字多文件上传
            {
              text: "7-文件上传-单名字多文件上传",
              link: "/notes/base/express/express-07",
            },
            // 8-文件上传-多名字多文件上传
            {
              text: "8-文件上传-多名字多文件上传",
              link: "/notes/base/express/express-08",
            },
            // 9-cookie操作和设置
            {
              text: "9-cookie操作和设置",
              link: "/notes/base/express/express-09",
            },
            // 10-session的设置和操作
            {
              text: "10-session的设置和操作",
              link: "/notes/base/express/express-10",
            },
            // 12-art-template服务端渲染
            {
              text: "12-art-template服务端渲染",
              link: "/notes/base/express/express-12",
            },
            // 13-中间件
            {
              text: "13-中间件",
              link: "/notes/base/express/express-13",
            },
            // 14-了解MVC开发模式
            {
              text: "14-了解MVC开发模式",
              link: "/notes/base/express/express-14",
            },
            // 15-了解token
            {
              text: "15-了解token",
              link: "/notes/base/express/express-15",
            },
          ],
        },
        {
          text: "Koa.js",
          items: [
            {
              text: "koa-study",
              link: "/notes/base/koa/koa-study",
            },
          ],
        },
      ],
    },

    {
      text: "HTTP",
      items: [
        {
          text: "HTTP小记",
          link: "/notes/base/HTTP-Basic",
        },
        {
          text: "HTTP-Cache",
          link: "/notes/base/HTTP-Cache",
        },
        {
          text: "HTTP常见状态码",
          link: "/notes/base/HTTP-Status-Code",
        },
      ],
    },
  ];
}
