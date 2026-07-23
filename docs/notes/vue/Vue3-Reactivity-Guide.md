# Vue 3 响应式系统：ref、reactive、computed 与 watch 如何选择

Vue 3 的响应式 API 不该按「哪个更常见」来选，而应按数据角色来选：它是单个值还是对象？是由其他状态推导出的结果，还是需要和网络、浏览器 API 等外部系统同步？

![Vue 响应式流程：组件读取状态时建立依赖，状态变化后通知相关计算属性和组件更新。](/illustrations/frontend/vue-reactivity.svg)

## 先看四个 API 的职责

| API | 适合什么 | 不适合什么 |
| --- | --- | --- |
| `ref` | 单个值、可替换对象、组件公开状态 | 大对象的深层状态组织 |
| `reactive` | 有关联的对象或数组状态 | 需要整体替换或被随意解构的状态 |
| `computed` | 根据已有状态计算出的值 | 发请求、写存储等副作用 |
| `watch` | 状态变化后同步外部系统 | 仅为了在模板中展示派生值 |

## 用 ref 管理可替换的值

```vue
<script setup>
import { ref } from 'vue';

const page = ref(1);
const user = ref(null);

function reset() {
  page.value = 1;
  user.value = null;
}
</script>
```

`ref` 统一用 `.value` 保存值，在模板里会自动解包。它对基本类型和「整体会被替换的对象」都很自然。

## 用 reactive 表达一组相关状态

```js
import { reactive } from 'vue';

const filters = reactive({
  keyword: '',
  status: 'all',
});

filters.keyword = 'vite';
```

不要直接解构 `reactive` 对象，否则属性会失去响应式连接。需要解构时使用 `toRefs(filters)`；需要整体替换时，优先使用 `ref({ ... })`。

## 派生值用 computed，副作用用 watch

```js
const fullName = computed(() => `${profile.firstName} ${profile.lastName}`);

watch(
  () => route.query.keyword,
  (keyword) => fetchList(keyword),
  { immediate: true },
);
```

`fullName` 由现有状态计算出来，不应该额外存一份状态；`fetchList` 涉及网络请求，属于副作用，因此放在 `watch` 中更清晰。异步请求要处理竞态：当监听源快速变化时，使用 `onCleanup` 取消过期请求，或只接收最后一次结果。

## 常见误区

**所有状态都用 `reactive`。** 基本类型不能直接使用，整体替换和解构也不方便。

**用 `watch` 维护另一个展示用变量。** 能由状态直接计算的值应使用 `computed`，避免两份状态不同步。

**把异步请求写在 computed 里。** computed 应保持无副作用，才能正确缓存并保持可推理性。

## 小结

把可变源数据交给 `ref` 或 `reactive`，把派生数据交给 `computed`，把网络、存储和订阅等外部同步交给 `watch`。按职责划分，组件状态会更容易维护和测试。

延伸阅读：[Vue 的父子通信问题](../Vue.js-Parent-Child-Communication-Issues)。
