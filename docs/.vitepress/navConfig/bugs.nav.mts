export const bugsNav = {
  text: "bug和坑",
  link: "/notes/bugs/index",
} as const;

export const bugsNavSideBar = {
  "/notes/bugs/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "bug和坑",
      items: [],
    },
  ];
}
