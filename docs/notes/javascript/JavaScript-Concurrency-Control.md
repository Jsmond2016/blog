# JavaScript 异步并发控制：批量任务为什么不能一次全发

批量上传、批量请求和分页预取时，直接 `Promise.all(tasks)` 很方便，却可能同时发出数百个请求。接口被瞬间打满、浏览器连接被占用、失败重试彼此叠加，最终让用户看到更慢的页面。并发控制的目标是让任务持续推进，而不是一次性全部启动。

![并发控制流程：任务进入队列，调度器限制同时运行数量，任务完成后再补位。](/illustrations/frontend/javascript-concurrency.svg)

## 并发、串行与限并发

- **串行**：前一个完成后才开始下一个，最稳但总耗时长。
- **完全并发**：立即启动所有任务，吞吐高但容易压垮客户端或服务端。
- **限并发**：同时运行固定数量，完成一个就从队列补一个，通常是业务批处理的合理默认值。

## 一个最小可用的并发池

下面的函数接收「返回 Promise 的任务函数」，而不是已经开始执行的 Promise。这样调度器才能决定何时启动任务。

```js
async function runWithLimit(tasks, limit = 3) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const index = nextIndex;
      nextIndex += 1;

      try {
        results[index] = { status: 'fulfilled', value: await tasks[index]() };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}
```

使用时，每个请求都延迟到任务被 worker 取出时才发起：

```js
const tasks = files.map((file) => () => uploadFile(file));
const results = await runWithLimit(tasks, 3);
```

这里保留了每项结果，适合批量操作「部分成功、部分失败」的场景。如果任何一个失败都必须立即停止，应增加取消机制，并明确已经开始的任务如何收尾。

## 并发数如何选择

没有固定的万能数字。上传大文件时 2 到 3 个并发常更合适；轻量读取请求可适当更高。选择时结合服务端限流、网络环境、请求体积和页面是否还要处理其他关键交互。先在真实接口和目标设备上测量，再调整。

## 常见误区

**把 Promise 直接传给调度器。** Promise 创建时就可能已开始执行，此时并发池已经失去控制权。

**并发越高越快。** 总耗时还受网络拥塞、服务端队列、浏览器连接数和失败重试影响。

**只显示一个总 loading。** 批量任务应至少反馈进度、失败项和重试入口，避免用户不知道哪些任务完成。

## 小结

限并发让批量异步任务以稳定的节奏推进。关键是传入惰性任务函数、保留每个任务的结果，并按实际场景设置合理并发数。

延伸阅读：[JavaScript 异步执行：调用栈、任务队列与事件循环](./JavaScript-Event-Loop)。
