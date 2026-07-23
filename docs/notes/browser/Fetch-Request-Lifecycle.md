# Fetch 请求的完整生命周期：从发起请求到处理错误

`fetch()` 成功返回 Promise，不等于业务请求成功。HTTP 404、500 仍会得到一个正常的 `Response` 对象；只有网络不可达、请求被取消等情况才会让 Promise 进入 rejected。把这两层错误分开处理，接口代码才可靠。

![Fetch 请求生命周期：发起请求、网络传输、检查响应、解析数据，分别处理成功、取消和错误。](/illustrations/frontend/fetch-lifecycle.svg)

## 一份可复用的请求函数

先检查 `response.ok`，再解析数据。这个顺序让 HTTP 错误能进入统一的异常分支。

```js
async function getUser(id, { signal } = {}) {
  const response = await fetch(`/api/users/${id}`, { signal });

  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`);
  }

  return response.json();
}

try {
  const user = await getUser('42');
  renderUser(user);
} catch (error) {
  showError(error.message);
}
```

如果接口错误体本身是 JSON，可以在 `!response.ok` 分支中谨慎读取 `await response.json()`，再把服务端可展示的信息转换为应用自己的错误模型。

## 取消过期请求

搜索联想、路由切换和组件卸载时，旧请求的结果不应覆盖新页面。`AbortController` 可以让请求主动结束。

```js
let controller;

async function search(keyword) {
  controller?.abort();
  controller = new AbortController();

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') return;
    throw error;
  }
}
```

取消是预期控制流，不应把 `AbortError` 当成用户可见的失败提示。对于不支持取消的旧接口，也可用递增请求序号，只接收最后一次请求的结果。

## 超时与重试的边界

Fetch 没有内置超时参数，可以用 `AbortController` 配合定时器实现。重试只适合临时网络错误、服务端 429 或 5xx 等可能恢复的情况；参数错误、权限不足和多数 4xx 错误不该重试。重试间隔应逐步增加并加入随机抖动，避免大量客户端同时再次请求。

```js
function fetchWithTimeout(url, timeout = 8_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timer));
}
```

## 常见误区

**只写 `.catch()` 就能处理所有失败。** HTTP 4xx/5xx 不会自动进入 `catch`，必须检查 `response.ok` 或 `status`。

**请求取消后就不会更新界面。** 还要确保旧请求的成功回调没有在取消前完成；在复杂页面中结合请求序号或组件销毁状态。

**每个错误都自动重试。** 这会放大服务端故障，也会让明确的业务错误更难定位。

## 小结

完整的请求处理至少包括：检查 HTTP 状态、解析响应、区分网络错误与业务错误、在适当时机取消旧请求，并为可恢复错误设计有限重试。这样做比只写一行 `fetch().then()` 更接近真实业务需求。

延伸阅读：[JavaScript 异步执行：调用栈、任务队列与事件循环](../javascript/JavaScript-Event-Loop)。
