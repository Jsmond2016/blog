---
isTimeLine: true
title: Express 中 Cookie 的操作和设置
date: 2021-01-24
tags:
 - Express
 - Nodejs
---


> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# Express 中 Cookie 的操作和设置

>  对应文件：`index-09.js, 09/index.html, 09/login.html`

## 安装

```bash
yarn add cookie-parser -D
```

## cookie-parser 的使用

使用方式很简单

```js
const express = require('express')
const app = express()
// 引入
const cookieParser = require('cookie-parser')

const router = express.Router()

router.get('/test', (req, res) => {
  console.log('req.cookies', req.cookies)
  res.send({
    ...req.cookies
  })
})

// 使用-注意挂载顺序要在路由前
app.use(cookieParser())

app.use(router)

app.listen(8080, () => {
    console.log('listen at 8080')
})
```

中间件挂载了 `cookie-parser` 之后，主要有 2 个使用方式，**获取和设置**：

- `req.cookies` 在 req 中多了一个 `cookies` 对象
- `res.cookie`  在响应中使用 `res.cookie(key, value, options)` 进行设置

其中，`options` 有这些参数：

| 参数     | 类型     | 描述                                     |
| -------- | -------- | ---------------------------------------- |
| domain   | string   | 描述cookie作用的主机                     |
| path     | stirng   | 只有在匹配成功的地址才会发送cookie默认 / |
| encode   | function | 用于cookie的编码默认是encodeURIComponent |
| expires  | date     | 使用GMT格式的时间来指定过期时间          |
| maxAge   | number   | 指定多好毫秒后cookie失效                 |
| httpOnly | boolean  | 设置后客户端无法访问cookie的内容         |
| secure   | boolean  | 标记这个cookie只有在https协议下起作用    |
| signed   | boolean  | 对于cookie进行签名                       |
| sameSite | boolean  | 阻止cookie在跨站请求的时候发送           |

**获取cookie**：

新建 `test.http` ，使用 vs-code 插件 `rest-client` 测试

```http
### 
GET http://localhost:8080/test HTTP/1.1
Cookie: a=1;b=2
```

结果为：

```js
{
  "a": "1",
  "b": "2"
}
```

**设置cookie：**

更改 `server.js`

```js
router.post('/post', (req, res) => {
  res.cookie('test', 'post', {maxAge: 1000 * 10}) // 设置过期时间为 10 秒
  res.send({
    code: 0,
    msg: ''
  })
})
```

新建 `test.http` ，测试：

```http
###
POST http://localhost:8080/post HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

结果为：

```text
HTTP/1.1 200 OK
X-Powered-By: Express
// ... cookie 信息
Set-Cookie: test=post; Max-Age=10; Path=/; Expires=Sat, 23 Jan 2021 14:27:55 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 19
ETag: W/"13-pPx7E2WEY5p+K0O9Iu5jiS8MLz4"
Date: Sat, 23 Jan 2021 14:27:45 GMT
Connection: close

{
  "code": 0,
  "msg": ""
}
```



参考资料：

- [express-guide-database](https://expressjs.com/zh-cn/guide/database-integration.html)
- [cookie-parser](https://github.com/expressjs/cookie-parser#readme)
- [Express使用进阶：cookie-parser中间件实现深入剖析](https://www.cnblogs.com/chyingp/p/express-cookie-parser-deep-in.html)
- [Cookies-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

