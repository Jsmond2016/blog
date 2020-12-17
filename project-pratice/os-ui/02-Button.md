# vue3-Button 组件

需求 / API 设计：我们想这样使用 Button

```js
<Button
  size="big"
  theme="link"
  level="danger"
  disabled
  loading="true"
>
按钮
</Button>


```


## Vue3 属性绑定细节

问题：vue3 会将所有父元素的事件默认绑定到子元素最外层

比如，我们给 button 添加  click 事件

```html
<!-- 父元素 -->
<Button @click="handleClick">你好</Button>

 setup() {
    const handleClick = () => {
      console.log('hello')
    }
    return { handleClick }
  }

<!-- 子元素 -->

<template>
  <div>
    <button>
      <slot />
    </button>
  </div>
</template>

```

我们发现，点击 button 外层的 div 也会触发 button 的 click 事件，是因为 vue3 做了事件绑定，统一绑定在组件最外层。

需求：将 事件传导给 里面的 button 按钮，怎么做？

- 设置 `inheritAttrs: false` ，表示取消默认绑定
- setup(props, context) 中的 context 里面有 attrs 属性，就是父元素传递进来的所有事件
- 使用 $attrs 或者 context.attrs 获取所有属性
- 使用 v-bind="$attrs" 批量绑定属性
- 使用 剩余操作符 ，将部分 事件 绑定到 button 组件中



```html
<template>
  <div :size="size">
    <button v-bind="rest">
      <slot />
    </button>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    setup(props, context) {
      const { size, ...rest } = context.attrs;
      return { size, rest };
    }
  }
</script>

```


## 关于 props V.S. attrs 区别如下

- props 要先声明才能取值，attrs 不用先声明，如下，props 里只声明了 size，没有声明 notShow，因此无法获取到 notShow

```html
<!-- 父元素 -->
<Button @click="handleClick">你好</Button>

 setup() {
    const handleClick = () => {
      console.log('hello')
    }
    return { handleClick }
  }

<!-- 子元素 -->

<template>
  <div>
    <button size="50" notShow="false">
      <slot />
    </button>
  </div>
</template>
<script lang='ts'>
export default {
  inheritAttrs: false,
  props: {
    size: Number,
  },
  setup(props, context) {
    const { size, ...rest } = context.attrs;

    console.log({...props}) //{size: "50"}
    console.log({...context.attrs}) //{notShow: "", onClick: f}

    return { size, rest };
  }
}

</script>
```

- props 不包含事件，attrs 包含

- props 没有声明的属性，会跑到 attrs 里

- props 支持 string 以外的类型，attrs 只有 string 类型

上面的几个特点，在上面的例子中都可以体现

## 添加基础样式

这里注意几个问题：

- 去除 scoped ，因为 data-v-xxx 中的 xxx 每次运行可能不同，必须输出稳定不变的 class 选择器，方便使用者覆盖
- 针对 firefox 浏览器可能出现的 outline 问题，使用下面代码处理

  ```css
  &::-moz-focus-inner {
        border: 0;
      }
  ```
- 必须加前缀。
  - `.button` 不行，很容易被使用者覆盖,
  - `.jsmond-button` 可以，不太容易被覆盖, 
  - `.theme-link` 不行，很容易被使用者覆盖,
  - `.jsmond-theme-link` 可以，不太容易被覆盖
- CSS 最小影响原则: 所有 css 样式只应用在 加了 特定前缀 的元素上，没有特定前缀的元素不受影响。

基础样式全部代码为：

  ```html
  <template>
    <button class="jsmond-button" :class="{[`theme-${theme}`]: theme}">
      <slot />
    </button>
  </template>



  <style lang="scss">
    $h: 32px;
    $border-color: #d9d9d9;
    $color: #333;
    $blue: #40a9ff;
    $radius: 4px;

    .jsmond-button {
      box-sizing: border-box;
      height: $h;
      padding: 0 12px;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      background: white;
      color: $color;
      border: 1px solid $border-color;
      border-radius: $radius;
      box-shadow: 0 1px 0 fade-out(black, 0.95);

      &+& {
        margin-left: 8px;
      }

      &:hover,
      &:focus {
        color: $blue;
        border-color: $blue;
      }

      &:focus {
        outline: none;
      }

      &::-moz-focus-inner {
        border: 0;
      }
    }
  </style>
  ```


## 支持 theme 属性

支持以下几种 theme

- button 即正常主题
- text
- link

几个要点：

- 父子传值，子组件 Button 通过 props 获取到传入的属性，需要在 Button 组件中添加 props 声明，否则该属性会再 context.attrs 中
- computed 的使用，改变 css

```js
import { computed } from "vue";

setup(props, context) {
  const classes = computed(() => {})
}
```

- 对应的 css 书写

```scss
$h: 32px;
$border-color: #d9d9d9;
$color: #333;
$blue: #40a9ff;
$radius: 4px;
$red: red;
$grey: grey;


.my-button {
  box-sizing: border-box;
  height: $h;
  padding: 0 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: white;
  color: $color;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 1px 0 fade-out(black, 0.95);
  transition: background 250ms;
  & + & {
    margin-left: 8px;
  }
  &:hover,
  &:focus {
    color: $blue;
    border-color: $blue;
  }
  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &.my-theme-link {
    border-color: transparent;
    box-shadow: none;
    color: $blue;
    &:hover,
    &:focus {
      color: lighten($blue, 10%);
    }
  }
  &.my-theme-text {
    border-color: transparent;
    box-shadow: none;
    color: inherit;
    &:hover,
    &:focus {
      background: darken(white, 5%);
    }
  }
}
```

拓展知识：

- `box-shadow: 0 1px 0 fade-out(black, 0.95)` 这里使用到了 transition 相关，参考 [transtion](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html)
- `& + &` 表示两个 相同的自己之间，上面设置的是相同的自己左边间距 5 px
- `lighten` 提亮属性：参考 [Less Lighten增加颜色亮度](https://www.w3cschool.cn/less/lighten.html)

## 支持 size 属性

支持以下几种 size

- big
- normal 正常大小，无需多余 css，默认即可
- small


相关 css 代码为：

```css
  &.my-size-big {
    font-size: 24px;
    height: 48px;
    padding: 0 16px;
  }

  &.my-size-small {
    font-size: 12px;
    height: 20px;
    padding: 0 4px;
  }
```


## 支持 level 属性

支持以下几种 level

- main 主要按钮，蓝色
- normal 正常大小，无需多余 css，默认即可
- danger 危险按钮，红色

相关 css 代码为：

```css
.my-button{
  &.my-theme-button {
    &.my-level-main {
      background: $blue;
      color: white;
      border-color: $blue;
      &:hover,
      &:focus {
        background: darken($blue, 10%);
        border-color: darken($blue, 10%);
      }
    }
    &.my-level-danger {
      background: $red;
      border-color: $red;
      color: white;
      &:hover,
      &:focus {
        background: darken($red, 10%);
        border-color: darken($red, 10%);
      }
    }
  }

  &.my-theme-link {
    &.my-level-danger {
      color: $red;
      &:hover,
      &:focus {
        color: darken($red, 10%);
      }
    }
  }

  &.my-theme-text {
    &.my-level-main {
      color: $blue;
      &:hover,
      &:focus {
        color: darken($blue, 10%);
      }
    }
    &.my-level-danger {
      color: $red;
      &:hover,
      &:focus {
        color: darken($red, 10%);
      }
    }
  }
}
```

这里要关注 css 代码的顺序，按钮 level 是在 不同类型按钮之上进行 level 设置的，因为涉及到颜色和底色的改变，无法像前面 size 类型一样，仅仅改变大小边距即可，因此代码顺序都是要写在对应类型的样式内。

## 支持 disabled

父组件只写 `disabled` 的时候，子组件会默认为 `disabled: true` 

对应 css 样式为：

```css
.my-button{
 &.my-theme-button {
    &[disabled] {
      cursor: not-allowed;
      color: $grey;
      &:hover {
        border-color: $grey;
      }
    }
  }
  &.my-theme-link,
  &.my-theme-text {
    &[disabled] {
      cursor: not-allowed;
      color: $grey;
    }
  }
}
```


## 支持 loading


这里主要有几个知识点：

- 画一个圆：实际就是一个大的正方形，设置圆角为 50%；其中一边为透明；
- 让圆圈转动起来：使用动画 animation，原地旋转 rotate，持续动作为 infinite linear，参考文档 [CSS3动画](https://www.runoob.com/css3/css3-animations.html)


css 代码为：

```html
<template>
  <button class="my-button" :class="classes" :disabled="disabled" :loading="loading">
    <span v-if="loading" class="my-loadingIndicator"></span>  
    <slot />
  </button>
</template>
<script>
import { computed } from "vue";
export default {
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "button",
    },
    size: {
      type: String,
      default: "normal",
    },
    level: {
      type: String,
      default: "normal",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, context) {
    const { theme, size, level } = props;
    const classes = computed(() => {
      return {
        [`my-theme-${theme}`]: theme,
        [`my-size-${size}`]: size,
        [`my-level-${level}`]: level,
      };
    });
    return { classes };
  },
};
</script>
<style lang="scss">
.my-button {
  > .my-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-color: $blue $blue $blue transparent;
    border-style: solid;
    border-width: 2px;
    animation: my-spin 1s infinite linear;
  }
}
@keyframes my-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
```

## 参考资料：

- [Vue3-inheritAttrs](https://v3.vuejs.org/api/options-misc.html#name)