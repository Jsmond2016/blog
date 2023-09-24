---
title: MVC 小知识
date: 2018-01-21
tags: 
  - MVC
  - JavaScript
---

# MVC 小知识

## MVC是什么？

- [MVC-维基百科 ](https://zh.wikipedia.org/wiki/MVC)

- MVC：
  MVC模式（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

  分层为：

  - 控制器（Controller）- 负责转发请求，对请求进行处理。
  - 视图（View） - 界面设计人员进行图形界面设计。
  - 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。

- 实质：MVC 不是一种技术，仅是一种理念。

## 我眼中的 MVC

![](https://i.loli.net/2018/01/21/5a641258a5103.png)

### 过程为：

1. 用户：操作视图层（View）
2. 视图层：把用户操作信息通知控制层（Controller）
3. 控制层：调用模型层（Model ）的方法获取数据
4. 模型层：从服务器（server）请求数据
5. Server：响应Model 层，返回数据
6. Model：获取数据以后返回给控制层（Controller）
7. Controller：操作结果返回给视图层（ View）

###  优点：

- 代码量精炼：逻辑代码都写在了 Controller里面，作为一个模板供大家使用。
- 结构清晰：都是在一个对象内使用 `name:function(){}` 的形式操作，同时，不同的功能之间在不同的层结构内，互不影响。避免代码耦合。



