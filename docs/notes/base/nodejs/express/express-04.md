---
isTimeLine: true
title: 解析请求体
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 解析请求体

## 前言

express 自带处理 get 请求参数的功能，通过 `req.query` 可以拿到 get 类型请求的查询参数

**但是，express 没有处理 post 类型的请求 body，**需要手动处理，使用方式为 `express.urlencoded()` ，这个本质上使用的是 `body-parser` 这个依赖

当前 express 是自带 `body-parser` 的，但是其官方宣称在未来的将不会自带支持 `body-parser` ，但是会保留接口，为此，后面使用的时候，若不能使用，安装 `body-parser` 即可

## 安装



```bash
yarn add body-parser -D
```



## 基本语法

支持以下格式的处理：

- `application/x-www-form-urlencoded` Form表单
- `application/json` JSON格式
- `text/plain` 纯文本
- `text/html`  HTML 文本
- 以及 其他某些格式

官方 demo：

```js
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```



- [Express中间件body-parser](https://www.jianshu.com/p/cd3de110b4b6)
- [npm/body-parser](https://www.npmjs.com/package/body-parser)

## 使用

```js


/** 
 * 接受参数处理
 * 
 * req.query
 * 
 * req.body 需要使用插件 body-parser 才可以拿到
 * 
 * 当前 express 自带 body-parser，使用 express.urlencoded() 即可
 * 
 * 但是 express 官方说未来可能不会继续支持 body-parser，因此可能需要自己安装 body-parser
 * 
 * 但是当前可以继续用
 * 
 */

 const express =  require('express')
 const router = express.Router()
 const app = express()

 

//  通过 req.url 可以 拿到完整的访问路径
//  通过 req.query 可以拿到完整 处理好的参数
 router.get('/query', (req, res) => {
  console.log(req.url);
  
  // /query?a=1&b=2

  console.log(req.query);
  // { a: '1', b: '2' }
 })

 router.post('/post', (req, res) => {
   console.log(req.body);
 })

//  直接挂在一个解析请求体的方式，bodyParser，req 里面就有了 body
//  位置放在最前面
 app.use(express.urlencoded())

// 等价于 下面的代码，加入 {extended: 'false'} 参数表示不是 类实例
// 详情参考：https://github.com/expressjs/body-parser#readme
// const bodyParser = require('body-parser)

// 解析 表单格式 application/x-www-form-urlencoded
// app.use(bodyParser({extended: 'false'}))

// 解析 json 格式
// app.use(bodyParser.json())

 app.use(router)

 app.listen(8080, () => {
   console.log('listening at port 808')
 })
```



## 测试

- vs code 安装插件 `rest client` 插件，功能类似 `postman`
- 语法：比较简单，插件的 README 有简单介绍
- 编写接口测试 `test.http`

```http
# index-06
### 
get http://localhost:8080/query?a=1&b=2


###
POST http://localhost:8080/post HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name=foo
&password=bar

```

- [github/rest-client](https://github.com/rest-client/rest-client)

## 验证

```
node index-06.js

# 直接在 test.http 点击 Send Request 即可
```

