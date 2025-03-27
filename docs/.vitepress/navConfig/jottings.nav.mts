export const jottingsNav = { text: "前端进阶", link: "/notes/jottings/index" } as const;

export const jottingsNavSideBar = {
  "/notes/jottings/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "前端进阶",
      items: [],
    },
  ];
}
