export const portfolioNav = { text: "个人作品集", link: "/notes/portfolio/index" } as const;

export const portfolioNavSideBar = {
  "/notes/portfolio/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "个人作品集",
      items: [
        { text: "总览", link: "/notes/portfolio/index" },
        { text: "其他站点笔记", link: "/notes/portfolio/other-sites" },
        { text: "教程系列", link: "/notes/portfolio/tutorials" },
        { text: "重点项目", link: "/notes/portfolio/projects" },
      ],
    },
  ];
}
