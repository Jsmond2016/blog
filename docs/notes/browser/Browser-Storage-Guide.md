# 浏览器存储怎么选：Cookie、localStorage、sessionStorage 与 IndexedDB

浏览器没有一种「万能存储」。选型先回答三个问题：数据是否需要随请求发送、关闭标签页后是否还要存在、数据量和查询需求有多大。答案比具体 API 更重要。

![浏览器存储对比：Cookie 用于受控会话，sessionStorage 用于标签页临时状态，localStorage 保存少量偏好，IndexedDB 用于结构化离线数据。](/illustrations/frontend/browser-storage.svg)

## 用场景而不是名称做选择

| 存储 | 生命周期 | 是否随请求发送 | 适用场景 | 避免存放 |
| --- | --- | --- | --- | --- |
| Cookie | 可设过期时间 | 同站点匹配请求会携带 | 服务端可控的会话标识 | 大体积数据、可被脚本读取的敏感令牌 |
| sessionStorage | 当前标签页会话 | 否 | 多步骤表单、临时筛选条件 | 跨标签页共享状态 |
| localStorage | 手动清除前长期存在 | 否 | 主题、语言和少量界面偏好 | 密码、令牌和高频大数据 |
| IndexedDB | 手动清除前长期存在 | 否 | 离线内容、较大结构化数据 | 需要服务端自动读取的会话信息 |

它们都受同源策略限制：协议、域名或端口不同，页面就不能直接读取另一方的数据。

## Cookie 的安全边界

若服务端使用 Cookie 保存会话标识，应由服务端设置 `HttpOnly`、`Secure` 和合适的 `SameSite` 属性。`HttpOnly` 可以阻止页面 JavaScript 读取 Cookie，从而降低 XSS 窃取会话的风险；它不代表应用不需要防范 XSS。

```http
Set-Cookie: session=opaque-value; HttpOnly; Secure; SameSite=Lax; Path=/
```

不要把长期有效的敏感令牌直接放进 `localStorage`。一旦页面出现 XSS 漏洞，恶意脚本就可以读取它。

## localStorage 与 sessionStorage 的正确用法

二者 API 类似，都是同步的字符串键值对。存对象时要序列化，并处理读取失败和旧版本数据：

```js
function loadPreferences() {
  try {
    return JSON.parse(localStorage.getItem('preferences') ?? '{}');
  } catch {
    return {};
  }
}

localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));
```

不要在高频交互中频繁写入大量数据。它们是同步 API，过大的读写会阻塞主线程；此类数据应考虑 IndexedDB。

## IndexedDB 适合什么

IndexedDB 是浏览器内置的异步对象数据库，适合缓存文章、离线任务和大量结构化记录。它支持索引和事务，但原生 API 相对冗长。项目中可基于清晰的版本升级策略封装，或选择维护良好的轻量封装库。

无论使用哪种存储，都要考虑数据版本。字段结构变化时，旧数据如何迁移、丢弃或回退，需要明确策略。

## 常见误区

**localStorage 比 Cookie 更安全。** 它不会自动随请求发送，但任何运行在页面里的脚本都能读取它；安全性取决于数据类型与 XSS 防护。

**sessionStorage 会在关闭浏览器后才清空。** 它以标签页为边界，关闭该标签页通常就会清除。

**浏览器存储可当成永久数据库。** 用户可以随时清理，隐私模式和容量策略也会影响可用性；重要数据仍应由服务端持久化。

## 小结

Cookie 解决受控会话，sessionStorage 保存单标签页临时状态，localStorage 保存少量非敏感偏好，IndexedDB 处理较大且结构化的离线数据。先按数据生命周期和安全边界选型，再决定 API。

延伸阅读：[Cookie-Session-Cache-Control](../chrome/Cookie-Session-Cache-Control)。
