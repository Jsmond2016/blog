---
isTimeLine: true
title: 文件上传-单名字多文件上传
date: 2021-01-24
tags:
 - Express
 - Nodejs
---


> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 文件上传-单名字多文件上传

> 配套代码参考： `07, index-07-03.js`

## 前端代码

新建文件 `07/index.html` 这里的主要区别在于新增了 `multiple` 属性，表示可以上传多个文件

```html
<body>
  <form>
    <!-- 单文件版本 -->
    <!-- <input name="file" type="file"> -->
    <!-- 多文件版本 -->
    <input name="avatar" type="file" multiple>
    <button>提交</button>
  </form>

  <script>
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      // 拿到文件
      const formData = new FormData(form)
      for(let value of formData) {
        console.log('value', value)
      }
      // 发送
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'http://localhost:8888/upload')
      // 不需要设置 请求头，因为 form 会自动设置请求头
      xhr.send(formData)

      xhr.onload = function () {}

    })
  </script>


</body>
```



## Node 代码

### 后端流程

```js

/*  
 * 多个文件上传---单名字多文件版本
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 生成一个仓库信息
 *      --> multer.diskStorage({ config 配置信息 }),config 如下：
 *         --> destination: function(req, file, callback) {}
 *         --> filename: function(req, file, callback) {}
 *      --> 返回值：是一个仓库信息
 *    -> 2-4 使用 multer 生成一个接收器
 *       --> 接收配置里面的仓库信息
 *       --> 语法： multer({ storage: 仓库信息})
 *    -> 2-5 使用方法发生变更：
 *        --> single 方法专门接收单文件，即一个名称 对应 一个文件
 *        --> array 方法专门接收多文件， 即一个名称 对应 多个文件
 *        --> 因此，在后面的方法中，就不能使用 req.file, 或者 file.originname 等方法获取文件信息
 *        --> 而是需要使用  req.files ，数组里面存储着每一个文件的信息
 */
```

这里主要区别在于 `2-5` 

- 方法由 `storage.single('file')` 变成了 `storage.array('file')`
- 在 `router.post('/upload', storage.array('file'), (req, res){}` 中，原来的 `req.file` 变成了 `req.files` 



### 具体代码

```js
/*
 * @Description: 多个文件上传---单名字多文件版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=10
 * 
 * 具体参考文件：/07/index.html，使用 hs 启动
 * 
 *  文件上传--单文件上传版本
 * 
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 生成一个仓库信息
 *      --> multer.diskStorage({ config 配置信息 }),config 如下：
 *         --> destination: function(req, file, callback) {}
 *         --> filename: function(req, file, callback) {}
 *      --> 返回值：是一个仓库信息
 *    -> 2-4 使用 multer 生成一个接收器
 *       --> 接收配置里面的仓库信息
 *       --> 语法： multer({ storage: 仓库信息})
 *    -> 2-5 使用方法发生变更：
 *        --> single 方法专门接收单文件，即一个名称 对应 一个文件
 *        --> array 方法专门接收多文件， 即一个名称 对应 多个文件
 *        --> 因此，在后面的方法中，就不能使用 req.file, 或者 file.originname 等方法获取文件信息
 *        --> 而是需要使用  req.files ，数组里面存储着每一个文件的信息
 */

 const express = require('express')
 const path = require('path')
 const router = express.Router()
 const cors = require('cors')

 // 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 const multer = require('multer')
 const app = express()

 // 2-3 使用 multer 生成一个仓库信息
 const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
    // req 本次请求信息
    // file 本次请求的文件
    // cb   回调函数，利用回调函数来设定存储路径
    // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
    cb(null, './uploads/')
   },
   filename: (req, file, cb) => {
     // req 本次请求信息
     // file 本次请求的文件
     // cb   回调函数，利用回调函数来设定存储路径
     // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
     // cb 的第二个参数，是重命名 传入的文件 
    //  cb(null, 'new_name.jpg')
    // 获取后缀名
    const suffix = path.extname(file.originalname)
    // 随机数命名
    cb(null, `new_name_${new Date().getTime()}_${Math.random().toString().slice(2)}${suffix}`)
   }
 })

//  2-4 配置接收器，带有仓库信息
 const storage = multer({ storage: fileStorage })

 //  允许跨域
 app.use(cors())

//  2-5 使用我们配置好的接收器 去接收文件
 router.post('/upload', storage.array('file'), (req, res) => {
   console.log('req.files', req.files);
   console.log('received upload');
   res.end('success')
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })
```



核心要点：

- 方法由 `storage.single('file')` 变成了 `storage.array('file')`
- 在 `router.post('/upload', storage.array('file'), (req, res){}` 中，原来的 `req.file` 变成了 `req.files` 



拓展：

因为是多文件，这里可以做其他的事情：

- 根据不同的文件类型存储在不同的文件目录
- 不同的文件类型，自定义不同的存储名字





