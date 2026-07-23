

export const interviewNav = { text: "面试题", link: "/notes/interview/index" } as const;

export const interviewNavSideBar = {
  "/notes/interview/": createSideBar(),
};
function createSideBar() {
  return [
    {
      text: "面试和八股文",
      items: [
        { text: "总览", link: "/notes/interview/index" },
        { text: "前端开发面试题库", link: "/notes/interview/frontend-interview-questions" },
      ],
    },
  ];
}
