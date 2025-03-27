export const aboutMeNav = { text: "关于我", link: "/notes/about-me/index" } as const;

export const aboutMeSideBar = {
  "/notes/about-me/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "关于我",
      items: [],
    },
  ];
}
