---
title: 数组的API
date: 2017-12-11 08:21:44
tags: 
  - JavaScript
  - Array
categories: JavaScript
---

目录：

1.`forEach()`

2.`sort()`

3.`join()&concat()&map()&filter()&reduce()`


- `forEach()` 遍历 接收一个函数作为参数，使用函数的方法进行遍历,这个函数必须 接受2个参数，分别为 `value` 和 `key` 
  具体举例：

  ```javascript
  var a = ['a','b','c','d']
  a.forEach(function(value,key){
  	console.log(value,key)
  })
  //a 0
  // b 1
  // c 2
  // d 3

  //forEach() 源代码为
  function forEach(array,x){
    for(let i =0;i<array.length;i++){
    		x(array[i],i)  //x表示为一个函数，内有2个参数，分别对应数组的 value 和 key
  	}
  }
  ```

- `sort()` 排序，底层原理使用的是[快排](http://bubkoo.com/2014/01/12/sort-algorithm/quick-sort/)，排序后自己会改变，因为自己给自己排序更节省内存空间
  使用介绍:

  ```javascript
  默认是从小到大排序
  var a =[8,2,6,4,7,3]
  a.sort() //[2, 3, 4, 6, 7, 8]
  ```

  - 默认情况下从小到大排序，如果我要从大到小排序呢？
    答：给它一个比较的方向。声明一个函数 ，必须写2个参数！返回值有三种类型 ，正值，负值，0

    ```javascript
    //自定义排序方向
    function(x,y){return x-y}
    function(x,y){return y-x}
    function(x,y){return 0}
    ```

    ```javascript
    a.sort(function(x,y){return x-y})
    //[2, 3, 4, 6, 7, 8]
    a.sort(function(x,y){return y-x})
    // [8, 7, 6, 4, 3, 2]
    ```


-   如何参照某个属性排序
                答：原理相同，使用对应的值替换掉上面的 x  和 y。如下面的例子

    ```javascript
                var students = ['小明','小红','小花']
                var scores = { 小明: 59, 小红: 99, 小花: 80 }

                对students按照分数高低从大到小排序？

                students.sort(function(x,y){
                	return scores[y] - scores[x];
                })
                //["小红", "小花", "小明"]

                对students按照分数高低从小到大排序？

                students.sort(function(x,y){
                	return scores[x] - scores[y];
                })
                //["小明", "小花", "小红"]
    ```

                ​

-   `join()&concat()&map()&filter()&reduce()` 

    - `join()` 合并数据，但是不会改变原来的值。
      例子和代码如下 ：

      ```javascript
      b = [1,2,3,4]
      b.join()  //"1,2,3,4"
      b.join('哈哈')  //"1哈哈2哈哈3哈哈4"
      ```

      特点：当 `xxx.join()` 没有传参数，就默认是 `,`  即  `xxx.join() <==> xxx.join(',')`

    - `concat()`  全称 ‘concatenate’  连接。

      - 简单用法：使用  `concat()` 连接两个值

      例子和代码如下：

      ```javascript
      a = [1,2,3]
      b= [4,5,6]
      a+b //"1,2,34,5,6"
      使用简单的 "+" 导致结果不是我们想要的，那么，我们使用 concat()试试
      a.concat(b)
      //生成一个新数组。
      //[1, 2, 3, 4, 5, 6]
      ```

      - 巧妙用法：复制另一个值，但是二者不相等。
        以数组为例，代码如下：

        ```javascript
        a = [1,2,3]	
        var b = a.concat([])  //传入参数为一个空数组
        b //[1, 2, 3]
        a === b //false  虽然二者数值是相等的，但是因为产生的是新数组，所以和原来的不同。
        ```

    - `map()` 映射。功能和 `forEach()` 相同，唯一不同的是 `map()`  有返回值，返回结果为一个新数组。而 `forEach()` 没有返回值。原来的值没有改变。
      使用例子如下:

      ```javascript
      a = [1,2,3,4]
      a.map(function(value,key){return value*2})  //这里的key没有别使用，可以按需求选择。
      //[2, 4, 6, 8]

      也可以使用箭头函数
      a.map(value=>value*3)
      //[3, 6, 9, 12]
      ```

    - `filter()` 过滤。和上面的使用方式相似，接收一个函数进行操作。原来的数值不改变。

      ```javascript
      a = [1,2,3,4,5,6,7,8,9,0]
      a.filter(function(value,key){
      	return value>=5  //筛选值大于等于5的值
      })
      // [6, 7, 8, 9, 0]
      a //[1,2,3,4,5,6,7,8,9,0]
      ```

    - 和 `map()` 结合使用

      ```javascript
      a = [1,2,3,4,5,6,7,8,9,0]
      a.filter(function(key,value){
      	return value>=5
      }).map(function(value,key){
      	return value*
      })
      // [18, 21, 24, 27, 0]
      ```

    - `reduce()` 减少，压缩
      代码示例:

      ```javascript
      //我们举一个求和的例子：
      a = [1,2,3,4,5,6,7,8,9,0]
      for(let i=0;i<a.length;i++){
        sum += a[i];
      }
      //45

      // 使用 reduce() 得到同样的结果。
      a.reduce(function(sum,n){	 //sum为之前的结果，n为当前的数字
      	return sum + n	 		//return 的结果作为下一次遍历的结果
      },0)  					   //sum 的初始值为0
      //45
      ```

      ​










参考链接：

> [sort-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
>
> [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)