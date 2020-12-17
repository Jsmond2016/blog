# vue3-Dialog 组件

API 设计：

```js
// 使用方式1
<Dialog
  :visible="true"
  :closeOnClickOverlay="true" // 点击空白区域是否关闭 Dialog
  title="标题"
  @confirm="fn1"
  @cancel="fn2"
>

// 使用方式2
openDialog({
  title: "示例2-测试",
  content: "你好",
  closeOnClickOverlay: false,
  ok: () => { console.log('okkkk-')},
  cancel: () =>{ console.log('cancel-----')},
})
```

## 完成基础样式

注意几个要点：


- Dialog 组成部分：背景遮罩层 + Dialog 组件（右上角x，ok 和 cancel 按钮，标题和 content部分）
- z-index 的设置，遮罩层要在 Dialog 组件下面
- 右上角 x 的css 画法，使用 伪元素的方式，做成 2 个扁的 div，旋转角度即可。

```html
<template>
  <div class="my-dialog-overlay"></div>
  <div class="my-dialog-wrapper">
    <div class="my-dialog">
      <header>标题<span class="my-dialog-close"></span></header>
      <main>
        <p>第一行</p>
        <p>第二行</p>
      </main>
      <footer>
        <Button>OK</Button>
        <Button>Cancel</Button>
      </footer>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
};
</script> 

<style lang="scss">
$radius: 4px;
$border-color: #d9d9d9;
.my-dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  min-width: 15em;
  max-width: 90%;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
  }
  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  > header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  > main {
    padding: 12px 16px;
  }
  > footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style> 
```

## 支持 visible 属性

注意几个要点：

- ref 的学习和使用：可以将其看做一个容器，包裹一个值，取值的方式要取容器的 value，即 `x.value`


```html
<!-- 父组件 -->
<template>
  <div>
    <h1>Dialog 示例</h1>
    <Button @click="toggleDialog">切换Dialog</Button>
    <Dialog :visible="x" />
  </div>
</template>

<script>
import Dialog from '../lib/Dialog.vue';
import Button from '../lib/Button.vue';
import { ref } from 'vue';

export default {
  components: {
    Dialog,
    Button,
  },
  setup() {
    const x = ref(false);
    const toggleDialog = () => {
      x.value = !x.value;
    }
    return { x, toggleDialog };
  }
}
</script> 

<!-- 子组件 -->

<template v-if="visible">
  <!-- ... -->
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      Button,
    },
  }
</script>
```

- `v-model:event="xxx"` 的使用，下面 2 种写法是等价的
- `context.emit("update:visible", false);` 的使用，父元素使用 `v-model:event` 直接可以获取值双向绑定进行相应

```html
<!-- 父组件 -->
<!-- <Dialog :visible="x" @update:visible="x = $event" /> -->
<Dialog
  v-model:visible="x"
  :closeOnClickOverlay="true"
  :confirm="onOk"
  :cancel="onCancel"
/>

<!-- 子组件 -->
<script>
  setup(props, context) {
    const close = ()=> {
      // context.emit("update", false)
      context.emit("update:visible", false);
    }
    const onOk = () => {
      console.log('ok')
      return false;
    }
    const onCancel = () => {
      console.log('cancel');
    }

    return { close, onOk, onCancel}
  }
</script>
```

- 外层控制 点击 ok  是否立即关闭 Dialog。这里考虑一种业务场景，即 Dialog 的 content 是一个表单，当表单内容没有填写完成，点击确定不允许关闭。
- 可能的做法是，子元素会派发事件，让父元素响应为 true 或者 false，然后进行关闭。但是事实上，**事件 是没有返回值的**。
- 正确的做法是，将控制权（控制关闭操作）交给 父元素，onOk 返回为 true 方可关闭。
- 下面，使用了 typescript 的 `?.` 语法

```html
<footer>
  <Button @click="confirm">OK</Button>
  <Button @click="cancel">Cancel</Button>
</footer>


<script>
    // 子元素
  const confirm = () => {
    // 这里不应该用事件 的方式，否则关闭不好处理，因为事件没有返回值。场景：dialog 内有表单，没有填完不允许关闭
    // const result = context.emit("confirm")
    // if (result) close()
    // props.confirm && props.confirm() !== false
    if (props.confirm?.() !== false) {
      close()
    }
  }
</script>

```



## 支持点击空白区域关闭属性 closeOnClickOverlay

这里比较简单，只需要在 遮罩层添加一个事件 关闭 Dialog 即可。


```html
<div class="my-dialog-overlay" @click="onClickOverlay"></div>

<script>
  // ...
  props: {
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  }
  setup(props, context) {

    const close = ()=> {
      context.emit("update:visible", false);
    }
    // 通过外面判断是否点击 背景色关闭 dialog
    const onClickOverlay = () => {
      if (props.closeOnClickOverlay) {
        close()
      }
    }
    return { onClickOverlay }
  }
</script>
```

## 支持 title 和 content，使用具名插槽


这里有 2 种方式实现支持传入的 title


- 父元素使用 `<Dialog :title="测试标题" />` 传给子组件，缺点是无法传入 html 元素或者组件
- 使用插槽传入，可以传入组件
- 当使用多个 插槽 的时候，需要使用到 **具名插槽**，注意 具名插槽的使用方法： `v-slot:name`


```html
<!-- 方式1 -->
<!-- 父组件 -->
<Dialog :title="测试标题" />


<!-- 子组件 -->
<header>{{title}}<span @click="close" class="my-dialog-close"></span></header>

<script>
  export default {
    props: {
      title: {
        type: String,
        defalut: "提示"
      },
    }
  }
</script>

<!-- 方式2 slot 和 具名 slot -->
<!-- 父组件 -->
<Dialog :visible="xxx">
  <template v-slot:content>
    <p>你好测试，你好测试</p>
    <p>你好测试，你好测试</p>
  </template>
  <template v-slot:title>
    <strong>我是标题</strong>
  </template>
</Dialog>


<!-- 子组件 -->

<header><slot name="title" /><span @click="close" class="my-dialog-close"></span></header>
 <main>
  <slot name="content" />
</main>
```


## 处理 层叠样式问题，使用 Teleport

如下的代码 `.test2`，可能会出现这样的 bug：即 Dialog 的显示会再 新的 div 下面，导致无法点击到 Dialog，问题在于 `z-index`。

前面的 代码我们知道，Dialog的 `z-index` 是 10，但是这个 `z-index` 的 10 是在 `test1` 里面的 10，其权重是要小于 后者 `test2` 的 `z-index: 2` 子元素的 `z-index: 1` 的。

做个不恰当的比喻：清华大学的最后一名，对比 某三本 院校的第一名，是要更强的。前面的 权重也是如此，外层元素的 `z-index` 决定了其地位，而 Dialog 所在的外层元素的 `z-index` 权重要低于 其他元素的值，因此里面的元素的权重问题可能导致元素被覆盖

```html
<div class="test1" style="position: relative; z-index: 1;">
  <Dialog />
</div>
<div class="test2" style="position: relative; width: 500px; height: 500px; background: red; z-index: 2;">测试层叠关系</div>

```

解决办法： 使用 [Teleport](https://zhuanlan.zhihu.com/p/143042237) ，意思是将 其包裹的元素，转移到 其他的位置，如下代码中，是将其包裹的元素转移到 `body` 目录下

```html
<template>
  <template v-if="visible">
    <Teleport to="body">
      <div class="my-dialog-overlay" @click="onClickOverlay"></div>
      <div class="my-dialog-wrapper">
        <div class="my-dialog">
          <header><slot name="title" /><span @click="close" class="my-dialog-close"></span></header>
          <main>
            <slot name="content" />
          </main>
          <footer>
            <Button @click="confirm">OK</Button>
            <Button @click="cancel">Cancel</Button>
          </footer>
        </div>
      </div>
    </Teleport>
  </template>
</template>

```

## 一句代码打开 Dialog，学习 render, h, createApp 的使用

我们试想，是否可以通过如下 js 代码，打开 Dialog 呢？

```js
openDialog({
  title: "示例2-测试",
  content: "你好",
  closeOnClickOverlay: false,
  ok: () => { console.log('okkkk-')},
  cancel: () =>{ console.log('cancel-----')},
})
```

答案是可以的，我们写一个 ts, 代码如下：

```typescript
// 使用
const showDialog = () => {
  openDialog({
    title: "示例2-测试",
    content: "你好",
    closeOnClickOverlay: false,
    ok: () => { console.log('okkkk-')},
    cancel: () =>{ console.log('cancel-----')},
  })
}



// openDialog.ts
import Dialog from './Dialog.vue'
import { createApp, h } from 'vue';

export const openDialog = (options) => {
   const { title, content, ok, cancel, closeOnClickOverlay } = options;
   const div = document.createElement("div");
   document.body.appendChild(div)
   const close = () => {
    // @ts-ignore
    app.unmount(div)
    div.remove()
   }
   const app = createApp({
     render() {
       return h(Dialog, { 
         visible: true,
         'onUpdate:visible': (newVisible) => {
           if (newVisible === false) {
             close()
           }
         },
         confirm: ok,
         cancel,
         closeOnClickOverlay,
        }, {
           title,
           content
         })
     }
   });
   app.mount(div);
}
```

解释下：

- 原理就是： 创建一个 dom (包裹了 Dialog 组价的 dom)，挂在到 页面中
- createApp: 返回一个提供 context 的 Vue 实例
- render: 返回一个 virtual node，
- h: 接受的参数分别为 - 组件实例，props，slot 

**关于 visible 问题:**

上面，我们没有使用 visible 的方式来控制 Dialog 的关闭和打开，而是使用组件的 挂载和卸载的方式来表示 visible 的 true 和 false

## 参考资料

- [Vue3-v-model](https://v3.vuejs.org/guide/migration/v-model.html#v-model-arguments)
- [Vue3-v-slot](https://v3.vuejs.org/api/directives.html#v-slot)
- [Vue3-Teleport](https://v3.vuejs.org/guide/teleport.html#teleport)
- [Vue3-render](https://v3.vuejs.org/guide/render-function.html#render-functions)
- [Vue3-h](https://v3.vuejs.org/guide/render-function.html#h-arguments)
- [Vue3-createApp](https://v3.vuejs.org/api/global-api.html#createapp)