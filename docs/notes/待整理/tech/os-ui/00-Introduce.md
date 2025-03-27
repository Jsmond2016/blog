# vue3-test

vue3学习例子

## 环境搭建

- 安装 `create-vite-app` 工具

```bash
# 方法1
yarn global add create-vite-app@1.18.0

# 方法2
npm i -g create-vite-app@1.18.0
```
- 创建项目录

```bash
cva gulu-ui

# 或者

create-vite-app gulu-ui
```

- 小知识

`vite` 文档给出的命令是

```bash
npm init vite-app <project-name>
yarn create vite-app <project-name>
```
等价于
全局安装 `create-vite-app` 然后

```bash
cva <project-name>
```

等价于
```bash
npx createa-vite-app <project-name>
```

即 `npx` 会帮你全局安装用到的包

Vue 2 和 Vue 3 的区别：

- 90% 的写法完全一致，除了以下几点
- Vue 3 的 Template 支持多个根标签，Vue 2 不支持
- Vue 3 有 createApp()，而 Vue 2 的是 new Vue()
- createApp(组件)，new Vue({template, render})


## 添加路由

- 查看当前 vue-router 最新版本，安装指定版本

```bash
npm info vue-router versions

# 安装最新版

yarn add -D vue-router@最新版版本号

# eg
yarn add vue-router@4.0.0-beta.3
```

- 项目添加 路由

  - 新建 history 对象

  - 新建 router 对象

  - 引入 TypeScript，将 `main.js` 改成 `main.ts` ，遇到问题查看 [Typescript support #5](https://github.com/vuejs/vue-next-webpack-preview/issues/5)
  
  ```js
  // 项目 src 目录下新建 shims-vue.d.ts
    declare module '*.vue' {
      import { ComponentOptions } from 'vue'
      const componentOptions: ComponentOptions
      export default componentOptions
    }
  ```

  - app.use(router)

  - 添加 `<router-view>`

  - 添加 `<router-link>`


## Typescript 添加和配置
