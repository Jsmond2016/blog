import { defineConfig } from '@sugarat/theme/node'
import { blogTheme } from './blog-theme'


// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题配置
  extends: blogTheme,
  lang: 'zh-cn',
  title: `Jsmond2016's Blog`,
  description: '黄同学的博客站点，欢迎您的访问',
  base: '/blog/',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message: '自定义底部内容',
      copyright:
        'MIT Licensed | <a target="_blank" href="https://github.com/Jsmond2016/blog"> Jsmond2016/Blog </a>'
    },
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    // nav: [
    //   { text: '首页', link: '/' },
    //   { text: '关于博主', link: 'https://github.com/Jsmond2016' }
    // ],
    nav: createNav(),
    sidebar: createSidebar(),
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
      }
    ]
  }
})

function createNav() {
  return [
    { text: "首页", link: "/" },
    { text: "技术文章", link: "/notes/tech/index" },
    { text: "随笔", link: "/notes/informal-essay/index" },
    { text: "面经汇总", link: "/notes/interview/index" },
    { text: "算法学习", link: "https://jsmond2016.github.io/leetcode/" },
    { text: "作品集", link: "/notes/portfolio/index" },
    { text: "关于我", link: "/notes/about-me/index" },
  ]
}


function createSidebar() {

  const sidebar = {
    '/notes/tech/': techSidebar(),
    '/notes/informal-essay': informalEssaySidebar(),
    '/notes/interview/': interviewSidebar(),
    '/notes/portfolio/': portfolioSidebar(),
    '/notes/about-me/': aboutMe(),
  }

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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
}