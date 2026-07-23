# React 状态与副作用：什么时候该用 useState，什么时候不该用 useEffect

React 组件的核心是「状态变化后重新计算 UI」。很多复杂组件之所以难维护，是因为把本可在渲染时得到的值存进 state，或者用 `useEffect` 处理本不需要副作用的计算。

![React 更新流程：事件触发状态更新，React 重新渲染并提交 DOM，随后 useEffect 与外部系统同步。](/illustrations/frontend/react-state-effect.svg)

## State 只存变化的事实

状态应该是用户交互或异步结果带来的原始事实。能从现有 state 和 props 直接计算出来的内容属于派生数据，不应再存一份。

```jsx
function Cart({ items }) {
  const [coupon, setCoupon] = useState(null);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = coupon ? subtotal * 0.9 : subtotal;

  return <strong>{total}</strong>;
}
```

`subtotal` 和 `total` 在渲染时计算即可。把它们放入 state，再用 effect 追踪 `items` 或 `coupon`，只会带来额外渲染和同步漏洞。

## useEffect 是外部同步的出口

当组件需要连接 React 之外的系统时使用 `useEffect`：请求数据、订阅 WebSocket、操作浏览器 API 或集成第三方组件。每个 effect 都应有明确的清理逻辑。

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then((response) => response.json())
    .then(setUser)
    .catch((error) => {
      if (error.name !== 'AbortError') setError(error);
    });

  return () => controller.abort();
}, [userId]);
```

依赖数组不是「想让 effect 在什么时候运行」的开关，而是 effect 读取的响应式值清单。遗漏依赖会读取旧闭包值；无必要的对象或函数依赖则可能造成重复执行。

## 事件处理与 Effect 的边界

用户点击「保存」后调用接口，应该放在点击处理函数中，因为这件事由一次明确的交互触发。页面首次展示时加载数据，才适合放在 effect 中。这个判断可以避免「点击后先设置一个 state，再由 effect 监听 state 去请求」的绕行模式。

## 常见误区

**每个计算都用 useMemo。** 它是性能优化工具，不是语义工具；先直接计算，确认确有性能瓶颈后再测量优化。

**Effect 只需要处理成功。** 请求在组件卸载或参数变化时要避免旧结果覆盖新界面，订阅也必须取消。

**state 更新后立刻读取就是新值。** state 是下一次渲染的快照；需要基于前一个值更新时使用函数式写法：`setCount((count) => count + 1)`。

## 小结

用 state 保存变化的事实，在渲染阶段计算派生数据，只用 effect 同步外部系统。组件的数据流越接近这个模型，越不容易产生重复 state、竞态和无效更新。

延伸阅读：[Fetch 请求的完整生命周期](../browser/Fetch-Request-Lifecycle)。
