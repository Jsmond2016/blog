---
isTimeLine: true
title: 配置静态资源
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 配置静态资源

> 文件：`index-05.js, public/, views/ `

## 资料

- [express.staic](http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express)

## 需求

- 静态文件如 图片，js，css 等实现 `http://xxx.yyy.com/name` 直接预览源文件
- 服务端渲染，直接在 `html` 中引入文件： `<script src="./node_modules/jquery/dist/jquery.min.js">`

若要实现这样的需求，需要将对应的代码文件配置到静态目录中

## 基本使用方式

```js
express.static(root, [options])

app.use(express.static('public'))
```



## 使用

- 新建 `index-05.js`

```js
/**
 * 配置后端路由-静态资源
 */

const express = require('express')
const app = express()
const fs = require('fs')

const router = express.Router()
router.get('/index', (_, res) => {
  fs.readFile('./views/index.html', 'utf8', (err, data) => {
    if (err) return
    res.send(data)
  })
})


// 预览地址：http://localhost:8080/index/index

// 01-先配置静态资源 目录，通常会配置 2种类型，
// 一种是本地资源 如 css，js，图片等
// 另一种是 第三方资源
// 直接访问：http://localhost:8080/public/1.css
app.use('/public', express.static('./public'))
// 配置第三方资源，在 index.html 中使用
app.use('/node_modules', express.static('./node_modules'))
// 02-在 html 中引入静态资源，才可以引入
app.use('/index', router)

app.listen(8080, () => console.log('server start at 8080'))
```

这里配置了几个文件夹为静态文件夹

- `node_modules`
- `public` 

新建目录：

- `public/css/1.css`

```css
h2 {
  color: red;
}
```

- `public/js/index.js`

```js
alert('hello')
```



那么，在 `index.html` 中使用的时候

- 新建 `./views/index.html`

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/css/1.css">
  <title>Document</title>
</head>
<body>
  <h2>hello, world</h2>

  <script src="../public/js/index.js"></script>
  <script src="../node_modules/jquery/dist/jquery.js"></script>
  <script>
    console.log($)
  </script>
</body>
```



此时，启动服务可以发现， 该 `html`  文件 应用了 样式，js，以及拿到了 `node_modules` 里的 `jquery`



## 注意

配置静态资源，通常会配置 2 种类型：

- 一种是本地资源 如 css，js，图片等
- 另一种是 第三方资源，如 jquery 等

## 测试

```bash
node index-05.js

# preview

http://localhost:8080/index/index
```

