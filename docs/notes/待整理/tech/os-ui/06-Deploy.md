# 部署相关

## rollup 打包

新建 `lib/index.ts` 文件

```typescript
export { default as Button } from './Button.vue'
export { default as Switch } from './Switch.vue'
export { default as Dialog } from './Dialog.vue'
export { default as Tab } from './Tab.vue'
export { default as Tabs } from './Tabs.vue'
export { default as openDialog } from './openDialog.vue'
```

根目录新建 `rollup.config.js` 文件

```js
// 请先安装 rollup-plugin-esbuild rollup-plugin-vue rollup-plugin-scss sass rollup-plugin-terser
// 为了保证版本一致，请复制我的 package.json 到你的项目，并把 name 改成你的库名
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"

export default {
  input: 'src/lib/index.ts',
  output: {
    globals: {
      vue: 'Vue'
    },
    name: 'Gulu',
    file: 'dist/lib/gulu.js',
    format: 'umd',
    plugins: [terser()]
  },
  plugins: [
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015' 
    }),
    vue({
      include: /\.vue$/,
    })
  ],
} 
```

为避免 `node-sass` 安装慢的问题，在 `package.json` 文件中新增

```json
"resolutions": {
    "node-sass": "npm:sass@^1.26.11"
  },
```

然后，安装依赖和打包

```bash
yarn install

rollup -c
```

## npm 发布

- 更改 `package.json` ，新增配置

```json
"name": "os-ui",
"files": ["dist/lib/*"],
"main": "dist/lib/os-ui.js",
```

换成 npm 源

```bash
# 判断当前源，若为淘宝源则换成  npm 源
npm config get registry

npm config set registry https://registry.npmjs.org

# 输入注册号的 npm 账号
npm login

# 发布的包取名，必须小写，不能重名
# 发布前，请在 npmjs 官网输入你发布的名字，确定没有被别人使用
# 每次发布版本，不能和上一次相同，需要先修改 package.json 的 version 
npm publish

```

每次需要改动 os-ui 的时候，都需要删除 dist 目录，重新执行 `rollup -c` ，更改 `package.json` 的版本号升级后再执行 `npm publish` 进行发布，使用的时候也需要更改版本号重新安装


## 测试发现 bug

测试方式：

使用 `vue-cli` 新建一个项目，添加我们的 `my-ui` ，测试每个组件是否正常使用

发现问题：

`Tabs` 切换失效


问题排查方式：

- 回到组件测试中，测试是否有问题
- build 后组件是否有问题
- 正式项目和my-ui 的项目依赖？ 是的，项目使用的是 `rc` 版本，猜测可能是正式版和 `rc` 版本发生了变更
- 那么，是哪个地方发生了变更导致我们的项目出问题呢？
- 我们查看 Tab 组建中使用了哪些 新的 API，新的就是可能发生变更的
- 初步判断是 `watchEffect` 可能发生了变更
- 我们来到 [vue-next](https://github.com/vuejs/vue-next/) ，找到 `release` ，搜索 `watchEffect`
- 没有相关搜索结果，我们猜测，可能是 `rc` 版本中的某个版本变更了，我们找到其中一个 [CHAGNELOG.md](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md)，搜索发现这里有变更

> BREAKING CHANGES
>
> watch APIs now default to use flush: 'pre' instead of flush: 'post'. This change affects `watch`, `watchEffect`, the watch component option, and `this.$watch`. See (49bb447) for more details.

解释为：新增 `flush` 参数，使用 `pre` 属性 替代了默认 `post`，这里影响了 `watch, watchEffect` API

回到 `watchEffect` 的作用，就是监听函数内变量的变化，如果有变化，则重新执行函数。

此时，我们需要分析 代码之间的逻辑：

```html
<template>
  <div class="my-tabs">
    <div class="my-tabs-nav" ref="container">
      <div class="my-tabs-nav-item" :ref="el => { if (t===selected) selectedItem = el }" @click="select(t)" :class="{selected: t === selected}" v-for="(t,index) in titles" :key="index">{{t}}</div>
      <div class="my-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="my-tabs-content">
      <component :is="current" :key="current.props.title" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    selected: {
      type: String,
    }
  },
  setup() {
    // ...省略部分代码
    onMounted(() => {
    watchEffect(() => {
      const {
        width
      } = selectedItem.value.getBoundingClientRect()
      indicator.value.style.width = width + 'px'
      const {
        left: left1
      } = container.value.getBoundingClientRect()
      const {
        left: left2
      } = selectedItem.value.getBoundingClientRect()
      const left = left2 - left1
      indicator.value.style.left = left + 'px'
    })
  })
  }
}

</script>

```

分析为：


```js
// 我们原本期待的代码逻辑顺序为

// 01--props: seleted 变化

// 导致

// 02--ref: selectedItem 变化

// 从而

// 03--watchEffect: 内部使用到的变量改变，则执行代码，从而 Indicator 位置改变
```




