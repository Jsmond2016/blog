---
isTimeLine: true
title: 文件上传-单名字单文件上传
date: 2021-01-24
tags:
 - Express
 - Nodejs
---

> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 文件上传-单名字单文件上传

## 前端代码

- 创建文件夹 `07`，新建文件 `index.html`

```html
<body>
  <form>
    <!-- 单文件版本 -->
    <!-- <input name="file" type="file"> -->
    <!-- 多文件版本 -->
    <input name="file" type="file" multiple="multiple">
    <input name="name" type="text">
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

前端 `html` 需要使用 工具 `http-server` ，启动服务展示前端页面

- 安装：`yarn add http-server -g`
- 使用：进入 `07` 文件目录，执行 `http-server -c-1`，在 `localhost:8080` 预览

## Node 代码基础版本

上传需要工具插件 `multer` 辅助，同时，存在 跨域问题，需要 `cors` 插件进行设置允许跨域

- 安装：

```bash
yarn add multer cors -D
```

- 使用方式：

```js
/**  文件上传--单文件上传版本
 * 
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 使用 multer 配置一个接收器 ==> multer({ dest: '存放文件的路径' })
 *    -> 2-4 使用 multer 接受文件
 *       --> 哪一个路由需要接受文件，就配置在哪一个路由上
 *       --> 写在路由标识符的后面，路由处理函数的前面
 *       --> 接收器.single('前端上传文件的key')
 *   -> 2-5 在路由处理函数里面
 *      --> 会在 req 上面多一个信息叫 file
 *      --> 就是你上传的文件的信息
 *   注意：会把文件存储起来，随机命名，但是没有后缀
 */
```

- 新建文件 `index-07-01.js`，代码为：

```js
 const express = require('express')
 const router = express.Router()
 const cors = require('cors')

 // 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 const multer = require('multer')
 const app = express()

 // 2-3 使用 multer 配置一个接收器
 const fileUpload = multer({ dest: './uploads/'})

 //  允许跨域
 app.use(cors())

//  单文件上传，fileUpload.single(name) 这里的 name 是你上传文件 form 里面的 name
 router.post('/upload', fileUpload.single('file'), (req, res) => {
   console.log('req.file', req.file);
   console.log('received upload');
   res.send(req.file.originalname)
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })
```



**核心要点：**

- `multer({ dest: './uploads/'})` 配置上传的文件接收器
- `fileUpload.single('file')` 配置接收的文件名字
- `req.file` 在 `req` 里面可以拿到 `file` 对象，参数如下：
  - `fieldname` 文件名字，获取表单元素的名字
  - `originalname` 新的文件名，这里 `multer` 帮我们随机数命名了，**带后缀名**
  - `mimetype` 文件类型
  - `destination` 存储的目录
  - `filename` 文件名，新的随机数名字，**无后缀**
  - `path` 存储的具体路径
  - `size` 大小，单位是字节



**缺点：**

因为上面代码为基础版本，有着诸多的缺点：

- 不能自定义上传的文件命名
- 不能上传多个文件
- 不能自定义不同上传类型的文件的存储目录位置



## Node 代码进阶版本

上面的 node 代码，实际只是一个简单的基础版本，核心代码就是这几行：

```js
const multer = require('multer')

const fileUpload = multer({ dest: './uploads/'})
 
 router.post('/upload', fileUpload.single('file'), (req, res) => {
   res.send(req.file.originalname)
 })
```

这里并没有进行详细配置，如**自定义文件名，存储位置**等。

接下来，使用更好的方式配置：

流程：

```js
/*
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
 * 
 */
```

区别在于 `2-3, 2-4` 这两步，代码为：

```js
/*
 * @Description: 单个文件上传-复杂版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=9
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
 * 
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
 router.post('/upload', storage.single('file'), (req, res) => {
   console.log('req.file', req.file);
   console.log('received upload');
   res.end(req.file.originalname)
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })
```

核心代码：

```js
 // 2-3 使用 multer 生成一个仓库信息
 const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
    // 配置存储路径   
    cb(null, './uploads/')
   },
   filename: (req, file, cb) => {
    const suffix = path.extname(file.originalname)
    // 随机数命名
    cb(null, `new_name_${new Date().getTime()}_${Math.random().toString().slice(2)}${suffix}`)
   }
 })
 
 //  2-4 配置接收器，带有仓库信息
 const storage = multer({ storage: fileStorage })
 
 //  2-5 使用我们配置好的接收器 去接收文件
 router.post('/upload', storage.single('file'), (req, res) => {
   res.end(req.file.originalname)
 })
```



**核心要点：**

- 使用 ` multer.diskStorage({destination, filename})` 生成一个仓库信息，这里可以配置 存储路径，自定义配置存储的文件名，两个参数都是一个回调，对单文件处理的回调函数
- 使用 `multer({ storage })` 配置接收器

参考资料：

- [expressjs/multer](https://github.com/expressjs/multer#readme)