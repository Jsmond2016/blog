---
isTimeLine: true
title: 初识express
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study

# 初识express

> 文件 `index-01.js`

## 资料

- [Express 中文网](https://www.expressjs.com.cn/) express 中文官网



## 安装

- `express`

```bash
yarn add express -D
```

- `http-server` 本地服务器，使用方式 `http-server -c-1`

```bash
yarn add http-server -g
```

- `nodemon` 是一种工具，可以**自动检测**到目录中的文件更改时通过**重新启动应用程序**来调试基于node.js的应用程序

```bash
yarn add nodemon -g
```

主要用于调试

## Hello，world

```js
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

## res.send && res.end

```js
/**
 * 了解 express
 */

const express = require('express')

const app = express()

app.get('/get', (req, res) => {
  // res.end('hello, world')
  // res.send('hello, world')
  
  // 报错，因为 end 方法 只接受字符串 
  // res.end({hello: 'name'})

  // 结果会被 JSON.Stringify()
  res.send({hello: 'name'})
})

app.listen(8080, () => console.log('server start at 8080'))
```

- `res.end(str)` ：参数**只接受字符串**；若为数据对象需要先 `JSON.stringify`
- `res.send(str | obj | buffer | array)` ：参数可以为字符串，也可以为 数据对象，最终结果都会被 `JSON.stringify`

更多内容：参考

-  [www.expressjs.com.cn/4x/api.html#res](https://www.expressjs.com.cn/4x/api.html#res)
- [Express中 res.json 和res.end 及res.send()](https://blog.csdn.net/m0_37263637/article/details/79753342)

## 验证

- 运行，浏览器打开下面的地址

```bash
node app.js

# preview

http://localhost:3000
```

