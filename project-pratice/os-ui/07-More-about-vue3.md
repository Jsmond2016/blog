# Vue3 更多的新特性

- [Experimental Features](https://github.com/vuejs/vue-next/releases#Experimental%20Features) 新特性说明

- 新特性1：[syntactic sugar for using Composition API inside SFCs](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)

新特性 简单例子：

```js
<template>
  <button @click="inc">{{ count }}</button>
</template>

<script setup>
  import { ref } from 'vue'

  export const count = ref(0)
  export const inc = () => count.value++
</script>
```

- 新特性2：[state-driven CSS variables inside SFCs](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md)

例子代码：

```js
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style vars="{ color }">
.text {
  color: var(--color);
}
</style>
```
- 新特性3：使用 defineComponent：更好的支持泛型，可以和 Typescript 更好的结合使用

- 新特性4：老代码迁移
  - 方式1：[Vue3-从 Vue2 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)
  - 方式2： [vue-codemod](https://github.com/vuejs/vue-codemod)：特点是使用工具方便的迁移，从2到3版本。不过当前还有一些 api 没有完善。

- 新特性5：[vue3 最新中文文档](https://v3.cn.vuejs.org/guide/contributing/writing-guide.html)