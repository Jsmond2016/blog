export const advanceNav = { text: "前端进阶", link: "/notes/advance/index" } as const;

export const advanceNavSideBar = {
  "/notes/advance/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "前端进阶",
      items: [],
    },
  ];
}
