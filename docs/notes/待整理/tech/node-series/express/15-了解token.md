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


相关资料：

- [JWT 介绍](https://www.jianshu.com/p/faad1bd7f745)
- [五分钟带你了解啥是JWT](https://zhuanlan.zhihu.com/p/86937325)
- [JWT技术解决IM系统的认证痛点](http://blog.itpub.net/31556438/viewspace-2220346/)


前置知识：

一个登录流程：

- 前端
  - 前端登录，发送请求
- 后端
  - 接收请求
  - 数据库比对
  - 返回结果
  - 根据后端得到的结果反馈给用户

使用 session 技术保持登陆态，需要做这几件事情

- session 需要持久化存储
- 一人一半密码：即一半在服务器，一半在客户端 cookie
- 若想长久保持登录态，要求：
  - 服务器不能变：无法扩充服务器，否则 session 失效
  - 可以设置 cookie：如果前端跨域，则无法设置 cookie
- 缺点：
  - 【需要保持长连接】需要保证是同一台服务器，不能更换服务器
  - 保证 cookie 可以设置，跨域后 cookie 不能设置
  - 容易被伪造：csrf 攻击
- 解决办法： 使用 token
- token 特点：
  - 三段式加密字符串，用 "." 分隔，每一段有不同的含义：xxx.yyy.zzz
  - 第一段：头信息，表示签证，安全信息验证，你的口令，进行不可逆加密
  - 第二段：你要保存的信息： base64 可逆加密截取内容
  - 第三段： 额外信息，不可逆加密
  - 这一段字符串由后端生成发给前端
    - 在登陆过后，生成一个 token 给前端
    - 若前端需要登陆后查看的页面，或者登录后发送的请求
    - 字需要你把 token 带回来，解密验证

token 使用举例：

[在线base64加密](https://tool.oschina.net/encrypt?type=3)

```js
Hello，World


// base64
SGVsbG/vvIxXb3JsZA==
```

使用 token 后的业务流程：

例如： 购物车页面

- 前端：
  - 发送请求：用户的购物车数据
  - 要求登陆后查看，把 token 放啊在请求头里面带过去
- 后端：
  - 接受请求
  - 查看请求头里面有没有 token，没有，则直接打回去
  - 若有 token，解析合法性：是否过期，是否有效
  - 若解析 token 没问题，则中间件 next()，进入对应的路由
  - 返回请求的购物车数据

面试：

- 你为什么使用 token：
  - http 无状态
  - 使用 session 的问题：无法跨服务器
  - cors 后跨域后 cookie 无法直接使用
- token 是什么：
  - 三段式加密字符串
  - 第一段和第三段是不可逆加密：哈希散列
- token 验证的过程