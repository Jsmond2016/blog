---
isTimeLine: true
title: 文件上传
date: 2021-01-24
tags:
 - Express
 - Nodejs
---


> 代码见：https://github.com/Jsmond2016/node-study/tree/main/express-study


# 文件上传

## 前端代码-方式1

```html
<form action="test.com/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar">
    <input type="submit" value="提交">
  </form>
```

注意要点：

- `method="POST"` 传输方法
- `enctype="multipart/form-data"` 数据格式 在发送到服务器之前应该如何对表单数据进行编码，默认的，如果不写的话默认编码格式为 `application/x-www-form-urlencoded`，就是说，在发送到服务器之前，所有字符都会进行编码。HTML表单如何打包数据文件是由enctype这个属性决定的。



## 前端代码-方式2

使用 ajax 的方式，实现页面无刷新上传

```html
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

      xhr.onload = function () {

      }

    })
  </script>
```

要点：

- `multiple` 参数，在文件类型为 `input type="file"` 的时候，设置该属性表示可以上传多个文件
- `new FormData(form)` 拿到的表单文件通过简单的 `console.log(formData)` 结果为 `{}`，但并不是说它的内容是空的，只是它对前端开发人员是透明的，无法查看、修改、删除里面的内容，**只能append**添加字段。可以使用上面**遍历 的方式**看到



参考资料：

- [前端图片上传解决方案](https://segmentfault.com/a/1190000017781605)
- [前端图片上传的几种方式](https://www.cnblogs.com/qqing/p/9035138.html)
- [前端本地文件操作与上传](https://zhuanlan.zhihu.com/p/31401799)