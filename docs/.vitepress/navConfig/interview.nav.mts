

export const interviewNav = { text: "面试和八股文", link: "/notes/interview/index" } as const;

export const interviewNavSideBar = {
  "/notes/interview/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "面试和八股文",
      items: [],
    },
  ];
}
