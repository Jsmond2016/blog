import { te } from 'element-plus/es/locales.mjs';

export const advanceNav = { text: "前端进阶", link: "/notes/advance/index" } as const;

export const advanceNavSideBar = {
  "/notes/advance/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "杂文",
      items: [
        {
          text: "浅谈前端路由",
          link: "/notes/advance/A-Brief-Discussion-Front-End-Router",
        },
        {
          text: "Vue的父子通信问题",
          link: "/notes/advance/Vue.js-Parent-Child-Communication-Issues",
        },
      ],
    },
  ];
}
