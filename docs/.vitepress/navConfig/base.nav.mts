export const baseNav = { text: "前端基础", link: "/notes/base/index" } as const;

export const baseNavSideBar = {
  "/notes/base/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "前端基础",
      items: [],
    },
  ];
}
