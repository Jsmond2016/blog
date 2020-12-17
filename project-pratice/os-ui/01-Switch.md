# Vue3-Switch 组件开发

> 参考 [AntDesign-Switch组件](https://ant.design/components/switch-cn/)，做一个和它一样的


主要知识点：

- HTML
- CSS
- CSS-Transition
- CSS-状态切换，calc 属性
- Scss-变量

## 基础代码：

```html
<template>
  <div>
    <button :class="{checked: value}" @click="toggle">
      <span></span>
    </button>
    <div>{{value}}</div>
  </div>
</template>

<script lang='ts'>
  import { ref } from 'vue'

  export default {
    name: 'Switch',
    props: {
      value: Boolean
    },
    setup(props, context) {
      const toggle = () => {
        context.emit('update:value', !props.value)
      }
      return {
        toggle
      }
    }
  }
</script>
```

## 基础样式：按钮和圆圈样式

主要是 边框大小，圆角，颜色，定位

```scss
$h: 22px;
  $h2: $h - 4px;

  button {
    width: $h*2;
    height: $h;
    border: none;
    background: #bfbfbf;
    border-radius: $h / 2;
    position: relative;
    span {
      position: absolute;
      top: 2px;
      left: 2px;
      height: $h2;
      width: $h2;
      background: white;
      border-radius: $h2 / 2;
    }
  }
```

## 样式升级： 动画效果

主要使用 css 状态机 的思想，加上 css3 transition 属性的应用

```scss
$h: 22px;
  $h2: $h - 4px;

  button {
    width: $h*2;
    height: $h;
    border: none;
    background: #bfbfbf;
    border-radius: $h / 2;
    position: relative;
    span {
      position: absolute;
      top: 2px;
      left: 2px;
      height: $h2;
      width: $h2;
      background: white;
      border-radius: $h2 / 2;
      transition: all 250ms;
    }
    &.checked {
      background: #1890ff;
      >span {
        left: calc(100% - #{$h2} - 2px);
      }
    }
    &:active {
      >span {
        width: $h2 + 4px;
        margin-left: -4px;
      }
    }
    &.checked:active {
      >span {
        width: $h2 + 4px;
      }
    }
    &:focus {
      outline: none;
    }
 }
```

## 注意几个要点：


- 关于父子传值和事件传导：

```html
<!-- 写法1 -->
<!-- 父组件 -->
<Switch v-model:value="bool" @change="bool = $event"/>

setup() {
    const bool = ref(true)
    return {bool}
  }


<!-- ----------分割线--------- -->


<!-- 子组件 -->
<button :class="{checked: value}" @click="toggle">
  <span></span>
</button>


setup(props, context) {
  const toggle = () => {
    context.emit('change', !props.value)
  }
  return {
    toggle
  }
}


<!-- 根据 Vue3 的新语法，可以写成这样 --- 写法2 -->

<!-- 父组件 -->
<Switch v-model:value="bool"/>

setup() {
    const bool = ref(true)
    return {bool}
  }


<!-- ----------分割线--------- -->


<!-- 子组件 -->
<button :class="{checked: value}" @click="toggle">
  <span></span>
</button>


setup(props, context) {
  const toggle = () => {
    context.emit('update:value', !props.value)
  }
  return {
    toggle
  }
}
```




## 参考资料：

- 菜鸟教程: [css3-transition](https://www.runoob.com/cssref/css3-pr-transition.html)
- MDN: [CSS_transitions](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- CSS :active 选择器: [CSS :active 选择器](https://www.runoob.com/cssref/sel-active.html)
- Sass-变量: [sass-变量](https://www.runoob.com/sass/sass-variables.html)
- css-calc: [css-calc](https://www.runoob.com/cssref/func-calc.html)
- setup: [setup-vue3](https://v3.vuejs.org/guide/composition-api-setup.html#props) 主要接受 2 个参数，一个 props 即父元素传给子元素的值，切记为 read only；第二个为 context，主要暴露 3 个属性
- v-model 变化： [vue3-v-model](https://v3.vuejs.org/guide/migration/v-model.html#v-model-arguments)

```javaScript
export default {
  setup(props, context) {
    // Attributes (Non-reactive object)
    console.log(context.attrs)

    // Slots (Non-reactive object)
    console.log(context.slots)

    // Emit Events (Method)
    console.log(context.emit)
  }
}
```