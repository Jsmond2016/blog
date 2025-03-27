import { defineConfig } from "vitepress";
import { baseNav, baseNavSideBar } from "./navConfig/base.nav.mts";
import { advanceNav, advanceNavSideBar } from './navConfig/advance.nav.mts';
import { jottingsNav, jottingsNavSideBar } from './navConfig/jottings.nav.mts';
import { bugsNav, bugsNavSideBar } from './navConfig/bugs.nav.mts';
import { interviewNav, interviewNavSideBar } from './navConfig/interview.nav.mts';
import { portfolioNav, portfolioNavSideBar } from './navConfig/portfolio.nav.mts';
import { otherNotesNav } from './navConfig/other-notes.nav.mts';
import { aboutMeNav, aboutMeSideBar } from './navConfig/about-me.nav.mts';

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题配置
  lang: "zh-cn",
  title: `Jsmond2016's Blog`,
  description: "黄同学的博客站点，欢迎您的访问",
  // base: "/blog/", 部署在 vercel 的时候，这里改成 "/"
  base: "/",
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "上次更新于",
    footer: {
      message: "自定义底部内容",
      copyright:
        'MIT Licensed | <a target="_blank" href="https://github.com/Jsmond2016/blog"> Jsmond2016/Blog </a>',
    },
    logo: "/logo.png",
    nav:[
      { text: "首页", link: "/" },
      baseNav,
      advanceNav,
      jottingsNav,
      bugsNav,
      interviewNav,
      otherNotesNav,
      portfolioNav,
      aboutMeNav,
     ],
    sidebar: {
      ...baseNavSideBar,
      ...advanceNavSideBar,
      ...jottingsNavSideBar,
      ...bugsNavSideBar,
      ...interviewNavSideBar,
      ...portfolioNavSideBar,
      ...aboutMeSideBar
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Jsmond2016/blog",
      },
    ],
  },
});
 


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
 