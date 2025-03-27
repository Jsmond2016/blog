---
title: jQuery轮播（二）：无缝轮播
date: 2018-0117
tags: 
  - jQuery
---

# jQuery轮播（二）：无缝轮播

> 预备知识

- JavaScript基础知识
- `flex` 的使用
- CSS3的 `transform` 的使用





[预览戳我](https://jsbin.com/rojovirozo/1/edit?html,css,js,output)

## 思路：集体跳绳

![](https://i.loli.net/2018/01/03/5a4ca0683b595.png)

> 如上图所示，
>
> A、B、C三人跳绳，他们跳完以后进入下一轮的时候，
>
> A就到了A' 的位置，即在C后面
>
> B就到了B' 的位置，C就到了 C' 的位置
>
> 每个人跳完以后就又一次回到了队伍的最后面重新排队

​	上一次轮播中，我们是把ABC看成一个整体，即一张图片，在切换的时候无法达到无缝轮播的效果。因此，为了达到无缝轮播的效果，必须摒弃上一次的做法，那么，该怎么处理呢？

​	答：如上图“集体跳绳”作为思路，即将每张图片单独看成一个整体，这样的情况下要使图片的位置变动，就必须使用绝对定位对图片的位置进行改变。

​	 同时，像上面跳绳的小伙伴一样，每次跳完以后，它就自己回到队伍的最后面重新轮一次；同理，对于每一张图片，一旦它轮播完成以后，就回到最后一张图片的位置后面。



## 无缝轮播 1.0

部分代码

```html
<body>
	<div class="window">
		<div class="images">
			<img src="./img/1.png" alt="图片" width="400" height="300">
			<img src="./img/2.png" alt="图片" width="400" height="300">
			<img src="./img/3.png" alt="图片" width="400" height="300">
		</div>
	</div>
	<script src="./jquery-3.2.1.js"></script>
	<script src="./main.js"></script>
</body>
```

```css
*{margin:0;padding:0;}
*{box-sizing:border-box;}
.window{
	width: 400px;
	height: 300px;
	margin:20px auto;
	overflow: hidden;
}
.images{
	position: relative;
}
.images>img{
	width: 100%;
	transition: all .3s;
}
/*使用绝对定位移动图片*/
.images>img:nth-child(1){
	position: absolute;
	top: 0;
	left: 0;
}
.images>img:nth-child(2){
	position: absolute;
	top: 0;
	left: 100%;
}
.images>img:nth-child(3){
	position: absolute;
	top: 0;
	left: 100%;
}
.images>img.right{ /*用于切换控制图片到最后一个位置*/
	position: absolute;
	top: 0;
	left: 100%;
}

```

```javascript
//逻辑：在视口中，第一张图片移动到左边，同时第二张图片跟随图片一移动到视口位置
//上述动作完成后，第一张图片移动到最后一个位置，即“重新站队”
setTimeout(function(){
	$('.images>img:nth-child(1)').css({
		transform:'translateX(-100%)'
	})
	$('.images>img:nth-child(2)').css({
		transform:'translateX(-100%)'
	})
	$('.images>img:nth-child(1)').one('transitionend',function(e){ //one  的使用，表示只执行一次，然后就自动失效
		$(e.currentTarget).addClass('right').css({
			transform:'none'
		})
	})
},1000)
setTimeout(function(){
	$('.images>img:nth-child(2)').css({
		transform:'translateX(-200%)'
	})
	$('.images>img:nth-child(3)').css({
		transform:'translateX(-100%)'
	})
	$('.images>imig:nth-child(2)').one('transitionend',function(e){
		$(e.currentTarget).addClass('right').css({
			transform:'none'
		})
	})

},2000)

setTimeout(function(){
	$('.images>img:nth-child(3)').css({
		transform:'translateX(-200%)'
	})
	$('.images>img:nth-child(1)').css({
		transform:'translateX(-100%)'
	})
	$('images>img:nth-child(3)').one('transitionend',function(e){
		$(e.currentTarget).addClass('right').css({
			transform:'none'
		})
	})
},3000)
```

- 为什么要使用 `setTimeout` ？

  答：为了实现轮播的间隔时间内自动轮播
  ​

- `$('.images>img:nth-child(1)').one('transitionend',function(e)` 中的 `.one()` 什么意思？

  答：目的是表示执行完当前动作以后就自动失效，原来的代码为
  `$('.images>img:nth-child(1)').on('transitionend',function(e)` 使用 `on` 的后果是，给图片添加了 `right` 类以后没有消除，从而影响了后面继续轮播，解决办法还要在每次轮播之前检查以下是否有  `class` 类，如果有的话就删除，没有就添加。
  为了避免这个繁琐的判断 ，直接使用 `one` 的 效果直接代替了前面的判断 ，高效简单。
  ​

- `$('.images>img:nth-child(1)').one('transitionend',function(e)` 中的  `transitionend`  什么意思？
  答：表示**过渡完成以后的状态**，如果过渡状态完成以后，就开始执行后面的函数。

### 小结

上述代码中，我们直接使用了JavaScript 操作 CSS，这在实际开发中是不可取的，同时，移动图片的位置的代码实际上是一样的，那么我们可以进行优化。

## 无缝轮播 2.0

> 使用JavaScript 操作 `class` ，而不是直接使用JavaScript写css
>
> 同时对移动移动图片的思路进行总结。

部分代码

```css
*{margin:0;padding:0;}
*{box-sizing:border-box;}
.window{
	width: 400px;
	height: 300px;
	margin:20px auto;
	overflow: hidden;
}
.images{
	position: relative;
}
.images>img{
	width: 100%;
	position: absolute;
	top: 0;
	transition: all .3s;
}

/*当前视口位置*/
.images>img.current{
	left: 0;
	transform: translateX(0);
	z-index: 1;
}
/*离开状态：左边*/
.iamges>img.leave{
	transform: translateX(-100%);
	z-index: 1;
}
/*进入状态：右边 */
.images>img.enter{
	transform: translateX(100%);
}
```

```javascript
$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')

setTimeout(()=>{
	$('.images > img:nth-child(1)').removeClass('current').addClass('leave').one('transitionend',(e)=>{
		$(e.currentTarget).removeClass('leave').addClass('enter')
	})
	$('.images > img:nth-child(2)').removeClass('enter').addClass('current')
},3000)

setTimeout(()=>{
	$('.images >img:nth-child(2)').removeClass('current').addClass('leave').one('transitionend',(e)=>{
		$(e.currentTarget).removeClass('leave').addClass('enter')
	})
	$('.images >img:nth-child(3)').removeClass('enter').addClass('current')
},6000)

setTimeout(()=>{
	$('.images >img:nth-child(3)').removeClass('current').addClass('leave').one('transitionend',(e)=>{
		$(e.currentTarget).removeClass('leave').addClass('enter')
	})
	$('.images >img:nth-child(1)').removeClass('enter').addClass('current')
},9000)

```



- 在CSS中，为什么使用 `z-index`  

  因为三张图片一开始的时候位置是在一起的，那么后面的图片会覆盖前面的第一张，即让 `current` 状态的图片的层叠优先级最高。

- 在 js 代码中，首先安排好视口和最后一张图片的位置，然后在后面的代码中直接操作对应的 `class` 即可避免js直接操作 css 导致代码混乱。

### 小结 

上面的js代码中依然重复性太大，因此我们对其中的变量进行优化。



##  无缝轮播 3.0

```javascript

let n
init()
setInterval(()=>{
	makeLeave(getImage(n)).one('transitionend',(e)=>{
		makeEnter($(e.currentTarget))
	})
	makeCurrent(getImage(n+1))
	n+=1
},3000)





//以下为封装函数，可以不看

function x(n){
  if(n>3){
  	n = n%3
  	if(n===0){
  		n=3
  	}
  }
  return n
}

function init(){
	n = 1
	$(`.images > img:nth-child(${n})`).addClass('current').siblings().add('enter')
}
function makeCurrent($node){
	$node.removeClass('leave enter').addClass('current')
	return $node
}
function makeLeave($node){
	$node.removeClass('current enter').addClass('leave')
	return $node
}
function makeEnter($node){
	$node.removeClass('leave current').addClass('enter')
	return $node
}

function getImage(n){
	return $(`.images > img:nth-child(${x(n)})`)
}
```

- 使用模板字符串获得图片的对应的节点 
- 移除多个 class 语法，中间使用空格 `$node.removeClass('current enter')` 

### 小结 

1. 此时封装完成以后，可以任意更换图片的数量，但是在js代码中不需要修改
2. 可以任意修改轮播的出现方向，当前为从右往左，可以修改为从左往右，从上往下，从下往上，只需要修改对应的css代码即可 。





