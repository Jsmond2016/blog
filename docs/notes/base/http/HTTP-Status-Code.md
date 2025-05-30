
 # HTTP状态码

### 1xx消息

这一类型的状态码，代表请求已被接受，需要继续处理。

- 100 Continue：服务器已经接收到请求头，并且客户端应继续发送请求主体
- 101 Switching Protocols：服务器已经理解了客户端的请求，并将通过Upgrade消息头通知客户端采用不同的协议来完成这个请求。
- 102 Processing：服务器已经收到并正在处理请求，但无响应可用。

### 2xx成功
这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。

- 200 OK：请求已成功。
- 201 Created：请求已经被实现。
- 202 Accepted：服务器已接受请求，但尚未处理

### 3xx重定向

这类状态码代表需要客户端采取进一步的操作才能完成请求

- 301 Moved Permanently：被请求的资源已永久移动到新位置。
- 304 Not Modified：表示资源未被修改

### 4xx客户端错误

这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。

- 400 Bad Request：由于明显的客户端错误，服务器不能或不会处理该请求。
- 401 Unauthorized：401语义即“未认证”，即用户没有必要的凭据。
- 403 Forbidden：服务器已经理解请求，但是拒绝执行它。
- 404 Not Found：请求失败，请求所希望得到的资源未被在服务器上发现，但允许用户的后续请求。

### 5xx服务器错误
表示服务器无法完成明显有效的请求。

- 500 Internal Server Error: 通用错误消息，服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。
- 501 Not Implemented: 服务器不支持当前请求所需要的某个功能。
- 503 Service Unavailable: 由于临时的服务器维护或者过载，服务器当前无法处理请求。



参考资料:

- [HTTP常见状态码 200 301 302 404 500](http://www.cnblogs.com/starof/p/5035119.html)
- [服务器返回的14种常见HTTP状态码](https://blog.csdn.net/q1056843325/article/details/53147180)

