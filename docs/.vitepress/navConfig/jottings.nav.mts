export const jottingsNav = { text: "随笔文章", link: "/notes/jottings/index" } as const;

export const jottingsNavSideBar = {
  "/notes/jottings/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "随笔文章",
      items: [],
    },
  ];
}
