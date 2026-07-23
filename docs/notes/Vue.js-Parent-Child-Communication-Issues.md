
# Vue的父子通信问题

参考文档 :

- [Vue 组件组合](https://cn.vuejs.org/v2/guide/components.html#%E7%BB%84%E4%BB%B6%E7%BB%84%E5%90%88)
- [使用 props传递数据](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8-Prop-%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)
- [用v-on 绑定事件](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8-v-on-%E7%BB%91%E5%AE%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)

原理：

![](https://i.loli.net/2018/03/15/5aaa908be9564.png)



## 父子组件之间通信

例子代码 [Demo](http://jsbin.com/lakereliki/1/edit?html,js,output)

> 目的：点击打开显示 `div.son`，点击关闭隐藏 `div.son`

![](https://i.loli.net/2018/03/14/5aa93ff82475d.gif)



我们可以看到，父元素里面有一个子元素，使用在父元素中点击按钮控制子元素的展现和隐藏。

但是，**在子元素中却无法对自己进行操作，因为它的显示是由它父元素决定。而 `button` 无法控制 `child`**。

此时，解决办法为：

- 在`button`元素中添加事件，`<button @click="$emit('close')">关闭</button>`

- 父元素`child`中添加监听，`<child v-show="visible" @close="visible=!visible"></child>`

- 代码为： [Demo](http://jsbin.com/dasajenaje/1/edit?html,js,output)

  如图：
  ​
  ![](https://i.loli.net/2018/03/14/5aa93f6d39ac9.gif)

  ​


## 爷孙组件之间通信

上面我们演示了爸爸和儿子之间的通信，接下来我们来探索爷爷和儿子之间的通信

> 目的，爷爷控制孙子的状态，同时，孙子控制爷爷的状态

![](https://i.loli.net/2018/03/15/5aaa8b7044c13.gif)



这里，我们看到，从爷爷到孙子，中间经过了爸爸，因此，爷爷先要控制爸爸，然后爸爸控制儿子，即：

- 爷爷控制爸爸，爸爸控制儿子，即可实现爷爷控制孙子：
  即爷爷和爸爸之间，通过在爷爷的`data` 中保存 `xxx` 变量控制 孙子的显示状态 `visible`
- 代码为： [Demo](http://jsbin.com/memutulubo/1/edit?html,js,output)

![](https://i.loli.net/2018/03/15/5aaa8fff492a5.png)

- 同理，孙子要控制爷爷，那就要孙子告诉爸爸，爸爸再告诉爷爷，即：

  孙子事件冒泡给爸爸，爸爸再冒泡给爷爷，使用事件监听的方式逐级冒泡

![](https://i.loli.net/2018/03/15/5aaa93b8a989b.gif)

- 代码为 [Demo](http://jsbin.com/tocufitujo/1/edit?html,js,output)


## 兄弟组件之间通信

以下演示的是错误的答案：

以上实现了父子通信和爷孙通信，接下来的兄弟之间的通信就简单的多了

代码：  [Demo](http://jsbin.com/tilozegilu/1/edit?html,js,output)

效果如图

![](https://i.loli.net/2018/03/15/5aaa97fc2b507.gif)



正确的方法为：

代码:[Demo](http://jsbin.com/woyoponibu/1/edit?html,js,output)

```html
<body>
 <div id="app">
   <component-a></component-a>
   <component-b></component-b>
 </div>
  
  /*
  vue 代码如图所示
  */
let eventHub = new Vue()
Vue.prototype.$eventHub = eventHub


Vue.component('component-a',{
  template: `
<div>a<button @click="notify">button</button></div>
`,
  methods:{
    notify(){
//       this.__proto__ === Vue.prototype
      this.$eventHub.$emit('xxx','hi')
      console.log(12312312)
    }
  }
})


Vue.component('component-b',{
  template: `
  <div>b<div ref=output></div></div>
`,
  created(){
    this.$eventHub.$on('xxx',(data)=>{
      this.$refs.output.textContent = data
    })
  }
})

let app = new Vue({
  el: '#app',
})
  
```

具体使用的原理类似于 发布订阅模式 ，但是这里 需要把 eventHub 绑定到 Vue 的原型上，从而使得不同的组件可以相互通信。



## 小结：

我们发现，父子通信到爷孙通信 ，核心还是**“父子通信”** ，那么爷爷的爷爷和孙子的孙子通信怎么办？按照Vue的 文档要求只能从 “父子通信”出发，逐级网上冒泡或逐级往下绑定 `props`的值，特别麻烦 。

那么，有没有解决的办法呢？当然有，使用 `Redux`

面试官问 ：Vuex 有什么作用？

答：主要为了解决 爷孙通信的麻烦（简答）。



