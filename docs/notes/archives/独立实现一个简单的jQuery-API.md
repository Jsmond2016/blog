---
title: 独立实现一个简单的 jQuery API
date: 2017-12-21 12:43:23
tags: 
  - jQuery
---

# 独立实现一个简单的 jQuery API

## 1.需求

 如下的代码结构：

```html
<body>
	<ul>
		<li>第1个</li>
		<li>第2个</li>
		<li>第3个</li>
		<li>第4个</li>
		<li>第5个</li>
	</ul>
</body>
```



需求为：

```javascript
window.jQuery = ???
window.$ = jQuery

var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi
```



## 2.思路分析

思路：

- 写一个方法 ，找到这个节点
- 写一个 `addClass`方法，实现给找到的节点 添加样式
- 写一个 `setText` 方法，实现给找到的节点 设置内容
- 对以上方法进行封装

## 3.具体方法

### 3.1 `findNodesOrSelector` 方法，找到这个节点

>为了找到这个节点，传入的参数可能是一个id，也有可能是一个字符串即 `ul>li>span>a` 等，所以要分情况分析

```javascript
function findNodesOrSelector(nodeOrSelector){
  let nodes ={}
  //判断传进来的参数是否为  节点还是字符串
  if(typeof nodeOrSelector ==='string' ){  //当传入得到参数为字符串时
  let temp = document.querySelectorAll(nodeOrSelector)  //伪数组
		for(let i=0;i<temp.length;i++){
			nodes[i] = temp[i]
		}
	nodes.length = temp.length
	} else if(nodeOrSelector instanceof Node){ //当传入得到参数为节点时
		nodes = {
			0:nodeOrSelector,
			length:1
			}
	}
	return nodes
}
```

### 3.2 `addClass` 方法，给找到的节点 添加样式

> 因为给找到的节点添加样式，所以要传入一个参数；
>
> 同时，对已经找到的节点一般情况下不是只有一个，那么我们添加样式的时候也是不止给一个节点添加样式，因此，需要对每个节点分别添加，就要依次对节点进行遍历。

```javascript
 function addClass(classes){  
 	classes.forEach((value)=>{   //使用箭头函数，第一个参数是this即classes
    	for(let i=0;i<nodes.length;i++){     
        	nodes[i].addClassList.add(value)	
        }
    })  
 }
```

### 3.3 `setText` 方法，给找到的节点 设置内容

和上面的方法一样，先找到需要改变的节点，对它依次遍历后再设置其内容

同时，传入一个参数，即需要改变之后的参数

```javascript
function setText(text){
  for(let i=0;i<nodes.length;i++){
 	 nodes[i].textContext = text
	}
}
```

### 3.4 `getText` 方法，获得节点内的文本内容 

```javascript
function getText(){
		var texts = []
		for(let i=0;i<texts.length;i++){
			texts.push(nodes[i].textContext)
		}
		return texts
	}
}
```





## 4.拓展封装

### 4.1第一次封装：对以上方法进行封装

```javascript
		window.jQuery = function(nodeOrSelector){
			let nodes={}
			//判断传进来的参数是否为  节点还是字符串
			if(typeof nodeOrSelector ==='string' ){
				let temp = document.querySelectorAll(nodeOrSelector)  //伪数组
				for(let i=0;i<temp.length;i++){
					nodes[i] = temp[i]
				}
				nodes.length = temp.length
			} else if(nodeOrSelector instanceof Node){ //当传入得到参数为节点时
				nodes = {
					0:nodeOrSelector,
					length:1
				}
			}

			nodes.addClass = function (classes){
				classes.forEach((value)=>{
					for(let i=0;i < nodes.length;i++){
						nodes[i].classList.add(value)
					}
				})
			}

			nodes.getText = function(){
				var texts = []
				for(let i=0;i<texts.length;i++){
					texts.push(nodes[i].textContext)
				}
				return texts
			}

			nodes.setText = function(text){
				for(let i =0;i<nodes.length;i++){
					nodes[i].textContent = text
				}
			}

			return nodes
		}
```

但是通常情况下，在jQuery中不喜欢使用get和set方法，那么，还要进行第二次封装；

即：

当我不传参数的时候默认我是要获取节点内容

当我传入参数时，说明我要给节点设置内容

### 4.2 对 get 和 set 方法进行封装

```javascript
function text(text){
	if(text === undefined){
		var texts = []
		for(let i=0;i<texts.length;i++){
			texts.push(nodes[i].textContext)
		}else{
			for(let i =0;i<nodes.length;i++){
				nodes[i].textContent = text
		}
}

```

### 4.3 第三次封装

```javascript
		window.$ = function(nodeOrSelector){
			let nodes={}
			//判断传进来的参数是否为  节点还是字符串
			if(typeof nodeOrSelector ==='string' ){
				let temp = document.querySelectorAll(nodeOrSelector)  //伪数组
				for(let i=0;i<temp.length;i++){
					nodes[i] = temp[i]
				}
				nodes.length = temp.length
			} else if(nodeOrSelector instanceof Node){ //类型校验：判断是否为节点
				nodes = {
					0:nodeOrSelector,
					length:1
				}
			}

			nodes.addClass = function (classes){
				classes.forEach((value)=>{
					for(let i=0;i < nodes.length;i++){
						nodes[i].classList.add(value)
					}
				})
			}
			return nodes
			}

			nodes.text = function(text){
				if(text === undefined){
					var texts = []
					for(let i=0;i<texts.length;i++){
						texts.push(nodes[i].textContext)
					}
				}else{
					for(let i =0;i<nodes.length;i++){
					nodes[i].textContent = text
				}
			}


```



此时，我们就可以直接使用 `$('xxx')` 进行访问啦...

