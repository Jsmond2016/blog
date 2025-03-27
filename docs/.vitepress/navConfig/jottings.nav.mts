export const jottingsNav = { text: "随笔文章", link: "/notes/jottings/index" } as const;

export const jottingsNavSideBar = {
  "/notes/jottings/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "随笔文章",
      items: [
        {
          text: "2017年终总结",
          link: "/notes/jottings/2017-Year-End-Summary",
        }
      ],
    },
  ];
}
