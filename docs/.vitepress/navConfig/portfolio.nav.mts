export const portfolioNav = { text: "个人作品集", link: "/notes/portfolio/index" } as const;

export const portfolioNavSideBar = {
  "/notes/portfolio/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "个人作品集",
      items: [],
    },
  ];
}
