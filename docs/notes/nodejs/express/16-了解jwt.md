---
isTimeLine: true
title: 了解 jwt
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 了解 jwt

## jwt 是什么

Json web token (JWT), 是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准（[(RFC 7519](https://link.jianshu.com?t=https://tools.ietf.org/html/rfc7519)).该token被设计为紧凑且安全的，特别适用于**分布式站点的单点登录（SSO）场景。**JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

## 历史背景

### HTTP 无状态

首先，我们知道，HTTP 是无状态的。即，当我们使用正确的账号密码登陆服务器时，在第二次访问服务器的时候，服务器依然需要我们验证身份进行账号登录。

因为 服务器 并不知道是哪一个用户发的请求，因此会要求再次鉴权验证身份。

为了让 服务器能够记住用户，我们使用 `cookie, session, token` 等技术让用户带着【身份证】去请求服务器，服务器存储下我们的【身份证信息】，就能记住用户了。

### session机制

使用 session 方案的原理是：用户使用账号密码请求服务器，服务器验证信息正确后，将信息存储到内存中，并在 `cookie` 中写入 `session_id` 返回给客户端，这样就相当于 服务器给用户发了一个 【身份证】，当用户再次请求的时候回默认带上 `cookie` 信息，服务器就能鉴别这是已经登录的用户，返回对应的请求数据。

### session的不足

因为 `session_id` 是一块内存就会带来几个问题：

- 不易拓展：因为使用内存来存储 `session_id` ，那么在后续服务器升级或者拓展的时候，肯定是在不同的内存中，此时之前登录过的 `session_id` 就会失效，对于分布式系统不友好。
- 内存不足：和硬盘一样，内存有一定的容量，当用户量足够大的时候，存储过多的 `session_id` 容易将内存填满，增加服务器的开销。
- CSRF：因为是将 `session_id` 放在 cookie 中，所以一旦 `cookie` 被截获，用户就容易遭受跨站请求伪造的攻击。
- cookie 跨域问题：因为 `session_id` 是存储在 cookie 中的，因此 cookie 的局限性必然会影响 `session_id` ，最显然的就是跨域问题，在多个不同域名的子系统中若要共享同一个 cookie ，并不能直接使用，需要使用 代理，或者设置 `domain` 等方式才能拿到 cookie 的 `session_id`。具体可参考 [解决cookie跨域访问](https://blog.csdn.net/a214919447/article/details/55260082)

### token鉴权机制

首先，token 和 cookie 作用都是一样的，作为一种认证机制，让服务端知道请求来自受信任的客户端。

第一次登陆，客户端发送账号密码请求服务端，服务端验证身份后返回一个 token 写在 http 的 header 上，通常为 authorization 字段。

使用 token，要求服务端支持 CORS ，即允许跨域。这样才能在不同子系统中使用 token 即可共享登录态。

使用 token ，要求客户端每次请求都要带上 token，让服务器辨别身份合法性。

但是 token 也有缺点：使用 token 如何做到 logout ？

当前查到的资料主要有 2 种：

- 设置 token 的过期时间为一个比较短的时间
- 设置 一个黑名单，让 token 无效。

## jwt的使用

- 安装：`yarn add jsonwebtoken -D`
- 使用：基本就是加密和解密

**加密：** `jwt.sign(保存的信息, 口令， 参数)`

- 保存的信息

- 口令：加密口令，加密的时候混入信息使用，解密的时候还要这个口令

- 参数：是一个对象 + expiresIn 过期时间，单位为秒 ('1d')

**解码：**`jwt.verify(你要解析的token, 口令)`

- token：必须是一个指定的 token 
- 口令：必须是加密时候用的口令


```js
// 1.准备
const userInfo = {
  _id: '2021-01-23',
  name: 'test',
  value: 'haha'
}

// 2.导入

const token = jwt.sign(userInfo, 'Osmond', { expiresIn: 10 })
console.log(token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMDIxLTAxLTIyIiwibmFtZSI6ImhlbGxvIiwib3RoZXJzIjoidGVzdCIsImlhdCI6MTYxMTM5MDQ5NywiZXhwIjoxNjExMzkwNTA3fQ.fVo8a_PFPLTcNOXvs3ILbElvTKi0Xk8jO8z0btR_nLw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// eyJfaWQiOiIyMDIxLTAxLTIyIiwibmFtZSI6ImhlbGxvIiwib3RoZXJzIjoidGVzdCIsImlhdCI6MTYxMTM5MDQ5NywiZXhwIjoxNjExMzkwNTA3fQ
// fVo8a_PFPLTcNOXvs3ILbElvTKi0Xk8jO8z0btR_nLw


setTimeout(() => {
  const info = jwt.verify(token, "Osmond")
  console.log('info: ', info);
}, 3000);

// info:  {
//   _id: '2021-01-22',
//   name: 'hello',
//   others: 'test',
//   iat: 1611390909, 设置 token 的时间
//   exp: 1611390919  过期时间
// }

```


请求设置 token

- 前端页面

```html
<body>
  <h1>登录页</h1>

  <br>
  <button>click me</button>

  <br>

  <a href="./userInfo.html">跳转 userInfo </a>

  <script>
    const btn = document.querySelector('button')
    btn.onclick = function() {
      const url = 'http://localhost:8081/login'
      window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'tst',
          age: 18
        }),
        // mode: 'cors'
      }).then(res => res.json()).then(res => {
        console.log(res)
        window.sessionStorage.setItem('token', res.token)
      })
    }
</script>
```

后端代码：

```js
// 了解 jwt 技术

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'Osmond')
  res.send({
    messag: 'success',
    code: 0,
    token
  })
})

router.get('/userInfo', (req, res) => {
  const { authorization: token } = req.headers
  if (!token) {
    res.send({
      message: 'error',
      code: 401,
      data: {}
    })
  }
  jwt.verify(token, 'Osmond', (err, data) => {
    if (err && err.message === 'Invalid token') {
      res.send({
        message: 'token 非法',
        code: 401,
        data: {}
      })
    }
    if (err && err.message === 'jwt expired') {
      res.send({
        message: 'token 过期',
        code: 401,
        data: {}
      })
    }
    console.log(data)
    res.send({
      message: 'success',
      code: 200,
      data: {
        name: 'Osmond',
        age: 18
      }
    })
  })
  
})


app.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式是否启用
  limit:    2*1024*1024           //限制-2M  post数据大小
}))
app.use(cors())
app.use(router)




app.listen(8081, () => {
  console.log('listen at port 8081')
})
```


跳转页面后 请求新 token

新建 `userInfo.html` 代码为：

```html
<body>
  <h1>UserInfo 页面</h1>
  <button>click me</button>

  <script>
    const btn = document.querySelector('button')
    btn.onclick = function() {
      const token = window.sessionStorage.getItem('token')
      const url = `http://localhost:8081/userInfo`
      window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        // mode: 'cors'
      }).then(res => res.json()).then(res => {
        console.log(res)
      })
    }
</script>
```




## 验证 token 的中间件

文件夹看 `12, index-12.js` ，js 代码为


```js
// 自制 token 中间件

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

// token 验证
const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers
  jwt.verify(token, 'secret', (err, data) => {
    // token 非法或者过期
    if (err || !data) {
      res.send({
        code: 401,
        msg: err.message,
        data: {}
      })
      // 这里要及时返回，否则还是会走到后面，会报错
      return
    }
    // 验证通过
    next()
  })
}

router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'secret')
  res.send({
    messag: 'success',
    code: 0,
    token
  })
})

router.get('/userInfo', authMiddleware, (req, res) => {
  res.send({
    code: 200,
    msg: '',
    data: {
      username: 'Osmond',
      age: 18
    }
  })
})


app.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式是否启用
  limit:    2*1024*1024           //限制-2M  post数据大小
}))
app.use(cors())
app.use(router)




app.listen(8081, () => {
  console.log('listen at port 8081')
})


```



## 使用第三方 token 校验

查看 文件 `index-13.js` 代码

- `express-jwt` 是一个 express 和 jwt 结合的第三方中间件
- 需要结合 错误中间件一起使用，因为 token 验证失败，它会抛给 错误中间件
- 同时注意，服务端设置 token的时候，需要加一个 `Bearer `，这是一种固定的格式，若没有这个会报错
- 使用方法


```js

// 使用第三方中间件


const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// 使用 expres-jwt 中间件：填入秘钥，排除不需要验证 token 的路由
const oauthValidateMiddleware = expressJwt({ 
  // 秘钥
  secret: 'secret',
  // 加密方式
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/dont-need-token', '/home', '/other']
})


const errCatchMiddleware = (err, req, res, next) => {
  if (err) {
    console.log("错误处理中间件");
    console.log('err', err)
    console.log('==================')
    res.status(err.status).send(err.code)
  }
  next()
}


router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'secret', { expiresIn: '30s'})
  res.send({
    messag: 'success',
    code: 0,
    token: 'Bearer '+token // 这里需要
  })
})

router.get('/userInfo', (req, res) => {
  res.send({
    code: 200,
    msg: '',
    data: {
      username: 'Osmond',
      age: 18
    }
  })
})


app.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式是否启用
  limit:    2*1024*1024           //限制-2M  post数据大小
}))
app.use(cors())
app.use(oauthValidateMiddleware)
app.use(router)
app.use(errCatchMiddleware)




app.listen(8081, () => {
  console.log('listen at port 8081')
})

```





**参考资料：**

- [JWT优缺点和适合场景](https://zhuanlan.zhihu.com/p/263410154)
- [JWT(JSON Web Token)原理简介](https://blog.csdn.net/xunileida/article/details/82961714)
- [深入了解jwt方案的优缺点](https://www.cnblogs.com/nangec/p/12687258.html)
- [为什么不推荐用JWT保护你的Web应用](https://www.jianshu.com/p/792f71bb52dd)
- [jwt 和传统的 session、cookie 的争议](https://www.v2ex.com/t/679220)
- [jwt作为取代session-cookie机制的替代，实际运用会存在什么问题?](https://www.zhihu.com/question/41248303)
- [什么是Http无状态？Session、Cookie、Token三者之间的区别](https://www.cnblogs.com/lingyejun/p/9282169.html)