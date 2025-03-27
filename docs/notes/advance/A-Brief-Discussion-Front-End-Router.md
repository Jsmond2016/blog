
# 浅谈前端路由

## 什么是路由?

简而言之就是 `if...else...`

## 什么是前端路由？

暂且不说理论，我们通过一个个例子来理解前端路由。

## 小栗子

例1：我们来做一个状态切换，代码如下：

预览链接： [Demo](http://jsbin.com/revugakohe/edit?html,css,js,output)

![](https://i.loli.net/2018/03/18/5aae16b8269f1.gif)

此时，我们实现了以下效果：

- 点击`tab-1`，出现对应的 `content-1` 的内容
- 点击`tab-2`，出现对应的 `content-2` 的内容

现在，我们设置默认选中 `tab-1`，刷新页面以后，我们选中 `tab-2`，此时，我们刷新页面或者是将此页面分享给别人，打开页面以后又回到了 `tab-1`。

预览链接： [Demo](http://jsbin.com/zepuxewise/3/edit?html,css,js,output)

![](https://i.loli.net/2018/03/18/5aae18fab2167.gif)

那么，我们想，**怎么才能让我们当前页面状态在刷新以后不改变呢?**

> ​    大部分前端er都知道，`jsbin`最大的功能就是可以保存当前页面所有信息，在保存了当前链接以后，**当前页面的url会改变，记录了当前页面的状态信息**，即时刷新页面内容也不会丢失，这样有助于我们将代码分享给别人。
>
> 那么，我们怎样可以像 `jsbin` 一样可以保存当前页面的状态信息呢？

## 使用哈希

受到 `jsbin` 的启发，我们知道可以使用 `url` 来记录当前页面的信息，那么，我们怎么使用  `url` 来记录呢？

答案：**使用哈希来保存当前页面装状态信息**

通过上面的代码我们知道，当我们点击 `tab-1` 的时候会发生相应的变化，那么，我们可以通过 `index` 来记录用户点击的是第几个 `tab`， 使用`hash` 来记录这个状态。

预览链接： [Demo](http://jsbin.com/zepuxewise/5/edit?html,js,output)

![](https://i.loli.net/2018/03/18/5aae239ab4c91.gif)

此时，每个选中的 `li` 都有一个对应的`hash` 存入  `location` ，那么每次点击切换的时候都是通过获取它对应的 `hash` 来切换其状态。

同时，我们将链接复制到另一个窗口上打开依然是原来的状态，此时，我们就简单的实现了**刷新页面当前状态不改变，同时当前状态可分享给别人**

## 使用`< a href="" >`标签 和监听哈希变更事件

上面的例子我们看到，其实我们点击事件保存的就是形如 后缀为`#0`，`#1` 这样的`url` ，此时我们想，这不是和 `<a href="#0">` 很相似吗？那我们为什么不用 `<a href="">` 的锚点来切换对应的状态呢？

此时，我们点击 `tab` 的时候更改的是 `url` ，那么变化的是 `url` ，我们就不要监听 `click` 事件了，我们监听 `url` 吧。

通过mdn知道，监听 `url` 变化使用 [hashchange](https://developer.mozilla.org/zh-CN/docs/Web/Events/hashchange)

预览链接：[Demo](http://jsbin.com/serasibeqe/edit?js,output)

![](https://i.loli.net/2018/03/18/5aae2dcf4ef43.gif)

使用这种方式改变状态，突然见豁然开朗，原来使用简单的 `a` 标签也可以做到，同时 `js` 代码也精简了很多。

但是，这种方式也有一些问题，就是它容易被其他的 `a` 标签所覆盖，我们来看个例子：

假设当前页面有很多个 `p` 标签，下面有个**跳转到顶部的 `a` 标签。**

代码链接：[Demo](http://jsbin.com/serasibeqe/6/edit?html,js,output)

![](https://i.loli.net/2018/03/18/5aae3111cf5f7.gif)

原本我们已经选中了 `tab-2` ，但是点击了回到顶部以后**原来的状态被覆盖了**，因此在刷新页面的时候就没有了原来的状态，同时分享在其他窗口打开链接的时候也是如此。

## 使用路径代替锚点表示状态

上面的例子中我们知道，如果在 `a` 标签中使用锚点表示某个状态，容易被其他的锚点所覆盖，那么我们可以**使用路径来替换锚点表示状态**，形如 `<a href="/xxx"></a>`

此时，可能有人会说：不可能的，你如果**使用路径的话肯定是要跳转页面的**，而如果你后台如果没有这个路径对应的返回信息的话，**返回的肯定是 404**！注定跳转失败。

的确如此，但是，我们想要的是使用 `url` 来表示状态，而不是用其跳转页面啊，因此，我们只有一个办法：

**阻止`<a href="/xxx">` 的默认事件，使其不能跳转页面。**

代码链接：[Demo](http://jsbin.com/serasibeqe/edit?html,js,output)

![](https://i.loli.net/2018/03/18/5aae39919a8ee.gif)

部分代码说明

```js

selectTab()

$('tab').on('click','.nav > li > a',(e)=>{
  
  e.preventDefault() //阻止默认事件
  
  let a = e.currentTarget //获得当前选中的a
  
  let path = a.getAttribute('href') 
  //拿到结果为形如 "/tab1" 的路径。
  //此处不使用 a.attribute('href') 来获得对应 路径，因为返回为 
  //'http://127.0.0.1:8080/tab1' 的路径不是我们要的
  
  window.history.pushState({},'abc',path)  //  使用path路径添加一个状态
  selectTab()
})

```



此时，我们就可以很好的在实现状态切换的同时，不会受到 `a` 标签锚点的影响。

但是，此时的页面状态是可分享的吗？刷新以后是什么样的情况呢？

答案是：返回 404 ！因为 后台没有这个路径的路由信息。

![](https://i.loli.net/2018/03/18/5aae3a83e4bf8.gif)

此时，我们要自己写一个后端路由来模拟实现刷新页面后不跳转页面。即，当路径为 `/` 或者`/tab1` 或者 `/tab2` 的时候都是返回同一个页面。

前端代码链接 ：[Demo](http://jsbin.com/serasibeqe/13/edit?html,js)

后端核心代码如下：

```js
if(path === '/' || path === '/tab1' || path === '/tab2'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    let string = fs.readFileSync('./index.html','utf8')
    response.write(string)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }
```

预览效果：

![](https://i.loli.net/2018/03/18/5aae3dbd0067a.gif)



## 小结

以上，我们就实现了**无刷新更改页面状态** ，接下来我们来说一说什么是前段路由

```
<tab>
  <ol class="nav">
    <li><a href="./tab1">tab-1</a></li>
    <li><a href="./tab2">tab-2</a></li>
  </ol>
  <ol class="content">
    <li>content-1</li>
    <li>content-2</li>
  </ol>
</tab>
  <a href="/xxx">回到顶部</a>
```

上面代码中，因为后台代码已经对  `/` 和`/tab1` 和 `/tab2`  都是返回同一个 页面

此时我们再来回顾以下什么是**路由**：

就是你给我一个路径，我给你返回一个页面（后端路由）

你给我一个路径，我切换一个状态（前段路由）

**此处的 `tab-1`  和 `tab-2` 就是前端路由。** 点击   `a` 标签无跳转

**而 `<a href="/xxx">` 就是后端路由 ** ， 点击 `a` 标签跳转到 `/xxx` 路径

**以上的前端路由，也就是 Vue-Router  中 `<router-link></router-link>`的实现原理**

具体参考[Vue-Router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)

推荐阅读：

- [什么是前端路由](http://www.cnblogs.com/yuqing6/p/6731980.html)
- [前端路由的前生今世及实现原理](https://segmentfault.com/a/1190000011967786)

