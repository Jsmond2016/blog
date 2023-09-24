---
isTimeLine: true
title: Express 中 session 的使用
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# Express 中 session 的使用

## 安装

```bash
yarn add cookie-parser express-session connect-mongo cors -D
```

## express-session 的基本使用

因为 session 会操作 cookie，因此这里我们也会使用到 `cookie-parser` 来操作 cookie 

**基本流程：**

- 前端登陆请求
- 服务端验证账号通过后，将用户 id 写入 session 中，存储在 `req.session`
- 后面所有接口都要验证接口是否登录，从 `req.sesson` 中取用户信息，判断是否有效（合法性，有效期内）

1.初始化代码

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const app = express()
const router = express.Router()

/** session 配置信息 */
const sessonConfig = {
  secret: 'test-session', // 加密口令
  name: 'seession_id', // 设置 cookie  的  name
  saveUninitialized: true, // 未初始化的时候是否需要存储内容，默认是 true
  resave: true, // 重新存储，一般设置成true，表示每次 session 修改后都会重新存储，避免 sessionId 被盗用
  cookie: {  // 设置 cookie 的相关属性。如过期时间 cookie: { maxAge: 1000 * 60 * 60 * 24 } 表示有效期 1 天
    maxAge: 1000 * 30 // 30秒后失效，避免 重新打开 浏览器 登录态失效
  },
}

// 设置 session
router.post('/set-session', (req, res) => {
    const { name } = req.body
    req.session.name = name
    console.log(req.session);
    res.end("ok")
})



app.use(bodyParser.urlencoded({ extended: false }))
// 使用 session 中间件和配置 session 信息
app.use(expressSession(sessonConfig))
app.use(router)

app.listen(8080, () => {
    console.log('listen at port 8080');
})

```

**注意：**这里若不配置 `sessonConfig` 则访问会报错

关于 `sesssionConfig` 配置，有这几个参数：

|         参数          |                             作用                             |
| :-------------------: | :----------------------------------------------------------: |
|      **secret**       | **一个 String 类型的字符串，作为服务器端生成 session 的签名。** |
|       **name**        | **返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。** |
|      **resave**       | **强制保存 session 即使它并没有变化,。默认为 true。也可以设置成 false。 don't save session if unmodified** |
| **saveUninitialized** | **强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。(默 认:true)。建议手动添加。** |
|      **cookie**       | **设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。** |
|      **rolling**      | **在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)** |



**测试：**

```http
### test.http
POST http://localhost:8080/set-session HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name="hello"&password="123"
```

**打印的信息：**

```js
Session {
  cookie: {
    path: '/',
    _expires: 2021-01-24T03:18:22.198Z,
    originalMaxAge: 30000,
    httpOnly: true
  },
  name: '"hello"'
}
```

对于 session 的操作主要也是 **设置和取值**，具体做法也很简单，需要注意的就是 session 的配置信息，过期时间等。

**特点：**

- `express-sesion` 是需要结合 `cookie` 一起使用的，它会自动操作 `cookie`
- 使用 `express-session` 后，会在 req 新增一个属性 `req.session`，是一个对象空间，可以往里面添加一些成员内容
- 当使用 `express-session` 时，会生成一个 `session_id` 写在 `cookie` 中，它会将这个 `session_id` 分成 2 半，一半在 `cookie` ，一半在 服务器中

## express-session 的持久化

因为 session 是一直保存在内存里，就会导致一个问题，一旦服务器重启，服务器内存中所有的 `session` 信息就丢失了，那么客户端的 `sessionId` 就无效了

解决这个办法，需要使用到**持久化存储**方案：

- 存储到 数据库，需要配置 `config.store`
  -  若我们存在数据库 MongoDB 中，则依赖一个第三方插件 `connect-mongo`
  - 若我们使用 `redis` 存储方案，则依赖第三方插件 `connect-redis`

 ### 使用 MongoDB 持久化

- 安装依赖：`yarn add connect-mongo -D`
- 使用：

```js
// 这里只展示关键代码
const expressSession = require('express-session')
const connctMongo = require('connect-mongo')

//  关联 session
const MongoStore = connctMongo(expressSession)

// 配置 store 信息
const storeConfig = {
    url: 'mongodb://localhost:27017/gp19', // 配置 MongoDB 地址和数据库名
    // touchAfter 参数：自动延长过期时间：表示这个时间内，如果你重新登陆了，它会自动将 过期时间帮你顺延
    // 这里不推荐设置, 如果要设置最多设置 1 天，否则对服务器压力大
    touchAfter: false 
}

// 配置 sessionConfig
const sessionConfig = {
  secret: 'test-session',
  name: 'seession_id',
  saveUninitialized: false,
  resave: true,
  cookie: {
  // 30秒后失效，避免 重新打开 浏览器 登录态失效
    maxAge: 1000 * 30
  },
  // 这里配置持久化方案
  store: new MongoStore(storeConfig)
 }

```



### 使用 Redis 持久化

- 安装依赖：`yarn add redis connect-redis -D`
- 基本使用：

```js
const redis = require('redis')
const session = require('express-session')
 
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
 
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
  })
)
```

参考：[npm/connect-redis](https://www.npmjs.com/package/connect-redis)



参考资料：

- [github/express-session](https://github.com/expressjs/session#readme)
- [Express-session的使用](https://www.cnblogs.com/loaderman/p/11506682.html)
- [Express全系列教程之(八)：session的基本使用](https://www.cnblogs.com/lpxj-blog/p/10783815.html)
- [express如何使用session与cookie](https://www.jianshu.com/p/1839e482274e)
- [lvzhenbang/nodejs-play](https://github.com/lvzhenbang/nodejs-play)



