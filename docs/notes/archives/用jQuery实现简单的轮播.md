---
title: 用jQuery实现简单的轮播
date: 2017-12-27 20:14:14
tags: "jQuery"
---

# 用jQuery实现简单的轮播

[预览](http://jsmond.info/homework/Dec/2.%E7%94%A8jQuery%E8%87%AA%E5%B7%B1%E5%86%99%E4%B8%80%E4%B8%AA%E8%BD%AE%E6%92%AD/index)

预备知识：

- flex 的使用
- js基础语法
- jQuery的基本使用
- `setInterval()`定时器的使用



## 轮播的原理

![轮播的原理](https://i.loli.net/2017/12/27/5a4300daec777.png)

![轮播原理](https://i.loli.net/2017/12/27/5a4305e36f7a1.png)

> 原理：窗口不动图片动！
>
> 好比是看电视一样，外层一个小窗口，里面的图片一帧一帧的变化，方向可以自己调试选择。

具体实现方法为：

​	让图片并排排列好，然后让在视口以外的图片隐藏，每次显示不同的图片的时候修改其CSS以控制器位置的变化，实现轮播。

## 第一步：手动添加图片切换效果

- 写好基本的结构（窗口、图片、具体每一张图片）
- 使用 flex 实现图片横向布局，
- 在flex中使用`align-items:flex-start;`解决图片压缩问题
  如果不是用这个样式设定，那么图片的布局将会随着窗口的大小而改变为纵向布局和横向布局
- 给`.window` 定宽高，使用 `overflow:hidden`将其他图片隐藏
- 使用`transform:translateX(n px)` 改变参数n的值以改变图片的位置

代码为

```html
 <style>
  .images{
    border:1px solid red;
    display:flex;
    align-items:flex-start;
    transform:translateX(-600px)
  }
    .window{
    width:300px;
    height:207px;
    overflow:hidden;
    border:1px solid green;
    }
    
  </style>
   
</head>
<body>
  <div class="window">
    <div class="images">
      <img src="https://i.loli.net/2017/12/27/5a430f3034252.png" width="300px">
      <img src="https://i.loli.net/2017/12/27/5a430f3040f46.png" alt="dog3" width="300px" >
      <img src="https://i.loli.net/2017/12/27/5a430f30423a2.png" width="300px" alt="ddog2">
    </div>
  </div>
</body>
```

[预览链接](http://js.jirengu.com/vifiziwasa/4/edit)

## 第二步：使用jQuery、按钮控制和过渡效果

> 我们使用按钮点击控制图片的位置，使用到jQuery 知识

- 给images添加id为 `id=images`
- 给定 `<button id=p1/p2/p3>`
- 引入jQuery，使用 jQuery 控制 CSS 样式
- 给images添加过渡效果  `transtion:transform 0.3s` 
  注意：这里不是给具体的图片添加过渡效果，而是给外层的`images` 添加，因为把三张 image 合并成一张图片了
- 注意细节：`$(id)` 、`$('#id')`和 `$('id')` 之间是有区别的，最后一个写法是错误的，前2个才是正确的，且前2个意思相同；

```html
 <head>
 <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
 <style>
  	.images{
	    border:1px solid red;
	    display:flex;
	    align-items:flex-start;
	    transition:transform  0.3s;  //添加过渡效果
  }
    .window{
	    width:300px;
	    height:207px;
	    overflow:hidden;
	    border:1px solid green;
    }
  </style>
  </head>
  
<body>
  <div class="window">
    <div class="images" id="images">  //设置id为 images以便于后面 jQuery 可以获取
      <img src="https://i.loli.net/2017/12/27/5a430f3034252.png" width="300px">
      <img src="https://i.loli.net/2017/12/27/5a430f3040f46.png" alt="dog3" width="300px" >
      <img src="https://i.loli.net/2017/12/27/5a430f30423a2.png" width="300px" alt="ddog2">
    </div>
  </div>
  <button id="p1">第1张</button>
  <button id="p2">第2张</button>
  <button id="p3">第3张</button>
  
<script>
	$(p1).on('click',function(){
  $(images).css({
    transform:'translateX(0)'
  })
})
$(p2).on('click',function(){
  $(images).css({
    transform:'translateX(-300px)'
  })
})
$(p3).on('click',function(){
  $(images).css({
    transform:'translateX(-600px)'
  })
})

</script>
</body>
```

[预览链接](http://js.jirengu.com/vifiziwasa/16/edit)

> 可能出现的问题：即点击切换图片的时候，图片可能会晃动，具体是什么原因呢？
>
> 排查img、button、宽高等因素后，发现原因在 `transform:translateX(n px)` 或者是浏览器是否放大或缩小了比例，
>
> 此时可以使用`margin-left: n px` 来替换 `transform:translateX(n px)` 获得同样的效果
>
> 但是，注意个问题，在使用 jQuery 控制 CSS 样式中，如果属性有 `-` 需要使用引号包裹起来，即写法为 
>
> ```javascript
> //错误写法
> $(p1).on(click,function(){
>   $(images).css({
>   margin-left:'-300px'
> 	})
> })
>
> // 正确写法
> $(p1).on(click,function(){
>   $(images).css({
>  'margin-left':'-300px'
> 	})
> })
> ```



## 第三步：轮播封装，支持无限张图片轮播

​	前面2步我们知道了轮播的基本思路就是点击按钮更改对应的CSS来得到轮播的效果，但是我们发现其中有很多的的重复代码，而且有些代码之间的有一定的逻辑关系，此时我们可以使用jQuery结合CSS进行封装

### 封装 1.0

```html
<body>
//略
</body>
<style>
images.position-1{
   margin-left:0px;
}
images.position-2{
  margin-left:-300px;
}
images.position-3{
  margin-left:-600px;
}
</style>
<script>
$(p1).on('click',function(){
  $(images).removeClass('position-2').removeClass('position-3').addClass('position-1')
})
$(p1).on('click',function(){
  $(images).removeClass('position-1').removeClass('position-3').addClass('position-2')
})
$(p3).on('click',function(){
  $(images).removeClass('position-2').removeClass('position-1').addClass('position-3')
})
</script>

```

​	上面虽然是简单的实现了基本的轮播封装，即如果有更多的图片，那么就要写更多的CSS，对应的jQuery也要增加，事实上代码都是一样的，只是参数值不同，因此我们可以再一次封装；

### 封装 2.0

​	要实现无限张图片的轮播，那么就要获得每一张图片的id，同时修改对应id的CSS样式

- DOM 对象封装成jQuery对象
  获得一个DOM对象，如何把它封装成一个jQuery对象？

  ```javascript
  //如果获得一个DOM 对象为 buttons[i] ，将其封装成 jQuery对象为 $(buttons[i])
  ```

- for 循环遍历得到节点的位置
  要获取一个元素在它父类元素的子节点中排第几个，如果是在DOM API中，就是使用  `for` 循环来获取

  ```javascript
   x var n //s节点的下标
   var children = s.parentNode.children  //得到s节点的父元素的所有子节点
   for(let i=0;i<children.length;i++){ 
   	if(children[i] === s){  
          n = i  // s 的下标值   
          break;	
          }
      }
  ```


- `$(id).index()` 的使用
  事实上，在jQuery中已经对其进行了封装，直接调用使用`$(id).index()`即可得到 id 在其父元素的子节点的第几个。

- `target` 和 `currentTarget` 的使用与[区别](https://jingyan.baidu.com/article/47a29f245e867fc01523996b.html)

- 字符串拼接 `transform:'translate('+n+'px)'  `



```html
<!DOCTYPE html>
<html>
<head>
<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>
  
  <style>
    .images{
    border:1px solid red;
    display:flex;
    align-items:flex-start;
    transition:transform 0.3s;
  }
    .window{
    width:300px;
    height:207px;
    overflow:hidden;
    border:1px solid green;
    }
    
  </style>
</head>
<body>
  <div class="window">
    <div class="images" id="images">
      <img src="https://i.loli.net/2017/12/27/5a430f3034252.png" width="300px">
      <img src="https://i.loli.net/2017/12/27/5a430f3040f46.png" alt="dog3" width="300px" >
      <img src="https://i.loli.net/2017/12/27/5a430f30423a2.png" width="300px" alt="ddog2">
    </div>
  </div>
<span id="allButtons">
  <span id="p1">第1张</span>
  <span id="p2">第2张</span>
  <span id="p3">第3张</span>
</span>
  
  <script>
  var allButtons =  $('#allButtons>span')
  for(let i=0;i<allButtons.length;i++){
  $(allButtons[i]).on('click',function(xxx){
    var index = $(xxx.currentTarget).index()
    var n = index  * -300  //定义个偏移数值，即每个不同的子节点对应的偏移量不同
    $('#images').css({
      transform:'translate('+n+'px)'  //使用字符串拼接
    })
  })
}
  </script>
  
</body>
</html>
```

其中，jQuery代码缩短为几行就实现了任意数量的轮播，核心代码如下：

```javascript
  <script>
  var allButtons =  $('#allButtons>span')  //获得span节点，通过span节点切换到对应的图片
  for(let i=0;i<allButtons.length;i++){   //遍历得到每个span节点
    $(allButtons[i]).on('click',function(xxx){ 
      var index = $(xxx.currentTarget).index()
      var n = index  * -300  //定义个偏移数值，即每个不同的子节点对应的偏移量不同
      $('#images').css({
        transform:'translate('+n+'px)'  //使用字符串拼接
      })
    })
  }
  </script>
```

- `transform:translate(npx)` === `transform:translateX(npx)`

  ​上面我们发现，及时使用 `transform:translate(npx)` 也能得到 `transform:translateX(npx)` 相同的效果，那么这两个属性是等价的吗？
  答案是肯定的，具体参考 [translate-mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)



[封装2.0-预览链接](http://js.jirengu.com/muqezacoyo/2/edit)

### 封装 3.0  实现自动播放

原理：定时器的使用

- `setInterval` 的使用
  首先，我们每隔1秒打印出一个数字

  ```javascript
  var n = 0
  setInterval(()=>{
    n += 1
    console.log(n)
  },1000)
  ```

  ​	然后，我们想，既然可以每隔一秒打印出一个数，是否可以每隔一秒点击下对应的 `span`呢 ？当然可以
  但是，有一个问题，因为图片的数量是有限的个数，那么图片就要循环播放，同时意味着要循环点击，此时就要使用到 求余

  ```javascript
  var n =0 //定义一个变量
  var size = allButtons.length  //获得span的个数
  setInterval(()=>{  //定时器
    n += 1
   allButtons.eq(n%size).trigger('click').addClass('red').siblings('.red').removeClass('red')
  },1000)
  ```

  ​

- `allButtons.eq(n%3) ` 找出对应的DOM，并且把对应的DOM封装成对应的jQuery对象

- 使用`trigger()` 执行事件

- `.siblings('.red')` 找到 `allButtons.eq(n%size)` 的CSS样式为 `red` 的兄弟，注意这里不是一个类名，而是一个选择器 `siblings('.red')`

- `.removeClass('red')` 上一步中找到对应的兄弟，移除他们的 `red` 样式


最终效果：

```javascript
//js代码如下
var allButtons =  $('#allButtons>span')
for(let i=0;i<allButtons.length;i++){
  $(allButtons[i]).on('click',function(xxx){
    var index = $(xxx.currentTarget).index()
    var n = index  * -300
    $('#images').css({
      transform:'translateX('+n+'px)'
//       transform:'translate('+n+'px)'
    })
  })
}

// 定时器实现自动轮播
var n =0
var size = allButtons.length
setInterval(()=>{
  n += 1
 allButtons.eq(n%size).trigger('click').addClass('red').siblings('.red').removeClass('red')

},1000)
```

[封装3.0-预览效果](http://js.jirengu.com/yowacelige/4/edit)

### 封装4.0 鼠标事件的介入

​	前面计次封装实现了简单的轮播和轮播的优化，由点击按钮轮播到自动轮播，那么，还有一种情况没有考虑进去，就是鼠标移入和移除的情况下，图片应该是不动，然后恢复到原来的动作的。

​	这样，就要对定时器的代码进行简单的修改。

> 原理：鼠标移入和移出是相对于图片显示窗口的，即 `.window` ，所以要对 `.window` 进行事件监听

```javascript
var timeId = setInterval(()=>{
  n += 1;
 allButtons.eq(n%size).trigger('click').addClass('red').siblings('.red').removeClass('red')
},1000) //对setInterval进行封装

$('.window').on('mouseenter',function(){
  window.clearInterval(timeId)
})
$('.window').on('mouseleave',function(){
   timeId = setInterval(()=>{
    n += 1;
 allButtons.eq(n%size).trigger('click').addClass('red').siblings('.red').removeClass('red')
  },1000)
})
```

[封装4.0-预览链接](http://js.jirengu.com/vifiziwasa/26/edit)



参考链接：

[轮播的原理-知乎](https://www.zhihu.com/question/28720980)

[轮播案例](http://idangero.us/swiper/demos/)


