export const aboutMeNav = { text: "关于我", link: "/notes/about-me/index" } as const;

export const aboutMeSideBar = {
  "/notes/about-me/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "关于我",
      items: [{ text: "总览", link: "/notes/about-me/index" }],
    },
    {
      text: "个人作品集",
      items: [
        { text: "总览", link: "/notes/about-me/portfolio/index" },
        { text: "教程系列", link: "/notes/about-me/portfolio/tutorials" },
        { text: "重点项目", link: "/notes/about-me/portfolio/projects" },
        { text: "其他站点笔记", link: "/notes/about-me/portfolio/other-sites" },
      ],
    },
  ];
}
