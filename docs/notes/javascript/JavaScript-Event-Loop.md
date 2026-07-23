# JavaScript 异步执行：调用栈、任务队列与事件循环

`setTimeout(fn, 0)` 并不表示「立刻执行」。它只表示回调可以进入等待队列；真正执行还要等当前调用栈清空，并遵循事件循环的调度顺序。

![事件循环示意图：同步任务先在调用栈执行，栈清空后先清空微任务队列，再处理一个宏任务。](/illustrations/frontend/event-loop.svg)

## 先记住这个顺序

1. 执行当前调用栈中的同步代码。
2. 调用栈清空后，执行全部微任务。
3. 取出一个宏任务执行。
4. 再次清空微任务，然后继续下一轮。

常见微任务有 `Promise.then`、`catch`、`finally` 和 `queueMicrotask`；常见宏任务有初始脚本、`setTimeout`、DOM 事件和多数 I/O 回调。

## 用一个例子验证

```js
console.log('1: 同步开始');

setTimeout(() => {
  console.log('4: 定时器回调');
}, 0);

Promise.resolve().then(() => {
  console.log('3: 微任务');
});

console.log('2: 同步结束');
```

输出顺序是：

```text
1: 同步开始
2: 同步结束
3: 微任务
4: 定时器回调
```

定时器先注册，不代表它先执行。同步代码结束后，事件循环会优先清空微任务队列，因此 Promise 回调先输出。

## async / await 放在哪里

`await` 后面的代码可以理解为被拆成一个 Promise 回调，因此会在当前同步代码结束后的微任务阶段恢复：

```js
async function load() {
  console.log('A');
  await Promise.resolve();
  console.log('C');
}

console.log('B');
load();
console.log('D');
// B, A, D, C
```

`load()` 会立即执行到第一个 `await`，所以 `A` 在 `D` 前；`await` 之后的 `C` 要等同步代码结束后执行。

## 这和界面卡顿有什么关系

JavaScript 在主线程执行时，浏览器通常无法同时处理点击、绘制和动画。耗时很长的同步循环即使没有报错，也会让页面无响应。需要分批处理时，可使用 `requestAnimationFrame`、`requestIdleCallback`（注意兼容性）或 Web Worker，让出主线程。

不要用大量连续微任务代替拆分任务，因为微任务会在浏览器重新渲染前被持续清空，同样可能阻塞绘制。

## 常见误区

**宏任务一定比微任务慢。** 两者是调度类别，不是耗时等级；真正慢的是回调里执行的工作。

**`setTimeout(..., 0)` 一定在下一毫秒执行。** 定时器有最小延迟，还要等待调用栈和前面任务完成。

## 小结

把异步问题拆成「同步代码、微任务、宏任务」三部分，大多数输出顺序就能推导出来。遇到页面无响应时，从主线程是否被长任务或不断产生的微任务占满开始排查。

延伸阅读：[浏览器从 HTML 到像素：渲染流水线与性能切入点](../browser/Browser-Rendering-Pipeline)。
