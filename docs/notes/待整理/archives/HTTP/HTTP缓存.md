---
title: HTTP缓存
date: 2018-02-07
tags: 
   - Chrome
   - Cookie
---

# HTTP缓存

![](https://i.loli.net/2018/02/07/5a7aac8d3f4ac.png)



> 如图，在使用浏览器的时候，当我们加载某个资源的时候，需要向服务器请求对应的资源。
>
> 而当用户刷新页面的或者加载同一个资源的时候，再重新加载这个资源的时候，非常浪费时间和消耗性能。
>
> 此时，缓存的出现很好的解决了这个问题。

## 缓存的处理方式

- Expires
- Cache-Control
- ETag

## 缓存的作用

1.  减少了冗余的数据传输，节省了网费
2.  减少了服务器的负担， 大大提高了网站的性能
3.  加快了客户端加载网页的速度
4. 极大的提高了用户体验

##   Expires 与 Cache-Control

既然浏览器有缓存，自然而然少不了对应的管理和设置，早期的浏览器使用的是 Expires，后期随着技术的更新，出现了Cache-Control，二者本质上的功能基本相同，而在使用过程中，依然是后者 更好用。

### Expires

#### 含义： 
expires通常被理解为失效日期及相关意义，DBA通常把expires作为表示过期数量或者过期时间的字段。

#### 使用：

`Expires: <http-date>` 表示到期时间

举例：

`Expires: Wed, 21 Oct 2015 07:28:00 GMT` 表示到期时间为： 格林尼治时间 2015年10月21日 07:28:00

更多使用方式，参考：[Expires-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)

### Cache-Control 

#### 含义：

通用消息头被用于在http 请求和响应中通过指定指令来实现缓存机制。缓存指令是单向的, 这意味着在请求设置的指令，在响应中不一定包含相同的指令。

#### 基本使用：

```
Cache-Control: no-cache, no-store, must-revalidate 禁止缓存
Cache-Control:public, max-age=31536000 缓存静态资源，到期时间为 31536000 秒即 1 年 以后缓存过期。
```

更多用法： [Cache-Control--MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)



### 几个问题：

1. 如果被缓存的文件更新了怎么办？如何验证是否为新的文件？

   文件如果更新了，则 URL 的名字会不同，就不会使用本地的缓存了，而是使用新的缓存。

   看图：
   ![](https://i.loli.net/2018/02/07/5a7ae94dcbffc.png)

   图中很多文件的后缀都是一些没有规律的随机字符串，这是为什么呢？

   答案就是，每次更新了文件以后，为了和旧版本的文件记性区分，对应的在文件名后面加一些随机字符串表示不同。

2. 缓存过多怎么办？

   浏览器会定期清除不需要的缓存。

3. 使用上使用 Cache-Control 还是 使用 Expires 呢？

   当然是推荐使用 Cache-Control，因为 Expires 还有一个不足就是：
   Expires 的过期时间是相对本地的时间作为参照，如果电脑的时间重置了回到了更早的时间，那么浏览器永远无法使用以前的缓存 ，而是使用新的 url；反之，如果系统时间为更晚的时间，那么浏览器就永远无法使用到 新的  URL，而是一直使用以前的缓存。

4. 使用 Cache-Control 的本质是？

   发现一样文件，直接不请求




## ETag 和 MD5

通常而言，ETag 的使用是和 MD5 结合一起使用的。主要是验证文件的差异性。

即以下两者文件的差异：

- 服务端的文件
- 浏览器缓存的文件

### MD5

MD5消息摘要算法（英语：MD5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。MD5由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于1992年公开，用以取代MD4算法。这套算法的程序在 RFC 1321 中被加以规范。

简言之：内容差异越小，MD5计算结果差异越大 。

### ETag

发现是一样的文件 ，请求但是不下载，返回 状态码 ：304 表示没有修改。

#### MD5 和 ETag 的结合使用：

分别计算服务端和浏览器的文件差异：

- 服务端文件：使用MD5 计算出对应的数值为 `fileMd5` ，在响应中返回给请求；

  `response.setHeader('ETag',fileMd5)` 

  在返回的响应中会多一个响应头  `ETag`，结果如图：

  ![](https://i.loli.net/2018/02/07/5a7afa3a4bb29.png)

  ​

  然后在下一次刷新页面的时候，就会多一个新的请求头  `If-None-Match`，如图：

  ![](https://i.loli.net/2018/02/07/5a7afabf53309.png)

- 即在新的 请求头 `If-None-Match`  中的MD5值是上一次服务器返回的 MD5 值作为请求，如果和服务器对应的文件 MD5 值相同，则不下载。




## 总结

### 关于 Expires、Cache-Control 、ETag 

- Cache-Control ：一旦发现有相同的文件，不发请求，直接使用本地的缓存文件，即 【有相同，不请求】
- ETag：一旦发现和服务端的文件相同，则不下载，同时返回状态码： 304 表示文件未改变。即 【请求发现不相同，则不下载】
- 现在我们发现 ETag 和 Cookie 有点相似，都是会发请求。区别在于：
  - Cookie 是跟随域名，记录用户的状态信息
  - ETag 是跟随 URL，即文件的 URL，每个文件都是不同的 URL
### 缓存 与 302 的区别

- 缓存没有请求。
- 302 有请求，有响应，但是响应没有第四部分。




参考资料：

- [HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ#%E5%90%84%E7%A7%8D%E7%B1%BB%E5%9E%8B%E7%9A%84%E7%BC%93%E5%AD%98)
- [HTTP缓存](https://kb.cnblogs.com/page/166267/)
- [HTTP缓存](http://caibaojian.com/http-cache.html)
- 推荐阅读 [HTTP 缓存](http://wf.uisdc.com/cn/performance/optimizing-content-efficiency/http-caching.html#etag)
- [浏览器缓存机制](http://www.cnblogs.com/lovesong/p/5352973.html)
- [HTTP缓存](https://segmentfault.com/a/1190000006689795)
- [[HTTP缓存机制详解](https://segmentfault.com/a/1190000010775131)
- [Expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)
- [MD5 维基百科](https://zh.wikipedia.org/wiki/MD5)
- [ETag--维基百科](https://zh.wikipedia.org/wiki/HTTP_ETag)
