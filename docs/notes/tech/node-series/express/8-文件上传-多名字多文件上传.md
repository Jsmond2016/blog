---
isTimeLine: true
title: 文件上传-多名字多文件上传
date: 2021-01-24
tags:
 - Express
 - Nodejs
---


> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 文件上传-多名字多文件上传

> 代码文件：`0702, index-07-04.js`



## 前端代码准备

新建文件 `0702/index.html` ，这里只新增了一行代码，即新增了一个上传的文件不同的 name：

```html
<input name="photo" type="file">
````

具体代码为：

```html
<body>
  <form>
    <!-- 单文件版本 -->
    <!-- <input name="file" type="file"> -->
    <!-- 多文件版本 -->
    <input name="avatar" type="file" multiple>
    <input name="photo" type="file">
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

      xhr.onload = function () {

      }

    })
  </script>


</body>
```

拓展：

- `input type=file` 标签 可以设置 `accept` 属性，表示只接受某种类型的文件
- 具体为：
- 1.上传.csv格式

```html
<input text="file" accept=".csv" />
```

- 2.上传.xls格式	

```html
<input text="file"  accept="application/vnd.ms-excel"/>
```

- 3.上传.xslx格式

```html
<input text="fiel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
```

- 4.上传.png/.jpg/etc格式

```html
<input type="file" accept="text/plain" />
```

- 5.上传图片格式

```html
<input type="file" accept="image/*" />
```

- 6.上传.htm,.html格式

```html
<input type="file" accept="text/html" />
```

- 7.上传video(.avi, .mpg, .mpeg, .mp4)格式

```html
<input type="file" accept="video/*" />
```

- 8.上传audio(.mp3, .wav, etc)格式

```html
<input type="file" accept="audio/*" />
```

- 9.上传.pdf格式

```html
<input type="file" accept=".pdf" />
```

- 10.如果限制两种文件格式，同时限制

```html
<input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
```

参考：[详解 input accept属性](https://blog.csdn.net/mrbignose/article/details/104710107)



## 后端代码

### 上传流程

```js
/*  文件上传--多名字多文件版本
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
 *        --> fields 方法专门接受多文件，多个名称匹配多个文件
 *        --> 同时，在 destination 函数中的 callback，对于多种不同类型的文件，需要放在不同的文件夹内
 *        --> 因此，在后面的方法中，就不能使用 req.file, 或者 file.originname 等方法获取文件信息
 *        --> 而是需要使用  req.files ，数组里面存储着每一个文件的信息
 * 
 *        --> 走到这一步，基本就学会了： 单名字单文件上传，但名字多文件，多名字多文件 上传，下一步，就是将 存储的路径存储到数据库中
 */
```

不同点：

-  `2-5` ，由 `storage.array(filename)` 变成了 `storage.fields([{name: filename}])`



### 具体代码

新建文件 `index-07-04.js` ，具体代码为：

```js
/*
 * @Description: 多个文件上传---多名字多文件版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=11
 * 
 * 具体参考文件：/07-02/index.html，使用 hs 启动
 * 
 *  文件上传--多名字多文件版本
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
 *        --> fields 方法专门接受多文件，多个名称匹配多个文件
 *        --> 同时，在 destination 函数中的 callback，对于多种不同类型的文件，需要放在不同的文件夹内
 *        --> 因此，在后面的方法中，就不能使用 req.file, 或者 file.originname 等方法获取文件信息
 *        --> 而是需要使用  req.files ，数组里面存储着每一个文件的信息
 * 
 *        --> 走到这一步，基本就学会了： 单名字单文件上传，但名字多文件，多名字多文件 上传，下一步，就是将 存储的路径存储到数据库中
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
    // cb(null, './uploads/')
    // 这里对于不同类型的文件放在不同的文件夹
    const suffix = path.extname(file.originalname)
    cb(null, `./uploads/${suffix.slice(1)}`)
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
 router.post('/upload', storage.fields([
   {name: 'avatar'},
   {name: 'photo'}
 ]), (req, res) => {
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

-  `2-5` ，由 `storage.array(filename)` 变成了 `storage.fields([{name: filename}])`
- 同时，这里对上传的不同类型的文件分别存储在了不同的文件夹里，这里新建了 `uploads/jpg, uploads/png` 为例，准备对应的 2 中类型图片进行测试



## 小结

到这里，我们完成了基本的文件上传的 后端流程，实际上都是对于 `multer` 中间件的使用

**前端方面：**

- 可以设置 `multiple` 属性进行单个或者多文件上传
- 可以设置 `enctype` 限制上传的文件类型

**后端方面：**

- 单名字单文件上传
- 单名字多文件上传
- 多名字多文件上传
- 对上传文件自定义命名
- 对上传文件自定义存储路径
- 在 `req.file, req.files` 中查看文件信息
- 在 `destination, filename` 使用回调函数对上传文件进行处理

**拓展和优化**

- 文件上传模块在后端中业务比较固定，可以写在专门独立的文件中作为后端路由
- 对文件类型，文件大小，传输格式 等都可以进行自定义规则处理
- 配合 文件类型和大小，权限控制，避免非法用户传入不合法的文件类型导致服务出错
- 可能存在更多更好用的上传的中间件，不过原理应该都差不多



参考资料：

- [Express教程](https://www.bilibili.com/video/BV1xa4y1p7uu?p=11)
- [multer](http://npmjs.com/multer)
- [NodeJS + Express 文件上传功能](https://blog.csdn.net/zhouzhiwengang/article/details/108604811?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-2&spm=1001.2101.3001.4242)