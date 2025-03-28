
# Session、LocalStorage与SessionStorage

> Cookie 存在的问题
>
> 在上一篇文章[Cookie 小知识](/notes/base/chrome/Cookie.html) 中，我们知道，用户可以随意篡改 Cookie，针对这一弊端，我们引出今天的话题 **Session**   

## Session

### Session 的含义

会话（session）是一种持久网络协议，在用户（或用户代理）端和服务器端之间创建关联，从而起到交换数据包的作用机制，session在网络协议（例如telnet或FTP）中是非常重要的部分。

> 在不包含会话层（例如UDP）或者是无法长时间驻留会话层（例如HTTP）的传输协议中，会话的维持需要依靠在传输数据中的高级别程序。例如，在浏览器和远程主机之间的HTTP传输中，HTTP cookie就会被用来包含一些相关的信息，例如session ID，参数和权限信息等。

### Session 的作用

为了弥补  Cookie 的不足，避免 Cookie 的信息被任意篡改。

### Session 的实现原理

#### Cookie 的特点

1. 服务器通过 Set-Cookie 头给客户端一串字符串
2. 客户端每次访问相同域名的网页时，必须带上这段字符串
3. 客户端要在一段时间内保存这个Cookie
4. Cookie 默认在用户关闭页面后就失效，后台代码可以任意设置 Cookie 的过期时间
5. [大小大概在 4kb 以内](https://stackoverflow.com/questions/640938/what-is-the-maximum-size-of-a-web-browsers-cookies-key)

#### Cookie 的结构

通过上篇文章 [Cookie 小知识](http://jsmond.info/2018/02/05/Cookie-%E5%B0%8F%E7%9F%A5%E8%AF%86/) 我们知道，Cookie的结构为 `{key:value}` 的形式，类似于

```javascript
"user_id":"12345" ;

"user_id":"123456" ;
```

因为他是明文存储的，而且可以被修改，如上：

如果用户“12345” 自己修改自己的id为 “123456”  ，那么他实际上就是模拟了第二个用户的登录。

那么，我们想，如果对 Cookie 的敏感信息加密，不是就可以避免被篡改了吗？

#### Session_id 的作用

上面我们说对 Cookie 的敏感信息加密，到底怎么加密呢？如果使用现有的加密算法，那其也有对应的解密算法，显然使用别人的加密算法不靠谱。所以，我们自己写加密算法，那么，我们怎么保证我们的加密算法的安全性呢？

随机数！！

```
//部分后端代码如下
let sessions

// 在密码验证成功后

let sessionId = Math.random() * 10000000
sessions[sessionid]  = {sign_in_email: email} 
//将用户登陆的的邮箱存到 sessions[sessionid]

response.setHeader('Set-Cookie',`sessionId = ${sessionId}`)
//此时，我们通过设置响应头暴露给用户看到的实际上是一个 随机数  sessionId

```

![](https://i.loli.net/2018/02/06/5a7884aa93d90.png)

此时，用户自己的 id 为随机数从而无法判断规律去推理第二个用户的 id，从而保证了每个 id 的安全性。

#### Session 存在哪里？

Session 本质上是一块内存，即生命周期在于用户登录以后才产生 sessionId，然后用户关闭浏览器或者是刷新页面的时候原来的 session 就没了。

所以，Session 本质上来说， Session 就是一块内存

那我们可能又会想，既然是一块内存，电脑关闭了内存不就没了，用户保存的信息不就都没了？

的确是，不过服务器一般来说不会关机，如果有这样的情况，服务器会将 Session 保存到本地的某个文件，以防数据丢失。

### Session 的特点

1. 将 SessionID（随机数）通过 Cookie 发给客户端
2. 客户端访问服务器时，服务器读取 SessionID
3. 服务器有一块内存（哈希表）保存了所有 session
4. 通过 SessionID 我们可以得到对应用户的隐私信息，如 id、email
5. 这块内存（哈希表）就是服务器上的所有 session

### Session 的不足

本质上，Session 是一块内存，所以，问题也由内存带来 。即，一个用户占一块内存，那么10万个用户不就占用了 10万块内存，内存占用过大带来一系列的问题正是来源于此。

#### 小结

作为比喻，我们可以联系前面介绍的 Cookie 的比喻，即同学 A 之前是凭票进入公园，但是敏感信息在票上，别人只要修改自己票的号码即可更换身份进入公园；

有了 Session 以后，票上的号码为 一个随机数，同时，公园售票处有一个形如 `{"sessionId": "user_email"}` 的表格记录了这个随机数对应的 真实id，完成验证方可进入公园，从而保证了用户的信息。

> 面试问题 
>
> 面试官： 什么是 Session ？
>
> 答： 
>
> 1. 服务器通过Cookie给用户一个SessionId
> 2. 然后 SessionId 对应服务器里面的 一小块内存
> 3. 每次用户访问服务器的时候，服务器就通过 SessionId 去读对应的 Session ，然后知道用户的隐私信息。



## LocalStorage 和SessionStroage

### LocalStorage

#### LocalStorage 的含义

LocalStorage 翻译为 “本地存储”，功能和 Cookie 、Session 相似，但是又有些区别。

#### LocalStorage 的特点

- 最大的特点： 存储在本地。即不会参与 http 协议的传输。
- 存储大小： 大约为 5 M（每个浏览器不一样）。
- 生命周期： 一般为永久保存，除非被清除。

#### LocalStorage 的位置

![](https://i.loli.net/2018/02/07/5a79d360916bc.png)

#### LocalStorage 的结构

如上图，依然为 `{"key": "value"}` 结构。

### SessionStorage

功能与 LocalStorage  基本相似，但是也有区别。

#### LocalStorage 与 SessionStorage

##### LocalStorage

1. LocalStorage 跟 HTTP 无关
2. HTTP 不会带上 LocalStorage 的值
3. 只有相同域名的页面才能互相读取 LocalStorage（没有同源那么严格）
4. 每个域名 localStorage 最大存储量为 5Mb 左右（每个浏览器不一样）
5. 常用场景：记录有没有提示过用户（没有用的信息，不能记录密码）
6. LocalStorage 永久有效，除非用户清理缓存

##### SessionStorage（会话存储）

1、2、3、4 同上

5.SessionStorage 在用户关闭页面（会话结束）后就失效。



参考资料：


- [Session-维基百科](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))
- [Http 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)
- [Cookie加密](http://blog.csdn.net/joyfixing/article/details/52022301)
- [详说 Cookie, LocalStorage 与 SessionStorage](http://jerryzou.com/posts/cookie-and-web-storage/)
- [LocalStorage--MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
