// import { defineConfig } from '@sugarat/theme/node'
import { defineConfig } from "vitepress";
// import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题配置
  lang: "zh-cn",
  title: `Jsmond2016's Blog`,
  description: "黄同学的博客站点，欢迎您的访问",
  // base: "/blog/", 部署在 vercel 的时候，这里改成 "/"
  base: '/',
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "上次更新于",
    footer: {
      message: "自定义底部内容",
      copyright:
        'MIT Licensed | <a target="_blank" href="https://github.com/Jsmond2016/blog"> Jsmond2016/Blog </a>',
    },
    logo: "/logo.png",
    nav: createNav(),
    sidebar: createSidebar(),
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Jsmond2016/blog",
      },
    ],
  },
});

function createNav() {
  return [
    { text: "首页", link: "/" },
    { text: "技术文章", link: "/notes/tech/index" },
    {
      text: "随笔文章",
      link: "/notes/jottings/index",
    },
    { text: "面经汇总", link: "/notes/interview/index" },
    {
      text: "其他站点笔记",
      items: [
        {
          text: "每日学习记录",
          link: "https://jsmond2016.github.io/study-everyday/",
        },
        {
          text: "数据结构和算法",
          link: "https://jsmond2016.github.io/leetcode/",
        },
        {
          text: "Golang 学习笔记",
          link: "https://jsmond2016.github.io/go-study/",
        },
        { text: "Java 开发笔记", link: "https://java-dev-doc.vercel.app/" },
      ],
    },
    { text: "作品集", link: "/notes/portfolio/index" },
    { text: "关于我", link: "/notes/about-me/index" },
  ];
}

function createSidebar() {
  const sidebar = {
    "/notes/tech/": techSidebar(),
    "/notes/informal-essay": informalEssaySidebar(),
    "/notes/interview/": interviewSidebar(),
    "/notes/portfolio/": portfolioSidebar(),
    "/notes/about-me/": aboutMe(),
    "/notes/jottings/": articleSidebar(),
  };

  return sidebar;
}

function techSidebar() {
  return [
    {
      text: "技术文章",
      items: [
        { text: "手写一个Cli", link: "/notes/tech/手写一个cli" },
        { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ];
}


function articleSidebar() {
  return [
    {
      text: "随笔",
      items: [
        {
          text: "PowerShell 命令行 和 git 代理配置-windows 篇",
          link: "/notes/jottings/terminal-git-proxy",
        },
        {
          text: "windows-terminal-美化教程",
          link: "/notes/jottings/windows-terminal",
        },
        {
          text: "js toFixed 四舍五入问题",
          link: "/notes/jottings/js-to-fixed",
        },
        { text: "如何高效学习", link: "/notes/jottings/book-1" },
        { text: "如何做前端技术设计", link: "/notes/jottings/book-2" },
        { text: "Docker教程", link: "/notes/jottings/docker-note" },
      ],
    },
    {
      text: "面试",
      items: [
        { text: "面经整理-爪哇教育", link: "/notes/jottings/zhuawa-0404" },
        { text: "面试冲刺", link: "/notes/jottings/fe-interview" },
        { text: "手写js", link: "/notes/jottings/hand-js" },
      ],
    },
    {
      text: "leetcode",
      items: [
        { text: "leetcode难度分类", link: "/notes/jottings/leetcode-retag" },
        { text: "leetcode目录", link: "/notes/jottings/leetcode-category" },
      ],
    },
  ];
}

function informalEssaySidebar() {
  return [
    {
      text: "杂文随笔",
      items: [
        // { text: "2017年终总结", link: "/notes/informal-essay/2017年终总结" },
        // { text: "编程基础", link: "/notes/informal-essay/编程基础" },
      ],
    },
  ];
}
function interviewSidebar() {
  return [
    {
      text: "面试汇总",
      items: [
        { text: "Markdown Examples", link: "/markdown-examples" },
        { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ];
}
function portfolioSidebar() {
  return [
    {
      text: "个人作品集",
      items: [
        { text: "Markdown Examples", link: "/markdown-examples" },
        { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ];
}
function aboutMe() {
  return [
    {
      text: "关于我",
      items: [
        { text: "Markdown Examples", link: "/notes/about-me/index" },
        // { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ];
}
