---
isTimeLine: true
title: 了解中间件
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 了解中间件

## 一个基础的服务

```js
 const express = require('express')

 const app = express()

 app.listen(8080, () => {
   console.log('listen at 8080')
 })

```

浏览器访问我们发现，我们请求的 http 信息，即

```bash
GET /a?a=123 HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9

```

上面这些信息，以写信作比喻：

- 第一行为标题
- 第二部分为收信人的地址
- 第三行为一些字符串
- 第四行为空行，表示后面不再是请求头信息

在 express 服务器中，express 帮我们解析了上面的 http 报文，封装在了 req 和 res 里

## 引入中间件

当我们引入一个中间件，它做了什么？





> 安装 cookie-parser 中间件

代码

```js
 const express = require('express')
 const cookieParser = require('cookie-parser')
 
 const app = express()

 // 这里挂在后，req 里面就有了一个 cookies
 // res 里面就有了 cookie() 
 app.use(cookieParser())

 app.listen(8080, () => {
   console.log('listen at 8080')
 })

```

![20210118215251.png](https://s2.loli.net/2023/09/24/cO2rmvnd85luJso.png)

## 中间件的几种类型

1. 全局中间件：(req, res, next) => {}
    - 所有请求都要经历，直接挂在在 app 上
    - app.use(Fn)
2. 路由级中间件：
    - 在进入路由表，到匹配到对应请求标识符添加的
    - 支队当前这个路由表生效
    - router.use(Fn)
3. 路由应用级中间件
    - 书写在路由表中
    - 在匹配到指定路径标识符以后，时间处理函数事件
    - 只对匹配到的路由标识符生效
    - router.get('path', 中间件函数Fn1， 路由处理函数Fn2)
4. 全局错误处理中间件
    - 一般书写在 服务的最后
    - 一般用来返回最终结果
    - 一般接收 4个参数：(err, req, res, next) => {}
      - 当前面有任意一个中间件报错了，next(err) 会被带到下一个 中间件中
      - app.use((err, req, res, next) => {})