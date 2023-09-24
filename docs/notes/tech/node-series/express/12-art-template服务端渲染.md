---
isTimeLine: true
title: 使用art-template 服务端渲染
date: 2021-01-24
tags:
 - Express
 - Nodejs
---


> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 使用art-template 服务端渲染

> 代码地址：文件夹 `10` 和 `index-10.js`



## 资料

- [art-template](https://aui.github.io/art-template/zh-cn/docs/) 一个简约、超快的模板引擎。
- [express-art-template](https://github.com/aui/express-art-template#readme) art-template for express

使用案例：

- [art-template 语法](https://aui.github.io/art-template/zh-cn/docs/syntax.html)
- [express-art-template 示例代码](https://github.com/aui/express-art-template/blob/master/test/index.js)

## 安装

```bash
yarn add art-template express-art-teplate -D
```

虽然在使用的时候只会使用到 `express-art-teplate` ，但是它 依赖于 `art-teplate` 

## 使用

- 新建文件 `01/login.html, 01/index.html`

```html
<!-- login.html -->
<body>
  <h2>{{status}}</h2>
</body>

<!-- index.html -->
<body>
  <h2>{{status}}</h2>
  <h2>{{name}}</h2>
</body>
```



- 编写 js 代码

```js
const express = require('express')
const expressArtTpl = require('express-art-template')

const app = express()
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login.html', { status: '请登录'})
})

router.get('/index', (req, res) => {
  res.render('index.html', { status: '已登录', name: '黄同学'})
})

// 配置模板类型
app.engine('html', expressArtTpl);
// 配置模板 所在目录
app.set('views', __dirname + '/10');
app.use(router)


app.listen(8080, () => {
  console.log('server start at port 8080');
})
```



## 注意要点

- 可以设置 `express-art-template` 的配置

```js
app.engine('html', require('../'));
app.set('views', __dirname + '/views');
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
```

这里是容易犯错的地方，没有设置的话默认读取当前目录的 `views` 文件夹，如果没有文件就报错

- 服务端渲染传参，`res.render(template, params)`

模板文件会默认读取传入的 `params` 参数

## 验证

```bash
node index.js

# 预览地址
http://localhost:8080/login
http://localhost:8080/index
```

