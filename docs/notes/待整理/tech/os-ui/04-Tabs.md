# Vue3-Tabs 组件

## 如何检查子组件类型

我们看如下代码：

```js
<Tabs>
  <Tab title="导航1" />
  <Tab title="导航2" />
  <div>hello</div>
</Tabs>
```

这里， Tabs 和 Tab， div 是父子关系，Tab 通过 slot 的方式传入 Tabs 组件中，而我们想要的是 Tab 组件，但是用户也可能传入 div 等其他组件，那么我们如何判断 Tabs 的子组件是一个 Tab 类型呢？

通过 context.slots 可以获取到外层传入的子组件，里面有一个 defaults 函数，可以返回子组件的类型信息

```js
// Tabs.vue
setup(props, context) {
  const defaults = context.slots.defaults()
  console.log(defaults[0].type === Tab);
}
```