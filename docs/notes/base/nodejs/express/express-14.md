---
isTimeLine: true
title: 了解 MVC 开发模式
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 了解 MVC 开发模式

> MVC 多用在服务端 

- Model： 通常为数据库
- View： 视图
- Controller： 控制器

![Snipaste_2021-01-18_23-04-32.png](https://s2.loli.net/2023/09/24/5agsor1ZyBf4Mn2.png)

## 具体实践

本质就是抽离各种文件到对应的文件夹中进行模块化

- 抽离 路由文件
- 抽离 中间件方法
- 抽离 数据库处理操作