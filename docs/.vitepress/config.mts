import { defineConfig } from "vitepress";
import { notesSideBar } from "./navConfig/notes.nav.mts";
import { jottingsNavSideBar } from './navConfig/jottings.nav.mts';
import { bugsNavSideBar } from './navConfig/bugs.nav.mts';
import { interviewNav, interviewNavSideBar } from './navConfig/interview.nav.mts';
import { aboutMeNav, aboutMeSideBar } from './navConfig/about-me.nav.mts';
import { learningResourcesNav } from './navConfig/learning-resources.nav.mts';
import { technicalArticlesNav } from './navConfig/technical-articles.nav.mts';

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题配置
  lang: "zh-cn",
  title: `Jsmond2016's Blog`,
  description: "黄同学的技术博客，聚焦前端工程实践、教程输出与长期学习沉淀",
  // base: "/blog/", 部署在 vercel 的时候，这里改成 "/"
  base: "/",
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "上次更新于",
    footer: {
      message: "黄同学的技术博客",
      copyright:
        'MIT Licensed | <a target="_blank" href="https://github.com/Jsmond2016/blog"> Jsmond2016/Blog </a>',
    },
    logo: "/logo.png",
    nav:[
      { text: "首页", link: "/" },
      aboutMeNav,
      technicalArticlesNav,
      interviewNav,
      learningResourcesNav,
     ],
    sidebar: {
      ...notesSideBar,
      ...jottingsNavSideBar,
      ...bugsNavSideBar,
      ...interviewNavSideBar,
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
 
