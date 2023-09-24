---
isTimeLine: true
title: 了解后端路由
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 了解后端路由

> 文件： `index-02.js, index-03.js, index-04.js, /04/` 

## 使用

```js
/**
 * 配置后端路由
 */

const express = require('express')

const app = express()

// ----------------------
// 拿到一张空的 路由表，以下代码 可以抽离到 ./router.js 文件中
const router = express.Router()

router.get('/test', (req, res) => {

  res.end('get - method')

})

router.post('/test', (req, res) => {

  res.end('post - method')

})

router.delete('/test', (req, res) => {

  res.end('delete - method1')

})
// ------------------------

// use ，告诉 app 对象
app.use(router)

app.listen(8080, () => console.log('server start at 8080'))
```



## 抽离

- 新建 `/04/userRouter.js`

```js
/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.end('get - users-test')
})

router.post('/test', (req, res) => {
  res.end('post - users-test')
})

router.delete('/test', (req, res) => {
  res.end('delete - users-test')
})

module.exports = router
```

- 新建 `/04/goodsRouter.js`

```js
/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.end('get - goods-test')
})

router.post('/test', (req, res) => {
  res.end('post - goods-test')
})

router.delete('/test', (req, res) => {
  res.end('delete - goods-test')
})


module.exports = router
```

- 新建 `index-04.js` 

```js
/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const app = express()

const userRouter = require('./04/userRouter')
const goodRouter = require('./04/goodsRouter')

// 按照业务逻辑分类 /user ,  /good
app.use('/user', userRouter)
app.use('/good', goodRouter)

app.listen(8080, () => console.log('server start at 8080'))
```



通过抽离 router，可以按照业务逻辑分类后端路由，便于维护代码

## 注意

- 路由的定义方式： `const router = express.Router()`
- 定义后的路由，都需要被 use：`app.use(router)`

## 测试验证

```bash
node index-02.js
# node index-04.js

# preview

http://localhost:8080
```

